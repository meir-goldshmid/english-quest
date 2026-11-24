// 🧩 Fun English: grammar for young kids (a / an, building a sentence, pronouns, am/is/are, my/her, me/him)
// taught by Zibi, a small alien from planet Zorp, plus picture word packs with easy games.
// Data only, so tools/list_texts.mjs can import it in Node.
// In text, [square brackets] mark the part to highlight; audio uses the text without them.
// In Zibi's lines, a plain string is Hebrew and {e: '...'} is English (each is played with its own voice).

const E = e => ({ e });

// ---------- a / an
const EXC = { hour: 'an', honest: 'an', unicorn: 'a', uniform: 'a', one: 'a', useful: 'a', european: 'a' };
export const art = w => { const f = w.toLowerCase().split(' ')[0]; return EXC[f] || (/^[aeiou]/.test(f) ? 'an' : 'a'); };
export const phrase = w => w.pl ? w.en : `${art(w.en)} ${w.en}`;
export const plain = t => t.replace(/[[\]]/g, '');

// ---------- word packs: [english, hebrew, emoji, plural?]
const P = (en, he, em, pl) => ({ en, he, em, pl: !!pl });
export const PACKS = [
  { id: 'w-fruit', title: 'פירות וירקות', em: '🍓', words: [P('apple', 'תפוח', '🍎'), P('banana', 'בננה', '🍌'), P('orange', 'תפוז', '🍊'), P('strawberry', 'תות', '🍓'), P('watermelon', 'אבטיח', '🍉'), P('carrot', 'גזר', '🥕'), P('onion', 'בצל', '🧅'), P('grapes', 'ענבים', '🍇', 1)] },
  { id: 'w-animals', title: 'בעלי חיים', em: '🐘', words: [P('elephant', 'פיל', '🐘'), P('owl', 'ינשוף', '🦉'), P('monkey', 'קוף', '🐒'), P('octopus', 'תמנון', '🐙'), P('ant', 'נמלה', '🐜'), P('rabbit', 'ארנב', '🐰'), P('frog', 'צפרדע', '🐸'), P('turtle', 'צב', '🐢')] },
  { id: 'w-room', title: 'החדר שלי', em: '🛏️', words: [P('bed', 'מיטה', '🛏️'), P('lamp', 'מנורה', '💡'), P('clock', 'שעון', '⏰'), P('book', 'ספר', '📕'), P('chair', 'כיסא', '🪑'), P('window', 'חלון', '🪟'), P('door', 'דלת', '🚪'), P('teddy bear', 'דובי', '🧸')] },
  { id: 'w-clothes', title: 'בגדים', em: '👗', words: [P('shirt', 'חולצה', '👕'), P('dress', 'שמלה', '👗'), P('hat', 'כובע', '🧢'), P('coat', 'מעיל', '🧥'), P('scarf', 'צעיף', '🧣'), P('umbrella', 'מטרייה', '☂️'), P('shoes', 'נעליים', '👟', 1), P('socks', 'גרביים', '🧦', 1)] },
  { id: 'w-body', title: 'הגוף שלי', em: '👂', words: [P('eye', 'עין', '👁️'), P('ear', 'אוזן', '👂'), P('nose', 'אף', '👃'), P('mouth', 'פה', '👄'), P('hand', 'יד', '✋'), P('foot', 'כף רגל', '🦶'), P('arm', 'זרוע', '💪'), P('tooth', 'שן', '🦷')] },
  { id: 'w-party', title: 'מסיבה!', em: '🎉', words: [P('balloon', 'בלון', '🎈'), P('cake', 'עוגה', '🎂'), P('ice cream', 'גלידה', '🍦'), P('gift', 'מתנה', '🎁'), P('kite', 'עפיפון', '🪁'), P('ball', 'כדור', '⚽'), P('robot', 'רובוט', '🤖'), P('candle', 'נר', '🕯️')] },
  { id: 'w-go', title: 'נוסעים!', em: '🚗', words: [P('car', 'מכונית', '🚗'), P('bus', 'אוטובוס', '🚌'), P('train', 'רכבת', '🚆'), P('airplane', 'מטוס', '✈️'), P('bike', 'אופניים', '🚲'), P('boat', 'סירה', '⛵'), P('island', 'אי', '🏝️'), P('ambulance', 'אמבולנס', '🚑')] },
  { id: 'w-people', title: 'אנשים', em: '👑', words: [P('girl', 'ילדה', '👧'), P('boy', 'ילד', '👦'), P('man', 'איש', '👨'), P('woman', 'אישה', '👩'), P('baby', 'תינוק', '👶'), P('king', 'מלך', '🤴'), P('queen', 'מלכה', '👸'), P('astronaut', 'אסטרונאוט', '🧑‍🚀')] },
];

