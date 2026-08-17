/* Escribe el HTML de cada ruta.

   ── Qué problema resuelve ──
   El sitio se servía como un SPA puro: el servidor devolvía un index.html con
   un <div id="root"> vacío y un <script>. Todo lo demás —el hero, el titular,
   el fotograma— aparecía recién después de bajar el bundle, parsearlo y
   ejecutarlo. Para el navegador de quien entra, y para quien mide, la página
   no existe durante ese rato: el LCP se cuenta desde que el contenido se
   pinta, no desde que el servidor contestó.

   Con esto, cada ruta se guarda como un .html completo. El servidor devuelve
   la página ya escrita, el navegador la pinta enseguida, y el JavaScript llega
   después a hidratarla y hacerla interactiva. Es el mismo código y el mismo
   árbol de componentes: lo único que cambia es CUÁNDO se ejecuta.

   ── Lo que hay que saber para no romperlo ──
   Cualquier componente que toque `window`, `document` o `matchMedia` durante el
   render (no dentro de un efecto) va a explotar acá, porque en el build no hay
   navegador. Hoy no pasa: los tres hooks que consultan el entorno
   (useInView, useSinMovimiento, useDesplegable) lo hacen en efectos.

   Y el primer render del cliente tiene que dar EXACTAMENTE el mismo HTML que
   éste, o React descarta lo pre-renderizado y vuelve a pintar todo del lado del
   cliente — que es perder justo lo que se vino a ganar.

   ── El resultado ──
   dist/index.html, dist/servicios/index.html, dist/tecnologia/index.html…
   Cualquier hosting estático sirve eso sin configuración especial. El 404 sale
   del comodín de las rutas. */
import Beasties from 'beasties'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const AQUI = dirname(fileURLToPath(import.meta.url))
const APP = resolve(AQUI, '..')
const DIST = join(APP, 'dist')

/* El bundle SSR trae las dos cosas: la función que renderiza y la lista de
   rutas, que sale de src/rutas.jsx. Se importa de acá y no del fuente porque
   este script corre en Node pelado, que no parsea JSX — así la lista sigue
   estando en un solo lugar y agregar una ruta es tocar un archivo.

   `/404` no está en la lista: no es una ruta del sitio, la resuelve el comodín.
   Se emite igual, más abajo, para los hostings que piden un 404.html. */
/* `pathToFileURL` y no la ruta pelada: en Windows una ruta absoluta empieza con
   «c:», y el cargador de módulos de Node la lee como el esquema de URL «c:» y
   se niega. Con file:// funciona igual en los dos sistemas. */
const { render, RUTAS_ESTATICAS: RUTAS } = await import(
  pathToFileURL(join(APP, 'dist-ssr', 'entry-server.js')).href
)

/* Precargas propias de una ruta, además de las que emite React.

   El poster del hero es el elemento LCP de la home. React no lo pre-carga
   —viene de `poster` en un <video preload="none">, y esa combinación no le
   dispara la heurística—, así que sin esto se pide con prioridad Media y detrás
   de todo el JavaScript. Con el preload sale junto con el CSS y la fuente.

   Va sólo en «/» a propósito: la plantilla la comparten las siete páginas, y
   precargar en /contacto una imagen que esa página no usa son 28 KB tirados. */
const EXTRA = {
  '/': [
    '<link rel="preload" as="image" href="/assets/hero-poster.webp" fetchpriority="high" />',
  ],
}

const plantilla = await readFile(join(DIST, 'index.html'), 'utf8')
const manifiesto = JSON.parse(await readFile(join(DIST, '.vite', 'manifest.json'), 'utf8'))

/* Qué módulo pinta cada ruta. Sirve para una sola cosa: buscar en el manifiesto
   el chunk de esa página y precargarlo desde su HTML. Sin esto el navegador se
   entera de que existe recién cuando React llega a la ruta —un viaje después
   del bundle— y la página se queda más tiempo del necesario con el HTML del
   servidor a la vista, inerte.

   La home no está: viaja adentro del bundle principal a propósito (ver
   src/rutas.jsx). */
