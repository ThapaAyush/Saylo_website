const API_BASE = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('saylo_token') || localStorage.getItem('vibe_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Auth
  async login(emailOrUsername, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrUsername, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Login failed');
    }
    return res.json();
  },

  async googleLogin(credential) {
    const res = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || (res.status >= 500 ? 'Backend server unreachable. Please try again.' : 'Google sign-in failed'));
    }
    return res.json();
  },

  async register(data) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Registration failed');
    }
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
  },

  async updateOnboarding(data) {
    const res = await fetch(`${API_BASE}/auth/onboarding`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Profile
  async getProfile() {
    const res = await fetch(`${API_BASE}/profile`, { headers: getHeaders() });
    return res.json();
  },

  async updateProfile(data) {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async addXp(amount, activityType) {
    const res = await fetch(`${API_BASE}/profile/xp`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ amount, activityType }),
    });
    return res.json();
  },

  async completeActivity(type, id) {
    const res = await fetch(`${API_BASE}/profile/activity-complete`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ type, id }),
    });
    return res.json();
  },

  async getActivityCompletions() {
    const res = await fetch(`${API_BASE}/profile/activity-completions`, { headers: getHeaders() });
    if (!res.ok) return { completedSpeakings: [], completedReadings: [], completedWritings: [], completedVocabulary: [] };
    return res.json();
  },

  async getDailyDrop() {
    const res = await fetch(`${API_BASE}/profile/daily-drop`, { headers: getHeaders() });
    return res.json();
  },

  async getForYou() {
    const res = await fetch(`${API_BASE}/profile/for-you`, { headers: getHeaders() });
    return res.json();
  },

  // Vocabulary
  async getVocabulary(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/vocabulary?${query}`, { headers: getHeaders() });
    return res.json();
  },

  async getVocabularyById(id) {
    const res = await fetch(`${API_BASE}/vocabulary/${id}`, { headers: getHeaders() });
    return res.json();
  },

  async explainWord(word, context, targetLang = 'hindi') {
    const res = await fetch(`${API_BASE}/vocabulary/explain`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ word, context, targetLang }),
    });
    return res.json();
  },

  async tryItWord(word, userResponse, expectedSituation) {
    const res = await fetch(`${API_BASE}/vocabulary/try-it`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ word, userResponse, expectedSituation }),
    });
    return res.json();
  },

  async bookmarkWord(id) {
    const res = await fetch(`${API_BASE}/vocabulary/${id}/bookmark`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return res.json();
  },

  async learnWord(id) {
    const res = await fetch(`${API_BASE}/vocabulary/${id}/learn`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return res.json();
  },

  async getMySavedWords() {
    const res = await fetch(`${API_BASE}/vocabulary/my/saved-words`, { headers: getHeaders() });
    if (!res.ok) return { savedWords: [] };
    return res.json();
  },

  async getBatchFiveWords(batchNumber) {
    const query = batchNumber ? `?batchNumber=${batchNumber}` : '';
    const res = await fetch(`${API_BASE}/vocabulary/batch-five${query}`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch words batch');
    return res.json();
  },

  async toggleCompleteWord(id, action = 'toggle') {
    const query = action ? `?action=${action}` : '';
    const res = await fetch(`${API_BASE}/vocabulary/${id}/toggle-complete${query}`, {
      method: 'POST',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to update word completion');
    return res.json();
  },

  async getCompletedVault() {
    const res = await fetch(`${API_BASE}/vocabulary/vault`, { headers: getHeaders() });
    if (!res.ok) return { savedWords: [], total: 0 };
    return res.json();
  },

  // Reading
  async getReadings(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/reading?${query}`, { headers: getHeaders() });
    return res.json();
  },

  async getReadingById(id) {
    const res = await fetch(`${API_BASE}/reading/${id}`, { headers: getHeaders() });
    return res.json();
  },

  async completeReading(id) {
    const res = await fetch(`${API_BASE}/reading/${id}/complete`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Writing / Create
  async getWritingPrompts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/writing/prompts?${query}`, { headers: getHeaders() });
    return res.json();
  },

  async generateVibes(text) {
    const res = await fetch(`${API_BASE}/writing/transform-vibes`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ text }),
    });
    return res.json();
  },

  async getWritingFeedback(text, promptContext) {
    const res = await fetch(`${API_BASE}/writing/feedback`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ text, promptContext }),
    });
    return res.json();
  },

  async submitWriting(data) {
    const res = await fetch(`${API_BASE}/writing/submit`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Speaking
  async getSpeakingScenarios(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/speaking/scenarios?${query}`, { headers: getHeaders() });
    return res.json();
  },

  async getSpeakingCharacters() {
    const res = await fetch(`${API_BASE}/speaking/characters`, { headers: getHeaders() });
    return res.json();
  },

  async startConversation(data) {
    const res = await fetch(`${API_BASE}/speaking/conversation/start`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async sendConversationMessage(data) {
    const res = await fetch(`${API_BASE}/speaking/conversation/message`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async completeConversation(data) {
    const res = await fetch(`${API_BASE}/speaking/conversation/complete`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async transformSpeakingExpression(data) {
    const res = await fetch(`${API_BASE}/speaking/express/transform`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },


  // Games
  async getGames() {
    const res = await fetch(`${API_BASE}/games`, { headers: getHeaders() });
    return res.json();
  },

  async getGameById(id) {
    const res = await fetch(`${API_BASE}/games/${id}`, { headers: getHeaders() });
    return res.json();
  },

  async submitGameScore(gameId, data) {
    const res = await fetch(`${API_BASE}/games/${gameId}/score`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Quests
  async getQuests() {
    const res = await fetch(`${API_BASE}/quests`, { headers: getHeaders() });
    return res.json();
  },

  async claimQuest(id) {
    const res = await fetch(`${API_BASE}/quests/${id}/claim`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Social
  async getPosts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/posts?${query}`, { headers: getHeaders() });
    return res.json();
  },

  async createPost(data) {
    const res = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async reactToPost(id, type) {
    const res = await fetch(`${API_BASE}/posts/${id}/react`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ type }),
    });
    return res.json();
  },

  async getComments(postId) {
    const res = await fetch(`${API_BASE}/posts/${postId}/comments`, { headers: getHeaders() });
    return res.json();
  },

  async addComment(postId, text) {
    const res = await fetch(`${API_BASE}/posts/${postId}/comments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ text }),
    });
    return res.json();
  },

  // Game World 30-Level Adventure Map
  async getGameMap() {
    const res = await fetch(`${API_BASE}/game/map`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to load game map');
    return res.json();
  },

  async getGameLevel(levelNumber) {
    const res = await fetch(`${API_BASE}/game/levels/${levelNumber}`, { headers: getHeaders() });
    if (!res.ok) throw new Error(`Failed to load level ${levelNumber}`);
    return res.json();
  },

  async submitGameLevel(levelNumber, answers = [], durationSeconds = 120) {
    const res = await fetch(`${API_BASE}/game/levels/${levelNumber}/submit`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ answers, durationSeconds }),
    });
    if (!res.ok) throw new Error(`Failed to submit level ${levelNumber}`);
    return res.json();
  },

  async aiEnhanceGameLevel(levelNumber, interest = 'Tech') {
    const res = await fetch(`${API_BASE}/game/levels/${levelNumber}/ai-enhance`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ interest }),
    });
    if (!res.ok) throw new Error(`Failed to enhance level ${levelNumber}`);
    return res.json();
  },

  async refillGameEnergy() {
    const res = await fetch(`${API_BASE}/game/energy/refill`, {
      method: 'POST',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to refill energy');
    return res.json();
  },

  async deductGameHeart(current, lastRefill) {
    const res = await fetch(`${API_BASE}/game/energy/deduct`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ current, lastRefill }),
    });
    if (!res.ok) throw new Error('Failed to deduct heart');
    return res.json();
  },

  async regenGameHeart(current) {
    const res = await fetch(`${API_BASE}/game/energy/regen`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ current }),
    });
    if (!res.ok) throw new Error('Failed to regen heart');
    return res.json();
  },
};