// words for the a / an games (packs + a few more), never plural
const EXTRA = [P('egg', 'ביצה', '🥚'), P('cat', 'חתול', '🐱'), P('dog', 'כלב', '🐶'), P('pen', 'עט', '🖊️'), P('pizza', 'פיצה', '🍕'), P('ice cube', 'קוביית קרח', '🧊'), P('alien', 'חייזר', '👽'), P('igloo', 'איגלו', '🛖'), P('hour', 'שעה', '⏳'), P('unicorn', 'חד-קרן', '🦄')];
export const AAN_WORDS = [...PACKS.flatMap(p => p.words), ...EXTRA].filter(w => !w.pl && !['hour', 'unicorn'].includes(w.en));
const TEMPL = ['I see ___ {w}.', 'This is ___ {w}.', 'I have ___ {w}.', 'It is ___ {w}.'];
export const aanSentence = (w, n) => ({ s: TEMPL[n % TEMPL.length].replace('{w}', w.en), a: art(w.en), opts: ['a', 'an'], em: w.em });
export const AAN_PICK = AAN_WORDS.map(aanSentence);

// ---------- the grammar lessons. parts: meet + games; items feed the games
const NONE = '—';
const ROLE = { who: 'מי?', do: 'עושה', art: 'a / an', desc: 'איך?', thing: 'מה?' };
export { ROLE, NONE };

