# app · Group Quimera en React + Tailwind

Migración del sitio a React 19 + Vite + Tailwind v4. **El contenido es el mismo
del HTML original**; lo que va a cambiar es el diseño.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ — compila, pre-renderiza las 6 rutas y arma el CSS crítico
```

Hay dos scripts más que **no** corren en el build, a propósito: generan archivos
que se versionan, y el build no debe depender ni de la red ni de ffmpeg.

```bash
npm run fuentes    # baja los .woff2 de Google a public/fonts/  (necesita red)
npm run imagenes   # genera las derivadas del hero en ../assets  (necesita ffmpeg)
```

## Dónde está cada cosa

| Ruta | Qué es |
|---|---|
| `src/content/` | **Todo el copy.** `site.js` (nav, marcas, footer), `home.js`, `notas.js` |
| `src/index.css` | El sistema de diseño: `@theme` con color, tipografía, medidas y movimiento |
| `src/components/home/` | Una sección del home por archivo |
| `src/components/ui/` | Primitivas: `Button`, `Kicker`, `Reveal`, `Reel`, `Checks`, `Cita`, `Rich`, y los bloques que comparten páginas: `Cierre`, `Marcas`, `Bio`, `Autoridad`, `HeroIndice` |
| `src/components/layout/` | `TopBar`, `Footer`, `Layout` |
| `src/components/overlays/` | Modal de la disertación, visor 9:16 y panel de revisión |
| `public/assets/` | Copia de los assets del sitio original |

## Regla de trabajo

**El texto no se escribe en los componentes.** Vive en `src/content/` y se lee
desde ahí. Rediseñar una sección es reescribir su JSX sin tocar el contenido.

Los textos usan un mini-lenguaje que resuelve `<Rich>`:

| Marca | Resultado |
|---|---|
| `\n` | salto de línea |
| `*x*` | énfasis: Manrope Semibold en lima |
| `_x_` | lima plano |
| `**x**` | negrita |
| `` `x` `` | código monoespaciado (solo en el panel de notas) |

Para que una frase corta no se parta al final de una línea va `\u00A0` (espacio
duro) — escrito como escape, no como carácter: un U+00A0 literal es invisible al
editar y se borra sin querer. Está en el titular del hero, para que «a trabajar»
no deje la «a» colgando sola.

Los huérfanos de una sola palabra los resuelve el CSS, no el contenido:
`text-wrap: balance` en `h1`–`h4` y `text-wrap: pretty` en `p`/`q`/`blockquote`/`li`,
en `@layer base`. Sin eso hay que corregir a mano cada vez que cambia un cuerpo
o el ancho de una columna.

## Tipografía

Dos familias, las del brandboard:

- **Bebas Neue** — cifras, etiquetas de proceso y el calado FERRANTE.
- **Manrope** — todo lo demás, en **Regular 400 / Medium 500 / Semibold 600**.

No hay una tercera familia. El énfasis en los titulares se marca con **peso y
color** (Semibold + lima), no con una itálica: Instrument Serif estaba en el
sitio y no en el board. Las citas de los reels se sostienen con la barra lima,
las comillas angulares del propio texto y el salto de tamaño.

Tampoco hay ExtraLight 200 ni Light 300 — el board no los lista y el 200 a
53 px se veía frágil. Si aparece un `font-light` en el código, es un descuido.

## Diseño

Los tokens salen como utilidades de Tailwind — no hay que escribir `var(--…)`:

```
text-lima  bg-ink  border-hair              color
text-sec  text-body-l  text-bajada          tipografía (traen line-height y tracking)
px-g       max-w-maxw  px-column            la columna del sitio
ease-soft  animate-mq  animate-dot          movimiento
```

`text-sec` es el titular de **todas** las secciones: cambiarlo las mueve juntas.
La única excepción es «Presencia» de `/nosotros`, donde el titular va más chico
a propósito: ahí el elemento grande es el nombre de la plaza, y con los dos al
mismo cuerpo el mapa quedaba de fondo de dos titulares peleándose.
`text-bajada` es el pie del titular — más chico que `text-body-l`, que se reserva
para los bloques que sí son de lectura corrida.

El aire vertical de las secciones es `--spacing-aire` (utilidad `py-aire`) y es
una perilla **por página**: se pisa en un contenedor y todas las `Section` de
adentro cambian juntas. El home corre con el valor por defecto; `/servicios` lo
baja en `Servicios.jsx` porque sus secciones son capítulos de un mismo argumento
y se leen seguidas. `PanelVerde` usa la mitad —trae su propio padding adentro—
así que sigue el ritmo de su página sin configurarlo aparte.

`Marcas`, `Bio` y `Cierre` llevan el suyo porque no usan `Section` (fondos a
sangre). `Marcas` mantiene su propio clamp incluso en las páginas de ritmo
apretado: es una tira, no un capítulo, y si siguiera a `--spacing-aire` en el
home crecería un 40%.

`--container-maxw` (1560px) sigue siendo la única perilla de ancho: mueve logo,
hero, secciones y footer juntos.

## Estado

- **Home (variante B)**: migrado completo.
- **Hero**: rediseñado según wireframe. El video dejó de ir a sangre y es un
  panel contenido en la mitad derecha; a la izquierda van badge, titular,
  bajada, CTA y la nota de plazas. La bajada está pegada al CTA, no al titular:
  el aire queda arriba de ella. El panel cierra con un pie propio — las cuatro
  cifras y el play de la disertación.
- **Servicios**: migrado completo. El cierre usa el mismo componente que el del
  home (`ui/Cierre.jsx`) con su propio copy.
Los dos selectores que rotan solos —el stack de `/tecnologia` y el mapa de
`/nosotros`— comparten [`hooks/useRotacion.js`](src/hooks/useRotacion.js). Ahí
viven las cuatro condiciones que frenan la rotación: alguien eligió (se apaga
para siempre), el mouse encima o el foco de teclado adentro, la sección todavía
fuera de pantalla, y `prefers-reduced-motion`. Son fáciles de olvidar al
copiarlas, y sin la tercera la rotación arranca antes de que nadie la vea.

- **Tecnología**: migrado completo. **«Sin ataduras» no se migra** — el cliente
  pidió sacarla; sigue en `tecnologia.html` por si hay que recuperarla.
  El hero es el de `/servicios` más las dos
  columnas de fichas en bucle (`ui/MarquesinaVertical.jsx`), una hacia arriba y
  otra hacia abajo. El stack es un selector: los seis grupos a la izquierda y el
  elegido abriéndose en abanico a la derecha, rotando solo hasta que alguien
  elige.
- **Proyectos**: hero, «Sitios en producción», «Agentes de IA», el caso
  destacado, «Marcas construidas», «Producción audiovisual», «Campañas» y
  «Bajo acuerdo».
  Sitios, Marcas y Campañas comparten el patrón de grilla desplegable
  (`hooks/useDesplegable.js` + `ui/VerMas.jsx`). Los tramos de
  la barra de índice del hero son enlaces sólo si su sección ya existe: la lista
  `MIGRADAS` de `pages/Proyectos.jsx` es la única perilla. Cierra con la tira de
  marcas y el mismo bloque de cierre que las demás páginas. **«El caso Shiba» va
  entre sitios y agentes en el original y es lo único que falta.**
  En Campañas las veintiséis piezas vienen en tres proporciones. Las fichas son
  cajas 4:5 con la imagen en `contain` —una pieza de campaña recortada pierde el
  remate—, y los cuatro banners de ~2.7:1, que en una caja 4:5 quedarían nadando
  en vacío, ocupan dos columnas (tres cuando la grilla baja a tres, o sea todo
  el ancho) y van al final de la lista. `grid-flow-row-dense` mete el primero en
  el hueco de la última fila de fichas sueltas y `self-center` evita que en esa
  fila mixta el navegador lo estire al alto de sus vecinas.
- **Nosotros**: migrado completo. La mitad de abajo son piezas que ya existían:
  Johnny (`ui/Bio.jsx`), la placa de CAMEBOL (`ui/Autoridad.jsx`), la tira de
  marcas y el cierre son los del home con el copy de esta página — el original
  lo dice con todas las letras: «mismo bloque que el inicio». Lo propio de acá
  son las unidades, el mapa de presencia, las cifras y el compromiso.
  `Bio` recibe además un `pie` con las credenciales, que en la columna angosta
  del tríptico no entran sin estirarlo; `Autoridad` trae las fichas de datos
  sólo si la página se las pasa. Las credenciales van en **cuatro tarjetas** y
  no en la lista de tildes del resto del sitio: son cuatro reconocimientos
  sueltos, no los puntos de un mismo argumento. Cuatro columnas y no dos porque
  los textos van de 16 a 170 caracteres y en dos la fila del corto quedaba con
  la mitad vacía; el marcador de dato pendiente vive dentro de la tarjeta de
  EIAN —donde el original lo pone— y de paso la llena. Las cinco marcas van en paneles cuadrados
  pegados; en reposo cada uno muestra sólo su logo y al pasar el mouse el logo se
  funde a la salida y entran etiqueta, nombre, descripción y dirección. Cada
  panel **es** el enlace (por eso la dirección va como `<span>`), y el reveal
  escucha `group-focus-visible` para el teclado, que no tiene hover.
  **Abajo de 1000px no hay reveal**: los paneles se
  apilan y el texto queda siempre a la vista — esconder contenido detrás de un
  gesto que en pantalla táctil no existe es contenido que no se puede leer. Por
  eso todas las clases del reveal van prefijadas con `min-[1000px]:`, y el
  estado por defecto es el visible.

  Cuidado al tocar el copy de esa sección: **el texto revelado va absoluto y lo
  absoluto no empuja la caja**, así que si no entra en el cuadrado se corta sin
  avisar. Por eso el cuadrado arranca en 1400px y abajo de eso el panel vuelve
  al alto fijo. Medido, el peor caso deja 19px de aire a 1400 y 57 a 1920; si
  alguna descripción crece hay que volver a medirlo. Es también la razón por la
  que el marcador de dato pendiente de Group Quimera —que en el original va
  inline— vive al pie de la fila: esas dos líneas de más eran justo las que no
  entraban, y un marcador clickeable adentro de un `<a>` es HTML inválido.

  «Presencia» sigue la referencia que pasó el cliente: un mapa grande al centro
  que **pasa solo de una plaza a la siguiente**, el nombre y la descripción
  abajo a la izquierda, el selector a la derecha y las guías verticales de
  fondo. **No hay ningún archivo de mapa en el proyecto**: lo único cartográfico
  son los cuatro contornos administrativos de OpenStreetMap que el original
  traía embebidos, uno por plaza. Están en
  [`content/contornos.js`](src/content/contornos.js), extraídos del HTML con un
  script. La atribución al pie es obligatoria, no cortesía.

  El alto de la sección **no puede cambiar** al pasar de plaza o salta cada
  cinco segundos y arrastra todo lo que tiene debajo. El mapa lo resuelve con un
  alto propio; el texto, apilando las cuatro plazas en la misma celda con tres
  invisibles. Con un solo espaciador —el de la descripción más larga— la sección
  seguía saltando 54px: lo que crece en Silicon Valley no es la descripción sino
  el nombre, que a ese cuerpo se parte en dos líneas.
  El hero es el mismo componente que el de `/proyectos`
  —`ui/HeroIndice.jsx`, la variante que cierra con la barra de índice— con el
  fondo propio de la página. Ojo con dos cosas: la barra de índice **no está en
  el original**, vino con el diseño que se pidió repetir; y la foto de la
  audiencia va a `.22` y no al `.34` del original, porque acá el hero ocupa el
  alto de la pantalla y a `.34` la cara del primer plano le gana al titular.
- **Contacto**: hero y el formulario con los canales. El formulario es el del
  original sin tocar —mismos campos, mismo orden, mismas opciones del selector y
  el mismo comportamiento: valida y avisa, no manda nada—; lo único que cambia es
  la tipografía. Las etiquetas ya eran 0.57rem con 0.16em, que es exactamente el
  `text-tag` del sistema, así que ahí sólo cambia de dónde sale el valor; el
  cambio real es el peso de los campos, que en el original van en Light 300 —un
  peso que el board no lista— y acá en 400. Los cuatro canales de arriba **no
  son enlaces**: en el original apuntan a `#` y los cuatro están marcados como
  pendientes, y un enlace que no lleva a ningún lado es peor que una fila de
  texto. Cuando lleguen los destinos, se agrega `href`. El hero es el mismo
  componente que el de `/proyectos` y
  `/nosotros` pero **sin barra de índice** — la página tiene dos secciones y un
  índice de dos tramos no es un índice; `HeroIndice` la omite cuando el
  contenido no trae `indice`. Ojo con el alto: el hero ocupa la pantalla y deja
  el formulario entero abajo del pliegue. El original le había puesto a ESTE
  hero un alto corto por esa razón; acá va como los demás porque es lo que se
  pidió, y volver atrás es darle un alto propio a esta página.

