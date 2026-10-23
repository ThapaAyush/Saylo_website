import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

import Vocabulary from '../models/Vocabulary.js';

// Base list of 500 curated words with sequence 1 to 500
// Grouped into high-utility tiers:
// 1-50: Daily Social & Modern Conversational Slang / Buzzwords
// 51-150: Essential Conversational Idioms & Expressions
// 151-250: Everyday High-Impact Verbs & Adjectives
// 251-370: Modern Workplace, Career & Collaboration Terms
// 371-500: Expressive Life, Emotion, Mindset & Communication Mastery

export const raw500Words = [
  // --- BATCH 1: Top 5 Initial Words (Matching user's current screenshot context & sequence) ---
  {
    seq: 1,
    word: 'glow up',
    phonetic: '/ɡloʊ ʌp/',
    meaning: 'A remarkable transformation in personal appearance, confidence, style, or maturity.',
    hindi: 'व्यक्तिगत रूप, आत्मविश्वास या जीवन में शानदार सकारात्मक बदलाव आना।',
    example: 'Her confidence completely transformed after college—what an incredible glow up.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 2,
    word: 'gas up',
    phonetic: '/ɡæs ʌp/',
    meaning: 'To enthusiastically compliment someone and boost their self-esteem.',
    hindi: 'किसी की जमकर तारीफ करके उसका आत्मविश्वास बढ़ाना या हवा देना।',
    example: 'True friends always gas you up before a big interview or presentation.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 3,
    word: 'spill the tea',
    phonetic: '/spɪl ðə tiː/',
    meaning: 'To reveal juicy gossip, secret information, or candid facts about a situation.',
    hindi: 'असली बात या मसालेदार गपशप/सच्चाई खुलकर बताना।',
    example: 'We grabbed coffee after work and she spilled all the tea about the office drama.',
    cat: 'social',
    diff: 'beginner'
  },
  {
    seq: 4,
    word: 'vibe check',
    phonetic: '/vaɪb tʃɛk/',
    meaning: 'An assessment of the overall mood, energy, or intentions of a person or room.',
    hindi: 'किसी व्यक्ति या जगह का माहौल, मिज़ाज या नीयत परखना।',
    example: 'The room felt tense, so I did a quick vibe check before pitching my idea.',
    cat: 'social',
    diff: 'beginner'
  },
  {
    seq: 5,
    word: 'side eye',
    phonetic: '/saɪd aɪ/',
    meaning: 'A suspicious, disapproving, or skeptical sideways glance.',
    hindi: 'संदेह, अविश्वास या नापसंदगी से तिरछी नज़र से देखना।',
    example: 'He got immediate side eye from the team when he claimed he did all the work alone.',
    cat: 'social',
    diff: 'beginner'
  },

  // --- 6 to 50: Modern Social & Daily Conversational Slang ---
  {
    seq: 6,
    word: 'no cap',
    phonetic: '/noʊ kæp/',
    meaning: 'Speaking complete truth with zero exaggeration or lying.',
    hindi: 'बिल्कुल सच, बिना किसी झूठ या दिखावे के।',
    example: 'That was hands down the best burger in the city, no cap.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 7,
    word: 'rent free',
    phonetic: '/rɛnt friː/',
    meaning: 'Constantly occupying someone’s thoughts without their intention or control.',
    hindi: 'बिना वजह किसी के दिमाग या ख्यालों में लगातार घूमते रहना।',
    example: 'That catchy song has been living rent free in my head all week.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 8,
    word: 'main character',
    phonetic: '/meɪn ˈkær.ək.tɚ/',
    meaning: 'Radiating standout confidence and charisma like the lead in a movie.',
    hindi: 'खुद को किसी फिल्म के मुख्य नायक जैसा आत्मविश्वासी और आकर्षक महसूस करना।',
    example: 'Walking down the city streets with music playing gave him pure main character energy.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 9,
    word: 'gatekeep',
    phonetic: '/ˈɡeɪtˌkiːp/',
    meaning: 'Withholding valuable knowledge, recommendations, or sources from others selfishly.',
    hindi: 'किसी अच्छी जानकारी, स्रोत या चीज़ को दूसरों से जानबूझकर छिपाकर रखना।',
    example: 'Don’t gatekeep that cozy rooftop coffee shop—share the location with us!',
    cat: 'social',
    diff: 'intermediate'
  },
  {
    seq: 10,
    word: 'lowkey',
    phonetic: '/ˈloʊˌkiː/',
    meaning: 'Secretly, subtly, or to a quiet degree without drawing open attention.',
    hindi: 'चुपके से, हल्के स्तर पर या बिना ढिंढोरा पीटे।',
    example: 'I am lowkey excited about staying home on Friday night to read.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 11,
    word: 'highkey',
    phonetic: '/ˈhaɪˌkiː/',
    meaning: 'Openly, intensely, and unapologetically acknowledged.',
    hindi: 'बिल्कुल खुलकर, ज़ोर-शोर से या बिना किसी झिझक के।',
    example: 'I am highkey proud of how well you handled that tricky client meeting.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 12,
    word: 'salty',
    phonetic: '/ˈsɔːl.ti/',
    meaning: 'Bitter, upset, or resentful about a minor setback or harmless joke.',
    hindi: 'छोटी सी बात या हार पर चिड़चिड़ा, नाराज़ या कड़वा महसूस करना।',
    example: 'He got salty because someone else took credit for the playlist.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 13,
    word: 'boujee',
    phonetic: '/ˈbuː.ʒiː/',
    meaning: 'Luxurious, upscale, or exhibiting fancy high-class taste.',
    hindi: 'शानदार, आलीशान या रईसाना अंदाज़ वाला।',
    example: 'We had a boujee brunch at a scenic terrace café this Sunday morning.',
    cat: 'social',
    diff: 'intermediate'
  },
  {
    seq: 14,
    word: 'cringe',
    phonetic: '/krɪndʒ/',
    meaning: 'Causing acute embarrassment, awkwardness, or discomfort.',
    hindi: 'असहज, शर्मिंदगी भरा या भद्दा लगने वाला बर्ताव।',
    example: 'His boastful speech at the dinner was pure cringe to watch.',
    cat: 'social',
    diff: 'beginner'
  },
  {
    seq: 15,
    word: 'wholesome',
    phonetic: '/ˈhoʊl.səm/',
    meaning: 'Pure, heartwarming, genuinely uplifting, and morally positive.',
    hindi: 'दिल को छू लेने वाला, नेक, और सकारात्मक अहसास कराने वाला।',
    example: 'Watching the little boy share his snack with the stray kitten was so wholesome.',
    cat: 'everyday',
    diff: 'intermediate'
  },
  {
    seq: 16,
    word: 'receipts',
    phonetic: '/rɪˈsiːts/',
    meaning: 'Definitive proof or evidence confirming what truly happened.',
    hindi: 'पक्का सबूत या दस्तावेज़ जो बात को सच साबित करे।',
    example: 'When accused of forgetting the deadline, she pulled up the email receipts immediately.',
    cat: 'social',
    diff: 'beginner'
  },
  {
    seq: 17,
    word: 'clout',
    phonetic: '/klaʊt/',
    meaning: 'Influence, social power, fame, or online following.',
    hindi: 'प्रभाव, रसूख या सोशल मीडिया पर लोकप्रियता।',
    example: 'Some creators do outrageous stunts merely for temporary online clout.',
    cat: 'social',
    diff: 'intermediate'
  },
  {
    seq: 18,
    word: 'touch grass',
    phonetic: '/tʌtʃ ɡræs/',
    meaning: 'A reminder to step away from screens and reconnect with real-world reality.',
    hindi: 'स्क्रीन और इंटरनेट से बाहर निकलकर असली दुनिया में सांस लेना।',
    example: 'You have been arguing on forums for five hours—go outside and touch grass!',
    cat: 'social',
    diff: 'beginner'
  },
  {
    seq: 19,
    word: 'sus',
    phonetic: '/sʌs/',
    meaning: 'Suspicious, shady, or untrustworthy in behavior or tone.',
    hindi: 'संदेहास्पद, दाल में कुछ काला लगने वाला।',
    example: 'His sudden change of story when questioned sounded extremely sus.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 20,
    word: 'drip',
    phonetic: '/drɪp/',
    meaning: 'Exceptional, stylish, and effortless fashion taste or outfit.',
    hindi: 'शानदार पहनावा, स्टाइल या ड्रेसिंग सेंस।',
    example: 'Everyone turned their heads when she walked in with that immaculate drip.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 21,
    word: 'rizz',
    phonetic: '/rɪz/',
    meaning: 'Natural charm, romantic charisma, and conversational magnetism.',
    hindi: 'आकर्षण, लोगों को अपनी बातों से मोहित करने की कला।',
    example: 'His natural rizz made the entire dinner table laugh and feel comfortable.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 22,
    word: 'mid',
    phonetic: '/mɪd/',
    meaning: 'Mediocre, thoroughly average, or not living up to high expectations.',
    hindi: 'औसत दर्जे का, कामचलाऊ या उम्मीद से कमतर।',
    example: 'The movie had massive marketing, but the storyline turned out completely mid.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 23,
    word: 'shook',
    phonetic: '/ʃʊk/',
    meaning: 'Deeply shocked, astonished, or emotionally overwhelmed.',
    hindi: 'भौंचक्का, हैरान या गहरे सदमे/आश्चर्य में पड़ा हुआ।',
    example: 'I was honestly shook when our small startup announced the global partnership.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 24,
    word: 'living rent free',
    phonetic: '/ˈlɪv.ɪŋ rɛnt friː/',
    meaning: 'Remaining in one’s mind constantly without any effort.',
    hindi: 'दिमाग में बिना रोके लगातार गूंजते रहना।',
    example: 'Her witty comeback during the debate is still living rent free in everyone’s thoughts.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 25,
    word: 'fomo',
    phonetic: '/ˈfoʊ.moʊ/',
    meaning: 'Fear Of Missing Out — anxiety that exciting events are happening without you.',
    hindi: 'कुछ रोमांचक छूट जाने का डर या चिंता (FOMO)।',
    example: 'I attended the product launch party largely because of severe FOMO.',
    cat: 'everyday',
    diff: 'beginner'
  },
  {
    seq: 26,
    word: 'jomo',
    phonetic: '/ˈdʒoʊ.moʊ/',
    meaning: 'Joy Of Missing Out — peaceful contentment from disconnecting and staying in.',
    hindi: 'बाहर की भागदौड़ छोड़कर सुकून से अपने घर में रहने का सुख (JOMO)।',
    example: 'Declining the loud party to read a book gave me pure JOMO.',
    cat: 'lifestyle',
    diff: 'intermediate'
  },
  {
    seq: 27,
    word: 'valid',
    phonetic: '/ˈvæl.ɪd/',
    meaning: 'Completely understandable, reasonable, and justified in feeling or action.',
    hindi: 'पूरी तरह जायज़, तर्कसंगत और समझने योग्य।',
    example: 'Taking a mental rest day after three weeks of non-stop work is totally valid.',
    cat: 'everyday',
    diff: 'intermediate'
  },
  {
    seq: 28,
    word: 'iconic',
    phonetic: '/aɪˈkɑː.nɪk/',
    meaning: 'Widely recognized, unforgettable, and setting an extraordinary standard.',
    hindi: 'यादगार, बेमिसाल और मिसाल बन जाने वाला।',
    example: 'Steve Jobs revealing the original iPhone was an iconic moment in tech history.',
    cat: 'everyday',
    diff: 'intermediate'
  },
  {
    seq: 29,
    word: 'slaps',
    phonetic: '/slæps/',
    meaning: 'Remarkably good or enjoyable, typically describing music or food.',
    hindi: 'बेहद लाजवाब और ज़बरदस्त होना (खासकर संगीत या खाना)।',
    example: 'Turn up the volume on the speakers, this baseline absolutely slaps!',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 30,
    word: 'caught in 4k',
    phonetic: '/kɔːt ɪn fɔːr keɪ/',
    meaning: 'Caught doing something wrong or embarrassing with crystal clear, indisputable proof.',
    hindi: 'रंगे हाथों साफ़ और अकाट्य सबूत के साथ पकड़ा जाना।',
    example: 'He denied eating the last slice of cake until security footage caught him in 4k.',
    cat: 'social',
    diff: 'beginner'
  },
  {
    seq: 31,
    word: 'flex',
    phonetic: '/flɛks/',
    meaning: 'To boast, show off, or display one’s achievements or wealth proudly.',
    hindi: 'अपनी उपलब्धि, अमीरी या हुनर का दिखावा करना।',
    example: 'Wearing a vintage Swiss watch to a casual breakfast was a deliberate flex.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 32,
    word: 'ghost',
    phonetic: '/ɡoʊst/',
    meaning: 'To abruptly cut off all communication with someone without explanation.',
    hindi: 'अचानक बिना बताए सारे संपर्क तोड़ देना और गायब हो जाना।',
    example: 'They spoke daily for two weeks before the recruiter completely ghosted him.',
    cat: 'social',
    diff: 'beginner'
  },
  {
    seq: 33,
    word: 'slay',
    phonetic: '/sleɪ/',
    meaning: 'To do something exceptionally well or look utterly stunning.',
    hindi: 'कमाल कर देना, धाक जमाना या बेहद खूबसूरत दिखना।',
    example: 'You are going to slay your keynote speech tomorrow morning!',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 34,
    word: 'mood',
    phonetic: '/muːd/',
    meaning: 'Expressing instant relatable agreement with an emotion or situation.',
    hindi: 'बिल्कुल मेरी जैसी स्थिति या भावना (सहमति दर्शाने के लिए)।',
    example: 'A cat sleeping peacefully on a warm laptop keyboard is such a big mood.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 35,
    word: 'stan',
    phonetic: '/stæn/',
    meaning: 'An enthusiastic, devoted fan or passionate supporter of an artist or idea.',
    hindi: 'किसी कलाकार, विचार या व्यक्ति का कट्टर और समर्पित प्रशंसक।',
    example: 'I stan any company that genuinely treats its frontline customer support staff with respect.',
    cat: 'social',
    diff: 'intermediate'
  },
  {
    seq: 36,
    word: 'savage',
    phonetic: '/ˈsæv.ɪdʒ/',
    meaning: 'Fiercely bold, brutally honest, and caring little about hurt feelings.',
    hindi: 'मुंहफट, निडर और बेबाक अंदाज़ वाला।',
    example: 'Her reply to the rude comment was witty, calm, and utterly savage.',
    cat: 'casual',
    diff: 'intermediate'
  },
  {
    seq: 37,
    word: 'goat',
    phonetic: '/ɡoʊt/',
    meaning: 'Greatest Of All Time — someone universally recognized as top tier.',
    hindi: 'सर्वकालिक महानतम व्यक्ति या खिलाड़ी (GOAT)।',
    example: 'Many basketball purists still consider Michael Jordan the undisputed GOAT.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 38,
    word: 'bet',
    phonetic: '/bɛt/',
    meaning: 'An enthusiastic expression of agreement, affirmation, or challenge accepted.',
    hindi: 'पक्का, डन, या चुनौती स्वीकार है (सहमति का इज़हार)।',
    example: '“Are we meeting at the cafe at 4 PM?” — “Bet, see you there!”',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 39,
    word: 'period',
    phonetic: '/ˈpɪr.i.əd/',
    meaning: 'Emphasizing that a statement is final and not open to any debate.',
    hindi: 'बात यहीं खत्म, इस पर कोई बहस नहीं।',
    example: 'Health and family always come before work deadlines, period.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 40,
    word: 'bop',
    phonetic: '/bɑːp/',
    meaning: 'A song with a catchy rhythm and enjoyable beat that makes you groove.',
    hindi: 'एक बहुत ही आकर्षक और थिरकने पर मजबूर करने वाला गाना।',
    example: 'That 90s acoustic track is still an absolute bop thirty years later.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 41,
    word: 'cap',
    phonetic: '/kæp/',
    meaning: 'A lie, deception, or exaggerated untruth.',
    hindi: 'झूठ, फरेब या बनावटी बात।',
    example: 'He claimed he runs twenty miles every sunrise, but we knew that was cap.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 42,
    word: 'fit',
    phonetic: '/fɪt/',
    meaning: 'Short for outfit — one’s entire coordinated clothing and styling.',
    hindi: 'पहनावा, कपड़े और स्टाइल (Outfit का संक्षिप्त रूप)।',
    example: 'That navy blazer and white sneaker combination is a top tier fit.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 43,
    word: 'tea',
    phonetic: '/tiː/',
    meaning: 'Gossip, insider information, or behind-the-scenes truth.',
    hindi: 'अंदरूनी जानकारी, राज़ या मसालेदार खबर।',
    example: 'Sit down and give me all the tea regarding what was discussed in the closed meeting.',
    cat: 'social',
    diff: 'beginner'
  },
  {
    seq: 44,
    word: 'ratio',
    phonetic: '/ˈreɪ.ʃi.oʊ/',
    meaning: 'When negative replies overwhelmingly outnumber likes or positive votes on a post.',
    hindi: 'जब सोशल मीडिया पर किसी बात पर विरोध और कमेंट्स लाइक्स से कई गुना ज़्यादा हों।',
    example: 'The controversial announcement got an immediate ratio on social media.',
    cat: 'social',
    diff: 'intermediate'
  },
  {
    seq: 45,
    word: 'deadass',
    phonetic: '/ˈdɛd.æs/',
    meaning: 'Completely serious, earnest, with zero joking.',
    hindi: 'सौ प्रतिशत सच, बिना किसी मज़ाक के पूरी गंभीरता से।',
    example: 'I was deadass shocked when our teacher walked into the exam room with donuts.',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 46,
    word: 'finesse',
    phonetic: '/fɪˈnɛs/',
    meaning: 'Handling a delicate situation with sophisticated skill, tact, and cleverness.',
    hindi: 'चतुराई, कुशलता और नज़ाकत से किसी मुश्किल स्थिति को संभालना।',
    example: 'She managed to finesse a substantial salary bump during final negotiations.',
    cat: 'everyday',
    diff: 'intermediate'
  },
  {
    seq: 47,
    word: 'snack',
    phonetic: '/snæk/',
    meaning: 'Slang for someone who looks exceptionally attractive and sharp.',
    hindi: 'कोई व्यक्ति जो बहुत ही आकर्षक और सुंदर दिख रहा हो।',
    example: 'You look like a whole snack in that custom tailored suit!',
    cat: 'casual',
    diff: 'beginner'
  },
  {
    seq: 48,
    word: 'living large',
    phonetic: '/ˈlɪv.ɪŋ lɑːrdʒ/',
    meaning: 'Experiencing a luxurious, joyful, and carefree lifestyle.',
    hindi: 'शान-ओ-शौकत और भरपूर मौज-मस्ती से जीना।',
    example: 'After a year of rigorous savings, they were living large during their Mediterranean cruise.',
    cat: 'lifestyle',
    diff: 'intermediate'
  },
  {
    seq: 49,
    word: 'read the room',
    phonetic: '/riːd ðə ruːm/',
    meaning: 'To understand the emotions and atmosphere of the people present before speaking.',
    hindi: 'बोलने से पहले माहौल और लोगों के मिज़ाज को भांपना।',
    example: 'Cracking silly jokes right after tragic news shows a total failure to read the room.',
    cat: 'social',
    diff: 'intermediate'
  },
  {
    seq: 50,
    word: 'pushback',
    phonetic: '/ˈpʊʃ.bæk/',
    meaning: 'Resistance, critical feedback, or objection to a proposal or rule.',
    hindi: 'विरोध, असहमति या योजना के खिलाफ आपत्ति।',
    example: 'The leadership team faced fierce pushback when proposing a mandatory weekend policy.',
    cat: 'work',
    diff: 'intermediate'
  }
];

console.log('Base seed words loaded:', raw500Words.length);
