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
]

const kb = (ruta) => (statSync(ruta).size / 1024).toFixed(1)

for (const { de, a, ancho, calidad } of TAREAS) {
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
      '-vf', `scale=${ancho}:-2:flags=lanczos`,
      '-quality', String(calidad),
      '-compression_level', '6',
      destino,
    ],
    { stdio: 'inherit' },
  )

  console.log(`  ${de} (${kb(origen)} KB) → ${a} (${kb(destino)} KB)`)
}
