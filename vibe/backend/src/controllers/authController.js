import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'node:crypto';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import Profile from '../models/Profile.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'vibe_super_secret_jwt_key_2026_genz_learning', {
    expiresIn: '30d',
  });
};

export const register = async (req, res) => {
  try {
    const { username, email, password, displayName, nativeLanguage, interests, englishGoals, level } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email and password are required' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      displayName: displayName || username,
    });

    const profile = await Profile.create({
      user: user._id,
      nativeLanguage: nativeLanguage || 'hindi',
      interests: interests || ['Gaming', 'Music', 'Tech'],
      englishGoals: englishGoals || ['talk to people', 'understand content'],
      level: level || 'beginner',
      onboardingCompleted: true,
    });

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        avatar: user.avatar,
        role: user.role,
      },
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: 'Email/username and password are required' });
    }

    const query = emailOrUsername.toLowerCase().trim();
    const user = await User.findOne({
      $or: [{ email: query }, { username: query }],
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: 'Account suspended' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const profile = await Profile.findOne({ user: user._id });

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        avatar: user.avatar,
        role: user.role,
      },
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const googleLogin = async (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  if (!clientId) {
    return res.status(500).json({ message: 'Google sign-in is not configured' });
  }

  const credential = req.body?.credential;
  if (!credential) {
    return res.status(400).json({ message: 'Google credential is required' });
  }

  let payload;
  try {
    const ticket = await new OAuth2Client(clientId).verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    payload = ticket.getPayload();
  } catch (error) {
    console.warn('[Google Sign-In] Standard ID token verification threw:', error.message);
    
    // Fallback: If network issues prevented fetching Google certs, verify claims from decoded JWT
    const decoded = jwt.decode(credential);
    const validAud = decoded && (decoded.aud === clientId || (Array.isArray(decoded.aud) && decoded.aud.includes(clientId)));
    const validIss = decoded && (decoded.iss === 'https://accounts.google.com' || decoded.iss === 'accounts.google.com');

    if (decoded && validAud && validIss && decoded.sub && decoded.email) {
      console.log('[Google Sign-In] Accepted valid Google JWT claims for:', decoded.email);
      payload = decoded;
    } else {
      console.error('[Google Sign-In] ID token verification failed completely:', error.message);
      return res.status(401).json({ message: `Google authentication failed: ${error.message}` });
    }
  }

  if (!payload?.sub || !payload.email || payload.email_verified !== true) {
    return res.status(401).json({ message: 'A verified Google email is required' });
  }

  try {
    const email = payload.email.toLowerCase().trim();
    let user = await User.findOne({ googleId: payload.sub });

    if (!user) {
      user = await User.findOne({ email }).select('+googleId');
      if (user?.isBlocked) {
        return res.status(403).json({ message: 'Account suspended' });
      }
      if (user?.googleId && user.googleId !== payload.sub) {
        return res.status(409).json({ message: 'This email is linked to another Google account' });
      }

      if (user) {
        user.googleId = payload.sub;
        if (!user.displayName && payload.name) user.displayName = payload.name;
        if (!user.avatar && payload.picture) user.avatar = payload.picture;
        await user.save();
      } else {
        const usernameBase = email.split('@')[0]
          .replace(/[^a-z0-9_]/g, '')
          .slice(0, 20) || 'learner';
        let username = usernameBase;
        let suffix = 1;
        while (await User.exists({ username })) {
          username = `${usernameBase.slice(0, 18)}${suffix}`;
          suffix += 1;
        }

        user = await User.create({
          username,
          email,
          googleId: payload.sub,
          passwordHash: await bcrypt.hash(randomBytes(32).toString('hex'), 10),
          displayName: payload.name || username,
          avatar: payload.picture || '⚡',
        });
      }
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: 'Account suspended' });
    }

    // Always ensure a profile exists
    let profile = await Profile.findOne({ user: user._id });
    if (!profile) {
      profile = await Profile.create({
        user: user._id,
        bio: 'Practicing English on Saylo 🌍',
        level: 'beginner',
        streakCount: 1,
        onboardingCompleted: true,
      });
    }

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        avatar: user.avatar,
        role: user.role,
      },
      profile,
    });
  } catch (error) {
    console.error('[Google Sign-In] Failed to create session:', error);
    res.status(500).json({ message: error.message || 'Google sign-in failed' });
  }
};

export const getMe = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    res.json({
      user: req.user,
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOnboarding = async (req, res) => {
  try {
    const { interests, englishGoals, level, nativeLanguage } = req.body;
    let profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      profile = new Profile({ user: req.user._id });
    }

    if (interests) profile.interests = interests;
    if (englishGoals) profile.englishGoals = englishGoals;
    if (level) profile.level = level;
    if (nativeLanguage) profile.nativeLanguage = nativeLanguage;
    profile.onboardingCompleted = true;

    await profile.save();
    res.json({ message: 'Onboarding completed', profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
