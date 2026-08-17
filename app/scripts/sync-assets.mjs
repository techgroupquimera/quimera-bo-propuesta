/* Copia ../assets → public/assets antes de `dev` y de `build`.
   Los assets tienen UNA sola fuente: la carpeta del sitio original. Duplicarlos
   a mano en el repo significa que un logo actualizado allá no llega acá y nadie
   se entera hasta que lo ve en pantalla. */
import { cpSync, existsSync, rmSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const origen = join(raiz, '..', 'assets')
const destino = join(raiz, 'public', 'assets')

if (!existsSync(origen)) {
  console.error(`No encuentro ${origen} — ¿se movió la carpeta del sitio original?`)
  process.exit(1)
}

/* quimera.css y quimera.js se quedan afuera: el sistema de diseño vive en
   src/index.css y el comportamiento en los componentes. */
const EXCLUIDOS = new Set(['quimera.css', 'quimera.js'])

rmSync(destino, { recursive: true, force: true })
cpSync(origen, destino, {
  recursive: true,
  filter: (src) => !EXCLUIDOS.has(basename(src)),
})

console.log('assets sincronizados → public/assets')