export const LESSONS = [
  { id: 'g-aan', title: 'a או an?', sub: 'a · an', em: '🍎', parts: ['meet', 'sort', 'pick'],
    slides: [
      { say: ['שלום! אני זיבי, חייזר מכוכב זוֹרְפּ. באתי לכדור הארץ ללמוד אנגלית, ואתם תעזרו לי!'], mood: 'wave' },
      { say: ['כשמדברים על דבר אחד, שמים לפניו מילה קטנה:', E('a')], v: { cards: [['[a] cat', '🐱'], ['[a] dog', '🐶'], ['[a] ball', '⚽']] } },
      { say: ['אבל יש מילים שמתחילות בצליל', E('a, e, i, o, u'), '. תראו מה קורה כשאני מנסה...'],
        v: { crash: 'apple', em: '🍎', after: ['אאוץ׳! שני צלילים התנגשו! אז מכניסים', E('n'), 'קטנה באמצע, כמו גשר.'] } },
      { say: ['ככה אומרים', E('an'), 'לפני מילה שמתחילה בצליל', E('a, e, i, o, u')], v: { cards: [['[an] egg', '🥚'], ['[an] owl', '🦉'], ['[an] ice cream', '🍦'], ['[an] umbrella', '☂️'], ['[an] orange', '🍊']] } },
      { say: ['הכלל של זיבי: צליל רגיל, שמים', E('a'), '. צליל של', E('a, e, i, o, u'), ', שמים', E('an'), '. קל!'], v: { rule: true } },
    ],
    sort: AAN_WORDS, pick: AAN_PICK },

  { id: 'g-aan2', title: 'בלשי a ו-an', sub: 'an old cat', em: '🕵️', parts: ['meet', 'pick', 'fix'],
    slides: [
      { say: ['זוכרים את', E('an apple'), '? עכשיו נכניס מילה באמצע, ונראה מה קורה!'], v: { swap: ['[an] apple', '[a red] apple'], em: '🍎' } },
      { say: ['עכשיו המילה הצמודה היא', E('red'), ', והיא מתחילה בצליל רגיל. אז', E('a'), '! מסתכלים רק על המילה הצמודה.'] },
      { say: ['וזה עובד גם הפוך!'], v: { swap: ['[a] cat', '[an old] cat'], em: '😺' } },
      { say: ['שימו לב! המילים', E('a, an'), 'הן רק לדבר אחד. כשיש הרבה, הן עפות!'], v: { swap: ['[a cat]', '[cats]'], em: '🐱🐱🐱' } },
      { say: ['טריק של אלופים: מקשיבים לצליל, לא לאות! במילה', E('hour'), 'האות', E('h'), 'שותקת. אז', E('an'), '!'], v: { cards: [['[an] hour', '⏳']] } },
      { say: ['ובמילה', E('unicorn'), 'שומעים', E('you'), 'בהתחלה. אז', E('a'), '!'], v: { cards: [['[a] unicorn', '🦄']] } },
    ],
    pick: [
      { s: 'I see ___ old man.', a: 'an', em: '👴' }, { s: 'She has ___ big egg.', a: 'a', em: '🥚' },
      { s: 'It is ___ orange cat.', a: 'an', em: '🐈' }, { s: 'I like ___ cats.', a: NONE, em: '🐱🐱' },
      { s: 'He has ___ new bike.', a: 'a', em: '🚲' }, { s: 'We see ___ elephants.', a: NONE, em: '🐘🐘' },
      { s: 'I want ___ ice cream.', a: 'an', em: '🍦' }, { s: 'Wait ___ hour, please.', a: 'an', em: '⏳' },
      { s: 'I have ___ yellow umbrella.', a: 'a', em: '☂️' }, { s: 'She is ___ astronaut.', a: 'an', em: '🧑‍🚀' },
      { s: 'I love ___ apples!', a: NONE, em: '🍎🍎' }, { s: 'I ride ___ unicorn.', a: 'a', em: '🦄' },
      { s: 'It is ___ easy game.', a: 'an', em: '🎮' }, { s: 'This is ___ funny alien.', a: 'a', em: '👽' },
    ].map(x => ({ ...x, opts: ['a', 'an', NONE] })),
    fix: [
      { s: 'I have an dog.', bad: 2, to: 'a', em: '🐶' }, { s: 'She eats a apple.', bad: 2, to: 'an', em: '🍎' },
      { s: 'I see a owl.', bad: 2, to: 'an', em: '🦉' }, { s: 'He has an big cat.', bad: 2, to: 'a', em: '🐱' },
      { s: 'It is a old car.', bad: 2, to: 'an', em: '🚗' }, { s: 'We have a cats.', bad: 2, to: '', em: '🐱🐱' },
      { s: 'This is an banana.', bad: 2, to: 'a', em: '🍌' }, { s: 'I want a egg.', bad: 2, to: 'an', em: '🥚' },
      { s: 'She is a astronaut.', bad: 2, to: 'an', em: '🧑‍🚀' }, { s: 'I like an red kite.', bad: 2, to: 'a', em: '🪁' },
    ] },

  { id: 'g-build', title: 'בונים משפט', sub: 'I have a cat.', em: '🚂', parts: ['meet', 'build', 'where'],
    slides: [
      { say: ['משפט באנגלית הוא כמו רכבת. לכל קרון יש מקום קבוע!'], v: { train: ['I', 'have', 'a', 'cat.'], roles: ['who', 'do', 'art', 'thing'], em: '🐱' } },
      { say: ['קודם מי:', E('I'), '. אחר כך מה עושים:', E('have'), '. ובסוף מה:', E('a cat')] },
      { say: ['המילה הקטנה', E('a'), 'או', E('an'), 'יושבת תמיד ממש לפני הדבר.'], v: { train: ['This', 'is', 'an', 'egg.'], roles: ['who', 'do', 'art', 'thing'], em: '🥚' } },
      { say: ['ואם יש מילה שמתארת, כמו גדול, היא נכנסת באמצע!'], v: { train: ['She', 'has', 'a', 'big', 'dog.'], roles: ['who', 'do', 'art', 'desc', 'thing'], em: '🐶' } },
      { say: ['עכשיו תורכם לבנות רכבות!'], mood: 'wave' },
    ],
    build: [
      { s: 'I have a cat.', he: 'יש לי חתול.', em: '🐱', x: 'an' }, { s: 'This is an egg.', he: 'זאת ביצה.', em: '🥚', x: 'a' },
      { s: 'She has a big dog.', he: 'יש לה כלב גדול.', em: '🐶', x: 'an' }, { s: 'I see an elephant.', he: 'אני רואה פיל.', em: '🐘', x: 'a' },
      { s: 'He eats an apple.', he: 'הוא אוכל תפוח.', em: '🍎', x: 'a' }, { s: 'We have a red car.', he: 'יש לנו מכונית אדומה.', em: '🚗', x: 'an' },
      { s: 'It is an old book.', he: 'זה ספר ישן.', em: '📕', x: 'a' }, { s: 'They want a cake.', he: 'הם רוצים עוגה.', em: '🎂', x: 'an' },
      { s: 'You have a funny hat.', he: 'יש לך כובע מצחיק.', em: '🎩', x: 'an' }, { s: 'I am a girl.', he: 'אני ילדה.', em: '👧', x: 'an' },
    ],
    where: [
      { s: 'I see an owl.', em: '🦉' }, { s: 'This is a pen.', em: '🖊️' }, { s: 'She has an umbrella.', em: '☂️' },
      { s: 'I want a big cake.', em: '🎂' }, { s: 'He is an astronaut.', em: '🧑‍🚀' }, { s: 'We have a cat.', em: '🐱' },
      { s: 'It is an orange.', em: '🍊' }, { s: 'I ride a bike.', em: '🚲' },
    ] },

  { id: 'g-pro1', title: 'מי זה? אני, הוא, היא', sub: 'I · you · he · she · it', em: '🙋‍♀️', parts: ['meet', 'who', 'match'],
    slides: [
      { say: ['באנגלית יש מילים קטנות שבאות במקום שמות. בואו נכיר את החבורה!'], mood: 'wave' },
      { say: ['כשמדברים על עצמנו אומרים', E('I'), '. תמיד באות גדולה, כי אני חשוב! 😎'], v: { cast: { em: '🙋‍♀️', en: 'I', he: 'אני', anim: 'wave', ex: 'I am happy.' } } },
      { say: ['כשמדברים אל מישהו אומרים', E('you'), '. כן, כן, אתם!'], v: { cast: { em: '👉', en: 'you', he: 'אתה / את', anim: 'poke', ex: 'You are funny!' } } },
      { say: ['על בן, איש, סבא או מלך אומרים', E('he')], v: { cast: { em: '🤴', en: 'he', he: 'הוא', anim: 'bounce', more: '👦 👴 👨', ex: 'He is a king.' } } },
      { say: ['על בת, אישה, סבתא או מלכה אומרים', E('she')], v: { cast: { em: '👸', en: 'she', he: 'היא', anim: 'spin', more: '👧 👵 👩', ex: 'She is a queen.' } } },
      { say: ['ועל חיה או חפץ אומרים', E('it'), '. אז הפיצה היא', E('she'), '? לא! פיצה היא', E('it'), '! 😂'], v: { cast: { em: '🍕', en: 'it', he: 'זה / זאת', anim: 'wobble', more: '🐶 🚗 ⚽', ex: 'It is a pizza.' } } },
    ],
    who: [
      { em: '👵', he: 'סבתא', a: 'she', s: 'She is a grandma.' }, { em: '👦', he: 'ילד', a: 'he', s: 'He is a boy.' },
      { em: '👧', he: 'ילדה', a: 'she', s: 'She is a girl.' }, { em: '🐶', he: 'כלב', a: 'it', s: 'It is a dog.' },
      { em: '🍕', he: 'פיצה', a: 'it', s: 'It is a pizza.' }, { em: '🤴', he: 'מלך', a: 'he', s: 'He is a king.' },
      { em: '👸', he: 'מלכה', a: 'she', s: 'She is a queen.' }, { em: '🚀', he: 'טיל', a: 'it', s: 'It is a rocket.' },
      { em: '👨', he: 'אבא', a: 'he', s: 'He is my dad.' }, { em: '👩', he: 'אמא', a: 'she', s: 'She is my mom.' },
      { em: '🐸', he: 'צפרדע', a: 'it', s: 'It is a frog.' }, { em: '🙋‍♀️', he: 'אני, על עצמי', a: 'I', s: 'I am happy.' },
      { em: '👉', he: 'מדברים אליך', a: 'you', s: 'You are my friend.' },
    ].map(x => ({ ...x, pool: ['I', 'you', 'he', 'she', 'it'] })),
    match: [['אני', 'I'], ['אתה או את', 'you'], ['הוא', 'he'], ['היא', 'she'], ['זה או זאת', 'it']] },

  { id: 'g-pro2', title: 'אנחנו והם', sub: 'we · they · you', em: '👭', parts: ['meet', 'who', 'swap'],
    slides: [
      { say: ['אני ועוד חברים, ביחד, זה', E('we'), '. אנחנו!'], v: { cast: { em: '🙋‍♀️👫', en: 'we', he: 'אנחנו', anim: 'bounce', ex: 'We are friends.' } } },
      { say: ['אנשים אחרים, או הרבה חיות ודברים, זה', E('they'), '. הם או הן!'], v: { cast: { em: '🐧🐧🐧', en: 'they', he: 'הם / הן', anim: 'waddle', ex: 'They are penguins.' } } },
      { say: ['והמילה', E('you'), '? היא גם לאחד וגם להרבה: אתה, את, אתם ואתן. מילה אחת לכולם!'], v: { cast: { em: '👉👥', en: 'you', he: 'אתה / אתם', anim: 'poke', ex: 'You are the best!' } } },
      { say: ['ועכשיו קסם! במקום שם, שמים מילה קצרה.'], v: { swap: ['[Dana] is happy.', '[She] is happy.'], em: '👧' } },
      { say: ['עוד פעם!'], v: { swap: ['[Tom and I] play.', '[We] play.'], em: '⚽' } },
      { say: ['ועוד אחד!'], v: { swap: ['[The cats] sleep.', '[They] sleep.'], em: '😴' } },
    ],
    who: [
      { em: '🐧🐧🐧', he: 'פינגווינים', a: 'they', s: 'They are penguins.' }, { em: '🙋‍♀️👭', he: 'אני והחברות שלי', a: 'we', s: 'We are friends.' },
      { em: '👦👦', he: 'שני ילדים', a: 'they', s: 'They are boys.' }, { em: '👨‍👩‍👧', he: 'אני והמשפחה שלי', a: 'we', s: 'We are a family.' },
      { em: '🐒🐒', he: 'קופים', a: 'they', s: 'They are monkeys.' }, { em: '🍎🍎🍎', he: 'תפוחים', a: 'they', s: 'They are red.' },
      { em: '👧', he: 'ילדה', a: 'she', s: 'She is a girl.' }, { em: '🐢', he: 'צב', a: 'it', s: 'It is a turtle.' },
      { em: '🙋‍♀️🙋‍♂️', he: 'אני ואחי', a: 'we', s: 'We are happy.' }, { em: '👴', he: 'סבא', a: 'he', s: 'He is a grandpa.' },
    ].map(x => ({ ...x, pool: ['I', 'you', 'he', 'she', 'it', 'we', 'they'] })),
    swap: [
      { s: 'Dana is happy.', name: 'Dana', a: 'She', em: '👧' }, { s: 'Tom is tall.', name: 'Tom', a: 'He', em: '👦' },
      { s: 'The dog is hungry.', name: 'The dog', a: 'It', em: '🐶' }, { s: 'Mom and Dad are home.', name: 'Mom and Dad', a: 'They', em: '👫' },
      { s: 'Noa and I are friends.', name: 'Noa and I', a: 'We', em: '👭' }, { s: 'The ball is red.', name: 'The ball', a: 'It', em: '⚽' },
      { s: 'Grandpa is funny.', name: 'Grandpa', a: 'He', em: '👴' }, { s: 'The girls dance.', name: 'The girls', a: 'They', em: '💃' },
      { s: 'My sister sings.', name: 'My sister', a: 'She', em: '🎤' }, { s: 'Dan and I play.', name: 'Dan and I', a: 'We', em: '🎲' },
    ].map(x => ({ ...x, pool: ['He', 'She', 'It', 'We', 'They'] })) },

  { id: 'g-be', title: 'am, is, are', sub: 'I am · she is · we are', em: '🍌', parts: ['meet', 'pick', 'build'],
    slides: [
      { say: ['כדי לומר אני בננה, צריך מילה קטנה שמחברת. למשל', E('am'), '! 🍌'], v: { cards: [['I [am] a banana!', '🍌']] } },
      { say: ['לכל אחד מהחבורה יש חבר משלו. תקשיבו לשיר!'], v: { chant: [['I', 'am'], ['you', 'are'], ['he', 'is'], ['she', 'is'], ['it', 'is'], ['we', 'are'], ['they', 'are']] } },
      { say: ['הטריק:', E('I'), 'תמיד עם', E('am'), '. הוא, היא וזה עם', E('is'), '. הרבה, או', E('you'), ', עם', E('are')], v: { cards: [['I [am] happy.', '😀'], ['She [is] a cat!', '🐱'], ['They [are] silly!', '🤪']] } },
    ],
    pick: [
      { s: 'I ___ a banana.', a: 'am', em: '🍌' }, { s: 'She ___ a queen.', a: 'is', em: '👸' }, { s: 'They ___ funny.', a: 'are', em: '🤪' },
      { s: 'We ___ friends.', a: 'are', em: '👭' }, { s: 'He ___ hungry.', a: 'is', em: '😋' }, { s: 'It ___ a big dog.', a: 'is', em: '🐶' },
      { s: 'You ___ my best friend.', a: 'are', em: '💛' }, { s: 'I ___ happy.', a: 'am', em: '😀' }, { s: 'The cats ___ sleepy.', a: 'are', em: '😴' },
      { s: 'My mom ___ a doctor.', a: 'is', em: '👩‍⚕️' }, { s: 'Dan and I ___ at school.', a: 'are', em: '🏫' }, { s: 'The pizza ___ hot!', a: 'is', em: '🍕' },
    ].map(x => ({ ...x, opts: ['am', 'is', 'are'] })),
    build: [
      { s: 'I am a funny girl.', he: 'אני ילדה מצחיקה.', em: '🤪', x: 'is' }, { s: 'She is a queen.', he: 'היא מלכה.', em: '👸', x: 'are' },
      { s: 'They are monkeys.', he: 'הם קופים.', em: '🐒', x: 'is' }, { s: 'He is an astronaut.', he: 'הוא אסטרונאוט.', em: '🧑‍🚀', x: 'am' },
      { s: 'We are best friends.', he: 'אנחנו חברות הכי טובות.', em: '👭', x: 'is' }, { s: 'It is an elephant.', he: 'זה פיל.', em: '🐘', x: 'are' },
      { s: 'You are a star!', he: 'את כוכבת!', em: '⭐', x: 'is' }, { s: 'I am a cat.', he: 'אני חתולה.', em: '🐱', x: 'are' },
    ] },

  { id: 'g-my', title: 'של מי זה?', sub: 'my · your · his · her', em: '🎩', parts: ['meet', 'pick', 'build'],
    slides: [
      { say: ['זיבי מצא כובע! של מי הוא? בשביל זה יש מילים מיוחדות.'], v: { cards: [['[my] hat?', '👽🎩']] } },
      { say: ['שלי זה', E('my'), '. שלך זה', E('your')], v: { cards: [['[my] hat', '🙋‍♀️🎩'], ['[your] hat', '👉🎩']] } },
      { say: ['שלו זה', E('his'), '. ושלה זה', E('her'), '!'], v: { cards: [['[his] hat', '👦🎩'], ['[her] hat', '👧🎩']] } },
      { say: ['של שנינו או של כולנו זה', E('our'), '. ושלהם זה', E('their')], v: { cards: [['[our] cat', '👨‍👩‍👧🐱'], ['[their] dog', '👫🐶']] } },
      { say: ['כל אחד מהחבורה, והמילה ששומרת על הדברים שלו:'], v: { chant: [['I', 'my'], ['you', 'your'], ['he', 'his'], ['she', 'her'], ['it', 'its'], ['we', 'our'], ['they', 'their']], sep: ', ' } },
      { say: ['אז של מי הכובע? אוי, זיבי מתבלבל! 😂'], v: { swap: ['This is [his] hat.', 'This is [her] hat!'], em: '👧🎩' } },
    ],
    pick: [
      { s: 'This is ___ bag.', a: 'her', em: '👧🎒', opts: ['his', 'her', 'my'] }, { s: 'This is ___ ball.', a: 'his', em: '👦⚽', opts: ['his', 'her', 'our'] },
      { s: 'I love ___ cat.', a: 'my', em: '🙋‍♀️🐱', opts: ['my', 'your', 'his'] }, { s: 'Is this ___ pen?', a: 'your', em: '👉🖊️', opts: ['my', 'your', 'their'] },
      { s: 'We love ___ house.', a: 'our', em: '👨‍👩‍👧🏠', opts: ['our', 'their', 'her'] }, { s: 'They play with ___ dog.', a: 'their', em: '👫🐶', opts: ['our', 'their', 'his'] },
      { s: 'She has a cat. ___ cat is white.', a: 'Her', em: '👧🐈', opts: ['His', 'Her', 'My'] }, { s: 'Grandpa has a hat. ___ hat is big.', a: 'His', em: '👴🎩', opts: ['His', 'Her', 'Its'] },
      { s: 'The dog wags ___ tail.', a: 'its', em: '🐶', opts: ['its', 'his', 'her'] }, { s: 'Dana and I eat ___ lunch.', a: 'our', em: '🥪', opts: ['our', 'their', 'my'] },
    ],
    build: [
      { s: 'This is my cat.', he: 'זה החתול שלי.', em: '🐱', x: 'your' }, { s: 'Her dress is pink.', he: 'השמלה שלה ורודה.', em: '👗', x: 'His' },
      { s: 'His dog is big.', he: 'הכלב שלו גדול.', em: '🐕', x: 'Her' }, { s: 'Our house is small.', he: 'הבית שלנו קטן.', em: '🏠', x: 'Their' },
      { s: 'Is this your hat?', he: 'זה הכובע שלך?', em: '🎩', x: 'my' }, { s: 'Their car is red.', he: 'המכונית שלהם אדומה.', em: '🚗', x: 'Our' },
    ] },

  { id: 'g-me', title: 'אותי, אותה, אותם', sub: 'me · him · her · us · them', em: '🤗', parts: ['meet', 'pick', 'build'],
    slides: [
      { say: ['כשמשהו קורה אליי, אומרים', E('me'), '. לא', E('I'), '!'], v: { cards: [['Look at [me]!', '🙋‍♀️'], ['Tickle [me]!', '🤭']] } },
      { say: ['כשהחבורה עומדת בסוף המשפט, הם מחליפים בגדים:'], v: { chant: [['I', 'me'], ['you', 'you'], ['he', 'him'], ['she', 'her'], ['it', 'it'], ['we', 'us'], ['they', 'them']], sep: ', ' } },
      { say: ['שימו לב! המילה', E('her'), 'עובדת פעמיים: גם שלה, וגם אותה.'], v: { cards: [['[her] cat', '👧🐱'], ['I like [her].', '👧💛']] } },
      { say: ['והכלב? הוא אוהב את כולם! 🐶'], v: { cards: [['The dog loves [me].', '🐶🙋‍♀️'], ['The dog loves [him].', '🐶👦'], ['The dog loves [them].', '🐶👫']] } },
    ],
    pick: [
      { s: 'Look at ___!', a: 'me', em: '🙋‍♀️', opts: ['I', 'me', 'my'] }, { s: 'I love ___.', a: 'her', em: '👧💛', opts: ['she', 'her', 'he'] },
      { s: 'Call ___!', a: 'him', em: '👦📞', opts: ['he', 'him', 'his'] }, { s: 'The teacher helps ___.', a: 'us', em: '🧑‍🏫', opts: ['we', 'us', 'our'] },
      { s: 'I see ___.', a: 'them', em: '🐒🐒', opts: ['they', 'them', 'their'] }, { s: '___ is my friend.', a: 'She', em: '👧', opts: ['She', 'Her'] },
      { s: '___ like pizza.', a: 'We', em: '🍕', opts: ['We', 'Us'] }, { s: 'Give ___ the ball!', a: 'me', em: '⚽', opts: ['I', 'me'] },
      { s: 'The cat likes ___.', a: 'him', em: '🐱👦', opts: ['he', 'him'] }, { s: 'Mom hugs ___.', a: 'her', em: '🤗', opts: ['she', 'her'] },
      { s: 'Where are ___?', a: 'they', em: '🔍', opts: ['they', 'them'] },
    ],
    build: [
      { s: 'Look at me!', he: 'תסתכלו עליי!', em: '🙋‍♀️', x: 'I' }, { s: 'I love her.', he: 'אני אוהבת אותה.', em: '💛', x: 'she' },
      { s: 'She helps him.', he: 'היא עוזרת לו.', em: '🤝', x: 'he' }, { s: 'The dog loves us.', he: 'הכלב אוהב אותנו.', em: '🐶', x: 'we' },
      { s: 'We see them.', he: 'אנחנו רואים אותם.', em: '👀', x: 'they' }, { s: 'Give me a hug!', he: 'תן לי חיבוק!', em: '🤗', x: 'I' },
    ] },
];

