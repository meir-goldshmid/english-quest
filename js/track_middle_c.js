// Middle track (ages ~11–13, Israeli grades 7–8, CEFR A2), part C: units m17–m20.
export const UNITS_MC = [
  {
    id: "m17", title: "Somebody, Anything, Nowhere", he: "מישהו, משהו, בשום מקום", em: "🕵️", theme: "sky",
    grade: "ז׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "some- / any- / no- / every- + body / one / thing / where",
      he: "some- במשפטים חיוביים ובהצעות (Would you like something?). any- בשאלות ובשלילה: I don't know anybody. no- כבר שלילי, ולכן הפועל נשאר חיובי: Nobody came (לא Nobody didn't come). every- = כולם, הכל, בכל מקום, והפועל ביחיד: Everybody is here. -body ו-one = אנשים, -thing = דברים, -where = מקומות.",
      examples: [
        ["Somebody is at the door.", "מישהו בדלת."],
        ["Is there anything in the fridge?", "יש משהו במקרר?"],
        ["I don't know anyone here.", "אני לא מכיר אף אחד כאן."],
        ["Nobody called me today.", "אף אחד לא התקשר אליי היום."],
        ["Everybody likes ice cream.", "כולם אוהבים גלידה."],
        ["I can't find my keys anywhere.", "אני לא מוצא את המפתחות שלי בשום מקום."]
      ]
    },
    words: [
      ["somebody", "מישהו", "🙋"], ["anybody", "מישהו (בשאלה), אף אחד (בשלילה)", ""], ["nobody", "אף אחד", "🙅"], ["everybody", "כולם", "👥"],
      ["something", "משהו", "🎁"], ["anything", "משהו (בשאלה), כלום (בשלילה)", ""], ["nothing", "כלום, שום דבר", "🫙"], ["everything", "הכל", ""],
      ["somewhere", "איפשהו", "📍"], ["anywhere", "בשום מקום (בשלילה), איפשהו (בשאלה)", ""], ["nowhere", "בשום מקום", "🚫"], ["everywhere", "בכל מקום", "🌍"],
      ["else", "עוד, אחר", ""], ["alone", "לבד", "🧍"], ["secret", "סוד", "🤫"], ["guide", "מדריך", "🧭"]
    ],
    sentences: [
      ["Somebody left a jacket in the classroom.", "מישהו השאיר מעיל בכיתה."],
      ["Is anybody sitting here?", "מישהו יושב כאן?"],
      ["There is nothing in my bag.", "אין כלום בתיק שלי."],
      ["Everybody in my class has a phone.", "לכולם בכיתה שלי יש טלפון."],
      ["Let's go somewhere quiet.", "בואו נלך למקום שקט."],
      ["I didn't buy anything at the mall.", "לא קניתי כלום בקניון."],
      ["No one knows the answer.", "אף אחד לא יודע את התשובה."],
      ["My dog follows me everywhere.", "הכלב שלי הולך אחריי לכל מקום."],
      ["Would you like something to drink?", "תרצה משהו לשתות?"],
      ["There was nowhere to sit on the bus.", "לא היה איפה לשבת באוטובוס."]
    ],
    gaps: [
      { s: "I'm hungry. I want ___ to eat.", options: ["something", "anything", "nothing"], a: 0, he: "אני רעב. אני רוצה משהו לאכול.", why: "משפט חיובי – some-." },
      { s: "Is there ___ in the bathroom?", options: ["nobody", "anybody", "everything"], a: 1, he: "יש מישהו בשירותים?", why: "בשאלה על אדם – anybody." },
      { s: "I didn't see ___ at the park.", options: ["nobody", "anybody", "nothing"], a: 1, he: "לא ראיתי אף אחד בפארק.", why: "אחרי didn't – any- (בלי שתי שלילות)." },
      { s: "___ came to the party. It was so sad!", options: ["Nobody", "Anybody", "Everybody"], a: 0, he: "אף אחד לא בא למסיבה. זה היה כל כך עצוב!", why: "הפועל חיובי (came), לכן no- = אף אחד." },
      { s: "___ is here. We can start the lesson.", options: ["Nobody", "Anybody", "Everybody"], a: 2, he: "כולם כאן. אפשר להתחיל את השיעור.", why: "כולם = everybody, והפועל ביחיד (is)." },
      { s: "I lost my phone. I looked ___ for it.", options: ["everything", "everyone", "everywhere"], a: 2, he: "איבדתי את הטלפון. חיפשתי אותו בכל מקום.", why: "מדובר על מקום – -where." },
      { s: "There is ___ in the box. It's empty.", options: ["something", "nothing", "anything"], a: 1, he: "אין כלום בקופסה. היא ריקה.", why: "הקופסה ריקה, ו-is חיובי – nothing." },
      { s: "We have ___ to go this weekend. Let's stay home.", options: ["nowhere", "anywhere", "somewhere"], a: 0, he: "אין לנו לאן ללכת בסוף השבוע. בואו נישאר בבית.", why: "אין מקום, והפועל חיובי – nowhere." },
      { s: "Does ___ have a pen?", options: ["no one", "anything", "anyone"], a: 2, he: "למישהו יש עט?", why: "שאלה על אדם – anyone." },
      { s: "Everybody ___ pizza.", options: ["love", "loves", "are loving"], a: 1, he: "כולם אוהבים פיצה.", why: "אחרי every- הפועל ביחיד: loves." },
      { s: "I don't want ___ for my birthday.", options: ["nothing", "anything", "nobody"], a: 1, he: "אני לא רוצה כלום ליום ההולדת.", why: "יש כבר שלילה (don't), לכן any-." },
      { s: "Let's sit ___ in the shade.", options: ["somewhere", "something", "someone"], a: 0, he: "בוא נשב איפשהו בצל.", why: "מדובר על מקום – somewhere." },
      { s: "She has a secret. She didn't tell ___.", options: ["anyone", "no one", "anywhere"], a: 0, he: "יש לה סוד. היא לא סיפרה לאף אחד.", why: "שלילה (didn't) + אדם – anyone." },
      { s: "Is there ___ to park near the beach?", options: ["anyone", "anything", "anywhere"], a: 2, he: "יש איפה לחנות ליד החוף?", why: "שואלים על מקום – anywhere." },
      { s: "The test was easy. I knew ___!", options: ["nothing", "anything", "everything"], a: 2, he: "המבחן היה קל. ידעתי הכל!", why: "הכל = everything." }
    ],
    transforms: [
      { task: "Make it negative", q: "I saw somebody.", a: "I didn't see anybody.", alt: ["I did not see anybody.", "I didn't see anyone.", "I saw nobody."], he: "didn't + any-" },
      { task: "Make it negative", q: "She bought something.", a: "She didn't buy anything.", alt: ["She did not buy anything.", "She bought nothing."], he: "didn't + anything" },
      { task: "Make a question", q: "There is somebody at the door.", a: "Is there anybody at the door?", alt: ["Is there anyone at the door?", "Is there somebody at the door?", "Is there someone at the door?"], he: "שאלה – any-" },
      { task: "Use no-", q: "There isn't anything in the fridge.", a: "There is nothing in the fridge.", alt: ["There's nothing in the fridge."], he: "isn't anything = is nothing" },
      { task: "Use no-", q: "I don't know anybody here.", a: "I know nobody here.", alt: ["I know no one here."], he: "don't know anybody = know nobody" },
      { task: "One word (every-)", q: "all the people", a: "everybody", alt: ["everyone"], he: "כל האנשים" },
      { task: "One word (every-)", q: "all the places", a: "everywhere", alt: [], he: "כל המקומות" },
      { task: "One word (no-)", q: "not any place", a: "nowhere", alt: [], he: "בשום מקום" }
    ],
    reading: {
      title: "Stars over Mitzpe Ramon", he: "כוכבים מעל מצפה רמון",
      text: "Last month our class went on a night trip to Mitzpe Ramon. Everybody was excited, but nobody knew what to expect. When we arrived, it was very dark. There were no lights anywhere, and there was nothing around us except rocks and sand. Our guide, Ronit, said, \"Look up! Can anybody see something special?\" At first I didn't see anything. Then my friend Omer shouted, \"Stars! There are stars everywhere!\" He was right. The sky was full of them. Ronit showed us the Milky Way and a bright planet, too. Somebody asked if we could see a shooting star. \"Maybe, if everyone is quiet and patient,\" she answered. We lay on blankets, and nobody said anything for ten minutes. Suddenly, a shooting star crossed the sky. \"Did anyone see that?\" I whispered. Everyone saw it. On the bus home I was very tired, but I wanted to tell somebody about it. I have never seen anything so beautiful.",
      questions: [
        { q: "Where did the class go?", he: "לאן הכיתה נסעה?", options: ["To Eilat", "To Mitzpe Ramon", "To Jerusalem"], a: 1 },
        { q: "What was around them in the dark?", he: "מה היה מסביבם בחושך?", options: ["Only rocks and sand", "Many shops", "A big city"], a: 0 },
        { q: "Who shouted that there were stars everywhere?", he: "מי צעק שיש כוכבים בכל מקום?", options: ["Ronit", "The writer", "Omer"], a: 2 },
        { q: "What did they see after ten quiet minutes?", he: "מה הם ראו אחרי עשר דקות של שקט?", options: ["A plane", "A shooting star", "The moon"], a: 1 }
      ]
    }
  },
  {
    id: "m18", title: "Too Big, Not Big Enough", he: "יותר מדי, מספיק, כל כך", em: "📏", theme: "castle",
    grade: "ז׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "too + adjective · adjective + enough · enough + noun · so + adjective · such (a) + adjective + noun",
      he: "too = יותר מדי (וזו בעיה): This bag is too heavy. enough = מספיק: הוא בא אחרי תואר (old enough) ולפני שם עצם (enough money). not ... enough = לא מספיק. so ו-such אומרים ״כל כך״: so + תואר (It was so hot), such (a) + תואר + שם עצם (It was such a hot day). אחרי so / such אפשר להוסיף that + התוצאה.",
      examples: [
        ["This coffee is too hot to drink.", "הקפה הזה חם מדי לשתייה."],
        ["I'm not tall enough to reach the shelf.", "אני לא מספיק גבוה כדי להגיע למדף."],
        ["We don't have enough chairs.", "אין לנו מספיק כיסאות."],
        ["The movie was so funny!", "הסרט היה כל כך מצחיק!"],
        ["It was such a good party.", "זאת הייתה מסיבה כל כך טובה."],
        ["He was so tired that he fell asleep.", "הוא היה כל כך עייף שהוא נרדם."]
      ]
    },
    words: [
      ["heavy", "כבד", "🏋️"], ["light", "קל (במשקל)", "🪶"], ["wide", "רחב", ""], ["narrow", "צר", ""],
      ["tight", "צמוד, הדוק", ""], ["loose", "רפוי, רחב (בגד)", ""], ["expensive", "יקר", "💰"], ["cheap", "זול", "🏷️"],
      ["crowded", "צפוף, עמוס אנשים", "👥"], ["spicy", "חריף", "🌶️"], ["brave", "אמיץ", "🦁"], ["strong", "חזק", "💪"],
      ["tower", "מגדל", "🗼"], ["wall", "חומה, קיר", "🧱"], ["gate", "שער", "🚪"], ["steep", "תלול", "⛰️"]
    ],
    sentences: [
      ["These jeans are too tight for me.", "הג׳ינס הזה צמוד מדי בשבילי."],
      ["Is the water warm enough for swimming?", "המים מספיק חמים לשחייה?"],
      ["We don't have enough time to finish.", "אין לנו מספיק זמן לסיים."],
      ["The bus was so crowded that we stood all the way.", "האוטובוס היה כל כך צפוף שעמדנו כל הדרך."],
      ["It was such a long day!", "זה היה יום כל כך ארוך!"],
      ["My little sister is too young to watch this movie.", "אחותי הקטנה צעירה מדי לצפות בסרט הזה."],
      ["The tower was too high to climb.", "המגדל היה גבוה מדי לטיפוס."],
      ["He isn't strong enough to lift the box.", "הוא לא מספיק חזק כדי להרים את הקופסה."],
      ["They are such good friends.", "הם חברים כל כך טובים."],
      ["The tickets were so expensive!", "הכרטיסים היו כל כך יקרים!"]
    ],
    gaps: [
      { s: "This bag is ___ heavy. I can't carry it.", options: ["too", "enough", "such"], a: 0, he: "התיק הזה כבד מדי. אני לא יכול לסחוב אותו.", why: "יותר מדי (בעיה) – too לפני התואר." },
      { s: "She isn't old ___ to drive.", options: ["too", "enough", "so"], a: 1, he: "היא לא מספיק מבוגרת כדי לנהוג.", why: "enough בא אחרי התואר." },
      { s: "We have ___ food for everybody.", options: ["too", "so", "enough"], a: 2, he: "יש לנו מספיק אוכל לכולם.", why: "enough בא לפני שם עצם." },
      { s: "It was ___ a beautiful day.", options: ["so", "such", "too"], a: 1, he: "זה היה יום כל כך יפה.", why: "such a + תואר + שם עצם." },
      { s: "The movie was ___ boring that I fell asleep.", options: ["so", "such", "enough"], a: 0, he: "הסרט היה כל כך משעמם שנרדמתי.", why: "so + תואר (בלי שם עצם)." },
      { s: "Is the room big ___ for ten people?", options: ["too", "enough", "such"], a: 1, he: "החדר מספיק גדול לעשרה אנשים?", why: "תואר + enough." },
      { s: "The shoes are ___ small for me. I need a bigger size.", options: ["enough", "so", "too"], a: 2, he: "הנעליים קטנות מדי בשבילי. אני צריך מידה גדולה יותר.", why: "קטנות מדי – too." },
      { s: "They are ___ nice people!", options: ["such", "so", "such a"], a: 0, he: "הם אנשים כל כך נחמדים!", why: "people ברבים – such בלי a." },
      { s: "I didn't study ___, so I failed the test.", options: ["too", "enough", "so"], a: 1, he: "לא למדתי מספיק, אז נכשלתי במבחן.", why: "לא מספיק – not ... enough." },
      { s: "The tea is too hot ___ drink.", options: ["for", "to", "that"], a: 1, he: "התה חם מדי לשתייה.", why: "too + תואר + to + פועל." },
      { s: "It's ___ cold outside! Take a coat.", options: ["such", "so", "enough"], a: 1, he: "כל כך קר בחוץ! קח מעיל.", why: "so + תואר." },
      { s: "He is ___ a good singer!", options: ["so", "too", "such"], a: 2, he: "הוא זמר כל כך טוב!", why: "such a + תואר + שם עצם." },
      { s: "There aren't ___ chairs. Some kids are standing.", options: ["too", "enough", "so"], a: 1, he: "אין מספיק כיסאות. כמה ילדים עומדים.", why: "not enough + שם עצם." },
      { s: "The test was ___ easy that everyone finished early.", options: ["such", "so", "too"], a: 1, he: "המבחן היה כל כך קל שכולם סיימו מוקדם.", why: "so + תואר + that." },
      { s: "This castle is ___ old! It's 800 years old.", options: ["so", "such", "enough"], a: 0, he: "הטירה הזאת כל כך עתיקה! היא בת 800 שנה.", why: "so + תואר." }
    ],
    transforms: [
      { task: "Use too ... to", q: "The box is very heavy. I can't lift it.", a: "The box is too heavy to lift.", alt: ["The box is too heavy for me to lift."], he: "too + תואר + to" },
      { task: "Use enough", q: "He is not tall. He can't play basketball.", a: "He isn't tall enough to play basketball.", alt: ["He is not tall enough to play basketball."], he: "not + תואר + enough" },
      { task: "Use enough", q: "We / not have / money / enough", a: "We don't have enough money.", alt: ["We do not have enough money."], he: "enough לפני שם עצם" },
      { task: "so → such", q: "The day was so hot.", a: "It was such a hot day.", alt: [], he: "such a + תואר + שם עצם" },
      { task: "such → so", q: "It was such an interesting book.", a: "The book was so interesting.", alt: [], he: "so + תואר" },
      { task: "Join with so ... that", q: "I was very tired. I went to bed early.", a: "I was so tired that I went to bed early.", alt: ["I was so tired I went to bed early."], he: "so + תואר + that" },
      { task: "Join with such ... that", q: "It was a very good movie. We watched it twice.", a: "It was such a good movie that we watched it twice.", alt: ["It was such a good movie we watched it twice."], he: "such a ... that" },
      { task: "Say it with too", q: "The water isn't warm enough.", a: "The water is too cold.", alt: ["The water's too cold."], he: "not warm enough = too cold" }
    ],
    reading: {
      title: "A Day at the Old Fortress", he: "יום במבצר העתיק",
      text: "Last summer my family visited Nimrod Fortress in the north of Israel. It was such a hot day that we took four big bottles of water. The road up the mountain was very narrow, so my dad drove slowly. The fortress is so old! It was built about 800 years ago. My little brother Itai wanted to climb the high tower, but he was too young to go up alone, so Mom went with him. I am old enough, so I climbed with my cousin Shira. The stairs were dark and so steep that we held on to the wall. From the top, the view was amazing. We could see the Hula Valley and even Mount Hermon. Then we tried to find the secret tunnel. It was too dark to see anything, and our phones didn't give enough light. \"Let's come back with a flashlight,\" said Shira. On the way home, everyone was too tired to talk.",
      questions: [
        { q: "Why did they take four big bottles of water?", he: "למה הם לקחו ארבעה בקבוקי מים גדולים?", options: ["It was such a hot day", "The road was narrow", "Itai was sick"], a: 0 },
        { q: "Why did Mom go up with Itai?", he: "למה אמא עלתה עם איתי?", options: ["He was scared of the dark", "He was too young to go up alone", "She wanted to take photos"], a: 1 },
        { q: "What could they see from the top?", he: "מה הם יכלו לראות מלמעלה?", options: ["The sea", "Tel Aviv", "The Hula Valley and Mount Hermon"], a: 2 },
        { q: "Why didn't they find the secret tunnel?", he: "למה הם לא מצאו את המנהרה הסודית?", options: ["It was closed", "It was too dark and they didn't have enough light", "Dad didn't let them go"], a: 1 }
      ]
    }
  },
  {
    id: "m19", title: "Had Already Left", he: "עבר מושלם", em: "⏪", theme: "grass",
    grade: "ח׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "Past perfect: had + past participle · already · by the time · before / after / when",
      he: "עבר מושלם (had + צורה שלישית) מתאר פעולה שקרתה לפני פעולה אחרת בעבר: When I arrived, the movie had already started. (קודם הסרט התחיל, ואחר כך הגעתי.) את הפעולה המאוחרת יותר כותבים בעבר פשוט. by the time = עד ש... already בא בין had לפועל. בשלילה: hadn't + צורה שלישית. בשאלה: Had you ... ?",
      examples: [
        ["When we got to the station, the train had already left.", "כשהגענו לתחנה, הרכבת כבר יצאה."],
        ["I had finished my homework before dinner.", "סיימתי את שיעורי הבית לפני ארוחת הערב."],
        ["By the time Mom came home, we had cleaned the house.", "עד שאמא חזרה הביתה, כבר ניקינו את הבית."],
        ["She was sad because she had lost her phone.", "היא הייתה עצובה כי היא איבדה את הטלפון שלה."],
        ["He hadn't eaten anything, so he was hungry.", "הוא לא אכל כלום, אז הוא היה רעב."],
        ["After they had watched the movie, they went to sleep.", "אחרי שהם צפו בסרט, הם הלכו לישון."]
      ]
    },
    words: [
      ["already", "כבר", "✔️"], ["by the time", "עד ש...", "⏰"], ["before", "לפני", "⬅️"], ["after", "אחרי", "➡️"],
      ["arrive", "להגיע", "🚶"], ["miss", "לפספס", "🚌"], ["forget", "לשכוח", "🤦"], ["realize", "להבין (פתאום)", "💡"],
      ["notice", "לשים לב", "👀"], ["leave", "לעזוב, לצאת", "🚪"], ["lock", "לנעול", "🔒"], ["ring", "לצלצל", "🔔"],
      ["station", "תחנה", "🚉"], ["alarm clock", "שעון מעורר", "⏰"], ["midnight", "חצות", "🌙"], ["upset", "נסער, מוטרד", "😟"]
    ],
    sentences: [
      ["The bell had already rung when I got to class.", "הפעמון כבר צלצל כשהגעתי לכיתה."],
      ["I realized that I had forgotten my keys.", "הבנתי ששכחתי את המפתחות שלי."],
      ["By the time we arrived, the party had ended.", "עד שהגענו, המסיבה כבר נגמרה."],
      ["She had never seen snow before that winter.", "היא אף פעם לא ראתה שלג לפני החורף ההוא."],
      ["We missed the bus because we had woken up late.", "פספסנו את האוטובוס כי התעוררנו מאוחר."],
      ["Had you met him before the trip?", "הכרת אותו לפני הטיול?"],
      ["After I had locked the door, I noticed the open window.", "אחרי שנעלתי את הדלת, שמתי לב לחלון הפתוח."],
      ["He was upset because nobody had called him.", "הוא היה מוטרד כי אף אחד לא התקשר אליו."],
      ["The shop had closed by the time we got there.", "החנות כבר נסגרה עד שהגענו לשם."],
      ["My alarm clock hadn't rung, so I was late.", "השעון המעורר שלי לא צלצל, אז איחרתי."]
    ],
    gaps: [
      { s: "When I got home, my brother had already ___ dinner.", options: ["eat", "ate", "eaten"], a: 2, he: "כשהגעתי הביתה, אחי כבר אכל ארוחת ערב.", why: "had + צורה שלישית: eaten." },
      { s: "The movie ___ started when we arrived.", options: ["had already", "has already", "have already"], a: 0, he: "הסרט כבר התחיל כשהגענו.", why: "פעולה שקרתה לפני פעולה אחרת בעבר – had." },
      { s: "By the time the teacher came, we ___ the test.", options: ["had finished", "have finished", "finish"], a: 0, he: "עד שהמורה הגיע, כבר סיימנו את המבחן.", why: "by the time + עבר ← had + V3." },
      { s: "She was sad because she ___ her phone.", options: ["has lost", "had lost", "loses"], a: 1, he: "היא הייתה עצובה כי היא איבדה את הטלפון שלה.", why: "האיבוד קרה לפני העצב – had lost." },
      { s: "I ___ never flown before my trip to Rome.", options: ["have", "had", "has"], a: 1, he: "אף פעם לא טסתי לפני הטיול שלי לרומא.", why: "לפני אירוע בעבר – had + V3." },
      { s: "After she had done her homework, she ___ TV.", options: ["watched", "had watched", "watches"], a: 0, he: "אחרי שהיא הכינה שיעורי בית, היא צפתה בטלוויזיה.", why: "הפעולה השנייה – עבר פשוט." },
      { s: "We ___ the bus because we had left home late.", options: ["missing", "missed", "misses"], a: 1, he: "פספסנו את האוטובוס כי יצאנו מהבית מאוחר.", why: "הפעולה המאוחרת יותר – עבר פשוט." },
      { s: "He hadn't ___ the book, so he didn't know the ending.", options: ["read", "reads", "reading"], a: 0, he: "הוא לא קרא את הספר, אז הוא לא ידע את הסוף.", why: "hadn't + V3 (read – read – read)." },
      { s: "___ you ever been to Eilat before last summer?", options: ["Did", "Have", "Had"], a: 2, he: "היית פעם באילת לפני הקיץ שעבר?", why: "לפני זמן בעבר – Had + V3." },
      { s: "When we got to the station, the train ___.", options: ["has left", "had left", "leaves"], a: 1, he: "כשהגענו לתחנה, הרכבת כבר יצאה.", why: "הרכבת יצאה לפני שהגענו – had left." },
      { s: "I couldn't open the door because I ___ my key.", options: ["had forgotten", "have forgotten", "forget"], a: 0, he: "לא יכולתי לפתוח את הדלת כי שכחתי את המפתח.", why: "השכחה קרתה קודם – had forgotten." },
      { s: "By the time Dad woke up, Mom ___ already made breakfast.", options: ["has", "had", "have"], a: 1, he: "עד שאבא התעורר, אמא כבר הכינה ארוחת בוקר.", why: "had + already + V3." },
      { s: "They were tired because they had ___ all day.", options: ["walk", "walked", "walking"], a: 1, he: "הם היו עייפים כי הם הלכו כל היום.", why: "had + V3: walked." },
      { s: "The shop ___ closed by the time we arrived.", options: ["is", "has", "had"], a: 2, he: "החנות כבר נסגרה עד שהגענו.", why: "by the time + עבר ← had + V3." },
      { s: "Noa ___ the news before I told her.", options: ["has already heard", "already hears", "had already heard"], a: 2, he: "נועה כבר שמעה את החדשות לפני שסיפרתי לה.", why: "שמעה לפני שסיפרתי – had + already + V3." }
    ],
    transforms: [
      { task: "Past perfect", q: "I / already / eat / when you called", a: "I had already eaten when you called.", alt: ["I'd already eaten when you called."], he: "had + already + V3" },
      { task: "Past perfect (negative)", q: "She / not / finish / her homework", a: "She hadn't finished her homework.", alt: ["She had not finished her homework."], he: "hadn't + V3" },
      { task: "Past perfect question", q: "you / see / the movie / before?", a: "Had you seen the movie before?", alt: [], he: "Had + נושא + V3" },
      { task: "Join with by the time", q: "We got there. The game ended before that.", a: "By the time we got there, the game had ended.", alt: ["The game had ended by the time we got there.", "By the time we got there, the game had already ended."], he: "by the time + עבר פשוט, had + V3" },
      { task: "Join with because", q: "He was hungry. He didn't eat breakfast before that.", a: "He was hungry because he hadn't eaten breakfast.", alt: ["He was hungry because he had not eaten breakfast."], he: "because + hadn't + V3" },
      { task: "Join with after", q: "First she washed the dishes. Then she went out.", a: "After she had washed the dishes, she went out.", alt: ["She went out after she had washed the dishes.", "After she washed the dishes, she went out."], he: "after + had + V3" },
      { task: "Past participle (V3)", q: "forget", a: "forgotten", alt: [], he: "לשכוח" },
      { task: "Past participle (V3)", q: "leave", a: "left", alt: [], he: "לעזוב, לצאת" }
    ],
    reading: {
      title: "The Worst Morning Ever", he: "הבוקר הכי גרוע אי פעם",
      text: "Last Tuesday was a terrible day for Yonatan. His alarm clock hadn't rung because he had forgotten to charge his phone. When he woke up, it was already 7:45. He jumped out of bed, but his sister had already used all the hot water, so he had a cold shower. By the time he got to the bus stop, the bus had left. He ran all the way to school. When he finally arrived, the bell had already rung and the class had started the English test. \"I'm sorry,\" he told the teacher. \"I missed the bus.\" Luckily, he had studied hard the night before, so he knew most of the answers. During the break, he realized that he had left his lunch on the kitchen table. His best friend, Tamar, shared her sandwich with him. \"After a morning like that, you deserve it,\" she said, and laughed. That evening, Yonatan charged his phone before he went to bed.",
      questions: [
        { q: "Why didn't the alarm clock ring?", he: "למה השעון המעורר לא צלצל?", options: ["He had forgotten to charge his phone", "His sister turned it off", "It was broken"], a: 0 },
        { q: "Why did he have a cold shower?", he: "למה הוא התקלח במים קרים?", options: ["He likes cold water", "It was a very hot day", "His sister had used all the hot water"], a: 2 },
        { q: "What had happened when he arrived at school?", he: "מה כבר קרה כשהוא הגיע לבית הספר?", options: ["The school was closed", "The class had started the English test", "The teacher had gone home"], a: 1 },
        { q: "What had he left on the kitchen table?", he: "מה הוא השאיר על שולחן המטבח?", options: ["His phone", "His homework", "His lunch"], a: 2 }
      ]
    }
  },
  {
    id: "m20", title: "Make, Let, Help & Phrasal Verbs", he: "לגרום, להרשות, לעזור ופעלים צירופיים", em: "🛠️", theme: "desert",
    grade: "ח׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "make / let / help + person + base verb · phrasal verbs: turn on/off, give up, look for, find out, pick up, put on, take off, get up",
      he: "make + אדם + פועל בסיס = לגרום או להכריח: My mom makes me clean my room. let + אדם + פועל בסיס = להרשות: Dad lets us stay up late. אחרי make ו-let אין to! help + אדם + פועל, עם to או בלי: She helped me (to) carry the bags. פועל צירופי (phrasal verb) הוא פועל + מילה קטנה שמשנה את המשמעות: give up = לוותר, find out = לגלות. כשהמושא הוא כינוי (it, them), הוא בא באמצע: turn it off.",
      examples: [
        ["The teacher made us rewrite the essay.", "המורה הכריח אותנו לכתוב מחדש את החיבור."],
        ["My parents let me go to the concert.", "ההורים שלי הרשו לי ללכת להופעה."],
        ["Can you help me find my keys?", "אתה יכול לעזור לי למצוא את המפתחות שלי?"],
        ["Please turn off the light.", "בבקשה כבה את האור."],
        ["I won't give up.", "אני לא אוותר."],
        ["Put your coat on. Put it on.", "תלבש את המעיל. תלבש אותו."]
      ]
    },
    words: [
      ["make", "לגרום, להכריח", "👉"], ["let", "להרשות", "✅"], ["help", "לעזור", "🤝"], ["allow", "להתיר, להרשות", "🆗"],
      ["turn on", "להדליק", "💡"], ["turn off", "לכבות", "🔌"], ["give up", "לוותר", "🏳️"], ["look for", "לחפש", "🔍"],
      ["find out", "לגלות, לברר", "🕵️"], ["pick up", "להרים, לאסוף", "🫳"], ["put on", "ללבוש, לשים", "🧥"], ["take off", "להוריד, לפשוט (בגד)", "👟"],
      ["get up", "לקום", "🛏️"], ["wake up", "להתעורר", "⏰"], ["tent", "אוהל", "⛺"], ["sand", "חול", "🏜️"]
    ],
    sentences: [
      ["My mom makes me eat vegetables every day.", "אמא שלי מכריחה אותי לאכול ירקות כל יום."],
      ["Will your parents let you sleep at my house?", "ההורים שלך ירשו לך לישון אצלי?"],
      ["Grandpa helped us build a sukkah.", "סבא עזר לנו לבנות סוכה."],
      ["Turn on the fan, please. It's so hot!", "תדליק את המאוורר, בבקשה. כל כך חם!"],
      ["I'm looking for my blue sweater.", "אני מחפש את הסוודר הכחול שלי."],
      ["Take off your shoes before you come in.", "תוריד את הנעליים לפני שאתה נכנס."],
      ["We found out that the test was moved to Thursday.", "גילינו שהמבחן הוזז ליום חמישי."],
      ["Dad will pick us up after practice.", "אבא יאסוף אותנו אחרי האימון."],
      ["Never give up on your dreams.", "אף פעם אל תוותר על החלומות שלך."],
      ["What time do you get up on Saturdays?", "באיזו שעה אתה קם בשבת?"]
    ],
    gaps: [
      { s: "My mom made me ___ my room.", options: ["clean", "to clean", "cleaning"], a: 0, he: "אמא שלי הכריחה אותי לסדר את החדר.", why: "make + אדם + פועל בסיס, בלי to." },
      { s: "The teacher ___ us use our phones for the project.", options: ["let", "allowed", "made to"], a: 0, he: "המורה הרשה לנו להשתמש בטלפונים לפרויקט.", why: "let + אדם + פועל בסיס. אחרי allow צריך to." },
      { s: "Dad doesn't let me ___ up late.", options: ["to stay", "staying", "stay"], a: 2, he: "אבא לא מרשה לי להישאר ער עד מאוחר.", why: "let + אדם + פועל בסיס, בלי to." },
      { s: "It's dark in here. Can you ___ the light?", options: ["turn off", "turn on", "give up"], a: 1, he: "חשוך כאן. אתה יכול להדליק את האור?", why: "turn on = להדליק." },
      { s: "The math problem was hard, but I didn't ___.", options: ["give up", "look for", "put on"], a: 0, he: "התרגיל במתמטיקה היה קשה, אבל לא ויתרתי.", why: "give up = לוותר." },
      { s: "I'm ___ my glasses. Have you seen them?", options: ["finding out", "looking for", "picking up"], a: 1, he: "אני מחפש את המשקפיים שלי. ראית אותם?", why: "look for = לחפש." },
      { s: "It's cold outside. ___ your jacket.", options: ["Take off", "Turn off", "Put on"], a: 2, he: "קר בחוץ. תלבש את המעיל.", why: "put on = ללבוש." },
      { s: "I ___ at 6:30 every morning for school.", options: ["get up", "give up", "pick up"], a: 0, he: "אני קם ב-6:30 כל בוקר לבית הספר.", why: "get up = לקום מהמיטה." },
      { s: "Can you help me ___ these boxes?", options: ["carry", "carrying", "carried"], a: 0, he: "אתה יכול לעזור לי לסחוב את הקופסאות האלה?", why: "help + אדם + פועל בסיס (גם to carry נכון)." },
      { s: "Please ___ your shoes. The floor is clean.", options: ["put on", "take off", "get up"], a: 1, he: "בבקשה תוריד את הנעליים. הרצפה נקייה.", why: "take off = להוריד בגד או נעליים." },
      { s: "Did you ___ who broke the window?", options: ["look for", "turn on", "find out"], a: 2, he: "גילית מי שבר את החלון?", why: "find out = לגלות." },
      { s: "That sad movie made my sister ___.", options: ["to cry", "crying", "cry"], a: 2, he: "הסרט העצוב הזה גרם לאחותי לבכות.", why: "make + אדם + פועל בסיס." },
      { s: "There's paper on the floor. Please pick it ___.", options: ["up", "on", "off"], a: 0, he: "יש נייר על הרצפה. בבקשה תרים אותו.", why: "pick up = להרים; הכינוי it בא באמצע." },
      { s: "I'm going to sleep. Please turn the TV ___.", options: ["on", "off", "up"], a: 1, he: "אני הולך לישון. בבקשה תכבה את הטלוויזיה.", why: "turn off = לכבות." },
      { s: "Mom ___ me wash the dishes after dinner. I hate it!", options: ["makes to", "lets", "makes"], a: 2, he: "אמא מכריחה אותי לשטוף כלים אחרי ארוחת הערב. אני שונא את זה!", why: "חובה שלא אוהבים – make + פועל בסיס, בלי to." }
    ],
    transforms: [
      { task: "Use make", q: "The teacher forced us to stay after class.", a: "The teacher made us stay after class.", alt: [], he: "made + אדם + פועל בסיס" },
      { task: "Use let", q: "My parents allow me to have a dog.", a: "My parents let me have a dog.", alt: [], he: "let + אדם + פועל בסיס" },
      { task: "Use help (past)", q: "Noa / help / me / do my homework", a: "Noa helped me do my homework.", alt: ["Noa helped me to do my homework."], he: "help + אדם + פועל" },
      { task: "Phrasal verb", q: "search for", a: "look for", alt: [], he: "לחפש" },
      { task: "Phrasal verb", q: "stop trying", a: "give up", alt: [], he: "לוותר" },
      { task: "Phrasal verb", q: "discover (information)", a: "find out", alt: [], he: "לגלות" },
      { task: "Use the pronoun it", q: "Turn off the TV.", a: "Turn it off.", alt: [], he: "הכינוי באמצע: turn it off" },
      { task: "Use the pronoun it", q: "Put on your hat.", a: "Put it on.", alt: [], he: "הכינוי באמצע: put it on" }
    ],
    reading: {
      title: "A Fox in the Arava", he: "שועל בערבה",
      text: "During Hanukkah, Lior's youth group went camping in the Arava desert. Before the trip, Lior's parents made him pack warm clothes. \"The desert gets very cold at night,\" his dad said. On the first evening, the counselors let the kids put up the tents by themselves. Lior's tent kept falling down, and he almost gave up, but his friend Adi helped him fix it. Later, everyone sat around the fire. When it got dark, the counselors turned off all the flashlights, and the kids looked at the stars. At night it was freezing, so Lior put on two sweaters and a hat. In the morning, they got up at 5:30 to watch the sunrise. Lior couldn't find his shoes. He looked for them everywhere. Then he found out that a fox had taken one of them! Adi found it behind a rock. \"Next time, keep your shoes inside the tent,\" she laughed. Before they left, the counselors made everyone pick up every piece of trash.",
      questions: [
        { q: "What did Lior's parents make him do?", he: "מה ההורים של ליאור הכריחו אותו לעשות?", options: ["Pack warm clothes", "Bring a tent", "Buy a flashlight"], a: 0 },
        { q: "Who helped Lior fix his tent?", he: "מי עזר לליאור לתקן את האוהל?", options: ["His dad", "Adi", "A counselor"], a: 1 },
        { q: "Why did they get up at 5:30?", he: "למה הם קמו ב-5:30?", options: ["To go home", "To look for a fox", "To watch the sunrise"], a: 2 },
        { q: "What did Lior find out about his shoe?", he: "מה ליאור גילה על הנעל שלו?", options: ["It was in his bag", "A fox had taken it", "Adi was wearing it"], a: 1 }
      ]
    }
  }
];
