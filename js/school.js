// What Israeli schools teach in each grade, next to where it appears in the game.
// Levels and grade ranges: Ministry of Education, English Curriculum 2020 (Tables 2 and 4).
// Grammar per level: Revised English Curriculum 2018 (Foundation / Intermediate / Proficiency grammar lists).
export const SCHOOL = {
  intro: 'לפי תוכנית הלימודים של משרד החינוך באנגלית. הרמות מותאמות למסגרת האירופית (CEFR): Pre-A1 → A1 → A2 → B1/B2. בכל שורה: מה נלמד בכיתה, ואיפה מתרגלים את זה במשחק. השורה המודגשת היא המסלול של השחקן הנוכחי.',
  rows: [
    {
      grades: 'כיתה ג׳ – תחילת ד׳', cefr: 'Pre-A1', level: 'Pre-Basic User (טרום-יסוד)', tracks: ['kids'],
      topics: ['אותיות וצלילים, קריאה של מילים קצרות', 'מילים וצירופים ראשונים לשיחה (שלום, מה שלומך, קוראים לי...)', 'הבנת הוראות פשוטות בכיתה'],
      app: ['צעירים · עונה 1, עולמות 1–12 (ABC, שלום, משפחה, מספרים, צבעים, חיות...)', 'כללי קריאה: תנועות קצרות, sh, ch, th, ee, oo'],
    },
    {
      grades: 'כיתות ד׳–ו׳', cefr: 'A1', level: 'Basic User I · Foundation (יסוד)', tracks: ['kids', 'middle'],
      topics: ['משפט פשוט: חיווי, שלילה ושאלות (yes/no, WH)', 'Present simple, Past simple, Present progressive', 'Can / should / must, עתיד will ו-be going to, ציווי, קיצורים', 'רבים, a/an/the, this/that/these/those, כינויי גוף וקניין, ’s', 'some / any / many / much, השוואה ו-הכי (comparative/superlative)', 'there is / there are, מילות חיבור and, but, because, or', 'פיסוק ואותיות גדולות'],
      app: ['צעירים · עונה 1 עולמות 13–24 + עונה 2 (זמנים, השוואות, some/any, should, עבר לא סדיר)', 'חטיבה · עולמות m01–m08 (רבים, כינויים, Present simple/progressive, כמתים, עבר, השוואה, עתיד)'],
    },
    {
      grades: 'כיתות ז׳–ט׳', cefr: 'A2', level: 'Basic User II · Intermediate (ביניים)', tracks: ['middle', 'teen'],
      topics: ['Present perfect, Past progressive, Past perfect', 'Modals: can/could/be able to, must/have to, should, may/might', 'Gerunds / infinitives, let / help / make', 'Passive: הווה, עבר, מתמשך ועם מודלים', 'משפטי זיקה (who/which/that, where/when/why)', 'תנאי ראשון ומשפטי זמן, דיבור עקיף, tag questions', 'used to, as…as, less/least, stative verbs'],
      app: ['חטיבה · עולמות m09–m16 (מודלים, עבר מתמשך, Present perfect, gerunds, זיקה, תנאי, סביל, used to ודיבור עקיף)', 'תיכון · עולמות t01–t02, t05–t06'],
    },
    {
      grades: 'כיתות י׳–י״ב · בגרות 3 יח״ל', cefr: 'A2+', level: 'Basic User II+', tracks: ['teen'],
      topics: ['חזרה וביסוס של דקדוק רמת הביניים', 'הבנת הנקרא (אנסין) וכתיבה בסיסית'],
      app: ['תיכון · עולמות t01–t07, יחידת אסטרטגיות הקריאה t15'],
    },
    {
      grades: 'כיתות י׳–י״ב · בגרות 4–5 יח״ל', cefr: 'B1 / B2', level: 'Independent User · Proficiency (מתקדם)', tracks: ['teen'],
      topics: ['Present perfect progressive, Past perfect progressive, Future perfect', 'Passive בכל הזמנים, modal perfect (should have, might have...)', 'תנאי אפס, שני ושלישי, wish', 'מילות קישור: however, in spite of, nonetheless...', 'פסקה וחיבור, מייל רשמי ולא רשמי', '4 יח״ל ≈ B1, 5 יח״ל ≈ B2'],
      app: ['תיכון · עולמות t03–t04, t07–t16 (כולל wish, modal perfect, עתיד מושלם, מילות קישור, תצורת מילים, אנסין בסגנון בגרות, כתיבה)'],
    },
  ],
  sources: [
    ['English Curriculum 2020 (משרד החינוך, PDF)', 'https://meyda.education.gov.il/files/Mazkirut_Pedagogit/English/Curriculum2020.pdf'],
    ['Revised English Curriculum 2018 – רשימות הדקדוק לפי רמה (PDF)', 'https://meyda.education.gov.il/files/Mazkirut_Pedagogit/English/curriculum2018.pdf'],
    ['פורטל עובדי הוראה – תוכנית הלימודים באנגלית', 'https://pop.education.gov.il/tchumey_daat/english/chativa-elyona/curriculum/introduction/'],
  ],
  disclaimer: 'זה סיכום כללי ולא מסמך רשמי. בתי ספר וספרי לימוד שונים מתקדמים בקצב שונה – כדאי לבדוק מול המורה מה נלמד בפועל בכיתה.',
};