// packs become units with their own games
export const UNITS = [
  ...LESSONS.map(L => ({ ...L, kind: 'grammar' })),
  ...PACKS.map(p => ({ ...p, kind: 'words', sub: p.em, parts: ['cards', 'pop', 'match'] })),
];

export const PART = {
  meet: { em: '🎬', name: 'זיבי מסביר', say: '' },
  sort: { em: '🧺', name: 'ממיינים לסלים', say: 'לאיזה סל זה שייך? לחצו על הסל הנכון.' },
  pick: { em: '✏️', name: 'משלימים את המשפט', say: 'בחרו את המילה החסרה.' },
  fix: { em: '🕵️', name: 'בלשים: מצאו את הטעות', say: 'בלשים! מצאו את המילה הלא נכונה, ולחצו עליה.' },
  build: { em: '🚂', name: 'בונים רכבת', say: 'בנו את הרכבת! לחצו על המילים לפי הסדר.' },
  where: { em: '📍', name: 'איפה זה יושב?', say: 'איפה המילה הקטנה צריכה לשבת? לחצו על המקום.' },
  who: { em: '🎭', name: 'מי זה?', say: 'מי זה? בחרו את המילה הנכונה.' },
  swap: { em: '🪄', name: 'קסם השמות', say: 'החליפו את השם במילה קצרה.' },
  match: { em: '🧠', name: 'משחק זיכרון', say: 'משחק זיכרון! מצאו את הזוגות.' },
  cards: { em: '🃏', name: 'מכירים מילים', say: 'לחצו על כל כרטיס, ותשמעו את המילה.' },
  pop: { em: '🎈', name: 'מפוצצים בלונים', say: 'הקשיבו, ופוצצו את הבלון הנכון!' },
};
export const VOICE = {
  hello: 'שלום! אני זיבי. בואו נשחק באנגלית!',
  turn: 'עכשיו תורכם! לחצו על כל אחד ותשמעו.',
  good: ['יש!', 'מעולה!', 'וואו, אתם גאונים!', 'זיבי רוקד משמחה!', 'נכון מאוד!'],
  again: 'אופס! כמעט. נסו שוב.',
  done: 'סיימתם את השלב. זיבי גאה בכם!',
};