### Los dos heros

| Componente | Quién lo usa | Cómo cierra |
|---|---|---|
| `ui/HeroIndice.jsx` | `/proyectos`, `/nosotros`, `/contacto` | barra con el índice de la página — opcional |
| `servicios/Hero.jsx`, `tecnologia/Hero.jsx` | una cada uno | fila de apoyo + CTA |

Los cuatro comparten el armado: alto de pantalla, texto apoyado abajo, la luz
verde naciendo arriba a la derecha. El fondo lo pone quien lo usa —en el
original cada página trae el suyo y es lo único que las diferencia de lejos— y
va por `style`, no por clase: una clase armada con `${}` no la genera nunca el
escáner de Tailwind.

### Perillas del hero

| Dónde | Qué mueve |
|---|---|
| `MARGEN` en `Hero.jsx` | separación del panel contra el borde de pantalla (y de sus hijos contra el panel) |
| `w-[clamp(320px,50vw,960px)]` | ancho del panel |
| `max-w-[min(40%,620px)]` | ancho de la columna de texto |
| primer `linear-gradient` del velo | cuánto se oscurece el video (hoy `.26`) |

## Íconos

`lucide-react`. Los de las tarjetas se mapean en
[`components/ui/iconos.jsx`](src/components/ui/iconos.jsx) (`personas`,
`documento`, `chat`, `grafico`), así reemplazar uno es una línea. El resto se
importa donde se usa: `ArrowRight` en el CTA, `Play` en los reels y el pie del
hero, `Check` en las listas, `TriangleAlert` en el panel de revisión.

