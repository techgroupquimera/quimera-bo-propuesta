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
const { render, RUTAS_ESTATICAS: RUTAS, META_RUTAS, SITIO, FOOTER } = await import(
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

/* ══════════ Los metadatos de cada página ══════════

   Hasta acá las ocho rutas se servían con el <title> y la <meta description> de
   la plantilla, o sea las de la home. Ocho páginas con el mismo título son una
   sola página para un buscador, y en un resultado cualquiera de las ocho se
   anunciaba como si fuera el home. El copy ya estaba escrito —un META por
   archivo de contenido— y no lo leía nadie; content/meta.js es el que mapea ruta
   a metadato y de ahí sale también la lista de rutas.

   La plantilla se queda con los de la home a propósito: es el HTML que sirve
   `npm run dev`, donde no hay pre-render que reemplace nada, y ahí el home es la
   página que se abre. */
const TITULO = /<title>[\s\S]*?<\/title>/
const DESCRIPCION = /<meta\s+name="description"[\s\S]*?\/>/

/* Los títulos y las descripciones traen « » y · sin problema, pero van adentro
   de un atributo: alcanza con las cuatro que romperían el HTML. */
const esc = (t) =>
  String(t)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/* Canonical, og:url y el sitemap piden URL absoluta — no aceptan «/servicios».
   El dominio sale de SITIO (content/site.js) y está en un solo lugar. */
const absoluta = (ruta) => `${SITIO.origen}${ruta}`

/* Canonical + Open Graph + Twitter, con el copy de la propia página.

   El canonical no es decorativo acá: el mismo HTML se puede servir en
   /servicios, /servicios/ y /servicios/index.html, y sin canonical eso son tres
   URL distintas con el mismo contenido compitiendo entre ellas.

   Twitter lee og:* si no encuentra twitter:*, pero `summary_large_image` sí hace
   falta declararlo: sin esa línea la tarjeta sale con la imagen chica al costado
   en vez de arriba y a lo ancho. */
function seo(ruta) {
  const meta = META_RUTAS[ruta]
  const url = absoluta(ruta)
  const imagen = absoluta(SITIO.imagenOg)

  return [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITIO.nombre)}" />`,
    `<meta property="og:locale" content="${SITIO.locale}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(meta.titulo)}" />`,
    `<meta property="og:description" content="${esc(meta.descripcion)}" />`,
    `<meta property="og:image" content="${imagen}" />`,
    `<meta property="og:image:width" content="${SITIO.imagenOgAncho}" />`,
    `<meta property="og:image:height" content="${SITIO.imagenOgAlto}" />`,
    `<meta property="og:image:alt" content="${esc(SITIO.imagenOgAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.titulo)}" />`,
    `<meta name="twitter:description" content="${esc(meta.descripcion)}" />`,
    `<meta name="twitter:image" content="${imagen}" />`,
  ]
}

/* Datos estructurados, sólo en la home: quién es la empresa y cuál es su sitio.

   Van dos tipos y no más. `Organization` con las redes en `sameAs` es lo que le
   permite a un buscador atar este dominio con las cuentas que ya existen.
   `WebSite` nombra el sitio y lo cuelga de esa organización.

   Lo que NO va todavía es `LocalBusiness`, que sería el que más aporta para una
   empresa de Santa Cruz: pide dirección y teléfono, y los dos siguen pendientes
   de confirmar (están marcados en content/notas.js). Declararlos con datos
   inventados es peor que no declararlos — un dato estructurado que no coincide
   con el sitio se penaliza.

   El `<` escapado a \u003c es la única precaución que necesita un JSON-LD:
   dentro de un <script> un «</» cierra la etiqueta aunque esté en una cadena. */
const LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITIO.origen}/#organizacion`,
      name: SITIO.nombre,
      url: `${SITIO.origen}/`,
      logo: absoluta('/assets/logo-lockup.webp'),
      sameAs: (FOOTER.social ?? []).map((red) => red.href),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITIO.origen}/#sitio`,
      url: `${SITIO.origen}/`,
      name: SITIO.nombre,
      inLanguage: 'es-BO',
      publisher: { '@id': `${SITIO.origen}/#organizacion` },
    },
  ],
}).replace(/</g, String.fromCharCode(92) + 'u003c')

const EXTRA_SEO = {
  '/': [`<script type="application/ld+json">${LD}</script>`],
  /* El 404 no se indexa, y `follow` porque los enlaces del pie sí sirven para
     llegar al resto. Tampoco lleva canonical: no es una página que exista. */
  '/404': ['<meta name="robots" content="noindex, follow" />'],
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
  '/proyectos/tecnologia': 'src/pages/ProyectosTecnologia.jsx',
  '/proyectos/marketing': 'src/pages/ProyectosMarketing.jsx',
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
      ...(META_RUTAS[ruta] ? seo(ruta) : []),
      ...(EXTRA_SEO[ruta] ?? []),
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
    /* El título y la descripción de ESTA página, sobre los de la plantilla. El
       404 no tiene entrada en la tabla y se titula acá: es la única página del
       sitio que no es contenido. */
    const meta = META_RUTAS[ruta] ?? {
      titulo: `Página no encontrada · ${SITIO.nombre}`,
      descripcion: 'La dirección que abriste no existe en este sitio.',
    }
    pagina = pagina
      .replace(TITULO, `<title>${esc(meta.titulo)}</title>`)
      .replace(DESCRIPCION, `<meta name="description" content="${esc(meta.descripcion)}" />`)

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

/* ══════════ sitemap.xml y robots.txt ══════════
   Se generan acá y no se versionan en public/ por una razón: los dos tienen que
   nombrar el dominio, y el dominio vive en content/site.js. Escritos a mano
   serían dos lugares más donde queda el host viejo cuando cambie.

   El sitemap va sin `lastmod`, `changefreq` ni `priority`. Los dos últimos los
   ignora Google desde hace años, y el primero sería la fecha del build: cambiaría
   en cada despliegue sin que el contenido cambie, que es exactamente la señal
   que no hay que dar. Ocho URL en el orden de la navegación.

   El 404 no entra en el sitemap, obvio, y tampoco las variantes con barra final:
   la canonical de cada página ya dice cuál es la buena. */
await writeFile(
  join(DIST, 'sitemap.xml'),
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...RUTAS.map((ruta) => `  <url><loc>${absoluta(ruta)}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n'),
)

await writeFile(
  join(DIST, 'robots.txt'),
  ['User-agent: *', 'Allow: /', '', `Sitemap: ${absoluta('/sitemap.xml')}`, ''].join('\n'),
)

console.log(`  sitemap.xml    → ${RUTAS.length} URL`)
console.log(`  robots.txt     → ${SITIO.origen}`)

console.log(`\n  ${RUTAS.length} rutas + 404 escritas en dist/`)
