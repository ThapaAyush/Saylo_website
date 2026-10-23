export const vocabularySeed = [
  // --- INTERNET & SOCIAL SLANG ---
  {
    word: 'ate',
    phonetic: '/eɪt/',
    meaning: 'Did something exceptionally well, effortlessly, or looked amazing.',
    category: 'internet',
    difficulty: 'intermediate',
    tone: 'Super high praise',
    formality: 2,
    energy: 9,
    commonness: 9,
    isSlang: true,
    synonyms: ['slayed', 'nailed it', 'killed it'],
    antonyms: ['flopped', 'fumbled'],
    similarWords: ['delivered', 'mastered', 'crushed'],
    dontUseIn: 'formal academic paper, legal contracts, or doctor appointments',
    examples: [
      'Bro walked onto the stage and literally ate that dance solo.',
      'Her red carpet outfit ate and left no crumbs 💅',
      'Honestly our presentation ate, everyone was clapping.'
    ],
    caughtInTheWild: {
      quote: 'bro really thought he ate 💀',
      context: 'Tiktok comment reaction when someone tries too hard to look cool.',
      highlight: 'ate',
      miniChallenge: {
        friendPrompt: 'How did your friend look at the party last night?',
        expectedAnswerSample: 'She literally ate with that leather jacket!',
        explanation: 'Uses "ate" naturally to praise an outfit or styling.'
      }
    },
    hindiMeaning: 'बहुत ही कमाल या ज़बरदस्त प्रदर्शन किया / आग लगा दी।',
    hindiExample: 'उसने स्टेज पर एकदम आग लगा दी (she ate).',
    featured: true
  },
  {
    word: 'ngl',
    phonetic: '/ɛn.dʒiː.ɛl/',
    meaning: "Acronym for 'not gonna lie' — used to introduce an honest, sometimes vulnerable or surprising take.",
    category: 'internet',
    difficulty: 'beginner',
    tone: 'Casual & candid',
    formality: 2,
    energy: 6,
    commonness: 10,
    isSlang: true,
    synonyms: ['honestly', 'truth be told', 'to be real'],
    antonyms: ['deceptively'],
    similarWords: ['frankly', 'lowkey'],
    dontUseIn: 'formal cover letters or court testimony',
    examples: [
      'ngl that movie was actually fire.',
      'ngl I was terrified during the entire interview.',
      'That spicy ramen was painful ngl 😭'
    ],
    caughtInTheWild: {
      quote: 'ngl that exam took 5 years off my lifespan 💀',
      context: 'Twitter post after a brutal university final exam.',
      highlight: 'ngl',
      miniChallenge: {
        friendPrompt: 'Did you like the sushi place we went to?',
        expectedAnswerSample: 'ngl it was probably the best tuna roll I ever had.',
        explanation: 'Uses ngl to admit an honest positive or surprising reaction.'
      }
    },
    hindiMeaning: 'सच कहूँ तो / बिना किसी दिखावे के।',
    hindiExample: 'सच कहूँ तो (ngl), वो कैफे बहुत ज़्यादा महंगा था।',
    featured: true
  },
  {
    word: 'awkward',
    phonetic: '/ˈɔː.kwəd/',
    meaning: 'Causing or feeling an uneasy embarrassment, clumsy tension, or lack of social grace.',
    category: 'social',
    difficulty: 'beginner',
    tone: 'Everyday relatable',
    formality: 4,
    energy: 5,
    commonness: 9,
    isSlang: false,
    synonyms: ['uncomfortable', 'cringe', 'stiff', 'clumsy'],
    antonyms: ['smooth', 'natural', 'graceful'],
    similarWords: ['embarrassing', 'uneasy'],
    dontUseIn: 'formal scientific research papers unless studying sociology',
    examples: [
      'There was an awkward silence when nobody laughed at the boss’s joke.',
      'Running into your ex at the grocery store is peak awkward.',
      'He gave an awkward wave and walked the wrong direction.'
    ],
    caughtInTheWild: {
      quote: 'well this just got deeply awkward...',
      context: 'Said when two friends accidentally reveal a mutual secret in public.',
      highlight: 'awkward',
      miniChallenge: {
        friendPrompt: 'Why did everyone go quiet when Liam entered?',
        expectedAnswerSample: 'Because it was so awkward after yesterday’s argument!',
        explanation: 'Describes the uncomfortable social tension.'
      }
    },
    hindiMeaning: 'असहज, झिझक या शर्मिंदगी से भरी स्थिति।',
    hindiExample: 'वहाँ सब चुप हो गए तो माहौल बहुत अजीब और असहज (awkward) हो गया।',
    featured: true
  },
  {
    word: 'no cap',
    phonetic: '/noʊ kæp/',
    meaning: 'No lie; totally serious; for real.',
    category: 'internet',
    difficulty: 'beginner',
    tone: 'Hyper-casual',
    formality: 1,
    energy: 8,
    commonness: 9,
    isSlang: true,
    synonyms: ['for real', 'deadass', 'genuinely'],
    antonyms: ['capping', 'lying'],
    similarWords: ['truth', 'honestly'],
    dontUseIn: 'professional emails, university essays',
    examples: [
      'That was the best burger in the city, no cap.',
      'No cap, I studied 12 hours straight yesterday.',
      'He just made the craziest trickshot no cap!'
    ],
    caughtInTheWild: {
      quote: 'this playlist is pure heat no cap 🔥',
      context: 'Spotify shared story caption.',
      highlight: 'no cap',
      miniChallenge: {
        friendPrompt: 'Is that new phone camera really that clear?',
        expectedAnswerSample: 'It looks like a cinema camera no cap!',
        explanation: 'Emphasizes that you are genuinely speaking truth.'
      }
    },
    hindiMeaning: 'बिना किसी झूठ के / सच में यार।',
    hindiExample: 'भाई वो गाड़ी सच में ज़बरदस्त है, कोई झूठ नहीं (no cap)।',
    featured: false
  },
  {
    word: 'hits different',
    phonetic: '/hɪts ˈdɪf.ər.ənt/',
    meaning: 'Feels uniquely special, superior, or nostalgic compared to usual.',
    category: 'casual',
    difficulty: 'intermediate',
    tone: 'Vibe-oriented',
    formality: 2,
    energy: 7,
    commonness: 9,
    isSlang: true,
    synonyms: ['resonates', 'stands out', 'exceptional'],
    antonyms: ['ordinary', 'bland'],
    similarWords: ['magical', 'vibe'],
    dontUseIn: 'formal peer-reviewed scientific journals',
    examples: [
      'Late-night chai with friends just hits different.',
      'Listening to this album in the rain hits different.',
      'Cold water at 3 AM hits different.'
    ],
    caughtInTheWild: {
      quote: 'driving with the windows down at midnight hits different.',
      context: 'Instagram reel audio caption.',
      highlight: 'hits different',
      miniChallenge: {
        friendPrompt: 'Why do you love listening to old music at night?',
        expectedAnswerSample: 'Because in the dark it just hits different.',
        explanation: 'Expresses that the experience has an unmatched emotional feeling.'
      }
    },
    hindiMeaning: 'एक अलग ही मज़ा या गहरा अहसास होना।',
    hindiExample: 'रात को बारिश में चाय पीना एक अलग ही मज़ा देता है (hits different)।',
    featured: true
  },
  {
    word: 'down to earth',
    phonetic: '/daʊn tuː ɜːrθ/',
    meaning: 'Practical, humble, unpretentious, and easy to talk to.',
    category: 'everyday',
    difficulty: 'intermediate',
    tone: 'Warm compliment',
    formality: 6,
    energy: 5,
    commonness: 8,
    isSlang: false,
    synonyms: ['humble', 'approachable', 'grounded'],
    antonyms: ['arrogant', 'pretentious', 'stuck-up'],
    similarWords: ['authentic', 'genuine'],
    dontUseIn: 'literal geological contexts',
    examples: [
      'Despite winning the trophy, she remained completely down to earth.',
      'I loved meeting the CEO; he was super down to earth and friendly.',
      'A down-to-earth person never brags about their wealth.'
    ],
    caughtInTheWild: {
      quote: 'you would never know he has millions—he is so down to earth.',
      context: 'Podcast interview discussing an actor.',
      highlight: 'down to earth',
      miniChallenge: {
        friendPrompt: 'What was your new team lead like?',
        expectedAnswerSample: 'Really down to earth and super easy to talk with!',
        explanation: 'Compliments someone as approachable and humble.'
      }
    },
    hindiMeaning: 'ज़मीन से जुड़ा हुआ, सीधा-साधा और विनम्र।',
    hindiExample: 'इतना बड़ा इंसान होकर भी वो बिल्कुल ज़मीन से जुड़ा (down to earth) है।',
    featured: false
  },
  {
    word: 'ghosted',
    phonetic: '/ˈɡoʊ.stɪd/',
    meaning: 'Suddenly cut off all communication with someone without explanation.',
    category: 'social',
    difficulty: 'beginner',
    tone: 'Frustrated / relatable',
    formality: 3,
    energy: 4,
    commonness: 9,
    isSlang: true,
    synonyms: ['vanished', 'ignored', 'disappeared on'],
    antonyms: ['stayed in touch', 'followed up'],
    similarWords: ['silent', 'unresponsive'],
    dontUseIn: 'supernatural ghost stories unless making a pun',
    examples: [
      'We went on two dates and then he completely ghosted me.',
      'The client ghosted our agency after asking for the quote 💀',
      'Don’t ghost your friends when you get busy; just text them.'
    ],
    caughtInTheWild: {
      quote: 'bro went completely radio silent and ghosted 💀',
      context: 'Group chat complaint about a teammate.',
      highlight: 'ghosted',
      miniChallenge: {
        friendPrompt: 'Did that company ever reply to your job inquiry?',
        expectedAnswerSample: 'Nope, they ghosted me after the final interview.',
        explanation: 'Explains abrupt silence without explanation.'
      }
    },
    hindiMeaning: 'अचानक बिना कुछ कहे बातचीत या जवाब देना बंद कर देना।',
    hindiExample: 'तीन दिन बात करने के बाद उसने अचानक बात करना बंद कर दिया (ghosted me)।',
    featured: true
  },
  {
    word: 'lowkey',
    phonetic: '/ˈloʊ.kiː/',
    meaning: 'To a moderate degree; secretly; quietly; without making a big deal.',
    category: 'internet',
    difficulty: 'beginner',
    tone: 'Casual understatement',
    formality: 2,
    energy: 4,
    commonness: 10,
    isSlang: true,
    synonyms: ['somewhat', 'secretly', 'kind of'],
    antonyms: ['highkey', 'blatantly'],
    similarWords: ['quietly', 'subtly'],
    dontUseIn: 'legal pleadings or formal contracts',
    examples: [
      'I lowkey want to cancel plans and stay in bed tonight.',
      'This track is lowkey the best song on the album.',
      'I am lowkey nervous about tomorrow’s speech.'
    ],
    caughtInTheWild: {
      quote: 'lowkey proud of myself for waking up at 7am today.',
      context: 'Morning casual tweet.',
      highlight: 'lowkey',
      miniChallenge: {
        friendPrompt: 'Are you hungry right now?',
        expectedAnswerSample: 'I lowkey want tacos right now.',
        explanation: 'Expresses a modest or subtle craving.'
      }
    },
    hindiMeaning: 'मन ही मन / थोड़ा बहुत / चुपके से।',
    hindiExample: 'मेरा मन ही मन (lowkey) घर पर ही रुकने का मन कर रहा है।',
    featured: true
  },
  {
    word: 'highkey',
    phonetic: '/ˈhaɪ.kiː/',
    meaning: 'Very openly; overtly; intensely and without shame.',
    category: 'internet',
    difficulty: 'beginner',
    tone: 'Direct & energetic',
    formality: 2,
    energy: 9,
    commonness: 8,
    isSlang: true,
    synonyms: ['obviously', 'definitely', 'unapologetically'],
    antonyms: ['lowkey', 'subtly'],
    similarWords: ['loudly', 'openly'],
    dontUseIn: 'formal professional speeches',
    examples: [
      'I highkey love this cheesy romance movie.',
      'We highkey need to leave right now or we will miss the train!',
      'She is highkey the smartest person in the class.'
    ],
    caughtInTheWild: {
      quote: 'I am highkey obsessed with this matcha latte.',
      context: 'TikTok coffee review.',
      highlight: 'highkey',
      miniChallenge: {
        friendPrompt: 'Do you want to go to that concert?',
        expectedAnswerSample: 'I highkey need tickets, let’s buy them!',
        explanation: 'Shows intense, open desire.'
      }
    },
    hindiMeaning: 'बिल्कुल खुले तौर पर / ज़बरदस्त तरीके से।',
    hindiExample: 'मुझे खुले तौर पर (highkey) ये गाना बहुत ज़्यादा पसंद है।',
    featured: false
  },
  {
    word: 'clutch',
    phonetic: '/klʌtʃ/',
    meaning: 'Coming through successfully in a crucial, high-stakes moment.',
    category: 'gaming',
    difficulty: 'intermediate',
    tone: 'Heroic & hyped',
    formality: 3,
    energy: 9,
    commonness: 8,
    isSlang: true,
    synonyms: ['lifesaver', 'game-winner', 'decisive'],
    antonyms: ['choke', 'fumble'],
    similarWords: ['crucial', 'vital'],
    dontUseIn: 'formal academic dissertation',
    examples: [
      'Bringing an extra umbrella was so clutch today!',
      'He clutched a 1v3 round with 2 seconds left on the bomb.',
      'Thank you for sending the notes, that was clutch.'
    ],
    caughtInTheWild: {
      quote: 'bro came through with the clutch power bank at 1% battery 🙏',
      context: 'Music festival post.',
      highlight: 'clutch',
      miniChallenge: {
        friendPrompt: 'How did you pass the exam when your pen broke?',
        expectedAnswerSample: 'Sarah had an extra pen, which was so clutch!',
        explanation: 'Applauds someone stepping in at the exact right moment.'
      }
    },
    hindiMeaning: 'ऐन मौके पर संकट से उबारने वाला / कमाल कर देना।',
    hindiExample: 'उसने ऐन वक्त पर मदद करके कमाल (clutch) कर दिया।',
    featured: true
  },
  {
    word: 'touch grass',
    phonetic: '/tʌtʃ ɡræs/',
    meaning: 'Telling someone to step away from the internet, screens, or toxic debates and reconnect with reality.',
    category: 'internet',
    difficulty: 'intermediate',
    tone: 'Sarcastic & witty',
    formality: 1,
    energy: 7,
    commonness: 9,
    isSlang: true,
    synonyms: ['go outside', 'get some fresh air', 'disconnect'],
    antonyms: ['doomscroll', 'chronically online'],
    similarWords: ['unplug', 'ground yourself'],
    dontUseIn: 'customer support tickets or serious grief counseling',
    examples: [
      'You’ve been arguing on Twitter for 6 hours; please touch grass.',
      'Whenever I get stressed by social media, I force myself to touch grass.',
      'Bro wrote a 50-tweet rant over a movie trailer... touch grass 😭'
    ],
    caughtInTheWild: {
      quote: 'please step away from reddit and go touch grass for 10 minutes.',
      context: 'Internet debate roast.',
      highlight: 'touch grass',
      miniChallenge: {
        friendPrompt: 'I’ve been refreshing crypto prices every 30 seconds all night.',
        expectedAnswerSample: 'Bro, close the app and go touch grass!',
        explanation: 'Humorously tells someone to take a breather in the real world.'
      }
    },
    hindiMeaning: 'स्क्रीन छोड़कर बाहर खुली हवा में जाओ / हकीकत की दुनिया में आओ।',
    hindiExample: 'फोन बंद करो और थोड़ी खुली हवा में जाओ (go touch grass)।',
    featured: false
  },
  {
    word: 'burnout',
    phonetic: '/ˈbɜːrn.aʊt/',
    meaning: 'A state of emotional, physical, and mental exhaustion caused by excessive and prolonged stress.',
    category: 'work',
    difficulty: 'intermediate',
    tone: 'Serious & empathetic',
    formality: 7,
    energy: 3,
    commonness: 9,
    isSlang: false,
    synonyms: ['exhaustion', 'fatigue', 'depletion'],
    antonyms: ['vitality', 'rejuvenation', 'vigor'],
    similarWords: ['overwhelmed', 'drained'],
    dontUseIn: 'hyper-casual gaming banters unless referring to car tires',
    examples: [
      'Working 70 hours a week is a guaranteed recipe for burnout.',
      'I took a week off to recover from creative burnout.',
      'Recognizing early signs of burnout can save your health.'
    ],
    caughtInTheWild: {
      quote: 'hustle culture glorifies burnout as a badge of honor, but it’s toxic.',
      context: 'LinkedIn career post.',
      highlight: 'burnout',
      miniChallenge: {
        friendPrompt: 'Why do you feel so tired and unmotivated lately?',
        expectedAnswerSample: 'I think I am experiencing burnout from too many deadlines.',
        explanation: 'Accurately communicates workplace or study exhaustion.'
      }
    },
    hindiMeaning: 'लगातार काम और तनाव से होने वाली मानसिक व शारीरिक थकान।',
    hindiExample: 'बिना छुट्टी के काम करने से मुझे बहुत ज़्यादा थकान (burnout) हो गई है।',
    featured: true
  },
  {
    word: 'bandwidth',
    phonetic: '/ˈbænd.wɪdθ/',
    meaning: 'In human conversation: mental, emotional, or time capacity to take on more tasks or information.',
    category: 'work',
    difficulty: 'advanced',
    tone: 'Corporate-smart',
    formality: 7,
    energy: 5,
    commonness: 8,
    isSlang: false,
    synonyms: ['capacity', 'time', 'availability'],
    antonyms: ['overload', 'saturation'],
    similarWords: ['space', 'resources'],
    dontUseIn: 'talking to young children',
    examples: [
      'I would love to help, but I do not have the bandwidth this week.',
      'Do you have enough bandwidth to review this slide deck today?',
      'Taking on another project right now exceeds our team’s bandwidth.'
    ],
    caughtInTheWild: {
      quote: 'I simply don’t have the mental bandwidth for this drama today.',
      context: 'Slack message or office banter.',
      highlight: 'bandwidth',
      miniChallenge: {
        friendPrompt: 'Can you take the lead on this new committee?',
        expectedAnswerSample: 'Honestly, I just don’t have the bandwidth right now.',
        explanation: 'Politely declines extra workload based on time and capacity.'
      }
    },
    hindiMeaning: 'मानसिक या समय की क्षमता (काम संभालने की गुंजाइश)।',
    hindiExample: 'मेरे पास इस हफ्ते इतना वक्त और मानसिक क्षमता (bandwidth) नहीं है।',
    featured: false
  },
  {
    word: 'reinvent the wheel',
    phonetic: '/riː.ɪnˈvent ðə wiːl/',
    meaning: 'To waste time and effort creating something that already exists and works well.',
    category: 'work',
    difficulty: 'intermediate',
    tone: 'Pragmatic idiom',
    formality: 6,
    energy: 5,
    commonness: 8,
    isSlang: false,
    synonyms: ['duplicate effort', 'start from scratch unnecessarily'],
    antonyms: ['build upon', 'leverage existing tools'],
    similarWords: ['redundancy'],
    dontUseIn: 'literal automotive history lessons without context',
    examples: [
      'We don’t need to reinvent the wheel; let’s use an open-source library.',
      'Instead of reinventing the wheel, look at how competitor products solve it.',
      'Why spend months coding this when a template already exists? Don’t reinvent the wheel.'
    ],
    caughtInTheWild: {
      quote: 'let’s adapt their framework—no sense reinventing the wheel.',
      context: 'Engineering sprint planning.',
      highlight: 'reinvent the wheel',
      miniChallenge: {
        friendPrompt: 'Should we design our own payment system from zero?',
        expectedAnswerSample: 'No way, let’s use Stripe so we don’t reinvent the wheel!',
        explanation: 'Advises against wasting resources re-creating solved problems.'
      }
    },
    hindiMeaning: 'पहले से बनी-बनाई चीज़ को दोबारा बनाकर समय बर्बाद करना।',
    hindiExample: 'पहले से मौजूद समाधान का उपयोग करो, पहिया दोबारा बनाने की ज़रूरत नहीं (reinvent the wheel)।',
    featured: false
  },
  {
    word: 'jet lag',
    phonetic: '/ˈdʒet ˌlæɡ/',
    meaning: 'Extreme tiredness and confusion caused by traveling across multiple time zones.',
    category: 'travel',
    difficulty: 'beginner',
    tone: 'Travel staple',
    formality: 6,
    energy: 3,
    commonness: 9,
    isSlang: false,
    synonyms: ['circadian disruption', 'travel fatigue'],
    antonyms: ['well-rested'],
    similarWords: ['fatigue', 'time-zone shock'],
    dontUseIn: 'describing late night gaming (say "sleep-deprived" instead)',
    examples: [
      'I woke up at 3 AM because the jet lag from New York is kicking in.',
      'Drinking plenty of water and walking in sunlight helps beat jet lag.',
      'He slept through the morning meeting due to severe jet lag.'
    ],
    caughtInTheWild: {
      quote: 'day 2 in Tokyo and my jet lag has me eating noodles at 4am.',
      context: 'Travel vlog update.',
      highlight: 'jet lag',
      miniChallenge: {
        friendPrompt: 'How are you feeling after that 14-hour flight?',
        expectedAnswerSample: 'Pretty exhausted, the jet lag is real!',
        explanation: 'Expresses physiological fatigue from crossing time zones.'
      }
    },
    hindiMeaning: 'लंबी हवाई यात्रा और टाइम ज़ोन बदलने के कारण होने वाली भारी थकान।',
    hindiExample: 'विदेश से आने के बाद मुझे बहुत जेट लैग (jet lag) हो रहा है।',
    featured: false
  },
  {
    word: 'culture shock',
    phonetic: '/ˈkʌl.tʃər ˌʃɑːk/',
    meaning: 'The feeling of disorientation experienced by someone suddenly subjected to an unfamiliar culture or way of life.',
    category: 'travel',
    difficulty: 'intermediate',
    tone: 'Reflective',
    formality: 6,
    energy: 5,
    commonness: 8,
    isSlang: false,
    synonyms: ['disorientation', 'alienation', 'adjustment period'],
    antonyms: ['familiarity', 'assimilation'],
    similarWords: ['unfamiliarity', 'surprise'],
    dontUseIn: 'minor kitchen layout differences within the same neighborhood',
    examples: [
      'Moving to London was a big culture shock for someone from a quiet village.',
      'Eating dinner at 10 PM in Spain gave him slight culture shock.',
      'Culture shock is a normal stage of studying abroad.'
    ],
    caughtInTheWild: {
      quote: 'the quiet public transit in Japan was the best kind of culture shock.',
      context: 'Solo traveler blog post.',
      highlight: 'culture shock',
      miniChallenge: {
        friendPrompt: 'Was it easy adjusting when you moved overseas?',
        expectedAnswerSample: 'At first, the culture shock was intense, but I adapted quickly.',
        explanation: 'Reflects on the adjustment period to new norms.'
      }
    },
    hindiMeaning: 'नए देश या संस्कृति में जाने पर होने वाली हैरानी या असमंजस।',
    hindiExample: 'नए देश के रहन-सहन को देखकर शुरुआत में मुझे गहरा अचरज (culture shock) हुआ।',
    featured: false
  },
  {
    word: 'red flag',
    phonetic: '/ˌred ˈflæɡ/',
    meaning: 'A warning sign of danger, bad behavior, or incompatibility in a person, workplace, or situation.',
    category: 'social',
    difficulty: 'beginner',
    tone: 'Cautionary & analytical',
    formality: 4,
    energy: 6,
    commonness: 10,
    isSlang: false,
    synonyms: ['warning sign', 'bad omen', 'hazard indicator'],
    antonyms: ['green flag', 'positive sign'],
    similarWords: ['alarm', 'dealbreaker'],
    dontUseIn: 'maritime signal flags unless discussing actual sailing safety',
    examples: [
      'He never tips the waiter; that is an immediate red flag.',
      'A company that says "we are like a family" is often a red flag.',
      'Pay attention to red flags early so you don’t regret it later.'
    ],
    caughtInTheWild: {
      quote: 'huge red flag if they can’t apologize when they’re wrong 🚩',
      context: 'Relationship podcast snippet.',
      highlight: 'red flag',
      miniChallenge: {
        friendPrompt: 'What made you decline that job offer?',
        expectedAnswerSample: 'They expected 24/7 availability, which was a huge red flag.',
        explanation: 'Points out an unhealthy warning sign.'
      }
    },
    hindiMeaning: 'खतरे या गड़बड़ी की चेतावनी / ख़ास संकेत।',
    hindiExample: 'अगर कोई अपनी गलती कभी न माने तो यह एक बड़ा चेतावनी संकेत (red flag) है।',
    featured: true
  },
  {
    word: 'green flag',
    phonetic: '/ˌɡriːn ˈflæɡ/',
    meaning: 'A reassuring sign of healthy, emotionally mature, or trustworthy behavior in someone.',
    category: 'social',
    difficulty: 'beginner',
    tone: 'Positive endorsement',
    formality: 4,
    energy: 7,
    commonness: 9,
    isSlang: false,
    synonyms: ['good sign', 'positive indicator', 'healthy trait'],
    antonyms: ['red flag'],
    similarWords: ['trustworthy', 'wholesome'],
    dontUseIn: 'formal legal verdicts',
    examples: [
      'Remembering small details you mentioned weeks ago is a massive green flag.',
      'Active listening and encouraging your goals are top green flags.',
      'A boss who encourages you to log off on time is a rare green flag 💚'
    ],
    caughtInTheWild: {
      quote: 'finding a friend who checks on you without needing anything is a green flag.',
      context: 'Wholesome social post.',
      highlight: 'green flag',
      miniChallenge: {
        friendPrompt: 'Why do you like your new teammate so much?',
        expectedAnswerSample: 'She gives credit to everyone, which is a major green flag.',
        explanation: 'Highlights a positive and mature personality trait.'
      }
    },
    hindiMeaning: 'अच्छे व्यवहार, भरोसे और अच्छाई का सकारात्मक संकेत।',
    hindiExample: 'दूसरों की बात ध्यान से सुनना एक बहुत ही अच्छा संकेत (green flag) है।',
    featured: false
  },
  {
    word: 'gatekeep',
    phonetic: '/ˈɡeɪt.kiːp/',
    meaning: 'To withhold information or access about something cool (like music, cafes, or fashion) so others don’t ruin it.',
    category: 'internet',
    difficulty: 'intermediate',
    tone: 'Playful / accusatory',
    formality: 3,
    energy: 6,
    commonness: 9,
    isSlang: true,
    synonyms: ['hoard', 'withhold', 'keep secret'],
    antonyms: ['share', 'put on', 'recommend'],
    similarWords: ['secrecy', 'exclusive'],
    dontUseIn: 'medieval castle defense reports without irony',
    examples: [
      'Stop gatekeeping that Spotify playlist, send the link!',
      'I normally gatekeep this coffee shop, but their croissants are too good not to share.',
      'Why are you gatekeeping where you bought that hoodie?'
    ],
    caughtInTheWild: {
      quote: 'promise me you won’t gatekeep this bakery if I show you.',
      context: 'Food blogger video intro.',
      highlight: 'gatekeep',
      miniChallenge: {
        friendPrompt: 'Where did you get that awesome vintage jacket?',
        expectedAnswerSample: 'I won’t gatekeep—I found it at the thrift store downtown!',
        explanation: 'Cheerfully shares a hidden gem instead of keeping it secret.'
      }
    },
    hindiMeaning: 'किसी अच्छी जगह या चीज़ के बारे में दूसरों से छिपाना ताकि भीड़ न लगे।',
    hindiExample: 'इस कैफे का नाम छिपाओ मत (don’t gatekeep), मुझे भी बताओ!',
    featured: false
  },
  {
    word: 'rent free',
    phonetic: '/rɛnt friː/',
    meaning: 'Occupying your thoughts continuously without your permission or effort.',
    category: 'internet',
    difficulty: 'beginner',
    tone: 'Witty & catchy',
    formality: 2,
    energy: 7,
    commonness: 9,
    isSlang: true,
    synonyms: ['stuck in my head', 'obsessing over', 'haunting'],
    antonyms: ['forgotten', 'ignored'],
    similarWords: ['earworm', 'lingering'],
    dontUseIn: 'real estate tenant contract negotiations',
    examples: [
      'That catchy song chorus is living rent-free in my mind all week.',
      'That embarrassing memory from 2018 lives rent-free in my head at 2 AM 😭',
      'The referee’s terrible call is living rent-free in his head.'
    ],
    caughtInTheWild: {
      quote: 'this meme has been living in my brain rent free for 72 hours.',
      context: 'Twitter meme repost.',
      highlight: 'rent free',
      miniChallenge: {
        friendPrompt: 'Why are you smiling at your laptop screen?',
        expectedAnswerSample: 'A funny video I saw yesterday is living rent-free in my head!',
        explanation: 'Explains an unforgettable recurring thought or joke.'
      }
    },
    hindiMeaning: 'दिमाग में बार-बार घूमना / सिर से न उतरना।',
    hindiExample: 'वो मज़ाकिया वीडियो मेरे दिमाग में बार-बार घूम रहा है (living rent free)।',
    featured: true
  },
  {
    word: 'main character energy',
    phonetic: '/meɪn ˈkær.ək.tər ˈɛn.ər.dʒi/',
    meaning: 'Acting confident, charismatic, and living life as though you are the hero of your own movie.',
    category: 'social',
    difficulty: 'intermediate',
    tone: 'Empowering & playful',
    formality: 2,
    energy: 9,
    commonness: 9,
    isSlang: true,
    synonyms: ['confidence', 'radiance', 'star power'],
    antonyms: ['background noise', 'timidity', 'NPC energy'],
    similarWords: ['aura', 'swagger'],
    dontUseIn: 'formal academic theater reviews without clarifying the meme',
    examples: [
      'Walking down the street with headphones on giving pure main character energy.',
      'She ordered the fancy dessert with unapologetic main character energy.',
      'Turn on your favorite song and tap into some main character energy today.'
    ],
    caughtInTheWild: {
      quote: 'strutting through the terminal like I have main character energy 💅',
      context: 'Airport Instagram story.',
      highlight: 'main character energy',
      miniChallenge: {
        friendPrompt: 'How did you feel walking into the gala alone?',
        expectedAnswerSample: 'Honestly, I just embraced full main character energy!',
        explanation: 'Radiates self-assurance and cinematic confidence.'
      }
    },
    hindiMeaning: 'अपनी ज़िंदगी का हीरो होने जैसा आत्मविश्वास और अंदाज़।',
    hindiExample: 'वो पूरे आत्मविश्वास के साथ चली, जैसे अपनी फिल्म की मुख्य नायिका हो।',
    featured: true
  },
  {
    word: 'NPC',
    phonetic: '/ˌɛn.piːˈsiː/',
    meaning: 'Non-Playable Character — slang for someone acting without independent thought, repetitively or robotically.',
    category: 'gaming',
    difficulty: 'intermediate',
    tone: 'Playful / teasing',
    formality: 1,
    energy: 6,
    commonness: 9,
    isSlang: true,
    synonyms: ['mindless', 'robotic', 'generic follower'],
    antonyms: ['main character', 'individualist', 'free thinker'],
    similarWords: ['drone', 'conformist'],
    dontUseIn: 'formal psychological evaluations or professional performance reviews',
    examples: [
      'Bro stood staring at the microwave for two minutes like an NPC 💀',
      'Don’t just repeat what everyone else says; avoid NPC behavior.',
      'That pedestrian walked straight into the pole like an NPC glitch.'
    ],
    caughtInTheWild: {
      quote: 'bro forgot his dialogue tree and froze like an NPC 😭',
      context: 'TikTok funny clip.',
      highlight: 'NPC',
      miniChallenge: {
        friendPrompt: 'Why did everyone laugh at Tom at lunch?',
        expectedAnswerSample: 'He gave the exact same answer three times like an NPC!',
        explanation: 'Jokes about someone acting scripted or zoned out.'
      }
    },
    hindiMeaning: 'बिना दिमाग लगाए रोबोट की तरह नकल करने वाला / गेम का गैर-खिलाड़ी किरदार।',
    hindiExample: 'वो रोबोट की तरह एक ही बात दोहरा रहा था (acting like an NPC)।',
    featured: false
  },
  {
    word: 'side eye',
    phonetic: '/saɪd aɪ/',
    meaning: 'A sidelong glance expressing disapproval, suspicion, skepticism, or judgment.',
    category: 'social',
    difficulty: 'beginner',
    tone: 'Skeptical & humorous',
    formality: 2,
    energy: 6,
    commonness: 9,
    isSlang: true,
    synonyms: ['skeptical glance', 'disapproving look', 'bombastic side eye'],
    antonyms: ['warm smile', 'approval'],
    similarWords: ['glance', 'scrutiny'],
    dontUseIn: 'formal medical ophthalmology exams',
    examples: [
      'She gave him bombastic side eye when he claimed he never checks social media.',
      'The cat gave me severe side eye when I woke him up.',
      'Major side eye to anyone who cuts in line at the airport.'
    ],
    caughtInTheWild: {
      quote: 'criminal offensive side eye 👀💀',
      context: 'Viral audio meme.',
      highlight: 'side eye',
      miniChallenge: {
        friendPrompt: 'How did Lisa react when Mark made that weird excuse?',
        expectedAnswerSample: 'She gave him the most hilarious side eye ever!',
        explanation: 'Describes a look of suspicion and disbelief.'
      }
    },
    hindiMeaning: 'तिरछी नज़र से शक या नाराज़गी से देखना।',
    hindiExample: 'जब उसने झूठा बहाना बनाया, तो सबने उसे तिरछी नज़र से (side eye) देखा।',
    featured: true
  },
  {
    word: 'valid',
    phonetic: '/ˈvæl.ɪd/',
    meaning: 'In casual English: completely understandable, reasonable, and justified.',
    category: 'casual',
    difficulty: 'beginner',
    tone: 'Validating & supportive',
    formality: 5,
    energy: 6,
    commonness: 10,
    isSlang: false,
    synonyms: ['understandable', 'fair point', 'justified', 'legit'],
    antonyms: ['unreasonable', 'bogus'],
    similarWords: ['reasonable', 'acceptable'],
    dontUseIn: 'cryptographic key validation without technical context',
    examples: [
      'Canceling plans because you had a brutal workday is completely valid.',
      'Honestly, your anger at that delayed flight is totally valid.',
      'A: "I love dipping fries in ice cream." B: "Honestly? Valid."'
    ],
    caughtInTheWild: {
      quote: 'crying over fictional characters is 100% valid.',
      context: 'BookTok review video.',
      highlight: 'valid',
      miniChallenge: {
        friendPrompt: 'I feel nervous about speaking English in front of crowds.',
        expectedAnswerSample: 'That feeling is totally valid, take your time!',
        explanation: 'Reassures someone that their reaction makes complete sense.'
      }
    },
    hindiMeaning: 'पूरी तरह जायज़ और समझने योग्य बात।',
    hindiExample: 'तुम्हारा ऐसा महसूस करना बिल्कुल जायज़ (completely valid) है।',
    featured: false
  },
  {
    word: 'unhinged',
    phonetic: '/ʌnˈhɪndʒd/',
    meaning: 'Wildly chaotic, unpredictable, eccentric, or shockingly out of control (often used humorously).',
    category: 'internet',
    difficulty: 'intermediate',
    tone: 'Chaotic comedy',
    formality: 3,
    energy: 9,
    commonness: 9,
    isSlang: true,
    synonyms: ['chaotic', 'wild', 'deranged', 'insane'],
    antonyms: ['calm', 'stable', 'composed'],
    similarWords: ['outrageous', 'bizarre'],
    dontUseIn: 'formal psychiatric diagnosis reports',
    examples: [
      'Duolingo’s TikTok account is completely unhinged 💀',
      'The plot twist in episode 8 was utterly unhinged.',
      'He sent an unhinged 4-minute voice note at 3 AM.'
    ],
    caughtInTheWild: {
      quote: 'this group chat has gone completely unhinged tonight.',
      context: 'Midnight WhatsApp group banter.',
      highlight: 'unhinged',
      miniChallenge: {
        friendPrompt: 'Did you see what our team mascot did at halftime?',
        expectedAnswerSample: 'Yes! That backflip off the table was totally unhinged!',
        explanation: 'Describes hilarious, uncontrolled wild energy.'
      }
    },
    hindiMeaning: 'बेहद अजीब, बेकाबू या पागलों जैसा रोमांचक।',
    hindiExample: 'उसका आधी रात का आइडिया पूरी तरह से पागलपन भरा (unhinged) था।',
    featured: true
  },
  {
    word: 'delulu',
    phonetic: '/dɪˈluː.luː/',
    meaning: 'Short for delusional — humorously having unrealistically optimistic expectations.',
    category: 'internet',
    difficulty: 'beginner',
    tone: 'Self-aware humor',
    formality: 1,
    energy: 8,
    commonness: 9,
    isSlang: true,
    synonyms: ['over-optimistic', 'daydreaming', 'fanciful'],
    antonyms: ['realistic', 'grounded'],
    similarWords: ['wishful', 'hopeful'],
    dontUseIn: 'psychology case studies or academic tests',
    examples: [
      'Being a little delulu is the only way to chase big dreams.',
      'I thought I could finish a 20-page report in one night; I was so delulu.',
      'Delulu is the solulu until reality hits 😭'
    ],
    caughtInTheWild: {
      quote: 'maybe I am delulu, but I feel like today is going to be amazing.',
      context: 'Morning motivational vlog.',
      highlight: 'delulu',
      miniChallenge: {
        friendPrompt: 'Do you really think the celebrity saw your comment?',
        expectedAnswerSample: 'Let me be delulu for five minutes, please!',
        explanation: 'Embraces humorous, wishful daydreams.'
      }
    },
    hindiMeaning: 'सपनों की दुनिया में खोया हुआ / ज़्यादा ही उम्मीद लगाने वाला।',
    hindiExample: 'शायद मैं खयाली पुलाव पका रहा हूँ (being delulu), पर मुझे लगता है बात बन जाएगी।',
    featured: false
  },
  {
    word: 'yap',
    phonetic: '/jæp/',
    meaning: 'To talk continuously and excessively, often about trivial or unimportant things.',
    category: 'internet',
    difficulty: 'beginner',
    tone: 'Playful & conversational',
    formality: 2,
    energy: 7,
    commonness: 9,
    isSlang: true,
    synonyms: ['ramble', 'chatter', 'babble'],
    antonyms: ['listen', 'stay quiet'],
    similarWords: ['gossip', 'chitchat'],
    dontUseIn: 'formal eulogy or official debate',
    examples: [
      'Bro has a PhD in yapping; he talked for 45 minutes straight.',
      'Sorry for yapping so much, I just got really excited about the topic!',
      'We stayed up until sunrise just yapping about life.'
    ],
    caughtInTheWild: {
      quote: 'bro is yapping to the wall at this point 💀',
      context: 'Classroom humorous video.',
      highlight: 'yap',
      miniChallenge: {
        friendPrompt: 'How was your phone call with your cousin?',
        expectedAnswerSample: 'We just yapped for two hours about our childhood!',
        explanation: 'Describes long, casual, free-flowing conversation.'
      }
    },
    hindiMeaning: 'बिना रुके बकबक करना या लगातार गपशप लड़ाना।',
    hindiExample: 'हम दोनों रात भर बैठकर बातें (yapping) करते रहे।',
    featured: false
  },
  {
    word: 'period',
    phonetic: '/ˈpɪr.i.əd/',
    meaning: 'Used at the end of a statement to indicate there is nothing more to be said and no room for debate.',
    category: 'social',
    difficulty: 'beginner',
    tone: 'Definitive & emphatic',
    formality: 2,
    energy: 8,
    commonness: 9,
    isSlang: true,
    synonyms: ['end of story', 'full stop', 'case closed'],
    antonyms: ['debatable', 'questionable'],
    similarWords: ['final', 'conclusive'],
    dontUseIn: 'formal punctuation lectures unless explaining the dot',
    examples: [
      'Self-care is a necessity, not a luxury. Period.',
      'She is the most talented singer of our generation, period.',
      'No one should be disrespected at work, period.'
    ],
    caughtInTheWild: {
      quote: 'kindness costs zero dollars, periodt.',
      context: 'Motivational social banner.',
      highlight: 'period',
      miniChallenge: {
        friendPrompt: 'Is it really necessary to get 8 hours of sleep?',
        expectedAnswerSample: 'Sleep is non-negotiable for health, period!',
        explanation: 'Emphasizes a firm, indisputable conclusion.'
      }
    },
    hindiMeaning: 'बस बात ख़त्म / इसके आगे कोई बहस नहीं।',
    hindiExample: 'मेहनत का कोई शॉर्टकट नहीं होता, बस बात खत्म (period)।',
    featured: false
  },
  {
    word: 'glow up',
    phonetic: '/ˈɡloʊ ʌp/',
    meaning: 'A remarkable transformation in personal appearance, style, confidence, or maturity.',
    category: 'social',
    difficulty: 'beginner',
    tone: 'Celebratory',
    formality: 3,
    energy: 8,
    commonness: 9,
    isSlang: true,
    synonyms: ['makeover', 'transformation', 'metamorphosis'],
    antonyms: ['deterioration', 'decline'],
    similarWords: ['radiance', 'elevation'],
    dontUseIn: 'corporate financial balance sheets',
    examples: [
      'His confidence had a massive glow up since he started running.',
      'Check out this before-and-after photo: what an incredible glow up!',
      'Reading good books gave her a major intellectual glow up.'
    ],
    caughtInTheWild: {
      quote: 'the biggest glow up is learning to protect your peace.',
      context: 'Personal growth Instagram carousel.',
      highlight: 'glow up',
      miniChallenge: {
        friendPrompt: 'Have you seen Marco since high school?',
        expectedAnswerSample: 'Yes! He had an insane glow up, looks like a model!',
        explanation: 'Celebrates a positive personal transformation.'
      }
    },
    hindiMeaning: 'व्यक्तित्व, सुंदरता या आत्मविश्वास में ज़बरदस्त निखार आना।',
    hindiExample: 'कॉलेज के बाद से उसके अंदाज़ और चेहरे में गज़ब का निखार (glow up) आया है।',
    featured: true
  },
  {
    word: 'soft launch',
    phonetic: '/sɔːft lɔːntʃ/',
    meaning: 'Discreetly hinting at something (like a new romantic partner or project) on social media without fully revealing details.',
    category: 'social',
    difficulty: 'intermediate',
    tone: 'Subtle & modern',
    formality: 4,
    energy: 5,
    commonness: 8,
    isSlang: true,
    synonyms: ['teaser', 'sneak peek', 'subtle hint'],
    antonyms: ['hard launch', 'grand reveal'],
    similarWords: ['preview', 'glimpse'],
    dontUseIn: 'maritime naval ship departures',
    examples: [
      'Posting two coffee cups on Instagram is the classic relationship soft launch.',
      'Our team is doing a soft launch of the app with 50 beta testers.',
      'She soft-launched her new song with a 5-second acoustic snippet.'
    ],
    caughtInTheWild: {
      quote: 'posting his watch and hand across the dinner table: the ultimate soft launch.',
      context: 'Relationship trend commentary.',
      highlight: 'soft launch',
      miniChallenge: {
        friendPrompt: 'Is Sarah dating someone new?',
        expectedAnswerSample: 'Looks like it! She just did a soft launch on her stories.',
        explanation: 'Refers to subtle, teasing hints before an official announcement.'
      }
    },
    hindiMeaning: 'बिना पूरा चेहरा या नाम दिखाए धीरे से संकेत देना (जैसे नए रिश्ते का)।',
    hindiExample: 'उसने सोशल मीडिया पर बस एक हाथ की फोटो डालकर रिश्ते का संकेत (soft launch) दिया।',
    featured: false
  },
  {
    word: 'hard launch',
    phonetic: '/hɑːrd lɔːntʃ/',
    meaning: 'Directly and officially announcing or revealing something (like a relationship or company product) publicly.',
    category: 'social',
    difficulty: 'intermediate',
    tone: 'Direct & bold',
    formality: 4,
    energy: 8,
    commonness: 8,
    isSlang: true,
    synonyms: ['official announcement', 'full reveal', 'public debut'],
    antonyms: ['soft launch', 'gatekeep'],
    similarWords: ['unveiling', 'debut'],
    dontUseIn: 'formal government treaties',
    examples: [
      'They skipped the subtle hints and hard launched their wedding photos!',
      'Tomorrow the startup is hard launching their new AI tool.',
      'A framed couple photo as profile picture is a definite hard launch.'
    ],
    caughtInTheWild: {
      quote: 'went from complete silence to a full hard launch on Valentine’s Day.',
      context: 'Celebrity relationship news.',
      highlight: 'hard launch',
      miniChallenge: {
        friendPrompt: 'Did they finally confirm they are together?',
        expectedAnswerSample: 'Yes, they hard launched with a couple photo today!',
        explanation: 'Points to an overt, public confirmation.'
      }
    },
    hindiMeaning: 'खुले तौर पर सबके सामने आधिकारिक घोषणा या खुलासा करना।',
    hindiExample: 'उन्होंने सीधे अपनी शादी की तस्वीर डालकर रिश्ते का औपचारिक ऐलान (hard launch) किया।',
    featured: false
  },
  {
    word: 'bop',
    phonetic: '/bɑːp/',
    meaning: 'An exceptionally catchy, upbeat, and enjoyable song.',
    category: 'casual',
    difficulty: 'beginner',
    tone: 'Enthusiastic & rhythmic',
    formality: 2,
    energy: 8,
    commonness: 9,
    isSlang: true,
    synonyms: ['catchy track', 'jam', 'groove'],
    antonyms: ['skip', 'flop'],
    similarWords: ['anthem', 'hit'],
    dontUseIn: 'classical symphony analysis in conservative music academia',
    examples: [
      'Turn the radio up! This new single is an absolute bop.',
      'Every track on that album is a certified bop 🔥',
      'I cannot stop dancing to this song; what a bop.'
    ],
    caughtInTheWild: {
      quote: 'put your seatbelts on because this song is a timeless bop.',
      context: 'Road trip playlist video.',
      highlight: 'bop',
      miniChallenge: {
        friendPrompt: 'What do you think of the new Dua Lipa song?',
        expectedAnswerSample: 'Turn it up, that track is an undeniable bop!',
        explanation: 'Praises a song for its infectious, danceable melody.'
      }
    },
    hindiMeaning: 'बेहद धमाकेदार, झूमने पर मजबूर करने वाला गाना।',
    hindiExample: 'ये गाना तो गज़ब का धमाकेदार (bop) है, बार-बार सुनने का मन करता है।',
    featured: false
  },
  {
    word: 'salty',
    phonetic: '/ˈsɔːl.ti/',
    meaning: 'Unnecessarily bitter, angry, or resentful, usually over a minor loss or embarrassment.',
    category: 'social',
    difficulty: 'beginner',
    tone: 'Playfully critical',
    formality: 3,
    energy: 6,
    commonness: 9,
    isSlang: true,
    synonyms: ['bitter', 'resentful', 'spiteful', 'sore loser'],
    antonyms: ['gracious', 'sportsmanlike', 'chill'],
    similarWords: ['grumpy', 'peeved'],
    dontUseIn: 'culinary food taste descriptions without making clear if it is seasoning or mood',
    examples: [
      'He was so salty after losing the Mario Kart race that he unplugged the console.',
      'Don’t be salty just because they picked her idea over yours.',
      'Her salty response proved she still cared.'
    ],
    caughtInTheWild: {
      quote: 'why are you so salty today? It was just a friendly game 💀',
      context: 'Post-game lobby chat.',
      highlight: 'salty',
      miniChallenge: {
        friendPrompt: 'Why did Alex leave the room after our board game?',
        expectedAnswerSample: 'Because he was salty about losing in the last round!',
        explanation: 'Identifies irritated, bad-sport behavior.'
      }
    },
    hindiMeaning: 'छोटी सी हार या बात पर चिढ़ जाना / खिसियाना।',
    hindiExample: 'गेम हारने के बाद वो बहुत खिसिया (salty) गया था।',
    featured: false
  },
  {
    word: 'ghost kitchen',
    phonetic: '/ɡoʊst ˈkɪtʃ.ən/',
    meaning: 'A commercial food prep facility that prepares meals only for delivery, with no dining room or storefront.',
    category: 'everyday',
    difficulty: 'intermediate',
    tone: 'Modern urban',
    formality: 6,
    energy: 5,
    commonness: 7,
    isSlang: false,
    synonyms: ['cloud kitchen', 'dark kitchen', 'virtual restaurant'],
    antonyms: ['dine-in restaurant'],
    similarWords: ['food delivery', 'commercial kitchen'],
    dontUseIn: 'haunted house discussions',
    examples: [
      'That viral burger spot doesn’t have seating; it operates out of a ghost kitchen.',
      'Many food delivery startups rely entirely on ghost kitchens to cut overhead.',
      'I tried to walk into the restaurant, only to realize it was a ghost kitchen!'
    ],
    caughtInTheWild: {
      quote: 'half the delivery apps in metro cities are secretly ghost kitchens.',
      context: 'Tech and food economics article.',
      highlight: 'ghost kitchen',
      miniChallenge: {
        friendPrompt: 'Can we sit and eat at that new taco place downtown?',
        expectedAnswerSample: 'No, it’s a ghost kitchen so they only do home delivery!',
        explanation: 'Clarifies that the business is delivery-only.'
      }
    },
    hindiMeaning: 'क्लाउड किचन / ऐसी रसोई जो सिर्फ डिलीवरी के लिए खाना बनाती है।',
    hindiExample: 'वहाँ बैठने की जगह नहीं है, वो सिर्फ डिलीवरी वाली किचन (ghost kitchen) है।',
    featured: false
  },
  {
    word: 'doomscroll',
    phonetic: '/ˈduːm.skroʊl/',
    meaning: 'The act of obsessively scrolling through negative social media feeds and depressing news online.',
    category: 'internet',
    difficulty: 'intermediate',
    tone: 'Cautionary & self-aware',
    formality: 5,
    energy: 4,
    commonness: 9,
    isSlang: false,
    synonyms: ['obsessive scrolling', 'endless feed browsing'],
    antonyms: ['digital detox', 'mindful unplugging'],
    similarWords: ['bingeing', 'scrolling'],
    dontUseIn: 'ancient calligraphy studies',
    examples: [
      'I was supposed to sleep at 11, but I doomscrolled until 2 AM 😭',
      'Doomscrolling first thing in the morning raises cortisol levels.',
      'Set an app timer to stop yourself from doomscrolling bad news.'
    ],
    caughtInTheWild: {
      quote: 'put your phone face down and stop doomscrolling the headlines.',
      context: 'Wellness reminder tweet.',
      highlight: 'doomscroll',
      miniChallenge: {
        friendPrompt: 'Why are you looking so stressed out right now?',
        expectedAnswerSample: 'I’ve been doomscrolling international news for an hour.',
        explanation: 'Explains stress derived from endless consumption of bad news.'
      }
    },
    hindiMeaning: 'फोन पर लगातार बुरी और तनाव भरी खबरें स्क्रॉल करते रहना।',
    hindiExample: 'रात को फोन पर बुरी खबरें स्क्रॉल (doomscroll) करने से नींद उड़ जाती है।',
    featured: true
  },
  {
    word: 'vibe check',
    phonetic: '/vaɪb tʃɛk/',
    meaning: 'An assessment of someone’s mood, energy, attitude, or the general atmosphere of a group.',
    category: 'social',
    difficulty: 'beginner',
    tone: 'Playful & intuitive',
    formality: 2,
    energy: 7,
    commonness: 9,
    isSlang: true,
    synonyms: ['mood assessment', 'energy read', 'temperature check'],
    antonyms: ['indifference'],
    similarWords: ['aura check', 'pulse check'],
    dontUseIn: 'formal aviation pre-flight maintenance protocols',
    examples: [
      'Passing the vibe check means you bring good energy to the room.',
      'He walked into the meeting room and did a quick vibe check.',
      'That grumpy customer completely failed the vibe check today.'
    ],
    caughtInTheWild: {
      quote: 'quick vibe check before we play the next song!',
      context: 'DJ set between tracks.',
      highlight: 'vibe check',
      miniChallenge: {
        friendPrompt: 'How are everyone’s spirits before our long hike?',
        expectedAnswerSample: 'Everyone passed the vibe check, we’re hyped!',
        explanation: 'Assesses group readiness and positive mood.'
      }
    },
    hindiMeaning: 'माहौल या किसी के मूड और मिज़ाज का जायज़ा लेना।',
    hindiExample: 'कमरे में घुसते ही उसने सबका मूड परखा (did a vibe check)।',
    featured: true
  },
  {
    word: 'unspoken rule',
    phonetic: '/ʌnˈspoʊ.kən ruːl/',
    meaning: 'A widely accepted behavioral guideline that everyone understands without it ever being formally written down.',
    category: 'everyday',
    difficulty: 'intermediate',
    tone: 'Social wisdom',
    formality: 6,
    energy: 5,
    commonness: 8,
    isSlang: false,
    synonyms: ['unwritten rule', 'tacit understanding', 'social etiquette'],
    antonyms: ['formal regulation', 'written statute'],
    similarWords: ['norm', 'convention'],
    dontUseIn: 'literal code execution engines',
    examples: [
      'Leaving an empty seat between strangers at the cinema is an unspoken rule.',
      'An unspoken rule of roommates is replacing the toilet paper roll when it ends.',
      'In open offices, putting on headphones is the unspoken rule for "do not disturb".'
    ],
    caughtInTheWild: {
      quote: 'the unspoken rule of the gym: always wipe down the bench.',
      context: 'Fitness etiquette guide.',
      highlight: 'unspoken rule',
      miniChallenge: {
        friendPrompt: 'Why didn’t anyone sit right next to that solo passenger?',
        expectedAnswerSample: 'Because of the unspoken rule to give personal space when seats are open!',
        explanation: 'Refers to unwritten social courtesy.'
      }
    },
    hindiMeaning: 'अलिखित सामाजिक नियम जो सब बिना बोले समझते हैं।',
    hindiExample: 'खाली बस में किसी के बिल्कुल पास न बैठना एक अनकहा नियम (unspoken rule) है।',
    featured: false
  },
  {
    word: 'elevator pitch',
    phonetic: '/ˈɛl.ə.veɪ.tər pɪtʃ/',
    meaning: 'A brief, persuasive 30-to-60-second summary of an idea or product, designed to spark interest.',
    category: 'work',
    difficulty: 'advanced',
    tone: 'Business-sharp',
    formality: 8,
    energy: 7,
    commonness: 8,
    isSlang: false,
    synonyms: ['quick summary', 'speed pitch', 'brief overview'],
    antonyms: ['monograph', 'lengthy dissertation'],
    similarWords: ['synopsis', 'hook'],
    dontUseIn: 'whispering to toddlers',
    examples: [
      'Give me your 30-second elevator pitch for this new English app.',
      'Every founder should polish their elevator pitch before networking events.',
      'If your elevator pitch is confusing, investors will lose interest immediately.'
    ],
    caughtInTheWild: {
      quote: 'you have the duration of one elevator ride to convince them—make it count.',
      context: 'Venture capital workshop.',
      highlight: 'elevator pitch',
      miniChallenge: {
        friendPrompt: 'Can you summarize your startup in one sentence?',
        expectedAnswerSample: 'Here is my elevator pitch: we make language learning as fun as gaming!',
        explanation: 'Delivers a punchy, rapid summary.'
      }
    },
    hindiMeaning: 'किसी विचार या प्रोजेक्ट का 30-60 सेकंड का संक्षिप्त और असरदार परिचय।',
    hindiExample: 'अपने नए आइडिया का एक छोटा और असरदार परिचय (elevator pitch) तैयार रखो।',
    featured: false
  },
  {
    word: 'dealbreaker',
    phonetic: '/ˈdiːlˌbreɪ.kər/',
    meaning: 'A factor, flaw, or issue that immediately causes someone to reject an offer, person, or arrangement.',
    category: 'social',
    difficulty: 'intermediate',
    tone: 'Decisive & firm',
    formality: 6,
    energy: 6,
    commonness: 9,
    isSlang: false,
    synonyms: ['non-negotiable', 'fatal flaw', 'sticking point'],
    antonyms: ['compromise', 'perk'],
    similarWords: ['boundary', 'condition'],
    dontUseIn: 'welding repair operations without metaphor',
    examples: [
      'Lack of remote work flexibility is an immediate dealbreaker for many devs.',
      'Rudeness to service workers is a total dealbreaker for me on a first date.',
      'The apartment had no natural light, which was a dealbreaker.'
    ],
    caughtInTheWild: {
      quote: 'know your dealbreakers before signing a lease or a contract.',
      context: 'Apartment hunting guide.',
      highlight: 'dealbreaker',
      miniChallenge: {
        friendPrompt: 'Why did you reject that high-paying job offer?',
        expectedAnswerSample: 'Having to commute two hours each day was a complete dealbreaker.',
        explanation: 'Cites a decisive non-negotiable flaw.'
      }
    },
    hindiMeaning: 'ऐसी कमी या शर्त जिसके कारण सौदा या रिश्ता तुरंत रद्द हो जाए।',
    hindiExample: 'दफ्तर बहुत दूर होना मेरे लिए इस नौकरी को ठुकराने का मुख्य कारण (dealbreaker) था।',
    featured: false
  },
  {
    word: 'micro-nap',
    phonetic: '/ˈmaɪ.kroʊ næp/',
    meaning: 'A very short nap (often 5 to 15 minutes) taken to rapidly regain alertness.',
    category: 'everyday',
    difficulty: 'beginner',
    tone: 'Cozy & practical',
    formality: 4,
    energy: 4,
    commonness: 7,
    isSlang: false,
    synonyms: ['power nap', 'catnap', 'snooze'],
    antonyms: ['deep slumber', 'all-nighter'],
    similarWords: ['rest', 'recharge'],
    dontUseIn: 'formal sleep clinic medical charting',
    examples: [
      'A 10-minute micro-nap after lunch completely revitalized my focus.',
      'I took a quick micro-nap on the train ride home.',
      'Micro-naps prevent late-afternoon brain fog.'
    ],
    caughtInTheWild: {
      quote: 'don’t reach for energy drinks—take a 12-minute micro-nap instead.',
      context: 'Productivity biohacker newsletter.',
      highlight: 'micro-nap',
      miniChallenge: {
        friendPrompt: 'How did you recover after studying since dawn?',
        expectedAnswerSample: 'I took a quick 10-minute micro-nap and felt brand new!',
        explanation: 'Reports taking a brief revitalizing nap.'
      }
    },
    hindiMeaning: 'ताज़गी पाने के लिए ली जाने वाली 5-10 मिनट की हल्की झपकी।',
    hindiExample: 'दोपहर में 10 मिनट की झपकी (micro-nap) लेने से दिमाग फिर से ताज़ा हो जाता है।',
    featured: false
  },
  {
    word: 'brain rot',
    phonetic: '/breɪn rɑːt/',
    meaning: 'Low-quality, mindless internet content that feels like it degrades your cognitive abilities, or the state of mind resulting from it.',
    category: 'internet',
    difficulty: 'intermediate',
    tone: 'Hyper-satirical',
    formality: 1,
    energy: 6,
    commonness: 9,
    isSlang: true,
    synonyms: ['mindless media', 'nonsense content', 'junk food for the brain'],
    antonyms: ['intellectual stimulation', 'enrichment'],
    similarWords: ['doomscroll', 'sludge'],
    dontUseIn: 'neurology clinics or formal medical diagnosis',
    examples: [
      'Watching six hours of random TikTok sounds is pure brain rot 💀',
      'I can feel the brain rot taking over after scrolling at 1 AM.',
      'Let’s read an actual book to cure this digital brain rot.'
    ],
    caughtInTheWild: {
      quote: 'this short form video trend is absolute grade-A brain rot 😭',
      context: 'YouTube video essay on internet trends.',
      highlight: 'brain rot',
      miniChallenge: {
        friendPrompt: 'What did you watch all evening yesterday?',
        expectedAnswerSample: 'Just random meme videos, total brain rot honestly!',
        explanation: 'Humorously acknowledges consuming mindless internet noise.'
      }
    },
    hindiMeaning: 'इंटरनेट पर लगातार देखा जाने वाला फालतू और दिमाग सुन्न करने वाला कंटेंट।',
    hindiExample: 'घंटों फालतू रील्स देखना दिमाग को सुन्न (brain rot) कर देता है।',
    featured: true
  },
  {
    word: 'era',
    phonetic: '/ˈɪr.ə/',
    meaning: 'A distinct phase, mood, or lifestyle chapter someone is currently living in.',
    category: 'internet',
    difficulty: 'beginner',
    tone: 'Expressive & aesthetic',
    formality: 4,
    energy: 7,
    commonness: 9,
    isSlang: true,
    synonyms: ['phase', 'chapter', 'season'],
    antonyms: ['stagnation'],
    similarWords: ['vibe', 'mood'],
    dontUseIn: 'geological epoch reports unless referring to the Mesozoic',
    examples: [
      'I am currently in my healthy eating and gym era.',
      'She entered her villain era and stopped pleasing everyone.',
      'Welcome to my unbothered, peace-of-mind era ✨'
    ],
    caughtInTheWild: {
      quote: 'officially entering my reading 50 books a year era.',
      context: 'Instagram bio update.',
      highlight: 'era',
      miniChallenge: {
        friendPrompt: 'Why are you waking up at 6 AM and drinking herbal tea?',
        expectedAnswerSample: 'I’m officially in my wellness era!',
        explanation: 'Labels a new personal life chapter or aesthetic.'
      }
    },
    hindiMeaning: 'ज़िंदगी का कोई नया दौर, मिज़ाज या अध्याय।',
    hindiExample: 'मैं आजकल अपनी सेहत सुधारने वाले दौर (wellness era) में चल रहा हूँ।',
    featured: false
  },
  {
    word: 'gas up',
    phonetic: '/ɡæs ʌp/',
    meaning: 'To enthusiastically compliment, hype up, or boost someone’s confidence.',
    category: 'social',
    difficulty: 'beginner',
    tone: 'Supportive & hype',
    formality: 2,
    energy: 9,
    commonness: 9,
    isSlang: true,
    synonyms: ['hype up', 'boost', 'flatter', 'cheer for'],
    antonyms: ['bring down', 'criticize', 'belittle'],
    similarWords: ['encourage', 'praise'],
    dontUseIn: 'petrol pump refilling instructions without clarifying',
    examples: [
      'True best friends will always gas you up in the group chat.',
      'Stop gassing him up or his ego will not fit through the door 💀',
      'She hyped her sister up before the audition: total gas up session.'
    ],
    caughtInTheWild: {
      quote: 'need friends who gas you up whenever you wear a fresh fit 🔥',
      context: 'TikTok friendship video.',
      highlight: 'gas up',
      miniChallenge: {
        friendPrompt: 'Did you hear what they said when you showed your art?',
        expectedAnswerSample: 'Yeah, they gassed me up so much, I felt like Picasso!',
        explanation: 'Celebrates friends boosting someone’s confidence enthusiastically.'
      }
    },
    hindiMeaning: 'किसी की जमकर तारीफ करना या उसका हौसला बढ़ाना।',
    hindiExample: 'मेरे दोस्तों ने मेरी तारीफ कर-करके मेरा हौसला सातवें आसमान पर पहुँचा दिया (gassed me up)।',
    featured: true
  },
  {
    word: 'flex',
    phonetic: '/flɛks/',
    meaning: 'To show off, boast, or demonstrate wealth, skill, or status.',
    category: 'casual',
    difficulty: 'beginner',
    tone: 'Playful boast',
    formality: 3,
    energy: 7,
    commonness: 9,
    isSlang: true,
    synonyms: ['show off', 'brag', 'flaunt'],
    antonyms: ['stay humble', 'downplay'],
    similarWords: ['boast', 'parade'],
    dontUseIn: 'medical muscle physiology without literal context',
    examples: [
      'Casual flex: speaking three languages fluently.',
      'Wearing an expensive watch just to check the time is an obvious flex.',
      'Weird flex, but okay 💀'
    ],
    caughtInTheWild: {
      quote: 'having eight hours of undisturbed sleep is the real adult flex.',
      context: 'Twitter lifestyle observation.',
      highlight: 'flex',
      miniChallenge: {
        friendPrompt: 'Did you know Kevin bought front row tickets?',
        expectedAnswerSample: 'Yeah, he was flexing them on his stories all day!',
        explanation: 'Identifies someone openly showing off an achievement or possession.'
      }
    },
    hindiMeaning: 'रौब झाड़ना या किसी चीज़ का दिखावा करना।',
    hindiExample: 'बिना किसी घमंड के अपनी उपलब्धियों का दिखावा करना (flexing)।',
    featured: false
  },
  {
    word: 'take it with a grain of salt',
    phonetic: '/teɪk ɪt wɪð ə ɡreɪn əv sɔːlt/',
    meaning: 'To view advice, gossip, or claims with skepticism and not take them as absolute fact.',
    category: 'everyday',
    difficulty: 'intermediate',
    tone: 'Wise & cautious',
    formality: 7,
    energy: 5,
    commonness: 9,
    isSlang: false,
    synonyms: ['be skeptical', 'verify independently', 'reserve judgment'],
    antonyms: ['swallow whole', 'believe blindly'],
    similarWords: ['skepticism', 'caution'],
    dontUseIn: 'food recipes unless instructing seasoning',
    examples: [
      'Celebrity gossip accounts? Take everything they say with a grain of salt.',
      'The timeline was estimated quickly, so take it with a grain of salt.',
      'He tends to exaggerate his victories, so take his stories with a grain of salt.'
    ],
    caughtInTheWild: {
      quote: 'rumors are circulating, but take them with a grain of salt until verified.',
      context: 'Tech release leak report.',
      highlight: 'grain of salt',
      miniChallenge: {
        friendPrompt: 'Did you hear the company might close early on Friday?',
        expectedAnswerSample: 'I heard that too, but let’s take it with a grain of salt until an email goes out.',
        explanation: 'Counsels healthy skepticism before official verification.'
      }
    },
    hindiMeaning: 'पूरी तरह सच न मानना / थोड़ा शक की नज़र से देखना।',
    hindiExample: 'इंटरनेट की हर बात पर आँख मूँदकर भरोसा मत करो, थोड़ा शक की गुंजाइश रखो (take with a grain of salt)।',
    featured: false
  },
  {
    word: 'under the weather',
    phonetic: '/ˈʌn.dər ðə ˈwɛð.ər/',
    meaning: 'Feeling slightly ill, indisposed, or low in energy.',
    category: 'everyday',
    difficulty: 'beginner',
    tone: 'Gentle idiom',
    formality: 6,
    energy: 3,
    commonness: 9,
    isSlang: false,
    synonyms: ['unwell', 'sickly', 'indisposed'],
    antonyms: ['healthy', 'fit as a fiddle'],
    similarWords: ['ailing', 'run down'],
    dontUseIn: 'literal meteorology discussions',
    examples: [
      'I will be working from home today as I feel slightly under the weather.',
      'A warm bowl of soup is perfect when you are under the weather.',
      'She canceled the coffee catch-up because she was feeling under the weather.'
    ],
    caughtInTheWild: {
      quote: 'apologies for missing the call today—I woke up feeling quite under the weather.',
      context: 'Polite client Slack notification.',
      highlight: 'under the weather',
      miniChallenge: {
        friendPrompt: 'Are you coming to the football match tonight?',
        expectedAnswerSample: 'Sorry, I am feeling a bit under the weather so I’m resting.',
        explanation: 'Politely excuses oneself due to mild illness.'
      }
    },
    hindiMeaning: 'तबीयत थोड़ी नासाज़ या खराब होना।',
    hindiExample: 'मेरी तबीयत थोड़ी नासाज़ (under the weather) है, इसलिए आज आराम कर रहा हूँ।',
    featured: false
  },
  {
    word: 'spill the tea',
    phonetic: '/spɪl ðə tiː/',
    meaning: 'To share gossip, secrets, or behind-the-scenes drama.',
    category: 'social',
    difficulty: 'beginner',
    tone: 'Juicy & informal',
    formality: 2,
    energy: 8,
    commonness: 9,
    isSlang: true,
    synonyms: ['share gossip', 'dish the dirt', 'tell all'],
    antonyms: ['keep secret', 'stay silent'],
    similarWords: ['gossip', 'reveal'],
    dontUseIn: 'formal tea ceremony instructions without cleaning supplies',
    examples: [
      'Sit down and spill the tea; what happened on your date yesterday?',
      'She promised to spill the tea about the office restructuring.',
      'No tea was spilled, they kept everything confidential.'
    ],
    caughtInTheWild: {
      quote: 'grab your popcorn because she is about to spill the tea ☕👀',
      context: 'YouTube storytime video title.',
      highlight: 'spill the tea',
      miniChallenge: {
        friendPrompt: 'Did you find out why the manager resigned suddenly?',
        expectedAnswerSample: 'Yes! Sit down and let me spill the tea!',
        explanation: 'Offers to reveal fascinating behind-the-scenes drama.'
      }
    },
    hindiMeaning: 'राज़ खोलना / गपशप या अंदर की बात बताना।',
    hindiExample: 'बैठो और बताओ कि असल में क्या हुआ था (spill the tea)।',
    featured: true
  },
  {
    word: 'clout',
    phonetic: '/klaʊt/',
    meaning: 'Influence, social power, or online fame and popularity.',
    category: 'internet',
    difficulty: 'intermediate',
    tone: 'Critical or ambitious',
    formality: 3,
    energy: 7,
    commonness: 9,
    isSlang: true,
    synonyms: ['influence', 'reputation', 'leverage', 'fame'],
    antonyms: ['obscurity', 'irrelevance'],
    similarWords: ['swag', 'status'],
    dontUseIn: 'formal medieval textile trade records',
    examples: [
      'He started fake drama online purely for clout.',
      'Having millions of followers gives creators massive commercial clout.',
      'Chasing clout at the expense of honesty never ends well.'
    ],
    caughtInTheWild: {
      quote: 'don’t ruin a real friendship for 15 seconds of internet clout.',
      context: 'Creator commentary video.',
      highlight: 'clout',
      miniChallenge: {
        friendPrompt: 'Why did that creator pull such a dangerous stunt?',
        expectedAnswerSample: 'Probably just chasing views and online clout!',
        explanation: 'Attributes wild public behavior to the desire for internet fame.'
      }
    },
    hindiMeaning: 'रसूख, दबदबा या सोशल मीडिया की शोहरत।',
    hindiExample: 'उसने केवल इंटरनेट पर शोहरत और दबदबे (clout) के लिए ये नाटक किया।',
    featured: false
  },
  {
    word: 'icing on the cake',
    phonetic: '/ˈaɪ.sɪŋ ɑːn ðə keɪk/',
    meaning: 'An attractive, unexpected bonus that makes an already great situation even better.',
    category: 'everyday',
    difficulty: 'intermediate',
    tone: 'Delightful idiom',
    formality: 6,
    energy: 7,
    commonness: 9,
    isSlang: false,
    synonyms: ['cherry on top', 'added bonus', 'crowning touch'],
    antonyms: ['spoiler', 'downside'],
    similarWords: ['bonus', 'perk'],
    dontUseIn: 'baking recipes as metaphor (use literal "frosting")',
    examples: [
      'Landing the dream job was amazing; getting an extra signing bonus was the icing on the cake.',
      'The concert was already historic, but the surprise guest was the icing on the cake.',
      'Good weather on holiday was simply the icing on the cake.'
    ],
    caughtInTheWild: {
      quote: 'winning the match was great, but doing it in front of family was the icing on the cake.',
      context: 'Athlete post-match interview.',
      highlight: 'icing on the cake',
      miniChallenge: {
        friendPrompt: 'How was the road trip to the mountains?',
        expectedAnswerSample: 'Incredible, and seeing shooting stars was the icing on the cake!',
        explanation: 'Celebrates an extra pleasant touch on an already wonderful event.'
      }
    },
    hindiMeaning: 'सोने पे सुहागा / किसी अच्छी चीज़ में चार चाँद लगना।',
    hindiExample: 'जीत तो मिली ही, ट्रॉफी अपने घर में मिलना सोने पे सुहागा (icing on the cake) था।',
    featured: false
  },
  {
    word: 'silver lining',
    phonetic: '/ˈsɪl.vər ˈlaɪ.nɪŋ/',
    meaning: 'A comforting, positive aspect present even inside an otherwise gloomy or unfortunate situation.',
    category: 'everyday',
    difficulty: 'intermediate',
    tone: 'Uplifting & resilient',
    formality: 7,
    energy: 6,
    commonness: 9,
    isSlang: false,
    synonyms: ['bright side', 'hidden blessing', 'redeeming feature'],
    antonyms: ['drawback', 'dark cloud'],
    similarWords: ['optimism', 'hope'],
    dontUseIn: 'textile metallic thread manufacturing specs',
    examples: [
      'The flight delay was annoying, but the silver lining was catching up with my best friend.',
      'Every cloud has a silver lining if you choose to look for it.',
      'Missing that bus was a silver lining because I avoided a sudden thunderstorm.'
    ],
    caughtInTheWild: {
      quote: 'losing that client forced us to innovate—a true silver lining.',
      context: 'Entrepreneurship reflection.',
      highlight: 'silver lining',
      miniChallenge: {
        friendPrompt: 'Are you upset that your flight got rescheduled to tomorrow?',
        expectedAnswerSample: 'A bit, but the silver lining is getting an extra day to explore the city!',
        explanation: 'Finds the optimistic upside in an inconvenient turn of events.'
      }
    },
    hindiMeaning: 'मुसीबत या निराशा के बीच भी उम्मीद या अच्छाई की किरण।',
    hindiExample: 'योजना रद्द होने की अच्छी बात (silver lining) ये रही कि हमें आराम करने का समय मिल गया।',
    featured: true
  },
  {
    word: 'bite the bullet',
    phonetic: '/baɪt ðə ˈbʊl.ɪt/',
    meaning: 'To face an inevitable, unpleasant, or painful situation with courage and get it over with.',
    category: 'everyday',
    difficulty: 'intermediate',
    tone: 'Resolute & gritty',
    formality: 6,
    energy: 7,
    commonness: 8,
    isSlang: false,
    synonyms: ['face the music', 'swallow the bitter pill', 'take the plunge'],
    antonyms: ['procrastinate', 'avoid'],
    similarWords: ['endure', 'confront'],
    dontUseIn: 'military firearms safety seminars',
    examples: [
      'I hate dentists, but my toothache hurts so I just have to bite the bullet.',
      'He finally bit the bullet and apologized for the misunderstanding.',
      'Stop putting off that difficult phone call; bite the bullet and dial.'
    ],
    caughtInTheWild: {
      quote: 'sometimes you just have to bite the bullet and invest in quality equipment.',
      context: 'Camera gear review.',
      highlight: 'bite the bullet',
      miniChallenge: {
        friendPrompt: 'Have you told your landlord about the broken window yet?',
        expectedAnswerSample: 'Not yet, but I’m going to bite the bullet and call him today.',
        explanation: 'Decides to confront an uncomfortable task courageously.'
      }
    },
    hindiMeaning: 'कड़वा घूंट पीना / किसी अप्रिय स्थिति का हिम्मत से सामना करना।',
    hindiExample: 'अब और टालने से काम नहीं चलेगा, हिम्मत करके इस मुश्किल काम को खत्म करो (bite the bullet)।',
    featured: false
  },
  {
    word: 'call it a day',
    phonetic: '/kɔːl ɪt ə deɪ/',
    meaning: 'To decide to stop working on an activity, usually because enough has been accomplished or you are tired.',
    category: 'work',
    difficulty: 'beginner',
    tone: 'Relieved & definitive',
    formality: 6,
    energy: 4,
    commonness: 10,
    isSlang: false,
    synonyms: ['wrap up', 'clock out', 'finish up'],
    antonyms: ['pull an all-nighter', 'continue indefinitely'],
    similarWords: ['halt', 'retire'],
    dontUseIn: 'calendar naming discussions',
    examples: [
      'We’ve fixed four bugs and it’s 7 PM; let’s call it a day.',
      'I’m too exhausted to code properly; let’s call it a day and resume tomorrow.',
      'After 15 miles of hiking, the group decided to call it a day and pitch tents.'
    ],
    caughtInTheWild: {
      quote: 'great progress on the design sprint team—let’s call it a day.',
      context: 'Team lead closing out a late meeting.',
      highlight: 'call it a day',
      miniChallenge: {
        friendPrompt: 'Should we review chapter 5 tonight or go to sleep?',
        expectedAnswerSample: 'We covered so much already, let’s call it a day!',
        explanation: 'Suggests ending the work session for the evening.'
      }
    },
    hindiMeaning: 'आज का काम यहीं खत्म करना / छुट्टी करना।',
    hindiExample: 'काफी देर से काम कर रहे हैं, चलो आज का काम यहीं खत्म करते हैं (call it a day)।',
    featured: false
  },
  {
    word: 'cut corners',
    phonetic: '/kʌt ˈkɔːr.nərz/',
    meaning: 'To do something in the easiest, cheapest, or fastest way, often compromising quality or safety.',
    category: 'work',
    difficulty: 'intermediate',
    tone: 'Critical warning',
    formality: 6,
    energy: 5,
    commonness: 9,
    isSlang: false,
    synonyms: ['skimp', 'take shortcuts', 'compromise standards'],
    antonyms: ['do by the book', 'meticulous craftsmanship'],
    similarWords: ['cheap out', 'rush'],
    dontUseIn: 'geometry scissors crafts without pun intention',
    examples: [
      'Never cut corners on airplane safety maintenance.',
      'The contractor cut corners using cheap cement, and the wall cracked.',
      'If you cut corners in your preparation, it will show during the exam.'
    ],
    caughtInTheWild: {
      quote: 'don’t cut corners when building your foundation—it will cost double later.',
      context: 'Architectural engineering quote.',
      highlight: 'cut corners',
      miniChallenge: {
        friendPrompt: 'Why did the cheap smartphone break after one week?',
        expectedAnswerSample: 'Because the manufacturer cut corners on battery quality!',
        explanation: 'Critiques compromising quality to save cost or time.'
      }
    },
    hindiMeaning: 'कामचोरी करना / लागत घटाने के चक्कर में गुणवत्ता गिराना।',
    hindiExample: 'सस्ते के चक्कर में काम में घटिया सामग्री लगाकर लापरवाही (cutting corners) मत करो।',
    featured: false
  },
  {
    word: 'on the same page',
    phonetic: '/ɑːn ðə seɪm peɪdʒ/',
    meaning: 'Sharing the exact same understanding, thinking, or agreement about a plan or topic.',
    category: 'work',
    difficulty: 'beginner',
    tone: 'Collaborative clarity',
    formality: 6,
    energy: 6,
    commonness: 10,
    isSlang: false,
    synonyms: ['in agreement', 'aligned', 'in sync'],
    antonyms: ['at odds', 'misaligned', 'talking past each other'],
    similarWords: ['unified', 'concordant'],
    dontUseIn: 'checking identical book pagination without metaphor',
    examples: [
      'Let’s have a quick 5-minute sync to ensure we are on the same page.',
      'Before we submit the proposal, is everyone on the same page regarding pricing?',
      'Communication is vital so partners stay on the same page.'
    ],
    caughtInTheWild: {
      quote: 'just re-iterating these action items so our entire crew is on the same page.',
      context: 'Email summary footer.',
      highlight: 'on the same page',
      miniChallenge: {
        friendPrompt: 'Do we both know who is bringing what to the party?',
        expectedAnswerSample: 'Yes! Let’s double-check the list so we’re on the same page.',
        explanation: 'Confirms shared mutual understanding.'
      }
    },
    hindiMeaning: 'एक ही राय या समझ पर सहमत होना / तालमेल होना।',
    hindiExample: 'यह ज़रूरी है कि प्रोजेक्ट पर काम शुरू करने से पहले हम सब एक राय (on the same page) हों।',
    featured: false
  },
  {
    word: 'give the benefit of the doubt',
    phonetic: '/ɡɪv ðə ˈbɛn.ə.fɪt əv ðə daʊt/',
    meaning: 'To choose to trust someone’s good intentions or honesty even when things look slightly questionable.',
    category: 'social',
    difficulty: 'advanced',
    tone: 'Generous & fair',
    formality: 7,
    energy: 5,
    commonness: 8,
    isSlang: false,
    synonyms: ['assume good faith', 'trust', 'forgive initial doubt'],
    antonyms: ['judge harshly', 'condemn without proof'],
    similarWords: ['lenience', 'patience'],
    dontUseIn: 'strict criminal court sentencing rules without legal context',
    examples: [
      'He was late, but traffic was terrible, so I gave him the benefit of the doubt.',
      'Instead of immediately getting upset, give your teammate the benefit of the doubt.',
      'She deserved the benefit of the doubt after years of loyal service.'
    ],
    caughtInTheWild: {
      quote: 'healthy relationships thrive when partners give each other the benefit of the doubt.',
      context: 'Psychology relationship column.',
      highlight: 'benefit of the doubt',
      miniChallenge: {
        friendPrompt: 'Alex forgot to reply to your text yesterday. Are you mad?',
        expectedAnswerSample: 'No, he was probably swamped with work—I’ll give him the benefit of the doubt.',
        explanation: 'Chooses to assume good faith rather than malice.'
      }
    },
    hindiMeaning: 'संदेह का लाभ देना / शक करने के बजाय सामने वाले की नीयत पर भरोसा करना।',
    hindiExample: 'नाराज़ होने से पहले उसे अपनी बात समझाने का मौका दो (give the benefit of the doubt)।',
    featured: false
  },
  {
    word: 'burn bridges',
    phonetic: '/bɜːrn ˈbrɪdʒ.ɪz/',
    meaning: 'To permanently destroy relationships or connections with people or past employers so you can never return.',
    category: 'work',
    difficulty: 'intermediate',
    tone: 'Cautionary idiom',
    formality: 6,
    energy: 7,
    commonness: 9,
    isSlang: false,
    synonyms: ['sever ties permanently', 'alienate', 'ruin relationships'],
    antonyms: ['maintain cordial ties', 'build connections'],
    similarWords: ['rupture', 'destroy'],
    dontUseIn: 'literal civil bridge engineering safety inspections',
    examples: [
      'Even if you dislike your former boss, do not burn bridges when resigning.',
      'The industry is smaller than you think; avoid burning bridges.',
      'He burned bridges with everyone on the startup team during his exit.'
    ],
    caughtInTheWild: {
      quote: 'leave every company with grace; never burn bridges on your way out.',
      context: 'Career advisory article.',
      highlight: 'burn bridges',
      miniChallenge: {
        friendPrompt: 'Should I tell off my manager in my exit interview?',
        expectedAnswerSample: 'Definitely not! You don’t want to burn bridges in your career.',
        explanation: 'Warns against destroying valuable professional connections.'
      }
    },
    hindiMeaning: 'पुराने संबंध या रास्ते हमेशा के लिए बिगाड़ लेना।',
    hindiExample: 'नौकरी छोड़ते वक्त किसी से संबंध खराब मत करो (don’t burn bridges)।',
    featured: false
  },
  {
    word: 'pull someone’s leg',
    phonetic: '/pʊl ˈsʌm.wʌnz lɛɡ/',
    meaning: 'To playfully deceive or tease someone as a friendly joke.',
    category: 'everyday',
    difficulty: 'beginner',
    tone: 'Playful & affectionate',
    formality: 5,
    energy: 7,
    commonness: 8,
    isSlang: false,
    synonyms: ['tease', 'kid', 'joke around with', 'prank'],
    antonyms: ['speak seriously', 'mislead maliciously'],
    similarWords: ['banter', 'ribbing'],
    dontUseIn: 'physical orthopedic therapy rooms without smiling',
    examples: [
      'Don’t worry, I didn’t actually lose your keys—I was just pulling your leg!',
      'Are you serious or are you just pulling my leg?',
      'My grandfather loved pulling our legs with wild animal stories.'
    ],
    caughtInTheWild: {
      quote: 'relax bro, nobody is canceling the trip, I’m just pulling your leg 😭',
      context: 'WhatsApp prank message.',
      highlight: 'pulling your leg',
      miniChallenge: {
        friendPrompt: 'Did you really see an alien spaceship in the backyard?',
        expectedAnswerSample: 'Haha no, I was just pulling your leg!',
        explanation: 'Admits to teasing playfully as a joke.'
      }
    },
    hindiMeaning: 'मज़ाक में टांग खींचना या मस्ती करना।',
    hindiExample: 'अरे परेशान मत हो, मैं तो बस तुम्हारी टांग खींच रहा था (pulling your leg)।',
    featured: false
  },
  {
    word: 'see eye to eye',
    phonetic: '/siː aɪ tuː aɪ/',
    meaning: 'To agree completely with someone on an opinion, principle, or viewpoint.',
    category: 'social',
    difficulty: 'beginner',
    tone: 'Conciliatory & clear',
    formality: 6,
    energy: 5,
    commonness: 9,
    isSlang: false,
    synonyms: ['agree', 'share views', 'concur'],
    antonyms: ['clash', 'disagree', 'differ'],
    similarWords: ['harmony', 'consensus'],
    dontUseIn: 'optometry height alignment calibrations',
    examples: [
      'My brother and I don’t always see eye to eye on politics, but we love each other.',
      'The management and the union finally saw eye to eye regarding pay raises.',
      'It’s great working with someone when you see eye to eye on design aesthetics.'
    ],
    caughtInTheWild: {
      quote: 'you don’t need to see eye to eye on everything to build a strong friendship.',
      context: 'Quote of the day post.',
      highlight: 'see eye to eye',
      miniChallenge: {
        friendPrompt: 'Did you and your co-founder agree on the new logo?',
        expectedAnswerSample: 'We didn’t see eye to eye at first, but we found a great middle ground.',
        explanation: 'Expresses reaching or navigating agreement.'
      }
    },
    hindiMeaning: 'एक राय होना / पूरी तरह सहमत होना।',
    hindiExample: 'हर मुद्दे पर हमारी सोच एक जैसी (see eye to eye) नहीं हो सकती, पर हम एक दूसरे का सम्मान करते हैं।',
    featured: false
  },
  {
    word: 'out of the loop',
    phonetic: '/aʊt əv ðə luːp/',
    meaning: 'Not having knowledge of or being kept uninformed about recent developments or plans.',
    category: 'social',
    difficulty: 'beginner',
    tone: 'Curious & uninformed',
    formality: 5,
    energy: 4,
    commonness: 9,
    isSlang: false,
    synonyms: ['uninformed', 'in the dark', 'oblivious'],
    antonyms: ['in the loop', 'in the know'],
    similarWords: ['disconnected', 'unaware'],
    dontUseIn: 'knitting yarn crochet manuals without irony',
    examples: [
      'I was on vacation for a week, so I am completely out of the loop on office news.',
      'Fill me in! Why is everyone laughing? I feel so out of the loop.',
      'Never leave key stakeholders out of the loop during a software migration.'
    ],
    caughtInTheWild: {
      quote: 'can someone explain the new meme to me? I am deeply out of the loop 😭',
      context: 'Reddit comment query.',
      highlight: 'out of the loop',
      miniChallenge: {
        friendPrompt: 'Did you hear what happened between Mark and Sarah?',
        expectedAnswerSample: 'No, I’ve been out of the loop all week! Tell me everything.',
        explanation: 'States that one has missed recent updates or gossip.'
      }
    },
    hindiMeaning: 'हालिया बातों या खबरों से अनजान होना / बात की भनक न होना।',
    hindiExample: 'मैं छुट्टी पर था इसलिए मुझे दफ्तर की नई खबरों की कोई जानकारी नहीं (out of the loop) है।',
    featured: false
  },
  {
    word: 'in the loop',
    phonetic: '/ɪn ðə luːp/',
    meaning: 'Informed, updated, and part of the select group that receives ongoing information.',
    category: 'work',
    difficulty: 'beginner',
    tone: 'Informed & communicative',
    formality: 6,
    energy: 6,
    commonness: 10,
    isSlang: false,
    synonyms: ['updated', 'in the know', 'informed'],
    antonyms: ['out of the loop', 'sidelined'],
    similarWords: ['plugged-in', 'aware'],
    dontUseIn: 'roller coaster track inspection specs',
    examples: [
      'Please loop me in on the email chain with the client.',
      'Thanks for keeping me in the loop regarding the release timeline.',
      'Good managers ensure their entire team stays in the loop.'
    ],
    caughtInTheWild: {
      quote: 'cc me on that thread so I can stay in the loop.',
      context: 'Executive email signoff.',
      highlight: 'in the loop',
      miniChallenge: {
        friendPrompt: 'Will you let me know if the party location changes?',
        expectedAnswerSample: 'Definitely, I’ll keep you in the loop as soon as we know!',
        explanation: 'Promises to keep someone updated with all new info.'
      }
    },
    hindiMeaning: 'पूरी तरह सूचित रहना / हर खबर या अपडेट से जुड़े रहना।',
    hindiExample: 'आगे जो भी फैसला हो, मुझे भी बताते रहना (keep me in the loop)।',
    featured: false
  },
  {
    word: "play devil's advocate",
    phonetic: '/pleɪ ˈdɛv.əlz ˈæd.və.kət/',
    meaning: 'To present a counterargument or challenge an assumption for the sake of healthy debate, even if you do not necessarily disagree.',
    category: 'work',
    difficulty: 'advanced',
    tone: 'Thoughtful / Professional',
    formality: 7,
    energy: 5,
    commonness: 7,
    isSlang: false,
    synonyms: ['argue the other side', 'challenge the premise', 'offer a counterpoint'],
    antonyms: ['nod along', 'blindly agree'],
    similarWords: ['scrutinize', 'stress-test', 'deliberate'],
    dontUseIn: 'emotional personal arguments or heated conflicts',
    examples: [
      'Just to play devil’s advocate, what happens if our primary supplier raises prices next quarter?',
      'Let me play devil’s advocate for a second: is this really a user problem or an engineering assumption?'
    ],
    caughtInTheWild: {
      quote: 'I want to play devil’s advocate on slide 4 before we present this to leadership.',
      context: 'Strategy meeting room discussion.',
      highlight: "play devil's advocate",
      miniChallenge: {
        friendPrompt: 'Everyone thinks launching early is best. What do you think?',
        expectedAnswerSample: 'Just to play devil’s advocate, do we have enough QA testing to avoid day-one bugs?',
        explanation: 'Challenges the group consensus analytically and constructively.'
      }
    },
    hindiMeaning: 'विपरीत पहलू या कमी को सामने रखकर बहस करना ताकि फैसला मजबूत हो।',
    hindiExample: 'बस बहस के खातिर (to play devil’s advocate), अगर यूजर बेस गिर गया तो क्या होगा?',
    featured: true
  },
  {
    word: 'circle back',
    phonetic: '/ˈsɜːr.kəl bæk/',
    meaning: 'To return to a topic, question, or discussion at a later time after gathering more information.',
    category: 'work',
    difficulty: 'advanced',
    tone: 'Professional / Polished',
    formality: 8,
    energy: 4,
    commonness: 8,
    isSlang: false,
    synonyms: ['revisit', 'follow up later', 'reconnect'],
    antonyms: ['finalize now', 'drop the subject'],
    similarWords: ['table this', 'touch base', 'follow up'],
    dontUseIn: 'casual texting with close friends when a quick yes/no is needed',
    examples: [
      'Let’s circle back to this after the metrics come in on Thursday.',
      'I will look into the server logs and circle back to you before end of day.'
    ],
    caughtInTheWild: {
      quote: 'Great point, let’s circle back to that at the end of the meeting.',
      context: 'Cross-functional sync email.',
      highlight: 'circle back',
      miniChallenge: {
        friendPrompt: 'Did we decide on the marketing budget yet?',
        expectedAnswerSample: 'Not yet, let’s circle back tomorrow morning once we get finance approval.',
        explanation: 'Postpones deciding until further details are ready.'
      }
    },
    hindiMeaning: 'किसी विषय पर बाद में दोबारा चर्चा करना या अपडेट देना।',
    hindiExample: 'मैं इसपर आंकड़े देखकर शाम तक दोबारा बात करूँगा (circle back)।',
    featured: false
  }
];

