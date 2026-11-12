"""Record every word, sentence and story line in English and Hebrew (run again after adding content).

    python -m pip install edge-tts
    python tools/make_audio.py

Writes audio/en/*.mp3, audio/he/*.mp3 and a manifest.json (text -> file) in each. Only missing clips are made.
Uses Microsoft Edge's free online neural voices: internet is needed while generating, the game then plays the files.
"""
import asyncio, hashlib, json, os, subprocess, sys

import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RATE = {'en': '-12%', 'he': '-5%'}
WORKERS = 10


def texts():
    r = subprocess.run(['node', os.path.join(ROOT, 'tools', 'list_texts.mjs')], capture_output=True, text=True, encoding='utf-8', cwd=ROOT)
    if r.returncode:
        sys.exit(r.stderr)
    return json.loads(r.stdout.strip().splitlines()[-1])


async def main():
    items = texts()
    mans = {}
    for lang in ('en', 'he'):
        os.makedirs(os.path.join(ROOT, 'audio', lang), exist_ok=True)
        p = os.path.join(ROOT, 'audio', lang, 'manifest.json')
        mans[lang] = json.load(open(p, encoding='utf-8')) if os.path.exists(p) else {}
    todo = [it for it in items if it['text'] not in mans[it['lang']] or not os.path.exists(os.path.join(ROOT, 'audio', it['lang'], mans[it['lang']][it['text']]))]
    print(f'{len(todo)} of {len(items)} clips to generate')
    q = asyncio.Queue()
    for it in todo:
        q.put_nowait(it)
    done = 0

    async def worker():
        nonlocal done
        while not q.empty():
            it = q.get_nowait()
            name = hashlib.md5((it['voice'] + '|' + it['text']).encode('utf-8')).hexdigest()[:12] + '.mp3'
            path = os.path.join(ROOT, 'audio', it['lang'], name)
            for attempt in range(4):
                try:
                    await edge_tts.Communicate(it['text'], it['voice'], rate=RATE[it['lang']]).save(path)
                    mans[it['lang']][it['text']] = name
                    break
                except Exception as e:  # network hiccup – retry
                    print('  retry', it['text'][:40], e)
                    await asyncio.sleep(2 + attempt * 2)
            done += 1
            if done % 100 == 0:
                print(f'  {done}/{len(todo)}', flush=True)

    await asyncio.gather(*(worker() for _ in range(WORKERS)))
    # drop clips no longer used
    wanted = {(it['lang'], it['text']) for it in items}
    for lang, m in mans.items():
        for t in [t for t in m if (lang, t) not in wanted]:
            del m[t]
        used = set(m.values())
        for f in os.listdir(os.path.join(ROOT, 'audio', lang)):
            if f.endswith('.mp3') and f not in used:
                os.remove(os.path.join(ROOT, 'audio', lang, f))
        json.dump(m, open(os.path.join(ROOT, 'audio', lang, 'manifest.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0, sort_keys=True)
    print('done:', {k: len(v) for k, v in mans.items()})


asyncio.run(main())
