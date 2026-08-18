/* Genera las dos imágenes del hero de la home a la medida a la que se ven.

   Se corre a mano —como `bajar-fuentes.mjs`— y el resultado se versiona en
   ../assets. El build NO depende de ffmpeg: en Vercel o Netlify no está, y no
   se puede pedir que la única forma de publicar sea tener ffmpeg instalado.

   Por qué sólo estas dos, y no las 143 imágenes del sitio: son las únicas que
   el navegador baja antes de pintar la home. Todo lo demás está bajo el pliegue
   y ahora va con `loading="lazy"`, así que no compite por el ancho de banda
   mientras se está midiendo el LCP. Optimizar una imagen que no se descarga no
   mueve la aguja.

     escenario-hd.webp  1080×1920  180 KB   poster del panel de video
                                            → es el elemento LCP en escritorio
     bg-bokeh.webp      1700×3029   28 KB   fondo del hero, al 22% de opacidad
     logo-lockup.png     538×460    75 KB   el logo de la barra, en las 6 rutas

   El poster va en UN solo tamaño, 720 px, y no en dos con srcset. Se probaron
   las dos formas y ésta gana por una razón que sólo aparece midiendo: el
   fotograma tiene que ser el `poster` del propio <video>, no un <img> aparte,
   porque si no el video se convierte en un elemento nuevo que se pinta más
   tarde y el LCP se cuenta desde ahí. Y `poster` no acepta srcset.

   720 es el punto medio: cubre el panel de un teléfono (412 px a 1,75× de
   densidad) sin quedarse corto en el de escritorio, que llega a 960.

   El logo se ve a 74 px de alto como máximo, y en un teléfono a 62. Un PNG de
   460 px de alto para eso son 75 KB de los cuales el 80% no se usa nunca. Y no
   es una imagen cualquiera: medido con Lighthouse, es EL elemento LCP en móvil
   —el más grande que se pinta en la primera pantalla, porque el panel de video
   queda debajo del pliegue—, así que su peso entra directo en la métrica.
   A 208×178 cubre casi 3× de densidad sobre los 62 px de display. */
