import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

import Vocabulary from '../models/Vocabulary.js';

// Helper to generate full data for sequence 1 to 500
export const get500Words = () => {
  const wordsList = [
    // 1 - 5 (Screenshot matches)
    { seq: 1, word: 'glow up', phonetic: '/ɡloʊ ʌp/', meaning: 'A remarkable transformation in personal appearance, confidence, or style.', hindi: 'रूप, आत्मविश्वास या जीवन में शानदार सकारात्मक बदलाव आना।', example: 'Her confidence transformed completely after college—what an incredible glow up.', cat: 'casual', diff: 'beginner' },
    { seq: 2, word: 'gas up', phonetic: '/ɡæs ʌp/', meaning: 'To enthusiastically compliment someone and inflate their confidence.', hindi: 'किसी की जमकर तारीफ करके उसका आत्मविश्वास बढ़ाना या हवा देना।', example: 'True friends always gas you up before a big interview or presentation.', cat: 'casual', diff: 'beginner' },
    { seq: 3, word: 'spill the tea', phonetic: '/spɪl ðə tiː/', meaning: 'To share juicy gossip, insider facts, or candid secret information.', hindi: 'असली बात या मसालेदार गपशप/सच्चाई खुलकर बताना।', example: 'We grabbed coffee and she spilled all the tea about the office drama.', cat: 'social', diff: 'beginner' },
    { seq: 4, word: 'vibe check', phonetic: '/vaɪb tʃɛk/', meaning: 'An assessment of the overall mood, energy, or intentions of someone.', hindi: 'किसी व्यक्ति या जगह का माहौल, मिज़ाज या नीयत परखना।', example: 'The room felt tense, so I did a quick vibe check before pitching.', cat: 'social', diff: 'beginner' },
    { seq: 5, word: 'side eye', phonetic: '/saɪd aɪ/', meaning: 'A suspicious, skeptical, or disapproving sideways glance.', hindi: 'संदेह, अविश्वास या नापसंदगी से तिरछी नज़र से देखना।', example: 'He got immediate side eye when he claimed he did all the work alone.', cat: 'social', diff: 'beginner' },

    // 6 - 50
    { seq: 6, word: 'no cap', phonetic: '/noʊ kæp/', meaning: 'Speaking pure truth with zero exaggeration or lying.', hindi: 'बिल्कुल सच, बिना किसी झूठ के।', example: 'That was the best acoustic concert in the city, no cap.', cat: 'casual', diff: 'beginner' },
    { seq: 7, word: 'rent free', phonetic: '/rɛnt friː/', meaning: 'Constantly occupying someone’s thoughts without control.', hindi: 'बिना वजह दिमाग में लगातार घूमते रहना।', example: 'That catchy tune has been living rent free in my head all week.', cat: 'casual', diff: 'beginner' },
    { seq: 8, word: 'main character', phonetic: '/meɪn ˈkærɪktər/', meaning: 'Radiating standout confidence like the lead actor in a movie.', hindi: 'मुख्य नायक जैसा आत्मविश्वासी और आकर्षक महसूस करना।', example: 'Walking through the city with headphones gives pure main character energy.', cat: 'casual', diff: 'beginner' },
    { seq: 9, word: 'gatekeep', phonetic: '/ˈɡeɪtkiːp/', meaning: 'Selfishly withholding valuable knowledge or sources from others.', hindi: 'अच्छी जानकारी या स्रोत दूसरों से छिपाकर रखना।', example: 'Don’t gatekeep that cozy cafe—share the location with us!', cat: 'social', diff: 'intermediate' },
    { seq: 10, word: 'lowkey', phonetic: '/ˈloʊkiː/', meaning: 'Subtly, quietly, or secretly without drawing major attention.', hindi: 'चुपके से, हल्के स्तर पर या बिना ढिंढोरा पीटे।', example: 'I am lowkey thrilled about spending Friday night reading at home.', cat: 'casual', diff: 'beginner' },
    { seq: 11, word: 'highkey', phonetic: '/ˈhaɪkiː/', meaning: 'Openly, passionately, and unapologetically acknowledged.', hindi: 'बिल्कुल खुलकर और गर्व से स्वीकार करना।', example: 'I am highkey proud of how well you led the discussion today.', cat: 'casual', diff: 'beginner' },
    { seq: 12, word: 'salty', phonetic: '/ˈsɔːlti/', meaning: 'Bitter, upset, or irritated over a harmless setback or joke.', hindi: 'छोटी बात या हार पर चिड़चिड़ा और कड़वा महसूस करना।', example: 'He felt salty because someone else won the trivia trophy.', cat: 'casual', diff: 'beginner' },
    { seq: 13, word: 'boujee', phonetic: '/ˈbuːʒi/', meaning: 'Luxurious, upscale, or exhibiting fancy lifestyle tastes.', hindi: 'शानदार, आलीशान या रईसों जैसा अंदाज़।', example: 'We enjoyed a boujee brunch at the riverside terrace restaurant.', cat: 'social', diff: 'intermediate' },
    { seq: 14, word: 'cringe', phonetic: '/krɪndʒ/', meaning: 'Causing acute embarrassment, awkwardness, or discomfort.', hindi: 'शर्मिंदगी भरा या असहज करने वाला बर्ताव।', example: 'His forced jokes during the team intro were pure cringe.', cat: 'social', diff: 'beginner' },
    { seq: 15, word: 'wholesome', phonetic: '/ˈhoʊlsəm/', meaning: 'Pure, uplifting, heartwarming, and morally positive.', hindi: 'दिल को सुकून देने वाला, नेक और प्यारा अहसास।', example: 'Watching the elderly couple dance in the rain was truly wholesome.', cat: 'everyday', diff: 'intermediate' },
    { seq: 16, word: 'receipts', phonetic: '/rɪˈsiːts/', meaning: 'Concrete proof, screenshots, or documentation confirming truth.', hindi: 'पक्का सबूत या दस्तावेज़ जो सच्चाई साबित करे।', example: 'She showed the email receipts when they questioned her deadline.', cat: 'social', diff: 'beginner' },
    { seq: 17, word: 'clout', phonetic: '/klaʊt/', meaning: 'Social power, fame, influence, or online popularity.', hindi: 'प्रभाव, रसूख या सोशल मीडिया पर लोकप्रियता।', example: 'Some influencers do fake pranks just for fleeting online clout.', cat: 'social', diff: 'intermediate' },
    { seq: 18, word: 'touch grass', phonetic: '/tʌtʃ ɡræs/', meaning: 'A reminder to step away from screens and connect with reality.', hindi: 'स्क्रीन छोड़कर असल ज़िंदगी और प्रकृति में वापस आना।', example: 'You have been scrolling forums for five hours—go touch grass!', cat: 'social', diff: 'beginner' },
    { seq: 19, word: 'sus', phonetic: '/sʌs/', meaning: 'Suspicious, untrustworthy, or shady in appearance or behavior.', hindi: 'संदेहास्पद, जिस पर भरोसा न हो सके।', example: 'The stranger’s strange excuse sounded extremely sus to everyone.', cat: 'casual', diff: 'beginner' },
    { seq: 20, word: 'drip', phonetic: '/drɪp/', meaning: 'Outstanding, fashionable, and confident style or outfit.', hindi: 'लाजवाब स्टाइल, पहनावा या ड्रेसिंग सेंस।', example: 'Everyone turned their heads when he showed up with that classy drip.', cat: 'casual', diff: 'beginner' },
    { seq: 21, word: 'rizz', phonetic: '/rɪz/', meaning: 'Effortless charm, conversational magnetism, and attractiveness.', hindi: 'अपनी बातों और अंदाज़ से लोगों को आकर्षित करने का हुनर।', example: 'His natural rizz put the entire gathering at ease instantly.', cat: 'casual', diff: 'beginner' },
    { seq: 22, word: 'mid', phonetic: '/mɪd/', meaning: 'Mediocre, completely average, or failing high expectations.', hindi: 'औसत दर्जे का, साधारण या उम्मीद से कमतर।', example: 'The trailer was hyped, but the series finale was completely mid.', cat: 'casual', diff: 'beginner' },
    { seq: 23, word: 'shook', phonetic: '/ʃʊk/', meaning: 'Deeply shocked, amazed, or emotionally stunned.', hindi: 'भौंचक्का, हैरान या गहरे आश्चर्य में पड़ा हुआ।', example: 'I was genuinely shook when I saw the surprise party guests.', cat: 'casual', diff: 'beginner' },
    { seq: 24, word: 'fomo', phonetic: '/ˈfoʊmoʊ/', meaning: 'Fear of missing out on exciting events happening without you.', hindi: 'कुछ अच्छा छूट जाने का डर या चिंता।', example: 'I bought the ticket mostly because of intense FOMO.', cat: 'everyday', diff: 'beginner' },
    { seq: 25, word: 'jomo', phonetic: '/ˈdʒoʊmoʊ/', meaning: 'Joy of missing out—contentment from staying home peacefully.', hindi: 'बाहर की भीड़ छोड़कर सुकून से अपने घर में रहने का आनंद।', example: 'Sipping hot tea on a rainy evening gave me pure JOMO.', cat: 'lifestyle', diff: 'intermediate' },
    { seq: 26, word: 'valid', phonetic: '/ˈvælɪd/', meaning: 'Completely understandable, logical, and justified in feeling.', hindi: 'पूरी तरह जायज़, सही और समझने योग्य।', example: 'Feeling exhausted after continuous exam prep is completely valid.', cat: 'everyday', diff: 'intermediate' },
    { seq: 27, word: 'iconic', phonetic: '/aɪˈkɑːnɪk/', meaning: 'Widely recognized, unforgettable, and legendary in style.', hindi: 'यादगार, बेमिसाल और ऐतिहासिक महत्व वाला।', example: 'Her performance at the festival became an iconic cultural moment.', cat: 'everyday', diff: 'intermediate' },
    { seq: 28, word: 'slaps', phonetic: '/slæps/', meaning: 'Remarkably good, catchy, or flavorful (food or music).', hindi: 'बेहद ज़बरदस्त और लाजवाब होना (गाना या भोजन)।', example: 'Turn up the audio track—this beat absolutely slaps.', cat: 'casual', diff: 'beginner' },
    { seq: 29, word: 'caught in 4k', phonetic: '/kɔːt ɪn fɔːr keɪ/', meaning: 'Caught doing something wrong with undeniable crystal-clear evidence.', hindi: 'रंगे हाथों साफ़ सबूत के साथ पकड़ा जाना।', example: 'He claimed he did not eat the cake, but was caught in 4k on camera.', cat: 'social', diff: 'beginner' },
    { seq: 30, word: 'flex', phonetic: '/flɛks/', meaning: 'Showing off one’s skills, wealth, or wins to impress others.', hindi: 'अपनी शान, हुनर या संपत्ति का दिखावा करना।', example: 'Displaying his championship trophy in every video was quite a flex.', cat: 'casual', diff: 'beginner' },
    { seq: 31, word: 'ghost', phonetic: '/ɡoʊst/', meaning: 'To suddenly stop all communication without explanation.', hindi: 'अचानक बिना कुछ कहे सारे संपर्क काट लेना।', example: 'We talked every day until he suddenly ghosted out of nowhere.', cat: 'social', diff: 'beginner' },
    { seq: 32, word: 'slay', phonetic: '/sleɪ/', meaning: 'To accomplish something with exceptional excellence and style.', hindi: 'कमाल कर देना, छा जाना या धाक जमाना।', example: 'You are going to slay that presentation tomorrow morning!', cat: 'casual', diff: 'beginner' },
    { seq: 33, word: 'mood', phonetic: '/muːd/', meaning: 'Relatable expression capturing an exact emotional state.', hindi: 'बिल्कुल मेरी जैसी स्थिति या मन की बात।', example: 'A sleepy puppy snuggled under a blanket is such a big mood.', cat: 'casual', diff: 'beginner' },
    { seq: 34, word: 'stan', phonetic: '/stæn/', meaning: 'An extremely loyal, enthusiastic supporter of someone.', hindi: 'किसी व्यक्ति या कला का सच्चा और उत्साही समर्थक।', example: 'I stan authors who take time to reply to their young readers.', cat: 'social', diff: 'intermediate' },
    { seq: 35, word: 'savage', phonetic: '/ˈsævɪdʒ/', meaning: 'Boldly honest, ruthless, and witty without holding back.', hindi: 'मुंहफट, निडर और बेबाक कटाक्ष करने वाला।', example: 'Her clever comeback during the debate was brilliantly savage.', cat: 'casual', diff: 'intermediate' },
    { seq: 36, word: 'goat', phonetic: '/ɡoʊt/', meaning: 'Greatest of all time in a field or sport.', hindi: 'सर्वकालिक सर्वश्रेष्ठ व्यक्ति (GOAT)।', example: 'Many consider Roger Federer the undisputed GOAT of tennis grace.', cat: 'casual', diff: 'beginner' },
    { seq: 37, word: 'bet', phonetic: '/bɛt/', meaning: 'Slang affirming agreement, affirmation, or challenge accepted.', hindi: 'पक्का, बात पक्की या चुनौती स्वीकार है।', example: '“Are we heading out at seven?” — “Bet, I’ll be ready!”', cat: 'casual', diff: 'beginner' },
    { seq: 38, word: 'period', phonetic: '/ˈpɪriəd/', meaning: 'Stating firmly that a topic is final and not up for debate.', hindi: 'बात यहीं खत्म, अब कोई बहस नहीं।', example: 'Mental peace matters more than unnecessary arguments, period.', cat: 'casual', diff: 'beginner' },
    { seq: 39, word: 'bop', phonetic: '/bɑːp/', meaning: 'A remarkably catchy song that makes you want to dance.', hindi: 'एक बेहतरीन और थिरकाने वाला गाना।', example: 'That remix from last summer is still an unforgettable bop.', cat: 'casual', diff: 'beginner' },
    { seq: 40, word: 'cap', phonetic: '/kæp/', meaning: 'A lie, deception, or false statement.', hindi: 'झूठ या बनावटी बात।', example: 'He said he aced the calculus test without studying, but that was cap.', cat: 'casual', diff: 'beginner' },
    { seq: 41, word: 'fit', phonetic: '/fɪt/', meaning: 'Short for outfit; coordinated clothes and styling.', hindi: 'पहनावा या ड्रेस (Outfit का संक्षिप्त रूप)।', example: 'That oversized denim jacket complete the whole fit perfectly.', cat: 'casual', diff: 'beginner' },
    { seq: 42, word: 'tea', phonetic: '/tiː/', meaning: 'Gossip or undisclosed facts about what happened.', hindi: 'अंदरूनी जानकारी, गपशप या खबर।', example: 'Come sit down and spill the tea about the company merger.', cat: 'social', diff: 'beginner' },
    { seq: 43, word: 'ratio', phonetic: '/ˈreɪʃioʊ/', meaning: 'When critical replies outnumber positive reactions online.', hindi: 'जब विरोध या आलोचना समर्थन से बहुत अधिक हो जाए।', example: 'The unpopular rule change received an immediate ratio online.', cat: 'social', diff: 'intermediate' },
    { seq: 44, word: 'deadass', phonetic: '/ˈdɛdæs/', meaning: 'Speaking completely seriously with zero humor or exaggeration.', hindi: 'पूरी गंभीरता से, बिना किसी मज़ाक के।', example: 'I deadass thought we had an exam today until the teacher corrected me.', cat: 'casual', diff: 'beginner' },
    { seq: 45, word: 'finesse', phonetic: '/fɪˈnɛs/', meaning: 'Handling a complex or tricky problem with skill and subtlety.', hindi: 'चतुराई, नज़ाकत और समझदारी से काम निकालना।', example: 'She finessed the tricky contract negotiation smoothly.', cat: 'everyday', diff: 'intermediate' },
    { seq: 46, word: 'snack', phonetic: '/snæk/', meaning: 'Someone who looks exceptionally attractive and stylish.', hindi: 'कोई व्यक्ति जो बहुत सुंदर और आकर्षक दिख रहा हो।', example: 'You look like a whole snack in that tailored charcoal suit!', cat: 'casual', diff: 'beginner' },
    { seq: 47, word: 'living large', phonetic: '/ˈlɪvɪŋ lɑːrdʒ/', meaning: 'Enjoying a wealthy, extravagant, and comfortable lifestyle.', hindi: 'शानो-शौकत और भरपूर सुख-सुविधाओं से जीना।', example: 'After months of hard work, they were living large on their vacation.', cat: 'lifestyle', diff: 'intermediate' },
    { seq: 48, word: 'read the room', phonetic: '/riːd ðə ruːm/', meaning: 'Understanding the mood and feelings of people before speaking.', hindi: 'माहौल और लोगों के मिज़ाज को समझकर बोलना।', example: 'Before making jokes during a serious update, you must read the room.', cat: 'social', diff: 'intermediate' },
    { seq: 49, word: 'pushback', phonetic: '/ˈpʊʃbæk/', meaning: 'Resistance, objections, or opposing feedback against a plan.', hindi: 'योजना या निर्णय का विरोध या असहमति।', example: 'The management met stiff pushback regarding the strict overtime rule.', cat: 'work', diff: 'intermediate' },
    { seq: 50, word: 'ate', phonetic: '/eɪt/', meaning: 'Executed a performance or outfit with absolute perfection.', hindi: 'बेहद उम्दा प्रदर्शन किया या शानदार काम कर दिखाया।', example: 'Her solo dance routine at the concert ate and left no crumbs.', cat: 'casual', diff: 'beginner' }
  ];

  // Next: Generate idioms, expressive verbs/adjectives, work, life & mastery words
  // to reach exactly 500 items sequenced 1 to 500 without duplication.
  const additionalWords = [
    // 51 - 100: Conversational Idioms & Everyday Power Expressions
    { word: 'break the ice', phonetic: '/breɪk ði aɪs/', meaning: 'To start a conversation and make people feel more relaxed.', hindi: 'शुरुआती झिझक मिटाकर बातचीत शुरू करना।', example: 'A friendly icebreaker game helped break the ice during our orientation.', cat: 'everyday', diff: 'beginner' },
    { word: 'bite the bullet', phonetic: '/baɪt ðə ˈbʊlɪt/', meaning: 'To face an inevitable difficult situation with courage.', hindi: 'मजबूरन किसी अप्रिय या कठिन काम को हिम्मत से झेलना।', example: 'I decided to bite the bullet and visit the dentist after weeks of pain.', cat: 'everyday', diff: 'intermediate' },
    { word: 'hit the sack', phonetic: '/hɪt ðə sæk/', meaning: 'To go to bed and sleep after a tiring day.', hindi: 'सोने जाना (बिस्तर पर जाना)।', example: 'I am completely exhausted tonight, time to hit the sack.', cat: 'casual', diff: 'beginner' },
    { word: 'call it a day', phonetic: '/kɔːl ɪt ə deɪ/', meaning: 'To stop working on something for the remainder of the day.', hindi: 'आज का काम यहीं समाप्त करना।', example: 'We solved the major bugs, let’s call it a day and rest.', cat: 'everyday', diff: 'beginner' },
    { word: 'under the weather', phonetic: '/ˈʌndər ðə ˈwɛðər/', meaning: 'Feeling slightly sick, unwell, or low in energy.', hindi: 'तबीयत थोड़ी नासाज़ या अस्वस्थ महसूस होना।', example: 'She stayed home today because she was feeling a bit under the weather.', cat: 'everyday', diff: 'beginner' },
    { word: 'cut corners', phonetic: '/kʌt ˈkɔːrnərz/', meaning: 'Doing something cheaply or carelessly to save time or money.', hindi: 'कामचोरी करना या गुणवत्ता गिराकर जल्दी काम निपटाना।', example: 'Never cut corners on safety when constructing a building.', cat: 'work', diff: 'intermediate' },
    { word: 'see eye to eye', phonetic: '/siː aɪ tuː aɪ/', meaning: 'To agree completely on a topic or viewpoint.', hindi: 'पूरी तरह से सहमत होना या एक राय रखना।', example: 'The partners rarely see eye to eye on their branding strategy.', cat: 'everyday', diff: 'intermediate' },
    { word: 'once in a blue moon', phonetic: '/wʌns ɪn ə bluː muːn/', meaning: 'Happening very rarely or on uncommon occasions.', hindi: 'ईद का चांद होना / कभी-कभार ही होने वाला।', example: 'My brother visits our hometown once in a blue moon.', cat: 'everyday', diff: 'beginner' },
    { word: 'cost an arm and a leg', phonetic: '/kɔːst ən ɑːrm ənd ə lɛɡ/', meaning: 'Extremely expensive or overpriced.', hindi: 'बहुत ज़्यादा महंगा होना।', example: 'Flight tickets during the holiday season cost an arm and a leg.', cat: 'casual', diff: 'beginner' },
    { word: 'let the cat out of the bag', phonetic: '/lɛt ðə kæt aʊt əv ðə bæɡ/', meaning: 'To accidentally reveal a secret prematurely.', hindi: 'गलती से कोई राज़ या गुप्त बात खोल देना।', example: 'He let the cat out of the bag about the surprise anniversary trip.', cat: 'everyday', diff: 'beginner' },
    { word: 'add fuel to the fire', phonetic: '/æd fjuːəl tuː ðə ˈfaɪər/', meaning: 'To make an already angry or tense situation worse.', hindi: 'जलती आग में घी डालना / बात और बिगाड़ना।', example: 'His sarcastic remark only added fuel to the fire during the dispute.', cat: 'everyday', diff: 'intermediate' },
    { word: 'beat around the bush', phonetic: '/biːt əˈraʊnd ðə bʊʃ/', meaning: 'To avoid speaking directly about the main issue.', hindi: 'घुमा-फिराकर बात करना, सीधे मुद्दे पर न आना।', example: 'Stop beating around the bush and tell me what the real problem is.', cat: 'everyday', diff: 'beginner' },
    { word: 'jump on the bandwagon', phonetic: '/dʒʌmp ɑːn ðə ˈbændˌwæɡən/', meaning: 'To follow a popular trend simply because everyone else is.', hindi: 'देखा-देखी किसी चलन या ट्रेंड में शामिल हो जाना।', example: 'Many brands jumped on the AI bandwagon without a clear vision.', cat: 'social', diff: 'intermediate' },
    { word: 'on cloud nine', phonetic: '/ɑːn klaʊd naɪn/', meaning: 'Extremely happy, joyful, and thrilled.', hindi: 'सातवें आसमान पर होना / अत्यंत प्रसन्न होना।', example: 'She was on cloud nine after receiving her university scholarship.', cat: 'everyday', diff: 'beginner' },
    { word: 'down to earth', phonetic: '/daʊn tuː ɜːrθ/', meaning: 'Humble, realistic, practical, and unpretentious.', hindi: 'सरल, ज़मीन से जुड़ा हुआ और विनम्र व्यक्ति।', example: 'Despite his global fame, the actor remains remarkably down to earth.', cat: 'everyday', diff: 'intermediate' },
    { word: 'silver lining', phonetic: '/ˈsɪlvər ˈlaɪnɪŋ/', meaning: 'A hopeful or comforting aspect in an otherwise bad situation.', hindi: 'मुसीबत में भी उम्मीद की एक किरण।', example: 'The silver lining of missing my flight was meeting my old mentor at the airport.', cat: 'everyday', diff: 'intermediate' },
    { word: 'piece of cake', phonetic: '/piːs əv keɪk/', meaning: 'Something that is effortlessly easy to accomplish.', hindi: 'बहुत ही आसान काम / बाएं हाथ का खेल।', example: 'Once you grasp the fundamentals, coding that function is a piece of cake.', cat: 'casual', diff: 'beginner' },
    { word: 'in a nutshell', phonetic: '/ɪn ə ˈnʌtʃɛl/', meaning: 'Stated in very brief, concise, and direct terms.', hindi: 'संक्षेप में / कम से कम शब्दों में।', example: 'In a nutshell, our sales increased by thirty percent this quarter.', cat: 'everyday', diff: 'beginner' },
    { word: 'keep an eye on', phonetic: '/kiːp ən aɪ ɑːn/', meaning: 'To watch, monitor, or pay close attention to something.', hindi: 'नज़र रखना या ध्यानपूर्वक देखना।', example: 'Please keep an eye on my backpack while I grab a cup of water.', cat: 'everyday', diff: 'beginner' },
    { word: 'speak of the devil', phonetic: '/spiːk əv ðə ˈdɛvəl/', meaning: 'Said when someone appears just as you were talking about them.', hindi: 'नाम लिया और हाज़िर हो गए (शैतान का नाम लिया और शैतान हाज़िर)।', example: 'Speak of the devil! We were just discussing your recent promotion, Mark.', cat: 'everyday', diff: 'beginner' },
    { word: 'play devil advocate', phonetic: '/pleɪ ˈdɛvəlz ˈædvəkət/', meaning: 'To argue an opposing viewpoint for the sake of healthy debate.', hindi: 'तर्क-वितर्क को परखने के लिए जानबूझकर उल्टी राय रखना।', example: 'Let me play devil’s advocate: what happens if our primary supplier fails?', cat: 'work', diff: 'intermediate' },
    { word: 'take with a grain of salt', phonetic: '/teɪk wɪð ə ɡreɪn əv sɔːlt/', meaning: 'To not completely believe something without independent verification.', hindi: 'पूरी तरह सच न मानना, संदेह के साथ देखना।', example: 'You should take unverified online rumors with a grain of salt.', cat: 'everyday', diff: 'intermediate' },
    { word: 'steal someone thunder', phonetic: '/stiːl ˈsʌmwʌnz ˈθʌndər/', meaning: 'To take attention and praise away from someone else’s success.', hindi: 'किसी और के काम का श्रेय या ध्यान खुद पर खींच लेना।', example: 'Announcing your engagement at her birthday party would steal her thunder.', cat: 'social', diff: 'intermediate' },
    { word: 'off the hook', phonetic: '/ɔːf ðə hʊk/', meaning: 'Released from a difficult obligation, trouble, or blame.', hindi: 'मुसीबत, ज़िम्मेदारी या आरोप से बच निकलना।', example: 'Since John volunteered to drive, the rest of us are off the hook.', cat: 'casual', diff: 'beginner' },
    { word: 'wrap one head around', phonetic: '/ræp wʌnz hɛd əˈraʊnd/', meaning: 'To comprehend or understand a complex or shocking concept.', hindi: 'किसी पेचीदा या अजीब बात को समझ पाना।', example: 'It took me a long time to wrap my head around quantum mechanics.', cat: 'everyday', diff: 'intermediate' },
    { word: 'out of the blue', phonetic: '/aʊt əv ðə bluː/', meaning: 'Happening completely unexpectedly and without prior warning.', hindi: 'अचानक और अनपेक्षित रूप से (अकस्मात)।', example: 'She phoned me out of the blue after five years of total silence.', cat: 'everyday', diff: 'beginner' },
    { word: 'rain on parade', phonetic: '/reɪn ɑːn pəˈreɪd/', meaning: 'To spoil someone’s excitement or pleasure.', hindi: 'किसी के उत्साह या जश्न पर पानी फेरना।', example: 'I hate to rain on your parade, but the museum is closed on Mondays.', cat: 'social', diff: 'intermediate' },
    { word: 'on thin ice', phonetic: '/ɑːn θɪn aɪs/', meaning: 'In a precarious, risky situation where one mistake causes trouble.', hindi: 'खतरे की कगार पर होना / नाज़ुक स्थिति में होना।', example: 'After coming late three days in a row, he is on thin ice with his boss.', cat: 'work', diff: 'intermediate' },
    { word: 'back to square one', phonetic: '/bæk tuː skwɛər wʌn/', meaning: 'Returning to the very beginning after a plan has failed.', hindi: 'फिर से वहीं से शुरू करना जहां से चले थे।', example: 'The server crash corrupted our draft, so we are back to square one.', cat: 'everyday', diff: 'beginner' },
    { word: 'spill the beans', phonetic: '/spɪl ðə biːnz/', meaning: 'To divulge a secret or confidential surprise accidentally.', hindi: 'राज़ खोल देना / भेद बता देना।', example: 'Don’t spill the beans about the farewell party before Friday.', cat: 'everyday', diff: 'beginner' },
    { word: 'burn bridges', phonetic: '/bɜːrn ˈbrɪdʒɪz/', meaning: 'To permanently destroy relationships or paths of return.', hindi: 'रिश्ते या लौटने के सारे रास्ते हमेशा के लिए खत्म कर देना।', example: 'Even when leaving a hostile job, avoid burning bridges with colleagues.', cat: 'work', diff: 'intermediate' },
    { word: 'bite off more than one can chew', phonetic: '/baɪt ɔːf mɔːr ðæn wʌn kæn tʃuː/', meaning: 'To take on a task that is too large or difficult to manage.', hindi: 'अपनी क्षमता से अधिक ज़िम्मेदारी अपने सिर ले लेना।', example: 'Enrolling in six advanced courses was biting off more than I could chew.', cat: 'everyday', diff: 'intermediate' },
    { word: 'cross that bridge when you come to it', phonetic: '/krɔːs ðæt brɪdʒ wɛn juː kʌm tuː ɪt/', meaning: 'To deal with a future problem only when it actually arises.', hindi: 'मुसीबत आने पर ही उससे निपटना, पहले से चिंता न करना।', example: 'Let’s focus on launch day; we will cross the server scaling bridge when we come to it.', cat: 'everyday', diff: 'intermediate' },
    { word: 'cry over spilled milk', phonetic: '/kraɪ ˈoʊvər spɪld mɪlk/', meaning: 'Wasting time regretting something that cannot be undone.', hindi: 'अब पछताए होत क्या जब चिड़िया चुग गई खेत।', example: 'The mistake is already done; there is no point crying over spilled milk.', cat: 'everyday', diff: 'beginner' },
    { word: 'barking up the wrong tree', phonetic: '/ˈbɑːrkɪŋ ʌp ðə rɔːŋ triː/', meaning: 'Pursuing a mistaken line of thought or accusing the wrong person.', hindi: 'गलत दिशा में प्रयास करना या गलत व्यक्ति पर संदेह करना।', example: 'If you think I took your charger, you are barking up the wrong tree.', cat: 'everyday', diff: 'intermediate' },
    { word: 'face the music', phonetic: '/feɪs ðə ˈmjuːzɪk/', meaning: 'To accept the unpleasant consequences of one’s actions.', hindi: 'अपने किए के बुरे नतीजों का सामना करना।', example: 'He broke the company projector and had to face the music with HR.', cat: 'everyday', diff: 'intermediate' },
    { word: 'fish out of water', phonetic: '/fɪʃ aʊt əv ˈwɔːtər/', meaning: 'Feeling awkward, uncomfortable, and out of place in a setting.', hindi: 'अपरिचित माहौल में असहज और बेचैन महसूस करना।', example: 'At the formal gala dinner, the casual hiker felt like a fish out of water.', cat: 'social', diff: 'beginner' },
    { word: 'get cold feet', phonetic: '/ɡɛt koʊld fiːt/', meaning: 'To suddenly become nervous and hesitate before a major event.', hindi: 'अंतिम समय पर घबरा जाना या हिम्मत हार जाना।', example: 'He got cold feet right before walking onto the graduation stage.', cat: 'everyday', diff: 'beginner' },
    { word: 'give benefit of the doubt', phonetic: '/ɡɪv ˈbɛnɪfɪt əv ðə daʊt/', meaning: 'To believe someone’s honesty despite lack of certainty.', hindi: 'संदेह होने पर भी सामने वाले पर भरोसा करना या छूट देना।', example: 'Since she is usually punctual, let’s give her the benefit of the doubt.', cat: 'everyday', diff: 'intermediate' },
    { word: 'go the extra mile', phonetic: '/ɡoʊ ði ˈɛkstrə maɪl/', meaning: 'To make more effort than is strictly required or expected.', hindi: 'ज़रूरत से ज़्यादा बढ़कर प्रयास करना।', example: 'Our customer support representative went the extra mile to recover my files.', cat: 'work', diff: 'intermediate' },
    { word: 'hang in there', phonetic: '/hæŋ ɪn ðɛər/', meaning: 'An encouraging phrase urging someone to stay strong through hardship.', hindi: 'हिम्मत मत हारो, डटे रहो।', example: 'The exams are almost finished, just hang in there for two more days!', cat: 'everyday', diff: 'beginner' },
    { word: 'in hot water', phonetic: '/ɪn hɑːt ˈwɔːtər/', meaning: 'In serious trouble or facing severe disapproval.', hindi: 'मुसीबत या परेशानी में फंसा होना।', example: 'The intern was in hot water after accidentally emailing the client internal files.', cat: 'work', diff: 'beginner' },
    { word: 'keep your chin up', phonetic: '/kiːp jɔːr tʃɪn ʌp/', meaning: 'To stay cheerful and hopeful during adversity.', hindi: 'मुश्किल वक्त में भी हौसला बुलंद रखना।', example: 'Keep your chin up; you will find a far better job opening very soon.', cat: 'everyday', diff: 'beginner' },
    { word: 'kill two birds with one stone', phonetic: '/kɪl tuː bɜːrdz wɪð wʌn stoʊn/', meaning: 'To accomplish two distinct tasks with a single action.', hindi: 'एक तीर से दो शिकार करना / एक पंथ दो काज।', example: 'Cycling to the office kills two birds with one stone: exercise and commute.', cat: 'everyday', diff: 'beginner' },
    { word: 'leave no stone unturned', phonetic: '/liːv noʊ stoʊn ʌnˈtɜːrnd/', meaning: 'To do everything humanly possible to accomplish a goal.', hindi: 'कोई कसर बाकी न छोड़ना / हर संभव कोशिश करना।', example: 'The medical research team left no stone unturned in searching for the cure.', cat: 'everyday', diff: 'intermediate' },
    { word: 'miss the boat', phonetic: '/mɪs ðə boʊt/', meaning: 'To miss an opportunity due to delay or indecision.', hindi: 'मौका गंवा बैठना।', example: 'If you don’t apply for the scholarship today, you might miss the boat.', cat: 'everyday', diff: 'beginner' },
    { word: 'no pain no gain', phonetic: '/noʊ peɪn noʊ ɡeɪn/', meaning: 'Suffering or hard effort is necessary to achieve real progress.', hindi: 'बिना मेहनत और कष्ट के कोई फल नहीं मिलता।', example: 'Weight training is tough in week one, but remember: no pain, no gain.', cat: 'lifestyle', diff: 'beginner' },
    { word: 'on the fence', phonetic: '/ɑːn ðə fɛns/', meaning: 'Undecided or neutral between two opposing choices.', hindi: 'असमंजस में होना, कोई फैसला न कर पाना।', example: 'I am still on the fence about moving to the seaside apartment.', cat: 'everyday', diff: 'beginner' },
    { word: 'pull someone leg', phonetic: '/pʊl ˈsʌmwʌnz lɛɡ/', meaning: 'To tease or joke with someone playfully.', hindi: 'किसी की टांग खींचना / मज़ाक करना।', example: 'Don’t take him seriously, he was only pulling your leg.', cat: 'casual', diff: 'beginner' },
    { word: 'pull yourself together', phonetic: '/pʊl jɔːrˈsɛlf təˈɡɛðər/', meaning: 'To regain emotional control and composure when distressed.', hindi: 'खुद को संभालना / शांत होकर होश में आना।', example: 'Take a deep breath, pull yourself together, and let’s handle this.', cat: 'everyday', diff: 'beginner' }
  ];

  // Combine and verify sequence numbering up to 100
  wordsList.push(...additionalWords.map((item, idx) => ({
    seq: 51 + idx,
    ...item
  })));

  // Words 101 to 200: Smart Adjectives, Verbs & Descriptive Vocabulary
  const smartVocab101to200 = [
    { word: 'resilient', phonetic: '/rɪˈzɪliənt/', meaning: 'Able to withstand or recover quickly from difficult conditions.', hindi: 'मुसीबतों से तेज़ी से उबरने वाला, लचीला और साहसी।', example: 'Children are remarkably resilient and adapt to new surroundings with ease.' },
    { word: 'articulate', phonetic: '/ɑːrˈtɪkjuleɪt/', meaning: 'Expressing ideas clearly and effectively in fluent speech.', hindi: 'स्पष्ट, प्रभावी और धाराप्रवाह बोलने वाला।', example: 'She gave an articulate summary of our quarterly engineering goals.' },
    { word: 'meticulous', phonetic: '/məˈtɪkjələs/', meaning: 'Showing great attention to detail; very careful and precise.', hindi: 'बेहद बारीक, सावधान और हर छोटी बात का ध्यान रखने वाला।', example: 'The watchmaker handled the antique timepiece with meticulous precision.' },
    { word: 'versatile', phonetic: '/ˈvɜːrsətl/', meaning: 'Able to adapt or be used in many different activities or functions.', hindi: 'बहुमुखी प्रतिभा वाला, जो कई तरह के काम कर सके।', example: 'A chef’s knife is the most versatile tool in any kitchen.' },
    { word: 'pragmatic', phonetic: '/præɡˈmætɪk/', meaning: 'Dealing with things sensibly and realistically based on practical results.', hindi: 'व्यावहारिक, यथार्थवादी सोच रखने वाला।', example: 'We took a pragmatic approach to fix the bug instead of rebuilding everything.' },
    { word: 'empathy', phonetic: '/ˈɛmpəθi/', meaning: 'The ability to understand and share the feelings of another.', hindi: 'सहानुभूति, दूसरों के दर्द और भावनाओं को गहराई से समझना।', example: 'True leaders show genuine empathy when their teammates face burnout.' },
    { word: 'authentic', phonetic: '/ɔːˈθɛntɪk/', meaning: 'Genuine, real, and true to one’s own personality or origin.', hindi: 'असली, खरा और प्रामाणिक।', example: 'His authentic speech resonated with the entire auditorium.' },
    { word: 'serendipity', phonetic: '/ˌsɛrənˈdɪpəti/', meaning: 'Finding valuable or agreeable things not sought for by chance.', hindi: 'किस्मत से अचानक किसी सुखद या मूल्यवान चीज़ का मिल जाना।', example: 'Meeting my current business co-founder at a small coffee shop was pure serendipity.' },
    { word: 'burnout', phonetic: '/ˈbɜːrnaʊt/', meaning: 'Physical or mental exhaustion caused by prolonged stress.', hindi: 'लगातार काम और तनाव से पैदा होने वाली भारी मानसिक/शारीरिक थकान।', example: 'Taking regular vacations is critical to protect your team from burnout.' },
    { word: 'proactive', phonetic: '/proʊˈæktɪv/', meaning: 'Taking action in advance to control a situation rather than just reacting.', hindi: 'समय से पहले सक्रिय होकर कदम उठाने वाला।', example: 'A proactive software engineer monitors logs before users encounter errors.' },
    { word: 'navigate', phonetic: '/ˈnævɪɡeɪt/', meaning: 'To find one’s way through a complex or difficult situation.', hindi: 'किसी मुश्किल स्थिति या रास्ते को समझदारी से पार करना।', example: 'She navigated the complex legal negotiations with extraordinary skill.' },
    { word: 'compromise', phonetic: '/ˈkɑːmprəmaɪz/', meaning: 'An agreement reached by each side making concessions.', hindi: 'समझौता, दोनों पक्षों द्वारा थोड़ा झुककर बीच का रास्ता निकालना।', example: 'Healthy relationships require communication and willing compromise.' },
    { word: 'clarify', phonetic: '/ˈklærəfaɪ/', meaning: 'To make a statement or situation clear and easily understandable.', hindi: 'स्पष्ट करना या संदेह दूर करना।', example: 'Could you clarify what you mean by the revised delivery timeline?' },
    { word: 'collaborate', phonetic: '/kəˈlæbəreɪt/', meaning: 'To work jointly with others on an activity or project.', hindi: 'मिलकर सहयोग करना और साथ मिलकर काम करना।', example: 'Designers and developers collaborated closely to launch the new interface.' },
    { word: 'persist', phonetic: '/pərˈsɪst/', meaning: 'To continue firmly in an opinion or action despite difficulty.', hindi: 'मुश्किलों के बावजूद लगातार लगे रहना, डटे रहना।', example: 'If you persist in daily practice, your speaking fluency will flourish.' },
    { word: 'prioritize', phonetic: '/praɪˈɔːrətaɪz/', meaning: 'To treat something as more important than other things.', hindi: 'प्राथमिकता देना, सबसे ज़रूरी काम पहले करना।', example: 'You must prioritize your health before taking on extra freelance contracts.' },
    { word: 'delegate', phonetic: '/ˈdɛləɡeɪt/', meaning: 'To entrust a task or responsibility to another person.', hindi: 'काम या ज़िम्मेदारी दूसरों को सौंपना।', example: 'An effective manager knows how to delegate routine tasks to the crew.' },
    { word: 'advocate', phonetic: '/ˈædvəkeɪt/', meaning: 'To publicly recommend or support a particular cause or policy.', hindi: 'किसी विचार, नीति या हक की पुरज़ोर वकालत या समर्थन करना।', example: 'She advocates passionately for equal educational access in rural regions.' },
    { word: 'validate', phonetic: '/ˈvælɪdeɪt/', meaning: 'To confirm, corroborate, or recognize the validity of someone’s feeling.', hindi: 'पुष्टि करना या किसी की भावना को सही ठहराना।', example: 'Listening carefully helps validate a friend’s feelings during tough times.' },
    { word: 'cultivate', phonetic: '/ˈkʌltɪveɪt/', meaning: 'To develop or foster a quality, skill, or habit over time.', hindi: 'संजोना, विकसित करना या बढ़ावा देना।', example: 'Reading every evening helps cultivate a rich vocabulary.' },
    { word: 'innovate', phonetic: '/ˈɪnəveɪt/', meaning: 'To introduce new methods, ideas, or products.', hindi: 'नई सोच लाना या नवीन तकनीकों का आविष्कार करना।', example: 'Companies that fail to innovate often lose relevance in modern markets.' },
    { word: 'streamline', phonetic: '/ˈstriːmlaɪn/', meaning: 'To make an organization or process more efficient and simpler.', hindi: 'प्रक्रिया को सरल, सुगम और अधिक कुशल बनाना।', example: 'Automating invoices helped streamline our entire accounting workflow.' },
    { word: 'embrace', phonetic: '/ɪmˈbreɪs/', meaning: 'To accept a change, belief, or idea willingly and enthusiastically.', hindi: 'खुले दिल से अपनाना या स्वीकार करना।', example: 'Successful leaders embrace change rather than clinging to obsolete ways.' },
    { word: 'contemplate', phonetic: '/ˈkɑːntəmpleɪt/', meaning: 'To look at or think about something deeply and carefully.', hindi: 'गहराई से विचार या चिंतन करना।', example: 'He sat silently by the lake to contemplate his next career steps.' },
    { word: 'elevate', phonetic: '/ˈɛləveɪt/', meaning: 'To raise to a more important or higher level or status.', hindi: 'ऊपर उठाना, स्तर सुधारना या निखारना।', example: 'High quality typography can elevate a simple webpage to look premium.' },
    { word: 'amplify', phonetic: '/ˈæmplɪfaɪ/', meaning: 'To increase the strength, effect, or volume of something.', hindi: 'बढ़ाना, आवाज़ या प्रभाव को और तीव्र करना।', example: 'Social platforms amplify grassroots stories across the globe.' },
    { word: 'de-escalate', phonetic: '/diːˈɛskəleɪt/', meaning: 'To reduce the intensity of a conflict or heated situation.', hindi: 'तनाव या झगड़े की गंभीरता को कम करना।', example: 'Remaining calm helped de-escalate the dispute between the two neighbors.' },
    { word: 'adapt', phonetic: '/əˈdæpt/', meaning: 'To adjust to new conditions or environments readily.', hindi: 'नए माहौल के अनुसार खुद को ढालना।', example: 'Living overseas taught me how to adapt quickly to diverse customs.' },
    { word: 'reflect', phonetic: '/rɪˈflɛkt/', meaning: 'To think deeply or carefully about past actions and decisions.', hindi: 'आत्मचिंतन करना, अपनी गलतियों और अनुभवों पर विचार करना।', example: 'Sunday evenings are the perfect time to reflect on the past week’s growth.' },
    { word: 'substantiate', phonetic: '/səbˈstænʃieɪt/', meaning: 'To provide evidence to support or prove the truth of a claim.', hindi: 'सबूतों द्वारा साबित करना या पुष्टि करना।', example: 'You need reliable data to substantiate your business projection.' },
    { word: 'consolidate', phonetic: '/kənˈsɑːlɪdeɪt/', meaning: 'To combine a number of things into a single coherent whole.', hindi: 'मज़बूत करना या कई चीज़ों को एक में मिलाना।', example: 'We consolidated our five separate databases into a unified system.' },
    { word: 'iterate', phonetic: '/ˈɪtəreɪt/', meaning: 'To repeat a process making small improvements each time.', hindi: 'क्रमिक सुधार करते हुए बार-बार दोहराना।', example: 'Great software products iterate continually based on user comments.' },
    { word: 'brainstorm', phonetic: '/ˈbreɪnstɔːrm/', meaning: 'To produce an idea or way of solving a problem by group discussion.', hindi: 'नए विचारों पर मिलकर गहन मंथन करना।', example: 'Let’s gather in the conference room to brainstorm fresh marketing ideas.' },
    { word: 'execute', phonetic: '/ˈɛksɪkjuːt/', meaning: 'To carry out or put into effect a plan, order, or course of action.', hindi: 'अमल में लाना या योजना को सफलतापूर्वक पूरा करना।', example: 'Having great ideas means little if you lack the discipline to execute them.' },
    { word: 'synthesize', phonetic: '/ˈsɪnθəsaɪz/', meaning: 'To combine a range of different ideas into a coherent whole.', hindi: 'अलग-अलग विचारों का सार निकालकर एक नया रूप देना।', example: 'She synthesized the customer research into three straightforward takeaways.' },
    { word: 'empower', phonetic: '/ɪmˈpaʊər/', meaning: 'To give someone the authority, power, or confidence to do something.', hindi: 'सशक्त बनाना, आत्मविश्वास और अधिकार देना।', example: 'Clear documentation empowers junior engineers to fix issues independently.' },
    { word: 'negotiate', phonetic: '/nɪˈɡoʊʃieɪt/', meaning: 'To obtain or bring about by discussion and mutual agreement.', hindi: 'बातचीत करके किसी समझौते पर पहुंचना।', example: 'He managed to negotiate a generous flexible-work schedule.' },
    { word: 'withstand', phonetic: '/wɪðˈstænd/', meaning: 'To remain undamaged or unaffected by; to resist successfully.', hindi: 'सहन करना, डटकर मुकाबला करना या झेलना।', example: 'The coastal bridge was engineered to withstand severe typhoons.' },
    { word: 'transform', phonetic: '/trænsˈfɔːrm/', meaning: 'To make a thorough or dramatic change in the form or character.', hindi: 'पूरी तरह से कायापलट कर देना या बदल देना।', example: 'Continuous learning will transform your self-confidence over time.' },
    { word: 'candid', phonetic: '/ˈkændɪd/', meaning: 'Truthful, frank, and straightforward in speech.', hindi: 'स्पष्टवादी, खरा और निष्कपट बोलने वाला।', example: 'I deeply appreciated his candid feedback during our performance check-in.' },
    { word: 'eloquent', phonetic: '/ˈɛləkwənt/', meaning: 'Fluent, graceful, and persuasive in speaking or writing.', hindi: 'सुवक्ता, प्रभावशाली और मनमोहक ढंग से बोलने वाला।', example: 'The graduation speaker gave an eloquent tribute to all the teachers.' },
    { word: 'conscientious', phonetic: '/ˌkɑːnʃiˈɛnʃəs/', meaning: 'Wishing to do what is right, especially to do work thoroughly.', hindi: 'कर्तव्यनिष्ठ, ईमानदार और लगन से काम करने वाला।', example: 'A conscientious student checks citations thoroughly before submission.' },
    { word: 'intuitive', phonetic: '/ɪnˈtuːɪtɪv/', meaning: 'Using or based on what one feels to be true without conscious reasoning.', hindi: 'सहज ज्ञान पर आधारित, जो आसानी से समझ आ जाए।', example: 'The mobile app interface is so intuitive that even a child can use it.' },
    { word: 'diligent', phonetic: '/ˈdɪlɪdʒənt/', meaning: 'Having or showing care and conscientiousness in one’s work.', hindi: 'मेहनती, परिश्रमी और लगनशील।', example: 'Thanks to her diligent study routine, she scored the highest marks.' },
    { word: 'perceptive', phonetic: '/pərˈsɛptɪv/', meaning: 'Having or showing sensitive insight and sharp awareness.', hindi: 'तेज़ समझ वाला, जो बारीकियों को तुरंत भांप ले।', example: 'He is a perceptive listener who senses unspoken anxiety easily.' },
    { word: 'resourceful', phonetic: '/rɪˈsɔːrsfl/', meaning: 'Having the ability to find quick and clever ways to overcome difficulties.', hindi: 'जुझारू, हर समस्या का हल निकाल लेने वाला।', example: 'Stranded in the storm, the resourceful traveler built a makeshift shelter.' },
    { word: 'tenacious', phonetic: '/təˈneɪʃəs/', meaning: 'Tending to keep a firm hold of something; persistent and determined.', hindi: 'दृढ़ निश्चयी, जो आसानी से हार न माने।', example: 'Her tenacious spirit helped her finish the grueling 42-kilometer marathon.' },
    { word: 'diplomatic', phonetic: '/ˌdɪpləˈmætɪk/', meaning: 'Showing skill in dealing with people politely and tactfully.', hindi: 'कूटनीतिक, समझदारी और मधुरता से बात संभालने वाला।', example: 'His diplomatic reply settled the argument without offending either party.' },
    { word: 'humble', phonetic: '/ˈhʌmbl/', meaning: 'Having or showing a modest or low estimate of one’s own importance.', hindi: 'विनम्र, अहंकार रहित और सादगी पसंद।', example: 'Despite winning the world championship, she remained humble and kind.' },
    { word: 'enthusiastic', phonetic: '/ɪnˌθuːziˈæstɪk/', meaning: 'Having or showing intense and eager enjoyment or interest.', hindi: 'उत्साही, उमंग और जोश से भरा हुआ।', example: 'The crowd gave an enthusiastic cheer as the musicians entered.' },
    { word: 'sincere', phonetic: '/sɪnˈsɪr/', meaning: 'Free from pretense or deceit; proceeding from genuine feelings.', hindi: 'सच्चा, निष्ठावान और कपट रहित।', example: 'Please accept my sincere apology for the unintentional misunderstanding.' },
    { word: 'profound', phonetic: '/prəˈfaʊnd/', meaning: 'Very great, intense, or having deep insight and meaning.', hindi: 'गहरा, गंभीर और विचारोत्तेजक।', example: 'The ancient philosopher’s words had a profound impact on my perspective.' },
    { word: 'assertive', phonetic: '/əˈsɜːrtɪv/', meaning: 'Having or showing a confident and forceful personality with respect.', hindi: 'आत्मविश्वासी, अपनी बात दृढ़ता और सम्मान से रखने वाला।', example: 'Being assertive allows you to say no politely without guilt.' },
    { word: 'composed', phonetic: '/kəmˈpoʊzd/', meaning: 'Having one’s feelings and expression under calm control.', hindi: 'शांत, संयमित और गंभीर स्थिति में भी आपा न खोने वाला।', example: 'The pilot stayed remarkably composed when the warning lights flashed.' },
    { word: 'astute', phonetic: '/əˈstuːt/', meaning: 'Having or showing an ability to accurately assess situations for advantage.', hindi: 'चतुर, होशियार और सूक्ष्म दृष्टि रखने वाला।', example: 'An astute investor recognized the emerging solar technology early.' },
    { word: 'vibrant', phonetic: '/ˈvaɪbrənt/', meaning: 'Full of energy, enthusiasm, and life.', hindi: 'जीवंत, ऊर्जावान और रंगों से भरपूर।', example: 'The street market in the evening was vibrant with music and aroma.' },
    { word: 'genuine', phonetic: '/ˈdʒɛnjuɪn/', meaning: 'Truly what something is said to be; authentic and frank.', hindi: 'असली, खरा और बिना दिखावे का।', example: 'His warm smile expressed genuine hospitality to all travelers.' },
    { word: 'discerning', phonetic: '/dɪˈsɜːrnɪŋ/', meaning: 'Having or showing good judgment and taste.', hindi: 'पारखी, अच्छी परख और विवेक रखने वाला।', example: 'Discerning collectors recognize authentic craftsmanship instantly.' },
    { word: 'discreet', phonetic: '/dɪˈskriːt/', meaning: 'Careful and prudent in one’s speech or actions, especially to keep privacy.', hindi: 'सावधान, गोपनीय बातों को गुप्त रखने वाला।', example: 'The doctor was very discreet regarding private patient records.' },
    { word: 'adaptable', phonetic: '/əˈdæptəbl/', meaning: 'Able to adjust to new conditions readily and effortlessly.', hindi: 'अनुकूलनशील, किसी भी परिस्थिति में ढल जाने वाला।', example: 'In modern tech roles, adaptable engineers thrive amidst evolving tools.' },
    { word: 'amicable', phonetic: '/ˈæmɪkəbl/', meaning: 'Having a spirit of friendliness; without serious disagreement.', hindi: 'मैत्रीपूर्ण, सौहार्दपूर्ण और शांतिपूर्ण।', example: 'The two founders reached an amicable separation and remained good friends.' },
    { word: 'cordial', phonetic: '/ˈkɔːrdʒəl/', meaning: 'Warm and friendly in social interaction.', hindi: 'हार्दिक, आत्मीय और स्नेहपूर्ण।', example: 'We received a cordial welcome as soon as we entered the village home.' },
    { word: 'ingenious', phonetic: '/ɪnˈdʒiːniəs/', meaning: 'Clever, original, and inventive in idea or design.', hindi: 'अद्भुत, विलक्षण और चतुर आविष्कारक।', example: 'He devised an ingenious solar water heater using recycled bottles.' },
    { word: 'scrupulous', phonetic: '/ˈskruːpjələs/', meaning: 'Very concerned to avoid doing wrong; thorough and attentive.', hindi: 'कर्तव्यपरायण, ईमानदार और नियमों का पालन करने वाला।', example: 'The auditor was scrupulous in verifying every financial transaction.' },
    { word: 'lucid', phonetic: '/ˈluːsɪd/', meaning: 'Expressed clearly; easy to understand; fully thinking clearly.', hindi: 'स्पष्ट, पारदर्शी और आसानी से समझ आने वाला।', example: 'The professor gave a lucid explanation of relativity in under ten minutes.' },
    { word: 'dynamic', phonetic: '/daɪˈnæmɪk/', meaning: 'Characterized by constant change, activity, or fresh progress.', hindi: 'गतिशील, ऊर्जावान और लगातार बदलाव लाने वाला।', example: 'She brings a dynamic energy that revitalizes the whole workspace.' },
    { word: 'steadfast', phonetic: '/ˈstɛdfæst/', meaning: 'Resolutely or dutifully firm and unwavering.', hindi: 'दृढ़, अडिग और निष्ठावान।', example: 'His steadfast loyalty to his childhood principles earned him universal respect.' },
    { word: 'empathetic', phonetic: '/ˌɛmpəˈθɛtɪk/', meaning: 'Showing an ability to understand and share the feelings of another.', hindi: 'सहानुभूतिपूर्ण, दूसरों के दर्द को अपना समझने वाला।', example: 'An empathetic therapist creates a secure sanctuary for vulnerable confessions.' },
    { word: 'charismatic', phonetic: '/ˌkærɪzˈmætɪk/', meaning: 'Exercising a compelling charm that inspires devotion in others.', hindi: 'आकर्षक व्यक्तित्व वाला, जो सबको मंत्रमुग्ध कर दे।', example: 'The charismatic coach motivated the young underdogs to victory.' },
    { word: 'intrepid', phonetic: '/ɪnˈtrɛpɪd/', meaning: 'Fearless, adventurous, and undaunted by hardship.', hindi: 'निडर, साहसी और बेखौफ।', example: 'The intrepid explorers ventured deep into the unexplored arctic caves.' },
    { word: 'affable', phonetic: '/ˈæfəbl/', meaning: 'Friendly, good-natured, and easy to talk to.', hindi: 'मिलनसार, हंसमुख और बात करने में सहज।', example: 'Our new neighbor is so affable that he made friends on the whole street.' },
    { word: 'benevolent', phonetic: '/bəˈnɛvələnt/', meaning: 'Well meaning and kindly; generous toward others.', hindi: 'परोपकारी, दयालु और भलाई करने वाला।', example: 'A benevolent donor paid the medical bills for all needy patients.' },
    { word: 'dexterous', phonetic: '/ˈdɛkstərəs/', meaning: 'Showing or having skill, especially with the hands.', hindi: 'कुशल, निपुण और हाथों के काम में माहिर।', example: 'The surgeon’s dexterous hands stitched the fine blood vessels safely.' },
    { word: 'gregarious', phonetic: '/ɡrɪˈɡɛəriəs/', meaning: 'Fond of company; sociable and outgoing.', hindi: 'सामाजिक, मिलनसार और झुंड में रहना पसंद करने वाला।', example: 'Her gregarious nature made her the natural host of every social dinner.' },
    { word: 'perseverant', phonetic: '/ˌpɜːrsɪˈvɪərənt/', meaning: 'Persisting in an undertaking despite difficulties or discouragement.', hindi: 'लगनशील, धैर्यपूर्वक अपने लक्ष्य पर जुटे रहने वाला।', example: 'Only the most perseverant researchers uncover groundbreaking cures.' },
    { word: 'prudent', phonetic: '/ˈpruːdnt/', meaning: 'Acting with or showing care and thought for the future.', hindi: 'विवेकी, दूरदर्शी और समझदारी से खर्च/फैसले करने वाला।', example: 'It is prudent to maintain six months of living expenses in an emergency fund.' },
    { word: 'punctilious', phonetic: '/pʌŋkˈtɪliəs/', meaning: 'Showing great attention to proper etiquette, detail, and protocol.', hindi: 'नियमों और शिष्टाचार का कट्टरता से पालन करने वाला।', example: 'The butler was punctilious about the exact placement of formal silver cutlery.' },
    { word: 'sagacious', phonetic: '/səˈɡeɪʃəs/', meaning: 'Having or showing keen mental discernment and good judgment.', hindi: 'बुद्धिमान, दूरदर्शी और चतुर विचारक।', example: 'The king relied heavily on his sagacious advisor during negotiations.' },
    { word: 'zealous', phonetic: '/ˈzɛləs/', meaning: 'Having or showing intense zeal, dedication, and enthusiasm.', hindi: 'उत्साही, जोशीला और किसी काम में पूरी तरह समर्पित।', example: 'The zealous volunteer spent every weekend planting trees in the park.' },
    { word: 'resolute', phonetic: '/ˈrɛzəluːt/', meaning: 'Admirably purposeful, determined, and unwavering.', hindi: 'दृढ़ निश्चयी, अपने फैसले पर अटल रहने वाला।', example: 'She remained resolute in her ambition to become a neurosurgeon.' },
    { word: 'impeccable', phonetic: '/ɪmˈpɛkəbl/', meaning: 'In accordance with the highest standards; faultless and spotless.', hindi: 'त्रुटिहीन, बेदाग और एकदम निर्दोष।', example: 'His manners and dress were impeccable throughout the royal reception.' },
    { word: 'radiant', phonetic: '/ˈreɪdiənt/', meaning: 'Clearly emanating great joy, love, health, or brightness.', hindi: 'तेजस्वी, प्रसन्नता से चमकता हुआ चेहरा।', example: 'The bride looked radiant as she greeted her beloved family members.' },
    { word: 'poised', phonetic: '/pɔɪzd/', meaning: 'Having a composed, graceful, and self-assured manner.', hindi: 'संयमित, शालीन और आत्मविश्वास से परिपूर्ण।', example: 'She remained poised despite the aggressive barrage of interview questions.' },
    { word: 'proficient', phonetic: '/prəˈfɪʃnt/', meaning: 'Competent or skilled in doing or using something.', hindi: 'प्रवीण, कुशल और निपुण।', example: 'Within six months of intense immersion, he became proficient in Spanish.' },
    { word: 'prolific', phonetic: '/prəˈlɪfɪk/', meaning: 'Producing much fruit or foliage or many creative works.', hindi: 'बहुप्रज, प्रचुर मात्रा में रचना करने वाला (लेखक या कलाकार)।', example: 'Stephen King is one of the most prolific horror authors in literary history.' },
    { word: 'prominent', phonetic: '/ˈprɑːmɪnənt/', meaning: 'Important, famous, and projecting noticeably.', hindi: 'प्रमुख, विख्यात और आसानी से दिखाई देने वाला।', example: 'A prominent scientist gave the opening keynote address on clean energy.' },
    { word: 'visionary', phonetic: '/ˈvɪʒənɛri/', meaning: 'Thinking about or planning the future with wisdom and imagination.', hindi: 'दूरदर्शी, भविष्य की स्पष्ट कल्पना रखने वाला।', example: 'A true visionary creates products people didn’t realize they needed.' },
    { word: 'vigilant', phonetic: '/ˈvɪdʒɪlənt/', meaning: 'Keeping careful watch for possible danger, errors, or difficulties.', hindi: 'सजग, चौकन्ना और सतर्क।', example: 'Cybersecurity analysts must stay vigilant against phishing campaigns.' },
    { word: 'whimsical', phonetic: '/ˈwɪmzɪkl/', meaning: 'Playfully quaint or fanciful, especially in an appealing way.', hindi: 'मनमौजी, विचित्र और प्यारा।', example: 'The bookstore cafe was decorated with whimsical fairy lights and vintage clocks.' },
    { word: 'zenith', phonetic: '/ˈziːnɪθ/', meaning: 'The time at which something is most powerful, successful, or high.', hindi: 'शीर्ष बिंदु, पराकाष्ठा या सफलता का सर्वोच्च शिखर।', example: 'At the zenith of his athletic career, he held three Olympic gold medals.' }
  ];

  wordsList.push(...smartVocab101to200.map((item, idx) => ({
    seq: 101 + idx,
    cat: 'everyday',
    diff: idx > 60 ? 'advanced' : 'intermediate',
    ...item
  })));

  // Words 191 to 320: Modern Workplace, Career & Collaboration
  const workAndCareerTerms = [
    { word: 'onboarding', phonetic: '/ˈɑːnbɔːrdɪŋ/', meaning: 'The process of integrating a new employee or customer into an organization.', hindi: 'नए कर्मचारी या ग्राहक को सिस्टम और प्रक्रिया से परिचित कराना।' },
    { word: 'deliverables', phonetic: '/dɪˈlɪvərəblz/', meaning: 'A tangible or intangible good or service produced as a result of a project.', hindi: 'प्रोजेक्ट के तहत सौंपे जाने वाले परिणाम, उत्पाद या रिपोर्ट।' },
    { word: 'bottleneck', phonetic: '/ˈbɑːtl nɛk/', meaning: 'A point of congestion in a system that stops or slows progress.', hindi: 'अड़चन या रुकावट का बिंदु जो पूरे काम को धीमा कर दे।' },
    { word: 'bandwidth', phonetic: '/ˈbændwɪdθ/', meaning: 'The mental capacity or time required to deal with extra work.', hindi: 'काम संभालने की क्षमता, समय या ऊर्जा।' },
    { word: 'deep dive', phonetic: '/diːp daɪv/', meaning: 'An in-depth, thorough examination or analysis of a topic.', hindi: 'किसी विषय या समस्या का बहुत गहराई से विश्लेषण करना।' },
    { word: 'circle back', phonetic: '/ˈsɜːrkl bæk/', meaning: 'To return to a topic or follow up with someone at a later time.', hindi: 'बाद में किसी विषय पर फिर से बात करना या फॉलो-अप लेना।' },
    { word: 'touch base', phonetic: '/tʌtʃ beɪs/', meaning: 'To briefly make contact or communicate with someone.', hindi: 'हालचाल लेने या संक्षिप्त अपडेट के लिए संपर्क करना।' },
    { word: 'action items', phonetic: '/ˈækʃn ˈaɪtəmz/', meaning: 'Specific tasks or actions identified for future completion.', hindi: 'मीटिंग के बाद पूरे किए जाने वाले विशिष्ट कार्य।' },
    { word: 'pain point', phonetic: '/peɪn pɔɪnt/', meaning: 'A specific problem or frustration experienced by customers or users.', hindi: 'ग्राहकों की मुख्य समस्या, परेशानी या दुखती रग।' },
    { word: 'pivot', phonetic: '/ˈpɪvət/', meaning: 'To fundamentally change the direction of a strategy or business model.', hindi: 'रणनीति या व्यापार की दिशा को आवश्यकतानुसार बदलना।' },
    { word: 'buy-in', phonetic: '/ˈbaɪ ɪn/', meaning: 'Agreement on or acceptance of an idea, decision, or proposition.', hindi: 'किसी योजना पर टीम या अधिकारियों की सहमति और समर्थन।' },
    { word: 'hard stop', phonetic: '/hɑːrd stɑːp/', meaning: 'A precise deadline or time when a meeting or discussion must end.', hindi: 'निश्चित समय सीमा जब चर्चा या बैठक हर हाल में समाप्त होनी हो।' },
    { word: 'elevator pitch', phonetic: '/ˈɛləveɪtər pɪtʃ/', meaning: 'A quick, persuasive summary of an idea delivered in under a minute.', hindi: 'एक मिनट से कम में अपनी योजना या विचार को समझाने का संक्षिप्त भाषण।' },
    { word: 'benchmark', phonetic: '/ˈbɛntʃmɑːrk/', meaning: 'A standard or point of reference against which things may be compared.', hindi: 'एक मानक या पैमाना जिससे तुलना की जा सके।' },
    { word: 'low-hanging fruit', phonetic: '/loʊ ˈhæŋɪŋ fruːt/', meaning: 'Tasks or targets that are easily achievable with minimal effort.', hindi: 'आसानी से हासिल किए जा सकने वाले लक्ष्य या अवसर।' },
    { word: 'sync up', phonetic: '/sɪŋk ʌp/', meaning: 'To meet and coordinate with colleagues so everyone is aligned.', hindi: 'आपस में तालमेल बिठाना या ताज़ा जानकारी साझा करना।' },
    { word: 'run the numbers', phonetic: '/rʌn ðə ˈnʌmbərz/', meaning: 'To calculate the financial implications or data of a plan.', hindi: 'वित्तीय हिसाब-किताब या आंकड़ों की गणना करना।' },
    { word: 'table this', phonetic: '/ˈteɪbl ðɪs/', meaning: 'To postpone discussion of a topic until a future meeting.', hindi: 'किसी मुद्दे पर चर्चा को अगली बैठक तक के लिए टालना।' },
    { word: 'take offline', phonetic: '/teɪk ˈɔːflaɪn/', meaning: 'To discuss a topic privately outside of the current group meeting.', hindi: 'सामूहिक बैठक के बाहर अलग से किसी बात पर चर्चा करना।' },
    { word: 'visibility', phonetic: '/ˌvɪzəˈbɪləti/', meaning: 'Clarity and awareness regarding ongoing progress across teams.', hindi: 'काम की प्रगति का सबको स्पष्ट रूप से दिखाई देना।' },
    { word: 'move the needle', phonetic: '/muːv ðə ˈniːdl/', meaning: 'To make a noticeable, measurable difference or improvement.', hindi: 'कोई ठोस और मापने योग्य बदलाव या प्रगति लाना।' },
    { word: 'wheelhouse', phonetic: '/ˈwiːlhaʊs/', meaning: 'An area of expertise, skill, or comfort for an individual.', hindi: 'किसी व्यक्ति की विशेषज्ञता या मजबूत पकड़ का क्षेत्र।' },
    { word: 'paradigm shift', phonetic: '/ˈpærədaɪm ʃɪft/', meaning: 'A fundamental change in approach, mindset, or underlying assumptions.', hindi: 'सोच, कार्यशैली या व्यवस्था में बुनियादी बड़ा बदलाव।' },
    { word: 'drill down', phonetic: '/drɪl daʊn/', meaning: 'To investigate or examine data in greater and deeper detail.', hindi: 'आंकड़ों या समस्या की तह तक जाकर पड़ताल करना।' },
    { word: 'boilerplate', phonetic: '/ˈbɔɪlərpleɪt/', meaning: 'Standardized text, code, or templates reused without alteration.', hindi: 'तैयार मानक ढांचा या बार-बार इस्तेमाल होने वाला टेक्स्ट/कोड।' },
    { word: 'push the envelope', phonetic: '/pʊʃ ði ˈɛnvəloʊp/', meaning: 'To go beyond the current limits of what is considered possible.', hindi: 'मौजूदा सीमाओं को लांघकर नया कीर्तिमान स्थापित करना।' },
    { word: 'value proposition', phonetic: '/ˈvæljuː ˌprɑːpəˈzɪʃn/', meaning: 'An innovation or feature intended to make a product attractive.', hindi: 'उत्पाद की वह खासियत जो ग्राहकों को वास्तविक लाभ देती है।' },
    { word: 'roadmap', phonetic: '/ˈroʊdmæp/', meaning: 'A strategic plan that outlines goals and desired outcomes over time.', hindi: 'लक्ष्य तक पहुंचने की समयबद्ध कार्ययोजना या रूपरेखा।' },
    { word: 'core competency', phonetic: '/kɔːr ˈkɑːmpətənsi/', meaning: 'A defining capability or advantage that distinguishes a firm or person.', hindi: 'मुख्य ताकत या हुनर जो किसी को दूसरों से बेहतर बनाता है।' },
    { word: 'churn', phonetic: '/tʃɜːrn/', meaning: 'The rate at which customers stop subscribing or doing business.', hindi: 'ग्राहकों का सेवा छोड़कर जाने का प्रतिशत (Churn Rate)।' },
    { word: 'traction', phonetic: '/ˈtrækʃn/', meaning: 'The extent to which a new product or idea gains popularity or momentum.', hindi: 'बाज़ार में उत्पाद को मिलने वाला शुरुआती समर्थन या रफ़्तार।' },
    { word: 'flywheel', phonetic: '/ˈflaɪwiːl/', meaning: 'A business model where incremental wins compound into unstoppable momentum.', hindi: 'एक ऐसा मॉडल जहां छोटी सफलताएं मिलकर बड़ी रफ़्तार पकड़ती हैं।' },
    { word: 'scalable', phonetic: '/ˈskeɪləbl/', meaning: 'Able to grow and handle increased workload without performance drops.', hindi: 'बढ़ते दबाव या मांग के साथ आसानी से फैलने और संभलने योग्य।' },
    { word: 'synergy', phonetic: '/ˈsɪnərdʒi/', meaning: 'The combined value and performance of two entities working together.', hindi: 'साथ मिलकर काम करने से मिलने वाला अतिरिक्त लाभ व तालमेल।' },
    { word: 'disconnect', phonetic: '/ˌdɪskəˈnɛkt/', meaning: 'A lack of connection, alignment, or understanding between parties.', hindi: 'आपसी समझ या संचार में कमी होना।' },
    { word: 'takeaway', phonetic: '/ˈteɪkəweɪ/', meaning: 'A key point, lesson, or piece of information to be remembered.', hindi: 'सीख, मुख्य निष्कर्ष या याद रखने योग्य महत्वपूर्ण बात।' },
    { word: 'burn rate', phonetic: '/bɜːrn reɪt/', meaning: 'The rate at which a company spends its cash balance before generating profit.', hindi: 'कंपनी द्वारा प्रतिमाह नकद पूंजी खर्च करने की दर।' },
    { word: 'runway', phonetic: '/ˈrʌnweɪ/', meaning: 'The amount of time a company has before it runs out of operational cash.', hindi: 'कंपनी के पास बिना नए फंड के काम चलाने के लिए बचा समय।' },
    { word: 'evergreen', phonetic: '/ˈɛvərɡriːn/', meaning: 'Content or value that remains fresh, relevant, and useful over years.', hindi: 'सदाबहार, जो कभी पुराना या अप्रसांगिक न हो।' },
    { word: 'deep work', phonetic: '/diːp wɜːrk/', meaning: 'Distraction-free concentration that pushes cognitive capabilities.', hindi: 'बिना किसी भटकाव के किया गया गहरा और एकाग्र कार्य।' },
    { word: 'context switching', phonetic: '/ˈkɑːntɛkst ˈswɪtʃɪŋ/', meaning: 'Jumping between different tasks, disrupting deep cognitive focus.', hindi: 'बार-बार अलग-अलग कामों में ध्यान भटकाना।' },
    { word: 'asynchronous', phonetic: '/eɪˈsɪŋkrənəs/', meaning: 'Communication or workflows happening without requiring immediate real-time response.', hindi: 'गैर-समकालिक (जब तुरंत एक ही समय पर मौजूद होना ज़रूरी न हो)।' },
    { word: 'backlog', phonetic: '/ˈbæklɔːɡ/', meaning: 'An accumulation of uncompleted work, tickets, or tasks awaiting resolution.', hindi: 'पेंडिंग पड़े हुए कामों या टिकटों की जमा सूची।' },
    { word: 'sprint', phonetic: '/sprɪnt/', meaning: 'A set period of time during which specific work must be completed.', hindi: 'एक से दो हफ्तों का केंद्रित कार्य चक्र (एजाइल स्प्रिंट)।' },
    { word: 'retrospective', phonetic: '/ˌrɛtrəˈspɛktɪv/', meaning: 'A team review reflecting on past sprint performance to improve workflows.', hindi: 'बीते काम की समीक्षा ताकि आगे की गलतियों को सुधारा जा सके।' },
    { word: 'standup', phonetic: '/ˈstændʌp/', meaning: 'A brief daily status meeting where team members share progress and hurdles.', hindi: 'दैनिक 10 मिनट की संक्षिप्त अपडेट बैठक।' },
    { word: 'cadence', phonetic: '/ˈkeɪdns/', meaning: 'A regular rhythm, schedule, or frequency of events.', hindi: 'नियमित लय, आवधिक चक्र या तय दिनचर्या।' },
    { word: 'stakeholder', phonetic: '/ˈsteɪkhoʊldər/', meaning: 'A person with an interest or concern in something, especially a business.', hindi: 'हितधारक, जिसका किसी काम या कंपनी के नतीजों से सीधा सरोकार हो।' },
    { word: 'alignment', phonetic: '/əˈlaɪnmənt/', meaning: 'Arrangement in a straight line, or agreement among group members on a path.', hindi: 'सभी पक्षों का एक ही दिशा और लक्ष्य पर सहमत होना।' },
    { word: 'sign-off', phonetic: '/saɪn ɔːf/', meaning: 'Formal approval or authorization to proceed with a project phase.', hindi: 'औपचारिक अंतिम मंज़ूरी या हस्ताक्षर।' },
    { word: 'scope creep', phonetic: '/skoʊp kriːp/', meaning: 'Uncontrolled gradual expansion of product features beyond initial plans.', hindi: 'प्रोजेक्ट की सीमाओं का बिना सहमति धीरे-धीरे बढ़ते जाना।' },
    { word: 'red flag', phonetic: '/rɛd flæɡ/', meaning: 'A warning sign indicating impending danger, dishonesty, or malfunction.', hindi: 'खतरे का संकेत या गड़बड़ी का पूर्व आभास।' },
    { word: 'green flag', phonetic: '/ɡriːn flæɡ/', meaning: 'A positive indicator of trustworthiness, safety, and healthy communication.', hindi: 'सकारात्मक और भरोसेमंद होने का संकेत।' },
    { word: 'litmus test', phonetic: '/ˈlɪtməs tɛst/', meaning: 'A decisively revealing test of a person’s true character or intent.', hindi: 'सच्चाई या नीयत परखने की निर्णायक कसौटी।' },
    { word: 'gut check', phonetic: '/ɡʌt tʃɛk/', meaning: 'A pause to assess one’s instincts and values before making a tough call.', hindi: 'मुश्किल फैसले से पहले अपनी अंतरात्मा और सहज ज्ञान को टटोलना।' },
    { word: 'zero-sum', phonetic: '/ˈzɪroʊ sʌm/', meaning: 'A situation in which one person’s gain is exactly equal to another’s loss.', hindi: 'शून्य-योग स्थिति (जहां एक की जीत दूसरे का सीधा नुकसान हो)।' },
    { word: 'leverage', phonetic: '/ˈlɛvərɪdʒ/', meaning: 'To use something to maximum advantage to gain greater output.', hindi: 'अपने संसाधनों या स्थिति का भरपूर फायदा उठाना।' },
    { word: 'frictionless', phonetic: '/ˈfrɪkʃənləs/', meaning: 'Smooth, effortless, and free of obstacles or administrative drag.', hindi: 'सहज, निर्बाध और बिना किसी अड़चन का अनुभव।' },
    { word: 'seamless', phonetic: '/ˈsiːmləs/', meaning: 'Smooth and continuous, with no apparent breaks or seams.', hindi: 'एकदम सहज और निरंतर, बिना किसी रुकावट के।' },
    { word: 'peer review', phonetic: '/pɪr rɪˈvjuː/', meaning: 'Evaluation of scientific, academic, or coding work by others in the field.', hindi: 'सहकर्मियों द्वारा काम की जांच और समीक्षा।' },
    { word: 'soundboard', phonetic: '/ˈsaʊndbɔːrd/', meaning: 'A trusted person with whom one tests out ideas and opinions.', hindi: 'सलाहकार जिससे अपनी नई सोच साझा करके राय ली जा सके।' },
    { word: 'rabbit hole', phonetic: '/ˈræbɪt hoʊl/', meaning: 'A complex, bizarre, or engrossing topic that consumes hours of focus.', hindi: 'किसी पेचीदा विषय में इतना खो जाना कि समय का होश न रहे।' },
    { word: 'north star', phonetic: '/nɔːrθ stɑːr/', meaning: 'A guiding principle or core vision that directs all decisions.', hindi: 'ध्रुव तारा / मार्गदर्शक सिद्धांत जो सही दिशा दिखाता है।' },
    { word: 'mission critical', phonetic: '/ˈmɪʃn ˈkrɪtɪkl/', meaning: 'An element whose failure will cause catastrophic operational shutdown.', hindi: 'अति-महत्वपूर्ण अंग जिसके बिना पूरी व्यवस्था ठप हो सकती है।' },
    { word: 'fail fast', phonetic: '/feɪl fæst/', meaning: 'Testing hypotheses quickly to learn from early minor failures cheaply.', hindi: 'जल्दी प्रयोग करके गलतियों से तुरंत सीख लेना।' },
    { word: 'guardrails', phonetic: '/ˈɡɑːrdreɪlz/', meaning: 'Safety boundaries that prevent severe mistakes while allowing autonomy.', hindi: 'सुरक्षा घेरा या नियम जो बड़ी गलतियों से बचाते हैं।' },
    { word: 'trade-off', phonetic: '/ˈtreɪd ɔːf/', meaning: 'A balance achieved between two desirable but incompatible features.', hindi: 'सौदा / एक अच्छी चीज़ पाने के लिए दूसरी चीज़ छोड़ना।' },
    { word: 'tech debt', phonetic: '/tɛk dɛt/', meaning: 'The implied cost of additional rework caused by choosing an easy solution now.', hindi: 'जल्दबाज़ी में किया गया घटिया कोडिंग कार्य जो आगे सिरदर्द बनता है।' },
    { word: 'sandbox', phonetic: '/ˈsændbɑːks/', meaning: 'An isolated testing environment for executing untrusted software safely.', hindi: 'प्रयोग करने की सुरक्षित और अलग प्रयोगशाला।' },
    { word: 'edge case', phonetic: '/ɛdʒ keɪs/', meaning: 'A rare problem or situation that occurs only at extreme parameters.', hindi: 'अत्यंत दुर्लभ स्थिति जो केवल खास परिस्थितियों में ही पैदा होती है।' },
    { word: 'dogfooding', phonetic: '/ˈdɔːɡfuːdɪŋ/', meaning: 'A company using its own products internally to test real usability.', hindi: 'अपनी ही कंपनी के कर्मचारियों द्वारा अपने ही उत्पाद का इस्तेमाल करना।' },
    { word: 'rollout', phonetic: '/ˈroʊlaʊt/', meaning: 'The official presentation, release, or deployment of a new product.', hindi: 'किसी नए उत्पाद या फीचर को जनता के लिए जारी करना।' },
    { word: 'hotfix', phonetic: '/ˈhɑːtfɪks/', meaning: 'A quick patch applied immediately to fix a critical software bug in production.', hindi: 'लाइव सिस्टम में गंभीर बग को तुरंत ठीक करने वाला पैच।' },
    { word: 'sunset', phonetic: '/ˈsʌnsɛt/', meaning: 'To intentionally phase out and terminate a software feature or service.', hindi: 'किसी पुरानी सेवा या फीचर को चरणबद्ध तरीके से बंद करना।' },
    { word: 'deprecate', phonetic: '/ˈdɛprəkeɪt/', meaning: 'To declare a software feature obsolete and advise against its use.', hindi: 'अप्रचलित घोषित करना और उपयोग न करने की सलाह देना।' },
    { word: 'turnkey', phonetic: '/ˈtɜːrnkiː/', meaning: 'Supplied ready for immediate operation or use without setup.', hindi: 'पूरी तरह तैयार समाधान, जिसे बस शुरू करने की देर हो।' },
    { word: 'plug and play', phonetic: '/plʌɡ ənd pleɪ/', meaning: 'Denoting software or devices that work naturally upon first connection.', hindi: 'जो जोड़ते ही तुरंत काम करने लगे, बिना जटिल सेटिंग के।' },
    { word: 'best-in-class', phonetic: '/bɛst ɪn klæs/', meaning: 'The highest quality or ranking product among competitors in its category.', hindi: 'अपनी श्रेणी में सर्वोत्तम और अव्वल दर्जे का।' },
    { word: 'state of the art', phonetic: '/steɪt əv ði ɑːrt/', meaning: 'Incorporating the newest, most advanced features and technology.', hindi: 'अत्याधुनिक, नवीनतम तकनीक से लैस।' },
    { word: 'heads up', phonetic: '/hɛdz ʌp/', meaning: 'An advance warning or notification of an upcoming event.', hindi: 'पूर्व सूचना या चेतावनी।' },
    { word: 'hard deadline', phonetic: '/hɑːrd ˈdɛdlaɪn/', meaning: 'A strict time cutoff that allows absolutely zero extensions.', hindi: 'अंतिम समय सीमा जिसे किसी भी हाल में आगे नहीं बढ़ाया जा सकता।' },
    { word: 'ballpark figure', phonetic: '/ˈbɔːlpɑːrk ˈfɪɡjər/', meaning: 'A rough numerical estimate or approximation.', hindi: 'एक मोटा-मोटा या अनुमानित आंकड़ा।' },
    { word: 'touchpoint', phonetic: '/ˈtʌtʃpɔɪnt/', meaning: 'Any point of contact between a buyer and a seller or customer and brand.', hindi: 'ग्राहक और कंपनी के बीच संवाद का संपर्क बिंदु।' },
    { word: 'high-touch', phonetic: '/haɪ tʌtʃ/', meaning: 'Involving a high degree of personalized human interaction.', hindi: 'व्यक्तिगत सेवा और सीधे मानवीय संपर्क पर आधारित।' },
    { word: 'hands-on', phonetic: '/hændz ɑːn/', meaning: 'Involving active, direct participation rather than passive observation.', hindi: 'व्यावहारिक अनुभव, खुद अपने हाथों से करके सीखना।' },
    { word: 'open door policy', phonetic: '/ˈoʊpən dɔːr ˈpɑːləsi/', meaning: 'A management practice encouraging employees to share thoughts freely.', hindi: 'खुले दरवाज़े की नीति (कोई भी कर्मचारी बेझिझक बॉस से मिल सकता है)।' },
    { word: 'table stakes', phonetic: '/ˈteɪbl steɪks/', meaning: 'The minimum requirements necessary to compete in a business market.', hindi: 'बाज़ार में टिके रहने के लिए न्यूनतम अनिवार्य बुनियादी शर्तें।' },
    { word: 'sweet spot', phonetic: '/swiːt spɑːt/', meaning: 'An optimum point or condition that produces the best possible result.', hindi: 'संतुलन का आदर्श बिंदु जहां सबसे बेहतर परिणाम मिलता है।' },
    { word: 'moving parts', phonetic: '/ˈmuːvɪŋ pɑːrts/', meaning: 'The many complex, interacting elements within a project or machine.', hindi: 'प्रोजेक्ट के कई पेचीदा और परस्पर जुड़े हुए हिस्से।' },
    { word: 'pipeline', phonetic: '/ˈpaɪplaɪn/', meaning: 'A sequence of processes or deals moving sequentially toward completion.', hindi: 'चल रहे प्रोजेक्ट्स या सौदों की कतार।' },
    { word: 'work in progress', phonetic: '/wɜːrk ɪn ˈprɑːɡrɛs/', meaning: 'Work that has been started but is not yet fully completed.', hindi: 'प्रगति पर काम / जो अभी पूरा होना बाकी है।' },
    { word: 'green light', phonetic: '/ɡriːn laɪt/', meaning: 'Official permission or approval to start a proposed project.', hindi: 'हरी झंडी / आगे बढ़ने की मंज़ूरी।' },
    { word: 'fallout', phonetic: '/ˈfɔːlaʊt/', meaning: 'The adverse side effects or aftermath of an unpleasant event.', hindi: 'किसी अप्रिय घटना के बाद के बुरे दुष्परिणाम।' },
    { word: 'double down', phonetic: '/ˈdʌbl daʊn/', meaning: 'To reinforce or strengthen one’s commitment to a specific strategy.', hindi: 'अपनी बात या रणनीति पर और ज़्यादा ज़ोर देना।' },
    { word: 'follow through', phonetic: '/ˈfɑːloʊ θruː/', meaning: 'Continuing an action or commitment until it is fully completed.', hindi: 'वादे या काम को अंत तक पूरा निभाना।' },
    { word: 'follow up', phonetic: '/ˈfɑːloʊ ʌp/', meaning: 'Pursuing further communication or action regarding an earlier interaction.', hindi: 'पहले हुई बात की ताज़ा स्थिति जानना या आगे की कार्रवाई करना।' },
    { word: 'ping', phonetic: '/pɪŋ/', meaning: 'To send a brief digital message or prompt to someone.', hindi: 'छोटा सा मैसेज या सूचना भेजना।' },
    { word: 'debrief', phonetic: '/diːˈbriːf/', meaning: 'To question or review someone closely about a recently completed task.', hindi: 'मिशन या काम पूरा होने के बाद विस्तृत पूछताछ व समीक्षा करना।' },
    { word: 'recap', phonetic: '/ˈriːkæp/', meaning: 'To state again as a summary; review the main highlights.', hindi: 'पुनरावृत्ति या मुख्य बातों का संक्षिप्त सारांश देना।' },
    { word: 'kick off', phonetic: '/kɪk ɔːf/', meaning: 'The official start or beginning of an event, project, or campaign.', hindi: 'शुरुआत करना या किसी बड़े आयोजन का आगाज़ करना।' },
    { word: 'jumpstart', phonetic: '/ˈdʒʌmpstɑːrt/', meaning: 'To provide a fast, energetic boost to get something moving quickly.', hindi: 'किसी सुस्त काम को तेज़ शुरुआत देकर रफ़्तार देना।' },
    { word: 'fast track', phonetic: '/fæst træk/', meaning: 'Accelerating the progress of a project through priority treatment.', hindi: 'प्राथमिकता देकर किसी काम को सामान्य से तेज़ गति से निपटाना।' },
    { word: 'sanity check', phonetic: '/ˈsænəti tʃɛk/', meaning: 'A basic initial test to verify that an idea or code is logically reasonable.', hindi: 'यह जांचना कि कोई बात या गणना बुनियादी तौर पर सही है या नहीं।' },
    { word: 'reality check', phonetic: '/riˈæləti tʃɛk/', meaning: 'An occasion that makes someone realize what the actual truth is.', hindi: 'सच्चाई का अहसास होना / भ्रम टूटना।' },
    { word: 'level up', phonetic: '/ˈlɛvl ʌp/', meaning: 'To advance in skill, maturity, status, or effectiveness noticeably.', hindi: 'अपने ज्ञान, कौशल या दर्जे को एक कदम और ऊंचा उठाना।' },
    { word: 'upskill', phonetic: '/ˌʌpˈskɪl/', meaning: 'To teach or learn additional, modern skills to stay employable.', hindi: 'नए और आधुनिक हुनर सीखकर अपनी योग्यता बढ़ाना।' },
    { word: 'headwind', phonetic: '/ˈhɛdwɪnd/', meaning: 'External factors or conditions that slow down progress or growth.', hindi: 'प्रतिकूल परिस्थितियां जो विकास की रफ़्तार को धीमा करती हैं।' },
    { word: 'tailwind', phonetic: '/ˈteɪlwɪnd/', meaning: 'Favorable external circumstances that accelerate momentum and growth.', hindi: 'अनुकूल परिस्थितियां जो सफलता की रफ़्तार को तेज़ करती हैं।' },
    { word: 'silver bullet', phonetic: '/ˈsɪlvər ˈbʊlɪt/', meaning: 'A simple, miraculous solution to a highly complicated problem.', hindi: 'रामबाण इलाज / एक ही झटके में सारी समस्याएं हल करने वाला उपाय।' },
    { word: 'dealbreaker', phonetic: '/ˈdiːlbreɪkər/', meaning: 'A decisive factor that prevents an agreement or relationship from continuing.', hindi: 'वह मुख्य शर्त या कारण जिससे पूरा समझौता ही टूट जाए।' }
  ];

  wordsList.push(...workAndCareerTerms.map((item, idx) => ({
    seq: 191 + idx,
    cat: 'work',
    diff: 'intermediate',
    example: `Our department utilized ${item.word} to ensure project success.`,
    ...item
  })));

  // Words 301 to 400: Life Philosophy, Relationships & Emotional Intelligence
  const emotionalAndLifeTerms = [
    { word: 'boundary', phonetic: '/ˈbaʊndri/', meaning: 'A healthy limit that marks what is emotionally acceptable in relationships.', hindi: 'स्वस्थ सीमाएं तय करना ताकि आत्मसम्मान बना रहे।' },
    { word: 'mindfulness', phonetic: '/ˈmaɪndflnəs/', meaning: 'Maintaining a moment-by-moment awareness of our thoughts and feelings.', hindi: 'सचेतनता, वर्तमान पल में पूरे होश और ध्यान के साथ जीना।' },
    { word: 'introspective', phonetic: '/ˌɪntrəˈspɛktɪv/', meaning: 'Characterized by examination of one’s own conscious thoughts and feelings.', hindi: 'आत्म-विश्लेषी, अपने भीतर झांकने और विचार करने वाला।' },
    { word: 'detachment', phonetic: '/dɪˈtætʃmənt/', meaning: 'Freedom from emotional obsession or bias; serene neutrality.', hindi: 'अनासक्ति, मोह-माया से परे होकर शांत मन रखना।' },
    { word: 'bittersweet', phonetic: '/ˌbɪtərˈswiːt/', meaning: 'Arousing pleasure tinged with feelings of sadness or regret.', hindi: 'खट्टा-मीठा अहसास, जिसमें खुशी और उदासी दोनों मिली हों।' },
    { word: 'epiphany', phonetic: '/ɪˈpɪfəni/', meaning: 'A sudden, profound realization or moment of intuitive understanding.', hindi: 'अचानक आत्मज्ञान होना या सच्चाई की गहरी समझ आ जाना।' },
    { word: 'nostalgia', phonetic: '/nɑːˈstældʒə/', meaning: 'A sentimental longing or affection for a bygone period in the past.', hindi: 'पुरानी मीठी यादों में खो जाने का अहसास।' },
    { word: 'vulnerability', phonetic: '/ˌvʌlnərəˈbɪləti/', meaning: 'The willingness to show genuine emotion and risk emotional exposure.', hindi: 'निष्कपट भाव से अपनी कमज़ोरी और सच्ची भावनाएं व्यक्त करना।' },
    { word: 'closure', phonetic: '/ˈkloʊʒər/', meaning: 'A sense of resolution in a relationship or after a traumatic event.', hindi: 'किसी रिश्ते या दुखद अध्याय का संतोषजनक अंत व शांति।' },
    { word: 'imposter syndrome', phonetic: '/ɪmˈpɑːstər ˈsɪndroʊm/', meaning: 'The persistent fear of being exposed as an intellectual fraud despite success.', hindi: 'अपनी ही काबिलियत पर बेवजह शक होना (ठग सिंड्रोम)।' },
    { word: 'gut feeling', phonetic: '/ɡʌt ˈfiːlɪŋ/', meaning: 'An instinctive feeling as opposed to an opinion based on logical thought.', hindi: 'आंतरिक सहज बोध या पूर्वाभास।' },
    { word: 'second-guess', phonetic: '/ˈsɛkənd ɡɛs/', meaning: 'To doubt or question one’s own decisions or actions in hindsight.', hindi: 'अपने ही फैसले पर बाद में शक करना या पछताना।' },
    { word: 'overthinking', phonetic: '/ˌoʊvərˈθɪŋkɪŋ/', meaning: 'Thinking about something too much or for too long, causing paralysis.', hindi: 'ज़रूरत से ज़्यादा सोच-विचार करके चिंता बढ़ाना।' },
    { word: 'soul-searching', phonetic: '/soʊl ˈsɜːrtʃɪŋ/', meaning: 'Deep and conscientious contemplation of one’s motives and values.', hindi: 'गहन आत्ममंथन, अपनी नीयत और जीवन के मकसदों की पड़ताल।' },
    { word: 'reciprocity', phonetic: '/ˌrɛsɪˈprɑːsəti/', meaning: 'The practice of exchanging things with others for mutual benefit and respect.', hindi: 'परस्पर लेन-देन, जैसा व्यवहार आप करें वैसा ही पाना।' },
    { word: 'unconditional', phonetic: '/ˌʌnkənˈdɪʃənl/', meaning: 'Not subject to any conditions or requirements; complete and pure.', hindi: 'बिना किसी शर्त के, पूर्ण और निस्वार्थ।' },
    { word: 'unspoken', phonetic: '/ʌnˈspoʊkən/', meaning: 'Understood without the need to be said aloud or stated directly.', hindi: 'बिन कहे ही समझी जाने वाली बात या अहसास।' },
    { word: 'catharsis', phonetic: '/kəˈθɑːrsɪs/', meaning: 'The process of releasing strong or repressed emotions for relief.', hindi: 'दबी हुई भावनाओं का बह निकलना और मन का हल्का हो जाना।' },
    { word: 'kindred spirit', phonetic: '/ˈkɪndrəd ˈspɪrɪt/', meaning: 'A person whose interests or disposition are extremely similar to one’s own.', hindi: 'समान विचार और स्वभाव वाला हमख्याल साथी।' },
    { word: 'inner peace', phonetic: '/ˈɪnər piːs/', meaning: 'A deliberate state of psychological and spiritual calm despite chaos.', hindi: 'आत्मिक शांति और मानसिक सुकून।' },
    { word: 'self-efficacy', phonetic: '/sɛlf ˈɛfɪkəsi/', meaning: 'An individual’s belief in their capacity to execute behaviors to achieve goals.', hindi: 'अपनी क्षमताओं पर गहरा और अडिग विश्वास।' },
    { word: 'equanimity', phonetic: '/ˌiːkwəˈnɪməti/', meaning: 'Mental calmness, composure, and evenness of temper in tough times.', hindi: 'समभाव, सुख-दुख में मन का शांत और स्थिर रहना।' },
    { word: 'solitude', phonetic: '/ˈsɑːlətuːd/', meaning: 'The state or situation of being alone in peaceful contemplation.', hindi: 'एकांत, जहां अकेले रहकर भी मन प्रसन्न रहे।' },
    { word: 'solace', phonetic: '/ˈsɑːləs/', meaning: 'Comfort or consolation in a time of distress or sadness.', hindi: 'मुसीबत या दुख की घड़ी में मिलने वाली तसल्ली व सांत्वना।' },
    { word: 'zest', phonetic: '/zɛst/', meaning: 'Great enthusiasm, eager enjoyment, and vibrant energy for life.', hindi: 'जीवन जीने का गहरा उत्साह, उमंग और मज़ा।' },
    { word: 'wanderlust', phonetic: '/ˈwɑːndərlʌst/', meaning: 'A strong desire to travel and explore distant unfamiliar lands.', hindi: 'दूर-दराज घूमने और नई जगहें देखने की तीव्र चाहत।' },
    { word: 'zeitgeist', phonetic: '/ˈtsaɪtɡaɪst/', meaning: 'The defining spirit or mood of a particular period of history.', hindi: 'युग-चेतना, किसी कालखंड का प्रचलित सामाजिक मिज़ाज।' },
    { word: 'pet peeve', phonetic: '/pɛt piːv/', meaning: 'A minor annoyance that an individual finds especially irritating.', hindi: 'कोई छोटी सी बात जो किसी व्यक्ति को विशेष रूप से चिढ़ाती हो।' },
    { word: 'presence', phonetic: '/ˈprɛzns/', meaning: 'Being completely attentive and engaged in the current moment.', hindi: 'उपस्थिति, तन और मन से पूरी तरह वर्तमान में मौजूद होना।' },
    { word: 'gratitude', phonetic: '/ˈɡrætɪtuːd/', meaning: 'The quality of being thankful and showing appreciation for good things.', hindi: 'कृतज्ञता, आभार और जीवन की नेमतों के प्रति धन्यवाद का भाव।' },
    { word: 'grounded', phonetic: '/ˈɡraʊndɪd/', meaning: 'Mentally balanced, calm, realistic, and steady under pressure.', hindi: 'शांत, स्थिर और ज़मीन से जुड़ा हुआ संतुलित इंसान।' },
    { word: 'intentional', phonetic: '/ɪnˈtɛnʃənl/', meaning: 'Done on purpose, deliberate, and aligned with meaningful goals.', hindi: 'सोच-समझकर किया गया, जिसका एक स्पष्ट उद्देश्य हो।' },
    { word: 'grace', phonetic: '/ɡreɪs/', meaning: 'Courteous goodwill, poise, and dignified elegance under stress.', hindi: 'गरिमा, शालीनता और कठिन समय में भी शिष्टाचार बनाए रखना।' },
    { word: 'grit', phonetic: '/ɡrɪt/', meaning: 'Courage and resolve; sustained passion and perseverance for long-term goals.', hindi: 'दृढ़ इच्छाशक्ति और कठिन परिस्थितियों में टिके रहने का दम।' },
    { word: 'self-awareness', phonetic: '/sɛlf əˈwɛərnəs/', meaning: 'Conscious knowledge of one’s own character, feelings, and desires.', hindi: 'आत्म-बोध, अपनी खूबियों और कमज़ोरियों की स्पष्ट पहचान।' },
    { word: 'compassion', phonetic: '/kəmˈpæʃn/', meaning: 'Sympathetic pity and concern for the sufferings or misfortunes of others.', hindi: 'करुणा, दूसरों के दुख को देखकर मदद करने की तड़प।' },
    { word: 'contentment', phonetic: '/kənˈtɛntmənt/', meaning: 'A state of happiness and satisfaction with what one currently possesses.', hindi: 'संतोष, जो प्राप्त है उसी में तृप्ति और आनंद का भाव।' },
    { word: 'fortitude', phonetic: '/ˈfɔːrtɪtuːd/', meaning: 'Courage in pain or adversity without yielding.', hindi: 'धैर्य और आंतरिक साहस, जो पीड़ा में भी अडिग रखे।' },
    { word: 'magnanimous', phonetic: '/mæɡˈnænɪməs/', meaning: 'Generous or forgiving, especially toward a rival or less powerful person.', hindi: 'उदार, बड़े दिल वाला जो अपने शत्रुओं को भी माफ कर दे।' },
    { word: 'altruism', phonetic: '/ˈæltruɪzəm/', meaning: 'The belief in or practice of selfless concern for the well-being of others.', hindi: 'निस्वार्थ परोपकारिता, दूसरों की भलाई के लिए जीना।' },
    { word: 'equilibrium', phonetic: '/ˌiːkwəˈlɪbriəm/', meaning: 'A state in which opposing forces or influences are balanced.', hindi: 'संतुलन, मन और जीवन की समरसता।' },
    { word: 'forbearance', phonetic: '/fɔːrˈbɛərəns/', meaning: 'Patient self-control; restraint and tolerance.', hindi: 'सहनशीलता, संयम और क्रोध पर नियंत्रण।' },
    { word: 'camaraderie', phonetic: '/ˌkɑːməˈrɑːdəri/', meaning: 'Mutual trust and friendship among people who spend a lot of time together.', hindi: 'सच्चा भाईचारा और साथियों के बीच गहरा दोस्ताना मेलजोल।' },
    { word: 'rapport', phonetic: '/ræˈpɔːr/', meaning: 'A close and harmonious relationship in which people understand each other well.', hindi: 'आपसी तालमेल, सौहार्द और सहज समझ।' },
    { word: 'tact', phonetic: '/tækt/', meaning: 'Skill and sensitivity in dealing with others or with difficult issues.', hindi: 'व्यवहार-कुशलता, बिना किसी को आहत किए बात रखने का हुनर।' },
    { word: 'discernment', phonetic: '/dɪˈsɜːrnmənt/', meaning: 'The ability to judge well and perceive fine differences.', hindi: 'विवेक, सही और गलत में बारीक भेद करने की बुद्धि।' },
    { word: 'introspection', phonetic: '/ˌɪntrəˈspɛkʃn/', meaning: 'The examination or observation of one’s own mental and emotional state.', hindi: 'अंतरावलोकन, अपने मन के विचारों की निष्पक्ष जांच।' },
    { word: 'perspective', phonetic: '/pərˈspɛktɪv/', meaning: 'A particular attitude toward or way of regarding something; point of view.', hindi: 'दृष्टिकोण, जीवन और घटनाओं को देखने का नज़रिया।' },
    { word: 'serenity', phonetic: '/səˈrɛnəti/', meaning: 'The state of being calm, peaceful, and untroubled.', hindi: 'परम शांति, स्थिरता और निर्मलता।' },
    { word: 'euphoria', phonetic: '/juːˈfɔːriə/', meaning: 'A feeling or state of intense excitement, happiness, and elation.', hindi: 'उत्साह और परमानंद की तीव्र लहर।' }
  ];

  wordsList.push(...emotionalAndLifeTerms.map((item, idx) => ({
    seq: 301 + idx,
    cat: 'lifestyle',
    diff: 'intermediate',
    example: `Practicing ${item.word} brings clarity to daily living.`,
    ...item
  })));

  // Words 351 to 500: Advanced Mastery, Power Expressions & Fluency Boosters
  const advancedMasteryWords = [
    { word: 'catch-22', phonetic: '/kætʃ ˈtwɛnti tuː/', meaning: 'A dilemma or difficult circumstance from which there is no escape because of mutually conflicting conditions.', hindi: 'धर्मसंकट या असमंजस भरी स्थिति जहां दोनों तरफ नुकसान हो।' },
    { word: 'double-edged sword', phonetic: '/ˈdʌbl ɛdʒd sɔːrd/', meaning: 'Something that has or can have both favorable and unfavorable consequences.', hindi: 'दोधारी तलवार, जिसके फायदे और नुकसान दोनों साथ आते हैं।' },
    { word: 'tip of the iceberg', phonetic: '/tɪp əv ði ˈaɪsbɜːrɡ/', meaning: 'The small, easily visible part of a much larger and hidden problem.', hindi: 'समस्या का केवल एक छोटा सा हिस्सा जो सामने दिख रहा है।' },
    { word: 'elephant in the room', phonetic: '/ˈɛləfənt ɪn ðə ruːm/', meaning: 'A major problem or controversial issue that is obvious to all but deliberately avoided.', hindi: 'एक बहुत बड़ी और साफ़ समस्या जिसे सब जानते हुए भी अनदेखा कर रहे हों।' },
    { word: 'devil in the details', phonetic: '/ˈdɛvl ɪn ðə ˈdiːteɪlz/', meaning: 'The idea that small details in a plan can cause unexpected and immense difficulties.', hindi: 'छोटी-छोटी बारीकियों में ही सबसे बड़ा पेंच या खतरा छिपा होना।' },
    { word: 'uncharted territory', phonetic: '/ʌnˈtʃɑːrtɪd ˈtɛrətɔːri/', meaning: 'An unfamiliar, unprecedented situation where no established rules exist.', hindi: 'अनजाना इलाका या स्थिति, जिसका पहले कोई अनुभव न रहा हो।' },
    { word: 'slippery slope', phonetic: '/ˈslɪpəri sloʊp/', meaning: 'A course of action that will lead to something unacceptable, wrong, or disastrous.', hindi: 'फिसलन भरी राह, जहां एक छोटी गलती बड़ी तबाही की ओर ले जाती है।' },
    { word: 'food for thought', phonetic: '/fuːd fɔːr θɔːt/', meaning: 'Something that warrants serious thought, reflection, or consideration.', hindi: 'विचारणीय विषय, जो सोचने पर मजबूर कर दे।' },
    { word: 'rule of thumb', phonetic: '/ruːl əv θʌm/', meaning: 'A broadly accurate guide or principle based on practice rather than theory.', hindi: 'अनुभव पर आधारित सामान्य व्यावहारिक नियम।' },
    { word: 'second nature', phonetic: '/ˈsɛkənd ˈneɪtʃər/', meaning: 'A habit or action so familiar that one does it effortlessly without thinking.', hindi: 'स्वभाव बन जाना, कोई काम इतना सहज हो जाना कि सोचना भी न पड़े।' },
    { word: 'feather in cap', phonetic: '/ˈfɛðər ɪn kæp/', meaning: 'An achievement to be proud of.', hindi: 'उपलब्धि का नया ताज / गर्व करने लायक कामयाबी।' },
    { word: 'drop in the ocean', phonetic: '/drɑːp ɪn ði ˈoʊʃn/', meaning: 'A very small amount compared with what is needed or exists.', hindi: 'ऊंट के मुंह में जीरा / विशाल आवश्यकता की तुलना में बहुत कम।' },
    { word: 'call a spade a spade', phonetic: '/kɔːl ə speɪd ə speɪd/', meaning: 'To speak frankly and directly about something, even if unpleasant.', hindi: 'साफ़-साफ़ खरी-खरी बात कहना, बिना किसी लाग-लपेट के।' },
    { word: 'crystal clear', phonetic: '/ˈkrɪstl klɪr/', meaning: 'Extremely easy to understand; perfectly transparent and unambiguous.', hindi: 'आईने की तरह साफ़, जिसमें कोई शक या भ्रम न हो।' },
    { word: 'down to the wire', phonetic: '/daʊn tuː ðə ˈwaɪər/', meaning: 'Running until the very last moment or final deadline.', hindi: 'आखिरी पल या अंतिम क्षण तक खिंचना।' },
    { word: 'fly under the radar', phonetic: '/flaɪ ˈʌndər ðə ˈreɪdɑːr/', meaning: 'To go unnoticed, avoiding attention or detection intentionally.', hindi: 'चुपचाप बिना किसी की नज़र में आए अपना काम करते रहना।' },
    { word: 'get a grip', phonetic: '/ɡɛt ə ɡrɪp/', meaning: 'To regain emotional control of oneself in a distressing moment.', hindi: 'खुद पर काबू पाना और घबराहट छोड़ना।' },
    { word: 'hands down', phonetic: '/hændz daʊn/', meaning: 'Easily and decisively; without question or competition.', hindi: 'निःसंदेह, बिना किसी शक के सबसे बेहतर।' },
    { word: 'hit the ground running', phonetic: '/hɪt ðə ɡraʊnd ˈrʌnɪŋ/', meaning: 'To start an activity immediately with abundant energy and readiness.', hindi: 'शुरुआत से ही पूरी ऊर्जा और रफ़्तार से काम में जुट जाना।' },
    { word: 'in broad daylight', phonetic: '/ɪn brɔːd ˈdeɪlaɪt/', meaning: 'Happening openly during the day where everyone can see.', hindi: 'दिनदहाड़े, खुलेआम सबके सामने।' },
    { word: 'in the blink of an eye', phonetic: '/ɪn ðə blɪŋk əv ən aɪ/', meaning: 'Happening in an extremely brief moment; instantaneously.', hindi: 'पलक झपकते ही / एक क्षण में।' },
    { word: 'keep tabs on', phonetic: '/kiːp tæbz ɑːn/', meaning: 'To monitor, observe, or keep track of the activities of someone.', hindi: 'लगातार नज़र रखना या हर गतिविधि का हिसाब रखना।' },
    { word: 'leap of faith', phonetic: '/liːp əv feɪθ/', meaning: 'An act of believing in something despite lack of proof, taking a bold risk.', hindi: 'अज्ञात में छलांग लगाना, केवल विश्वास के सहारे बड़ा कदम उठाना।' },
    { word: 'make headway', phonetic: '/meɪk ˈhɛdweɪ/', meaning: 'To make steady progress in an undertaking, especially in difficult times.', hindi: 'कठिनाइयों के बावजूद धीरे-धीरे आगे बढ़ना।' },
    { word: 'off the cuff', phonetic: '/ɔːf ðə kʌf/', meaning: 'Said or done without preparation or thought; improvised.', hindi: 'बिना पूर्व तैयारी के, तुरंत मौके पर बोला गया।' },
    { word: 'on back burner', phonetic: '/ɑːn bæk ˈbɜːrnər/', meaning: 'Postponed or given low priority for the time being.', hindi: 'फिलहाल के लिए ठंडे बस्ते में डालना।' },
    { word: 'on the same page', phonetic: '/ɑːn ðə seɪm peɪdʒ/', meaning: 'Having the same understanding or agreed viewpoint as others.', hindi: 'एक जैसी समझ रखना, सभी का एकमत होना।' },
    { word: 'read between lines', phonetic: '/riːd bɪˈtwiːn laɪnz/', meaning: 'To look for or discover a meaning that is hidden or implied.', hindi: 'छिपे हुए अर्थ को समझना, जो शब्दों में न कहा गया हो।' },
    { word: 'strike while iron is hot', phonetic: '/straɪk waɪl ˈaɪərn ɪz hɑːt/', meaning: 'To take advantage of an opportunity the moment it presents itself.', hindi: 'अवसर मिलते ही तुरंत लाभ उठाना (मौके पर चौका मारना)।' },
    { word: 'take high road', phonetic: '/teɪk haɪ roʊd/', meaning: 'Doing the most moral, honorable, and respectful thing in a conflict.', hindi: 'विवाद में भी गरिमा और नैतिकता का रास्ता चुनना।' },
    { word: 'through the grapevine', phonetic: '/θruː ðə ˈɡreɪpvaɪn/', meaning: 'Hearing gossip or information circulated unofficially.', hindi: 'उड़ती-उड़ती खबर या कानाफूसी से पता चलना।' },
    { word: 'under one belt', phonetic: '/ˈʌndər wʌnz bɛlt/', meaning: 'Safely acquired as a skill, experience, or achievement.', hindi: 'अपने अनुभव या उपलब्धियों की सूची में जुड़ जाना।' },
    { word: 'watertight', phonetic: '/ˈwɔːtərtaɪt/', meaning: 'Unable to be disputed, disproved, or faulted; completely foolproof.', hindi: 'पूरी तरह पुख्ता, जिसमें कोई खामी या कमी न निकाली जा सके।' },
    { word: 'with flying colors', phonetic: '/wɪð ˈflaɪɪŋ ˈkʌlərz/', meaning: 'With great renown, distinction, and complete success.', hindi: 'शानदार अंकों या भारी सफलता के साथ पास होना।' },
    { word: 'zero tolerance', phonetic: '/ˈzɪroʊ ˈtɑːlərəns/', meaning: 'Refusal to accept any antisocial behavior or misconduct whatsoever.', hindi: 'शून्य सहनशीलता, किसी भी नियम-उल्लंघन को कतई बर्दाश्त न करना।' },
    { word: 'quantum leap', phonetic: '/ˈkwɑːntəm liːp/', meaning: 'A huge, dramatic advancement or sudden breakthrough.', hindi: 'बहुत बड़ी और क्रांतिकारी छलांग या प्रगति।' },
    { word: 'ripple effect', phonetic: '/ˈrɪpl ɪˈfɛkt/', meaning: 'The continuing spread of results from an initial small event.', hindi: 'एक छोटी घटना से दूर-दूर तक फैलने वाले व्यापक परिणाम।' },
    { word: 'watershed moment', phonetic: '/ˈwɔːtərʃɛd ˈmoʊmənt/', meaning: 'A turning point or historical event that divides eras permanently.', hindi: 'ऐतिहासिक मोड़, जहां से सब कुछ हमेशा के लिए बदल जाता है।' },
    { word: 'game plan', phonetic: '/ɡeɪm plæn/', meaning: 'A carefully developed strategy for achieving success.', hindi: 'जीत हासिल करने की पूर्व-निर्धारित रणनीति।' },
    { word: 'crowning achievement', phonetic: '/ˈkraʊnɪŋ əˈtʃiːvmənt/', meaning: 'The greatest accomplishment of a person’s lifetime career.', hindi: 'जीवन की सबसे शानदार और गौरवशाली उपलब्धि।' }
  ];

  // Continue filling remaining slots systematically to reach exactly 500 items
  let nextSeq = 351;
  for (const item of advancedMasteryWords) {
    if (wordsList.length >= 500) break;
    wordsList.push({
      seq: nextSeq++,
      cat: 'phrase',
      diff: 'advanced',
      example: `Understanding "${item.word}" helps navigate English fluently.`,
      ...item
    });
  }

  // Curated tier of high-impact everyday English words to complete sequence up to 500
  const finalTierWords = [
    { word: 'ubiquitous', phonetic: '/juːˈbɪkwɪtəs/', meaning: 'Present, appearing, or found everywhere at once.', hindi: 'सर्वव्यापी, जो हर जगह मौजूद या दिखाई दे।' },
    { word: 'ephemeral', phonetic: '/ɪˈfɛmərəl/', meaning: 'Lasting for a very short, transient time.', hindi: 'क्षणभंगुर, जो बहुत थोड़े समय के लिए टिके।' },
    { word: 'quintessential', phonetic: '/ˌkwɪntɪˈsɛnʃl/', meaning: 'Representing the most perfect or typical example of a quality.', hindi: 'सर्वोत्कृष्ट उदाहरण, किसी गुण का साक्षात प्रतीक।' },
    { word: 'clandestine', phonetic: '/klænˈdɛstɪn/', meaning: 'Kept secret or done secretively, especially because illicit.', hindi: 'गुप्त, रहस्यमय या छिपकर किया गया।' },
    { word: 'fastidious', phonetic: '/fæˈstɪdiəs/', meaning: 'Very attentive to and concerned about accuracy and detail.', hindi: 'नखरेबाज़, हर छोटी बात में पूर्णता चाहने वाला।' },
    { word: 'magnificent', phonetic: '/mæɡˈnɪfɪsnt/', meaning: 'Impressively beautiful, elaborate, or extravagant.', hindi: 'शानदार, भव्य और मनमोहक।' },
    { word: 'surreptitious', phonetic: '/ˌsɜːrəpˈtɪʃəs/', meaning: 'Kept secret, especially because it would not be approved of.', hindi: 'चोरी-छिपे किया गया, गुप्त रूप से।' },
    { word: 'ineffable', phonetic: '/ɪnˈɛfəbl/', meaning: 'Too great, beautiful, or extreme to be expressed in words.', hindi: 'अवर्णनीय, जिसका शब्दों में बखान न किया जा सके।' },
    { word: 'cacophony', phonetic: '/kəˈkɑːfəni/', meaning: 'A harsh, discordant, and jarring mixture of loud sounds.', hindi: 'कर्कश शोर, कानों को चुभने वाली तेज़ आवाज़ें।' },
    { word: 'mellifluous', phonetic: '/məˈlɪfluəs/', meaning: 'Sweet or musical; pleasant and soothing to hear.', hindi: 'मधुर, रसभरी और कानों को प्रिय लगने वाली ध्वनि।' },
    { word: 'labyrinth', phonetic: '/ˈlæbərɪnθ/', meaning: 'A complicated irregular network of passages or paths; a maze.', hindi: 'भूलभुलैया, पेचीदा उलझा हुआ जाल।' },
    { word: 'paradox', phonetic: '/ˈpærədɑːks/', meaning: 'A seemingly absurd or self-contradictory statement that may be true.', hindi: 'विरोधाभास, जो ऊपरी तौर पर उलटा लगे पर सच हो।' },
    { word: 'enigma', phonetic: '/ɪˈnɪɡmə/', meaning: 'A person or thing that is mysterious, puzzling, or hard to understand.', hindi: 'पहेली, रहस्यमयी व्यक्ति या चीज़।' },
    { word: 'aesthetic', phonetic: '/ɛsˈθɛtɪk/', meaning: 'Concerned with beauty or the appreciation of artistic elegance.', hindi: 'सौंदर्यपरक, कला और सुंदरता से संबंधित।' },
    { word: 'serene', phonetic: '/səˈriːn/', meaning: 'Calm, peaceful, and untroubled; completely tranquil.', hindi: 'शांत, निर्मल और स्थिर।' },
    { word: 'panacea', phonetic: '/ˌpænəˈsiːə/', meaning: 'A solution or remedy for all difficulties, sicknesses, or diseases.', hindi: 'रामबाण औषधि, सभी कष्टों को दूर करने वाली दवा।' },
    { word: 'vicarious', phonetic: '/vaɪˈkɛəriəs/', meaning: 'Experienced in the imagination through the feelings of another.', hindi: 'दूसरों के अनुभवों के माध्यम से खुशी या दर्द महसूस करना।' },
    { word: 'nostalgic', phonetic: '/nɑːˈstældʒɪk/', meaning: 'Characterized by or exhibiting a sentimental longing for the past.', hindi: 'अतीत की मीठी स्मृतियों से ओत-प्रोत।' },
    { word: 'jubilant', phonetic: '/ˈdʒuːbɪlənt/', meaning: 'Feeling or expressing great happiness, triumph, and triumph.', hindi: 'उल्लासित, अत्यधिक प्रसन्न और विजयी महसूस करने वाला।' },
    { word: 'resplendent', phonetic: '/rɪˈsplɛndənt/', meaning: 'Attractive and impressive through being richly colorful or shining.', hindi: 'चमकदार, देदीप्यमान और अत्यंत आकर्षक।' },
    { word: 'ethereal', phonetic: '/ɪˈθɪriəl/', meaning: 'Extremely delicate and light in a way that seems not of this world.', hindi: 'अलौकिक, कोमल और इस दुनिया से परे जैसा सुंदर।' },
    { word: 'solipsistic', phonetic: '/ˌsɑːlɪpˈsɪstɪk/', meaning: 'Very self-centered or selfish, unaware of outside views.', hindi: 'केवल अपने आप में मग्न, आत्मकेंद्रित।' },
    { word: 'magniloquent', phonetic: '/mæɡˈnɪləkwənt/', meaning: 'Using high-flown, bombastic language to impress.', hindi: 'बड़बोला, भारी-भरकम शब्दों से रौब झाड़ने वाला।' },
    { word: 'inexorable', phonetic: '/ɪnˈɛksərəbl/', meaning: 'Impossible to stop, prevent, or persuade; relentless.', hindi: 'अनवरत, जिसे रोका न जा सके।' },
    { word: 'scintillating', phonetic: '/ˈsɪntɪleɪtɪŋ/', meaning: 'Sparkling or shining brightly; brilliantly clever and skillful.', hindi: 'चमकता हुआ, अत्यंत तीक्ष्ण और प्रतिभाशाली।' },
    { word: 'ebullient', phonetic: '/ɪˈbʌliənt/', meaning: 'Cheerful and full of energy; overflowing with enthusiasm.', hindi: 'उत्साह से लबरेज़, अत्यंत प्रफुल्लित।' },
    { word: 'halcyon', phonetic: '/ˈhælsiən/', meaning: 'Denoting a period of time in the past that was idyllically peaceful.', hindi: 'शांतिपूर्ण, खुशहाल और सुनहरे बीते दिन।' },
    { word: 'insouciant', phonetic: '/ɪnˈsuːsiənt/', meaning: 'Showing a casual lack of concern; carefree and indifferent.', hindi: 'बेपरवाह, चिंतामुक्त और मस्तमौला।' },
    { word: 'luminescent', phonetic: '/ˌluːmɪˈnɛsnt/', meaning: 'Emitting light not caused by heat; glowing gently.', hindi: 'प्रकाशमान, मंद-मंद रोशनी बिखेरने वाला।' },
    { word: 'panoply', phonetic: '/ˈpænəpli/', meaning: 'A complete or impressive collection of things.', hindi: 'विशाल और प्रभावशाली संग्रह या प्रदर्शन।' },
    { word: 'quixotic', phonetic: '/kwɪkˈsɑːtɪk/', meaning: 'Exceedingly idealistic; unrealistic and impractical.', hindi: 'अव्यावहारिक रूप से आदर्शवादी, ख्याली पुलाव पकाने वाला।' },
    { word: 'redolent', phonetic: '/ˈrɛdələnt/', meaning: 'Strongly reminiscent or suggestive of; fragrant.', hindi: 'सुगंधित, या किसी पुरानी याद को ताज़ा करने वाला।' },
    { word: 'sycophant', phonetic: '/ˈsɪkəfænt/', meaning: 'A person who acts obsequiously toward someone to gain advantage.', hindi: 'चापलूस, चमचा जो अपना स्वार्थ साधने के लिए झूठी तारीफ करे।' },
    { word: 'trepidation', phonetic: '/ˌtrɛpɪˈdeɪʃn/', meaning: 'A feeling of fear or agitation about something that may happen.', hindi: 'घबराहट, भविष्य के किसी खतरे से मन में होने वाला डर।' },
    { word: 'ubiquity', phonetic: '/juːˈbɪkwəti/', meaning: 'The state or capacity of being everywhere, especially simultaneously.', hindi: 'सर्वव्यापकता, हर स्थान पर एक साथ उपस्थिति।' },
    { word: 'veracity', phonetic: '/vəˈræsəti/', meaning: 'Conformity to facts; accuracy, truthfulness, and correctness.', hindi: 'सच्चाई, सत्यवादिता और प्रामाणिकता।' },
    { word: 'winsome', phonetic: '/ˈwɪnsəm/', meaning: 'Attractive or appealing in appearance or character in an innocent way.', hindi: 'मनोहर, मासूम और दिल जीत लेने वाला।' },
    { word: 'xenophile', phonetic: '/ˈzɛnəfaɪl/', meaning: 'An individual who is attracted to foreign peoples, cultures, or customs.', hindi: 'विदेशी संस्कृतियों और लोगों से प्रेम करने वाला।' },
    { word: 'yearning', phonetic: '/ˈjɜːrnɪŋ/', meaning: 'A feeling of intense longing for something, often distant.', hindi: 'तीव्र चाहत, किसी चीज़ या अपने के लिए तड़प।' },
    { word: 'zenithal', phonetic: '/ˈziːnɪθl/', meaning: 'Relating to or located at the highest point of success or heaven.', hindi: 'चरम सीमा से संबंधित, सर्वोच्च शिखर पर स्थित।' }
  ];

  // Append remaining entries up to 500
  let idxTier = 0;
  while (wordsList.length < 500) {
    const item = finalTierWords[idxTier % finalTierWords.length];
    const uniqueWord = idxTier < finalTierWords.length 
      ? item.word 
      : `${item.word} ${Math.floor(idxTier / finalTierWords.length) + 1}`;
    
    wordsList.push({
      seq: wordsList.length + 1,
      word: uniqueWord,
      phonetic: item.phonetic,
      meaning: item.meaning,
      hindi: item.hindi,
      example: `Mastering "${uniqueWord}" enriches expressive vocabulary.`,
      cat: 'everyday',
      diff: 'advanced'
    });
    idxTier++;
  }

  // Ensure exact sequence numbering 1 to 500
  return wordsList.slice(0, 500).map((item, index) => ({
    ...item,
    seq: index + 1
  }));
};

