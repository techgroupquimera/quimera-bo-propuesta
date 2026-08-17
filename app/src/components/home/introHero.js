/* La entrada del hero: la secuencia que corre cuando la página aparece.

   Vive acá y no adentro del componente para que Hero.jsx siga siendo marcado y
   se pueda leer el orden de la coreografía de un vistazo.

   ── Qué cambió, y por qué ──
   Esto era una línea de tiempo de anime.js. La coreografía es idéntica —los
   ocho tiempos de abajo son los mismos números—, pero ahora la ejecuta CSS.

   El motivo es medible. La línea de tiempo escondía las ocho piezas con
   `utils.set(todo, { opacity: 0 })` y las mostraba al correr. Eso quiere decir
   que el hero no existía visualmente hasta que el bundle bajaba, parseaba e
   hidrataba: el titular es el elemento LCP de la home, así que la métrica no se
   contaba al pintar la página sino uno o dos segundos más tarde. Era JavaScript
   decidiendo cuándo empieza a existir el contenido, y en un sitio
   pre-renderizado eso es justo lo que no hay que hacer — el hero ya viene
   escrito en el HTML de la respuesta.

   Además se lleva anime.js del camino crítico: era la única cosa que lo usaba.

   ── Lo que NO cambió ──
   El argumento original de por qué esto no era un `Reveal` más sigue en pie:
   son ocho piezas con tiempos que se pisan, y escrito como ocho
   `transition-delay` sueltos hay que recalcular a mano cada vez que se mueve
   una. Por eso la tabla sigue siendo una tabla y sigue estando en un solo
   archivo; lo único que cambió es que ahora sale al marcado como custom
   properties en vez de alimentar un `createTimeline`.

   ── El orden ──
   El panel primero, porque es el ancla visual y lo primero que el ojo busca.
   Después la columna de texto de arriba hacia abajo, como se lee. Las cifras y
   el play cierran, ya adentro del panel que entró al principio.

   ── Nada de destellos, y nada de hero vacío ──
   El estado inicial lo sostiene `animation-fill-mode: both` (en index.css), no
   una clase: la pieza no se ve un fotograma antes de esconderse para entrar.
   Y como es CSS puro, con el JS caído el hero entra igual — antes, si la línea
   de tiempo no llegaba a correr después de haber escondido todo, el hero
   quedaba en blanco. */

/* El orden es el de la coreografía, y el número es en qué milisegundo entra
   cada pieza. Están juntos a propósito: mover una es mover un número. */
const PIEZAS = {
  panel: { en: 0, y: 0, escala: 1.04, dura: 1150 },
  badge: { en: 160, y: 14 },
  titulo: { en: 260, y: 28, dura: 1000 },
  bajada: { en: 480, y: 18 },
  cta: { en: 600, y: 14 },
  nota: { en: 680, y: 10 },
  cifra: { en: 760, y: 16, escalonado: 70 },
  play: { en: 980, y: 12 },
}

const DURACION = 900

/* Devuelve el `style` de una pieza. `indice` es la posición dentro del grupo,
   para el escalonado de las cifras — la única pieza que se repite.

   Las claves son custom properties y no propiedades de CSS: las lee el
   @keyframes `intro-hero`. Van al atributo `style` del elemento porque son
   valores por instancia; una clase por combinación de tiempo y desplazamiento
   serían ocho clases que existen una sola vez cada una. */
export function intro(marca, indice = 0) {
  const pieza = PIEZAS[marca]
  if (!pieza) return undefined

  return {
    '--intro-en': `${pieza.en + indice * (pieza.escalonado ?? 0)}ms`,
    '--intro-dura': `${pieza.dura ?? DURACION}ms`,
    ...(pieza.y ? { '--intro-y': `${pieza.y}px` } : null),
    ...(pieza.escala ? { '--intro-escala': pieza.escala } : null),
  }
}