import { execFileSync } from 'node:child_process'
import { statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ASSETS = resolve(dirname(fileURLToPath(import.meta.url)), '../../assets')

/* Recorte 3:4 centrado que sirve para las dos orientaciones: toma el lado
   que sobra y deja el otro entero. ffmpeg centra solo cuando no se le pasa
   x/y, así que el sujeto —que en las cuatro está al medio— no se pierde. */
const RECORTE_3_4 = "crop='min(iw,ih*3/4)':'min(ih,iw*4/3)'"

/* q=72 en el poster: pasa por debajo de un tinte plano al 26% y de dos
   degradados, así que el detalle fino no llega a verse. Medido contra el
   original al 100%, la diferencia aparece recién al 300% de zoom.

   q=58 en el bokeh: son manchas desenfocadas al 22% de opacidad. Es la imagen
   del sitio donde menos se nota la compresión y la que más pesa por píxel. */
const TAREAS = [
  { de: 'escenario-hd.webp', a: 'hero-poster.webp', ancho: 720, calidad: 70 },
  { de: 'bg-bokeh.webp', a: 'bg-bokeh-lite.webp', ancho: 860, calidad: 58 },
  { de: 'bg-bokeh-2.webp', a: 'bg-bokeh-2-lite.webp', ancho: 860, calidad: 58 },
  /* El fondo del hero de /nosotros. Mismo caso que los bokeh: va a 22% de
     opacidad y debajo de tres degradados, o sea que de la imagen original casi
     no queda nada visible — pero pesaba 149 KB y era lo primero que bajaba esa
     página. Los otros dos fondos de hero ya iban en su versión liviana; éste se
     había quedado con el archivo de 1080×1920. */
  { de: 'audiencia-hd.webp', a: 'audiencia-fondo.webp', ancho: 860, calidad: 62 },
  /* El favicon. El original es el logo a 432×240 y 39 KB — para un cuadradito
     de 16 px en una pestaña. Y no es inocente: el navegador lo pide con
     prioridad ALTA, así que esos 39 KB salen del mismo ancho de banda que el
     poster del hero. A 96 px de ancho sobra para cualquier pestaña. */
  { de: 'logo-icono.png', a: 'favicon.webp', ancho: 96, calidad: 84 },
  /* El logo lleva transparencia y tipografía chica («Marketing y Tech»): la
     calidad va alta y el escalado también en lanczos, que es el que menos
     deshilacha los remates a este tamaño. */
  { de: 'logo-lockup.png', a: 'logo-lockup.webp', ancho: 208, calidad: 86 },
  /* Las cuatro fotos de fondo de las tarjetas de «Nuestra propuesta». No están
     acá por peso de carga —van bajo el pliegue y con loading="lazy"— sino por
     proporción: la tarjeta es un rectángulo parado de 3:4 y los originales son
     tres apaisados y uno parado. Dejando que object-cover recorte, el navegador
     baja 1000 px de ancho para mostrar 290 y descarta más de la mitad de los
     píxeles. Recortadas acá, las cuatro juntas pesan menos que el JPG más chico.

     720 de ancho = 960 de alto: cubre 2,5× la tarjeta de escritorio (290 px) y
     2× la de un teléfono a dos columnas.

     q=62: la foto se ve al 42% de opacidad, desaturada y bajo un degradado que
     la tapa entera en el pie. Es el mismo caso que los bokeh — el detalle fino
     no llega nunca a la pantalla. */
  { de: 'crm.jpg', a: 'tarjeta-crm.webp', ancho: 720, calidad: 62, recorte: RECORTE_3_4 },
  { de: 'finanzas.jpg', a: 'tarjeta-finanzas.webp', ancho: 720, calidad: 62, recorte: RECORTE_3_4 },
  { de: 'agendamiento.jpg', a: 'tarjeta-agenda.webp', ancho: 720, calidad: 62, recorte: RECORTE_3_4 },
  { de: 'negocio.jpg', a: 'tarjeta-negocio.webp', ancho: 720, calidad: 62, recorte: RECORTE_3_4 },
]

const kb = (ruta) => (statSync(ruta).size / 1024).toFixed(1)

for (const { de, a, ancho, calidad, recorte } of TAREAS) {
  const origen = join(ASSETS, de)
  const destino = join(ASSETS, a)

  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-loglevel', 'error',
      '-i', origen,
      /* -2 en el alto: lo calcula manteniendo la proporción y lo redondea a
         par, que es lo que el codificador necesita para el submuestreo. */
      /* el recorte va primero: escalar y después recortar sería tirar
         píxeles que ya se pagaron en el remuestreo. */
      '-vf', [recorte, `scale=${ancho}:-2:flags=lanczos`].filter(Boolean).join(','),
      '-quality', String(calidad),
      '-compression_level', '6',
      destino,
    ],
    { stdio: 'inherit' },
  )

  console.log(`  ${de} (${kb(origen)} KB) → ${a} (${kb(destino)} KB)`)
}

/* ── La imagen para compartir (Open Graph) ──
   Es la que aparece cuando alguien pega un enlace del sitio en WhatsApp,
   LinkedIn o Facebook. Sin ella el enlace sale como un renglón de texto, y este
   sitio se va a compartir por WhatsApp más que por cualquier otra vía.

   Va aparte del bucle de arriba por dos razones y las dos son del formato:

   · Sale en JPG. Facebook ya acepta webp, pero WhatsApp no de forma confiable, y
     un enlace que no muestra la imagen en WhatsApp es el peor lugar donde
     fallar. El JPG lo entienden todos.
   · Por eso mismo la calidad se pide con `-q:v` (2 a 31, más bajo es mejor) y no
     con el `-quality` de arriba, que es una opción del codificador webp: con un
     destino .jpg, ffmpeg corta con «option not found».

   1200×630 es la medida que piden las tres plataformas (1.91:1). La fuente es
   vertical —todo el material del sitio sale de video 9:16— así que se recorta la
   franja horizontal de 1080×567 donde está la escena: Johnny en el escenario con
   la pantalla detrás. Es el fotograma de la disertación de CAMEBOL y no el del
   poster del hero, que en formato apaisado agarra un plano de espaldas donde no
   se reconoce a nadie — y una tarjeta de enlace tiene que decir de qué es en un
   golpe de vista. */
const OG = { de: 'disertacion-escena.webp', a: 'og.jpg', recorte: 'crop=1080:567:0:430', calidad: 4 }

{
  const origen = join(ASSETS, OG.de)
  const destino = join(ASSETS, OG.a)

  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-loglevel', 'error',
      '-i', origen,
      '-vf', `${OG.recorte},scale=1200:630:flags=lanczos`,
      '-q:v', String(OG.calidad),
      destino,
    ],
    { stdio: 'inherit' },
  )

  console.log(`  ${OG.de} (${kb(origen)} KB) → ${OG.a} (${kb(destino)} KB)  1200×630`)
}