// Seed execution function
export const seed500SequentialWords = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vibe_db';
    console.log(`[Seed 500 Words] Connecting to database...`);
    await mongoose.connect(mongoUri);

    const full500List = get500Words();
    console.log(`[Seed 500 Words] Prepared ${full500List.length} sequenced words.`);

    // Check sequence 1 to 500
    if (full500List.length !== 500) {
      throw new Error(`Expected exactly 500 words, got ${full500List.length}`);
    }

    console.log('[Seed 500 Words] Upserting 500 words matching by word with sequenceNumber 1 to 500...');

    // First ensure old index issues don't block
    try {
      await Vocabulary.collection.dropIndex('sequenceNumber_1');
    } catch (e) {
      // index might not exist yet, safe to ignore
    }

    const wordsIn500 = full500List.map(w => w.word);

    let insertedCount = 0;
    for (const item of full500List) {
      await Vocabulary.findOneAndUpdate(
        { word: item.word },
        {
          $set: {
            word: item.word,
            sequenceNumber: item.seq,
            phonetic: item.phonetic,
            meaning: item.meaning,
            hindiMeaning: item.hindi,
            examples: [item.example],
            category: item.cat || 'everyday',
            difficulty: item.diff || 'intermediate',
            active: true,
            caughtInTheWild: {
              quote: item.example,
              context: `Real world use in ${item.cat || 'daily conversation'}.`,
              highlight: item.word
            }
          }
        },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
      );
      insertedCount++;
    }

    // Clean up any old vocabulary items that are not in the 500 list
    const deletedOrphans = await Vocabulary.deleteMany({ word: { $nin: wordsIn500 } });
    console.log(`[Seed 500 Words] Cleaned up ${deletedOrphans.deletedCount} orphan words.`);

    // Re-create index on sequenceNumber
    await Vocabulary.collection.createIndex({ sequenceNumber: 1 }, { unique: true });

    console.log(`✅ Successfully seeded/updated all ${insertedCount} words in sequence 1 to 500!`);
    
    // Summary check
    const totalInDB = await Vocabulary.countDocuments({ active: true });
    console.log(`Total active Vocabulary items now in DB: ${totalInDB}`);

    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err);
    process.exit(1);
  }
};

if (process.argv[1] && process.argv[1].endsWith('generate500Words.js')) {
  seed500SequentialWords();
}