export const readingSeed = [
  // CHAT STORIES (5)
  {
    title: 'When Plans Collapse at 7:15 PM 💀',
    type: 'chat_story',
    category: 'social',
    difficulty: 'beginner',
    estimatedTime: '60 sec',
    summary: 'Maya and Sam try to figure out whether the Friday night dinner is actually happening.',
    chatMessages: [
      { sender: 'Maya', text: 'yo are you coming tonight or what? 😭', isUser: false, time: '7:14 PM' },
      { sender: 'Sam', text: 'idk tbh... my battery was on 3% all day', isUser: true, time: '7:15 PM' },
      { sender: 'Maya', text: 'bro you literally said yes yesterday 💀 everyone is already at the diner', isUser: false, time: '7:16 PM' },
      { sender: 'Sam', text: 'yeah but... my mom found out about the midterm grade 😭', isUser: true, time: '7:17 PM' },
      { sender: 'Maya', text: 'OH NO 💀 are you grounded?!', isUser: false, time: '7:17 PM' },
      { sender: 'Sam', text: 'grounded is an understatement. I am serving a life sentence in my bedroom rn', isUser: true, time: '7:18 PM' },
      { sender: 'Maya', text: 'lmao RIP. I will save some cheesy fries for you soldier 🫡', isUser: false, time: '7:19 PM' }
    ],
    questions: [
      {
        question: "What does 'idk tbh' mean in Sam's text?",
        options: ["I don't know, to be honest", "I don't care, tell brother", "I did know yesterday"],
        correctIndex: 0,
        explanation: "idk = I don't know; tbh = to be honest."
      },
      {
        question: "Why can Sam not go to the diner?",
        options: ["He hates cheesy fries", "His mother punished him over exam grades", "His car broke down"],
        correctIndex: 1,
        explanation: "Sam mentions his mom discovered his midterm grade and grounded him."
      }
    ],
    vocabulary: ['idk', 'tbh', 'grounded', 'understatement'],
    featured: true
  },
  {
    title: 'The Group Project Ghost 👻',
    type: 'chat_story',
    category: 'college',
    difficulty: 'intermediate',
    estimatedTime: '90 sec',
    summary: 'Three university classmates confront a team member who went completely radio silent before the presentation.',
    chatMessages: [
      { sender: 'Rohan', text: 'guys the slide deck is due in two hours... where are Kev’s slides?!', isUser: false, time: '9:00 PM' },
      { sender: 'Ananya', text: 'he hasn’t read the WhatsApp group since Tuesday 💀', isUser: false, time: '9:02 PM' },
      { sender: 'Kevin', text: 'yo my bad had family emergency', isUser: true, time: '9:15 PM' },
      { sender: 'Rohan', text: 'bro your Instagram story shows you at a music festival 20 mins ago 🚩', isUser: false, time: '9:16 PM' },
      { sender: 'Ananya', text: 'literally caught in 4K 😭', isUser: false, time: '9:16 PM' },
      { sender: 'Kevin', text: 'ok hear me out... my cousin took my phone! I am typing slides rn I swear', isUser: true, time: '9:17 PM' },
      { sender: 'Rohan', text: 'you have 30 minutes before we submit without your name on it, no cap.', isUser: false, time: '9:18 PM' }
    ],
    questions: [
      {
        question: "What does 'caught in 4K' mean here?",
        options: ["Taking an ultra-high definition photo", "Caught red-handed with clear undeniable proof", "Watching a movie in cinema"],
        correctIndex: 1,
        explanation: "Caught in 4K means caught doing something wrong with undeniable visual evidence."
      }
    ],
    vocabulary: ['ghosted', 'red flag', 'caught in 4K', 'no cap'],
    featured: true
  },
  {
    title: 'First Date Debrief ☕',
    type: 'chat_story',
    category: 'social',
    difficulty: 'beginner',
    estimatedTime: '60 sec',
    summary: 'Chloe gets the immediate post-date breakdown from her best friend.',
    chatMessages: [
      { sender: 'Chloe', text: 'omg are you home yet?? SPILL THE TEA ☕', isUser: false, time: '10:30 PM' },
      { sender: 'Tara', text: 'just unlocked my front door!! okay listen...', isUser: true, time: '10:31 PM' },
      { sender: 'Tara', text: 'he remembered I don’t drink oat milk from a random story I posted last month 😭', isUser: true, time: '10:31 PM' },
      { sender: 'Chloe', text: 'WAIT. That is an enormous green flag 💚', isUser: false, time: '10:32 PM' },
      { sender: 'Tara', text: 'right?! And he insisted on splitting the bill fairly without making it weird.', isUser: true, time: '10:33 PM' },
      { sender: 'Chloe', text: 'okay he definitely passed the vibe check. When is date two?? 👀', isUser: false, time: '10:34 PM' }
    ],
    questions: [
      {
        question: "Why was remembering the oat milk a 'green flag'?",
        options: ["It shows he owns a dairy farm", "It reveals he pays genuine attention to small personal details", "It was a warning sign"],
        correctIndex: 1,
        explanation: "A green flag indicates healthy, attentive, positive behavior."
      }
    ],
    vocabulary: ['spill the tea', 'green flag', 'vibe check'],
    featured: false
  },
  {
    title: 'The Discord Clutch 🎮',
    type: 'chat_story',
    category: 'gaming',
    difficulty: 'intermediate',
    estimatedTime: '60 sec',
    summary: 'Squad chat reacting to an unforgettable last-second victory in ranked matchmaking.',
    chatMessages: [
      { sender: 'Leo', text: 'NO WAY YOU JUST HIT THAT SNIPER SHOT', isUser: false, time: '11:42 PM' },
      { sender: 'Kai', text: 'bro’s hands were shaking on 12 HP and he still clutched 💀', isUser: false, time: '11:43 PM' },
      { sender: 'Alex', text: 'I literally closed my eyes and prayed to the gaming gods 🙏', isUser: true, time: '11:43 PM' },
      { sender: 'Leo', text: 'that was pure main character energy honestly', isUser: false, time: '11:44 PM' },
      { sender: 'Kai', text: 'one more match before bed? We are on a win streak 🔥', isUser: false, time: '11:45 PM' }
    ],
    questions: [
      {
        question: "What does 'clutched' mean in this gaming context?",
        options: ["Dropped the controller", "Won in a tense, high-pressure moment with low health", "Left the game early"],
        correctIndex: 1,
        explanation: "Clutch means coming through victorious under extreme pressure."
      }
    ],
    vocabulary: ['clutch', 'main character energy'],
    featured: false
  },
  {
    title: 'The Sneaker Drop Race 👟',
    type: 'chat_story',
    category: 'lifestyle',
    difficulty: 'beginner',
    estimatedTime: '60 sec',
    summary: 'Two friends try to secure limited edition sneakers before the site crashes.',
    chatMessages: [
      { sender: 'Zack', text: 'page refreshed! ARE YOU IN THE QUEUE??', isUser: false, time: '9:59 AM' },
      { sender: 'Liam', text: 'stuck on loading screen bro... the servers are melting 😭', isUser: true, time: '10:00 AM' },
      { sender: 'Zack', text: 'I GOT CHECKOUT SCREEN LETS GOOOOO 🚀', isUser: false, time: '10:01 AM' },
      { sender: 'Liam', text: 'Casual flex while I get hit with error 404 💀', isUser: true, time: '10:02 AM' },
      { sender: 'Zack', text: 'I bought two pairs in your size too bro, I gotchu 🤝', isUser: false, time: '10:03 AM' },
      { sender: 'Liam', text: 'W teammate no cap! You are a lifesaver 🙏', isUser: true, time: '10:04 AM' }
    ],
    questions: [
      {
        question: "What does 'W teammate' mean in informal internet language?",
        options: ["Worst teammate", "Winning / wonderful teammate (a great friend)", "Wrong teammate"],
        correctIndex: 1,
        explanation: "'W' stands for 'Win', complimenting someone as a great ally."
      }
    ],
    vocabulary: ['casual flex', 'W', 'no cap'],
    featured: false
  },

  // INTERACTIVE BRANCHING STORIES (5)
  {
    title: 'Running 15 Minutes Late to Class 🏃💨',
    type: 'interactive_story',
    category: 'college',
    difficulty: 'intermediate',
    estimatedTime: '2 min',
    summary: 'Your friend texts you while the professor is taking attendance. How do you respond?',
    branchingStory: {
      scenario: 'You overslept and the professor just walked in.',
      startNodeId: 'node_start',
      nodes: [
        {
          nodeId: 'node_start',
          speaker: 'Elena',
          message: 'where are you 😭 Professor Vance is already opening the roll sheet',
          choices: [
            {
              text: 'I apologize for my unfortunate delay, I am currently navigating transit.',
              nextNodeId: 'node_formal',
              feedback: 'Too stiff and textbook! Elena is your friend, not your court judge.',
              isBestNatural: false
            },
            {
              text: 'bro I am literally sprinting across the quad rn 😭 hold my seat!!',
              nextNodeId: 'node_best',
              feedback: 'Spot on! Natural, urgent, and conversational.',
              isBestNatural: true
            },
            {
              text: 'I am coming.',
              nextNodeId: 'node_dry',
              feedback: 'A bit dry and doesn’t communicate that you’re rushing or need a seat held.',
              isBestNatural: false
            }
          ]
        },
        {
          nodeId: 'node_best',
          speaker: 'Elena',
          message: 'gotchu! I threw my backpack on the chair next to me. Sneak through the back door!',
          choices: [
            {
              text: 'lifesaver! Be there in 60 seconds 🫡',
              nextNodeId: 'node_end_win',
              feedback: 'Warm and natural way to acknowledge a friend saving you.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_formal',
          speaker: 'Elena',
          message: '...why do you sound like an automated email bot 💀 just run fast!',
          choices: [
            {
              text: 'haha my brain is half asleep. Sprinting now!',
              nextNodeId: 'node_end_win',
              feedback: 'Good recovery to casual tone.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_dry',
          speaker: 'Elena',
          message: 'okay well hurry up because seat hogs are eyeing the last desk!',
          choices: [
            {
              text: 'on it, almost at the stairs!',
              nextNodeId: 'node_end_win',
              feedback: 'Concise and responsive.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_end_win',
          speaker: 'Elena',
          message: 'You made it right before your name was called! High five ✋',
          choices: []
        }
      ]
    },
    vocabulary: ['sprinting', 'lifesaver', 'hold my seat'],
    featured: true
  },
  {
    title: 'The Café Order Mix-Up ☕',
    type: 'interactive_story',
    category: 'social',
    difficulty: 'intermediate',
    estimatedTime: '2 min',
    summary: 'The barista handed you regular whole milk instead of oat milk. How do you address it politely without awkwardness?',
    branchingStory: {
      scenario: 'You requested iced oat latte, but notice standard whole milk was used.',
      startNodeId: 'node_cafe_start',
      nodes: [
        {
          nodeId: 'node_cafe_start',
          speaker: 'Barista',
          message: 'Here you go! One iced caramel latte ready to go.',
          choices: [
            {
              text: 'Excuse me, you made an egregious error in my beverage preparation.',
              nextNodeId: 'node_cafe_stiff',
              feedback: 'Far too aggressive and overly formal for a simple coffee counter.',
              isBestNatural: false
            },
            {
              text: 'Hey! So sorry to bug you, but could we double check if this has oat milk? I’m lactose intolerant.',
              nextNodeId: 'node_cafe_perfect',
              feedback: 'Polite, considerate, and directly explains why without blaming anyone.',
              isBestNatural: true
            },
            {
              text: 'I guess I will just drink whatever.',
              nextNodeId: 'node_cafe_passive',
              feedback: 'Passive-aggressive. You deserve to get what you paid for safely!',
              isBestNatural: false
            }
          ]
        },
        {
          nodeId: 'node_cafe_perfect',
          speaker: 'Barista',
          message: 'Oh gosh, so glad you asked! The label got smudged. Let me remake that fresh for you with oat milk right now.',
          choices: [
            {
              text: 'Thank you so much, really appreciate it!',
              nextNodeId: 'node_cafe_end',
              feedback: 'Effortless courtesy that leaves a pleasant interaction.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_cafe_stiff',
          speaker: 'Barista',
          message: 'Uh... okay. Just let me know what you actually wanted, please.',
          choices: [
            {
              text: 'My bad, I just need oat milk instead of dairy.',
              nextNodeId: 'node_cafe_end',
              feedback: 'Good correction to friendly tone.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_cafe_passive',
          speaker: 'Barista',
          message: 'Wait, did you want something changed? It’s no trouble at all!',
          choices: [
            {
              text: 'Actually yes, could I get oat milk please? Thank you!',
              nextNodeId: 'node_cafe_end',
              feedback: 'Assertive yet kind.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_cafe_end',
          speaker: 'Barista',
          message: 'Here is your fresh iced oat latte. Have an awesome afternoon!',
          choices: []
        }
      ]
    },
    vocabulary: ['sorry to bug you', 'lactose intolerant', 'remake'],
    featured: false
  },
  {
    title: 'Politely Declining a Weekend Party 🛋️',
    type: 'interactive_story',
    category: 'social',
    difficulty: 'intermediate',
    estimatedTime: '2 min',
    summary: 'A close friend invites you out, but your social battery is at 0%. How do you turn them down kindly without making them feel rejected?',
    branchingStory: {
      scenario: 'You had a brutal 50-hour study week and just want to sleep and recharge.',
      startNodeId: 'node_party_start',
      nodes: [
        {
          nodeId: 'node_party_start',
          speaker: 'Marco',
          message: 'Hey! We are all heading to the rooftop event tonight, you are coming right?',
          choices: [
            {
              text: 'I do not want to be near human beings tonight.',
              nextNodeId: 'node_party_blunt',
              feedback: 'A little too blunt—might make Marco think you are upset with him personally.',
              isBestNatural: false
            },
            {
              text: 'I’d love to see everyone, but my social battery is totally drained after finals. Rain check for lunch next week?',
              nextNodeId: 'node_party_warm',
              feedback: 'Perfect! Validates the friendship, explains self-care, and offers an alternative plan.',
              isBestNatural: true
            },
            {
              text: 'Yeah sure, see you there.',
              nextNodeId: 'node_party_overcommit',
              feedback: 'Overcommitting when exhausted leads to burnout or canceling at the last minute.',
              isBestNatural: false
            }
          ]
        },
        {
          nodeId: 'node_party_warm',
          speaker: 'Marco',
          message: 'Totally get it, you worked your tail off this week! Rest up and let’s grab ramen on Tuesday 🍜',
          choices: [
            {
              text: 'Deal! Have a blast tonight!',
              nextNodeId: 'node_party_end',
              feedback: 'Enthusiastic and reinforces healthy boundary-setting.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_party_blunt',
          speaker: 'Marco',
          message: 'Whoa, everything okay with us? You sound really upset.',
          choices: [
            {
              text: 'Nothing with you at all! Just super exhausted from studying. So sorry!',
              nextNodeId: 'node_party_end',
              feedback: 'Clarifies that you were just fatigued.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_party_overcommit',
          speaker: 'Marco',
          message: 'Awesome! We are meeting at 9 PM!',
          choices: [
            {
              text: 'Actually Marco, I’m being honest—I’m too exhausted. Rain check please?',
              nextNodeId: 'node_party_end',
              feedback: 'Better to be honest now than ghost later.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_party_end',
          speaker: 'Marco',
          message: 'Sleep well and recharge those batteries! Talk soon ✌️',
          choices: []
        }
      ]
    },
    vocabulary: ['social battery', 'rain check', 'recharge'],
    featured: true
  },
  {
    title: 'Disagreeing in a Creative Meeting 💡',
    type: 'interactive_story',
    category: 'work',
    difficulty: 'advanced',
    estimatedTime: '2 min',
    summary: 'A colleague proposes an overly complicated user onboarding that might hurt retention. How do you push back constructively?',
    branchingStory: {
      scenario: 'Sprint review with product designer and developer.',
      startNodeId: 'node_meeting_start',
      nodes: [
        {
          nodeId: 'node_meeting_start',
          speaker: 'David (PM)',
          message: 'I think we should add a mandatory 15-question survey before new users can even see the home screen.',
          choices: [
            {
              text: 'That is genuinely the worst product idea I have heard this quarter.',
              nextNodeId: 'node_meeting_hostile',
              feedback: 'Too hostile. Attacks the person rather than analyzing the user experience.',
              isBestNatural: false
            },
            {
              text: 'I see where you’re coming from with data collection, but won’t that cause heavy drop-off on first launch? What if we ask progressively instead?',
              nextNodeId: 'node_meeting_consultative',
              feedback: 'Excellent consultative framing! Acknowledges the intent, highlights user friction, and offers an alternative.',
              isBestNatural: true
            },
            {
              text: 'Sure, whatever you decide is fine with me.',
              nextNodeId: 'node_meeting_passive',
              feedback: 'Too passive—good teams need constructive pushback.',
              isBestNatural: false
            }
          ]
        },
        {
          nodeId: 'node_meeting_consultative',
          speaker: 'David (PM)',
          message: 'That’s a fair point on drop-off rates. Progressive onboarding could keep the barrier to entry much lower. Let’s map that out.',
          choices: [
            {
              text: 'Sounds great, let’s sketch the 2-step flow on Figma.',
              nextNodeId: 'node_meeting_end',
              feedback: 'Action-oriented and moves the team forward.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_meeting_hostile',
          speaker: 'David (PM)',
          message: 'Let’s keep feedback constructive please. What specific issues do you see?',
          choices: [
            {
              text: 'My apologies. I mean users might abandon the app if forced through 15 screens before value.',
              nextNodeId: 'node_meeting_end',
              feedback: 'Much better professional realignment.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_meeting_passive',
          speaker: 'David (PM)',
          message: 'Wait, does anyone else have reservations about this?',
          choices: [
            {
              text: 'Actually, I worry users might abandon the app. Progressive onboarding might work better.',
              nextNodeId: 'node_meeting_end',
              feedback: 'Speaking up respectfully is key.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_meeting_end',
          speaker: 'David (PM)',
          message: 'Agreed! Thanks for catching that potential bottleneck before we coded it.',
          choices: []
        }
      ]
    },
    vocabulary: ['drop-off', 'progressive onboarding', 'constructive feedback'],
    featured: false
  },
  {
    title: 'Roommate Rent & Dishes Confrontation 🍽️',
    type: 'interactive_story',
    category: 'lifestyle',
    difficulty: 'intermediate',
    estimatedTime: '2 min',
    summary: 'The kitchen sink has been overflowing with dirty pots for three days. How do you resolve it peacefully?',
    branchingStory: {
      scenario: 'You walk into the shared kitchen and find zero clean cups.',
      startNodeId: 'node_roommate_start',
      nodes: [
        {
          nodeId: 'node_roommate_start',
          speaker: 'Jay (Roommate)',
          message: 'Hey, did you see my protein shaker around anywhere?',
          choices: [
            {
              text: 'Probably under the mountain of crusty pans you haven’t washed since Tuesday 💀',
              nextNodeId: 'node_roommate_sarcastic',
              feedback: 'Heavy sarcasm often triggers defensiveness instead of cleanup.',
              isBestNatural: false
            },
            {
              text: 'Hey man, could we take 10 minutes to reset the kitchen together? The sink is getting kind of chaotic and we’re out of clean mugs.',
              nextNodeId: 'node_roommate_team',
              feedback: 'Brilliant! Frames it as a quick shared reset rather than a lecture.',
              isBestNatural: true
            },
            {
              text: 'I am moving out next month.',
              nextNodeId: 'node_roommate_extreme',
              feedback: 'A little extreme over a few dishes!',
              isBestNatural: false
            }
          ]
        },
        {
          nodeId: 'node_roommate_team',
          speaker: 'Jay (Roommate)',
          message: 'Ah man, my bad! I was swamped with midterms and lost track of time. Let me wash my pots right now.',
          choices: [
            {
              text: 'Appreciate it bro! I’ll wipe down the counters while you rinse.',
              nextNodeId: 'node_roommate_end',
              feedback: 'Builds positive living harmony.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_roommate_sarcastic',
          speaker: 'Jay (Roommate)',
          message: 'You don’t have to be passive-aggressive about it, you leave stuff out too.',
          choices: [
            {
              text: 'Fair enough, let’s both just keep it clean so neither of us stresses.',
              nextNodeId: 'node_roommate_end',
              feedback: 'De-escalates tension effectively.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_roommate_extreme',
          speaker: 'Jay (Roommate)',
          message: 'Wait what?! Over the sink?!',
          choices: [
            {
              text: 'Haha okay I was kidding, but seriously let’s wash the dishes!',
              nextNodeId: 'node_roommate_end',
              feedback: 'Diffuses the drama.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_roommate_end',
          speaker: 'Jay (Roommate)',
          message: 'Kitchen is spotless now! Clean slate 🤝',
          choices: []
        }
      ]
    },
    vocabulary: ['clean slate', 'passive-aggressive', 'reset the kitchen'],
    featured: false
  },

  // EDITORIAL ARTICLES (2)
  {
    title: 'Why Internet English Changes Every 6 Months',
    type: 'article',
    category: 'culture',
    difficulty: 'advanced',
    estimatedTime: '2 min read',
    summary: 'From "swag" to "rizz" to "ate" — how digital communities and memes accelerate the evolution of global English.',
    content: `Language has never been stationary, but algorithmic social media has turned linguistic evolution into hyperspace speed.

In traditional eras, a regional slang word like "cool" or "groove" might take twenty years to travel from jazz clubs into schoolyards, television scripts, and corporate boardrooms. Today, an expression originating on Black Twitter, Twitch livestreams, or Mumbai college campuses can achieve global ubiquity in seventy-two hours.

Consider the word "ate". For centuries a simple past tense verb describing digestion, internet culture repurposed it into supreme aesthetic commendation ("she ate that outfit and left no crumbs"). The humor stems from metaphor: when a performer delivers perfection, they completely consumed the assignment without hesitation.

Why do older generations frequently misunderstand this shift? Because they view slang as corrupted grammar rather than what linguists consider it: creative emotional compression. When someone texts "I am dead 💀", they are not declaring biological cessation; they are expressing that an absurdity was so overwhelming it transcended conventional adjectives.

Mastering modern English does not mean memorizing slang for the sake of sounding trendy. It means recognizing social tone, knowing when playful shorthand connects you with peers, and understanding when formal clarity is the sharper tool.`,
    vocabulary: ['ubiquity', 'aesthetic commendation', 'linguistic evolution', 'algorithmic'],
    questions: [
      {
        question: "According to the article, why does slang evolve so rapidly today?",
        options: ["Because of social media algorithms and digital speed", "Because people stopped learning verbs", "Because textbooks are free"],
        correctIndex: 0,
        explanation: "Algorithmic social platforms connect millions of speakers instantly."
      }
    ],
    featured: true
  },
  {
    title: 'How to Disagree Without Burning Bridges',
    type: 'article',
    category: 'work',
    difficulty: 'intermediate',
    estimatedTime: '2 min read',
    summary: 'The art of diplomatic disagreement in remote teams, Slack channels, and client calls.',
    content: `One of the hardest conversational skills in a second language is disagreeing without sounding hostile or dismissive.

In many languages, silence or abrupt contradiction is standard. But in modern professional English, nuance lives inside conversational cushioning. 

Compare these three approaches to an impossible deadline:

Option 1: "This deadline is impossible and we cannot do it." (Blunt, defensive, invites confrontation)
Option 2: "Yes, we will try." (Passive, leads to missed deadlines and broken trust)
Option 3: "I understand the urgency behind launching by Friday; however, ensuring quality will require us to either scale back the scope or adjust the timeline to Tuesday. Which would you prefer to prioritize?" (Constructive, collaborative, positions you as a strategic problem solver)

Notice that Option 3 doesn't apologize for reality. Instead, it frames the problem as a shared decision about trade-offs.

Next time you need to push back:
1. Validate the other person's intent ("I see what you're aiming for here...")
2. Identify the trade-off ("...the risk we run into is...")
3. Offer an alternative ("What if we explored...")

Disagreement isn't friction; done right, it's leadership.`,
    vocabulary: ['conversational cushioning', 'trade-offs', 'strategic problem solver'],
    questions: [
      {
        question: "What is conversational cushioning?",
        options: ["Putting pillows on the microphone", "Framing disagreement constructively so it invites collaboration", "Never saying no to anyone"],
        correctIndex: 1,
        explanation: "Conversational cushioning softens abrasive phrasing while maintaining honest boundaries."
      }
    ],
    featured: false
  },
  {
    title: 'Ordering Ice Cream in Sydney 🍦',
    type: 'chat_story',
    category: 'lifestyle',
    difficulty: 'beginner',
    estimatedTime: '45 sec',
    summary: 'Liam texts his buddy about which flavor to get at the famous beachside gelato stand.',
    chatMessages: [
      { sender: 'Liam', text: 'hey man in line at the gelato spot! what flavor did u want again? 👀', isUser: false, time: '3:05 PM' },
      { sender: 'You', text: 'double scoop of salted caramel and mango please! 🙏', isUser: true, time: '3:05 PM' },
      { sender: 'Liam', text: 'cup or cone? the waffle cone here smells amazing 🔥', isUser: false, time: '3:06 PM' },
      { sender: 'You', text: 'definitely waffle cone! I will venmo u right now', isUser: true, time: '3:06 PM' },
      { sender: 'Liam', text: 'say less grabbing it now 🍦', isUser: false, time: '3:07 PM' }
    ],
    questions: [
      {
        question: "What does 'say less' mean in this context?",
        options: ["Stop talking to me", "Got it, consider it done!", "Speak in a lower volume"],
        correctIndex: 1,
        explanation: "'Say less' is friendly modern shorthand for 'Understood, I am on it!'"
      }
    ],
    vocabulary: ['gelato spot', 'waffle cone', 'say less'],
    featured: true
  },
  {
    title: 'Navigating Cross-Functional Deadlock ⚖️',
    type: 'interactive_story',
    category: 'work',
    difficulty: 'advanced',
    estimatedTime: '90 sec',
    summary: 'The product design lead wants to delay rollout, while marketing insists on tomorrow. You must negotiate a pragmatic middle ground.',
    branchingStory: {
      scenario: 'You are leading the sync with Elena (Head of Design) and Marcus (VP of Growth).',
      startNodeId: 'node_1',
      nodes: [
        {
          nodeId: 'node_1',
          speaker: 'Elena',
          message: 'If we push this build out tomorrow with the current typography glitch, our brand perception takes a serious hit.',
          choices: [
            {
              text: 'Elena, growth is our top KPI, so we have to ship regardless of visual bugs.',
              nextNodeId: 'node_fail',
              feedback: 'Too confrontational and dismissive of quality standards.',
              isBestNatural: false
            },
            {
              text: 'I acknowledge the visual concern, Elena. Marcus, what if we ship a closed beta to 5% of users while design patches the assets?',
              nextNodeId: 'node_2',
              feedback: 'Superb diplomacy: validates the concern and offers phased rollout risk mitigation.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_2',
          speaker: 'Marcus',
          message: 'A 5% gated beta protects our launch momentum while giving design a 48-hour buffer. I can live with that.',
          choices: [
            {
              text: 'Great. Let’s align on this compromise and reconvene Thursday at 10 AM for final sign-off.',
              nextNodeId: 'node_success',
              feedback: 'Clear, authoritative executive wrap-up with concrete next steps.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_fail',
          speaker: 'Marcus',
          message: 'This creates friction between teams. Let’s take a step back and find a collaborative path.',
          choices: [
            {
              text: 'Understood. Let us explore a phased canary release instead.',
              nextNodeId: 'node_2',
              feedback: 'Good recovery to de-escalate tension.',
              isBestNatural: true
            }
          ]
        },
        {
          nodeId: 'node_success',
          speaker: 'Elena',
          message: 'Agreed. Appreciate you finding a constructive path forward.',
          choices: []
        }
      ]
    },
    questions: [
      {
        question: "Why is proposing a 'closed beta' effective in leadership communication?",
        options: ["It ignores both parties", "It bridges the gap between speed and quality with data-driven compromise", "It cancels the launch"],
        correctIndex: 1,
        explanation: "Phased rollouts de-risk product decisions while satisfying both growth and design constraints."
      }
    ],
    vocabulary: ['deadlock', 'pragmatic middle ground', 'gated beta', 'sign-off'],
    featured: true
  },
  {
    title: 'The Art of Nuance: Executive Presence in Writing 🖋️',
    type: 'article',
    category: 'work',
    difficulty: 'advanced',
    estimatedTime: '90 sec',
    summary: 'Mastering high-stakes corporate communication without sounding detached or robotic.',
    content: `Effective executive communication isn't about using five-syllable Latinate vocabulary; it is about cognitive clarity and calibrated restraint.

When communicating upward or across high-stakes initiatives, the highest leverage habit is state-first synthesis:
- State the outcome or recommendation in your opening sentence (BLUF: Bottom Line Up Front).
- Frame options through tradeoffs, not emotional attachments.
- Distinguish between decisions requiring consensus vs. decisions needing informative awareness.

Polished professionals don't say "I think maybe we should possibly consider." They say "Based on our conversion telemetry, we recommend prioritizing Option B to maximize pipeline velocity."`,
    vocabulary: ['calibrated restraint', 'high leverage', 'pipeline velocity', 'cognitive clarity'],
    questions: [
      {
        question: "What does BLUF stand for in high-stakes communication?",
        options: ["Better Late Upon Friday", "Bottom Line Up Front", "Brief Letters Under Fifteen words"],
        correctIndex: 1,
        explanation: "Bottom Line Up Front delivers the core thesis before diving into context."
      }
    ],
    featured: true
  }
];

export const writingPromptsSeed = [
  // 20 PROMPTS across 10 categories
  {
    title: 'The "Running 10 Mins Late" DM',
    difficulty: 'beginner',
    category: 'Text someone',
    prompt: 'You are stuck in traffic or overslept. Text your friend who is already waiting at the café.',
    situationContext: 'Friend is waiting at a booth; you are delayed by 10 minutes.',
    sampleIncomingText: 'Hey! I grabbed a table near the window, where are you?',
    tips: ['Keep it honest and conversational', 'Give an exact estimate of your arrival time'],
    featured: true
  },
  {
    title: 'Declining a Party Invite Politely',
    difficulty: 'beginner',
    category: 'Text someone',
    prompt: 'A friend invites you out tonight, but you are physically and mentally drained. Text them to say no while maintaining the friendship.',
    situationContext: 'Your social battery is completely empty after a long week.',
    sampleIncomingText: 'Yo! Big party tonight at Liam’s place, you coming with us??',
    tips: ['Validate the invite', 'Offer a rain check for coffee/lunch next week'],
    featured: false
  },
  {
    title: 'Rainy Day Window & Hot Chai',
    difficulty: 'beginner',
    category: 'Caption this',
    prompt: 'Write an aesthetic 1-sentence caption for a photo of rain pouring down outside while holding a warm mug.',
    situationContext: 'Instagram photo of a rainy afternoon.',
    tips: ['Focus on mood and atmosphere', 'Use sensory words or cozy vibes'],
    featured: true
  },
  {
    title: 'Airport Runway at 5:30 AM',
    difficulty: 'intermediate',
    category: 'Caption this',
    prompt: 'Write a caption for a sunrise photo taken from an airplane window or departure terminal.',
    situationContext: 'Beginning of an international journey.',
    tips: ['Express anticipation and travel energy'],
    featured: false
  },
  {
    title: 'Voice Notes vs. Text Messages',
    difficulty: 'intermediate',
    category: 'Hot take',
    prompt: 'Are 4-minute voice notes a blessing or a crime against humanity? Defend your opinion in 2-3 punchy sentences.',
    situationContext: 'Debating communication etiquette.',
    tips: ['Take a bold stand', 'Use humorous reasoning'],
    featured: true
  },
  {
    title: 'Group Projects in College',
    difficulty: 'intermediate',
    category: 'Hot take',
    prompt: 'Give your unfiltered hot take on group projects versus solo assignments.',
    situationContext: 'Academic teamwork reality.',
    tips: ['Highlight the emotional rollercoaster of depending on teammates'],
    featured: false
  },
  {
    title: 'The Mysterious Midnight Knock',
    difficulty: 'intermediate',
    category: 'Continue the story',
    prompt: 'It was 1:14 AM. The streetlights had just flickered out when three slow knocks tapped against my third-floor apartment window. Continue the story in 3 sentences.',
    situationContext: 'Third floor window with no balcony.',
    tips: ['Build suspense', 'End with a hook or surprising twist'],
    featured: false
  },
  {
    title: 'The Accidental Reply-All Email',
    difficulty: 'advanced',
    category: 'Continue the story',
    prompt: 'I thought I was messaging my work bestie privately, but the instant I hit send, I saw 450 recipients in the "To" field... Continue the reaction.',
    situationContext: 'Accidentally broadcast a private comment to the whole company.',
    tips: ['Convey immediate panic and humorous realization'],
    featured: true
  },
  {
    title: 'Burning Toast into Charcoal',
    difficulty: 'beginner',
    category: 'Make it funnier',
    prompt: 'Turn this boring sentence into hilarious exaggeration: "I burned my breakfast bread and it smelled bad."',
    situationContext: 'Kitchen catastrophe.',
    tips: ['Use dramatic metaphors (fire department, archaeological artifact)'],
    featured: true
  },
  {
    title: 'Waking Up Before Your Alarm',
    difficulty: 'intermediate',
    category: 'Make it funnier',
    prompt: 'Turn this into comedy: "My alarm was set for 7:00 AM, but I woke up at 6:58 AM and was disappointed."',
    situationContext: 'The tragic 2-minute pre-alarm tragedy.',
    tips: ['Personify the alarm clock or your inner consciousness'],
    featured: false
  },
  {
    title: 'Emailing a Client about a Delay',
    difficulty: 'advanced',
    category: 'Make it professional',
    prompt: 'Turn this casual thought into polished business English: "We didn’t finish the slides because John was sick, so we will send them tomorrow."',
    situationContext: 'Professional project communication.',
    tips: ['Take accountability gracefully', 'Provide a clear timeline without blaming individual colleagues'],
    featured: true
  },
  {
    title: 'Asking for a Salary Review',
    difficulty: 'advanced',
    category: 'Make it professional',
    prompt: 'Rewrite: "I want more money because I did a lot of work this year."',
    situationContext: 'Annual performance and compensation evaluation.',
    tips: ['Highlight market rates and measurable contributions'],
    featured: false
  },
  {
    title: 'Explain Cryptocurrency to a 90-Year-Old',
    difficulty: 'advanced',
    category: 'Explain this',
    prompt: 'Explain what Bitcoin or cryptocurrency is without using complex technical jargon or buzzwords.',
    situationContext: 'Explaining digital assets to someone who only uses physical paper cash.',
    tips: ['Use analogies like digital ledgers or special community stamps'],
    featured: true
  },
  {
    title: 'Explain "Cringe" to a Professor',
    difficulty: 'intermediate',
    category: 'Explain this',
    prompt: 'Explain the modern internet meaning of "cringe" and "secondhand embarrassment" using articulate language.',
    situationContext: 'Sociological explanation of viral awkwardness.',
    tips: ['Define the psychological sensation of vicarious embarrassment'],
    featured: false
  },
  {
    title: 'The Time You Got Lost in a Foreign City',
    difficulty: 'intermediate',
    category: 'Tell a story',
    prompt: 'Write a mini 3-sentence story about a moment you had zero phone battery in an unfamiliar place.',
    situationContext: 'Solo travel disorientation.',
    tips: ['Show don’t tell: sensory details of sounds, lights, and realization'],
    featured: false
  },
  {
    title: 'The Most Unexpected Compliment',
    difficulty: 'advanced',
    category: 'Tell a story',
    prompt: 'Tell the story of a completely unexpected compliment a stranger or colleague gave you that stuck with you for years.',
    situationContext: 'Memorable human connection.',
    tips: ['Focus on the emotional impact and why it resonated'],
    featured: false
  },
  {
    title: 'Describe a Busy Street Food Stall at Midnight',
    difficulty: 'beginner',
    category: 'Describe a picture',
    prompt: 'Describe the sizzling sights, aromatic smells, and bustling energy of a midnight street vendor.',
    situationContext: 'Vibrant street culinary scene.',
    tips: ['Use vivid sensory adjectives (crackling, smoky, golden, fragrant)'],
    featured: true
  },
  {
    title: 'Describe an Empty Library at Sunset',
    difficulty: 'advanced',
    category: 'Describe a picture',
    prompt: 'Describe golden hour sunlight streaming across wooden desks and dusty book spines in a quiet library.',
    situationContext: 'Peaceful architectural contemplation.',
    tips: ['Evoke tranquility, stillness, and dust motes dancing in light'],
    featured: false
  },
  {
    title: 'Replying to "Long Time No See!"',
    difficulty: 'beginner',
    category: 'Reply to a message',
    prompt: 'An old school friend messages: "Hey stranger! It’s been years, we should totally catch up!" Reply warmly without overpromising.',
    sampleIncomingText: 'Hey stranger! Long time no see, hope life is treating you well! We need to catch up soon.',
    tips: ['Match the warm energy', 'Suggest an easy low-pressure check-in'],
    featured: false
  },
  {
    title: 'Replying to an Unsolicited Job Recruiter',
    difficulty: 'advanced',
    category: 'Reply to a message',
    prompt: 'A LinkedIn recruiter reaches out about an opportunity you are not currently interested in. Decline gracefully so the relationship stays positive.',
    sampleIncomingText: 'Hi! Loved your profile. We have an urgent open position at our firm and would love to chat tomorrow.',
    tips: ['Thank them for reaching out', 'State you are happy in your current role while leaving the door open for the future'],
    featured: false
  }
];

export const speakingScenariosSeed = [
  // 15 SCENARIOS
  {
    title: 'Ordering Coffee in a Busy Melbourne Café',
    scenarioId: 'cafe_melbourne',
    category: 'Café',
    emoji: '☕',
    difficulty: 'beginner',
    context: 'The line is long and moving fast. You want to order a specific beverage (plant milk, extra shot) and ask about pastries.',
    defaultCharacter: 'Alex',
    starterPrompt: 'Order your drink smoothly, request oat milk, and ask if the banana bread is toasted.',
    firstBotMessage: "Hey there! Welcome to Black Brew. What can I get started for you today?",
    objectives: [
      'Order an espresso or latte beverage',
      'Specify oat milk or temperature preference',
      'Ask about pastry availability or payment method'
    ],
    targetVocabulary: ['oat milk', 'iced', 'toasted', 'card or cash'],
    targetGrammar: ['Could I please get...', 'Would you mind...', 'Is it possible to...'],
    featured: true
  },
  {
    title: 'Navigating Customs and Baggage at JFK Airport',
    scenarioId: 'airport_jfk',
    category: 'Airport',
    emoji: '✈️',
    difficulty: 'intermediate',
    context: 'You just landed after an international flight. An immigration officer asks you questions about your stay.',
    defaultCharacter: 'Maya',
    starterPrompt: 'State the purpose of your trip, duration of stay, and accommodation details clearly and confidently.',
    firstBotMessage: "Passport and boarding pass, please. What is the primary purpose of your visit to the United States?",
    objectives: [
      'State tourism / study / business purpose clearly',
      'Confirm duration of stay (e.g., 2 weeks)',
      'Confirm where you are staying'
    ],
    targetVocabulary: ['duration', 'accommodation', 'return ticket', 'transit'],
    targetGrammar: ['I will be staying for...', 'My plan is to...', 'I have a return flight on...'],
    featured: true
  },
  {
    title: 'Small Talk at a Casual Rooftop Party',
    scenarioId: 'party_rooftop',
    category: 'Party',
    emoji: '🎉',
    difficulty: 'beginner',
    context: 'You are standing near the snack table. Someone with great sneakers strikes up a casual conversation.',
    defaultCharacter: 'Alex',
    starterPrompt: 'Introduce yourself naturally, compliment their sneakers or music, and ask how they know the host.',
    firstBotMessage: "Yo! Great playlist tonight, right? How do you know Marcus?",
    objectives: [
      'Introduce your name comfortably',
      'Explain your connection to the host or city',
      'Ask an engaging question back'
    ],
    targetVocabulary: ['vibe', 'mutual friend', 'catch up', 'playlist'],
    targetGrammar: ['We actually met through...', 'How about you?', 'Have you been in town long?'],
    featured: true
  },
  {
    title: 'First-Round Software Job Interview',
    scenarioId: 'interview_tech',
    category: 'Job interview',
    emoji: '💼',
    difficulty: 'advanced',
    context: 'Maya is interviewing you for a modern tech role. She asks you to introduce your experience and explain how you handle pressure.',
    defaultCharacter: 'Maya',
    starterPrompt: 'Deliver a concise 60-second summary of your background and your approach to collaborative teamwork.',
    firstBotMessage: "Welcome! We are thrilled to speak with you today. To kick things off, could you walk me through your background and what drew you to this role?",
    objectives: [
      'Summarize professional/academic background succinctly',
      'Highlight passion for the company or product',
      'Speak confidently without filler words'
    ],
    targetVocabulary: ['spearhead', 'collaborative', 'bandwidth', 'deliverables'],
    targetGrammar: ['Over the past few years, I have focused on...', 'What particularly resonated with me was...'],
    featured: true
  },
  {
    title: 'Sprint Planning Meeting Disagreement',
    scenarioId: 'meeting_sprint',
    category: 'Meeting',
    emoji: '📊',
    difficulty: 'advanced',
    context: 'Your team lead proposed adding 4 major features two days before release. Push back constructively.',
    defaultCharacter: 'Noah',
    starterPrompt: 'Explain why the timeline poses technical risks and suggest focusing on the top two core features first.',
    firstBotMessage: "I know it’s tight, but management wants all four features shipped this Friday. Can your team pull this off?",
    objectives: [
      'Acknowledge deadline importance',
      'Explain trade-offs on code quality and testing',
      'Propose a phased rollout'
    ],
    targetVocabulary: ['trade-offs', 'bandwidth', 'phased rollout', 'bottleneck'],
    targetGrammar: ['I understand the priority; however, my concern is...', 'What if we prioritized...'],
    featured: false
  },
  {
    title: 'Exchanging an Item at a Clothing Boutique',
    scenarioId: 'shopping_return',
    category: 'Shopping',
    emoji: '🛍️',
    difficulty: 'beginner',
    context: 'You bought a sweater yesterday that ended up being the wrong size. You want to swap it for a Medium.',
    defaultCharacter: 'Emma',
    starterPrompt: 'Politely explain you have the receipt and want to exchange the item for a different size.',
    firstBotMessage: "Hi there! How can I help you today?",
    objectives: [
      'State you’d like to make an exchange',
      'Mention you have the receipt and original tags',
      'Ask if Medium is currently in stock'
    ],
    targetVocabulary: ['exchange', 'receipt', 'in stock', 'tags attached'],
    targetGrammar: ['I purchased this yesterday and was hoping to exchange it for...', 'Do you happen to have...'],
    featured: false
  },
  {
    title: 'Booking a Local Day Tour in Barcelona',
    scenarioId: 'travel_tour',
    category: 'Travel',
    emoji: '🗺️',
    difficulty: 'intermediate',
    context: 'You are at a local tourism info desk asking about hidden gem walking tours avoiding tourist traps.',
    defaultCharacter: 'Alex',
    starterPrompt: 'Ask about morning tour availability, pricing, language options, and recommendations off the beaten path.',
    firstBotMessage: "Hola! Welcome to Barcelona tourism. Are you looking for historic architecture or food & wine tours today?",
    objectives: [
      'Express interest in off-the-beaten-path experiences',
      'Inquire about start times and group size',
      'Ask what is included in the ticket'
    ],
    targetVocabulary: ['hidden gem', 'off the beaten path', 'included', 'duration'],
    targetGrammar: ['Could you recommend something that isn’t too crowded?', 'How long does the tour run?'],
    featured: false
  },
  {
    title: 'Pre-Match Duo Strategy in Valorant / Apex',
    scenarioId: 'gaming_duo',
    category: 'Gaming',
    emoji: '🎮',
    difficulty: 'intermediate',
    context: 'You just teamed up with Kai on Discord before a high-tier ranked lobby.',
    defaultCharacter: 'Kai',
    starterPrompt: 'Call out your preferred agent/character, ping system, and discuss communication callouts.',
    firstBotMessage: "Yo! We got lobby leader. What role you playing today? I can flex smoke or duelist.",
    objectives: [
      'Confirm preferred agent/champion/role',
      'Discuss defensive versus aggressive strategy',
      'Coordinate Discord callouts'
    ],
    targetVocabulary: ['clutch', 'callouts', 'flex', 'flank'],
    targetGrammar: ['I usually play...', 'Let’s hold the site until...', 'Watch out for the flank!'],
    featured: true
  },
  {
    title: 'Ordering at an Italian Trattoria',
    scenarioId: 'restaurant_dinner',
    category: 'Restaurant',
    emoji: '🍝',
    difficulty: 'beginner',
    context: 'The waiter approaches your table. You want to ask about vegetarian options and order sparkling water.',
    defaultCharacter: 'Emma',
    starterPrompt: 'Order water, inquire about the chef’s recommendation, and check for meat ingredients.',
    firstBotMessage: "Buonasera! Welcome. Can I start you off with still or sparkling water while you look over the specials?",
    objectives: [
      'Choose sparkling or still water',
      'Ask about the chef’s daily special',
      'Ask if a dish contains nuts or dairy'
    ],
    targetVocabulary: ['sparkling', 'specials', 'recommendation', 'vegetarian'],
    targetGrammar: ['Could we start with...', 'What would you recommend between...', 'Does this contain...'],
    featured: false
  },
  {
    title: 'Meeting Your New Flatmate for the First Time',
    scenarioId: 'meeting_flatmate',
    category: 'Meeting someone new',
    emoji: '🤝',
    difficulty: 'beginner',
    context: 'You just unpacked your bags in your new apartment. Your new roommate arrives home from work.',
    defaultCharacter: 'Alex',
    starterPrompt: 'Introduce yourself warmly, break the ice, and ask about kitchen shelf preferences.',
    firstBotMessage: "Hey! You must be the new roommate. Welcome to the flat! How was moving in?",
    objectives: [
      'Express excitement about moving in',
      'Ask about house habits or quiet hours',
      'Discuss shared kitchen shelf spaces'
    ],
    targetVocabulary: ['settle in', 'house rules', 'shelves', 'smooth move'],
    targetGrammar: ['It went pretty smoothly!', 'Let me know if there are any specific guidelines for...'],
    featured: false
  },
  {
    title: 'Asking a Stranger for Train Directions',
    scenarioId: 'help_directions',
    category: 'Asking for help',
    emoji: '🚇',
    difficulty: 'beginner',
    context: 'You are at a busy central station and your phone battery died. You need to find Platform 4B.',
    defaultCharacter: 'Rio',
    starterPrompt: 'Approach someone politely, ask for the express train platform, and confirm departure time.',
    firstBotMessage: "Oh, excuse me! Did you need something?",
    objectives: [
      'Use polite attention grabber ("Pardon me / Excuse me")',
      'Ask for directions to Platform 4B clearly',
      'Confirm whether the train is local or express'
    ],
    targetVocabulary: ['platform', 'express train', 'transfer', 'departing'],
    targetGrammar: ['Excuse me, could you point me toward...', 'Does this train stop at...'],
    featured: false
  },
  {
    title: 'Weather and Commute Elevator Banter',
    scenarioId: 'smalltalk_elevator',
    category: 'Small talk',
    emoji: '💬',
    difficulty: 'beginner',
    context: 'You step into an office elevator with a coworker you see occasionally. Keep the silence friendly.',
    defaultCharacter: 'Alex',
    starterPrompt: 'Make a casual, humorous observation about the crazy morning rain and ask how their week is going.',
    firstBotMessage: "Whew! That downpour outside is completely wild today, isn't it?",
    objectives: [
      'Respond naturally without awkwardness',
      'Share a quick relatable detail about your commute',
      'Ask how their week is wrapping up'
    ],
    targetVocabulary: ['downpour', 'commute', 'almost Friday', 'wild weather'],
    targetGrammar: ['Tell me about it!', 'I barely made it across the street without an umbrella!'],
    featured: false
  },
  {
    title: 'Politely Disagreeing with a Friend’s Movie Review',
    scenarioId: 'disagreeing_movie',
    category: 'Disagreeing politely',
    emoji: '🎬',
    difficulty: 'intermediate',
    context: 'Your friend hated the movie you both just watched, but you thought the acting and cinematography were genius.',
    defaultCharacter: 'Rio',
    starterPrompt: 'Acknowledge their critique of the slow plot, but defend the emotional ending and cinematography.',
    firstBotMessage: "Bro, that movie was three hours of pure boredom. Worst ending of the year, hands down!",
    objectives: [
      'Validate their point ("I see why the pacing felt slow")',
      'Highlight the strong elements (cinematography, soundtrack, acting)',
      'Keep the debate fun and friendly'
    ],
    targetVocabulary: ['pacing', 'cinematography', 'see your point', 'hits different'],
    targetGrammar: ['I definitely get why you felt that way, but for me...', 'What did you think of the soundtrack though?'],
    featured: true
  },
  {
    title: 'College Professor Office Hours Inquiry',
    scenarioId: 'college_professor',
    category: 'College',
    emoji: '🎓',
    difficulty: 'advanced',
    context: 'You visit Professor Vance to ask for clarification on feedback received on your midterm essay.',
    defaultCharacter: 'Maya',
    starterPrompt: 'State the essay topic, thank the professor for feedback, and ask for guidance on strengthening the thesis argument.',
    firstBotMessage: "Come on in! Please have a seat. What can I help you with regarding your paper?",
    objectives: [
      'Thank professor for grading and detailed notes',
      'Ask specific question regarding thesis clarity',
      'Request recommendation for secondary sources'
    ],
    targetVocabulary: ['thesis', 'clarification', 'counter-argument', 'sources'],
    targetGrammar: ['I wanted to follow up on your note about...', 'Could you elaborate on how I might...'],
    featured: false
  },
  {
    title: 'Resolving a Late Night Noise Issue with Neighbor',
    scenarioId: 'neighbor_noise',
    category: 'Meeting someone new',
    emoji: '🚪',
    difficulty: 'intermediate',
    context: 'Your upstairs neighbor has been playing loud bass music at 1:30 AM on weekdays. Knock on their door to talk.',
    defaultCharacter: 'Emma',
    starterPrompt: 'Keep your cool, be friendly but firm, and ask if they can turn down the subwoofer after 11 PM.',
    firstBotMessage: "Hey! Oh, did you need something? Hope the music wasn't too loud?",
    objectives: [
      'Acknowledge the music is fun',
      'Explain you have early morning classes or work',
      'Agree on a reasonable quiet hour (e.g. 11 PM)'
    ],
    targetVocabulary: ['subwoofer', 'early shift', 'compromise', 'thin walls'],
    targetGrammar: ['I hate to be that neighbor, but...', 'Would it be possible to keep the bass down after...'],
    featured: false
  },
  {
    title: 'Pitching a Product Initiative to the VP',
    scenarioId: 'vp_pitch',
    category: 'Job interview',
    emoji: '💼',
    difficulty: 'advanced',
    context: 'You have a 5-minute slot with the VP to pitch revamping the user onboarding flow based on customer attrition telemetry.',
    defaultCharacter: 'Maya',
    starterPrompt: 'Present the business problem clearly, cite quantified friction, and ask for a 2-week experiment pilot.',
    firstBotMessage: "Hey! Glad we could connect. I have about 10 minutes before my board prep—walk me through what you are seeing with onboarding?",
    objectives: [
      'Lead with executive summary and key churn metric',
      'Explain the hypothesized root cause',
      'Propose a low-risk, measurable MVP pilot'
    ],
    targetVocabulary: ['churn rate', 'drop-off funnel', 'pilot experiment', 'ROI'],
    targetGrammar: ['The data indicates a 22% drop-off at step 3...', 'Our recommendation is to run a two-week sprint...'],
    featured: true
  }
];

export const aiCharactersSeed = [
  {
    characterId: 'alex',
    name: 'Alex',
    role: 'Chill Friend',
    tag: 'Casual & Relatable',
    avatar: '😎',
    avatarColor: '#8B5CF6',
    personality: 'Warm, empathetic, effortlessly casual. Talks like a close friend who has known you for years. Never judges mistakes.',
    vocabularyStyle: 'Uses natural modern conversational English and everyday idioms without forcing slang.',
    speakingStyle: 'Relaxed, upbeat, asks engaging questions, uses positive reinforcement.',
    scenarioPreferences: ['Café', 'Party', 'Meeting someone new', 'Small talk'],
    difficulty: 'beginner',
    systemPrompt: `You are Alex, a chill, warm, and highly supportive 22-year-old friend.
You are helping the user practice natural English through conversation.
Rules:
1. Speak in a modern, casual, friendly voice.
2. Keep replies concise (2-3 sentences max).
3. Always ask one natural follow-up question to keep the conversation flowing.
4. DO NOT interrupt every sentence with grammar corrections. Instead, model correct phrasing smoothly in your response.
5. Never sound like a formal teacher, bot, or corporate script.`,
    initialGreeting: "Yo! Great to see you. What's on your mind today?"
  },
  {
    characterId: 'maya',
    name: 'Maya',
    role: 'Professional Mentor',
    tag: 'Career & Confidence',
    avatar: '💼',
    avatarColor: '#22D3EE',
    personality: 'Sharp, articulate, inspiring mentor in her late twenties. Helps learners sound persuasive, confident, and professional.',
    vocabularyStyle: 'Corporate-savvy, crisp, articulate, high-impact phrasing.',
    speakingStyle: 'Confident, structured, constructive, encouraging.',
    scenarioPreferences: ['Job interview', 'Meeting', 'College', 'Asking for help'],
    difficulty: 'advanced',
    systemPrompt: `You are Maya, a sharp, encouraging professional mentor with expertise in career communication.
Rules:
1. Help the user articulate their thoughts with confidence and clarity.
2. When the user phrases something weakly, answer their point and gently demonstrate a more impactful professional alternative.
3. Keep answers crisp and focused (2-4 sentences).
4. Encourage structured reasoning (situation, action, outcome).`,
    initialGreeting: "Hello! Ready to level up your professional communication today? Let's dive in."
  },
  {
    characterId: 'kai',
    name: 'Kai',
    role: 'Gamer & Streamer',
    tag: 'Gaming & High Energy',
    avatar: '🎮',
    avatarColor: '#A3E635',
    personality: 'Energetic, fast-talking gamer and discord teammate. Loves gaming culture, clutches, streaming, and playful banter.',
    vocabularyStyle: 'Heavy gaming terms, internet culture, discord slang, clutch moments.',
    speakingStyle: 'High energy, enthusiastic, hypes up good plays and laughs off losses.',
    scenarioPreferences: ['Gaming', 'Party', 'Social'],
    difficulty: 'intermediate',
    systemPrompt: `You are Kai, a competitive yet friendly gamer and streamer.
Rules:
1. Talk like a real gaming teammate on Discord or Twitch.
2. Use phrases like 'clutch', 'ggs', 'callout', 'no cap', 'w play' naturally.
3. Keep responses energetic and short (2-3 sentences).
4. Ask about games, strategies, and clutch plays.`,
    initialGreeting: "Yo squad! Ready to queue up? What servers are we running today?"
  },
  {
    characterId: 'rio',
    name: 'Rio',
    role: 'Funny & Chaotic',
    tag: 'Humor & Quick Wit',
    avatar: '⚡',
    avatarColor: '#FB923C',
    personality: 'Hilarious, sarcastic in a loving way, chaotic energy. Makes learning hilarious and unforgettable.',
    vocabularyStyle: 'Witty hyperbole, dramatic reactions, Gen-Z comedic timing.',
    speakingStyle: 'Laugh-out-loud reactions, funny metaphors, teasing banter.',
    scenarioPreferences: ['Party', 'Disagreeing politely', 'Asking for help'],
    difficulty: 'intermediate',
    systemPrompt: `You are Rio, a hilarious, witty, and chaotic friend.
Rules:
1. Bring comedic energy and dramatic reactions to whatever the user says.
2. Use witty humor and playful teasing to keep the mood fun.
3. Keep replies punchy and lively (2-3 sentences).
4. Make the user laugh while practicing English.`,
    initialGreeting: "Wait wait wait... you're finally here?! The plot just got ten times more interesting 💀"
  },
  {
    characterId: 'emma',
    name: 'Emma',
    role: 'Patient Conversationalist',
    tag: 'Gentle & Clear',
    avatar: '🌸',
    avatarColor: '#F472B6',
    personality: 'Kind, patient, speaks clearly at an accessible pace. Perfect for beginners who feel nervous or self-conscious about speaking.',
    vocabularyStyle: 'Accessible, clean, descriptive, warm everyday English.',
    speakingStyle: 'Gentle pacing, reassuring, warm smile through words.',
    scenarioPreferences: ['Shopping', 'Restaurant', 'Café', 'Travel'],
    difficulty: 'beginner',
    systemPrompt: `You are Emma, a patient and kind conversational partner.
Rules:
1. Speak with gentle encouragement and clarity.
2. Avoid overwhelming slang or hyper-dense vocabulary.
3. Affirm the user's effort and help them feel totally safe to make mistakes.
4. Keep replies to 2-3 friendly sentences.`,
    initialGreeting: "Hi there! I'm so happy to talk with you today. Take your time, there's no rush at all."
  },
  {
    characterId: 'noah',
    name: 'Noah',
    role: 'Tech & Logic Partner',
    tag: 'Analytical & Tech',
    avatar: '💻',
    avatarColor: '#8B5CF6',
    personality: 'Curious, tech-oriented, analytical thinker. Loves talking code, gadgets, AI tools, science, and architectural problem solving.',
    vocabularyStyle: 'Tech terms, analytical breakdowns, logic metaphors, productivity frameworks.',
    speakingStyle: 'Thoughtful, curious, precise.',
    scenarioPreferences: ['Meeting', 'College', 'Job interview'],
    difficulty: 'advanced',
    systemPrompt: `You are Noah, a curious software developer and tech enthusiast.
Rules:
1. Talk about tech, logic, frameworks, and future tech trends.
2. Keep the discussion grounded, curious, and collaborative.
3. Replies should be 2-3 sentences.`,
    initialGreeting: "Hey! What tech projects or ideas have you been tinkering with lately?"
  }
];

export const gamesSeed = [
  // 1. WORD RUSH
  {
    gameId: 'word_rush',
    title: 'Word Rush',
    type: 'word_rush',
    tagline: 'Fast vocabulary decisions against the clock',
    emoji: '⚡',
    difficulty: 'medium',
    timeLimitSec: 45,
    instructions: 'Choose the correct meaning or usage before the countdown reaches zero!',
    rounds: [
      {
        roundNumber: 1,
        prompt: "What does 'she ate that performance' mean?",
        options: ['She had a meal on stage', 'She did an outstanding, incredible job', 'She forgot her lyrics', 'She arrived late'],
        correctAnswer: 'She did an outstanding, incredible job',
        explanation: "'Ate' is modern praise for doing something exceptionally well."
      },
      {
        roundNumber: 2,
        prompt: "Choose the natural sentence using 'lowkey':",
        options: [
          'I lowkey want to cancel plans and watch movies tonight.',
          'The door has a lowkey key lock.',
          'He spoke in a lowkey voice during music class.',
          'I bought lowkey bread at the grocery.'
        ],
        correctAnswer: 'I lowkey want to cancel plans and watch movies tonight.',
        explanation: "'Lowkey' expresses a quiet, subtle desire or secret feeling."
      },
      {
        roundNumber: 3,
        prompt: "When someone says 'no cap', they mean:",
        options: ['They forgot their hat', 'They are telling the absolute truth', 'They lost the bottle lid', 'They are joking'],
        correctAnswer: 'They are telling the absolute truth',
        explanation: "'Cap' = lie. 'No cap' = no lie / for real."
      },
      {
        roundNumber: 4,
        prompt: "Which phrase means 'feeling slightly ill'?",
        options: ['Under the weather', 'Over the moon', 'Biting the bullet', 'Spilling the tea'],
        correctAnswer: 'Under the weather',
        explanation: "'Under the weather' means mildly unwell or tired."
      }
    ]
  },
  // 2. WORD DETECTIVE
  {
    gameId: 'word_detective',
    title: 'Word Detective',
    type: 'word_detective',
    tagline: 'Spot the hidden vocabulary and tone inside real conversations',
    emoji: '🔍',
    difficulty: 'medium',
    timeLimitSec: 60,
    instructions: 'Read the dialogue snippet and identify which vocabulary word fits the hidden blank.',
    rounds: [
      {
        roundNumber: 1,
        context: "Maya: 'Are you sure Liam wasn't lying about meeting the celebrity?' Sam: 'Bro, he has a selfie with him, ______!'",
        prompt: "Which expression best fills the blank to assert complete truth?",
        options: ['no cap', 'under the weather', 'out of the loop', 'ghost kitchen'],
        correctAnswer: 'no cap',
        explanation: "'no cap' confirms undeniable honesty."
      },
      {
        roundNumber: 2,
        context: "Alex: 'I worked 75 hours this week and can barely keep my eyes open.' Emma: 'You need to take time off before you hit full ______.'",
        prompt: "What word describes severe work/study exhaustion?",
        options: ['burnout', 'bandwidth', 'clout', 'era'],
        correctAnswer: 'burnout',
        explanation: "Prolonged extreme stress leads to burnout."
      },
      {
        roundNumber: 3,
        context: "Jordan: 'I texted Chloe three times about our project and she hasn't replied in five days.' Marcus: 'I think she completely ______ you.'",
        prompt: "Which term means vanishing and cutting off communication without explanation?",
        options: ['ghosted', 'gassed up', 'gatekept', 'flexed on'],
        correctAnswer: 'ghosted',
        explanation: "Abruptly disappearing and ignoring someone is ghosting."
      }
    ]
  },
  // 3. WORD BATTLE
  {
    gameId: 'word_battle',
    title: 'Word Battle',
    type: 'word_battle',
    tagline: 'Describe the concept without uttering the taboo words',
    emoji: '⚔️',
    difficulty: 'spicy',
    timeLimitSec: 60,
    instructions: 'Guess the secret target word based on the clues while avoiding the forbidden taboo words!',
    rounds: [
      {
        roundNumber: 1,
        prompt: "Target: 'AWKWARD'",
        forbiddenWords: ['embarrassing', 'uncomfortable', 'cringe'],
        clues: [
          'The social silence when a bad joke is told.',
          'Waving at someone who was waving to someone behind you.',
          'When nobody knows what to say in an elevator.'
        ],
        options: ['awkward', 'angry', 'confident', 'exhausted'],
        correctAnswer: 'awkward',
        explanation: "Awkward perfectly describes that uneasy social clumsiness."
      },
      {
        roundNumber: 2,
        prompt: "Target: 'CLUTCH'",
        forbiddenWords: ['win', 'game', 'save'],
        clues: [
          'Bringing an umbrella right when rain starts.',
          'Hitting the decisive shot with 1 second on the clock.',
          'Coming through in the most critical high-pressure moment.'
        ],
        options: ['clutch', 'bop', 'flex', 'salty'],
        correctAnswer: 'clutch',
        explanation: "Coming through in high-stakes moments is clutch."
      }
    ]
  },
  // 4. GUESS THE VIBE
  {
    gameId: 'guess_the_vibe',
    title: 'Guess the Vibe',
    type: 'guess_the_vibe',
    tagline: 'Choose which phrase matches the exact situation',
    emoji: '🎭',
    difficulty: 'easy',
    timeLimitSec: 45,
    instructions: 'Match the phrase to the exact tone and context of the situation.',
    rounds: [
      {
        roundNumber: 1,
        prompt: "Situation: You are declining an invitation from your company VP to attend a strategy dinner.",
        options: [
          "Nah I’m not feeling it tbh bro 💀",
          "Thank you for the invitation; unfortunately, I have a prior commitment and will be unable to attend.",
          "I’m respectfully disappearing ✌️",
          "I guess I will pass no cap."
        ],
        correctAnswer: "Thank you for the invitation; unfortunately, I have a prior commitment and will be unable to attend.",
        explanation: "When communicating with company leadership, polished professional tone is essential."
      },
      {
        roundNumber: 2,
        prompt: "Situation: Your best friend drops a crazy plot twist in the group chat at midnight.",
        options: [
          "I find this narrative development statistically improbable.",
          "WAIT WHAT?! Stop playing with my emotions right now 😭💀",
          "Kindly provide peer-reviewed documentation.",
          "I shall review this tomorrow at 9 AM."
        ],
        correctAnswer: "WAIT WHAT?! Stop playing with my emotions right now 😭💀",
        explanation: "Group chats with best friends call for expressive, high-energy reactions."
      }
    ]
  },
  // 5. SAY IT BETTER
  {
    gameId: 'say_it_better',
    title: 'Say It Better',
    type: 'say_it_better',
    tagline: 'Turn awkward textbook English into effortless natural speech',
    emoji: '✨',
    difficulty: 'medium',
    timeLimitSec: 50,
    instructions: 'Transform unnatural textbook phrasing into what fluent speakers actually say.',
    rounds: [
      {
        roundNumber: 1,
        prompt: "Textbook sentence: 'I am possessing very much hunger at this present instant.'",
        options: [
          "I'm starving / I could really eat right now.",
          "I have hunger in my stomach currently.",
          "My appetite is executing functions.",
          "Hunger is with me today."
        ],
        correctAnswer: "I'm starving / I could really eat right now.",
        explanation: "Native speakers say 'I'm starving' or 'I could really eat right now'."
      },
      {
        roundNumber: 2,
        prompt: "Textbook sentence: 'I am in complete agreement with your stated proposition.'",
        options: [
          "I totally agree / 100% on that.",
          "I am agreeing to agree.",
          "Your statement is agreeable to my ear.",
          "I have agreement inside me."
        ],
        correctAnswer: "I totally agree / 100% on that.",
        explanation: "'I totally agree' or '100% on that' flows effortlessly in real conversations."
      },
      {
        roundNumber: 3,
        prompt: "Textbook sentence: 'Yesterday I have went to the shopping center.'",
        options: [
          "Yesterday I went to the mall.",
          "Yesterday I go to market.",
          "Yesterday I was go shopping.",
          "I have went yesterday."
        ],
        correctAnswer: "Yesterday I went to the mall.",
        explanation: "Use simple past 'went' for events that happened yesterday."
      }
    ]
  },
  // 6. CONTEXT CLASH
  {
    gameId: 'context_clash',
    title: 'Context Clash',
    type: 'context_clash',
    tagline: 'Two expressions appear. Choose which fits the social situation.',
    emoji: '🥊',
    difficulty: 'medium',
    timeLimitSec: 45,
    instructions: 'Pick the expression that fits the exact social formality.',
    rounds: [
      {
        roundNumber: 1,
        prompt: "Context: Job Interview closing remarks",
        options: [
          "Choice A: 'I appreciate your time and look forward to hearing your decision.'",
          "Choice B: 'Hit me up on Discord if I got the gig bro 🤝'"
        ],
        correctAnswer: "Choice A: 'I appreciate your time and look forward to hearing your decision.'",
        explanation: "Choice A reflects professional gratitude and follow-up etiquette."
      },
      {
        roundNumber: 2,
        prompt: "Context: Instagram comment on a friend's graduation photo",
        options: [
          "Choice A: 'SO PROUD OF YOU!! You literally ate that degree 🎓🔥'",
          "Choice B: 'I acknowledge your successful completion of tertiary educational requirements.'"
        ],
        correctAnswer: "Choice A: 'SO PROUD OF YOU!! You literally ate that degree 🎓🔥'",
        explanation: "Social media graduation praise should be enthusiastic, warm, and celebratory."
      }
    ]
  }
];

export const questsSeed = [
  {
    title: 'Word Collector',
    description: 'Learn and bookmark 10 new words or expressions in the wild.',
    pillar: 'vocabulary',
    targetType: 'learn_words',
    targetCount: 10,
    rewardXp: 50,
    rewardBadge: { id: 'word_collector', name: 'Word Collector', icon: '🧠' },
    period: 'weekly',
    icon: '🧠'
  },
  {
    title: 'Voice Drop Master',
    description: 'Complete 2 spoken roleplay conversations with Alex or Maya.',
    pillar: 'speaking',
    targetType: 'have_conversations',
    targetCount: 2,
    rewardXp: 75,
    rewardBadge: { id: 'fluent_talker', name: 'Voice Pioneer', icon: '🎙️' },
    period: 'weekly',
    icon: '🎙️'
  },
  {
    title: 'Story Explorer',
    description: 'Finish reading 3 chat stories or interactive branching scenarios.',
    pillar: 'reading',
    targetType: 'finish_readings',
    targetCount: 3,
    rewardXp: 60,
    rewardBadge: { id: 'story_junkie', name: 'Story Explorer', icon: '📖' },
    period: 'weekly',
    icon: '📖'
  },
  {
    title: 'Community Creator',
    description: 'Submit 2 creative writing transformations to the community feed.',
    pillar: 'writing',
    targetType: 'create_posts',
    targetCount: 2,
    rewardXp: 50,
    rewardBadge: { id: 'wordsmith', name: 'Vibe Creator', icon: '✍️' },
    period: 'weekly',
    icon: '✍️'
  },
  {
    title: 'Game Champion',
    description: 'Play 3 vocabulary games (Word Rush or Say It Better).',
    pillar: 'overall',
    targetType: 'play_games',
    targetCount: 3,
    rewardXp: 45,
    rewardBadge: { id: 'arcade_king', name: 'Arcade Star', icon: '🎮' },
    period: 'weekly',
    icon: '🎮'
  }
];

export const samplePostsSeed = [
  {
    authorUsername: 'ayush_vibes',
    authorDisplayName: 'Ayush Thapa',
    authorAvatar: '⚡',
    authorBadge: 'ENGLISH EXPLORER',
    content: 'chaotic. expensive. worth-it. 😭',
    promptTag: 'Describe your weekend in 3 words',
    tags: ['Weekend', 'Casual'],
    highlightExpression: {
      phrase: 'worth-it',
      meaning: 'Deserving of the effort, money, or time spent despite difficulties.',
      vibe: 'Relatable'
    },
    reactions: { fire: 14, skull: 9, hundred: 22, handshake: 5 }
  },
  {
    authorUsername: 'tara_tales',
    authorDisplayName: 'Tara Sharma',
    authorAvatar: '🌸',
    authorBadge: 'CASUAL SPEAKER',
    content: 'Finally used "rain check" when my coworker asked for drinks and it felt so smooth instead of just awkwardly apologizing!',
    promptTag: 'Small Wins Today',
    tags: ['Confidence', 'Work'],
    highlightExpression: {
      phrase: 'rain check',
      meaning: 'Politely postponing an invitation to a later date.',
      vibe: 'Polite & Natural'
    },
    reactions: { fire: 31, skull: 2, hundred: 45, handshake: 18 }
  },
  {
    authorUsername: 'rohan_codes',
    authorDisplayName: 'Rohan Verma',
    authorAvatar: '💻',
    authorBadge: 'TECH BUILDER',
    content: 'Told my senior dev "I don’t have the bandwidth for three pull requests today" and he respected it immediately. Workplace vocabulary really hits different.',
    promptTag: 'Work English in the wild',
    tags: ['Tech', 'Work'],
    highlightExpression: {
      phrase: 'bandwidth',
      meaning: 'Mental or time capacity to handle extra workload.',
      vibe: 'Corporate Smart'
    },
    reactions: { fire: 27, skull: 4, hundred: 38, handshake: 12 }
  }
];