const MODULO = {
  '/servicios': 'src/pages/Servicios.jsx',
  '/tecnologia': 'src/pages/Tecnologia.jsx',
  '/proyectos': 'src/pages/Proyectos.jsx',
  '/nosotros': 'src/pages/Nosotros.jsx',
  '/contacto': 'src/pages/Contacto.jsx',
}

/* El chunk de la página y todo lo que ese chunk importa a su vez. Sin los
   `imports` la precarga queda a medias: se adelanta el archivo de la página
   pero no los componentes compartidos que necesita, y el segundo viaje vuelve
   a aparecer. */
function chunksDe(modulo, vistos = new Set()) {
  const entrada = manifiesto[modulo]
  if (!entrada || vistos.has(modulo)) return []
  vistos.add(modulo)

  return [entrada.file, ...(entrada.imports ?? []).flatMap((d) => chunksDe(d, vistos))]
}

/* El <div id="root"> vacío de la plantilla, con o sin espacios adentro. */
const RAIZ_VACIA = /<div id="root">\s*<\/div>/

/* ── El JavaScript deja de competirle al primer pintado ──

   El problema, medido: el escáner de precarga encuentra el
   <script type="module"> y los <link rel="modulepreload"> mientras el HTML
   todavía está bajando, y los pide con prioridad ALTA. En una conexión de
   teléfono son ~77 KB de JavaScript peleándole el caño a los 21 KB de HTML que
   hacen falta para pintar. Bajarlos a prioridad baja llevó el FCP de 1,9 s a
   1,07 s.

   Son DOS cosas, y con una sola no alcanza. Bajarle la prioridad al <script>
   deja igual al chunk de React, que son 62 de los 77 KB: ése lo piden los
   <link rel="modulepreload">, que siguen en alta. Por eso se reescriben los dos.

   ── Lo que se probó y NO funcionó ──
   El paso siguiente parecía obvio: no pedir el bundle hasta después de pintar
   (con el primer gesto, o cuando el navegador queda libre). Y el LCP mejoró —de
   2,4 s a 1,75— porque esos 77 KB salían de la ventana que la métrica mira.

   Pero el total empeoró de 98 a 85. La hidratación no desaparece por moverla:
   se corre entera a DESPUÉS del primer pintado, que es justo la ventana donde
   se mide el bloqueo del hilo principal (TBT). El TBT pasó de 60 ms a 400 y
   pico, y pesa 30% de la nota contra el 25% del LCP. Se perdía más de lo que se
   ganaba, y además la página quedaba varios cientos de milisegundos sin
   responder a un click.

   O sea: el JavaScript conviene que baje temprano y con poca prioridad, no
   tarde. Queda anotado para que no se vuelva a intentar.

   `fetchpriority` es de Chrome —el que corre Lighthouse y PageSpeed—; los demás
   navegadores lo ignoran y se quedan con el comportamiento de siempre. No hay
   nada que se rompa si no está. */
const SCRIPT = /<script type="module"([^>]*)><\/script>/
const MODULEPRELOAD = /<link rel="modulepreload"([^>]*)>/g

/* ── La hoja de estilos, partida por página ──
   El CSS bloquea el pintado: mientras no llegue, el navegador no dibuja nada.
   Como archivo aparte eso es un viaje de ida y vuelta más después del HTML, y
   en un teléfono con 150 ms de latencia ese viaje se ve.

   Pero meter la hoja entera adentro de cada página tampoco sirve: son 85 KB de
   utilidades de Tailwind para SEIS páginas, y la home usa menos de la mitad.
   El resto viaja igual, se descomprime igual y —lo que más cuesta— el navegador
   lo parsea igual antes de poder pintar.

   `beasties` resuelve las dos cosas: cruza el HTML ya renderizado de ESTA
   página contra la hoja completa, mete en un <style> sólo las reglas que esta
   página usa, y deja el archivo completo cargándose sin bloquear. La primera
   pantalla se pinta con lo poco que necesita; el resto llega después y está
   ahí para cuando se navegue a otra ruta sin recargar.

   `preload: 'swap'` es lo que convierte el <link rel=stylesheet> en una carga
   que no bloquea. `pruneSource: false` deja el .css original intacto: es el que
   piden las otras rutas al navegar. */
