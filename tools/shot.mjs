/* Captura una página con Chrome headless vía CDP.
   uso: node shot.mjs <url> <salida.png> [ancho] [alto] [selector|full]
   - hace scroll real de arriba a abajo para disparar los IntersectionObserver
     (los .rv no se revelan si nunca entran al viewport)
   - luego captura toda la página (captureBeyondViewport) o el recorte de un selector */
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url, out, W = 1920, H = 1080, target = 'full'] = process.argv.slice(2);
const PORT = 9333 + Math.floor(process.uptime() * 7) % 200;
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const prof = mkdtempSync(join(tmpdir(), 'shot-'));

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--mute-audio',
  '--no-first-run', '--no-default-browser-check', '--disable-extensions',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${prof}`,
  `--window-size=${W},${H}`, 'about:blank',
], { stdio: 'ignore' });

const sleep = ms => new Promise(r => setTimeout(r, ms));

let target_ws;
for (let i = 0; i < 60; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    const page = list.find(t => t.type === 'page');
    if (page) { target_ws = page.webSocketDebuggerUrl; break; }
  } catch {}
  await sleep(250);
}
if (!target_ws) { chrome.kill(); throw new Error('Chrome no levantó el puerto de debug'); }

const ws = new WebSocket(target_ws);
await new Promise(r => ws.addEventListener('open', r, { once: true }));

let id = 0;
const pending = new Map();
ws.addEventListener('message', e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result ?? {}); pending.delete(m.id); }
});
const cmd = (method, params = {}) => new Promise(res => {
  const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params }));
});

await cmd('Page.enable');
await cmd('Runtime.enable');
await cmd('Emulation.setDeviceMetricsOverride', { width: +W, height: +H, deviceScaleFactor: 1, mobile: false });
await cmd('Page.navigate', { url });
await sleep(2500);

// scroll real para disparar los reveals, y vuelta al tope
await cmd('Runtime.evaluate', {
  awaitPromise: true,
  expression: `(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    const h = document.body.scrollHeight, step = innerHeight * 0.8;
    for (let y = 0; y < h; y += step) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
    scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 400));
  })()`,
});
await sleep(1400);   // que terminen las transiciones de 1s

let clip;
if (target === 'full') {
  const { cssContentSize } = await cmd('Page.getLayoutMetrics');
  clip = { x: 0, y: 0, width: cssContentSize.width, height: cssContentSize.height, scale: 1 };
} else {
  const { result } = await cmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => { const r = document.querySelector(${JSON.stringify(target)}).getBoundingClientRect();
      return { x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height, scale: 1 }; })()`,
  });
  clip = result.value;
}

const { data } = await cmd('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip });
writeFileSync(out, Buffer.from(data, 'base64'));
console.log(`${out}  ${Math.round(clip.width)}x${Math.round(clip.height)}`);

ws.close();
chrome.kill();
process.exit(0);
