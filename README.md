# English Quest 🏃‍♂️⭐

An adventure game that teaches English to Hebrew-speaking kids and teens: talking, reading, writing and school grammar. Plain HTML/JS with no build step. It runs in any modern browser and installs to the home screen as an app.

**Play:** https://meir-goldshmid.github.io/english-quest/
**Printable worksheets:** https://meir-goldshmid.github.io/english-quest/print.html

## Tracks (each player picks one; several players can share a device)
| Track | Ages / grades | Level | Worlds |
|---|---|---|---|
| 🧒 Kids | 8–10 · grades 3–5 | Pre-A1 → A1 | 48 worlds in two seasons: 1,045 words and 632 sentences, each world with a story and a reading (phonics) rule |
| 🧑‍🎓 Middle school | 11–13 · grades 6–8 | A1 → A2 | 16 grammar worlds: plurals and articles, pronouns, present and past tenses, quantifiers, comparatives, future, modals, present perfect, gerunds, relative clauses, conditionals, passive, reported speech |
| 🎓 High school & Bagrut | 14–16 · grades 9–11 | A2 → B1/B2 | 16 worlds: narrative and perfect tenses, passive, reported speech, conditionals 0–3, wish, modal perfect, future perfect, connectors, word formation, Bagrut-style unseen texts, writing |

The in-game **🏫 מה לומדים בכיתה** page shows each Israeli school stage, its level (CEFR), the grammar taught there, and the worlds that practise it. Sources: the Ministry of Education [English Curriculum 2020](https://meyda.education.gov.il/files/Mazkirut_Pedagogit/English/Curriculum2020.pdf) for levels and grades (Tables 2 and 4), and the [Revised English Curriculum 2018](https://meyda.education.gov.il/files/Mazkirut_Pedagogit/English/curriculum2018.pdf) for the grammar lists per level.

## Stages in each world
**Kids:** 📖 words → 🏃 run (word blocks, ABC spelling gates) → 💬 sentences → 🗣️ speaking run (🎤 doors, read-aloud doors) → 📜 story (questions, then role play or reading the story aloud) → 👑 boss.

**Middle / High school:** 📘 grammar rule with a quick check → 📖 vocabulary → ⚡ Grammar Rush → 📰 unseen reading (tap a word to translate it) → 🎙️ Speak Up → 📝 test (score out of 100; 55 to pass) → 👑 Boss Rush.

### Challenge mode for 12+
A cartoon platformer can feel childish to older kids, so the middle-school and high-school tracks are built differently:
- **Rush rounds:** each question is timed, and correct answers in a row build a combo. Points per answer = 100 × combo (x1 to x4) + a speed bonus.
- **End of a round:** a medal by accuracy (Bronze, then Silver at 70%, Gold at 85%, Diamond at 95%) and stars (50% to pass).
- **Boss Rush:** a missed question comes back until the boss's health reaches zero. It mixes in grammar from earlier worlds.
- **Look:** a dark neon theme, the Rubik font and an initials avatar. There is no outfit shop.
- **Ranks:** lifetime points earn Bronze, Silver (1,500), Gold (5,000), Platinum (12,000) and Diamond (25,000).
- **Arcade:** the platformer is still there as an optional "🕹️ ארקייד (בונוס)" button on each world. It isn't needed to progress.

**Family leaderboard (🏆):** weekly points for every player on the device, reset each Sunday.

## The game
- **Platformer:** coyote time and jump buffering, moving platforms and lifts, 4 enemy kinds (walker, hopper, flyer, and spiky, which can't be stomped), and power-ups from right answers: 👟 jump shoes, 🧲 coin magnet, 🛡️ shield, 🌟 star.
- **Boss fights** are platformer arenas. Hit a ❓ block and answer correctly, and your star hits the boss. Dodge the balls it throws.
- **Around the game:** an illustrated map with a trail, 24 badges, a shop for outfits, a daily goal, a streak, and spaced-repetition daily review.
- **Parent area** (a multiplication question to enter): progress, weakest items, minutes per day, track, audio order and backup.

## Audio
`tools/make_audio.py` records every word, sentence, story line, grammar example and reading text in English and Hebrew with **edge-tts**, Microsoft's free neural voices. It records only new texts. Run it twice, because the service sometimes drops a clip.
```
python -m pip install edge-tts
python tools/make_audio.py
```

## Speaking
The 🎤 parts use the browser's Web Speech API (Chrome, Edge, Android, Safari on iOS 14.5 and later). They need internet and permission to use the microphone. Matching is lenient for kids: one-letter slips are accepted, and about 70% of a sentence's words is enough. Where recognition isn't available, an "אמרתי!" (I said it) button appears instead.

## Run locally
`python -m http.server 8790`, then open http://localhost:8790. The microphone only works on localhost or https.

## Files
| File | What |
|---|---|
| `js/content.js`, `js/content2a.js`, `js/content2b.js` | Kids course: Season 1, and Season 2 in two parts |
| `js/track_middle_*.js`, `js/track_teen_*.js` | Grammar tracks: rule, words, sentences, gaps, transforms and reading for each unit |
| `js/curriculum.js` | Combines the courses into tracks |
| `js/school.js` | The school-grade comparison |
| `js/game.js`, `js/levels.js` | Platformer engine, level generator and boss arena. All art is drawn in code. |
| `js/challenges.js` | All challenge types, including gap, transform and read-aloud |
| `js/rush.js` | Challenge mode: timer, combo, points, medals, Boss Rush |
| `js/screens.js` | Learn cards, story, grammar rule, reading and test |
| `js/main.js` | Map, stages, players, review, shop, badges, parent area |
| `js/store.js` | Players and progress in localStorage, one JSON blob per player |
| `print.html`, `js/print.js` | A4 worksheets for every track, with an optional answer key |

## Privacy
This repo is public, so it holds no family details. Players type their names on first launch, and the names stay in that browser. You can also open `<site>/#name=<name>&track=kids|middle|teen` once to create a player. Progress lives in the browser, so use Parent area → Backup to move it to another device.

## Verified / not verified
- Verified in desktop Chrome (see the latest commit): map, players and tracks, all stage types, boss arena, results, worksheets.
- Not verified: speech recognition with a real child's voice, touch controls on a real phone or tablet, and Safari on iOS.
- Grammar content was written for this project and checked automatically for structure (one blank per gap, valid answers, no repeated words). A teacher has not reviewed it.