const beasties = new Beasties({
  path: DIST,
  publicPath: '/',
  preload: 'swap',
  pruneSource: false,
  /* Las fuentes se manejan a mano en index.html: acá sólo molestaría. */
  inlineFonts: false,
  preloadFonts: false,
  logLevel: 'silent',
})

/* React emite un <link rel="preload"> por cada imagen que pinta y que no sea
   `loading="lazy"`. Está bien que lo haga —son las de arriba de todo, las que
   conviene pedir cuanto antes— pero como acá se renderiza el árbol de la app y
   no el documento entero, esos <link> salen adentro del <div id="root">, o sea
   al final del HTML. Un preload que se descubre último no adelanta nada.

   Se los mueve al <head>, que es donde React los pondría si manejara el
   documento. No es un cambio de posición cualquiera: React trata a los <link>
   como «hoistables» y al hidratar los busca por sus atributos en todo el
   documento, no por dónde caen en el árbol. Por eso moverlos no rompe la
   hidratación — es justamente el lugar donde los espera. */
const PRELOADS = /<link rel="preload"[^>]*\/>/g

await Promise.all(
  [...RUTAS, '/404'].map(async (ruta) => {
    const html = await render(ruta)

    /* El chunk de esta ruta, además de los que Vite ya precarga desde la
       plantilla. En prioridad baja, como todo el resto del JavaScript. */
    const nuevos = chunksDe(MODULO[ruta] ?? '').filter(
      (f) => !plantilla.includes(`href="/${f}"`),
    )

    const alHead = [
      ...(EXTRA[ruta] ?? []),
      ...(html.match(PRELOADS) ?? []),
      ...nuevos.map(
        (f) => `<link rel="modulepreload" fetchpriority="low" crossorigin href="/${f}" />`,
      ),
    ]
      .map((tag) => `    ${tag}`)
      .join('\n')

    const cuerpo = html.replace(PRELOADS, '')

    let pagina = plantilla.replace(RAIZ_VACIA, `<div id="root">${cuerpo}</div>`)
    if (pagina === plantilla) {
      throw new Error(`No encontré <div id="root"></div> en dist/index.html`)
    }
    if (alHead) pagina = pagina.replace('</head>', `${alHead}\n  </head>`)

    if (!SCRIPT.test(pagina)) throw new Error('No encontré el <script type="module"> de Vite')
    pagina = pagina
      .replace(MODULEPRELOAD, '<link rel="modulepreload" fetchpriority="low"$1>')
      .replace(SCRIPT, '<script type="module" fetchpriority="low"$1></script>')

    /* Al final, con el HTML de la página ya armado: beasties necesita ver el
       marcado real para saber qué reglas hacen falta. */
    pagina = await beasties.process(pagina)

    /* La home es dist/index.html; el resto, dist/<ruta>/index.html — así
       /servicios funciona sin configurar reescrituras en el hosting. */
    const destino =
      ruta === '/' ? join(DIST, 'index.html') : join(DIST, ruta.slice(1), 'index.html')

    await mkdir(dirname(destino), { recursive: true })
    await writeFile(destino, pagina)

    console.log(`  ${ruta.padEnd(14)} → ${(pagina.length / 1024).toFixed(1)} KB`)
  }),
)

/* Netlify y varios hostings estáticos buscan un 404.html en la raíz. El de
   dist/404/index.html sirve para /404; éste es el mismo, donde lo buscan. */
await writeFile(
  join(DIST, '404.html'),
  await readFile(join(DIST, '404', 'index.html'), 'utf8'),
)

console.log(`\n  ${RUTAS.length} rutas + 404 escritas en dist/`)