**Los glifos no van en el contenido.** Las etiquetas ya no traen `▶`, `⚠` ni
`→` — los pone el componente. Import por ícono, no `import * as`: el bundle solo
crece ~1 kB gzip por los siete que se usan.

## Movimiento

Casi todo el sitio se mueve con CSS: los tokens `--animate-*` del `@theme`, el
`ease-soft`, y `ui/Reveal.jsx`, que entra con un fade y un desplazamiento
disparados por IntersectionObserver. Para una sección que aparece al hacer
scroll eso alcanza y es más barato que cargar una librería.

**anime.js (v4) entra sólo donde CSS se queda corto.** Hoy es un lugar: la
entrada del hero del home ([`home/introHero.js`](src/components/home/introHero.js)),
que son ocho piezas con tiempos que se pisan entre sí —el panel arranca antes
que el texto, las cifras entran mientras el CTA se acomoda—. Escrito en CSS eso
son ocho `transition-delay` sueltos que hay que recalcular a mano cada vez que
se mueve una pieza; como línea de tiempo es una lista ordenada donde mover algo
es cambiar un número.

Ojo con la versión: **la v4 no tiene export por defecto**. Es
`import { animate, createTimeline, stagger, utils } from 'animejs'`; el
`import anime from 'animejs'` de los tutoriales de v3 no compila.

