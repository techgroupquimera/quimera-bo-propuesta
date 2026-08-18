/* Baja de Google Fonts los woff2 que usa el sitio y los deja en public/fonts/.
   Se corre a mano, una vez, y el resultado se versiona: en el build no hay red.

   Sólo el subconjunto `latin`. El castellano entero (á é í ó ú ñ ü ¿ ¡ ·) cae
   dentro de U+0000-00FF, así que latin-ext, griego, cirílico y vietnamita eran
   cuatro archivos que el navegador nunca iba a pedir pero que igual había que
   declarar. La flecha «→» (U+2192) no está en ningún subconjunto de estas dos
   familias: la resuelve la fuente del sistema, y ya lo hacía antes.

   JetBrains Mono no se baja. La usaban dos `code` sueltos —el 404 y las citas
   textuales de <Rich>—; una familia entera por eso no se paga. Ahora esos dos
   van con la mono del sistema. */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const AQUI = dirname(fileURLToPath(import.meta.url))
const DESTINO = resolve(AQUI, '../public/fonts')

/* Con este UA, Google devuelve woff2. Con el de Node devuelve ttf. */
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

/* Manrope va en su versión VARIABLE, con el rango 400..600 —los tres pesos del
   brandboard— en un solo archivo.

   No es una optimización de catálogo: los tres están sobre el pliegue de la
   home. El titular va en 400, el botón «Pedir diagnóstico» y «Conversemos» en
   500 (lo pone .cta), y el badge, la nota de plazas y las etiquetas de las
   cifras en 600. Como tres estáticas son tres pedidos de 24 KB que hay que
   precargar los tres; como variable es uno solo de ~30 y el navegador interpola.

   El rango se pide acotado a 400..600 a propósito: `wght@200..800` trae el eje
   entero y pesa bastante más por ejes que el sitio no usa. */
/* De Instrument Serif se baja SOLO la itálica (`ital@1`), que es la única que
   usa el sitio: el énfasis de <Rich> —el «a trabajar» del hero y los que hay
   repartidos en los titulares de las seis páginas— y nada más. La redonda de
   esa familia no aparece en ninguna parte, y son otros 20 KB. */
const FAMILIAS =
  'family=Bebas+Neue&family=Instrument+Serif:ital@1&family=Manrope:wght@400..600&display=swap'

/* nombre de archivo por familia — el que después declara el @font-face */
const NOMBRE = {
  'Bebas Neue': 'bebas-neue',
  'Instrument Serif': 'instrument-serif',
  Manrope: 'manrope',
}

const css = await fetch(`https://fonts.googleapis.com/css2?${FAMILIAS}`, {
  headers: { 'User-Agent': UA },
}).then((r) => r.text())

/* Cada bloque @font-face trae familia, peso, unicode-range y url. Nos quedamos
   con los que cubren U+0000-00FF, que es el bloque `latin`. */
const bloques = css.split('@font-face').slice(1)
const bajados = []

for (const bloque of bloques) {
  const rango = bloque.match(/unicode-range:\s*([^;]+);/)?.[1] ?? ''
  if (!rango.includes('U+0000-00FF')) continue

  const familia = bloque.match(/font-family:\s*'([^']+)'/)?.[1]
  /* En una familia variable `font-weight` es un rango («400 600»), no un
     número: el sufijo del archivo sale de ahí tal cual, con el espacio hecho
     guión — manrope-400-600.woff2. */
  const peso = bloque.match(/font-weight:\s*([\d\s]+);/)?.[1]?.trim()
  const url = bloque.match(/url\((https:[^)]+\.woff2)\)/)?.[1]
  if (!familia || !peso || !url || !NOMBRE[familia]) continue

  /* El estilo entra en el nombre porque de Instrument Serif se baja la
     itálica y de las otras dos la redonda: sin esto no habría forma de saber,
     al declarar el @font-face, cuál de los dos cortes trae cada archivo. */
  const estilo = bloque.match(/font-style:\s*(\w+);/)?.[1]
  const archivo = `${NOMBRE[familia]}-${peso.replace(/\s+/g, '-')}${estilo === 'italic' ? '-italic' : ''}.woff2`
  const bytes = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()))

  await mkdir(DESTINO, { recursive: true })
  await writeFile(resolve(DESTINO, archivo), bytes)
  bajados.push([archivo, bytes.length])
}

if (!bajados.length) throw new Error('No se bajó ninguna fuente — ¿cambió el formato del CSS?')

for (const [archivo, bytes] of bajados.sort()) {
  console.log(`  ${archivo.padEnd(22)} ${(bytes / 1024).toFixed(1)} KB`)
}
console.log(`\n  ${bajados.length} archivos en public/fonts/`)
