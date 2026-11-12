// Middle track (ages ~11–13, Israeli grades 7–8, CEFR A2 – Ministry Intermediate-level grammar), units m09–m16.
export const UNITS_MB = [
  {
    id: "m09", title: "Can, Must, Should", he: "פעלים מודאליים", em: "🔧", theme: "snow",
    grade: "ז׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "Modals: can / could / be able to, must / have to, should, may / might",
      he: "אחרי פועל מודאלי באה צורת הבסיס של הפועל, בלי to ובלי s: she can swim. can = יכול עכשיו, could = יכול בעבר, be able to = יכול (בכל זמן). must = חובה שאני מרגיש, have to = חובה מבחוץ (חוק, הורים). should = עצה. may / might = אולי.",
      examples: [
        ["I can ride a bike.", "אני יודע לרכוב על אופניים."],
        ["She could read when she was four.", "היא ידעה לקרוא כשהייתה בת ארבע."],
        ["You must wear a helmet.", "אתה חייב לחבוש קסדה."],
        ["We have to wake up early tomorrow.", "אנחנו צריכים לקום מוקדם מחר."],
        ["You should drink more water.", "כדאי לך לשתות יותר מים."],
        ["It might rain later.", "אולי ירד גשם אחר כך."]
      ]
    },
    words: [
      ["helmet", "קסדה", "⛑️"], ["rule", "כלל, חוק", "📏"], ["allowed", "מותר", "✅"], ["forbidden", "אסור", "🚫"],
      ["advice", "עצה", "💡"], ["able", "מסוגל", "💪"], ["probably", "כנראה", ""], ["maybe", "אולי", "🤷"],
      ["license", "רישיון", "🪪"], ["seatbelt", "חגורת בטיחות", ""], ["permission", "רשות", "🙋"], ["necessary", "הכרחי", "❗"],
      ["careful", "זהיר", "⚠️"], ["skill", "מיומנות", "🎯"], ["mountain", "הר", "⛰️"], ["climb", "לטפס", "🧗"]
    ],
    sentences: [
      ["Can you help me with this box?", "אתה יכול לעזור לי עם הקופסה הזאת?"],
      ["I couldn't sleep last night.", "לא הצלחתי לישון אתמול בלילה."],
      ["You mustn't touch the stove.", "אסור לך לגעת בכיריים."],
      ["Do we have to wear a uniform?", "אנחנו חייבים ללבוש תלבושת אחידה?"],
      ["You should ask your teacher.", "כדאי לך לשאול את המורה."],
      ["She might come to the party.", "אולי היא תבוא למסיבה."],
      ["Will you be able to climb the mountain?", "תוכל לטפס על ההר?"],
      ["You don't have to pay, it's free.", "אתה לא חייב לשלם, זה בחינם."],
      ["May I open the window?", "אפשר לפתוח את החלון?"],
      ["He should be more careful.", "הוא צריך להיות יותר זהיר."]
    ],
    gaps: [
      { s: "She can ___ very fast.", options: ["run", "runs", "to run"], a: 0, he: "היא יודעת לרוץ מהר מאוד.", why: "אחרי can בא פועל בסיס בלי s ובלי to." },
      { s: "When I was five, I ___ swim.", options: ["can", "could", "must"], a: 1, he: "כשהייתי בן חמש ידעתי לשחות.", why: "could היא צורת העבר של can." },
      { s: "You ___ wear a seatbelt in the car. It's the law.", options: ["should", "might", "have to"], a: 2, he: "אתה חייב לחגור חגורת בטיחות במכונית. זה החוק.", why: "חובה שבאה מחוק = have to." },
      { s: "You look tired. You ___ go to bed.", options: ["should", "may", "could"], a: 0, he: "אתה נראה עייף. כדאי לך ללכת לישון.", why: "נותנים עצה עם should." },
      { s: "Take an umbrella. It ___ rain.", options: ["must", "might", "has to"], a: 1, he: "קח מטריה. אולי ירד גשם.", why: "might = אולי, משהו לא בטוח." },
      { s: "He ___ to finish his project by Sunday.", options: ["must", "has", "have"], a: 1, he: "הוא צריך לסיים את הפרויקט שלו עד יום ראשון.", why: "he + have to = he has to." },
      { s: "Students ___ use phones during the test.", options: ["mustn't", "don't have", "shouldn't to"], a: 0, he: "אסור לתלמידים להשתמש בטלפונים במבחן.", why: "mustn't = אסור." },
      { s: "You ___ bring food. We have a lot.", options: ["mustn't", "don't have to", "can't"], a: 1, he: "אתה לא חייב להביא אוכל. יש לנו הרבה.", why: "don't have to = לא חייב (אבל מותר)." },
      { s: "Will you ___ to come tomorrow?", options: ["can", "able", "be able"], a: 2, he: "תוכל לבוא מחר?", why: "אין can בעתיד, משתמשים ב-will be able to." },
      { s: "___ I use your pencil, please?", options: ["May", "Must", "Should"], a: 0, he: "אפשר להשתמש בעיפרון שלך, בבקשה?", why: "מבקשים רשות בנימוס עם May I." },
      { s: "She ___ speak three languages.", options: ["cans", "can", "can to"], a: 1, he: "היא יודעת לדבר שלוש שפות.", why: "can לא מקבל s אף פעם." },
      { s: "We ___ go to school yesterday because it snowed.", options: ["didn't have to", "mustn't", "don't have to"], a: 0, he: "לא היינו צריכים ללכת לבית הספר אתמול כי ירד שלג.", why: "בעבר: didn't have to." },
      { s: "I ___ find my keys anywhere!", options: ["can't", "mustn't", "shouldn't"], a: 0, he: "אני לא מוצא את המפתחות שלי בשום מקום!", why: "can't = לא מצליח." },
      { s: "You ___ eat so many sweets. It's bad for your teeth.", options: ["shouldn't", "might not", "don't can"], a: 0, he: "לא כדאי לך לאכול כל כך הרבה ממתקים. זה רע לשיניים.", why: "עצה שלילית = shouldn't." },
      { s: "Adam isn't here. He ___ be sick.", options: ["might", "has to", "should to"], a: 0, he: "אדם לא כאן. אולי הוא חולה.", why: "השערה לא בטוחה = might." }
    ],
    transforms: [
      { task: "Make it past (could)", q: "I can read. (when I was six)", a: "I could read when I was six.", alt: [], he: "can בעבר = could" },
      { task: "Advice (should)", q: "You / study / for the test", a: "You should study for the test.", alt: [], he: "should + פועל בסיס" },
      { task: "Negative (mustn't)", q: "You / run / in the hall", a: "You mustn't run in the hall.", alt: ["You must not run in the hall."], he: "אסור = mustn't" },
      { task: "Question (have to)", q: "she / wear / a uniform", a: "Does she have to wear a uniform?", alt: [], he: "שאלה עם does ... have to" },
      { task: "Future ability", q: "I can come tomorrow. (will)", a: "I will be able to come tomorrow.", alt: ["I'll be able to come tomorrow."], he: "will be able to" },
      { task: "Possibility (might)", q: "We / go / to the beach", a: "We might go to the beach.", alt: [], he: "might + פועל בסיס" },
      { task: "Polite request (may)", q: "I / leave / early", a: "May I leave early?", alt: [], he: "May I ...?" },
      { task: "Past obligation", q: "He has to help his dad. (yesterday)", a: "He had to help his dad yesterday.", alt: [], he: "have to בעבר = had to" }
    ],
    reading: {
      title: "The Mountain Trip", he: "הטיול להר",
      text: "Next week our class is going on a trip to Mount Meron. Our teacher, Mrs. Levi, told us the rules. First, we have to bring at least three liters of water, because it can be very hot in the afternoon. We must wear good shoes and a hat. We mustn't leave the path, because some places are dangerous. Phones are allowed, but we should keep them in our bags while we walk. Yael asked if she could bring her little dog. The teacher said no, because dogs aren't allowed in the nature reserve. Dan is worried because he couldn't finish the last trip; his legs hurt. This time he has been practicing every evening, so he will probably be able to climb to the top. The weather might change, so we should also bring a warm jacket. I can't wait!",
      questions: [
        { q: "How much water do the students have to bring?", he: "כמה מים התלמידים צריכים להביא?", options: ["One liter", "At least three liters", "No water"], a: 1 },
        { q: "Why mustn't they leave the path?", he: "למה אסור להם לצאת מהשביל?", options: ["Some places are dangerous", "It is too hot", "The teacher is tired"], a: 0 },
        { q: "Can Yael bring her dog?", he: "יעל יכולה להביא את הכלב שלה?", options: ["Yes, on a leash", "Only in the afternoon", "No, dogs aren't allowed"], a: 2 },
        { q: "Why should they bring a warm jacket?", he: "למה כדאי להם להביא מעיל חם?", options: ["It snows every day", "The weather might change", "The teacher said it is a rule"], a: 1 }
      ]
    }
  },
  {
    id: "m10", title: "What Were You Doing?", he: "עבר מתמשך", em: "⏳", theme: "cave",
    grade: "ז׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "Past progressive: was / were + verb-ing; when & while",
      he: "עבר מתמשך מתאר פעולה שהייתה באמצע ברגע מסוים בעבר: I was reading at 8 o'clock. I / he / she / it + was, you / we / they + were. פעולה ארוכה בעבר מתמשך, ופעולה קצרה שקטעה אותה בעבר פשוט. while לפני הפעולה הארוכה, when לפני הקצרה.",
      examples: [
        ["At 8 o'clock I was doing my homework.", "בשמונה הכנתי שיעורי בית."],
        ["They were playing football when it started to rain.", "הם שיחקו כדורגל כשהתחיל לרדת גשם."],
        ["While I was walking home, I saw a fox.", "בזמן שהלכתי הביתה, ראיתי שועל."],
        ["Were you sleeping when I called?", "ישנת כשהתקשרתי?"],
        ["She wasn't listening to the teacher.", "היא לא הקשיבה למורה."]
      ]
    },
    words: [
      ["while", "בזמן ש", "⏱️"], ["suddenly", "פתאום", "⚡"], ["thunder", "רעם", "🌩️"], ["lightning", "ברק", "🌩️"],
      ["power cut", "הפסקת חשמל", "🔌"], ["candle", "נר", "🕯️"], ["noise", "רעש", "🔊"], ["neighbor", "שכן", "🏘️"],
      ["accident", "תאונה", "🚑"], ["slip", "להחליק", ""], ["drop", "להפיל", ""], ["break", "לשבור", "💥"],
      ["flashlight", "פנס", "🔦"], ["scared", "מפוחד", "😨"], ["ring", "לצלצל", "🔔"], ["happen", "לקרות", ""]
    ],
    sentences: [
      ["What were you doing at nine last night?", "מה עשית בתשע אתמול בלילה?"],
      ["I was watching a movie when the power went out.", "צפיתי בסרט כשהחשמל נפל."],
      ["While Mom was cooking, Dad was cleaning.", "בזמן שאמא בישלה, אבא ניקה."],
      ["The phone rang while I was taking a shower.", "הטלפון צלצל בזמן שהתקלחתי."],
      ["We weren't sleeping; we were talking.", "לא ישנו; דיברנו."],
      ["She slipped while she was running.", "היא החליקה בזמן שרצה."],
      ["It was raining all morning.", "ירד גשם כל הבוקר."],
      ["Were they waiting for the bus?", "הם חיכו לאוטובוס?"],
      ["I dropped my phone when I was getting off the bus.", "הפלתי את הטלפון כשירדתי מהאוטובוס."],
      ["What happened while I was away?", "מה קרה בזמן שלא הייתי?"]
    ],
    gaps: [
      { s: "At 7 o'clock I ___ dinner.", options: ["was eating", "were eating", "eating"], a: 0, he: "בשבע אכלתי ארוחת ערב.", why: "I + was + ing." },
      { s: "They ___ in the park when it started to rain.", options: ["was playing", "were playing", "played"], a: 1, he: "הם שיחקו בפארק כשהתחיל לרדת גשם.", why: "they + were + ing." },
      { s: "While she was reading, the lights ___ out.", options: ["were going", "went", "go"], a: 1, he: "בזמן שהיא קראה, האורות כבו.", why: "הפעולה הקצרה שקטעה = עבר פשוט." },
      { s: "I ___ TV when you called.", options: ["watched", "was watching", "am watching"], a: 1, he: "צפיתי בטלוויזיה כשהתקשרת.", why: "פעולה ארוכה שנקטעה = עבר מתמשך." },
      { s: "___ you sleeping at midnight?", options: ["Was", "Did", "Were"], a: 2, he: "ישנת בחצות?", why: "שאלה: Were you + ing?" },
      { s: "He ___ listening, so he didn't hear the question.", options: ["wasn't", "weren't", "didn't"], a: 0, he: "הוא לא הקשיב, אז הוא לא שמע את השאלה.", why: "שלילה: he wasn't + ing." },
      { s: "___ I was walking to school, I met Noa.", options: ["When", "While", "During"], a: 1, he: "בזמן שהלכתי לבית הספר, פגשתי את נועה.", why: "while לפני הפעולה הארוכה." },
      { s: "We were having lunch ___ the phone rang.", options: ["while", "during", "when"], a: 2, he: "אכלנו ארוחת צהריים כשהטלפון צלצל.", why: "when לפני הפעולה הקצרה." },
      { s: "The children ___ a lot of noise.", options: ["was making", "were making", "were make"], a: 1, he: "הילדים עשו הרבה רעש.", why: "children = רבים, were + ing." },
      { s: "What ___ you doing when the accident happened?", options: ["were", "did", "was"], a: 0, he: "מה עשית כשהתאונה קרתה?", why: "What were you doing...?" },
      { s: "My sister ___ her arm while she was skiing.", options: ["was breaking", "broke", "breaks"], a: 1, he: "אחותי שברה את היד בזמן שגלשה בסקי.", why: "פעולה קצרה = עבר פשוט." },
      { s: "It ___ hard all night.", options: ["was raining", "were raining", "is raining"], a: 0, he: "ירד גשם חזק כל הלילה.", why: "it + was + ing." },
      { s: "I was ___ my bike when I saw the dog.", options: ["ride", "riding", "rode"], a: 1, he: "רכבתי על האופניים כשראיתי את הכלב.", why: "was + פועל עם ing." },
      { s: "While Dad was driving, we ___ songs.", options: ["were singing", "was singing", "sing"], a: 0, he: "בזמן שאבא נהג, שרנו שירים.", why: "שתי פעולות ארוכות באותו זמן: שתיהן בעבר מתמשך." }
    ],
    transforms: [
      { task: "Past progressive", q: "I / read / a book / at 9 pm", a: "I was reading a book at 9 pm.", alt: [], he: "was + ing" },
      { task: "Past progressive", q: "They / swim / in the pool", a: "They were swimming in the pool.", alt: [], he: "were + ing" },
      { task: "Negative", q: "She was sleeping.", a: "She wasn't sleeping.", alt: ["She was not sleeping."], he: "wasn't" },
      { task: "Question", q: "you / wait / for me", a: "Were you waiting for me?", alt: [], he: "Were you ...?" },
      { task: "Join with when", q: "I was cooking. The phone rang.", a: "I was cooking when the phone rang.", alt: ["When the phone rang, I was cooking."], he: "when לפני הפעולה הקצרה" },
      { task: "Join with while", q: "She fell. She was running.", a: "She fell while she was running.", alt: ["While she was running, she fell."], he: "while לפני הפעולה הארוכה" },
      { task: "Past progressive", q: "We / have / dinner / at 7", a: "We were having dinner at 7.", alt: [], he: "have → having" },
      { task: "Wh-question", q: "what / he / do / at noon", a: "What was he doing at noon?", alt: [], he: "What was he doing...?" }
    ],
    reading: {
      title: "The Night of the Storm", he: "ליל הסערה",
      text: "Last winter there was a big storm in our town. At eight o'clock my family was sitting in the living room. Dad was reading the newspaper, Mom was talking on the phone, and my little brother Ben was building a tower of blocks. I was doing my math homework. Suddenly there was a loud thunder and all the lights went out. Ben started to cry because he was scared. While Mom was looking for a flashlight, Dad lit some candles. We were sitting in the dark when somebody knocked on the door. It was our neighbor, Mr. Cohen. He was holding a big pot of hot soup! His wife was cooking when the power cut happened, and the soup was ready. We all ate soup by candlelight and told stories. It was the best power cut ever.",
      questions: [
        { q: "What was the writer doing at eight o'clock?", he: "מה הכותב עשה בשמונה?", options: ["Reading the newspaper", "Doing math homework", "Building a tower"], a: 1 },
        { q: "Why did Ben start to cry?", he: "למה בן התחיל לבכות?", options: ["He was scared", "His tower fell", "He was hungry"], a: 0 },
        { q: "What was Mr. Cohen holding?", he: "מה מר כהן החזיק?", options: ["A flashlight", "Candles", "A pot of soup"], a: 2 },
        { q: "How did the writer feel about the night?", he: "איך הכותב הרגיש לגבי הלילה?", options: ["It was terrible", "It was the best power cut ever", "It was boring"], a: 1 }
      ]
    }
  },
  {
    id: "m11", title: "Have You Ever...?", he: "הווה מושלם", em: "🌍", theme: "sky",
    grade: "ח׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "Present perfect: have / has + past participle (ever, never, already, yet, just, for, since)",
      he: "הווה מושלם מחבר בין העבר להווה: I have visited London (מתי? לא חשוב). he / she / it + has, השאר + have. ever / never = אי פעם / אף פעם, already / just = כבר / הרגע, yet = עדיין (בשאלה ובשלילה, בסוף המשפט). for + משך זמן, since + נקודת התחלה. אם יש זמן מדויק בעבר (yesterday, in 2020) משתמשים בעבר פשוט!",
      examples: [
        ["Have you ever been to Eilat?", "היית פעם באילת?"],
        ["I have never seen snow.", "אף פעם לא ראיתי שלג."],
        ["She has just finished her homework.", "היא הרגע סיימה את שיעורי הבית."],
        ["We have lived here for five years.", "אנחנו גרים כאן כבר חמש שנים."],
        ["He has known Dan since first grade.", "הוא מכיר את דן מכיתה א׳."],
        ["I went to Haifa yesterday.", "נסעתי לחיפה אתמול. (זמן מדויק = עבר פשוט)"]
      ]
    },
    words: [
      ["ever", "אי פעם", ""], ["already", "כבר", "✅"], ["yet", "עדיין (לא)", "⏳"], ["just", "הרגע", ""],
      ["since", "מאז", "📅"], ["abroad", "בחו\"ל", "✈️"], ["passport", "דרכון", "🛂"], ["experience", "חוויה, ניסיון", "🌟"],
      ["recently", "לאחרונה", ""], ["lately", "בזמן האחרון", ""], ["visit", "לבקר", "🧳"], ["taste", "לטעום", "😋"],
      ["sushi", "סושי", "🍣"], ["roller coaster", "רכבת הרים", "🎢"], ["volcano", "הר געש", "🌋"], ["desert", "מדבר", "🏜️"]
    ],
    sentences: [
      ["Have you ever eaten sushi?", "אכלת פעם סושי?"],
      ["I have never been on a roller coaster.", "אף פעם לא עליתי על רכבת הרים."],
      ["She has already done her homework.", "היא כבר הכינה את שיעורי הבית."],
      ["Has the bus arrived yet?", "האוטובוס כבר הגיע?"],
      ["We haven't decided yet.", "עוד לא החלטנו."],
      ["I've just seen a shooting star!", "הרגע ראיתי כוכב נופל!"],
      ["They have lived in Israel since 2015.", "הם גרים בישראל מאז 2015."],
      ["He has had this bike for three years.", "יש לו את האופניים האלה כבר שלוש שנים."],
      ["I visited my grandmother last Friday.", "ביקרתי את סבתא שלי ביום שישי שעבר."],
      ["How long have you known Maya?", "כמה זמן אתה מכיר את מאיה?"]
    ],
    gaps: [
      { s: "I have ___ to Jerusalem many times.", options: ["be", "been", "was"], a: 1, he: "הייתי בירושלים הרבה פעמים.", why: "have + צורה שלישית: been." },
      { s: "She ___ finished her project.", options: ["have", "has", "is"], a: 1, he: "היא סיימה את הפרויקט שלה.", why: "she + has." },
      { s: "Have you ___ seen a volcano?", options: ["ever", "yet", "since"], a: 0, he: "ראית פעם הר געש?", why: "ever בשאלות = אי פעם." },
      { s: "I haven't eaten breakfast ___.", options: ["already", "yet", "just"], a: 1, he: "עוד לא אכלתי ארוחת בוקר.", why: "yet בשלילה, בסוף המשפט." },
      { s: "We have lived here ___ ten years.", options: ["since", "for", "ago"], a: 1, he: "אנחנו גרים כאן כבר עשר שנים.", why: "for + משך זמן." },
      { s: "He has played the guitar ___ 2019.", options: ["for", "since", "from"], a: 1, he: "הוא מנגן בגיטרה מאז 2019.", why: "since + נקודת התחלה." },
      { s: "I ___ Eilat last summer.", options: ["have visited", "visited", "has visited"], a: 1, he: "ביקרתי באילת בקיץ שעבר.", why: "זמן מדויק בעבר (last summer) = עבר פשוט." },
      { s: "They have ___ left. You missed them!", options: ["just", "yet", "ever"], a: 0, he: "הם הרגע יצאו. פספסת אותם!", why: "just = הרגע, בין have לפועל." },
      { s: "My dad has never ___ sushi.", options: ["ate", "eaten", "eat"], a: 1, he: "אבא שלי אף פעם לא אכל סושי.", why: "eat – ate – eaten." },
      { s: "___ she called you yet?", options: ["Did", "Has", "Have"], a: 1, he: "היא כבר התקשרה אליך?", why: "שאלה בהווה מושלם עם she: Has she...?" },
      { s: "I have ___ written the email. Here it is.", options: ["already", "yet", "ever"], a: 0, he: "כבר כתבתי את המייל. הנה הוא.", why: "already = כבר, במשפט חיובי." },
      { s: "How long ___ you had this phone?", options: ["did", "have", "are"], a: 1, he: "כמה זמן יש לך את הטלפון הזה?", why: "How long have you...?" },
      { s: "We ___ the movie two days ago.", options: ["saw", "have seen", "has seen"], a: 0, he: "ראינו את הסרט לפני יומיים.", why: "ago = זמן מדויק בעבר = עבר פשוט." },
      { s: "She has known him ___ she was a child.", options: ["for", "since", "when"], a: 1, he: "היא מכירה אותו מאז שהייתה ילדה.", why: "since + נקודת זמן (גם משפט)." },
      { s: "Lily has ___ her passport. She can't find it!", options: ["lost", "lose", "losed"], a: 0, he: "לילי איבדה את הדרכון שלה. היא לא מוצאת אותו!", why: "lose – lost – lost." }
    ],
    transforms: [
      { task: "Present perfect", q: "I / visit / Paris", a: "I have visited Paris.", alt: ["I've visited Paris."], he: "have + V3" },
      { task: "Present perfect", q: "She / lose / her keys", a: "She has lost her keys.", alt: ["She's lost her keys."], he: "has + lost" },
      { task: "Question with ever", q: "you / see / a whale", a: "Have you ever seen a whale?", alt: [], he: "Have you ever + V3?" },
      { task: "Negative with yet", q: "We / finish / the game", a: "We haven't finished the game yet.", alt: ["We have not finished the game yet."], he: "haven't ... yet" },
      { task: "for or since", q: "I have lived here / 2018", a: "I have lived here since 2018.", alt: ["I've lived here since 2018."], he: "since + שנה" },
      { task: "for or since", q: "She has studied English / six years", a: "She has studied English for six years.", alt: ["She's studied English for six years."], he: "for + משך זמן" },
      { task: "Past simple (time given)", q: "I / go / to the zoo / yesterday", a: "I went to the zoo yesterday.", alt: [], he: "yesterday = עבר פשוט" },
      { task: "Present perfect with just", q: "The train / arrive", a: "The train has just arrived.", alt: [], he: "has just + V3" }
    ],
    reading: {
      title: "Noa's Travel Blog", he: "הבלוג של נועה",
      text: "Hi, I'm Noa and I love traveling! I have visited six countries so far. I have been to Greece, Italy and Cyprus with my family, and last summer we flew to Thailand. It was my first long flight. I have tasted many new foods, but I have never eaten insects, and I don't want to! My favorite experience was in Italy. We climbed a volcano called Vesuvius. I have never felt so tired, but the view was amazing. My brother Sam has already decided where he wants to go next: Japan. He has wanted to see Japan since he was eight, because he loves trains. We haven't booked the tickets yet, because Dad hasn't finished his work projects. Have you ever traveled abroad? Write to me and tell me about your trips!",
      questions: [
        { q: "How many countries has Noa visited?", he: "בכמה מדינות נועה ביקרה?", options: ["Three", "Six", "Eight"], a: 1 },
        { q: "What has Noa never eaten?", he: "מה נועה אף פעם לא אכלה?", options: ["Insects", "Pizza", "Sushi"], a: 0 },
        { q: "Why does Sam want to go to Japan?", he: "למה סם רוצה לנסוע ליפן?", options: ["He loves volcanoes", "His friend lives there", "He loves trains"], a: 2 },
        { q: "Why haven't they booked tickets yet?", he: "למה הם עוד לא הזמינו כרטיסים?", options: ["Tickets are too expensive", "Dad hasn't finished his work projects", "Noa doesn't want to go"], a: 1 }
      ]
    }
  },
  {
    id: "m12", title: "Love Reading, Want to Play", he: "שם פועל ו-ing", em: "🎭", theme: "castle",
    grade: "ח׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "Gerunds (-ing) & infinitives (to + verb); let / help / make + base verb",
      he: "אחרי פעלים מסוימים בא ing: enjoy, finish, mind, stop, avoid, practice (I enjoy reading). אחרי אחרים בא to + פועל: want, decide, hope, need, plan, learn (I want to play). אחרי like / love / hate / start אפשר את שניהם. אחרי מילת יחס תמיד ing: good at drawing. let / make / help + פועל בסיס בלי to: Mom let me stay up.",
      examples: [
        ["I enjoy playing chess.", "אני נהנה לשחק שחמט."],
        ["She wants to become a doctor.", "היא רוצה להיות רופאה."],
        ["He is good at drawing.", "הוא טוב בציור."],
        ["My parents let me go to the party.", "ההורים שלי הרשו לי ללכת למסיבה."],
        ["The movie made me cry.", "הסרט גרם לי לבכות."]
      ]
    },
    words: [
      ["enjoy", "ליהנות", "😄"], ["avoid", "להימנע", "🙅"], ["mind", "להתנגד, להפריע", ""], ["practice", "להתאמן", "🏋️"],
      ["decide", "להחליט", "🤔"], ["hope", "לקוות", "🤞"], ["plan", "לתכנן", "🗓️"], ["refuse", "לסרב", "✋"],
      ["let", "להרשות", ""], ["make", "לגרום, להכריח", ""], ["chess", "שחמט", "♟️"], ["piano", "פסנתר", "🎹"],
      ["hobby", "תחביב", "🎨"], ["interested", "מתעניין", "🧐"], ["afraid", "מפחד", "😟"], ["keen", "להוט", ""]
    ],
    sentences: [
      ["I don't mind waiting.", "לא אכפת לי לחכות."],
      ["She decided to learn the piano.", "היא החליטה ללמוד פסנתר."],
      ["Stop talking and listen, please.", "תפסיקו לדבר ותקשיבו, בבקשה."],
      ["We hope to see you soon.", "אנחנו מקווים לראות אותך בקרוב."],
      ["He is interested in building robots.", "הוא מתעניין בבניית רובוטים."],
      ["My teacher made us rewrite the essay.", "המורה שלי גרם לנו לכתוב מחדש את החיבור."],
      ["Can you help me carry these bags?", "אתה יכול לעזור לי לסחוב את התיקים האלה?"],
      ["I'm afraid of flying.", "אני מפחד לטוס."],
      ["They refused to give up.", "הם סירבו לוותר."],
      ["Thank you for helping me.", "תודה שעזרת לי."]
    ],
    gaps: [
      { s: "I enjoy ___ books.", options: ["to read", "reading", "read"], a: 1, he: "אני נהנה לקרוא ספרים.", why: "אחרי enjoy בא ing." },
      { s: "She wants ___ a pilot.", options: ["to become", "becoming", "become"], a: 0, he: "היא רוצה להיות טייסת.", why: "אחרי want בא to + פועל." },
      { s: "He finished ___ his homework at six.", options: ["to do", "doing", "do"], a: 1, he: "הוא סיים להכין את שיעורי הבית בשש.", why: "אחרי finish בא ing." },
      { s: "We decided ___ by train.", options: ["going", "to go", "go"], a: 1, he: "החלטנו לנסוע ברכבת.", why: "אחרי decide בא to + פועל." },
      { s: "My mom let me ___ up late.", options: ["stay", "to stay", "staying"], a: 0, he: "אמא שלי הרשתה לי להישאר ער עד מאוחר.", why: "let + פועל בסיס בלי to." },
      { s: "Maya is good at ___.", options: ["to sing", "sing", "singing"], a: 2, he: "מאיה טובה בשירה.", why: "אחרי מילת יחס (at) תמיד ing." },
      { s: "Do you mind ___ the door?", options: ["closing", "to close", "close"], a: 0, he: "אכפת לך לסגור את הדלת?", why: "אחרי mind בא ing." },
      { s: "The sad movie made me ___.", options: ["to cry", "cry", "crying"], a: 1, he: "הסרט העצוב גרם לי לבכות.", why: "make + פועל בסיס." },
      { s: "They hope ___ the competition.", options: ["winning", "to win", "win"], a: 1, he: "הם מקווים לנצח בתחרות.", why: "אחרי hope בא to + פועל." },
      { s: "You should avoid ___ junk food.", options: ["eating", "to eat", "eat"], a: 0, he: "כדאי לך להימנע מאכילת ג׳אנק פוד.", why: "אחרי avoid בא ing." },
      { s: "___ is good for your health.", options: ["Swim", "Swimming", "To swimming"], a: 1, he: "שחייה טובה לבריאות.", why: "ing יכול להיות נושא המשפט." },
      { s: "Ben is learning ___ the guitar.", options: ["play", "playing", "to play"], a: 2, he: "בן לומד לנגן בגיטרה.", why: "learn + to + פועל." },
      { s: "Can you help me ___ the table?", options: ["set", "setting", "sets"], a: 0, he: "אתה יכול לעזור לי לערוך את השולחן?", why: "help + פועל בסיס." },
      { s: "I'm interested in ___ about space.", options: ["learn", "to learn", "learning"], a: 2, he: "אני מתעניין ללמוד על החלל.", why: "in = מילת יחס, אחריה ing." },
      { s: "He refused ___ sorry.", options: ["saying", "to say", "say"], a: 1, he: "הוא סירב להגיד סליחה.", why: "אחרי refuse בא to + פועל." }
    ],
    transforms: [
      { task: "enjoy + ing", q: "I / enjoy / swim", a: "I enjoy swimming.", alt: [], he: "enjoy + ing" },
      { task: "want + to", q: "She / want / travel / abroad", a: "She wants to travel abroad.", alt: [], he: "want + to" },
      { task: "let + base verb", q: "Dad / let / me / drive the boat", a: "Dad let me drive the boat.", alt: ["Dad lets me drive the boat."], he: "let + פועל בסיס" },
      { task: "make + base verb", q: "The teacher / make / us / clean the room", a: "The teacher made us clean the room.", alt: ["The teacher makes us clean the room."], he: "make + פועל בסיס" },
      { task: "Preposition + ing", q: "He is good at / draw", a: "He is good at drawing.", alt: [], he: "at + ing" },
      { task: "stop + ing", q: "Please / stop / shout", a: "Please stop shouting.", alt: [], he: "stop + ing" },
      { task: "decide + to", q: "We / decide / leave early", a: "We decided to leave early.", alt: [], he: "decide + to" },
      { task: "Gerund as subject", q: "Read / before bed / is relaxing", a: "Reading before bed is relaxing.", alt: [], he: "ing בתחילת המשפט" }
    ],
    reading: {
      title: "Adam's New Hobby", he: "התחביב החדש של אדם",
      text: "Adam always enjoyed playing computer games, but last year his parents decided to make a new rule: only one hour of screens a day. At first Adam refused to accept it. He hated sitting at home with nothing to do. Then his grandfather offered to teach him chess. Adam wasn't interested in learning an old game, but his grandfather made him try one game. To his surprise, Adam loved it! Now he practices playing every evening, and he has started reading chess books. He hopes to join the school chess club next month. His sister Yael is keen on cooking, so their mom lets her make dinner on Fridays. Adam says: \"I don't mind having less screen time now. Thinking about my next move is more fun than shooting monsters.\"",
      questions: [
        { q: "What was the new rule?", he: "מה היה הכלל החדש?", options: ["No chess at home", "Only one hour of screens a day", "Dinner at six every day"], a: 1 },
        { q: "Who taught Adam chess?", he: "מי לימד את אדם שחמט?", options: ["His grandfather", "His sister", "His teacher"], a: 0 },
        { q: "What does Adam hope to do next month?", he: "מה אדם מקווה לעשות בחודש הבא?", options: ["Buy a new game", "Cook dinner", "Join the school chess club"], a: 2 },
        { q: "What does Yael enjoy?", he: "ממה יעל נהנית?", options: ["Playing chess", "Cooking", "Shooting monsters"], a: 1 }
      ]
    }
  },
  {
    id: "m13", title: "The Boy Who...", he: "משפטי זיקה", em: "🔗", theme: "grass",
    grade: "ח׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "Relative clauses: who / which / that; where / when",
      he: "משפט זיקה מוסיף מידע על שם עצם, כמו \"ש...\" בעברית. who לאנשים, which לחפצים ובעלי חיים, that לשניהם. where למקומות (המקום שבו), when לזמנים (היום שבו). לא חוזרים על הנושא: The boy who lives here (ולא who he lives).",
      examples: [
        ["The girl who sits next to me is Lily.", "הילדה שיושבת לידי היא לילי."],
        ["This is the phone which I bought.", "זה הטלפון שקניתי."],
        ["I like books that have happy endings.", "אני אוהב ספרים שיש להם סוף טוב."],
        ["This is the park where we play.", "זה הפארק שבו אנחנו משחקים."],
        ["Friday is the day when we visit Grandma.", "שישי הוא היום שבו אנחנו מבקרים את סבתא."]
      ]
    },
    words: [
      ["who", "ש (לאנשים)", "🧑"], ["which", "ש (לדברים)", "📦"], ["that", "ש", ""], ["where", "שבו (מקום)", "📍"],
      ["inventor", "ממציא", "💡"], ["invent", "להמציא", ""], ["author", "סופר", "✍️"], ["character", "דמות", "🦸"],
      ["museum", "מוזיאון", "🏛️"], ["village", "כפר", "🏡"], ["coach", "מאמן", "🧢"], ["tool", "כלי", "🛠️"],
      ["object", "חפץ", ""], ["describe", "לתאר", ""], ["famous", "מפורסם", "⭐"], ["machine", "מכונה", "⚙️"]
    ],
    sentences: [
      ["He is the coach who trains our team.", "הוא המאמן שמאמן את הקבוצה שלנו."],
      ["A hammer is a tool which we use to hit nails.", "פטיש הוא כלי שמשתמשים בו כדי לדפוק מסמרים."],
      ["That's the village where my grandparents live.", "זה הכפר שבו גרים סבא וסבתא שלי."],
      ["I remember the day when I got my first bike.", "אני זוכר את היום שבו קיבלתי את האופניים הראשונים שלי."],
      ["The author who wrote this book is famous.", "הסופר שכתב את הספר הזה מפורסם."],
      ["Do you know the boy that won the race?", "אתה מכיר את הילד שניצח במירוץ?"],
      ["This is the museum which has the old machines.", "זה המוזיאון שיש בו את המכונות הישנות."],
      ["Where's the cake that Mom baked?", "איפה העוגה שאמא אפתה?"]
    ],
    gaps: [
      { s: "The man ___ lives next door is a pilot.", options: ["which", "who", "where"], a: 1, he: "האיש שגר בבית הסמוך הוא טייס.", why: "who לאנשים." },
      { s: "I lost the watch ___ my dad gave me.", options: ["which", "who", "where"], a: 0, he: "איבדתי את השעון שאבא שלי נתן לי.", why: "which לחפצים." },
      { s: "This is the school ___ I study.", options: ["which", "where", "who"], a: 1, he: "זה בית הספר שבו אני לומד.", why: "where למקום." },
      { s: "Do you remember the day ___ we met?", options: ["when", "where", "who"], a: 0, he: "אתה זוכר את היום שבו נפגשנו?", why: "when לזמן." },
      { s: "A dolphin is an animal ___ is very smart.", options: ["who", "that", "where"], a: 1, he: "דולפין הוא בעל חיים שהוא חכם מאוד.", why: "that מתאים לבעלי חיים ולחפצים." },
      { s: "The girl who ___ the prize is my cousin.", options: ["won", "she won", "who won"], a: 0, he: "הילדה שזכתה בפרס היא בת הדודה שלי.", why: "לא חוזרים על הנושא אחרי who." },
      { s: "Edison was an inventor ___ changed the world.", options: ["which", "who", "when"], a: 1, he: "אדיסון היה ממציא ששינה את העולם.", why: "who לאדם." },
      { s: "The pizza ___ we ordered was cold.", options: ["who", "where", "that"], a: 2, he: "הפיצה שהזמנו הייתה קרה.", why: "that לחפץ." },
      { s: "Tel Aviv is the city ___ I was born.", options: ["where", "which", "when"], a: 0, he: "תל אביב היא העיר שבה נולדתי.", why: "where למקום." },
      { s: "I have a friend ___ speaks four languages.", options: ["which", "who", "whose"], a: 1, he: "יש לי חבר שמדבר ארבע שפות.", why: "who לאנשים." },
      { s: "Summer is the season ___ we go to the beach.", options: ["where", "which", "when"], a: 2, he: "קיץ היא העונה שבה אנחנו הולכים לים.", why: "when לזמן." },
      { s: "The book ___ is on the table is mine.", options: ["which", "who", "where"], a: 0, he: "הספר שנמצא על השולחן שלי.", why: "which לחפץ." },
      { s: "That's the coach ___ helped me a lot.", options: ["which", "where", "that"], a: 2, he: "זה המאמן שעזר לי הרבה.", why: "that יכול להיות גם לאנשים." },
      { s: "The museum ___ we visited was huge.", options: ["who", "which", "when"], a: 1, he: "המוזיאון שביקרנו בו היה ענק.", why: "which לדבר (מוזיאון כאן הוא מושא, לא מקום)." }
    ],
    transforms: [
      { task: "Join with who", q: "I have a friend. He plays the drums.", a: "I have a friend who plays the drums.", alt: ["I have a friend that plays the drums."], he: "who במקום he" },
      { task: "Join with which", q: "This is the bike. I bought it last week.", a: "This is the bike which I bought last week.", alt: ["This is the bike that I bought last week."], he: "which במקום it" },
      { task: "Join with where", q: "This is the café. We met there.", a: "This is the café where we met.", alt: [], he: "where במקום there" },
      { task: "Join with when", q: "I remember the day. I broke my arm then.", a: "I remember the day when I broke my arm.", alt: [], he: "when במקום then" },
      { task: "Join with who", q: "The woman is a doctor. She lives upstairs.", a: "The woman who lives upstairs is a doctor.", alt: ["The woman that lives upstairs is a doctor."], he: "משפט הזיקה באמצע" },
      { task: "Join with that", q: "The cake was delicious. Mom made it.", a: "The cake that Mom made was delicious.", alt: ["The cake which Mom made was delicious."], he: "that במקום it" },
      { task: "Define (who)", q: "A teacher / a person / teaches students", a: "A teacher is a person who teaches students.", alt: ["A teacher is a person that teaches students."], he: "a person who..." },
      { task: "Define (which)", q: "A fridge / a machine / keeps food cold", a: "A fridge is a machine which keeps food cold.", alt: ["A fridge is a machine that keeps food cold."], he: "a machine which..." }
    ],
    reading: {
      title: "The Museum of Inventions", he: "מוזיאון ההמצאות",
      text: "Last week our class visited a museum which shows famous inventions. Our guide was a young woman who knew everything about machines. First she showed us the telephone that Alexander Graham Bell invented in 1876. Then we saw a room where there were old computers. Some of them were as big as a car! Tom, who loves technology, asked a lot of questions. The guide told us about Hedy Lamarr, an actress who also invented an important radio system. Many of the phones that we use today depend on her idea. My favorite part was the hall where we could build simple machines with our own hands. Yael built a little car which moved with the power of a balloon. The museum closes at five, which was too early for us. I want to go back on a day when I have more time.",
      questions: [
        { q: "Who was the guide?", he: "מי הייתה המדריכה?", options: ["A young woman who knew about machines", "A famous actress", "Tom's mother"], a: 0 },
        { q: "What was special about the old computers?", he: "מה היה מיוחד במחשבים הישנים?", options: ["They were very small", "Some were as big as a car", "They could fly"], a: 1 },
        { q: "What did Hedy Lamarr invent?", he: "מה הדי למאר המציאה?", options: ["The telephone", "A balloon car", "An important radio system"], a: 2 },
        { q: "What did Yael build?", he: "מה יעל בנתה?", options: ["A small car powered by a balloon", "A radio", "A computer"], a: 0 }
      ]
    }
  },
  {
    id: "m14", title: "If It Rains...", he: "משפטי תנאי", em: "☔", theme: "desert",
    grade: "ח׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "First conditional & time clauses: if / when / as soon as / unless + present, will + verb",
      he: "תנאי אמיתי לעתיד: If + הווה פשוט, will + פועל. If it rains, we will stay home. אחרי if, when, as soon as, before, after, unless לא שמים will, אפילו כשמדברים על העתיד! unless = אם לא. אפשר להפוך את הסדר: We will stay home if it rains (בלי פסיק).",
      examples: [
        ["If you study, you will pass the test.", "אם תלמד, תעבור את המבחן."],
        ["If it rains, we won't go to the beach.", "אם ירד גשם, לא נלך לים."],
        ["I'll call you as soon as I arrive.", "אתקשר אליך ברגע שאגיע."],
        ["When I finish, I'll help you.", "כשאסיים, אעזור לך."],
        ["You'll be late unless you hurry.", "תאחר אם לא תמהר."]
      ]
    },
    words: [
      ["if", "אם", "❓"], ["unless", "אלא אם, אם לא", ""], ["as soon as", "ברגע ש", "⏱️"], ["condition", "תנאי", ""],
      ["pass", "לעבור (מבחן)", "✅"], ["fail", "להיכשל", "❌"], ["miss", "לפספס", "🚌"], ["hurry", "למהר", "🏃"],
      ["umbrella", "מטריה", "☂️"], ["sunscreen", "קרם הגנה", "🧴"], ["sunburn", "כוויית שמש", "🥵"], ["camp", "מחנה, לקמפינג", "🏕️"],
      ["tent", "אוהל", "⛺"], ["promise", "להבטיח", "🤝"], ["weather", "מזג אוויר", "🌤️"], ["forecast", "תחזית", "📺"]
    ],
    sentences: [
      ["If you don't hurry, you'll miss the bus.", "אם לא תמהר, תפספס את האוטובוס."],
      ["If I win the game, I'll buy everyone ice cream.", "אם אנצח במשחק, אקנה לכולם גלידה."],
      ["We'll go camping if the weather is nice.", "נצא לקמפינג אם מזג האוויר יהיה נעים."],
      ["You'll get a sunburn unless you use sunscreen.", "תקבל כוויית שמש אם לא תשתמש בקרם הגנה."],
      ["I'll text you as soon as I get home.", "אשלח לך הודעה ברגע שאגיע הביתה."],
      ["What will you do if you fail the test?", "מה תעשה אם תיכשל במבחן?"],
      ["When the movie ends, we'll go out to eat.", "כשהסרט ייגמר, נצא לאכול."],
      ["If she asks, I'll tell her the truth.", "אם היא תשאל, אגיד לה את האמת."],
      ["I promise I'll help you if you need me.", "אני מבטיח שאעזור לך אם תצטרך אותי."]
    ],
    gaps: [
      { s: "If it ___ tomorrow, we will stay home.", options: ["will rain", "rains", "rain"], a: 1, he: "אם ירד גשם מחר, נישאר בבית.", why: "אחרי if בא הווה פשוט, לא will." },
      { s: "If you study hard, you ___ the test.", options: ["pass", "will pass", "passed"], a: 1, he: "אם תלמד קשה, תעבור את המבחן.", why: "בחלק של התוצאה: will + פועל." },
      { s: "I'll call you as soon as I ___.", options: ["arrive", "will arrive", "arrived"], a: 0, he: "אתקשר אליך ברגע שאגיע.", why: "אחרי as soon as בא הווה פשוט." },
      { s: "You'll be cold ___ you take a jacket.", options: ["if", "unless", "when"], a: 1, he: "יהיה לך קר אם לא תיקח מעיל.", why: "unless = אם לא." },
      { s: "If she ___ the bus, she'll be late.", options: ["misses", "will miss", "miss"], a: 0, he: "אם היא תפספס את האוטובוס, היא תאחר.", why: "she + הווה פשוט עם s." },
      { s: "When I ___ my homework, I'll play outside.", options: ["finish", "will finish", "finished"], a: 0, he: "כשאסיים את שיעורי הבית, אשחק בחוץ.", why: "אחרי when (עתיד) בא הווה פשוט." },
      { s: "If we don't hurry, we ___ the start.", options: ["miss", "won't miss", "will miss"], a: 2, he: "אם לא נמהר, נפספס את ההתחלה.", why: "תוצאה = will + פועל." },
      { s: "What will you do if your team ___?", options: ["loses", "will lose", "lose"], a: 0, he: "מה תעשה אם הקבוצה שלך תפסיד?", why: "team = יחיד, הווה עם s." },
      { s: "If you eat too much, you ___ feel well.", options: ["don't", "won't", "aren't"], a: 1, he: "אם תאכל יותר מדי, לא תרגיש טוב.", why: "שלילה בעתיד = won't." },
      { s: "I won't go ___ you come with me.", options: ["unless", "if", "as soon as"], a: 0, he: "לא אלך אם לא תבוא איתי.", why: "unless = אם לא." },
      { s: "If the forecast ___ right, it will be hot.", options: ["is", "will be", "be"], a: 0, he: "אם התחזית נכונה, יהיה חם.", why: "אחרי if: הווה פשוט." },
      { s: "She ___ happy if you visit her.", options: ["is being", "will be", "be"], a: 1, he: "היא תשמח אם תבקר אותה.", why: "תוצאה בעתיד = will be." },
      { s: "Before you ___, turn off the lights.", options: ["will leave", "leave", "leaving"], a: 1, he: "לפני שאתה יוצא, כבה את האורות.", why: "אחרי before: הווה פשוט." },
      { s: "If I ___ time, I'll help you.", options: ["have", "will have", "had"], a: 0, he: "אם יהיה לי זמן, אעזור לך.", why: "if + הווה פשוט." }
    ],
    transforms: [
      { task: "First conditional", q: "If / it / snow / we / build a snowman", a: "If it snows, we will build a snowman.", alt: ["If it snows, we'll build a snowman."], he: "If + הווה, will + פועל" },
      { task: "First conditional", q: "If / you / not hurry / you / miss the train", a: "If you don't hurry, you will miss the train.", alt: ["If you don't hurry, you'll miss the train."], he: "don't בחלק של if" },
      { task: "Use unless", q: "If you don't study, you will fail.", a: "Unless you study, you will fail.", alt: ["You will fail unless you study."], he: "unless = if not" },
      { task: "as soon as", q: "I / call you / as soon as / I / land", a: "I will call you as soon as I land.", alt: ["I'll call you as soon as I land."], he: "אחרי as soon as בלי will" },
      { task: "when", q: "When / Dad / come home / we / eat dinner", a: "When Dad comes home, we will eat dinner.", alt: ["When Dad comes home, we'll eat dinner."], he: "Dad comes (עם s)" },
      { task: "Question", q: "What / you / do / if / it / rain", a: "What will you do if it rains?", alt: [], he: "What will you do if...?" },
      { task: "Reverse the order", q: "If she calls, I will answer.", a: "I will answer if she calls.", alt: ["I'll answer if she calls."], he: "בלי פסיק כש-if באמצע" },
      { task: "Negative result", q: "If / you / use sunscreen / you / not get a sunburn", a: "If you use sunscreen, you won't get a sunburn.", alt: ["If you use sunscreen, you will not get a sunburn."], he: "won't" }
    ],
    reading: {
      title: "The Camping Plan", he: "תוכנית הקמפינג",
      text: "Sam and his friends are planning a camping trip in the Negev desert next weekend. Sam's father checked the forecast. \"If the weather is good, we will leave on Thursday afternoon,\" he said. \"But if there is a sandstorm, we'll stay home and go another time.\" The boys made a list. If they forget the tent, they won't have anywhere to sleep, so Ben promised to bring it. Dan will bring the food as soon as his mom finishes baking. \"You'll get a sunburn unless you use sunscreen,\" said Sam's mother, so everybody packed a bottle. Sam is excited. \"When it gets dark, we will look at the stars,\" he said. \"There are no city lights in the desert, so we will see thousands of them. If we are lucky, we'll even see a shooting star!\"",
      questions: [
        { q: "When will they leave if the weather is good?", he: "מתי הם ייצאו אם מזג האוויר יהיה טוב?", options: ["On Friday morning", "On Thursday afternoon", "Next month"], a: 1 },
        { q: "What will happen if there is a sandstorm?", he: "מה יקרה אם תהיה סופת חול?", options: ["They will stay home", "They will sleep in the car", "They will go to the beach"], a: 0 },
        { q: "Who will bring the tent?", he: "מי יביא את האוהל?", options: ["Dan", "Sam's father", "Ben"], a: 2 },
        { q: "Why will they see many stars?", he: "למה הם יראו הרבה כוכבים?", options: ["They have a telescope", "There are no city lights in the desert", "It will be a full moon"], a: 1 }
      ]
    }
  },
  {
    id: "m15", title: "It Was Made in...", he: "סביל", em: "🏭", theme: "snow",
    grade: "ח׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "Passive: am / is / are / was / were + past participle (+ by); modal + be + past participle",
      he: "בסביל, מה שקרה לדבר חשוב יותר ממי שעשה אותו: English is spoken here. בהווה: am / is / are + צורה שלישית. בעבר: was / were + צורה שלישית. מי שעשה את הפעולה מופיע אחרי by (אם חשוב). עם מודאלים: must be done, can be seen.",
      examples: [
        ["Hebrew is spoken in Israel.", "מדברים עברית בישראל."],
        ["This bridge was built in 1920.", "הגשר הזה נבנה ב-1920."],
        ["The letters are delivered every morning.", "המכתבים מחולקים כל בוקר."],
        ["Harry Potter was written by J.K. Rowling.", "הארי פוטר נכתב על ידי ג׳.ק. רולינג."],
        ["Phones must be turned off.", "יש לכבות את הטלפונים."]
      ]
    },
    words: [
      ["factory", "מפעל", "🏭"], ["produce", "לייצר", ""], ["build", "לבנות", "🏗️"], ["grow", "לגדל", "🌱"],
      ["discover", "לגלות", "🔍"], ["deliver", "לחלק, למסור", "📦"], ["recycle", "למחזר", "♻️"], ["plastic", "פלסטיק", ""],
      ["cotton", "כותנה", ""], ["wood", "עץ (חומר)", "🪵"], ["gold", "זהב", "🥇"], ["chocolate", "שוקולד", "🍫"],
      ["bridge", "גשר", "🌉"], ["paint", "לצבוע, לצייר", "🎨"], ["steal", "לגנוב", ""], ["export", "לייצא", "🚢"]
    ],
    sentences: [
      ["Oranges are grown in Israel.", "מגדלים תפוזים בישראל."],
      ["This shirt is made of cotton.", "החולצה הזאת עשויה מכותנה."],
      ["The Mona Lisa was painted by Leonardo da Vinci.", "המונה ליזה צוירה על ידי לאונרדו דה וינצ׳י."],
      ["My bike was stolen last night.", "האופניים שלי נגנבו אתמול בלילה."],
      ["Plastic bottles can be recycled.", "אפשר למחזר בקבוקי פלסטיק."],
      ["Where was this photo taken?", "איפה צולמה התמונה הזאת?"],
      ["The pizza will be delivered in twenty minutes.", "הפיצה תגיע בעוד עשרים דקות."],
      ["Gold was discovered here 100 years ago.", "זהב התגלה כאן לפני 100 שנה."],
      ["Chocolate is produced in this factory.", "מייצרים שוקולד במפעל הזה."],
      ["The homework must be done by Sunday.", "יש להכין את שיעורי הבית עד יום ראשון."]
    ],
    gaps: [
      { s: "English ___ spoken all over the world.", options: ["is", "are", "was"], a: 0, he: "מדברים אנגלית בכל העולם.", why: "English = יחיד, הווה: is + V3." },
      { s: "These cars are ___ in Japan.", options: ["make", "made", "making"], a: 1, he: "המכוניות האלה מיוצרות ביפן.", why: "סביל: be + צורה שלישית (made)." },
      { s: "The Pyramids ___ built thousands of years ago.", options: ["were", "are", "was"], a: 0, he: "הפירמידות נבנו לפני אלפי שנים.", why: "רבים בעבר: were + V3." },
      { s: "My wallet was ___ on the bus.", options: ["stole", "stealing", "stolen"], a: 2, he: "הארנק שלי נגנב באוטובוס.", why: "steal – stole – stolen." },
      { s: "The book was written ___ a famous author.", options: ["from", "by", "with"], a: 1, he: "הספר נכתב על ידי סופר מפורסם.", why: "מי שעשה את הפעולה בא אחרי by." },
      { s: "Newspapers ___ delivered every morning.", options: ["is", "are", "be"], a: 1, he: "עיתונים מחולקים כל בוקר.", why: "רבים בהווה: are + V3." },
      { s: "This photo was ___ in Eilat.", options: ["took", "taken", "take"], a: 1, he: "התמונה הזאת צולמה באילת.", why: "take – took – taken." },
      { s: "Bottles can ___ recycled.", options: ["be", "is", "being"], a: 0, he: "אפשר למחזר בקבוקים.", why: "מודאל + be + V3." },
      { s: "Oranges ___ in Spain.", options: ["grow", "are grown", "is grown"], a: 1, he: "מגדלים תפוזים בספרד.", why: "סביל רבים: are grown." },
      { s: "The window ___ broken yesterday.", options: ["is", "was", "were"], a: 1, he: "החלון נשבר אתמול.", why: "yesterday = עבר; window יחיד = was." },
      { s: "Phones must be ___ off during the show.", options: ["turned", "turn", "turning"], a: 0, he: "יש לכבות טלפונים במהלך ההופעה.", why: "must be + V3." },
      { s: "When ___ the telephone invented?", options: ["did", "was", "is"], a: 1, he: "מתי הומצא הטלפון?", why: "שאלה בסביל בעבר: When was ... invented?" },
      { s: "Rice ___ eaten in many countries.", options: ["is", "are", "were"], a: 0, he: "אוכלים אורז בהרבה מדינות.", why: "rice = לא ספיר, יחיד: is." },
      { s: "The thief was ___ by the police.", options: ["catch", "caught", "catched"], a: 1, he: "הגנב נתפס על ידי המשטרה.", why: "catch – caught – caught." }
    ],
    transforms: [
      { task: "Passive (present)", q: "They speak Arabic in Egypt.", a: "Arabic is spoken in Egypt.", alt: [], he: "is + spoken" },
      { task: "Passive (past)", q: "Shakespeare wrote Hamlet.", a: "Hamlet was written by Shakespeare.", alt: [], he: "was written by" },
      { task: "Passive (present)", q: "They make chocolate in this factory.", a: "Chocolate is made in this factory.", alt: [], he: "is made" },
      { task: "Passive (past)", q: "Someone stole my bike.", a: "My bike was stolen.", alt: [], he: "was stolen" },
      { task: "Passive (past, plural)", q: "They built these houses in 1950.", a: "These houses were built in 1950.", alt: [], he: "were built" },
      { task: "Passive with modal", q: "You must clean the room.", a: "The room must be cleaned.", alt: [], he: "must be + V3" },
      { task: "Passive question", q: "Who painted this picture?", a: "Who was this picture painted by?", alt: ["By whom was this picture painted?"], he: "was ... painted by" },
      { task: "Passive with can", q: "We can recycle paper.", a: "Paper can be recycled.", alt: [], he: "can be + V3" }
    ],
    reading: {
      title: "From Cocoa to Chocolate", he: "מקקאו לשוקולד",
      text: "Do you know how chocolate is made? It all starts with cocoa trees, which are grown in hot countries like Ghana and Ivory Coast. The cocoa beans are picked by hand and left in the sun for a few days. Then they are put into bags and exported to factories all over the world. In the factory, the beans are cleaned and roasted. After that they are crushed into a thick paste, and sugar and milk are added. Chocolate was first eaten as a drink by the Maya and Aztec people. It was brought to Europe in the 1500s, but the first chocolate bar was produced only in 1847, in England. Today millions of tons of chocolate are eaten every year. But be careful: chocolate must be kept in a cool place, or it will melt!",
      questions: [
        { q: "Where are cocoa trees grown?", he: "איפה מגדלים עצי קקאו?", options: ["In cold countries", "In hot countries like Ghana", "Only in England"], a: 1 },
        { q: "How are the beans picked?", he: "איך קוטפים את הפולים?", options: ["By hand", "By robots", "By the Maya"], a: 0 },
        { q: "How was chocolate first eaten?", he: "איך אכלו שוקולד לראשונה?", options: ["As a bar", "As a cake", "As a drink"], a: 2 },
        { q: "Why must chocolate be kept in a cool place?", he: "למה צריך לשמור שוקולד במקום קריר?", options: ["So it doesn't melt", "So it tastes sweeter", "So it is exported"], a: 0 }
      ]
    }
  },
  {
    id: "m16", title: "He Said That...", he: "used to, שאלות זנב ודיבור עקיף", em: "💬", theme: "cave",
    grade: "ח׳–ט׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "used to + verb; tag questions; reported speech (said that / told me that)",
      he: "used to + פועל = הרגל בעבר שכבר לא קיים: I used to have long hair. שאלת זנב בסוף משפט מבקשת אישור: חיובי ← זנב שלילי (You're tired, aren't you?), שלילי ← זנב חיובי (He can't swim, can he?). בדיבור עקיף מעבירים מה מישהו אמר וזזים זמן אחד אחורה: \"I am happy\" ← She said that she was happy. say ללא אדם, tell + אדם: he told me.",
      examples: [
        ["I used to be afraid of dogs.", "פעם פחדתי מכלבים."],
        ["You live near here, don't you?", "אתה גר קרוב לכאן, נכון?"],
        ["She isn't coming, is she?", "היא לא באה, נכון?"],
        ["Dan said that he was tired.", "דן אמר שהוא עייף."],
        ["Mom told me that dinner was ready.", "אמא אמרה לי שארוחת הערב מוכנה."]
      ]
    },
    words: [
      ["used to", "נהג ל..., פעם", "🕰️"], ["anymore", "כבר לא", ""], ["childhood", "ילדות", "🧸"], ["habit", "הרגל", "🔁"],
      ["say", "לומר", "🗣️"], ["tell", "לספר, להגיד ל", "👂"], ["report", "לדווח", "📰"], ["message", "הודעה", "✉️"],
      ["explain", "להסביר", "🧑‍🏫"], ["whisper", "ללחוש", "🤫"], ["shout", "לצעוק", "📣"], ["reply", "לענות", "↩️"],
      ["truth", "אמת", ""], ["rumor", "שמועה", ""], ["nickname", "כינוי", "🏷️"], ["shy", "ביישן", "😳"]
    ],
    sentences: [
      ["I used to live in Haifa, but now I live in Modiin.", "פעם גרתי בחיפה, אבל עכשיו אני גר במודיעין."],
      ["Did you use to play with dolls?", "שיחקת פעם בבובות?"],
      ["He didn't use to like vegetables.", "פעם הוא לא אהב ירקות."],
      ["It's a beautiful day, isn't it?", "יום יפה, נכון?"],
      ["You can't come tomorrow, can you?", "אתה לא יכול לבוא מחר, נכון?"],
      ["They finished the project, didn't they?", "הם סיימו את הפרויקט, נכון?"],
      ["She said that she was hungry.", "היא אמרה שהיא רעבה."],
      ["My friend told me that he had a new dog.", "החבר שלי אמר לי שיש לו כלב חדש."],
      ["The teacher explained that the test was easy.", "המורה הסביר שהמבחן קל."],
      ["I used to be shy, but not anymore.", "פעם הייתי ביישן, אבל כבר לא."]
    ],
    gaps: [
      { s: "I ___ to have a cat, but it ran away.", options: ["use", "used", "using"], a: 1, he: "פעם היה לי חתול, אבל הוא ברח.", why: "הרגל בעבר: used to." },
      { s: "Did you ___ to live in Jerusalem?", options: ["used", "use", "uses"], a: 1, he: "גרת פעם בירושלים?", why: "אחרי did: use to (בלי d)." },
      { s: "You're Noa's brother, ___?", options: ["aren't you", "are you", "don't you"], a: 0, he: "אתה האח של נועה, נכון?", why: "משפט חיובי עם are ← זנב שלילי aren't you." },
      { s: "He can't drive, ___?", options: ["can't he", "can he", "does he"], a: 1, he: "הוא לא יודע לנהוג, נכון?", why: "משפט שלילי ← זנב חיובי." },
      { s: "They went to the party, ___?", options: ["didn't they", "weren't they", "did they"], a: 0, he: "הם הלכו למסיבה, נכון?", why: "עבר פשוט חיובי ← didn't they." },
      { s: "She likes pizza, ___?", options: ["isn't she", "doesn't she", "don't she"], a: 1, he: "היא אוהבת פיצה, נכון?", why: "הווה פשוט עם she ← doesn't she." },
      { s: "\"I am tired.\" → He said that he ___ tired.", options: ["is", "was", "were"], a: 1, he: "הוא אמר שהוא עייף.", why: "בדיבור עקיף am ← was." },
      { s: "\"We live in Eilat.\" → They said that they ___ in Eilat.", options: ["lived", "live", "living"], a: 0, he: "הם אמרו שהם גרים באילת.", why: "הווה פשוט ← עבר פשוט." },
      { s: "Maya ___ me that she had a secret.", options: ["said", "told", "say"], a: 1, he: "מאיה אמרה לי שיש לה סוד.", why: "tell + אדם (me)." },
      { s: "Dan ___ that he was busy.", options: ["told", "said", "tell"], a: 1, he: "דן אמר שהוא עסוק.", why: "said בלי אדם אחריו." },
      { s: "\"I can swim.\" → She said that she ___ swim.", options: ["can", "could", "cans"], a: 1, he: "היא אמרה שהיא יודעת לשחות.", why: "can ← could בדיבור עקיף." },
      { s: "We didn't ___ to have a car.", options: ["used", "use", "using"], a: 1, he: "פעם לא הייתה לנו מכונית.", why: "didn't + use to." },
      { s: "It isn't cold today, ___?", options: ["isn't it", "is it", "does it"], a: 1, he: "לא קר היום, נכון?", why: "שלילי ← זנב חיובי is it." },
      { s: "\"I will help you.\" → He said that he ___ help me.", options: ["will", "would", "wants"], a: 1, he: "הוא אמר שהוא יעזור לי.", why: "will ← would בדיבור עקיף." }
    ],
    transforms: [
      { task: "used to", q: "I / have / long hair (but not now)", a: "I used to have long hair.", alt: [], he: "used to + פועל בסיס" },
      { task: "used to (negative)", q: "She / not / like / fish", a: "She didn't use to like fish.", alt: ["She did not use to like fish."], he: "didn't use to" },
      { task: "Add a tag", q: "You are coming", a: "You are coming, aren't you?", alt: ["You're coming, aren't you?"], he: "חיובי ← aren't you" },
      { task: "Add a tag", q: "He doesn't eat meat", a: "He doesn't eat meat, does he?", alt: [], he: "שלילי ← does he" },
      { task: "Add a tag", q: "They played well", a: "They played well, didn't they?", alt: [], he: "עבר ← didn't they" },
      { task: "Reported speech", q: "Tom: \"I am hungry.\"", a: "Tom said that he was hungry.", alt: ["Tom said he was hungry."], he: "am ← was, I ← he" },
      { task: "Reported speech (tell)", q: "Lily to me: \"I have a new phone.\"", a: "Lily told me that she had a new phone.", alt: ["Lily told me she had a new phone."], he: "told me, have ← had" },
      { task: "Reported speech", q: "The kids: \"We can't find the ball.\"", a: "The kids said that they couldn't find the ball.", alt: ["The kids said they couldn't find the ball."], he: "can't ← couldn't" }
    ],
    reading: {
      title: "Grandpa's Stories", he: "הסיפורים של סבא",
      text: "Every Shabbat, my grandfather tells us stories about his childhood. He used to live in a small village in Morocco. There wasn't any electricity there, so people used to go to sleep very early. Grandpa didn't use to have toys from a shop; he and his brothers used to make balls from old socks. Last week he told us that he was the fastest runner in the village. My little sister laughed and said that she didn't believe him. \"You're joking, aren't you?\" she asked. Grandpa smiled and said that it was the truth. Then he showed us an old photo. In the photo a thin boy was holding a small cup. \"I won this cup when I was eleven,\" he whispered. Now my sister says that Grandpa is a hero. Grandpa can't run fast anymore, can he? But he still tells the best stories.",
      questions: [
        { q: "Where did Grandpa use to live?", he: "איפה סבא גר פעם?", options: ["In a big city", "In a small village in Morocco", "In Jerusalem"], a: 1 },
        { q: "What did Grandpa and his brothers use to make balls from?", he: "ממה סבא ואחיו נהגו להכין כדורים?", options: ["Old socks", "Plastic bags", "Wood"], a: 0 },
        { q: "What did Grandpa tell them last week?", he: "מה סבא סיפר להם בשבוע שעבר?", options: ["That he was a teacher", "That he lived in a castle", "That he was the fastest runner in the village"], a: 2 },
        { q: "What did Grandpa show them?", he: "מה סבא הראה להם?", options: ["A cup he won", "An old photo", "A new ball"], a: 1 }
      ]
    }
  }
];
