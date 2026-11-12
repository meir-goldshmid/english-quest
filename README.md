# English Quest 🏃‍♂️⭐

An adventure game that teaches English to Hebrew-speaking kids (about age 8–11) who are starting from almost zero. The goal is talking, reading and writing. Plain HTML/JS with no build step. It runs in any modern browser and installs to the home screen as an app.

**Play:** https://meir-goldshmid.github.io/english-quest/
**Printable worksheets:** https://meir-goldshmid.github.io/english-quest/print.html

## How it plays
There are 24 worlds, from *ABC & Sounds* up to *Real Conversations*. They hold 546 words and 305 sentences, and each world has its own story. Every world has 6 stages:

| Stage | What he does | Skill |
|---|---|---|
| 📖 Learn words | Picture cards. Each card says the word in English, then Hebrew, then English again. 🐢 plays it slower and 🎤 lets him say it. | listening, speaking |
| 🏃 Run 1 | Side-scrolling platformer. Hitting a **?** block opens a word challenge (listen → picture, picture → word, Hebrew → English, read → Hebrew). An **ABC gate** opens only after he jumps to collect the word's letters in the right order. | listening, reading, spelling |
| 💬 Learn sentences | Sentence cards with audio. | reading, listening |
| 🗣️ Run 2 | Sentence blocks. Some ask what a sentence means, some what he heard, and some have him build the sentence from word tiles. A **🎤 speaking door** opens when he says the word or sentence out loud. | speaking, grammar |
| 📜 Story | A short dialog with voiced characters, then 3 questions. Then he plays one of the characters and says their lines. | reading, conversation |
| 👑 Boss | Each right answer (spelling, typing, building sentences, speaking) throws a star at the boss. | writing |

- **Daily review:** words he got wrong come back through spaced repetition, as a bonus level.
- **Rewards:** coins, a daily goal, a streak, and a shop with clothes and hats for the hero.
- **Parent area:** progress, weakest words, minutes played per day, settings and backup. To enter, answer a multiplication question.

## Audio
`tools/make_audio.py` records every word, sentence and story line in English and Hebrew with **edge-tts**. Those are Microsoft's free neural voices: Jenny for English, Ana and Andrew for the story characters, and Hila for Hebrew. The game plays the files and falls back to the browser's own voice for anything that has no clip.

```
python -m pip install edge-tts
python tools/make_audio.py      # only new or changed texts are recorded
```

The playback order is set in Parent area → Settings: English–Hebrew–English (default), Hebrew–English–Hebrew, or English–Hebrew.

## Speaking
Speech recognition uses the browser's Web Speech API (Chrome, Edge, Android, Safari on iOS 14.5 and later). It needs internet and permission to use the microphone. Matching is lenient for kids: one-letter slips are accepted, and about 70% of a sentence's words is enough. Where recognition isn't available, an "אמרתי!" (I said it) button appears instead.

## Run locally
```
python -m http.server 8790
```
Open http://localhost:8790. The microphone only works on localhost or https.

## Files
| File | What |
|---|---|
| `js/content.js` | The curriculum: 24 units of words, sentences and stories. Add to it here, then re-run `make_audio.py`. |
| `js/game.js`, `js/levels.js` | Platformer engine and level generator. All art is drawn in code. |
| `js/challenges.js` | All challenge types |
| `js/screens.js` | Learn cards, story and boss |
| `js/main.js` | Map, stages, review, shop, parent area |
| `js/store.js` | Progress and spaced repetition, kept in localStorage as one JSON blob |
| `print.html`, `js/print.js` | A4 worksheets per world: picture dictionary with copy lines, matching, missing letters, scrambled words, word search, sentence building, story reading, plus an optional answer key |

## Privacy
This repo is public, so it holds no family details. The player's name is typed in on first launch and stays in that browser only. You can also open `<site>/#name=<name>` once to set it. Progress lives in the browser too, so use Parent area → Backup to move it to another device.

## Verified / not verified
- Verified in desktop Chrome: map, unlocking, learn cards, Run 1 (blocks, spelling gate, finish), Run 2 (sentence blocks, speaking door opens the challenge), story, boss, results, and the worksheets fit A4 in all 24 worlds.
- Not verified: speech recognition with a real child's voice, touch controls on a real phone or tablet, and Safari on iOS.