Tres reglas para lo que se agregue:

1. **`prefers-reduced-motion` no lo respeta anime.js solo.** Hay que consultarlo
   con `useSinMovimiento` y no animar. En el hero, si está activo el efecto ni
   se llama, así que el marcado queda como está: visible.
2. **El estado inicial se pone en JS, nunca en una clase CSS.** Si el «escondido»
   viviera en el CSS, alguien con movimiento reducido —o con el JS caído— vería
   el hero vacío para siempre.
3. **`useLayoutEffect`, no `useEffect`.** Corre antes de que el navegador pinte,
   que es la única forma de esconder las piezas sin que se vean un fotograma.

La limpieza va con `createScope({ root })` y su `revert()`, que devuelve los
estilos en línea al desmontar. Probado con StrictMode, que en desarrollo monta
el efecto dos veces: el hero termina visible igual.

anime.js suma **~18 kB gzip** al bundle y no entra hasta que algo lo importa.

## La barra y el menú

Abajo de **1050px** la pill de navegación se esconde y toma su lugar el botón
del menú (`layout/MenuMovil.jsx`). Antes no la reemplazaba nada: desde un
teléfono el sitio tenía dos destinos —el logo al inicio y el CTA a contacto— y
las cuatro páginas del medio sólo se alcanzaban desde el footer, al final de
páginas de 12.000px.

