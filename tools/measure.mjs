/* Mide el borde izquierdo de los elementos clave de cada página, para comprobar
   que todos comparten la misma columna. uso: node measure.mjs <ancho> */
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const W = +(process.argv[2] || 1920), H = 1080;
const PAGES = ['', 'servicios.html', 'tecnologia.html', 'proyectos.html', 'nosotros.html', 'contacto.html'];
const SEL = ['.brand img', '.hero-copy h1', '.hero-strip b', '.phero .kicker', '.phero h1', '.crumb',
  '.wrap .kicker', '.wrap .t-sec', '.foot-logo img', '.foot-bar p', '.bio-copy'];

const prof = mkdtempSync(join(tmpdir(), 'meas-'));
const PORT = 9555;
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--disable-extensions',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${prof}`, `--window-size=${W},${H}`, 'about:blank',
], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));

let url;
for (let i = 0; i < 60 && !url; i++) {
  try {
    const l = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    url = l.find(t => t.type === 'page')?.webSocketDebuggerUrl;
  } catch {}
  if (!url) await sleep(250);
}
const ws = new WebSocket(url);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const pend = new Map();
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (pend.has(m.id)) { pend.get(m.id)(m.result ?? {}); pend.delete(m.id); } });
const cmd = (method, params = {}) => new Promise(res => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

await cmd('Page.enable'); await cmd('Runtime.enable');
await cmd('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });

console.log(`viewport ${W}px — borde izquierdo (px)`);
for (const p of PAGES) {
  await cmd('Page.navigate', { url: `http://localhost:8099/${p}` });
  await sleep(1400);
  const { result } = await cmd('Runtime.evaluate', {
    returnByValue: true,
    expression: `(${JSON.stringify(SEL)}).map(s => { const el = document.querySelector(s);
      return el ? [s, Math.round(el.getBoundingClientRect().left)] : null; }).filter(Boolean)`,
  });
  console.log(`\n· ${p || 'index.html'}`);
  for (const [s, x] of result.value) console.log(`   ${String(x).padStart(5)}  ${s}`);
}
ws.close(); chrome.kill(); process.exit(0);
