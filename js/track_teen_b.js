// Teen track (ages ~14–16, Israeli grades 9–11, CEFR B1/B2, Ministry Proficiency grammar), units t09–t16.
export const UNITS_TB = [
  {
    id: "t09", title: "Wishes & Regrets", he: "משאלות וחרטות", em: "🌠", theme: "snow",
    grade: "י׳", level: "B1", band: "Proficiency",
    grammar: {
      rule: "wish / if only + past simple, past perfect, would",
      he: "משתמשים ב-wish או if only כדי לומר שהיינו רוצים שהמציאות תהיה אחרת. על ההווה: wish + past simple, למשל I wish I had a dog. עם be משתמשים לרוב ב-were לכל הגופים: I wish I were taller. על העבר (חרטה): wish + past perfect, למשל I wish I had studied. כשמישהו אחר מעצבן אותנו ואנחנו רוצים שישתנה: wish + would, למשל I wish he would stop. טעות נפוצה של דוברי עברית: I wish I have או I wish I will. אחרי wish לא משתמשים בהווה או בעתיד.",
      examples: [
        ["I wish I had a bigger room.", "הלוואי שהיה לי חדר גדול יותר."],
        ["If only I were older!", "הלוואי שהייתי גדול יותר!"],
        ["I wish I could fly.", "הלוואי שיכולתי לעוף."],
        ["I wish I had studied for the test.", "הלוואי שהייתי לומד למבחן."],
        ["If only we hadn't missed the bus.", "הלוואי שלא היינו מפספסים את האוטובוס."],
        ["I wish my brother would knock on the door.", "הלוואי שאחי היה דופק על הדלת."]
      ]
    },
    words: [
      ["wish", "משאלה, לייחל", "🌠"], ["regret", "חרטה, להתחרט", "😞"], ["if only", "הלוואי ש...", ""], ["imagine", "לדמיין", "💭"],
      ["dream", "חלום", "💤"], ["chance", "סיכוי, הזדמנות", "🎲"], ["opportunity", "הזדמנות", "🚪"], ["mistake", "טעות", "❌"],
      ["patience", "סבלנות", "⏳"], ["confident", "בטוח בעצמו", "💪"], ["ashamed", "מתבייש", "😳"], ["disappointed", "מאוכזב", "😕"],
      ["afford", "להרשות לעצמו (כספית)", "💰"], ["freedom", "חופש", "🕊️"], ["ability", "יכולת", "🦸"], ["talent", "כישרון", "🎨"],
      ["fluent", "שוטף (בשפה)", "🗣️"], ["apologize", "להתנצל", "🙏"]
    ],
    sentences: [
      ["I wish I had more time to read.", "הלוואי שהיה לי יותר זמן לקרוא."],
      ["If only I were on vacation right now.", "הלוואי שהייתי בחופשה עכשיו."],
      ["She wishes she had listened to her teacher.", "היא מצטערת שלא הקשיבה למורה שלה."],
      ["I wish you would call me more often.", "הלוואי שהיית מתקשר אליי יותר."],
      ["Do you regret leaving the team?", "אתה מתחרט שעזבת את הקבוצה?"],
      ["He wishes he could play the guitar.", "הוא היה רוצה לדעת לנגן בגיטרה."],
      ["If only we had taken the earlier train.", "הלוואי שהיינו לוקחים את הרכבת המוקדמת."],
      ["I wish it weren't so hot in the summer.", "הלוואי שלא היה כל כך חם בקיץ."],
      ["My dream is to speak English fluently.", "החלום שלי הוא לדבר אנגלית שוטפת."],
      ["Don't waste this opportunity.", "אל תבזבז את ההזדמנות הזאת."],
      ["I wish I hadn't been so impatient.", "הלוואי שלא הייתי כל כך חסר סבלנות."]
    ],
    gaps: [
      { s: "I wish I ___ more free time.", options: ["had", "have", "will have", "would have"], a: 0, he: "הלוואי שהיה לי יותר זמן פנוי.", why: "משאלה על ההווה: wish + past simple." },
      { s: "If only it ___ so cold today!", options: ["isn't", "weren't", "won't be", "hasn't been"], a: 1, he: "הלוואי שלא היה כל כך קר היום!", why: "עם be משתמשים ב-were אחרי wish / if only." },
      { s: "I wish I ___ harder for the test last week.", options: ["studied", "study", "had studied", "would study"], a: 2, he: "הלוואי שהייתי לומד יותר למבחן בשבוע שעבר.", why: "חרטה על העבר: wish + past perfect." },
      { s: "She wishes she ___ speak French.", options: ["can", "could", "will", "is able"], a: 1, he: "היא הייתה רוצה לדעת לדבר צרפתית.", why: "אחרי wish, can הופך ל-could." },
      { s: "I wish my neighbors ___ stop making noise at night.", options: ["will", "are", "would", "did"], a: 2, he: "הלוואי שהשכנים שלי יפסיקו להרעיש בלילה.", why: "תלונה על התנהגות של אחרים: wish + would." },
      { s: "If only we ___ the bus! Now we're late.", options: ["hadn't missed", "didn't miss", "don't miss", "wouldn't miss"], a: 0, he: "הלוואי שלא היינו מפספסים את האוטובוס! עכשיו אנחנו מאחרים.", why: "הפספוס כבר קרה, לכן past perfect." },
      { s: "Dan wishes he ___ taller.", options: ["is", "was being", "will be", "were"], a: 3, he: "דן היה רוצה להיות גבוה יותר.", why: "wish + were על מצב בהווה." },
      { s: "I wish I ___ that to my friend yesterday.", options: ["didn't say", "hadn't said", "don't say", "won't say"], a: 1, he: "הלוואי שלא הייתי אומר את זה לחבר שלי אתמול.", why: "yesterday = עבר, לכן past perfect." },
      { s: "Do you ever wish you ___ in another city?", options: ["will live", "live", "living", "lived"], a: 3, he: "אתה לפעמים רוצה שהיית גר בעיר אחרת?", why: "משאלה על ההווה: past simple." },
      { s: "I wish you ___ me the truth from the beginning.", options: ["told", "tell", "had told", "would tell"], a: 2, he: "הלוואי שהיית אומר לי את האמת מההתחלה.", why: "from the beginning מדבר על העבר." },
      { s: "If only I ___ the answer now!", options: ["knew", "know", "had known", "will know"], a: 0, he: "הלוואי שידעתי את התשובה עכשיו!", why: "now = הווה, לכן past simple." },
      { s: "My brother wishes he ___ to the party last night.", options: ["went", "goes", "would go", "had gone"], a: 3, he: "אחי מצטער שלא הלך למסיבה אתמול בלילה.", why: "last night = עבר, לכן past perfect." },
      { s: "I wish it ___ raining. I want to play outside.", options: ["would stop", "stops", "will stop", "is stopping"], a: 0, he: "הלוואי שהגשם ייפסק. אני רוצה לשחק בחוץ.", why: "רצון שמשהו ישתנה: wish + would." },
      { s: "We wish we ___ a bigger house.", options: ["have", "will have", "had", "are having"], a: 2, he: "הלוואי שהיה לנו בית גדול יותר.", why: "משאלה על ההווה: past simple." },
      { s: "She wishes she ___ so much money on clothes last month.", options: ["didn't spend", "hadn't spent", "doesn't spend", "won't spend"], a: 1, he: "היא מצטערת שהוציאה כל כך הרבה כסף על בגדים בחודש שעבר.", why: "last month = עבר, לכן past perfect." }
    ],
    transforms: [
      { task: "Wish (present)", q: "I don't have a bike.", a: "I wish I had a bike.", alt: [], he: "הלוואי שהיו לי אופניים" },
      { task: "Wish (present)", q: "I can't swim.", a: "I wish I could swim.", alt: [], he: "can הופך ל-could" },
      { task: "Wish (past)", q: "I didn't go to the concert.", a: "I wish I had gone to the concert.", alt: ["I wish I'd gone to the concert."], he: "חרטה על העבר: had + V3" },
      { task: "If only", q: "I am not good at math.", a: "If only I were good at math.", alt: ["If only I was good at math."], he: "if only + were" },
      { task: "Wish + would", q: "My sister keeps taking my clothes.", a: "I wish my sister would stop taking my clothes.", alt: [], he: "wish + would stop" },
      { task: "Wish (past)", q: "I ate too much cake.", a: "I wish I hadn't eaten so much cake.", alt: ["I wish I had not eaten so much cake.", "I wish I hadn't eaten too much cake.", "I wish I had not eaten too much cake."], he: "hadn't + V3" },
      { task: "Wish (present)", q: "It is raining.", a: "I wish it weren't raining.", alt: ["I wish it wasn't raining.", "I wish it were not raining.", "I wish it was not raining."], he: "weren't + ing" },
      { task: "If only (past)", q: "We lost the game.", a: "If only we hadn't lost the game.", alt: ["If only we had not lost the game."], he: "if only + hadn't + V3" }
    ],
    reading: {
      title: "The Wish Jar", he: "צנצנת המשאלות",
      text: "When Noa was twelve, her grandmother gave her an old glass jar and a pile of colorful paper. “Every time you wish for something,” she said, “write it down and put it in the jar. Once a year, we will read the notes together.” Noa thought it was a strange idea, but she agreed.\n\nAt first, her wishes were simple. “I wish I had a new phone.” “I wish my brother would stop taking my things.” “If only I were taller.” A few months later, the notes became more serious. After a fight with her best friend, Yael, she wrote: “I wish I hadn't said those words.”\n\nAt the end of the year, Noa and her grandmother opened the jar. They laughed at some of the notes, especially the one about the phone, because Noa had already forgotten about it. However, when they read the note about Yael, Noa became quiet. “Did you ever apologize?” her grandmother asked. Noa shook her head.\n\nHer grandmother explained that the jar was not magic. “Some wishes are about things we cannot change,” she said. “But many wishes are really messages to ourselves. They show us what we should do next.” That evening, Noa called Yael and said she was sorry. The two girls talked for an hour, and their friendship was saved.\n\nToday Noa is sixteen, and she still keeps the jar on her shelf. She no longer writes wishes about phones or height. Instead, she writes about goals that she can reach, and every year she is surprised by how many of them have come true.",
      questions: [
        { q: "What is the main message of the text?", he: "מה המסר המרכזי של הטקסט?", options: ["Wishes can help us understand what we need to do.", "Glass jars are good for keeping secrets.", "Grandmothers always buy phones for children.", "Friends should never have fights."], a: 0 },
        { q: "What did Noa do after reading the note about Yael?", he: "מה עשתה נועה אחרי שקראה את הפתק על יעל?", options: ["She threw the note away.", "She wrote a new wish.", "She called Yael to apologize.", "She asked her grandmother for a phone."], a: 2 },
        { q: "In “They show us what we should do next,” what does “They” refer to?", he: "למה מתייחסת המילה They במשפט?", options: ["The two girls", "Many wishes", "The colorful papers", "Noa's grandparents"], a: 1 },
        { q: "Why did Noa laugh at the note about the phone?", he: "למה נועה צחקה על הפתק על הטלפון?", options: ["Because the phone was broken.", "Because her brother had taken it.", "Because her grandmother had bought her one.", "Because the wish was no longer important to her."], a: 3 },
        { q: "The word “serious” (paragraph 2) is closest in meaning to:", he: "המילה serious קרובה במשמעותה ל:", options: ["funny", "important", "short", "colorful"], a: 1 }
      ]
    }
  },
  {
    id: "t10", title: "Detective Talk", he: "שפת הבלשים: מודלים בעבר", em: "🕵️", theme: "cave",
    grade: "י׳–י״א", level: "B1", band: "Proficiency",
    grammar: {
      rule: "modal + have + V3: must have, can't have, might have, should have, could have",
      he: "כדי לדבר על העבר עם מודלים משתמשים במבנה modal + have + V3. must have = אני בטוח שזה קרה (הסקה). can't have / couldn't have = אני בטוח שזה לא קרה. might have / may have / could have = אולי זה קרה. should have = היה צריך (ביקורת או חרטה), shouldn't have = לא היה צריך. could have = הייתה אפשרות, אבל זה לא קרה. טעות נפוצה: He must went או He should went. אחרי המודל תמיד have ואז V3: He must have gone.",
      examples: [
        ["The ground is wet. It must have rained.", "האדמה רטובה. בטוח ירד גשם."],
        ["She can't have seen me. She was asleep.", "היא לא ייתכן שראתה אותי. היא ישנה."],
        ["He might have missed the bus.", "אולי הוא פספס את האוטובוס."],
        ["You should have told me earlier.", "היית צריך להגיד לי קודם."],
        ["We could have won, but we didn't try.", "יכולנו לנצח, אבל לא התאמצנו."],
        ["I shouldn't have eaten so much.", "לא הייתי צריך לאכול כל כך הרבה."]
      ]
    },
    words: [
      ["evidence", "ראיות", "🔍"], ["clue", "רמז", "🧩"], ["suspect", "חשוד, לחשוד", "🕵️"], ["deduction", "הסקה", ""],
      ["conclusion", "מסקנה", ""], ["probably", "כנראה", ""], ["certainly", "בוודאות", ""], ["impossible", "בלתי אפשרי", "🚫"],
      ["careless", "רשלן, לא זהיר", ""], ["advice", "עצה", "💡"], ["criticism", "ביקורת", ""], ["blame", "להאשים", "👉"],
      ["reason", "סיבה", ""], ["missing", "חסר, נעדר", "❓"], ["footprint", "עקבה", "👣"], ["detective", "בלש", "🔎"],
      ["witness", "עד", "👀"], ["mystery", "תעלומה", "❔"]
    ],
    sentences: [
      ["Someone must have left the door open.", "מישהו בטוח השאיר את הדלת פתוחה."],
      ["He can't have finished the book already.", "לא ייתכן שהוא כבר סיים את הספר."],
      ["They might have gone to the beach.", "אולי הם הלכו לחוף."],
      ["You should have asked for help.", "היית צריך לבקש עזרה."],
      ["I shouldn't have shouted at my brother.", "לא הייתי צריך לצעוק על אחי."],
      ["We could have taken a taxi.", "יכולנו לקחת מונית."],
      ["The detective found an important clue.", "הבלש מצא רמז חשוב."],
      ["Who could have taken my keys?", "מי יכול היה לקחת את המפתחות שלי?"],
      ["She must have been very tired.", "היא בטח הייתה עייפה מאוד."],
      ["There is no evidence that he was there.", "אין שום ראיה שהוא היה שם."],
      ["Don't blame yourself for the mistake.", "אל תאשים את עצמך בטעות."]
    ],
    gaps: [
      { s: "The streets are wet. It ___ rained last night.", options: ["must have", "should have", "can't have", "must"], a: 0, he: "הרחובות רטובים. בטוח ירד גשם אתמול בלילה.", why: "הסקה בטוחה על העבר: must have + V3." },
      { s: "Adam ___ seen the movie. He was at home all evening.", options: ["must have", "can't have", "should have", "might"], a: 1, he: "לא ייתכן שאדם ראה את הסרט. הוא היה בבית כל הערב.", why: "בטוחים שזה לא קרה: can't have." },
      { s: "You ___ told me about the test! Now I'm not ready.", options: ["must have", "might have", "should have", "can't have"], a: 2, he: "היית צריך לספר לי על המבחן! עכשיו אני לא מוכן.", why: "ביקורת על העבר: should have." },
      { s: "I'm not sure where Maya is. She ___ gone to the library.", options: ["can't have", "should have", "must", "might have"], a: 3, he: "אני לא בטוח איפה מאיה. אולי היא הלכה לספרייה.", why: "אפשרות בעבר: might have." },
      { s: "He must have ___ the bus.", options: ["missed", "miss", "missing", "to miss"], a: 0, he: "הוא בטח פספס את האוטובוס.", why: "אחרי must have בא V3." },
      { s: "We ___ won the game if we had practiced more.", options: ["must have", "could have", "can't have", "should"], a: 1, he: "יכולנו לנצח במשחק אם היינו מתאמנים יותר.", why: "אפשרות שלא התממשה: could have." },
      { s: "I ___ eaten that extra pizza. Now I feel sick.", options: ["must have", "might have", "shouldn't have", "can't have"], a: 2, he: "לא הייתי צריך לאכול את הפיצה הנוספת. עכשיו אני מרגיש רע.", why: "חרטה על משהו שעשינו: shouldn't have." },
      { s: "The window is broken. Someone ___ thrown a ball.", options: ["should have", "can't have", "must", "must have"], a: 3, he: "החלון שבור. בטוח מישהו זרק כדור.", why: "הסקה בטוחה: must have + V3." },
      { s: "She can't have ___ the answer. She didn't study at all.", options: ["known", "knew", "know", "knowing"], a: 0, he: "לא ייתכן שהיא ידעה את התשובה. היא בכלל לא למדה.", why: "אחרי have בא V3: known." },
      { s: "Noa isn't answering. She ___ be asleep.", options: ["must have", "might", "should have", "can't have"], a: 1, he: "נועה לא עונה. אולי היא ישנה.", why: "על ההווה משתמשים במודל בלי have." },
      { s: "You ___ worn a coat. It was freezing outside!", options: ["can't have", "might have", "should have", "must"], a: 2, he: "היית צריך ללבוש מעיל. היה קפוא בחוץ!", why: "עצה מאוחרת על העבר: should have." },
      { s: "Ben ___ cooked this cake. He doesn't know how to bake.", options: ["must have", "should have", "could", "can't have"], a: 3, he: "לא ייתכן שבן אפה את העוגה הזאת. הוא לא יודע לאפות.", why: "בטוחים שזה לא קרה: can't have." },
      { s: "They ___ forgotten about the meeting. Nobody came.", options: ["must have", "can't have", "should have", "shouldn't"], a: 0, he: "הם בטח שכחו מהפגישה. אף אחד לא הגיע.", why: "הסקה לפי הראיות: must have." },
      { s: "I might have ___ my phone on the bus.", options: ["leave", "left", "leaving", "leaved"], a: 1, he: "אולי השארתי את הטלפון באוטובוס.", why: "V3 של leave הוא left." },
      { s: "He ___ been the thief. He was in another country.", options: ["must have", "should have", "couldn't have", "might have"], a: 2, he: "הוא לא יכול היה להיות הגנב. הוא היה בארץ אחרת.", why: "בלתי אפשרי בעבר: couldn't have." }
    ],
    transforms: [
      { task: "must have", q: "I'm sure he forgot his keys.", a: "He must have forgotten his keys.", alt: [], he: "must have + V3" },
      { task: "can't have", q: "I'm sure she didn't see us.", a: "She can't have seen us.", alt: ["She couldn't have seen us."], he: "can't have + V3" },
      { task: "might have", q: "Perhaps they went home.", a: "They might have gone home.", alt: ["They may have gone home.", "They could have gone home."], he: "might have + V3" },
      { task: "should have", q: "It was a mistake not to call you.", a: "I should have called you.", alt: [], he: "should have + V3" },
      { task: "shouldn't have", q: "It was wrong of me to shout.", a: "I shouldn't have shouted.", alt: ["I should not have shouted."], he: "shouldn't have + V3" },
      { task: "must have", q: "I'm sure Tom was very hungry.", a: "Tom must have been very hungry.", alt: [], he: "must have been" },
      { task: "could have", q: "It was possible for us to win, but we didn't.", a: "We could have won.", alt: [], he: "could have + V3" },
      { task: "can't have", q: "It's impossible that Dan wrote this.", a: "Dan can't have written this.", alt: ["Dan couldn't have written this."], he: "can't have + written" }
    ],
    reading: {
      title: "The Missing Cake", he: "העוגה שנעלמה",
      text: "On Friday morning, the school's bake sale was supposed to start at ten o'clock. Maya and Adam, who were in charge, had baked a huge chocolate cake the night before and left it in the teachers' kitchen. But when they arrived at nine, the cake was gone. Only a few crumbs and an empty plate were left on the table.\n\nAdam was furious. “Someone must have taken it,” he said. “The door was locked, so it must have been a person with a key.” Maya was calmer. She looked around the room like a detective. There were small white footprints on the floor, leading to the window. “Flour,” she said. “Whoever did this must have stepped in the flour we spilled yesterday.”\n\nThey checked the window. It was open, but it was far too small for an adult. “It can't have been a teacher,” Maya decided. “And it couldn't have been a student, because the school was closed all night.” Adam scratched his head. “Then who might have done it?”\n\nAt that moment, they heard a noise behind the fridge. A thin gray cat appeared, with chocolate all over its face. The two friends burst out laughing. The cat must have climbed in through the window after it smelled the cake.\n\nLater, the principal told them that they should have put the cake in the fridge, and they agreed. Fortunately, several parents quickly baked more cakes, and the sale was a great success. Adam joked that they could have sold tickets to meet the famous cake thief.",
      questions: [
        { q: "What is the text mainly about?", he: "על מה בעיקר הטקסט?", options: ["How to bake a chocolate cake", "How two students solved a small mystery", "Why cats like chocolate", "How a bake sale is organized"], a: 1 },
        { q: "Where did the white footprints lead?", he: "לאן הובילו העקבות הלבנות?", options: ["To the fridge", "To the door", "To the window", "To the principal's office"], a: 2 },
        { q: "Why did Maya decide it couldn't have been a teacher?", he: "למה מאיה החליטה שזה לא יכול היה להיות מורה?", options: ["The window was too small for an adult.", "Teachers don't eat cake.", "The teachers were on a trip.", "The door had no lock."], a: 0 },
        { q: "In “It was open,” what does “It” refer to?", he: "למה מתייחסת המילה It?", options: ["The kitchen", "The fridge", "The cake", "The window"], a: 3 },
        { q: "The word “furious” (paragraph 2) means:", he: "המילה furious פירושה:", options: ["very happy", "very angry", "very tired", "very hungry"], a: 1 }
      ]
    }
  },
  {
    id: "t11", title: "By 2050", he: "עד שנת 2050: עתיד מתקדם", em: "🚀", theme: "sky",
    grade: "י״א", level: "B2", band: "Proficiency",
    grammar: {
      rule: "Future perfect (will have + V3) & future progressive (will be + -ing)",
      he: "future perfect: will have + V3. מתאר פעולה שתסתיים לפני נקודת זמן בעתיד, ובדרך כלל מופיעה מילה כמו by (עד): By 2030, I will have finished school. future progressive: will be + ing. מתאר פעולה שתהיה באמצע שלה ברגע מסוים בעתיד: This time tomorrow, I will be flying to London. טעות נפוצה: By next year I will finish. כשיש by ונקודת סיום, עדיף will have finished.",
      examples: [
        ["By June, I will have finished all my exams.", "עד יוני אסיים את כל המבחנים שלי."],
        ["This time next week, we will be lying on the beach.", "בשבוע הבא בשעה כזאת נשכב על החוף."],
        ["By the time you arrive, the film will have started.", "עד שתגיע, הסרט כבר יתחיל."],
        ["At 8 p.m. I will be studying.", "בשמונה בערב אהיה באמצע לימודים."],
        ["She will have saved enough money by the summer.", "עד הקיץ היא תחסוך מספיק כסף."],
        ["Will you be using the computer tonight?", "תשתמש במחשב הערב?"]
      ]
    },
    words: [
      ["deadline", "מועד אחרון", "⏰"], ["graduate", "לסיים לימודים", "🎓"], ["by then", "עד אז", ""], ["schedule", "לוח זמנים", "📅"],
      ["achieve", "להשיג", "🏆"], ["complete", "להשלים", "✅"], ["career", "קריירה", "💼"], ["retire", "לפרוש לגמלאות", "👴"],
      ["decade", "עשור", "🔟"], ["century", "מאה (שנים)", "💯"], ["predict", "לחזות", "🔮"], ["progress", "התקדמות", "📈"],
      ["launch", "שיגור, להשיק", "🚀"], ["astronaut", "אסטרונאוט", "👨‍🚀"], ["colony", "מושבה", "🏘️"], ["robot", "רובוט", "🤖"],
      ["population", "אוכלוסייה", "👥"], ["by the time", "עד ש...", ""]
    ],
    sentences: [
      ["By 2050, scientists will have found new medicines.", "עד 2050 המדענים ימצאו תרופות חדשות."],
      ["This time tomorrow, I will be taking my exam.", "מחר בשעה כזאת אהיה באמצע המבחן."],
      ["By the time we get home, Mom will have cooked dinner.", "עד שנגיע הביתה, אמא כבר תבשל ארוחת ערב."],
      ["Will you be working on Sunday?", "תעבוד ביום ראשון?"],
      ["I will have graduated by the time I'm eighteen.", "עד שאהיה בן שמונה עשרה אסיים את בית הספר."],
      ["In ten years, people will be driving electric cars.", "בעוד עשר שנים אנשים ייסעו במכוניות חשמליות."],
      ["The deadline is next Friday.", "המועד האחרון הוא ביום שישי הבא."],
      ["By then, the population will have grown.", "עד אז האוכלוסייה תגדל."],
      ["At midnight, we will be flying over the sea.", "בחצות נטוס מעל הים."],
      ["She hopes to achieve her goals before thirty.", "היא מקווה להשיג את המטרות שלה לפני גיל שלושים."],
      ["Robots will be doing many jobs in the future.", "רובוטים יעשו הרבה עבודות בעתיד."]
    ],
    gaps: [
      { s: "By next June, I ___ my driving test.", options: ["will have passed", "will pass", "pass", "will be passing"], a: 0, he: "עד יוני הבא אעבור את מבחן הנהיגה.", why: "by + נקודת זמן: future perfect." },
      { s: "This time tomorrow, we ___ to Eilat.", options: ["will have driven", "will be driving", "drive", "are drove"], a: 1, he: "מחר בשעה כזאת ניסע לאילת.", why: "באמצע פעולה ברגע בעתיד: future progressive." },
      { s: "By the time you wake up, I ___ for work.", options: ["leave", "will be leaving", "will have left", "left"], a: 2, he: "עד שתתעורר, כבר אצא לעבודה.", why: "הפעולה תסתיים לפני: will have left." },
      { s: "Don't call at eight. I ___ dinner then.", options: ["will have", "will have had", "have", "will be having"], a: 3, he: "אל תתקשר בשמונה. אהיה אז באמצע ארוחת ערב.", why: "באמצע פעולה: will be having." },
      { s: "By 2040, scientists will have ___ a cure.", options: ["found", "find", "finding", "founded"], a: 0, he: "עד 2040 המדענים ימצאו תרופה.", why: "אחרי will have בא V3: found." },
      { s: "At 10 a.m. tomorrow, Noa ___ her presentation.", options: ["will have given", "will be giving", "gives", "is give"], a: 1, he: "מחר בעשר בבוקר נועה תהיה באמצע המצגת שלה.", why: "ברגע מסוים בעתיד: will be + ing." },
      { s: "They ___ the new bridge by the end of the year.", options: ["will be building", "build", "will have built", "are build"], a: 2, he: "הם יסיימו לבנות את הגשר החדש עד סוף השנה.", why: "by the end of: future perfect." },
      { s: "Will you ___ the car this evening? I need it.", options: ["have used", "used", "use being", "be using"], a: 3, he: "תשתמש ברכב הערב? אני צריך אותו.", why: "שאלה מנומסת על תוכניות: will you be + ing." },
      { s: "By the time the guests arrive, we ___ the house.", options: ["will have cleaned", "will be clean", "clean", "cleaned"], a: 0, he: "עד שהאורחים יגיעו, ננקה את הבית.", why: "by the time: future perfect." },
      { s: "In 2050, people ___ on Mars.", options: ["will have live", "will be living", "lives", "living"], a: 1, he: "בשנת 2050 אנשים יגורו על מאדים.", why: "מצב מתמשך בעתיד: will be living." },
      { s: "I will have ___ this book by Friday.", options: ["read", "reading", "readed", "to read"], a: 0, he: "אסיים את הספר הזה עד יום שישי.", why: "V3 של read הוא read." },
      { s: "Next month, my grandparents ___ married for fifty years.", options: ["will be", "are", "will have been", "have been"], a: 2, he: "בחודש הבא סבא וסבתא שלי יהיו נשואים חמישים שנה.", why: "משך זמן עד נקודה בעתיד: will have been." },
      { s: "Don't worry. By the time you finish school, you ___ a lot.", options: ["learn", "will be learn", "learned", "will have learned"], a: 3, he: "אל תדאג. עד שתסיים את בית הספר, תלמד הרבה.", why: "by the time: future perfect." },
      { s: "At this time next year, I ___ in the army.", options: ["will be serving", "will have served", "serve", "served"], a: 0, he: "בשנה הבאה בזמן הזה אהיה בשירות בצבא.", why: "באמצע מצב בעתיד: will be serving." },
      { s: "By the end of the day, the robot ___ 500 boxes.", options: ["will be packing", "will have packed", "packs", "packed"], a: 1, he: "עד סוף היום הרובוט יארוז 500 קופסאות.", why: "כמות שתושלם עד נקודה: future perfect." }
    ],
    transforms: [
      { task: "Future perfect", q: "I will finish the project. (by Monday)", a: "I will have finished the project by Monday.", alt: ["I'll have finished the project by Monday."], he: "will have + V3 + by" },
      { task: "Future progressive", q: "At 9 p.m. I study. (tomorrow)", a: "At 9 p.m. tomorrow I will be studying.", alt: ["Tomorrow at 9 p.m. I will be studying.", "At 9 p.m. tomorrow I'll be studying."], he: "will be + ing" },
      { task: "Future perfect", q: "They will build the school. (by 2030)", a: "They will have built the school by 2030.", alt: ["They'll have built the school by 2030."], he: "will have built" },
      { task: "Future progressive", q: "We fly to London. (this time next week)", a: "This time next week we will be flying to London.", alt: ["This time next week, we will be flying to London.", "This time next week we'll be flying to London."], he: "will be flying" },
      { task: "Future perfect (negative)", q: "She won't finish the book. (by tomorrow)", a: "She won't have finished the book by tomorrow.", alt: ["She will not have finished the book by tomorrow."], he: "won't have + V3" },
      { task: "Question", q: "you / use / the laptop tonight? (future progressive)", a: "Will you be using the laptop tonight?", alt: [], he: "Will you be + ing?" },
      { task: "Future perfect", q: "By the time we arrive, the train / leave", a: "By the time we arrive, the train will have left.", alt: ["By the time we arrive the train will have left."], he: "will have left" },
      { task: "Future perfect", q: "I save 1,000 shekels. (by the summer)", a: "I will have saved 1,000 shekels by the summer.", alt: ["I'll have saved 1,000 shekels by the summer."], he: "will have saved" }
    ],
    reading: {
      title: "A Letter to My Future Self", he: "מכתב לעצמי בעתיד",
      text: "Dear Sam,\n\nI am writing this letter in my bedroom, at the age of fifteen, and you will read it ten years from now. By then, you will have finished school and the army, and you will probably be studying at a university or working at your first real job. I wonder which one it will be.\n\nRight now, I have big plans. I want to become an engineer and help build cleaner cities. Our teacher says that by 2050 more than two thirds of the world's population will be living in cities. If that is true, someone will need to design better buses, smarter buildings and parks that keep the streets cool. I hope that you will have taken at least a small step toward that goal.\n\nI also hope that you will not have forgotten the important things. Are you still playing basketball with Dan every Friday? Have you kept your promise to call Grandma every week? I know that life will be busy. You will be meeting new people, traveling and learning new skills. Still, please remember where you came from.\n\nMaybe some of my dreams will have changed by the time you read this. That is fine. People grow, and plans grow with them. But I want you to know that the boy writing this letter believes in you. He thinks you can achieve almost anything if you work hard and stay kind.\n\nSo, future Sam, please write back. Tell me what you will have achieved, and what you are still dreaming about.\n\nYours,\nSam (age 15)",
      questions: [
        { q: "What is the purpose of the letter?", he: "מה מטרת המכתב?", options: ["To ask a university for a place", "To share hopes and plans with his future self", "To complain about his teacher", "To invite Dan to play basketball"], a: 1 },
        { q: "According to the teacher, what will happen by 2050?", he: "לפי המורה, מה יקרה עד 2050?", options: ["Most people will live in cities.", "All buses will be electric.", "Cities will be smaller.", "People will stop traveling."], a: 0 },
        { q: "In “that goal” (paragraph 2), the goal is:", he: "המטרה שהוא מתכוון אליה היא:", options: ["playing basketball every week", "finishing the army", "helping build cleaner cities", "traveling around the world"], a: 2 },
        { q: "What can we infer about Sam from paragraph 3?", he: "מה אפשר להסיק על סאם מהפסקה השלישית?", options: ["He doesn't like his grandmother.", "He plans to stop playing sports.", "He wants to move to another country.", "Family and friends are important to him."], a: 3 },
        { q: "The word “achieve” (paragraph 4) is closest in meaning to:", he: "המילה achieve קרובה במשמעותה ל:", options: ["succeed in doing", "forget about", "write down", "pay for"], a: 0 }
      ]
    }
  },
  {
    id: "t12", title: "Habits & Changes", he: "הרגלים ושינויים: -ing או to", em: "🔁", theme: "castle",
    grade: "י׳", level: "B1", band: "Proficiency",
    grammar: {
      rule: "Gerund vs infinitive; used to / be used to / get used to",
      he: "יש פעלים שאחריהם בא ing (gerund): enjoy, avoid, finish, mind, admit, suggest, consider. יש פעלים שאחריהם בא to + פועל: want, decide, refuse, manage, pretend, hope. בפעלים remember, stop, try המשמעות משתנה: stop smoking = להפסיק לעשן, stop to drink = לעצור כדי לשתות. used to + פועל = הרגל בעבר שכבר לא קיים: I used to live in Haifa. be used to + ing = להיות רגיל למשהו, get used to + ing = להתרגל. טעות נפוצה: I am used to wake up early. נכון: I am used to waking up early.",
      examples: [
        ["I enjoy playing chess.", "אני נהנה לשחק שחמט."],
        ["She decided to learn Spanish.", "היא החליטה ללמוד ספרדית."],
        ["He stopped eating sweets.", "הוא הפסיק לאכול ממתקים."],
        ["We stopped to buy water.", "עצרנו כדי לקנות מים."],
        ["I used to have long hair.", "פעם היה לי שיער ארוך."],
        ["I'm getting used to living in a new city.", "אני מתרגל לגור בעיר חדשה."]
      ]
    },
    words: [
      ["habit", "הרגל", "🔁"], ["quit", "להפסיק, לעזוב", "🛑"], ["avoid", "להימנע", "⛔"], ["enjoy", "ליהנות", "😊"],
      ["consider", "לשקול", "🤔"], ["manage", "להצליח (במאמץ)", "🧗"], ["refuse", "לסרב", "🙅"], ["pretend", "להעמיד פנים", "🎭"],
      ["suggest", "להציע", "💬"], ["admit", "להודות", "🙋"], ["deny", "להכחיש", "🙅‍♂️"], ["attempt", "ניסיון, לנסות", "🎯"],
      ["hesitate", "להסס", "⏸️"], ["adapt", "להסתגל", "🦎"], ["childhood", "ילדות", "🧸"], ["neighborhood", "שכונה", "🏘️"],
      ["mind", "להתנגד, להפריע", ""], ["practice", "להתאמן, אימון", "🏋️"]
    ],
    sentences: [
      ["I used to play the piano when I was a child.", "פעם ניגנתי בפסנתר כשהייתי ילד."],
      ["He isn't used to waking up so early.", "הוא לא רגיל לקום כל כך מוקדם."],
      ["It took me a year to get used to the weather.", "לקח לי שנה להתרגל למזג האוויר."],
      ["Do you mind opening the window?", "אכפת לך לפתוח את החלון?"],
      ["She refused to answer the question.", "היא סירבה לענות על השאלה."],
      ["Remember to lock the door.", "תזכור לנעול את הדלת."],
      ["I remember visiting this place as a child.", "אני זוכר שביקרתי במקום הזה כילד."],
      ["Try turning it off and on again.", "נסה לכבות ולהדליק את זה שוב."],
      ["We managed to finish the project on time.", "הצלחנו לסיים את הפרויקט בזמן."],
      ["He admitted breaking the window.", "הוא הודה ששבר את החלון."],
      ["My father quit smoking ten years ago.", "אבא שלי הפסיק לעשן לפני עשר שנים."]
    ],
    gaps: [
      { s: "I really enjoy ___ in the sea.", options: ["swimming", "to swim", "swim", "swam"], a: 0, he: "אני מאוד נהנה לשחות בים.", why: "אחרי enjoy בא ing." },
      { s: "She decided ___ a new language.", options: ["learning", "to learn", "learn", "learned"], a: 1, he: "היא החליטה ללמוד שפה חדשה.", why: "אחרי decide בא to + פועל." },
      { s: "When I was young, I ___ live in Tiberias.", options: ["was used to", "am used to", "used to", "use to"], a: 2, he: "כשהייתי צעיר גרתי בטבריה.", why: "הרגל או מצב בעבר: used to + פועל." },
      { s: "I'm not used to ___ so much homework.", options: ["do", "did", "to do", "doing"], a: 3, he: "אני לא רגיל לעשות כל כך הרבה שיעורי בית.", why: "be used to + ing." },
      { s: "We stopped ___ a photo of the sunset.", options: ["to take", "taking", "take", "took"], a: 0, he: "עצרנו כדי לצלם את השקיעה.", why: "stop to = לעצור כדי לעשות משהו." },
      { s: "Please stop ___ noise. I'm trying to sleep.", options: ["to make", "making", "make", "made"], a: 1, he: "בבקשה תפסיק להרעיש. אני מנסה לישון.", why: "stop + ing = להפסיק פעולה." },
      { s: "Would you mind ___ me with this box?", options: ["to help", "help", "helping", "helped"], a: 2, he: "אכפת לך לעזור לי עם הקופסה הזאת?", why: "אחרי mind בא ing." },
      { s: "Don't forget ___ your grandmother tonight.", options: ["calling", "called", "call", "to call"], a: 3, he: "אל תשכח להתקשר לסבתא שלך הערב.", why: "forget to = לשכוח לעשות משהו שצריך." },
      { s: "It's hard to get used to ___ in a new school.", options: ["studying", "study", "studied", "to study"], a: 0, he: "קשה להתרגל ללמוד בבית ספר חדש.", why: "get used to + ing." },
      { s: "He avoided ___ the teacher's question.", options: ["to answer", "answering", "answer", "answers"], a: 1, he: "הוא נמנע מלענות על השאלה של המורה.", why: "אחרי avoid בא ing." },
      { s: "I remember ___ this film when I was ten.", options: ["to see", "see", "seeing", "saw"], a: 2, he: "אני זוכר שראיתי את הסרט הזה כשהייתי בן עשר.", why: "remember + ing = לזכור משהו שקרה." },
      { s: "They managed ___ the top of the mountain.", options: ["reaching", "reach", "reached", "to reach"], a: 3, he: "הם הצליחו להגיע לפסגת ההר.", why: "אחרי manage בא to + פועל." },
      { s: "My mom suggested ___ a picnic.", options: ["having", "to have", "have", "had"], a: 0, he: "אמא שלי הציעה לעשות פיקניק.", why: "אחרי suggest בא ing." },
      { s: "There ___ be a park here, but now it's a mall.", options: ["is used to", "used to", "use to", "was used"], a: 1, he: "פעם היה כאן פארק, אבל עכשיו יש קניון.", why: "מצב בעבר שהשתנה: used to." },
      { s: "If the door is stuck, try ___ it harder.", options: ["to push", "push", "pushing", "pushed"], a: 2, he: "אם הדלת תקועה, נסה לדחוף אותה חזק יותר.", why: "try + ing = לנסות שיטה כדי לראות אם תעבוד." }
    ],
    transforms: [
      { task: "used to", q: "I played football every day in the past, but I don't now.", a: "I used to play football every day.", alt: [], he: "used to + פועל" },
      { task: "be used to", q: "Living in a big city is normal for me.", a: "I am used to living in a big city.", alt: ["I'm used to living in a big city."], he: "be used to + ing" },
      { task: "get used to", q: "It became normal for her to wake up early.", a: "She got used to waking up early.", alt: [], he: "got used to + ing" },
      { task: "Gerund", q: "I like to read comics. (enjoy)", a: "I enjoy reading comics.", alt: [], he: "enjoy + ing" },
      { task: "Infinitive", q: "He said no to helping us. (refuse)", a: "He refused to help us.", alt: [], he: "refuse + to" },
      { task: "stop", q: "He doesn't eat meat anymore. (stop)", a: "He stopped eating meat.", alt: ["He has stopped eating meat."], he: "stop + ing" },
      { task: "Gerund", q: "He said that he broke the vase. (admit)", a: "He admitted breaking the vase.", alt: ["He admitted to breaking the vase.", "He admitted that he broke the vase."], he: "admit + ing" },
      { task: "Infinitive", q: "We finished the race in the end, although it was hard. (manage)", a: "We managed to finish the race.", alt: [], he: "manage + to" }
    ],
    reading: {
      title: "Getting Used to a New Home", he: "להתרגל לבית חדש",
      text: "Two years ago, Ben's family moved from London to a small town in the north of Israel. At first, Ben hated almost everything about his new life. In London, he used to walk to school with his friends, play football in the park and eat fish and chips on Friday afternoons. In his new town, he didn't know anyone, the summer was terribly hot, and he couldn't understand his classmates when they spoke quickly in Hebrew.\n\nDuring the first months, Ben avoided speaking in class. He was afraid of making mistakes, so he pretended to be busy with his notebook. His teacher noticed this and suggested joining the school's basketball team. “You don't need perfect Hebrew to pass a ball,” she said with a smile.\n\nBen decided to try. The first practice was difficult, but his teammates were friendly. They taught him useful words, and he taught them some English slang. Slowly, he stopped worrying about his accent. He even started making jokes in Hebrew, and his friends laughed with him, not at him.\n\nToday Ben is used to the hot weather, although he still misses the London rain sometimes. He has got used to eating hummus for breakfast, and he enjoys hiking in the hills on Saturdays with his family. When new students arrive at his school, Ben is the first person to welcome them. He remembers feeling lonely, and he wants to make their first days easier.\n\n“Moving is hard,” he says, “but you can get used to almost anything if you give it time and keep trying.”",
      questions: [
        { q: "What is the main idea of the text?", he: "מה הרעיון המרכזי של הטקסט?", options: ["London is better than Israel.", "Basketball is an easy sport.", "With time and effort, Ben adapted to his new home.", "Ben's teacher didn't like him."], a: 2 },
        { q: "Why did Ben avoid speaking in class at first?", he: "למה בן נמנע מלדבר בכיתה בהתחלה?", options: ["He was afraid of making mistakes.", "He didn't like his teacher.", "He was always tired.", "He wanted to go back to London."], a: 0 },
        { q: "Who suggested joining the basketball team?", he: "מי הציע להצטרף לקבוצת הכדורסל?", options: ["His father", "His teacher", "A new student", "His friends from London"], a: 1 },
        { q: "What can we learn about Ben from the last paragraph?", he: "מה אפשר ללמוד על בן מהפסקה האחרונה?", options: ["He still hates his new town.", "He wants to move back soon.", "He never felt lonely.", "He is kind to new students because he remembers how he felt."], a: 3 },
        { q: "In “they taught him useful words,” “they” refers to:", he: "המילה they מתייחסת ל:", options: ["his teammates", "his parents", "his teachers", "the new students"], a: 0 }
      ]
    }
  },
  {
    id: "t13", title: "Linking Ideas", he: "מילות קישור", em: "🔗", theme: "grass",
    grade: "י׳–י״א", level: "B1", band: "Proficiency",
    grammar: {
      rule: "Connectors: however, although, despite, therefore, whereas, moreover",
      he: "מילות קישור מראות את הקשר בין רעיונות. ניגוד: although + משפט שלם (Although it rained, we went out), despite / in spite of + שם עצם או ing (Despite the rain), however / nevertheless / nonetheless בתחילת משפט חדש ואחריהן פסיק. השוואה: whereas. תוצאה: therefore, as a result, consequently. הוספה: moreover, furthermore, in addition. טעות נפוצה של דוברי עברית: Despite it was raining. אחרי despite לא בא משפט עם נושא ופועל. נכון: Although it was raining או Despite the rain.",
      examples: [
        ["Although he was tired, he finished his homework.", "למרות שהיה עייף, הוא סיים את שיעורי הבית."],
        ["Despite the rain, we went for a walk.", "למרות הגשם, יצאנו לטיול."],
        ["It was expensive. However, we bought it.", "זה היה יקר. עם זאת, קנינו את זה."],
        ["She studied hard; therefore, she passed.", "היא למדה קשה, ולכן עברה."],
        ["Dan loves tea, whereas Ben prefers coffee.", "דן אוהב תה, ואילו בן מעדיף קפה."],
        ["The plan is cheap. Moreover, it is easy.", "התוכנית זולה. יתרה מזאת, היא קלה."]
      ]
    },
    words: [
      ["however", "עם זאת", ""], ["although", "למרות ש...", ""], ["despite", "למרות (+ שם עצם)", ""], ["in spite of", "חרף, למרות", ""],
      ["nonetheless", "אף על פי כן", ""], ["therefore", "לכן", ""], ["whereas", "ואילו", ""], ["moreover", "יתרה מזאת", "➕"],
      ["furthermore", "בנוסף לכך", ""], ["consequently", "כתוצאה מכך", ""], ["instead", "במקום זאת", "🔄"], ["otherwise", "אחרת", ""],
      ["unless", "אלא אם כן", ""], ["as a result", "כתוצאה מכך", ""], ["on the other hand", "מצד שני", "🤲"], ["in addition", "בנוסף", ""],
      ["nevertheless", "בכל זאת", ""], ["meanwhile", "בינתיים", "⏳"]
    ],
    sentences: [
      ["Although it was late, we kept talking.", "למרות שהיה מאוחר, המשכנו לדבר."],
      ["Despite his injury, he played the whole game.", "למרות הפציעה שלו, הוא שיחק את כל המשחק."],
      ["The test was hard. However, most students passed.", "המבחן היה קשה. עם זאת, רוב התלמידים עברו."],
      ["It was raining; therefore, the trip was cancelled.", "ירד גשם, ולכן הטיול בוטל."],
      ["My sister loves math, whereas I prefer history.", "אחותי אוהבת מתמטיקה, ואילו אני מעדיף היסטוריה."],
      ["Walking is healthy. Moreover, it's free.", "הליכה בריאה. יתרה מזאת, היא בחינם."],
      ["Hurry up, otherwise we'll miss the bus.", "תמהר, אחרת נפספס את האוטובוס."],
      ["You can't go unless you finish your homework.", "אתה לא יכול ללכת אלא אם כן תסיים את שיעורי הבית."],
      ["Instead of watching TV, let's go for a walk.", "במקום לראות טלוויזיה, בוא נצא לטיול."],
      ["In spite of the noise, the baby slept.", "למרות הרעש, התינוק ישן."],
      ["On the one hand it's fun; on the other hand, it's dangerous.", "מצד אחד זה כיף, מצד שני זה מסוכן."]
    ],
    gaps: [
      { s: "___ it was cold, we went swimming.", options: ["Although", "Despite", "However", "Therefore"], a: 0, he: "למרות שהיה קר, הלכנו לשחות.", why: "although + משפט שלם עם נושא ופועל." },
      { s: "___ the heavy traffic, we arrived on time.", options: ["Although", "Despite", "Whereas", "Moreover"], a: 1, he: "למרות הפקקים הכבדים, הגענו בזמן.", why: "despite + שם עצם." },
      { s: "The phone is great. ___, it's very expensive.", options: ["Therefore", "Although", "However", "Unless"], a: 2, he: "הטלפון מעולה. עם זאת, הוא יקר מאוד.", why: "ניגוד בתחילת משפט חדש: However." },
      { s: "He didn't study; ___, he failed the test.", options: ["however", "whereas", "although", "therefore"], a: 3, he: "הוא לא למד, ולכן נכשל במבחן.", why: "תוצאה: therefore." },
      { s: "Maya is very quiet, ___ her brother never stops talking.", options: ["whereas", "therefore", "despite", "moreover"], a: 0, he: "מאיה שקטה מאוד, ואילו אחיה לא מפסיק לדבר.", why: "השוואה בין שני אנשים: whereas." },
      { s: "Cycling is good exercise. ___, it's good for the environment.", options: ["However", "Moreover", "Although", "Otherwise"], a: 1, he: "רכיבה על אופניים היא פעילות גופנית טובה. יתרה מזאת, היא טובה לסביבה.", why: "הוספת רעיון: Moreover." },
      { s: "In spite of ___ tired, she went to the gym.", options: ["she was", "was", "being", "be"], a: 2, he: "למרות שהייתה עייפה, היא הלכה לחדר הכושר.", why: "in spite of + ing." },
      { s: "Take an umbrella, ___ you'll get wet.", options: ["therefore", "although", "moreover", "otherwise"], a: 3, he: "קח מטריה, אחרת תירטב.", why: "otherwise = אם לא." },
      { s: "We won't go to the beach ___ the weather improves.", options: ["unless", "although", "however", "whereas"], a: 0, he: "לא נלך לחוף אלא אם כן מזג האוויר ישתפר.", why: "unless = אלא אם כן." },
      { s: "The road was closed. ___, we had to take another route.", options: ["Although", "As a result", "Despite", "Whereas"], a: 1, he: "הכביש היה סגור. כתוצאה מכך, נאלצנו לנסוע בדרך אחרת.", why: "תוצאה: As a result." },
      { s: "___ of going by car, we took the train.", options: ["Although", "Despite", "Instead", "However"], a: 2, he: "במקום לנסוע ברכב, נסענו ברכבת.", why: "instead of + ing." },
      { s: "The film got bad reviews. ___, millions of people watched it.", options: ["Therefore", "Moreover", "Unless", "Nevertheless"], a: 3, he: "הסרט קיבל ביקורות גרועות. בכל זאת, מיליוני אנשים צפו בו.", why: "ניגוד מפתיע: Nevertheless." },
      { s: "___ he is only fourteen, he speaks four languages.", options: ["Although", "In spite of", "However", "Moreover"], a: 0, he: "למרות שהוא רק בן ארבע עשרה, הוא מדבר ארבע שפות.", why: "although + משפט שלם." },
      { s: "Despite ___, the match continued.", options: ["it rained", "the rain", "it was raining", "raining was"], a: 1, he: "למרות הגשם, המשחק נמשך.", why: "despite + שם עצם, לא משפט." },
      { s: "I was cooking dinner. ___, my brother was setting the table.", options: ["Therefore", "Unless", "Meanwhile", "Although"], a: 2, he: "בישלתי ארוחת ערב. בינתיים אחי ערך את השולחן.", why: "שתי פעולות באותו זמן: Meanwhile." }
    ],
    transforms: [
      { task: "although → despite", q: "Although it was raining, we played outside.", a: "Despite the rain, we played outside.", alt: ["In spite of the rain, we played outside.", "Despite the rain we played outside."], he: "despite + שם עצם" },
      { task: "despite → although", q: "Despite being tired, he finished the race.", a: "Although he was tired, he finished the race.", alt: ["Although he was tired he finished the race."], he: "although + משפט שלם" },
      { task: "but → however", q: "The hotel was nice, but it was far from the beach.", a: "The hotel was nice. However, it was far from the beach.", alt: [], he: "נקודה, However, פסיק" },
      { task: "so → therefore", q: "She was sick, so she stayed at home.", a: "She was sick; therefore, she stayed at home.", alt: ["She was sick. Therefore, she stayed at home."], he: "therefore לתוצאה" },
      { task: "whereas", q: "Tom likes summer. Lily likes winter.", a: "Tom likes summer, whereas Lily likes winter.", alt: ["Whereas Tom likes summer, Lily likes winter."], he: "whereas להשוואה" },
      { task: "unless", q: "If you don't hurry, you will be late.", a: "Unless you hurry, you will be late.", alt: ["You will be late unless you hurry."], he: "unless = if not" },
      { task: "instead of", q: "We didn't watch TV. We read books.", a: "Instead of watching TV, we read books.", alt: ["We read books instead of watching TV."], he: "instead of + ing" },
      { task: "moreover", q: "The app is free. It is also easy to use.", a: "The app is free. Moreover, it is easy to use.", alt: ["The app is free; moreover, it is easy to use."], he: "Moreover להוספה" }
    ],
    reading: {
      title: "Should Schools Ban Phones?", he: "האם בתי ספר צריכים לאסור טלפונים?",
      text: "In many countries, schools are debating whether students should be allowed to use smartphones during the school day. Some schools have already banned them completely, whereas others allow phones during breaks.\n\nSupporters of a ban argue that phones are a serious distraction. Although students may plan to check their messages for only a minute, they often end up scrolling for much longer. As a result, they miss important parts of the lesson. Moreover, some researchers believe that constant notifications make it harder for young people to concentrate on long texts. Supporters also point out that during breaks, students who are busy with their phones talk less with each other. Therefore, they say, a ban could improve both learning and friendships.\n\nOn the other hand, many students and parents are against a total ban. They explain that phones can be useful learning tools. For example, students can look up a word, take a photo of the board or use an educational app. Furthermore, some parents feel safer when they can reach their children quickly. Despite these advantages, even opponents of the ban admit that clear rules are needed.\n\nA school in Haifa tried a middle way. Phones stayed in students' bags during lessons unless the teacher asked the class to use them. During breaks, however, students were free to use them. After one year, teachers reported fewer interruptions in class. Nevertheless, students still enjoyed the freedom to check their phones later.\n\nPerhaps the real question is not whether phones are good or bad, but how we can teach young people to use them wisely.",
      questions: [
        { q: "What is the main purpose of the text?", he: "מה המטרה העיקרית של הטקסט?", options: ["To sell new smartphones", "To present different opinions about phones in schools", "To prove that phones are always harmful", "To describe a school trip to Haifa"], a: 1 },
        { q: "According to supporters of a ban, why do students miss parts of the lesson?", he: "לפי תומכי האיסור, למה תלמידים מפספסים חלקים מהשיעור?", options: ["They scroll for longer than they planned.", "They leave the classroom.", "Their teachers use phones.", "They are too tired."], a: 0 },
        { q: "What did the school in Haifa do?", he: "מה עשה בית הספר בחיפה?", options: ["It banned phones completely.", "It gave every student a new phone.", "It allowed phones only when the teacher asked or during breaks.", "It closed the school for a year."], a: 2 },
        { q: "In “They explain that phones can be useful,” “They” refers to:", he: "המילה They מתייחסת ל:", options: ["researchers", "teachers in Haifa", "supporters of the ban", "students and parents against a total ban"], a: 3 },
        { q: "The word “distraction” (paragraph 2) means something that:", he: "המילה distraction פירושה משהו ש:", options: ["takes your attention away", "helps you learn", "keeps you safe", "makes you hungry"], a: 0 }
      ]
    }
  },
  {
    id: "t14", title: "Word Families", he: "משפחות מילים: תחיליות וסופיות", em: "🧬", theme: "desert",
    grade: "י׳", level: "B1", band: "Proficiency",
    grammar: {
      rule: "Word formation: prefixes (un-, dis-, in-, mis-, re-) and suffixes (-ness, -ment, -tion, -ful, -less, -ous, -ly)",
      he: "מאותו שורש באנגלית אפשר לבנות שם עצם, פועל, תואר ותואר הפועל. סופיות של שם עצם: ness, ment, tion, ity (happiness, development, decision). סופיות של תואר: ful, less, ous, ive, able (careful, dangerous, creative). ly יוצר תואר הפועל (quickly). תחיליות משנות משמעות: un, in, im, dis = לא (unhappy, impossible, dislike), re = שוב (rewrite), mis = בצורה לא נכונה (misunderstand). בבחינה בודקים לפי מקום המילה במשפט: אחרי the בא שם עצם, לפני שם עצם בא תואר, ולתיאור של פועל בא תואר הפועל. טעות נפוצה: She sings beautiful. נכון: She sings beautifully.",
      examples: [
        ["Happiness is more important than money.", "אושר חשוב יותר מכסף."],
        ["Please drive carefully.", "בבקשה סע בזהירות."],
        ["I disagree with you.", "אני לא מסכים איתך."],
        ["The decision was difficult.", "ההחלטה הייתה קשה."],
        ["Please rewrite the last paragraph.", "בבקשה כתוב מחדש את הפסקה האחרונה."],
        ["The plan was successful.", "התוכנית הייתה מוצלחת."]
      ]
    },
    words: [
      ["happiness", "אושר", "😊"], ["unhappy", "אומלל, לא מרוצה", "😢"], ["careful", "זהיר", "⚠️"], ["kindness", "טוב לב", "💗"],
      ["success", "הצלחה", "🏆"], ["successful", "מוצלח", "🥇"], ["decision", "החלטה", "⚖️"], ["creative", "יצירתי", "🎨"],
      ["creativity", "יצירתיות", "💡"], ["invisible", "בלתי נראה", "👻"], ["misunderstand", "לא להבין נכון", "😕"], ["rewrite", "לכתוב מחדש", "✍️"],
      ["independent", "עצמאי", "🦅"], ["development", "פיתוח, התפתחות", "🌱"], ["improvement", "שיפור", "📈"], ["dangerous", "מסוכן", "☠️"],
      ["friendship", "חברות", "🤝"], ["dislike", "לא לאהוב", "👎"]
    ],
    sentences: [
      ["Kindness costs nothing.", "טוב לב לא עולה כלום."],
      ["She solved the problem creatively.", "היא פתרה את הבעיה בצורה יצירתית."],
      ["I think you misunderstood me.", "אני חושב שלא הבנת אותי נכון."],
      ["His English shows a big improvement.", "באנגלית שלו יש שיפור גדול."],
      ["It's dangerous to swim here at night.", "מסוכן לשחות כאן בלילה."],
      ["Our friendship is very important to me.", "החברות שלנו חשובה לי מאוד."],
      ["The development of the city took years.", "הפיתוח של העיר לקח שנים."],
      ["He wants to be independent.", "הוא רוצה להיות עצמאי."],
      ["It is impossible to finish this today.", "אי אפשר לסיים את זה היום."],
      ["She is a very successful writer.", "היא סופרת מצליחה מאוד."],
      ["I dislike waiting in long lines.", "אני לא אוהב לחכות בתורים ארוכים."]
    ],
    gaps: [
      { s: "Money can't buy ___.", options: ["happiness", "happy", "happily", "unhappy"], a: 0, he: "כסף לא יכול לקנות אושר.", why: "אחרי buy צריך שם עצם: happiness." },
      { s: "Please drive ___. The road is wet.", options: ["careful", "carefully", "care", "careless"], a: 1, he: "בבקשה סע בזהירות. הכביש רטוב.", why: "מתארים איך נוהגים: תואר הפועל." },
      { s: "Making a ___ is not always easy.", options: ["decide", "decided", "decision", "decisive"], a: 2, he: "לקבל החלטה זה לא תמיד קל.", why: "אחרי a צריך שם עצם." },
      { s: "The trip was a great ___.", options: ["succeed", "successful", "successfully", "success"], a: 3, he: "הטיול היה הצלחה גדולה.", why: "אחרי great (תואר) בא שם עצם." },
      { s: "She is a very ___ artist.", options: ["creative", "create", "creation", "creatively"], a: 0, he: "היא אמנית יצירתית מאוד.", why: "לפני שם עצם בא תואר." },
      { s: "I ___ with you. I think you're wrong.", options: ["agree", "disagree", "misagree", "unagree"], a: 1, he: "אני לא מסכים איתך. אני חושב שאתה טועה.", why: "התחילית dis הופכת את המשמעות." },
      { s: "It is ___ to finish all this work in one day.", options: ["unpossible", "dispossible", "impossible", "inpossible"], a: 2, he: "אי אפשר לסיים את כל העבודה הזאת ביום אחד.", why: "לפני p התחילית היא im." },
      { s: "Sorry, I ___ the question.", options: ["disunderstood", "ununderstood", "reunderstood", "misunderstood"], a: 3, he: "סליחה, לא הבנתי נכון את השאלה.", why: "mis = בצורה לא נכונה." },
      { s: "Your essay is good, but please ___ the ending.", options: ["rewrite", "miswrite", "unwrite", "diswrite"], a: 0, he: "החיבור שלך טוב, אבל בבקשה כתוב מחדש את הסוף.", why: "re = שוב, מחדש." },
      { s: "Swimming alone at night is very ___.", options: ["danger", "dangerous", "dangerously", "endanger"], a: 1, he: "לשחות לבד בלילה זה מסוכן מאוד.", why: "אחרי very ו-is בא תואר." },
      { s: "There has been a big ___ in your reading.", options: ["improve", "improving", "improvement", "improved"], a: 2, he: "היה שיפור גדול בקריאה שלך.", why: "אחרי a big בא שם עצם." },
      { s: "Thank you for your ___.", options: ["kind", "kindly", "unkind", "kindness"], a: 3, he: "תודה על טוב הלב שלך.", why: "אחרי your בא שם עצם." },
      { s: "The children played ___ in the garden.", options: ["happily", "happy", "happiness", "unhappy"], a: 0, he: "הילדים שיחקו בשמחה בגינה.", why: "מתארים איך שיחקו: תואר הפועל." },
      { s: "He was ___ when he lost the game.", options: ["happiness", "unhappy", "unhappily", "happily"], a: 1, he: "הוא היה עצוב כשהפסיד במשחק.", why: "אחרי was בא תואר." },
      { s: "The ___ of new medicines takes many years.", options: ["develop", "developed", "development", "developing"], a: 2, he: "פיתוח של תרופות חדשות לוקח הרבה שנים.", why: "אחרי the בא שם עצם." }
    ],
    transforms: [
      { task: "Noun", q: "happy → (noun)", a: "happiness", alt: [], he: "ness יוצר שם עצם" },
      { task: "Adverb", q: "careful → (adverb)", a: "carefully", alt: [], he: "ly יוצר תואר הפועל" },
      { task: "Opposite", q: "possible → (opposite)", a: "impossible", alt: [], he: "im לפני p" },
      { task: "Noun", q: "decide → (noun)", a: "decision", alt: [], he: "סופית sion" },
      { task: "Adjective", q: "danger → (adjective)", a: "dangerous", alt: [], he: "ous יוצר תואר" },
      { task: "Opposite", q: "like → (opposite verb)", a: "dislike", alt: [], he: "dis = לא" },
      { task: "Noun", q: "improve → (noun)", a: "improvement", alt: [], he: "ment יוצר שם עצם" },
      { task: "Adjective", q: "success → (adjective)", a: "successful", alt: [], he: "ful יוצר תואר" }
    ],
    reading: {
      title: "The Science of Kindness", he: "המדע של טוב הלב",
      text: "For many years, scientists were more interested in studying sadness and fear than happiness and kindness. Today, however, a growing number of researchers are asking a simple question: what happens to us when we are kind to others?\n\nThe results are surprising. In one well-known experiment, students received a small amount of money. Half of them were told to spend it on themselves, while the other half were told to spend it on someone else. At the end of the day, the students who had spent the money on others reported greater happiness. The amount of money did not matter. What mattered was the decision to give.\n\nOther studies show that kindness is good for our bodies, too. People who regularly help others often feel calmer, and some research suggests that volunteering may even improve heart health. In addition, kind actions are contagious. When someone sees an act of kindness, they are more likely to do something kind themselves. In this way, one small action can spread through a whole community.\n\nOf course, kindness is not always easy. It can be uncomfortable to help a stranger, and sometimes we worry that others will misunderstand our intentions. Nevertheless, experts say that kindness is like a muscle: the more we use it, the stronger it becomes. They recommend starting with simple, realistic goals, such as thanking a bus driver or helping a classmate with homework.\n\nThe development of this new field reminds us of something our grandparents already knew. Being kind is not only good for the world around us; it is also one of the most successful ways to make ourselves happy.",
      questions: [
        { q: "What is the main idea of the text?", he: "מה הרעיון המרכזי של הטקסט?", options: ["Scientists only study fear.", "Money always makes people happy.", "Being kind helps both others and ourselves.", "Volunteering is dangerous for the heart."], a: 2 },
        { q: "In the experiment, which students felt happier?", he: "בניסוי, אילו תלמידים הרגישו מאושרים יותר?", options: ["Those who spent money on others", "Those who got more money", "Those who spent money on themselves", "Those who didn't get any money"], a: 0 },
        { q: "What does “contagious” (paragraph 3) mean here?", he: "מה פירוש המילה contagious כאן?", options: ["dangerous", "spreads from person to person", "very expensive", "hard to see"], a: 1 },
        { q: "In “the more we use it,” “it” refers to:", he: "המילה it מתייחסת ל:", options: ["money", "the heart", "the experiment", "kindness"], a: 3 },
        { q: "Why do experts compare kindness to a muscle?", he: "למה המומחים משווים טוב לב לשריר?", options: ["Because it gets stronger with practice", "Because it can hurt", "Because only athletes have it", "Because it is invisible"], a: 0 }
      ]
    }
  },
  {
    id: "t15", title: "Unseen Strategies", he: "אסטרטגיות לקטע אנסין", em: "📰", theme: "snow",
    grade: "י׳–י״ב", level: "B1", band: "Proficiency",
    grammar: {
      rule: "Complex sentences & commas: introductory clauses, non-defining clauses, reference words",
      he: "בקטעי אנסין יש הרבה משפטים מורכבים. כשמשפט מתחיל במשפט משני או בביטוי פתיחה, שמים אחריו פסיק: When the bell rang, everyone left. כשמשפט עם which או who מוסיף מידע לא הכרחי, שמים אותו בין פסיקים: Tel Aviv, which is on the coast, is busy. מילות הפניה כמו it, they, this, these, which מחליפות מילה שהופיעה קודם. כדי לענות על שאלת הפניה, חפשו את שם העצם הקרוב שמתאים במספר (יחיד או רבים). טעות נפוצה: לבחור את המילה האחרונה לפני ההפניה בלי לבדוק אם היא מתאימה במשמעות.",
      examples: [
        ["When the bell rang, the students left the room.", "כשהצלצול צלצל, התלמידים יצאו מהחדר."],
        ["After lunch, we went back to work.", "אחרי ארוחת הצהריים חזרנו לעבודה."],
        ["My uncle, who lives in Eilat, is a diver.", "הדוד שלי, שגר באילת, הוא צוללן."],
        ["Bees make honey. They also help plants grow.", "דבורים מייצרות דבש. הן גם עוזרות לצמחים לגדול."],
        ["If you read the title first, the text is easier.", "אם קוראים קודם את הכותרת, הטקסט קל יותר."],
        ["The study, which took five years, was published.", "המחקר, שנמשך חמש שנים, פורסם."]
      ]
    },
    words: [
      ["main idea", "רעיון מרכזי", "💡"], ["paragraph", "פסקה", "📄"], ["refer to", "להתייחס ל...", "👉"], ["infer", "להסיק", "🧠"],
      ["context", "הקשר", ""], ["summary", "סיכום", "📝"], ["detail", "פרט", "🔎"], ["author", "מחבר", "✍️"],
      ["purpose", "מטרה", "🎯"], ["audience", "קהל יעד", "👥"], ["headline", "כותרת (בעיתון)", "📰"], ["quotation", "ציטוט", "💬"],
      ["fact", "עובדה", "✔️"], ["opinion", "דעה", "🗣️"], ["highlight", "לסמן, להדגיש", "🖍️"], ["skim", "לרפרף (בקריאה)", "👀"],
      ["scan", "לסרוק (לחפש פרט)", "🔍"], ["argument", "טיעון", "⚔️"]
    ],
    sentences: [
      ["Read the questions before you read the text.", "קרא את השאלות לפני שאתה קורא את הטקסט."],
      ["Skim the text to find the main idea.", "רפרף בטקסט כדי למצוא את הרעיון המרכזי."],
      ["Scan the paragraph to find the date.", "סרוק את הפסקה כדי למצוא את התאריך."],
      ["What does the word “they” refer to?", "למה מתייחסת המילה they?"],
      ["The author's purpose is to persuade the reader.", "המטרה של המחבר היא לשכנע את הקורא."],
      ["Is this sentence a fact or an opinion?", "המשפט הזה הוא עובדה או דעה?"],
      ["Guess the meaning of the word from the context.", "נחש את פירוש המילה מתוך ההקשר."],
      ["Highlight the key words in each question.", "סמן את מילות המפתח בכל שאלה."],
      ["When you finish, check your answers again.", "כשתסיים, בדוק שוב את התשובות שלך."],
      ["Write a short summary of the second paragraph.", "כתוב סיכום קצר של הפסקה השנייה."],
      ["Use evidence from the text to support your answer.", "השתמש בראיות מהטקסט כדי לתמוך בתשובה שלך."]
    ],
    gaps: [
      { s: "When the movie ended___ everyone clapped.", options: [",", ".", ";", "no punctuation"], a: 0, he: "כשהסרט נגמר, כולם מחאו כפיים.", why: "אחרי משפט פתיחה עם When שמים פסיק." },
      { s: "My sister, ___ lives in Haifa, is a nurse.", options: ["which", "who", "where", "what"], a: 1, he: "אחותי, שגרה בחיפה, היא אחות.", why: "על אנשים משתמשים ב-who." },
      { s: "The Kinneret, ___ is in the north, is a lake.", options: ["who", "where", "which", "whose"], a: 2, he: "הכנרת, שנמצאת בצפון, היא אגם.", why: "על דברים ומקומות כנושא: which." },
      { s: "Bees are important. ___ help plants grow.", options: ["It", "He", "This", "They"], a: 3, he: "דבורים חשובות. הן עוזרות לצמחים לגדול.", why: "bees ברבים, לכן They." },
      { s: "To find a date in a text quickly, you should ___ it.", options: ["scan", "skim", "summarize", "highlight"], a: 0, he: "כדי למצוא תאריך בטקסט מהר, צריך לסרוק אותו.", why: "scan = לחפש פרט מסוים." },
      { s: "To understand the general idea, you should ___ the text first.", options: ["scan", "skim", "rewrite", "quote"], a: 1, he: "כדי להבין את הרעיון הכללי, צריך קודם לרפרף בטקסט.", why: "skim = קריאה מהירה לרעיון הכללי." },
      { s: "“Chocolate is the best food in the world” is ___.", options: ["a fact", "a quotation", "an opinion", "a headline"], a: 2, he: "המשפט ששוקולד הוא האוכל הכי טוב בעולם הוא דעה.", why: "אי אפשר להוכיח את זה, לכן זו דעה." },
      { s: "“Water boils at 100°C” is ___.", options: ["an opinion", "an argument", "a summary", "a fact"], a: 3, he: "המשפט שמים רותחים ב-100 מעלות הוא עובדה.", why: "אפשר להוכיח את זה." },
      { s: "___ reading the text, answer the questions.", options: ["After", "Although", "Unless", "Whereas"], a: 0, he: "אחרי קריאת הטקסט, ענה על השאלות.", why: "After + ing לסדר פעולות." },
      { s: "The scientists, ___ worked for years, finally found the answer.", options: ["which", "who", "whose", "when"], a: 1, he: "המדענים, שעבדו שנים, מצאו לבסוף את התשובה.", why: "על אנשים: who." },
      { s: "If you don't know a word___ try to guess it from the context.", options: [".", "!", ",", "?"], a: 2, he: "אם אתה לא יודע מילה, נסה לנחש אותה מההקשר.", why: "אחרי משפט if בתחילת המשפט שמים פסיק." },
      { s: "Tom bought a new laptop. ___ was very expensive.", options: ["He", "They", "She", "It"], a: 3, he: "טום קנה מחשב נייד חדש. הוא היה יקר מאוד.", why: "it מתייחס ל-laptop." },
      { s: "The ___ of a text tells you what it is about.", options: ["headline", "detail", "quotation", "argument"], a: 0, he: "הכותרת של הטקסט אומרת על מה הוא.", why: "headline = כותרת." },
      { s: "Many people visit Jerusalem, ___ is full of history.", options: ["who", "which", "whose", "what"], a: 1, he: "אנשים רבים מבקרים בירושלים, שמלאה בהיסטוריה.", why: "על מקום: which." },
      { s: "Lily and Noa missed the bus. As a result, ___ were late.", options: ["she", "it", "they", "we"], a: 2, he: "לילי ונועה פספסו את האוטובוס. כתוצאה מכך הן איחרו.", why: "שתי בנות = they." }
    ],
    transforms: [
      { task: "Add a comma", q: "When I got home I ate dinner.", a: "When I got home, I ate dinner.", alt: [], he: "פסיק אחרי משפט הפתיחה" },
      { task: "Add commas", q: "My brother who is a doctor lives in Eilat.", a: "My brother, who is a doctor, lives in Eilat.", alt: [], he: "מידע נוסף בין פסיקים" },
      { task: "Join with which", q: "The museum is new. It is in Tel Aviv.", a: "The museum, which is in Tel Aviv, is new.", alt: ["The museum, which is new, is in Tel Aviv."], he: ", which ... ," },
      { task: "Join with who", q: "Noa won the prize. She is my neighbor.", a: "Noa, who is my neighbor, won the prize.", alt: [], he: ", who ... ," },
      { task: "Reference", q: "Dolphins are smart. (Replace “Dolphins” in a second sentence) ___ can learn tricks.", a: "They can learn tricks.", alt: ["They"], he: "רבים = They" },
      { task: "Fact or opinion", q: "Write F or O: “Summer is the best season.”", a: "O", alt: ["opinion", "Opinion"], he: "אפשר להוכיח? אם לא, זו דעה" },
      { task: "Add a comma", q: "If it rains we will stay inside.", a: "If it rains, we will stay inside.", alt: [], he: "פסיק אחרי משפט if" },
      { task: "Fact or opinion", q: "Write F or O: “Israel has a coast on the Mediterranean Sea.”", a: "F", alt: ["fact", "Fact"], he: "אפשר לבדוק במפה" }
    ],
    reading: {
      title: "Where Have All the Bees Gone?", he: "לאן נעלמו הדבורים?",
      text: "In recent years, beekeepers in many parts of the world have reported a worrying problem. Every spring, they open their hives and discover that thousands of bees have disappeared. Scientists call this phenomenon “colony collapse,” and it has become one of the most discussed environmental issues of our time.\n\nWhy should we care about bees? Although most people think of them only as honey makers, bees play a far more important role. When they fly from flower to flower, they carry pollen, which helps plants produce fruit and seeds. According to some estimates, about one third of the food we eat depends on this process. Without bees, apples, almonds and many vegetables would become rare and expensive.\n\nResearchers believe that there is no single cause for the decline. Instead, several factors seem to work together. Some chemicals used on farms can confuse bees and damage their ability to find their way home. In addition, large farms that grow only one type of crop provide food for just a short period each year. Climate change, which affects when flowers bloom, may also make it harder for bees to find food at the right time.\n\nFortunately, there are steps that everyone can take. Farmers can reduce the use of harmful chemicals, and cities can plant more wild flowers in parks and along roads. Even a small balcony with a few flowering plants can provide a useful stop for a tired bee.\n\nThe story of the bees is a reminder that even the smallest creatures can have a huge influence on our lives. If we protect them, they will continue to protect us.",
      questions: [
        { q: "What is the main idea of the text?", he: "מה הרעיון המרכזי של הטקסט?", options: ["How to make honey at home", "Bees are disappearing, and this matters for our food", "Why people are afraid of bees", "How to build a beehive on a balcony"], a: 1 },
        { q: "In “they carry pollen” (paragraph 2), “they” refers to:", he: "המילה they מתייחסת ל:", options: ["bees", "flowers", "people", "beekeepers"], a: 0 },
        { q: "Which of the following is NOT mentioned as a cause of the problem?", he: "מה מהבאים לא מוזכר כגורם לבעיה?", options: ["Farm chemicals", "Climate change", "Bees eating too much honey", "Farms with only one type of crop"], a: 2 },
        { q: "What can we infer from paragraph 2?", he: "מה אפשר להסיק מהפסקה השנייה?", options: ["Bees only make honey.", "Apples grow better without bees.", "Food prices have nothing to do with bees.", "If bees disappear, some foods could cost more."], a: 3 },
        { q: "The word “decline” (paragraph 3) is closest in meaning to:", he: "המילה decline קרובה במשמעותה ל:", options: ["decrease", "growth", "decision", "danger"], a: 0 }
      ]
    }
  },
  {
    id: "t16", title: "Emails & Opinions", he: "מיילים, דעות ופעלים מורכבים", em: "📧", theme: "cave",
    grade: "י״א–י״ב", level: "B2", band: "Proficiency",
    grammar: {
      rule: "Formal vs informal register; opinion paragraphs; phrasal verbs",
      he: "במייל רשמי פותחים ב-Dear Mr. Cohen או Dear Sir or Madam, לא משתמשים בקיצורים (I am במקום I'm), ומסיימים ב-Yours sincerely או Best regards. במייל לחבר אפשר לפתוח ב-Hi Dan ולסיים ב-See you או Love. פסקת דעה בנויה כך: משפט פתיחה עם הדעה (In my opinion...), שתי סיבות עם דוגמאות (Firstly... Secondly...), ומשפט סיכום (To sum up...). phrasal verb הוא פועל עם מילת יחס שמשנה את המשמעות: give up = לוותר, look forward to = לצפות בקוצר רוח (ואחריו ing). טעות נפוצה: I look forward to hear from you. נכון: I look forward to hearing from you.",
      examples: [
        ["Dear Sir or Madam, I am writing to apply for the job.", "לכבוד מי שנוגע בדבר, אני כותב כדי להגיש מועמדות למשרה."],
        ["Hi Dan! How's it going?", "היי דן! מה המצב?"],
        ["In my opinion, homework should be shorter.", "לדעתי, שיעורי הבית צריכים להיות קצרים יותר."],
        ["I look forward to hearing from you.", "אני מחכה לשמוע ממך."],
        ["Don't give up!", "אל תוותר!"],
        ["To sum up, I believe that sport is important.", "לסיכום, אני מאמין שספורט חשוב."]
      ]
    },
    words: [
      ["formal", "רשמי", "🎩"], ["informal", "לא רשמי", "👕"], ["greeting", "ברכה, פתיחה", "👋"], ["sincerely", "בכנות (בסיום מכתב)", ""],
      ["regards", "דרישת שלום, בברכה", ""], ["request", "בקשה, לבקש", "🙏"], ["complaint", "תלונה", "😠"], ["apply", "להגיש מועמדות", "📨"],
      ["attach", "לצרף (קובץ)", "📎"], ["reply", "תשובה, להשיב", "↩️"], ["look forward to", "לחכות בציפייה ל...", "🤩"], ["find out", "לגלות, לברר", "🕵️‍♀️"],
      ["give up", "לוותר", "🏳️"], ["put off", "לדחות", "📆"], ["carry on", "להמשיך", "▶️"], ["come up with", "להמציא, להעלות (רעיון)", "💭"],
      ["deal with", "להתמודד עם", "🤜"], ["run out of", "שנגמר לו (משהו)", "🫙"], ["set up", "להקים", "🛠️"], ["turn down", "לדחות (הצעה), להנמיך", "🔉"]
    ],
    sentences: [
      ["I am writing to complain about the service.", "אני כותב כדי להתלונן על השירות."],
      ["Please find the document attached.", "מצורף בזה המסמך."],
      ["I look forward to hearing from you soon.", "אני מחכה לשמוע ממך בקרוב."],
      ["Could you please send me more information?", "תוכל בבקשה לשלוח לי מידע נוסף?"],
      ["Hi Noa, thanks for your message!", "היי נועה, תודה על ההודעה שלך!"],
      ["In my opinion, every student should learn to cook.", "לדעתי, כל תלמיד צריך ללמוד לבשל."],
      ["Firstly, it saves money. Secondly, it's healthy.", "ראשית, זה חוסך כסף. שנית, זה בריא."],
      ["We ran out of milk, so I went to the shop.", "נגמר לנו החלב, אז הלכתי לחנות."],
      ["Don't put off your homework until tomorrow.", "אל תדחה את שיעורי הבית למחר."],
      ["She came up with a brilliant idea.", "היא העלתה רעיון מבריק."],
      ["They set up a small business selling cookies.", "הם הקימו עסק קטן למכירת עוגיות."],
      ["He turned down the job offer.", "הוא דחה את הצעת העבודה."]
    ],
    gaps: [
      { s: "I look forward to ___ from you.", options: ["hearing", "hear", "heard", "be hearing"], a: 0, he: "אני מחכה לשמוע ממך.", why: "אחרי look forward to בא ing." },
      { s: "In a formal email, you should write “I am” instead of “___”.", options: ["I was", "I'm", "I be", "Im"], a: 1, he: "במייל רשמי כותבים I am במקום I'm.", why: "בסגנון רשמי לא משתמשים בקיצורים." },
      { s: "___ Sir or Madam, I am writing to ask about your summer program.", options: ["Hi", "Hey", "Dear", "Hello there"], a: 2, he: "לכבוד מי שנוגע בדבר, אני כותב כדי לשאול על תוכנית הקיץ שלכם.", why: "פתיחה רשמית: Dear Sir or Madam." },
      { s: "Please don't give ___. You're almost there!", options: ["off", "on", "out", "up"], a: 3, he: "בבקשה אל תוותר. אתה כמעט שם!", why: "give up = לוותר." },
      { s: "We've run ___ of bread. Can you buy some?", options: ["out", "off", "up", "down"], a: 0, he: "נגמר לנו הלחם. תוכל לקנות?", why: "run out of = שנגמר." },
      { s: "Can you find ___ what time the film starts?", options: ["up", "out", "on", "off"], a: 1, he: "תוכל לברר באיזו שעה הסרט מתחיל?", why: "find out = לברר." },
      { s: "The meeting was put ___ until next week.", options: ["up", "on", "off", "out"], a: 2, he: "הפגישה נדחתה לשבוע הבא.", why: "put off = לדחות." },
      { s: "___ my opinion, school should start later.", options: ["On", "At", "For", "In"], a: 3, he: "לדעתי, בית הספר צריך להתחיל מאוחר יותר.", why: "הביטוי הוא In my opinion." },
      { s: "I am writing to ___ for the volunteer position.", options: ["apply", "attach", "reply", "request"], a: 0, he: "אני כותב כדי להגיש מועמדות לתפקיד המתנדב.", why: "apply for = להגיש מועמדות." },
      { s: "Please see the ___ file with my CV.", options: ["attach", "attached", "attaching", "attachment"], a: 1, he: "בבקשה ראה את הקובץ המצורף עם קורות החיים שלי.", why: "תואר לפני file: attached." },
      { s: "___, I believe that sport makes us healthier and happier.", options: ["Firstly but", "Although", "To sum up", "Despite"], a: 2, he: "לסיכום, אני מאמין שספורט הופך אותנו לבריאים ושמחים יותר.", why: "משפט סיכום של פסקת דעה." },
      { s: "Nobody could ___ a solution to the problem.", options: ["come across", "come back", "come in", "come up with"], a: 3, he: "אף אחד לא הצליח להעלות פתרון לבעיה.", why: "come up with = להעלות רעיון." },
      { s: "Yours ___, Adam Levi", options: ["sincerely", "sincere", "sincerity", "sincerelly"], a: 0, he: "בכבוד רב, אדם לוי", why: "סיום רשמי: Yours sincerely." },
      { s: "Even though it was hard, she carried ___ working.", options: ["out", "on", "off", "up"], a: 1, he: "אף על פי שהיה קשה, היא המשיכה לעבוד.", why: "carry on = להמשיך." },
      { s: "I'm writing to make a ___ about the late delivery.", options: ["request", "reply", "complaint", "greeting"], a: 2, he: "אני כותב כדי להגיש תלונה על המשלוח שאיחר.", why: "complaint = תלונה." }
    ],
    transforms: [
      { task: "Formal", q: "I'm writing to ask about the course.", a: "I am writing to ask about the course.", alt: [], he: "בלי קיצורים" },
      { task: "Formal", q: "Hey, can you send me the info?", a: "Could you please send me the information?", alt: ["Could you send me the information, please?", "Would you please send me the information?"], he: "Could you please...?" },
      { task: "Phrasal verb", q: "Don't stop trying. (give)", a: "Don't give up.", alt: ["Do not give up."], he: "give up" },
      { task: "Phrasal verb", q: "We have no more sugar. (run)", a: "We have run out of sugar.", alt: ["We've run out of sugar.", "We ran out of sugar."], he: "run out of" },
      { task: "Phrasal verb", q: "They postponed the trip. (put)", a: "They put off the trip.", alt: ["They put the trip off."], he: "put off" },
      { task: "look forward to", q: "I'm excited to see you. (look forward)", a: "I look forward to seeing you.", alt: ["I am looking forward to seeing you.", "I'm looking forward to seeing you."], he: "look forward to + ing" },
      { task: "Opinion", q: "I think that uniforms are a good idea. (In my opinion)", a: "In my opinion, uniforms are a good idea.", alt: ["In my opinion uniforms are a good idea."], he: "In my opinion," },
      { task: "Phrasal verb", q: "She invented a great plan. (come)", a: "She came up with a great plan.", alt: [], he: "come up with" }
    ],
    reading: {
      title: "An Application Email", he: "מייל הגשת מועמדות",
      text: "Dear Ms. Klein,\n\nI am writing to apply for a place as a volunteer at the Green Valley Nature Camp this summer. I found out about the program from my school counselor, who told me that you are looking for young people who enjoy working with children and caring for the environment.\n\nMy name is Yael Mizrahi, and I am sixteen years old. I am currently in the eleventh grade at a high school in Rehovot, where I study biology and English at an advanced level. For the past two years, I have volunteered every week at a local after-school club. My main responsibility there is to help younger children with their homework, and I have also set up a small gardening group. Together, the children and I have grown vegetables, herbs and flowers in the school yard.\n\nI believe that I would be a suitable volunteer for several reasons. Firstly, I am patient and responsible, and I enjoy explaining things in a simple and creative way. Secondly, I have experience with outdoor activities, since I am a member of a hiking group and have completed a first-aid course. Finally, I am very interested in nature conservation, and I would love to learn more about it from your experienced team.\n\nI have attached my CV and a letter of recommendation from the director of the after-school club. I am available from the beginning of July until the end of August, and I would be happy to attend an interview at any time that suits you.\n\nThank you for considering my application. I look forward to hearing from you.\n\nYours sincerely,\nYael Mizrahi",
      questions: [
        { q: "What is the purpose of Yael's email?", he: "מה המטרה של המייל של יעל?", options: ["To complain about a summer camp", "To ask for a place as a volunteer", "To invite Ms. Klein to her school", "To sell vegetables from her garden"], a: 1 },
        { q: "How did Yael find out about the program?", he: "איך יעל גילתה על התוכנית?", options: ["From her school counselor", "From a newspaper", "From her hiking group", "From Ms. Klein"], a: 0 },
        { q: "Which of these does Yael NOT mention as a reason she is suitable?", he: "מה מהבאים יעל לא מזכירה כסיבה לכך שהיא מתאימה?", options: ["She is patient.", "She has done a first-aid course.", "She is interested in nature conservation.", "She speaks five languages."], a: 3 },
        { q: "The email is written in a formal style. Which detail shows this?", he: "המייל כתוב בסגנון רשמי. איזה פרט מראה זאת?", options: ["It uses many short forms like I'm.", "It begins with Hi.", "It ends with Yours sincerely.", "It includes jokes."], a: 2 },
        { q: "In “I would love to learn more about it,” “it” refers to:", he: "המילה it מתייחסת ל:", options: ["nature conservation", "the after-school club", "her CV", "the interview"], a: 0 }
      ]
    }
  }
];