// sentence after the right answer
export const fill = (s, a) => (a === NONE ? s.replace(/ ___ /, ' ').replace(/^___ /, '') : s.replace('___', a));
export const fixed = it => { const w = it.s.split(' '); if (it.to) w[it.bad] = it.to; else w.splice(it.bad, 1); return w.join(' '); };
export const chantText = (row, sep = ' ') => row.join(sep);
export const swapOut = it => it.s.replace(it.name, it.a);

// everything the course says, for tools/make_audio.py: { en: [...], he: [...] }
export function funTexts() {
  const en = new Set(), he = new Set();
  const line = parts => parts.forEach(p => typeof p === 'string' ? (/[א-ת]/.test(p) && he.add(p)) : en.add(p.e));
  [VOICE.hello, VOICE.turn, VOICE.again, VOICE.done, ...VOICE.good, ...Object.values(PART).map(p => p.say)].forEach(t => t && he.add(t));
  for (const L of LESSONS) {
    for (const sl of L.slides) {
      line(sl.say);
      const v = sl.v || {};
      v.cards?.forEach(([t]) => en.add(plain(t)));
      if (v.crash) { line(v.after); en.add('a ' + v.crash); en.add('an ' + v.crash); }
      if (v.train) en.add(v.train.join(' '));
      if (v.cast) { en.add(v.cast.en); en.add(v.cast.ex); }
      if (v.swap) v.swap.forEach(t => en.add(plain(t)));
      v.chant?.forEach(r => en.add(chantText(r, v.sep)));
      if (v.rule) ['a cat', 'a dog', 'a banana', 'an apple', 'an egg', 'an owl'].forEach(t => en.add(t));
    }
    (L.sort || []).forEach(w => en.add(phrase(w)));
    (L.pick || []).forEach(it => en.add(fill(it.s, it.a)));
    (L.fix || []).forEach(it => en.add(fixed(it)));
    (L.build || []).forEach(it => { en.add(it.s); he.add(it.he); });
    (L.where || []).forEach(it => en.add(it.s));
    (L.who || []).forEach(it => { en.add(it.s); he.add(it.he); });
    (L.swap || []).forEach(it => { en.add(it.s); en.add(swapOut(it)); });
    (L.match || []).forEach(([h, e]) => { he.add(h); en.add(e); });
  }
  for (const p of PACKS) p.words.forEach(w => { en.add(phrase(w)); he.add(w.he); });
  return { en: [...en], he: [...he] };
}
