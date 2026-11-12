// Middle track (ages ~11–13, Israeli grades 6–8, CEFR A1→A2), part A: units m01–m08.
export const UNITS_MA = [
  {
    id: "m01", title: "Plurals & Articles", he: "רבים ותוויות יידוע", em: "📦", theme: "grass",
    grade: "ו׳", level: "A1", band: "Foundation",
    grammar: {
      rule: "Plural nouns: -s, -es, -ies, irregular · a / an / the",
      he: "ברוב המילים מוסיפים s ברבים: book → books. אחרי s, sh, ch, x, o מוסיפים es: box → boxes. אם המילה נגמרת בעיצור + y, ה-y הופכת ל-ies: city → cities. יש מילים חריגות שצריך לזכור: child → children, man → men. a לפני צליל של עיצור, an לפני צליל של תנועה (an apple), ו-the כשמדברים על משהו מסוים שכבר ידוע.",
      examples: [
        ["one box → two boxes", "קופסה אחת ← שתי קופסאות"],
        ["one city → three cities", "עיר אחת ← שלוש ערים"],
        ["one child → many children", "ילד אחד ← הרבה ילדים"],
        ["a banana, an orange", "בננה, תפוז (an לפני תנועה)"],
        ["I have a dog. The dog is brown.", "יש לי כלב. הכלב חום."],
        ["one tooth → two teeth", "שן אחת ← שתי שיניים"]
      ]
    },
    words: [
      ["notebook", "מחברת", "📓"], ["shelf", "מדף", ""], ["bus stop", "תחנת אוטובוס", "🚏"], ["library", "ספרייה", "📚"],
      ["mouse", "עכבר", "🐭"], ["tooth", "שן", "🦷"], ["knife", "סכין", "🔪"], ["leaf", "עלה", "🍃"],
      ["city", "עיר", "🏙️"], ["dish", "צלחת, מנה", "🍽️"], ["watch", "שעון יד", "⌚"], ["potato", "תפוח אדמה", "🥔"],
      ["woman", "אישה", "👩"], ["man", "גבר", "👨"], ["sheep", "כבשה", "🐑"], ["umbrella", "מטרייה", "☂️"]
    ],
    sentences: [
      ["There are three boxes on the shelf.", "יש שלוש קופסאות על המדף."],
      ["I need a pencil and an eraser.", "אני צריך עיפרון ומחק."],
      ["The children are in the library.", "הילדים נמצאים בספרייה."],
      ["My little brother has two new teeth.", "לאח הקטן שלי יש שתי שיניים חדשות."],
      ["The leaves are yellow in the fall.", "העלים צהובים בסתיו."],
      ["We saw many sheep on the farm.", "ראינו הרבה כבשים בחווה."],
      ["Please put the knives and forks on the table.", "בבקשה שים את הסכינים והמזלגות על השולחן."],
      ["She has an umbrella in her bag.", "יש לה מטרייה בתיק."],
      ["Big cities have a lot of buses.", "בערים גדולות יש הרבה אוטובוסים."],
      ["Three women are waiting at the bus stop.", "שלוש נשים מחכות בתחנת האוטובוס."]
    ],
    gaps: [
      { s: "I have two ___.", options: ["box", "boxes", "boxs"], a: 1, he: "יש לי שתי קופסאות.", why: "אחרי x מוסיפים es." },
      { s: "There are five ___ in the room.", options: ["childs", "childrens", "children"], a: 2, he: "יש חמישה ילדים בחדר.", why: "child היא מילה חריגה: children." },
      { s: "She is eating ___ apple.", options: ["an", "a", "the a"], a: 0, he: "היא אוכלת תפוח.", why: "an לפני צליל של תנועה." },
      { s: "Tel Aviv and Haifa are big ___.", options: ["citys", "cities", "cityes"], a: 1, he: "תל אביב וחיפה הן ערים גדולות.", why: "עיצור + y הופך ל-ies." },
      { s: "I have ___ dog. The dog is very funny.", options: ["the", "an", "a"], a: 2, he: "יש לי כלב. הכלב מאוד מצחיק.", why: "פעם ראשונה שמזכירים משהו – a." },
      { s: "Brush your ___ every morning.", options: ["tooths", "teeth", "teeths"], a: 1, he: "צחצח את השיניים כל בוקר.", why: "tooth ברבים: teeth." },
      { s: "Can you open ___ door, please?", options: ["the", "a", "an"], a: 0, he: "אתה יכול לפתוח את הדלת, בבקשה?", why: "דלת מסוימת שכולם יודעים עליה – the." },
      { s: "We need three ___ for the salad.", options: ["potatos", "potato", "potatoes"], a: 2, he: "אנחנו צריכים שלושה תפוחי אדמה לסלט.", why: "potato ברבים: potatoes." },
      { s: "The ___ are falling from the trees.", options: ["leafs", "leaves", "leafes"], a: 1, he: "העלים נופלים מהעצים.", why: "f בסוף הופכת ל-ves." },
      { s: "He is ___ honest boy.", options: ["a", "an", "the"], a: 1, he: "הוא ילד ישר.", why: "honest מתחיל בצליל תנועה (h שקטה)." },
      { s: "I saw two ___ in the kitchen!", options: ["mouses", "mices", "mice"], a: 2, he: "ראיתי שני עכברים במטבח!", why: "mouse ברבים: mice." },
      { s: "My dad has ___ old car.", options: ["an", "a", "-"], a: 0, he: "לאבא שלי יש מכונית ישנה.", why: "old מתחיל בתנועה – an." },
      { s: "There are many ___ in the sky tonight.", options: ["star", "stars", "stares"], a: 1, he: "יש הרבה כוכבים בשמיים הלילה.", why: "רוב המילים מקבלות s." },
      { s: "The ___ are washing the dishes.", options: ["mans", "men", "mens"], a: 1, he: "הגברים שוטפים את הכלים.", why: "man ברבים: men." },
      { s: "Put the ___ on the shelf.", options: ["watchs", "watches", "watchies"], a: 1, he: "שים את השעונים על המדף.", why: "אחרי ch מוסיפים es." }
    ],
    transforms: [
      { task: "Plural", q: "bus", a: "buses", alt: [], he: "אוטובוס" },
      { task: "Plural", q: "baby", a: "babies", alt: [], he: "תינוק" },
      { task: "Plural", q: "foot", a: "feet", alt: [], he: "כף רגל" },
      { task: "Plural", q: "knife", a: "knives", alt: [], he: "סכין" },
      { task: "Plural", q: "woman", a: "women", alt: [], he: "אישה" },
      { task: "Plural", q: "dish", a: "dishes", alt: [], he: "צלחת" },
      { task: "Plural", q: "toy", a: "toys", alt: [], he: "צעצוע" },
      { task: "a or an?", q: "___ umbrella", a: "an", alt: ["an umbrella"], he: "מטרייה" }
    ],
    reading: {
      title: "A Busy Saturday Night", he: "מוצאי שבת עמוס",
      text: "On Saturday night, Noa and her two brothers go to the library in their city. The library is big and quiet. There are thousands of books on the shelves. Noa takes a book about animals. It has pictures of mice, sheep and wolves. Her little brother Ben wants an atlas with maps of countries and cities. Her older brother Adam reads a comic. After an hour, the children walk to the bus stop. Two women and a man are already waiting there. It starts to rain, but Noa has an umbrella in her bag. The bus comes after ten minutes. At home, Mom makes potatoes and eggs for dinner. The kids put the dishes, the knives and the forks on the table. \"The library was great,\" says Ben. \"Can we go again next week?\"",
      questions: [
        { q: "Where do the children go?", he: "לאן הולכים הילדים?", options: ["To the library", "To the park", "To a shop"], a: 0 },
        { q: "What does Ben want?", he: "מה בן רוצה?", options: ["A comic", "An atlas", "A book about animals"], a: 1 },
        { q: "Who is waiting at the bus stop?", he: "מי מחכה בתחנת האוטובוס?", options: ["Two men and a woman", "Three children", "Two women and a man"], a: 2 },
        { q: "Why is Noa happy when it rains?", he: "למה נועה שמחה כשמתחיל גשם?", options: ["She has an umbrella", "She likes rain", "The bus is there"], a: 0 }
      ]
    }
  },
  {
    id: "m02", title: "This, That & Whose Is It?", he: "זה, ההוא ושל מי זה?", em: "👉", theme: "desert",
    grade: "ו׳", level: "A1", band: "Foundation",
    grammar: {
      rule: "this/that/these/those · I–me · my/your/his/her · Dan's",
      he: "this ו-these לדברים קרובים (יחיד/רבים), that ו-those לדברים רחוקים. כינוי נושא בא לפני הפועל (I, he, she, we, they), וכינוי מושא בא אחרי הפועל (me, him, her, us, them). my, your, his, her, our, their באים לפני שם עצם. כדי להגיד ״של דן״ כותבים Dan's.",
      examples: [
        ["This bag is mine. Those bags are yours.", "התיק הזה שלי. התיקים ההם שלך."],
        ["These shoes are new.", "הנעליים האלה חדשות."],
        ["She helps me. I help her.", "היא עוזרת לי. אני עוזר לה."],
        ["This is my sister. Her name is Yael.", "זאת אחותי. קוראים לה יעל."],
        ["That is Dan's bike.", "זה האופניים של דן."]
      ]
    },
    words: [
      ["glasses", "משקפיים", "👓"], ["key chain", "מחזיק מפתחות", "🔑"], ["wallet", "ארנק", "👛"], ["jacket", "מעיל, ז׳קט", "🧥"],
      ["sneakers", "נעלי ספורט", "👟"], ["backpack", "תרמיל", "🎒"], ["headphones", "אוזניות", "🎧"], ["charger", "מטען", "🔌"],
      ["water bottle", "בקבוק מים", "🧴"], ["lost and found", "אבדות ומציאות", "📦"], ["cousin", "בן דוד, בת דודה", "🧑"], ["neighbor", "שכן", "🏘️"],
      ["owner", "בעלים", "🙋"], ["belong", "שייך", "🤝"], ["borrow", "לשאול (חפץ)", "🤲"], ["return", "להחזיר", "↩️"]
    ],
    sentences: [
      ["Is this your water bottle?", "זה בקבוק המים שלך?"],
      ["Those sneakers belong to my cousin.", "נעלי הספורט ההן שייכות לבן הדוד שלי."],
      ["Can I borrow your charger?", "אני יכול לשאול את המטען שלך?"],
      ["This is Maya's jacket, not mine.", "זה המעיל של מאיה, לא שלי."],
      ["Please give them back to him.", "בבקשה תחזיר אותם אליו."],
      ["Our neighbor found my wallet.", "השכן שלנו מצא את הארנק שלי."],
      ["These headphones are theirs.", "האוזניות האלה שלהם."],
      ["Whose glasses are those?", "של מי המשקפיים ההם?"],
      ["She called us after school.", "היא התקשרה אלינו אחרי בית הספר."],
      ["My brother's backpack is in the lost and found.", "התרמיל של אחי נמצא באבדות ומציאות."]
    ],
    gaps: [
      { s: "___ shoes here are mine.", options: ["This", "These", "That"], a: 1, he: "הנעליים האלה כאן שלי.", why: "רבים וקרוב – these." },
      { s: "Look at ___ bird over there!", options: ["that", "these", "those"], a: 0, he: "תסתכל על הציפור ההיא שם!", why: "יחיד ורחוק – that." },
      { s: "My sister is nice. I like ___.", options: ["she", "her", "hers"], a: 1, he: "אחותי נחמדה. אני אוהב אותה.", why: "אחרי הפועל – כינוי מושא her." },
      { s: "___ are my best friends.", options: ["Them", "Their", "They"], a: 2, he: "הם החברים הכי טובים שלי.", why: "לפני הפועל – כינוי נושא they." },
      { s: "This is ___ bike. It belongs to Dan.", options: ["Dans", "Dan's", "Dans'"], a: 1, he: "אלה האופניים של דן.", why: "שייכות לאדם אחד – 's." },
      { s: "We love our grandma and she loves ___.", options: ["we", "our", "us"], a: 2, he: "אנחנו אוהבים את סבתא שלנו והיא אוהבת אותנו.", why: "אחרי הפועל – us." },
      { s: "Tom has a cat. ___ cat is gray.", options: ["His", "He", "Him"], a: 0, he: "לטום יש חתול. החתול שלו אפור.", why: "לפני שם עצם – his." },
      { s: "Are ___ your keys on the table there?", options: ["this", "those", "that"], a: 1, he: "אלה המפתחות שלך על השולחן שם?", why: "רבים ורחוק – those." },
      { s: "The girls lost ___ water bottles.", options: ["their", "there", "they"], a: 0, he: "הבנות איבדו את בקבוקי המים שלהן.", why: "שייכות לרבים – their." },
      { s: "Can you help ___ with my homework?", options: ["I", "my", "me"], a: 2, he: "אתה יכול לעזור לי בשיעורי הבית?", why: "אחרי help – me." },
      { s: "Is this ___ jacket, Sam?", options: ["you", "your", "yours"], a: 1, he: "זה המעיל שלך, סם?", why: "לפני שם עצם – your." },
      { s: "___ is my phone in my hand.", options: ["This", "Those", "These"], a: 0, he: "זה הטלפון שלי ביד שלי.", why: "יחיד וקרוב – this." },
      { s: "Lily and ___ are going to the park.", options: ["me", "I", "my"], a: 1, he: "לילי ואני הולכים לפארק.", why: "חלק מהנושא – I." },
      { s: "Our ___ house is next to ours.", options: ["neighbors", "neighbor's", "neighbor"], a: 1, he: "הבית של השכן שלנו ליד הבית שלנו.", why: "הבית של השכן – neighbor's." },
      { s: "The dog is wagging ___ tail.", options: ["it's", "its", "it"], a: 1, he: "הכלב מכשכש בזנב שלו.", why: "its = שלו (בלי גרש). it's = it is." }
    ],
    transforms: [
      { task: "Make it plural", q: "this book", a: "these books", alt: [], he: "הספר הזה" },
      { task: "Make it plural", q: "that car", a: "those cars", alt: [], he: "המכונית ההיא" },
      { task: "Object pronoun", q: "I see (he).", a: "I see him.", alt: ["him"], he: "אני רואה אותו." },
      { task: "Object pronoun", q: "Call (we) later.", a: "Call us later.", alt: ["us"], he: "תתקשר אלינו אחר כך." },
      { task: "Possessive", q: "(she) bag", a: "her bag", alt: ["her"], he: "התיק שלה" },
      { task: "Possessive", q: "(they) house", a: "their house", alt: ["their"], he: "הבית שלהם" },
      { task: "Use 's", q: "the bike of Noa", a: "Noa's bike", alt: [], he: "האופניים של נועה" },
      { task: "Use 's", q: "the phone of my dad", a: "my dad's phone", alt: [], he: "הטלפון של אבא שלי" }
    ],
    reading: {
      title: "The Lost and Found Box", he: "קופסת האבדות והמציאות",
      text: "Every Friday, our class checks the lost and found box. This week it was full! Mr. Cohen held up a blue jacket. \"Whose jacket is this?\" he asked. \"It's Tom's,\" said Yael. \"I saw him with it on Monday.\" Then he took out two water bottles. \"These are mine!\" said Sam, and he took them. Next, Mr. Cohen found a pair of glasses. Nobody knew the owner. \"Maybe they belong to a teacher,\" said Noa. At the bottom of the box there was a black wallet. Inside it was a card with a name: Adam Levi. Adam is in our neighbor's class, so I returned it to him after school. He was very happy. \"Thank you! My mom's photo is in it,\" he told me. Now the box is almost empty, but those old sneakers are still there.",
      questions: [
        { q: "Whose jacket was in the box?", he: "המעיל של מי היה בקופסה?", options: ["Sam's", "Tom's", "Yael's"], a: 1 },
        { q: "What did Sam take?", he: "מה סם לקח?", options: ["Two water bottles", "The glasses", "The sneakers"], a: 0 },
        { q: "How did the writer know the owner of the wallet?", he: "איך הכותב ידע של מי הארנק?", options: ["Adam told him", "Mr. Cohen knew", "There was a card with a name"], a: 2 },
        { q: "What is still in the box?", he: "מה עדיין נמצא בקופסה?", options: ["The wallet", "Old sneakers", "A blue jacket"], a: 1 }
      ]
    }
  },
  {
    id: "m03", title: "My Week: Present Simple", he: "השבוע שלי: הווה פשוט", em: "📅", theme: "snow",
    grade: "ו׳", level: "A1", band: "Foundation",
    grammar: {
      rule: "Present simple: I play / he plays · don't / doesn't · Do you…? · always, usually, never",
      he: "הווה פשוט מתאר הרגלים ודברים שקורים כל הזמן. עם he, she, it מוסיפים s לפועל: she plays. בשלילה: don't / doesn't + פועל בלי s. בשאלה: Do / Does בהתחלה. מילות תדירות (always, usually, often, sometimes, never) באות לפני הפועל, אבל אחרי am/is/are.",
      examples: [
        ["I play football on Mondays.", "אני משחק כדורגל בימי שני."],
        ["She watches TV after dinner.", "היא צופה בטלוויזיה אחרי ארוחת הערב."],
        ["He doesn't like fish.", "הוא לא אוהב דגים."],
        ["Do you walk to school?", "אתה הולך ברגל לבית הספר?"],
        ["I always get up at seven. He is never late.", "אני תמיד קם בשבע. הוא אף פעם לא מאחר."]
      ]
    },
    words: [
      ["get up", "לקום", "⏰"], ["brush", "לצחצח, להבריש", "🪥"], ["catch the bus", "לתפוס את האוטובוס", "🚌"], ["practice", "להתאמן", "🎻"],
      ["homework", "שיעורי בית", "📝"], ["chores", "מטלות בית", "🧹"], ["after school", "אחרי בית הספר", "🏫"], ["weekend", "סוף שבוע", "🎉"],
      ["usually", "בדרך כלל", ""], ["often", "לעתים קרובות", ""], ["rarely", "לעתים רחוקות", ""], ["schedule", "לוח זמנים", "🗓️"],
      ["lesson", "שיעור", "📖"], ["club", "חוג, מועדון", "🎭"], ["prayer", "תפילה", "🙏"], ["feed", "להאכיל", "🐟"]
    ],
    sentences: [
      ["I usually get up at seven o'clock.", "אני בדרך כלל קם בשבע."],
      ["My sister practices the piano every day.", "אחותי מתאמנת בפסנתר כל יום."],
      ["He doesn't catch the bus on Fridays.", "הוא לא תופס את האוטובוס בימי שישי."],
      ["Do you have a club after school?", "יש לך חוג אחרי בית הספר?"],
      ["We often feed the ducks in the park.", "אנחנו לעתים קרובות מאכילים את הברווזים בפארק."],
      ["Dad goes to morning prayer every day.", "אבא הולך לתפילת שחרית כל יום."],
      ["I never do my homework late at night.", "אני אף פעם לא עושה שיעורי בית מאוחר בלילה."],
      ["Does your brother help with the chores?", "אחיך עוזר במטלות הבית?"],
      ["She is always happy on the weekend.", "היא תמיד שמחה בסוף השבוע."],
      ["What time does your lesson start?", "באיזו שעה השיעור שלך מתחיל?"]
    ],
    gaps: [
      { s: "My brother ___ football every Tuesday.", options: ["play", "plays", "playing"], a: 1, he: "אחי משחק כדורגל כל יום שלישי.", why: "he/she/it – מוסיפים s." },
      { s: "I ___ like spicy food.", options: ["doesn't", "don't", "not"], a: 1, he: "אני לא אוהב אוכל חריף.", why: "עם I – don't." },
      { s: "___ your mom work in a hospital?", options: ["Do", "Is", "Does"], a: 2, he: "אמא שלך עובדת בבית חולים?", why: "שאלה על she – Does." },
      { s: "She ___ TV after dinner.", options: ["watchs", "watches", "watch"], a: 1, he: "היא צופה בטלוויזיה אחרי ארוחת הערב.", why: "אחרי ch מוסיפים es." },
      { s: "We ___ to school by bus.", options: ["go", "goes", "going"], a: 0, he: "אנחנו נוסעים לבית הספר באוטובוס.", why: "עם we – בלי s." },
      { s: "He doesn't ___ chocolate.", options: ["likes", "liking", "like"], a: 2, he: "הוא לא אוהב שוקולד.", why: "אחרי doesn't – פועל בלי s." },
      { s: "I ___ late for school.", options: ["am never", "never am", "never"], a: 0, he: "אני אף פעם לא מאחר לבית הספר.", why: "מילת תדירות באה אחרי am." },
      { s: "They ___ visit their grandparents on Shabbat.", options: ["usually", "are usually", "usual"], a: 0, he: "הם בדרך כלל מבקרים את סבא וסבתא שלהם בשבת.", why: "לפני פועל רגיל – usually." },
      { s: "My cat ___ on my bed.", options: ["sleep", "sleeps", "sleepes"], a: 1, he: "החתול שלי ישן על המיטה שלי.", why: "it – מוסיפים s." },
      { s: "Do you ___ a dog?", options: ["have", "has", "having"], a: 0, he: "יש לך כלב?", why: "אחרי Do – פועל בסיס." },
      { s: "Dan ___ his teeth twice a day.", options: ["brush", "brushs", "brushes"], a: 2, he: "דן מצחצח שיניים פעמיים ביום.", why: "אחרי sh מוסיפים es." },
      { s: "Where ___ they live?", options: ["does", "do", "are"], a: 1, he: "איפה הם גרים?", why: "שאלה על they – do." },
      { s: "My dad ___ coffee in the morning.", options: ["drinks always", "always drinks", "always drink"], a: 1, he: "אבא שלי תמיד שותה קפה בבוקר.", why: "always לפני הפועל, והפועל מקבל s." },
      { s: "She ___ her homework in the evening.", options: ["do", "dos", "does"], a: 2, he: "היא עושה את שיעורי הבית בערב.", why: "do עם she – does." },
      { s: "The shop ___ open on Saturday.", options: ["doesn't", "isn't", "don't"], a: 1, he: "החנות לא פתוחה בשבת.", why: "עם open (תואר) משתמשים ב-is not." }
    ],
    transforms: [
      { task: "He / She form", q: "I go → She ___", a: "She goes", alt: ["goes"], he: "היא הולכת" },
      { task: "He / She form", q: "I study → He ___", a: "He studies", alt: ["studies"], he: "הוא לומד" },
      { task: "Negative", q: "I like milk.", a: "I don't like milk.", alt: ["I do not like milk."], he: "אני לא אוהב חלב." },
      { task: "Negative", q: "He plays chess.", a: "He doesn't play chess.", alt: ["He does not play chess."], he: "הוא לא משחק שחמט." },
      { task: "Question", q: "You speak English.", a: "Do you speak English?", alt: [], he: "אתה מדבר אנגלית?" },
      { task: "Question", q: "She lives here.", a: "Does she live here?", alt: [], he: "היא גרה כאן?" },
      { task: "Add the word", q: "I eat breakfast. (always)", a: "I always eat breakfast.", alt: [], he: "אני תמיד אוכל ארוחת בוקר." },
      { task: "Add the word", q: "He is tired. (often)", a: "He is often tired.", alt: [], he: "הוא לעתים קרובות עייף." }
    ],
    reading: {
      title: "A Week with Yael", he: "שבוע עם יעל",
      text: "Hi! My name is Yael and I am twelve. My week is very busy. I get up at six thirty and I always eat breakfast with my dad. He goes to morning prayer and then he drives me to school. On Sundays and Tuesdays I have a drama club after school. On Wednesdays I practice the violin. My teacher says I play well, but I don't practice enough! My little brother Ben doesn't have a club. He usually plays football in the park with his friends. In the evening we do our homework at the kitchen table. Mom checks it. We also help with the chores: I wash the dishes and Ben feeds the fish. On Fridays there is no school, so we cook for Shabbat together. I never feel bored on Fridays. What does your week look like?",
      questions: [
        { q: "Who does Yael eat breakfast with?", he: "עם מי יעל אוכלת ארוחת בוקר?", options: ["Her mom", "Her dad", "Ben"], a: 1 },
        { q: "When does Yael practice the violin?", he: "מתי יעל מתאמנת בכינור?", options: ["On Wednesdays", "On Sundays", "On Fridays"], a: 0 },
        { q: "What does Ben do in the park?", he: "מה בן עושה בפארק?", options: ["He feeds the ducks", "He reads", "He plays football"], a: 2 },
        { q: "What does the family do on Fridays?", he: "מה המשפחה עושה בימי שישי?", options: ["They go to school", "They cook for Shabbat", "They go to drama club"], a: 1 }
      ]
    }
  },
  {
    id: "m04", title: "Right Now vs Every Day", he: "עכשיו או כל יום?", em: "⏱️", theme: "cave",
    grade: "ז׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "Present progressive (am/is/are + -ing) vs present simple · stative verbs",
      he: "Present progressive מתאר משהו שקורה עכשיו או בתקופה הזאת: I am reading now. Present simple מתאר הרגל: I read every day. מילים שעוזרות: now, right now, at the moment, look! → progressive; every day, usually, on Mondays → simple. פעלים של מצב (like, love, want, know, need, believe, understand) כמעט אף פעם לא באים עם ing.",
      examples: [
        ["Look! It is raining.", "תסתכל! יורד גשם."],
        ["It rains a lot in winter.", "יורד הרבה גשם בחורף."],
        ["I am doing my homework right now.", "אני עושה את שיעורי הבית עכשיו."],
        ["She usually walks, but today she is taking a taxi.", "בדרך כלל היא הולכת ברגל, אבל היום היא לוקחת מונית."],
        ["I know the answer. (not: I am knowing)", "אני יודע את התשובה."]
      ]
    },
    words: [
      ["at the moment", "כרגע", "⏳"], ["right now", "ממש עכשיו", "⚡"], ["nowadays", "בימינו", ""], ["video call", "שיחת וידאו", "📹"],
      ["text message", "הודעת טקסט", "💬"], ["laugh", "לצחוק", "😂"], ["shout", "לצעוק", "📢"], ["whisper", "ללחוש", "🤫"],
      ["wave", "לנופף", "👋"], ["believe", "להאמין", ""], ["understand", "להבין", "💡"], ["prefer", "להעדיף", "👍"],
      ["taste", "טעם, לטעום", "😋"], ["smell", "ריח, להריח", "👃"], ["sound", "להישמע", "🔊"], ["hang out", "לבלות עם חברים", "🛹"]
    ],
    sentences: [
      ["I am talking to my cousin on a video call.", "אני מדבר עם בן הדוד שלי בשיחת וידאו."],
      ["She usually sends text messages, not emails.", "היא בדרך כלל שולחת הודעות טקסט, לא מיילים."],
      ["Why are you whispering?", "למה אתה לוחש?"],
      ["The soup smells great.", "המרק מריח נהדר."],
      ["We are hanging out at the mall at the moment.", "אנחנו מבלים בקניון כרגע."],
      ["I don't understand this question.", "אני לא מבין את השאלה הזאת."],
      ["Look! Dan is waving at us.", "תסתכל! דן מנופף לנו."],
      ["Nowadays many kids prefer games to books.", "בימינו הרבה ילדים מעדיפים משחקים על פני ספרים."],
      ["He is studying for a big test this week.", "הוא לומד למבחן גדול השבוע."],
      ["That idea sounds good to me.", "הרעיון הזה נשמע לי טוב."],
      ["Why is everyone laughing?", "למה כולם צוחקים?"]
    ],
    gaps: [
      { s: "Be quiet! The baby ___.", options: ["sleeps", "is sleeping", "sleep"], a: 1, he: "שקט! התינוק ישן.", why: "קורה עכשיו – progressive." },
      { s: "My dad ___ to work every day.", options: ["drives", "is driving", "drive"], a: 0, he: "אבא שלי נוסע לעבודה כל יום.", why: "every day – הרגל, present simple." },
      { s: "I ___ the answer to this question.", options: ["am knowing", "knows", "know"], a: 2, he: "אני יודע את התשובה לשאלה הזאת.", why: "know הוא פועל מצב – בלי ing." },
      { s: "Look! The boys ___ football in the rain.", options: ["are playing", "play", "plays"], a: 0, he: "תסתכל! הבנים משחקים כדורגל בגשם.", why: "Look! – משהו שקורה עכשיו." },
      { s: "What ___ you doing right now?", options: ["do", "are", "is"], a: 1, he: "מה אתה עושה עכשיו?", why: "right now + doing – are." },
      { s: "She ___ chocolate ice cream.", options: ["is loving", "love", "loves"], a: 2, he: "היא אוהבת גלידת שוקולד.", why: "love – פועל מצב, ועם she מוסיפים s." },
      { s: "We usually ___ dinner at seven.", options: ["are eating", "eat", "eats"], a: 1, he: "אנחנו בדרך כלל אוכלים ארוחת ערב בשבע.", why: "usually – present simple." },
      { s: "It ___ a lot in Jerusalem in winter.", options: ["rains", "is raining", "rain"], a: 0, he: "יורד הרבה גשם בירושלים בחורף.", why: "עובדה כללית – present simple." },
      { s: "Sorry, I can't talk. I ___ a shower.", options: ["take", "am taking", "takes"], a: 1, he: "סליחה, אני לא יכול לדבר. אני במקלחת.", why: "עכשיו – progressive." },
      { s: "This cake ___ delicious!", options: ["is tasting", "taste", "tastes"], a: 2, he: "העוגה הזאת טעימה!", why: "taste כמצב – בלי ing." },
      { s: "___ your brother play the guitar?", options: ["Does", "Is", "Do"], a: 0, he: "אחיך מנגן בגיטרה?", why: "שאלה על הרגל – Does." },
      { s: "Noa ___ for her exam this week.", options: ["studies", "is studying", "study"], a: 1, he: "נועה לומדת למבחן שלה השבוע.", why: "this week – תקופה זמנית, progressive." },
      { s: "I ___ you. Speak louder, please.", options: ["am not hearing", "don't hear", "not hear"], a: 1, he: "אני לא שומע אותך. דבר חזק יותר, בבקשה.", why: "hear – פועל מצב." },
      { s: "They ___ TV at the moment.", options: ["aren't watching", "don't watch", "doesn't watch"], a: 0, he: "הם לא צופים בטלוויזיה כרגע.", why: "at the moment – progressive." },
      { s: "He ___ a new bike. He wants a red one.", options: ["is needing", "needs", "need"], a: 1, he: "הוא צריך אופניים חדשים. הוא רוצה אדומים.", why: "need – פועל מצב, ועם he מוסיפים s." }
    ],
    transforms: [
      { task: "-ing form", q: "swim", a: "swimming", alt: [], he: "לשחות" },
      { task: "-ing form", q: "write", a: "writing", alt: [], he: "לכתוב" },
      { task: "-ing form", q: "lie", a: "lying", alt: [], he: "לשכב" },
      { task: "Make it 'now'", q: "I read. (now)", a: "I am reading now.", alt: ["I'm reading now."], he: "אני קורא עכשיו." },
      { task: "Make it 'now'", q: "She cooks. (now)", a: "She is cooking now.", alt: ["She's cooking now."], he: "היא מבשלת עכשיו." },
      { task: "Negative", q: "They are running.", a: "They are not running.", alt: ["They aren't running.", "They're not running."], he: "הם לא רצים." },
      { task: "Question", q: "He is sleeping.", a: "Is he sleeping?", alt: [], he: "הוא ישן?" },
      { task: "Question", q: "You are listening.", a: "Are you listening?", alt: [], he: "אתה מקשיב?" }
    ],
    reading: {
      title: "A Video Call from Grandma", he: "שיחת וידאו מסבתא",
      text: "It is Sunday evening. Grandma usually calls on Sundays, and right now she is talking to the whole family on a video call. She lives in London, so we don't see her very often. \"What is everyone doing?\" she asks. \"Dad is cooking pasta,\" says Maya. \"It smells wonderful!\" Mom is sitting next to Maya and she is waving at the screen. Little Sam is not listening. He is building a tower with his blocks on the floor. \"And where is Adam?\" Grandma asks. \"He is studying in his room. He has a big test this week,\" Maya explains. Grandma laughs. \"He always studies before tests. I believe he will do well!\" Suddenly the tower falls and Sam shouts. \"Is everything OK?\" asks Grandma. \"Yes,\" says Maya. \"Sam is just being Sam.\" Everyone laughs.",
      questions: [
        { q: "When does Grandma usually call?", he: "מתי סבתא בדרך כלל מתקשרת?", options: ["On Fridays", "On Sundays", "Every day"], a: 1 },
        { q: "What is Dad doing?", he: "מה אבא עושה?", options: ["He is cooking pasta", "He is waving", "He is studying"], a: 0 },
        { q: "Why is Adam in his room?", he: "למה אדם בחדר שלו?", options: ["He is sleeping", "He is playing", "He is studying for a test"], a: 2 },
        { q: "Why does Sam shout?", he: "למה סם צועק?", options: ["Grandma laughs", "His tower falls", "He is hungry"], a: 1 }
      ]
    }
  },
  {
    id: "m05", title: "How Much? How Many?", he: "כמה? (נספר ולא נספר)", em: "🛒", theme: "sky",
    grade: "ו׳", level: "A1", band: "Foundation",
    grammar: {
      rule: "Countable / uncountable · some / any · much / many / a lot of · there is / there are",
      he: "שמות עצם נספרים אפשר לספור (an egg, three eggs). שמות לא נספרים אי אפשר (milk, rice, water) – אין להם רבים. many לנספרים, much לא נספרים (בעיקר בשלילה ובשאלה), a lot of לשניהם. some במשפט חיובי, any בשלילה ובשאלה. there is ליחיד ולא נספר, there are לרבים.",
      examples: [
        ["There is some milk in the fridge.", "יש קצת חלב במקרר."],
        ["There are some eggs on the table.", "יש כמה ביצים על השולחן."],
        ["Is there any bread? No, there isn't any.", "יש לחם? לא, אין בכלל."],
        ["How many apples? How much sugar?", "כמה תפוחים? כמה סוכר?"],
        ["We have a lot of time and a lot of friends.", "יש לנו הרבה זמן והרבה חברים."]
      ]
    },
    words: [
      ["flour", "קמח", "🌾"], ["sugar", "סוכר", "🍬"], ["rice", "אורז", "🍚"], ["butter", "חמאה", "🧈"],
      ["honey", "דבש", "🍯"], ["oil", "שמן", "🫒"], ["salt", "מלח", "🧂"], ["jar", "צנצנת", "🫙"],
      ["loaf", "כיכר לחם", "🍞"], ["carton", "קרטון (של חלב)", "🥛"], ["bag of", "שקית של", "🛍️"], ["shopping list", "רשימת קניות", "📝"],
      ["checkout", "קופה", "🧾"], ["cart", "עגלת קניות", "🛒"], ["fridge", "מקרר", "🧊"], ["recipe", "מתכון", "📜"]
    ],
    sentences: [
      ["There isn't any milk in the fridge.", "אין חלב במקרר."],
      ["How many eggs do we need for the recipe?", "כמה ביצים אנחנו צריכים למתכון?"],
      ["Can you buy some flour and a jar of honey?", "אתה יכול לקנות קמח וצנצנת דבש?"],
      ["We don't have much time.", "אין לנו הרבה זמן."],
      ["There are a lot of people at the checkout.", "יש הרבה אנשים בקופה."],
      ["Is there any sugar left?", "נשאר סוכר?"],
      ["Please put two loaves of bread in the cart.", "בבקשה שים שתי כיכרות לחם בעגלה."],
      ["How much rice should I cook?", "כמה אורז אני צריך לבשל?"],
      ["Add a little salt and some oil.", "תוסיף קצת מלח וקצת שמן."],
      ["There are some apples in the bag.", "יש כמה תפוחים בשקית."]
    ],
    gaps: [
      { s: "There ___ some milk in the glass.", options: ["are", "is", "be"], a: 1, he: "יש קצת חלב בכוס.", why: "milk לא נספר – is." },
      { s: "How ___ apples do you want?", options: ["much", "many", "lot"], a: 1, he: "כמה תפוחים אתה רוצה?", why: "apples נספר – many." },
      { s: "We don't have ___ bread.", options: ["some", "any", "many"], a: 1, he: "אין לנו לחם.", why: "שלילה – any." },
      { s: "How ___ water do you drink every day?", options: ["much", "many", "any"], a: 0, he: "כמה מים אתה שותה כל יום?", why: "water לא נספר – much." },
      { s: "There ___ three cartons of juice.", options: ["is", "are", "am"], a: 1, he: "יש שלושה קרטונים של מיץ.", why: "רבים – are." },
      { s: "I'd like ___ tea, please.", options: ["a", "many", "some"], a: 2, he: "אני רוצה קצת תה, בבקשה.", why: "בקשה – some, וtea לא נספר." },
      { s: "Is there ___ sugar in the jar?", options: ["any", "some of", "a"], a: 0, he: "יש סוכר בצנצנת?", why: "שאלה – any." },
      { s: "She has ___ friends at school.", options: ["much", "a lot of", "a lot"], a: 1, he: "יש לה הרבה חברים בבית הספר.", why: "לפני שם עצם – a lot of." },
      { s: "Can I have ___ egg, please?", options: ["an", "some", "any"], a: 0, he: "אני יכול לקבל ביצה, בבקשה?", why: "ביצה אחת – an." },
      { s: "There isn't ___ rice in the bag.", options: ["many", "much", "a"], a: 1, he: "אין הרבה אורז בשקית.", why: "rice לא נספר, שלילה – much." },
      { s: "We need two ___ of bread.", options: ["loafs", "loaf", "loaves"], a: 2, he: "אנחנו צריכים שתי כיכרות לחם.", why: "loaf ברבים: loaves." },
      { s: "There ___ any cookies left.", options: ["isn't", "aren't", "don't"], a: 1, he: "לא נשארו עוגיות.", why: "cookies ברבים – aren't." },
      { s: "Put ___ butter on the bread.", options: ["a few", "many", "a little"], a: 2, he: "שים קצת חמאה על הלחם.", why: "butter לא נספר – a little." },
      { s: "How many ___ are in the cart?", options: ["bottle", "bottles", "bottle's"], a: 1, he: "כמה בקבוקים יש בעגלה?", why: "אחרי how many – רבים." },
      { s: "I have ___ homework today. I'm so busy!", options: ["a lot of", "many", "a few"], a: 0, he: "יש לי הרבה שיעורי בית היום. אני כל כך עסוק!", why: "homework לא נספר – a lot of." }
    ],
    transforms: [
      { task: "much or many?", q: "How ___ people?", a: "many", alt: ["How many people?"], he: "כמה אנשים?" },
      { task: "much or many?", q: "How ___ money?", a: "much", alt: ["How much money?"], he: "כמה כסף?" },
      { task: "some or any?", q: "I don't have ___ pens.", a: "any", alt: ["I don't have any pens."], he: "אין לי עטים." },
      { task: "some or any?", q: "There are ___ books here.", a: "some", alt: ["There are some books here."], he: "יש כאן כמה ספרים." },
      { task: "is or are?", q: "There ___ a cat in the garden.", a: "is", alt: ["There is a cat in the garden."], he: "יש חתול בגינה." },
      { task: "Negative", q: "There is some juice.", a: "There isn't any juice.", alt: ["There is not any juice."], he: "אין מיץ." },
      { task: "Question", q: "There are some eggs.", a: "Are there any eggs?", alt: [], he: "יש ביצים?" },
      { task: "Plural", q: "a loaf of bread", a: "two loaves of bread", alt: ["loaves of bread"], he: "כיכר לחם" }
    ],
    reading: {
      title: "Baking Challah", he: "אופים חלה",
      text: "On Thursday evening, Ben and his mom want to bake challah for Shabbat. Ben reads the recipe: \"We need a lot of flour, some sugar, a little salt, some oil, two eggs and some water.\" Mom opens the fridge. \"There are some eggs, but there isn't any oil,\" she says. Ben looks in the cupboard. \"How much flour is there?\" asks Mom. \"Only one small bag. That isn't enough.\" So they write a shopping list and go to the supermarket. There are many people at the checkout, and they wait for twenty minutes. At home, Ben mixes everything in a big bowl. He adds too much sugar by mistake, but Mom says it's OK: \"Sweet challah is the best!\" Two hours later, there are three beautiful loaves on the table. The house smells wonderful.",
      questions: [
        { q: "Why do they go to the supermarket?", he: "למה הם הולכים לסופרמרקט?", options: ["They need eggs", "There isn't any oil and not enough flour", "They want cookies"], a: 1 },
        { q: "How long do they wait at the checkout?", he: "כמה זמן הם מחכים בקופה?", options: ["Two hours", "Ten minutes", "Twenty minutes"], a: 2 },
        { q: "What mistake does Ben make?", he: "איזו טעות בן עושה?", options: ["He adds too much sugar", "He forgets the eggs", "He drops the bowl"], a: 0 },
        { q: "How many loaves are on the table at the end?", he: "כמה כיכרות יש על השולחן בסוף?", options: ["Two", "Three", "Four"], a: 1 }
      ]
    }
  },
  {
    id: "m06", title: "What Happened? Past Simple", he: "מה קרה? עבר פשוט", em: "🕰️", theme: "castle",
    grade: "ז׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "Past simple: walked / went · didn't + verb · Did you…?",
      he: "עבר פשוט מתאר משהו שקרה והסתיים (yesterday, last week, two days ago). בפעלים רגילים מוסיפים ed: play → played. פעלים חריגים צריך לזכור: go → went, see → saw, eat → ate. בשלילה: didn't + פועל בסיס (I didn't go). בשאלה: Did + נושא + פועל בסיס (Did you see it?). was/were עם I/he/she/it ועם you/we/they.",
      examples: [
        ["We visited the museum last week.", "ביקרנו במוזיאון בשבוע שעבר."],
        ["I went to the beach yesterday.", "הלכתי לים אתמול."],
        ["She didn't eat breakfast.", "היא לא אכלה ארוחת בוקר."],
        ["Did you see the match?", "ראית את המשחק?"],
        ["It was cold and we were tired.", "היה קר והיינו עייפים."]
      ]
    },
    words: [
      ["yesterday", "אתמול", "📆"], ["last night", "אתמול בלילה", "🌙"], ["ago", "לפני (זמן)", "⏪"], ["trip", "טיול", "🧳"],
      ["museum", "מוזיאון", "🏛️"], ["guide", "מדריך", "🧑‍🏫"], ["tent", "אוהל", "⛺"], ["campfire", "מדורה", "🔥"],
      ["arrive", "להגיע", "🏁"], ["forget", "לשכוח", "🤦"], ["break", "לשבור", "💔"], ["bring", "להביא", "🎁"],
      ["climb", "לטפס", "🧗"], ["fall", "ליפול", "🍂"], ["happen", "לקרות", "❗"], ["take photos", "לצלם תמונות", "📸"]
    ],
    sentences: [
      ["We went on a class trip last week.", "יצאנו לטיול שנתי בשבוע שעבר."],
      ["I forgot my hat at home.", "שכחתי את הכובע שלי בבית."],
      ["Did you take photos at the museum?", "צילמת תמונות במוזיאון?"],
      ["The guide told us a funny story.", "המדריך סיפר לנו סיפור מצחיק."],
      ["We didn't sleep in a tent.", "לא ישנו באוהל."],
      ["Tom fell and broke his arm two years ago.", "טום נפל ושבר את היד לפני שנתיים."],
      ["What happened last night?", "מה קרה אתמול בלילה?"],
      ["They arrived late because of the traffic.", "הם הגיעו מאוחר בגלל הפקקים."],
      ["We sat around the campfire and sang songs.", "ישבנו סביב המדורה ושרנו שירים."],
      ["Was the water cold?", "המים היו קרים?"],
      ["My mom brought sandwiches for everyone.", "אמא שלי הביאה כריכים לכולם."]
    ],
    gaps: [
      { s: "Yesterday I ___ my grandma.", options: ["visit", "visited", "visits"], a: 1, he: "אתמול ביקרתי את סבתא שלי.", why: "yesterday – עבר, מוסיפים ed." },
      { s: "We ___ to Eilat last summer.", options: ["goed", "went", "go"], a: 1, he: "נסענו לאילת בקיץ שעבר.", why: "go חריג: went." },
      { s: "She ___ like the movie.", options: ["didn't", "doesn't", "wasn't"], a: 0, he: "היא לא אהבה את הסרט.", why: "שלילה בעבר – didn't." },
      { s: "Did you ___ the news?", options: ["saw", "seen", "see"], a: 2, he: "ראית את החדשות?", why: "אחרי did – פועל בסיס." },
      { s: "The children ___ very tired after the trip.", options: ["was", "were", "are"], a: 1, he: "הילדים היו מאוד עייפים אחרי הטיול.", why: "רבים בעבר – were." },
      { s: "I ___ my phone on the bus.", options: ["forgot", "forget", "forgetted"], a: 0, he: "שכחתי את הטלפון שלי באוטובוס.", why: "forget חריג: forgot." },
      { s: "He didn't ___ his homework.", options: ["did", "do", "does"], a: 1, he: "הוא לא עשה את שיעורי הבית.", why: "אחרי didn't – פועל בסיס." },
      { s: "We ___ pizza for dinner last night.", options: ["eated", "ate", "eat"], a: 1, he: "אכלנו פיצה לארוחת ערב אתמול בלילה.", why: "eat חריג: ate." },
      { s: "___ it cold yesterday?", options: ["Did", "Were", "Was"], a: 2, he: "היה קר אתמול?", why: "it בעבר – was." },
      { s: "They ___ a big fish in the lake.", options: ["catched", "caught", "catch"], a: 1, he: "הם תפסו דג גדול באגם.", why: "catch חריג: caught." },
      { s: "I ___ the mountain with my dad.", options: ["climbed", "climb", "climbt"], a: 0, he: "טיפסתי על ההר עם אבא שלי.", why: "climb רגיל: climbed." },
      { s: "When ___ you arrive?", options: ["do", "were", "did"], a: 2, he: "מתי הגעתם?", why: "שאלה בעבר – did." },
      { s: "The vase fell and ___.", options: ["broke", "breaked", "break"], a: 0, he: "האגרטל נפל ונשבר.", why: "break חריג: broke." },
      { s: "We ___ at home last Shabbat.", options: ["was", "were", "did"], a: 1, he: "היינו בבית בשבת שעברה.", why: "we בעבר – were." },
      { s: "She ___ a beautiful dress to the wedding.", options: ["weared", "wore", "wear"], a: 1, he: "היא לבשה שמלה יפה לחתונה.", why: "wear חריג: wore." }
    ],
    transforms: [
      { task: "Past form", q: "play", a: "played", alt: [], he: "לשחק" },
      { task: "Past form", q: "study", a: "studied", alt: [], he: "ללמוד" },
      { task: "Past form", q: "buy", a: "bought", alt: [], he: "לקנות" },
      { task: "Past form", q: "write", a: "wrote", alt: [], he: "לכתוב" },
      { task: "Past form", q: "stop", a: "stopped", alt: [], he: "לעצור" },
      { task: "Negative", q: "I saw him.", a: "I didn't see him.", alt: ["I did not see him."], he: "לא ראיתי אותו." },
      { task: "Question", q: "She called you.", a: "Did she call you?", alt: [], he: "היא התקשרה אליך?" },
      { task: "Make it past", q: "We are happy.", a: "We were happy.", alt: [], he: "היינו שמחים." }
    ],
    reading: {
      title: "The Class Trip", he: "הטיול השנתי",
      text: "Last month our class went on a trip to the Galilee. We left school at six in the morning and arrived at the park at nine. First, our guide took us on a long walk next to a river. The water was very cold, but some boys jumped in anyway! Then we climbed a small mountain. From the top, we saw the Sea of Galilee. Everybody took photos. In the afternoon, it started to rain. We didn't bring umbrellas, so we ran to the bus. At night we slept in big tents near the river. We sat around a campfire and sang songs. Sam told a scary story, and Noa laughed so hard that she fell off her chair. I didn't sleep much that night, but it was the best trip of the year.",
      questions: [
        { q: "Where did the class go?", he: "לאן הכיתה נסעה?", options: ["To the Galilee", "To Eilat", "To a museum"], a: 0 },
        { q: "What did they see from the top of the mountain?", he: "מה הם ראו מראש ההר?", options: ["The river", "The Sea of Galilee", "Their school"], a: 1 },
        { q: "Why did they run to the bus?", he: "למה הם רצו לאוטובוס?", options: ["They were late", "It was dark", "It started to rain"], a: 2 },
        { q: "What happened to Noa?", he: "מה קרה לנועה?", options: ["She fell off her chair laughing", "She lost her bag", "She jumped in the river"], a: 0 }
      ]
    }
  },
  {
    id: "m07", title: "Bigger, Better, the Best", he: "גדול יותר, הכי טוב", em: "🏆", theme: "grass",
    grade: "ז׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "Comparatives & superlatives · as … as · less / the least",
      he: "במילים קצרות מוסיפים er להשוואה ו-the …est לשיא: tall → taller → the tallest. במילים ארוכות משתמשים ב-more / the most: more interesting. חריגים: good → better → the best, bad → worse → the worst. as … as אומר ״באותה מידה״: as tall as. less / the least אומר ״פחות / הכי פחות״.",
      examples: [
        ["A whale is bigger than a dolphin.", "לווייתן גדול יותר מדולפין."],
        ["This is the tallest building in the city.", "זה הבניין הכי גבוה בעיר."],
        ["Math is more difficult than art.", "מתמטיקה קשה יותר מאמנות."],
        ["My phone is as old as yours.", "הטלפון שלי ישן כמו שלך."],
        ["This game is the best! That one is the worst.", "המשחק הזה הכי טוב! ההוא הכי גרוע."],
        ["Walking is less expensive than flying.", "הליכה זולה יותר (פחות יקרה) מטיסה."]
      ]
    },
    words: [
      ["heavy", "כבד", "🏋️"], ["light", "קל (משקל)", "🪶"], ["expensive", "יקר", "💎"], ["cheap", "זול", "🏷️"],
      ["comfortable", "נוח", "🛋️"], ["dangerous", "מסוכן", "⚠️"], ["popular", "פופולרי", "⭐"], ["wide", "רחב", "↔️"],
      ["narrow", "צר", ""], ["deep", "עמוק", "🌊"], ["noisy", "רועש", "🔊"], ["crowded", "צפוף", "👥"],
      ["record", "שיא", "🥇"], ["compare", "להשוות", "⚖️"], ["planet", "כוכב לכת", "🪐"], ["mountain", "הר", "⛰️"]
    ],
    sentences: [
      ["My bag is heavier than yours.", "התיק שלי כבד יותר משלך."],
      ["Jupiter is the biggest planet.", "צדק הוא כוכב הלכת הגדול ביותר."],
      ["This sofa is more comfortable than that chair.", "הספה הזאת נוחה יותר מהכיסא ההוא."],
      ["The bus is cheaper than a taxi.", "האוטובוס זול יותר ממונית."],
      ["Today is the best day of my life!", "היום הוא היום הכי טוב בחיים שלי!"],
      ["Is Tel Aviv as crowded as New York?", "תל אביב צפופה כמו ניו יורק?"],
      ["Mount Hermon is the highest mountain in Israel.", "החרמון הוא ההר הגבוה ביותר בישראל."],
      ["My little brother is less noisy than my sister.", "אחי הקטן פחות רועש מאחותי."],
      ["This road is narrower and more dangerous.", "הכביש הזה צר יותר ומסוכן יותר."],
      ["Who is the most popular singer now?", "מי הזמר הכי פופולרי עכשיו?"]
    ],
    gaps: [
      { s: "An elephant is ___ than a horse.", options: ["big", "bigger", "biggest"], a: 1, he: "פיל גדול יותר מסוס.", why: "השוואה בין שניים – er + than." },
      { s: "This is the ___ book I have ever read.", options: ["interestingest", "more interesting", "most interesting"], a: 2, he: "זה הספר הכי מעניין שקראתי אי פעם.", why: "מילה ארוכה בשיא – the most." },
      { s: "My grades are ___ than last year.", options: ["better", "gooder", "best"], a: 0, he: "הציונים שלי טובים יותר משנה שעברה.", why: "good → better." },
      { s: "Dan is as tall ___ his father.", options: ["than", "as", "like"], a: 1, he: "דן גבוה כמו אבא שלו.", why: "as … as." },
      { s: "Today is ___ day of the year.", options: ["the hotter", "hottest", "the hottest"], a: 2, he: "היום הוא היום הכי חם בשנה.", why: "שיא – the + est." },
      { s: "A car is ___ than a bike.", options: ["more expensive", "expensiver", "most expensive"], a: 0, he: "מכונית יקרה יותר מאופניים.", why: "מילה ארוכה – more." },
      { s: "That was the ___ movie ever!", options: ["baddest", "worst", "worse"], a: 1, he: "זה היה הסרט הכי גרוע אי פעם!", why: "bad → worse → the worst." },
      { s: "The Dead Sea is ___ than the Red Sea.", options: ["saltier", "saltyer", "more salty than"], a: 0, he: "ים המלח מלוח יותר מהים האדום.", why: "y הופכת ל-ier." },
      { s: "My room is ___ than my sister's.", options: ["more small", "smaller", "smallest"], a: 1, he: "החדר שלי קטן יותר מהחדר של אחותי.", why: "מילה קצרה – er." },
      { s: "Of all the kids, Noa runs the ___.", options: ["fast", "faster", "fastest"], a: 2, he: "מכל הילדים, נועה רצה הכי מהר.", why: "שיא מתוך קבוצה – the fastest." },
      { s: "This bag is ___ heavy than that one.", options: ["less", "least", "little"], a: 0, he: "התיק הזה פחות כבד מההוא.", why: "השוואה – less + than." },
      { s: "The river is ___ here than near the bridge.", options: ["deep", "deeper", "the deepest"], a: 1, he: "הנהר עמוק יותר כאן מאשר ליד הגשר.", why: "than – השוואה." },
      { s: "It's the ___ expensive phone in the shop. Only 100 shekels!", options: ["less", "least", "most"], a: 1, he: "זה הטלפון הכי פחות יקר בחנות. רק 100 שקלים!", why: "הכי פחות – the least." },
      { s: "My new shoes are not as comfortable ___ my old ones.", options: ["as", "than", "so"], a: 0, he: "הנעליים החדשות שלי לא נוחות כמו הישנות.", why: "not as … as." },
      { s: "She is ___ girl in our class.", options: ["the most funny", "funniest", "the funniest"], a: 2, he: "היא הילדה הכי מצחיקה בכיתה שלנו.", why: "funny → the funniest." }
    ],
    transforms: [
      { task: "Comparative", q: "big", a: "bigger", alt: [], he: "גדול" },
      { task: "Comparative", q: "happy", a: "happier", alt: [], he: "שמח" },
      { task: "Comparative", q: "beautiful", a: "more beautiful", alt: [], he: "יפה" },
      { task: "Superlative", q: "good", a: "the best", alt: ["best"], he: "טוב" },
      { task: "Superlative", q: "bad", a: "the worst", alt: ["worst"], he: "רע" },
      { task: "Superlative", q: "cheap", a: "the cheapest", alt: ["cheapest"], he: "זול" },
      { task: "Superlative", q: "dangerous", a: "the most dangerous", alt: ["most dangerous"], he: "מסוכן" },
      { task: "Comparative", q: "far", a: "farther", alt: ["further"], he: "רחוק" }
    ],
    reading: {
      title: "The Class Records Book", he: "ספר השיאים של הכיתה",
      text: "This year our class made a records book. Every student chose a record. Adam is the tallest boy in the class. He is even taller than our teacher! Maya can hold her breath for fifty seconds. That's longer than anyone else. Ben has the biggest collection of stickers: more than two thousand. Lily's record is the funniest. She can say the alphabet backwards faster than a computer reads it. My record is not as exciting as theirs, but I am proud of it. I read thirty books this year, which is the most books in the class. The most popular page in the book is the \"worst jokes\" page. Our teacher says the jokes are terrible, but she always laughs. Next year we want to make a better and bigger book.",
      questions: [
        { q: "Who is the tallest boy?", he: "מי הילד הכי גבוה?", options: ["Ben", "Adam", "The writer"], a: 1 },
        { q: "What is Maya's record?", he: "מה השיא של מאיה?", options: ["Holding her breath", "Reading books", "Collecting stickers"], a: 0 },
        { q: "How many books did the writer read?", he: "כמה ספרים הכותב קרא?", options: ["Fifty", "Two thousand", "Thirty"], a: 2 },
        { q: "Which page is the most popular?", he: "איזה עמוד הכי פופולרי?", options: ["The alphabet page", "The worst jokes page", "The tallest student page"], a: 1 }
      ]
    }
  },
  {
    id: "m08", title: "Plans & Predictions", he: "תוכניות ותחזיות", em: "🔮", theme: "desert",
    grade: "ז׳", level: "A2", band: "Intermediate",
    grammar: {
      rule: "Future: will / be going to / present progressive for plans",
      he: "will משמש להחלטה של הרגע, להבטחה ולתחזית: I'll help you. It will rain. be going to משמש לתוכנית שכבר החלטנו עליה או לתחזית לפי מה שרואים: I'm going to visit Eilat. Look at the clouds – it's going to rain! present progressive משמש לסידור שכבר קבענו עם זמן ומקום: I'm meeting Dan at five. בשלילה: won't = will not.",
      examples: [
        ["I'm thirsty. – I'll get you some water.", "אני צמא. – אביא לך מים."],
        ["We're going to visit Grandpa next week.", "אנחנו הולכים לבקר את סבא בשבוע הבא."],
        ["Look at those clouds! It's going to rain.", "תסתכל על העננים! עומד לרדת גשם."],
        ["I'm meeting Dan at the mall at five.", "אני נפגש עם דן בקניון בחמש."],
        ["I think robots will do our homework one day.", "אני חושב שרובוטים יעשו לנו שיעורי בית יום אחד."],
        ["Don't worry, I won't forget.", "אל תדאג, לא אשכח."]
      ]
    },
    words: [
      ["tomorrow", "מחר", "🌅"], ["next week", "בשבוע הבא", "📆"], ["future", "עתיד", "🚀"], ["plan", "תוכנית, לתכנן", "🗺️"],
      ["predict", "לחזות", "🔮"], ["promise", "להבטיח", "🤞"], ["decide", "להחליט", "✅"], ["probably", "כנראה", ""],
      ["maybe", "אולי", "🤔"], ["vacation", "חופשה", "🏖️"], ["bar mitzvah", "בר מצווה", "🎉"], ["invitation", "הזמנה", "💌"],
      ["robot", "רובוט", "🤖"], ["forecast", "תחזית", "🌦️"], ["cloud", "ענן", "☁️"], ["appointment", "תור, פגישה", "🗓️"]
    ],
    sentences: [
      ["I'm going to learn to play the drums.", "אני הולך ללמוד לנגן בתופים."],
      ["The forecast says it will be sunny tomorrow.", "התחזית אומרת שמחר יהיה שמשי."],
      ["We are flying to Eilat next week.", "אנחנו טסים לאילת בשבוע הבא."],
      ["I promise I won't be late.", "אני מבטיח שלא אאחר."],
      ["My cousin's bar mitzvah is going to be in June.", "הבר מצווה של בן הדוד שלי תהיה ביוני."],
      ["Maybe robots will cook our dinner in the future.", "אולי בעתיד רובוטים יבשלו לנו ארוחת ערב."],
      ["The phone is ringing. I'll answer it.", "הטלפון מצלצל. אני אענה."],
      ["What are you doing on Friday?", "מה אתה עושה ביום שישי?"],
      ["She has a dentist appointment at four.", "יש לה תור לרופא שיניים בארבע."],
      ["Look at that dark cloud! It's going to rain.", "תסתכל על הענן הכהה! עומד לרדת גשם."],
      ["We probably won't go to the beach today.", "כנראה שלא נלך לים היום."]
    ],
    gaps: [
      { s: "The bag is heavy. – I ___ help you.", options: ["am going to", "'ll", "am"], a: 1, he: "התיק כבד. – אני אעזור לך.", why: "החלטה של הרגע – will." },
      { s: "We ___ to visit our cousins next summer. We bought the tickets.", options: ["will", "go", "are going"], a: 2, he: "אנחנו הולכים לבקר את בני הדודים שלנו בקיץ הבא. קנינו כרטיסים.", why: "תוכנית שכבר החלטנו – going to." },
      { s: "Look at the sky! It ___ rain.", options: ["is going to", "will", "rains"], a: 0, he: "תסתכל על השמיים! עומד לרדת גשם.", why: "רואים סימן עכשיו – going to." },
      { s: "I think people ___ live on Mars one day.", options: ["are living", "will", "are going"], a: 1, he: "אני חושב שאנשים יחיו על מאדים יום אחד.", why: "תחזית עם I think – will." },
      { s: "I ___ Noa at the library at 4 p.m. tomorrow.", options: ["meet", "am meeting", "will meeting"], a: 1, he: "אני נפגש עם נועה בספרייה מחר בארבע.", why: "סידור קבוע עם שעה – present progressive." },
      { s: "Don't tell Mom. – OK, I ___ tell her.", options: ["won't", "don't", "am not"], a: 0, he: "אל תספר לאמא. – בסדר, לא אספר לה.", why: "הבטחה בשלילה – won't." },
      { s: "___ you going to play in the match?", options: ["Will", "Do", "Are"], a: 2, he: "אתה הולך לשחק במשחק?", why: "going to – Are you…?" },
      { s: "He ___ be twelve next month.", options: ["will", "is going", "is"], a: 0, he: "הוא יהיה בן שתים עשרה בחודש הבא.", why: "עובדה בעתיד – will be." },
      { s: "She ___ going to buy a new phone.", options: ["are", "is", "will"], a: 1, he: "היא הולכת לקנות טלפון חדש.", why: "she – is going to." },
      { s: "I'm hungry. – I ___ make you a sandwich.", options: ["will", "'m going to", "make"], a: 0, he: "אני רעב. – אכין לך כריך.", why: "החלטה ברגע הדיבור – will." },
      { s: "They ___ going to watch the movie tonight.", options: ["isn't", "aren't", "won't"], a: 1, he: "הם לא הולכים לצפות בסרט הלילה.", why: "they – aren't going to." },
      { s: "What time ___ the train leave tomorrow?", options: ["is", "will", "does"], a: 2, he: "באיזו שעה הרכבת יוצאת מחר?", why: "לוח זמנים קבוע – present simple." },
      { s: "Be careful! You ___ fall!", options: ["are going to", "go to", "are falling to"], a: 0, he: "זהירות! אתה עומד ליפול!", why: "רואים שזה עומד לקרות – going to." },
      { s: "Maybe it ___ snow in Jerusalem this year.", options: ["is snowing", "will", "going to"], a: 1, he: "אולי ירד שלג בירושלים השנה.", why: "maybe + תחזית – will." },
      { s: "We ___ a party on Thursday. Do you want to come?", options: ["are having", "have going", "will having"], a: 0, he: "אנחנו עורכים מסיבה ביום חמישי. רוצה לבוא?", why: "אירוע שכבר מתוכנן – present progressive." }
    ],
    transforms: [
      { task: "Use will", q: "I / help / you", a: "I will help you.", alt: ["I'll help you."], he: "אני אעזור לך." },
      { task: "Negative", q: "It will rain.", a: "It won't rain.", alt: ["It will not rain."], he: "לא ירד גשם." },
      { task: "Question", q: "You will come.", a: "Will you come?", alt: [], he: "תבוא?" },
      { task: "Use going to", q: "We / visit / Grandma", a: "We are going to visit Grandma.", alt: ["We're going to visit Grandma."], he: "אנחנו הולכים לבקר את סבתא." },
      { task: "Use going to", q: "She / study / tonight", a: "She is going to study tonight.", alt: ["She's going to study tonight."], he: "היא הולכת ללמוד הלילה." },
      { task: "Negative", q: "I am going to buy it.", a: "I am not going to buy it.", alt: ["I'm not going to buy it."], he: "אני לא הולך לקנות את זה." },
      { task: "Question", q: "They are going to win.", a: "Are they going to win?", alt: [], he: "הם הולכים לנצח?" },
      { task: "Short form", q: "I will", a: "I'll", alt: [], he: "אני (פעל בעתיד)" }
    ],
    reading: {
      title: "Sam's Big Plans", he: "התוכניות הגדולות של סם",
      text: "Sam is twelve, and his bar mitzvah is going to be in three months. He is already very busy. Every Tuesday he is meeting his teacher to practice reading from the Torah. \"I'm going to read the whole portion,\" he says proudly. His parents are planning a party in the garden. They sent the invitations last week. Sam's grandparents are flying from New York, and they are arriving two days before the party. The weather forecast for that day says it will be sunny and warm. \"But what if it rains?\" asks his little sister. \"Don't worry,\" says Dad. \"We'll put up a big tent.\" Sam also has plans for the future. \"When I grow up, I'm going to be a scientist,\" he says. \"I think robots will help doctors, and I want to build them.\"",
      questions: [
        { q: "When is Sam's bar mitzvah?", he: "מתי הבר מצווה של סם?", options: ["In three months", "Next week", "In two days"], a: 0 },
        { q: "What does Sam do every Tuesday?", he: "מה סם עושה כל יום שלישי?", options: ["He sends invitations", "He practices reading from the Torah", "He builds robots"], a: 1 },
        { q: "What will Dad do if it rains?", he: "מה אבא יעשה אם ירד גשם?", options: ["Cancel the party", "Move to a hall", "Put up a big tent"], a: 2 },
        { q: "What does Sam want to be?", he: "מה סם רוצה להיות?", options: ["A doctor", "A scientist", "A teacher"], a: 1 }
      ]
    }
  }
];