El panel arranca **debajo** de la barra en vez de tapar la pantalla entera, así
el logo y el botón de cerrar siguen a la vista y no hace falta dibujar una
segunda cabecera adentro. Va **antes y afuera** de la barra en el JSX: adentro
heredaría su contexto de apilamiento y la taparía por más que su `z` fuera
menor.

Cierra con Escape, con el fondo, y solo al cambiar de ruta — sin eso, al tocar
«Servicios» el menú queda abierto sobre la página nueva. Mientras está abierto
bloquea el scroll del cuerpo, o el dedo mueve la página de atrás. Cerrado va con
`inert`, que lo saca del tab y del lector de pantalla sin desmontarlo, así la
transición de salida se ve.

El CTA de la barra desaparece en dos casos y en los dos sigue estando adentro
del menú: abajo de 420px, donde con el botón al lado no le queda ancho y
empujaba al logo, y mientras el menú está abierto, para no mostrar
«Conversemos» dos veces en la misma pantalla.

## Botones

Dos formas, no dos colores de la misma:

- **`variante="primario"`** — el CTA de la marca: etiqueta + chip con la flecha
  que al pasar el mouse crece hasta ocupar el botón entero. Chrome en
  `index.css` (`.cta` / `.cta-icono`), adaptado del botón de
  [Uiverse](https://uiverse.io) de adamgiebl. El violeta del original se mapeó
  al lima; el texto va en ink porque sobre lima el blanco no se lee, y el chip
  es ink con la flecha en lima, así al abrirse el botón se da vuelta al negro
  del sitio. Todo el botón se mide en `em`: **`font-size` es la única perilla de
  tamaño** — bajarlo achica alto, paddings, chip y flecha juntos.
- **`variante="ghost"`** — todo lo demás. **La misma forma**: mismo alto
  (`2.6em`), mismo radio (`.85em`), mismo cuerpo (15px/500) y el mismo
  interletrado. Lo único que cambia es el peso visual — hairline sobre el fondo
  en vez de lima con chip. Al pasar el mouse vira todo a lima y la flecha se
  corre.

**La flecha la pone el componente, nunca el contenido.** Ninguna etiqueta lleva
`→` ni `←`. El primario siempre trae la suya en el chip; el ghost la pide con
`flecha` — hay botones que llevan otro ícono adelante (`▶ La disertación`) o van
hacia atrás (`← Volver al inicio`).

Cambiar `.cta` cambia los tres CTA del sitio: hero, «Conversemos» de la barra y
el cierre.

## La tira de marcas

Los logos se escalan por **área**, no por caja. Limitarlos con un `max-height` y
un `max-width` comunes deja a los lockups largos ocupando el triple de mancha
que a las insignias compactas — misma altura, tres veces el peso — y por eso
unos se leían grandes y otros chiquitos.

`factorOptico()` ([`lib/optico.js`](src/lib/optico.js)) calcula el alto de cada uno como
`√(2·alto/ancho)` sobre `--mq-alto`, la única perilla de tamaño de la tira. El
resultado a 1920: altos entre 21 y 70 px, y el área más grande es **1,17×** la
más chica (antes 2,00×). Que un lockup largo mida un tercio del alto de una
insignia cuadrada es correcto: lo que el ojo pesa es la mancha.

Al tocar tamaños o el gap hay que comprobar que **una** copia del set siga
siendo más ancha que la pantalla, o al llegar al -50 % la marquesina abre un
hueco. Medido a 1920 / 1440 / 900 / 430.

La misma cuenta la usan los paneles de unidades de `/nosotros`, que es el mismo
problema con cinco logos: van de 0,99:1 (Sapien9) a 10,1:1 (Tech Agents) y a
alto uniforme el lockup largo ocuparía cinco veces la mancha del compacto. Con
`factorOptico` las cinco áreas quedan entre 4834 y 5005 px² a 1920 — el mayor es
1,035× el menor.

Ahí la base del alto (`--base-logo`) **crece en móvil**, al revés de lo que uno
espera: la de escritorio escala con `vw`, pero abajo de 1000px el panel deja de
ser un quinto del ancho y pasa a ocupar la pantalla entera, así que ahí hay más
lugar y no menos. Con la base de escritorio el lockup de Tech Agents quedaba en
15px de alto dentro de un panel de 388px. Medido a 430: las áreas pasaron de
~2300 a ~8300 px², y el desbalance sigue en 1,03×.

## Carga

El sitio se sirve **pre-renderizado**: `npm run build` compila el cliente,
compila una segunda vez para Node (`dist-ssr/`) y con eso escribe el HTML de
cada ruta. Lo que llega al navegador es la página entera ya escrita; React llega
después y la hidrata.

`scripts/prerender.mjs` es donde vive todo eso y está comentado paso por paso.
Lo que hay que saber para no romperlo:

- **Nada puede tocar `window` durante el render.** En el build no hay navegador.
  Dentro de un efecto sí, que es donde ya lo hacen los hooks.
- **El primer render del cliente tiene que dar el mismo HTML.** Si difiere,
  React tira lo pre-renderizado y vuelve a pintar todo del lado del cliente, que
  es perder justo lo que se vino a ganar. Por eso `useInView` y
  `useSinMovimiento` arrancan siempre en el mismo estado y consultan el entorno
  recién en el efecto.
- **Hidratar va después de pintar** (`src/main.jsx`): dos `requestAnimationFrame`
  encadenados. Sin eso el navegador no llega a pintar antes de que React ocupe el
  hilo, y el primer pintado se iba de 0,2 s a 2,3 s.

### Las decisiones que se midieron

| Qué | Por qué |
|---|---|
| Fuentes propias, en `public/fonts` | Google Fonts encadena cuatro viajes (DNS+TLS ×2, un CSS que bloquea) antes de la primera letra |
| Manrope **variable** 400..600 | Un archivo de 24 KB en vez de tres. Los tres pesos están sobre el pliegue |
| La entrada del hero en CSS, no en anime.js | Escondía el titular hasta que el bundle hidrataba: el LCP se contaba desde ahí. Además se llevó anime.js del camino crítico |
| `<video preload="none">` con `poster` | `autoPlay` ignora `preload` y baja 1,2 MB durante la carga. Montar el video más tarde es peor: pinta un elemento grande tarde y el LCP pasa a contarse desde ahí |
| El loop arranca con el primer gesto | 1,2 MB de fondo decorativo no se le cobran a quien todavía no mostró que se queda. El poster es un fotograma del propio clip |
| `content-visibility` en las secciones | El home son diez: sin esto hay que maquetar la página entera antes de pintar la primera pantalla. **Ojo: arrastra `contain: paint`** — no va en secciones que pintan fuera de su caja, ver `<Cierre>` |
| Los 29 logos se piden por sección | `loading="lazy"` decide imagen por imagen y rompía la marquesina (ver «La tira de marcas») |
| CSS crítico por página (`beasties`) | Los 85 KB de utilidades son de las seis páginas juntas; el home usa menos de la mitad |
| El JavaScript en `fetchpriority="low"` | El escáner de precarga lo pedía en alta y le comía el ancho de banda al HTML. FCP: 1,9 s → 1,07 s |

**Lo que se probó y no funcionó** (está anotado en `scripts/prerender.mjs` para
que no se vuelva a intentar): no pedir el bundle hasta después de pintar. Mejora
el LCP, pero corre la hidratación entera a la ventana donde se mide el bloqueo
del hilo principal. El TBT pasó de 60 ms a 400 y pico, y la nota bajó de 98 a 85.

### Medir

```bash
npm run build
npx serve app/dist            # o cualquier estático que sirva <ruta>/index.html
npx lighthouse http://localhost:3000 --preset=desktop
```

Para que dé parecido a PageSpeed hace falta `--throttling-method=simulate` (el
que usa PageSpeed) y servir los archivos **ya comprimidos**: comprimir con
brotli en cada pedido agrega decenas de milisegundos al TTFB que en producción
no existen.

Última medición, con throttling simulado:

| Ruta | Móvil | Escritorio |
|---|---|---|
| `/` | 97-98 | 100 |
| `/servicios` · `/tecnologia` · `/contacto` | 98-99 | 100 |
| `/proyectos` | 97-98 | 100 |
| `/nosotros` | 96-97 | 100 |

Los rangos no son pereza: el TBT depende de cuán ocupada esté la máquina que
mide. En una con otras cosas corriendo aparecen valores de 3.000 ms y la nota se
va a 50, y no significa nada. **Conviene medir tres veces y quedarse con la
mediana**, y desconfiar de cualquier corrida con TBT por encima de ~300 ms.

### Publicar

En la raíz del repo hay un `vercel.json` y un `netlify.toml` listos: los dos
compilan desde `app/` y publican `app/dist`. La propuesta original en HTML de la
raíz no entra en el despliegue.

**No hay reescritura tipo SPA, y es a propósito.** Cada ruta se emite como su
propio archivo (`dist/servicios/index.html`), así que un `/* → /index.html`
serviría el HTML del home para `/servicios` y se perdería el pre-render. El 404
sale de `dist/404.html`.

En cualquier otro hosting hacen falta tres cosas:

1. **Brotli o gzip** sobre el HTML, el CSS y el JS. En nginx, `brotli_static on`
   con los `.br` generados al desplegar — no `brotli on`, que comprime en cada
   pedido y eso se paga en el TTFB.
2. **`try_files $uri $uri/index.html /404.html;`** — el `$uri/index.html` es lo
   que hace que `/servicios` encuentre su archivo.
3. **Cache**: un año e `immutable` para `/assets/*.js`, `/assets/*.css` y
   `/fonts/*`, que llevan hash o versión en el nombre; **una semana** para el
   resto de `/assets/*`, que son las imágenes y videos con el nombre que les puso
   quien los diseñó y no cambian de URL al corregirlos; y `max-age=0,
   must-revalidate` para el HTML, que es quien apunta a todo lo demás.

## Notas

- Los gradientes de varias paradas no sobreviven a los valores arbitrarios de
  Tailwind: el parser los corta en la primera coma. Por eso el chrome del CTA
  vive en `index.css` y no en clases sueltas.
- `lucide` trae `width` y `height` propios en el `<svg>`. Si se pisa solo uno,
  la caja queda de 24px en el otro eje y el ícono se descentra dentro de su
  contenedor.
- Un hijo de grid trae `min-width:auto`, o sea que su mínimo es el min-content.
  Si adentro hay una tira flex con `overflow-x:auto`, ese min-content es la
  **suma de todos los hijos** y la pista se estira hasta ahí: la página entera
  se va de lado y el `overflow` no recorta nada. Con `minmax(0,1fr)` en las
  columnas explícitas no pasa, pero cuando la grilla colapsa a una sola columna
  la pista implícita vuelve a ser `auto` — ahí hace falta `min-w-0` en el hijo.
  Es lo que le pasaba a la tira de reels de `/proyectos` abajo de 900px.
- **Ojo con las «clases canónicas» que sugiere el linter.** Asumen el tema por
  defecto de Tailwind, y este proyecto no define la escala de interlineado en su
  `@theme`: cambiar `leading-[1.5]` por `leading-normal` emite
  `line-height:var(--leading-normal)` sin valor, el navegador cae en `normal`
  (~1.2) y el bloque se achica sin que nada avise. Vale para cualquier utilidad
  cuya escala el `@theme` no declare.
- `cx()` no resuelve conflictos entre clases. Poner `text-muted` y `text-lima`
  juntas deja que gane la que Tailwind haya emitido última en la hoja, no la
  última del string — para estados usar un ternario que emita **una** sola.
- `npm audit` marca `react-router` por *RSC Mode CSRF Bypass*. Sólo aplica al
  modo RSC con server actions; acá es una SPA cliente sin RSC.
