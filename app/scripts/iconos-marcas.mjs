/* Extrae de simple-icons los logotipos de las tecnologías del stack y los deja
   en src/components/ui/marcas-svg.js.

   Se corre a mano —como `bajar-fuentes.mjs` y `optimizar-hero.mjs`— y el
   resultado se versiona:

     npm i simple-icons --no-save && node scripts/iconos-marcas.mjs

   `--no-save` es a propósito: simple-icons son 3.453 iconos y el sitio usa 16.
   Como dependencia del build entraría entero al repo y al lockfile para que el
   bundler después descarte el 99,5%. Acá se usa una sola vez, se copian los 16
   trazados que hacen falta y el paquete no queda.

   Los trazados son CC0 (simple-icons). Las marcas son de sus dueños: se usan
   para nombrar la herramienta que se usa, que es exactamente para lo que están.

   ── Las tres que no están ──
   OpenAI no tiene icono en simple-icons —lo sacaron a pedido de la marca— y
   Llama tampoco tiene uno propio. `Servidor propio` no es una marca: es la
   infraestructura de la casa. Esas tres van con un glifo de lucide, que es la
   librería que ya usa el sitio, y se resuelven en IconoMarca.jsx. */
import { writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as si from 'simple-icons'

const AQUI = dirname(fileURLToPath(import.meta.url))
const DESTINO = resolve(AQUI, '../src/components/ui/marcas-svg.js')

/* La clave es el nombre EXACTO de la ficha en content/tecnologia.js: el
   componente busca por ahí, así que si cambia el copy hay que cambiarlo acá.
   El valor es el export de simple-icons. */
const MARCAS = {
  Claude: 'siClaude',
  Gemini: 'siGooglegemini',
  /* Llama es de Meta y no tiene marca propia en el catálogo; la de Meta es la
     que le corresponde. */
  Llama: 'siMeta',
  n8n: 'siN8n',
  LangGraph: 'siLanggraph',
  'Next.js': 'siNextdotjs',
  React: 'siReact',
  Python: 'siPython',
  Supabase: 'siSupabase',
  PostgreSQL: 'siPostgresql',
  Vercel: 'siVercel',
  Cloudflare: 'siCloudflare',
  Docker: 'siDocker',
  'Odoo · ERP': 'siOdoo',
  Stripe: 'siStripe',
  'WhatsApp API': 'siWhatsapp',
}

const lineas = []
for (const [ficha, clave] of Object.entries(MARCAS)) {
  const icono = si[clave]
  if (!icono) throw new Error(`simple-icons no tiene ${clave} (para «${ficha}»)`)
  lineas.push(`  ${JSON.stringify(ficha)}: ${JSON.stringify(icono.path)},`)
}

const salida = `/* GENERADO por scripts/iconos-marcas.mjs — no se edita a mano.

   Los trazados de los logotipos del stack, sacados de simple-icons (CC0). Cada
   uno es UN path sobre un viewBox de 24×24 y sin color propio: se pintan con
   \`currentColor\`, así la ficha decide el color y el hover no necesita una
   segunda copia del icono.

   Van acá, en el repo, y no como dependencia: son 16 trazados contra un paquete
   de 3.453 iconos. Para agregar o cambiar uno se toca el mapa del script y se
   vuelve a correr. */
export const MARCAS_SVG = {
${lineas.join('\n')}
}
`

await writeFile(DESTINO, salida)
console.log(`  ${Object.keys(MARCAS).length} trazados → src/components/ui/marcas-svg.js`)
console.log(`  ${(salida.length / 1024).toFixed(1)} KB`)
