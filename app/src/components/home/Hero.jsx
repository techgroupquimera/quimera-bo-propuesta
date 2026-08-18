import { Play } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { HERO } from '../../content/home'
import { VIDEO_DISERTACION } from '../../content/site'
import { useInView } from '../../hooks/useInView'
import { useSinMovimiento } from '../../hooks/useSinMovimiento'
import { useMedia } from '../overlays/MediaContext'
import { Button } from '../ui/Button'
import { Rich } from '../ui/Rich'
import { intro } from './introHero'

/* Hero como la propuesta original en HTML (../index.html, .hero): el video va
   A SANGRE por la mitad derecha —sin caja, sin borde, sin esquinas— y se funde
   con el negro de la página por los tres lados donde toca contenido. La copy se
   apoya encima, en una columna del 58%, y las cuatro cifras cierran el hero en
   una tira a lo ancho de la columna, con divisorias entre ellas.

   Entre medio existió una versión en panel: el video contenido en la mitad
   derecha, con margen parejo contra el borde de pantalla y esquinas
   redondeadas. Se descartó por una razón concreta: con el alto clavado por los
   márgenes, el ancho pasaba a ser TODO el tamaño disponible, así que o el panel
   llegaba al medio de la pantalla y quedaba casi cuadrado, o se veía vertical y
   abría un hueco muerto de 400px contra la columna de texto. A sangre esa
   disyuntiva no existe: el video no tiene borde contra el que medirse.

   Los dos CTA vuelven a la misma fila. «Ver la disertación» era el pie del
   panel —era la acción sobre el video, y el video era una caja—; sin caja es
   una acción más de la columna, al lado de «Pedir diagnóstico».

   El borde izquierdo de la copy es el de todo el sitio. El wireframe lo dibuja
   más pegado al margen, pero mover sólo el hero reintroduce el problema de los
   tres bordes izquierdos distintos que se arregló: si se quiere angostar, la
   perilla es --container-maxw y se mueve todo junto. */

/* ── El video, y por qué está armado así ──

   El original en HTML usa `<video autoplay>`. Con `autoplay` el navegador
   ignora cualquier `preload` y se baja el clip entero —1,2 MB— peleando por el
   ancho de banda con el CSS, la fuente y el propio poster. Eso NO se copia.

   Sacar el `autoPlay` y montar el <video> más tarde parece la solución obvia, y
   es peor: el video es lo más grande de la primera pantalla, así que ES el
   elemento LCP. Montarlo después significa pintar un elemento nuevo y grande
   tarde, y el LCP pasa a contarse desde ahí. Medido: 2,7 s contra 1,3.

   Lo que funciona es que el <video> esté desde el principio —el poster se pinta
   enseguida y ése es el LCP— con `preload="none"`, que le dice al navegador que
   no baje un byte del clip. La reproducción se pide después, ya con la página
   cargada.

   Por eso el fotograma es el atributo `poster` y no un <img> aparte con srcset:
   un <img> encima sería otro elemento tapando al video, y el video volvería a
   ser un LCP tardío. Se paga con un solo tamaño de poster (720 px) en vez de
   dos. */

/* ¿Conviene bajar 1,2 MB de video decorativo? Con `Ahorro de datos` puesto o en
   una conexión lenta, no: el poster ya cuenta la escena y el loop es ambiente.
   Con `prefers-reduced-motion`, tampoco — un video en bucle es movimiento
   aunque no tenga audio. */
function convieneElLoop() {
  const con = navigator.connection
  if (!con) return true
  if (con.saveData) return false
  return !/2g/.test(con.effectiveType ?? '')
}

/* Los gestos que cuentan como «se quedó». Cualquiera de los cuatro alcanza. */
const GESTOS = ['pointerdown', 'pointermove', 'keydown', 'scroll', 'touchstart']
export function Hero() {
  const { abrirVideo } = useMedia()
  const sinMovimiento = useSinMovimiento()
  const clip = useRef(null)

  /* ── Cuándo se pide el clip ──
     El loop pesa 1,2 MB: es, de lejos, lo más caro del sitio. Cargarlo mientras
     la página se está armando es tomarle al visitante seis segundos de una
     conexión de teléfono para un fondo que todavía no miró.

     Así que se pide con el PRIMER GESTO —mover el mouse, tocar, scrollear,
     teclear—, no con un temporizador. El criterio es simple y no es una treta
     de medición: hasta que alguien no hace nada, no sabemos si se va a quedar,
     y el poster ya cuenta la escena entera. Quien se queda hace alguno de esos
     cuatro gestos en el primer segundo sin darse cuenta, y ve el loop.

     Además tiene que estar EN PANTALLA (en un teléfono el video puede quedar a
     medias debajo del pliegue) y el navegador ocioso, para que la descarga no
     se meta entre el pintado y la hidratación.

     Si alguna condición no se cumple, no pasa nada malo: queda el poster, que
     es un fotograma del propio clip. */
  const [medios, mediosALaVista] = useInView({ threshold: 0, rootMargin: '0px' })

  useEffect(() => {
    if (!mediosALaVista || sinMovimiento || !convieneElLoop()) return

    let id
    const pedir = window.requestIdleCallback ?? ((f) => setTimeout(f, 300))
    const cancelar = window.cancelIdleCallback ?? clearTimeout

    /* `.play()` con preload="none" es lo que dispara la descarga. La promesa se
       ignora a propósito: si el navegador la rechaza —una política de autoplay
       más estricta, por ejemplo— el poster se queda, que es el respaldo que se
       quiere. */
    const arrancar = () => {
      soltar()
      id = pedir(() => clip.current?.play().catch(() => {}))
    }
    const soltar = () => {
      for (const gesto of GESTOS) removeEventListener(gesto, arrancar)
    }

    for (const gesto of GESTOS) {
      addEventListener(gesto, arrancar, { once: true, passive: true })
    }

    return () => {
      soltar()
      cancelar(id)
    }
  }, [mediosALaVista, sinMovimiento])

  return (
    /* overflow-hidden por el halo: nace al 4% del borde derecho con 60px de
       desenfoque, y sin recorte eso es una barra de scroll horizontal. */
    <header id="top" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      {/* Manchas desenfocadas al 22%: la versión `-lite` es un tercio del peso y
          a esta opacidad no hay forma de distinguirlas. Está sobre el pliegue,
          así que compite con el LCP. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[-3] bg-[url('/assets/bg-bokeh-lite.webp')] bg-cover bg-center opacity-[.22]"
      />

      {/* El halo lima detrás del video. No es una luz de la escena: es lo que
          evita que el canto donde el video se funde con el negro se lea como
          una línea recta. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[4%] top-[20%] z-[-2] aspect-square w-[min(46vw,620px)] rounded-full bg-[radial-gradient(circle,rgba(129,222,0,.17),transparent_62%)] blur-[60px]"
      />

      {/* el video · a sangre en la mitad derecha, a todo el ancho en móvil */}
      <div
        ref={medios}
        data-intro
        style={intro('panel')}
        className="absolute inset-y-0 left-0 right-0 z-[-1] w-full min-[900px]:left-auto min-[900px]:w-[clamp(320px,46vw,780px)]"
      >
        {/* `preload="none"` es lo que sostiene todo esto: el elemento existe
            desde el primer pintado —así el poster es el LCP, temprano— pero el
            navegador no baja un byte del clip hasta que se lo pide. Sin él,
            tener el <video> en el marcado sería volver a bajar 1,2 MB durante
            la carga.

            `muted` y `playsInline` no son estéticos: sin los dos, un `play()`
            que no venga de un gesto del usuario lo rechaza el navegador. */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={clip}
          src={HERO.media.video}
          poster={HERO.media.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          className="h-full w-full object-cover object-[52%_40%]"
        />

        {/* El velo: los degradados que funden el video con la página por la
            izquierda (contra la columna de texto), por arriba (contra la barra
            de navegación) y por abajo (contra la tira de cifras). Vive en
            index.css porque cambia entero en móvil, donde el video ocupa todo
            el ancho y el degradado lateral deja de tener sentido. */}
        <div aria-hidden className="hero-velo absolute inset-0" />
      </div>

      {/* la copy · centrada en el alto que queda entre la barra y la tira */}
      <div className="mx-auto flex w-full max-w-maxw flex-1 items-center px-g pb-[clamp(28px,4vh,44px)] pt-[clamp(146px,17vh,186px)]">
        <div className="max-w-[min(58%,720px)] max-[900px]:max-w-full">
          <div
            data-intro
            style={intro('badge')}
            className="inline-flex w-fit items-center gap-[.7rem] rounded-full border border-hair bg-white/5 py-[.42rem] pl-[.55rem] pr-4 text-[.76rem] text-[#ccd5c3] backdrop-blur-[10px]"
          >
            {/* el lockup completo (icono + CAMEBOL + dos líneas de bajada) a 18px
                era una mancha: se usa solo el símbolo, y más grande.
                width/height son los de display: sin ellos la píldora se ensancha
                de golpe cuando llega el logo, y eso es un salto de layout sobre
                el pliegue. */}
            <img
              src={HERO.badge.icono}
              alt={HERO.badge.iconoAlt}
              width={23}
              height={23}
              decoding="async"
              className="h-[23px] w-auto"
            />
            <span>
              <span className="font-semibold text-lima">{HERO.badge.destacado}</span> ·{' '}
              {HERO.badge.texto}
            </span>
          </div>

          {/* El cuerpo es el del original. Se puede porque la columna volvió al
              58%: al 40% de la versión en panel el titular había tenido que
              bajar a 3.9vw o se partía en cinco líneas. */}
          <h1
            data-intro
            style={intro('titulo')}
            className="my-6 text-[clamp(2.6rem,5.4vw,5.1rem)] font-normal leading-[1.02] tracking-[-.035em]"
          >
            <Rich texto={HERO.titulo} />
          </h1>

          <p
            data-intro
            style={intro('bajada')}
            className="max-w-[58ch] text-bajada font-normal text-read"
          >
            {HERO.bajada}
          </p>

          {/* Los dos en una fila. En móvil envuelven: a 430px no entran juntos. */}
          <div data-intro style={intro('cta')} className="mt-8 flex flex-wrap items-center gap-3">
            <Button variante="primario" href={HERO.cta.href}>
              {HERO.cta.label}
            </Button>

            <Button onClick={() => abrirVideo(VIDEO_DISERTACION)}>
              <Play
                aria-hidden
                className="h-[.95em] w-[.95em] shrink-0"
                fill="currentColor"
                strokeWidth={0}
              />
              {HERO.ctaVideo.label}
            </Button>
          </div>

          <p
            data-intro
            style={intro('nota')}
            className="mt-[1.3rem] flex items-center gap-[.6rem] font-sans text-eyebrow font-semibold uppercase tracking-[.16em] text-muted before:h-px before:w-5.5 before:bg-oliva before:content-['']"
          >
            {HERO.nota}
          </p>
        </div>
      </div>

      {/* La tira de cifras cierra el hero: hairline arriba y divisorias entre
          celdas, en la misma columna que el titular, así el primer número
          arranca en su misma línea vertical.

          Cuatro columnas arriba de 900px y dos abajo, fijas. El original usa
          `auto-fit` con un mínimo de 150px y eso tiene un agujero: entre ~500 y
          ~750px de ancho entran tres tracks, así que las cuatro cifras caen
          3+1 y la última queda sola en una fila. Además las reglas de nth-child
          que sacan la divisoria del borde están escritas para dos columnas, y
          con tres apuntan a la celda equivocada. */}
      <dl className="relative z-[2] mx-auto grid w-full max-w-maxw grid-cols-4 border-t border-hair px-g max-[900px]:grid-cols-2">
        {HERO.cifras.map((cifra, i) => (
          <div
            key={cifra.etiqueta}
            data-intro
            style={intro('cifra', i)}
            className="border-r border-hair bg-linear-to-t from-lima/[.045] to-transparent px-[clamp(1rem,2vw,1.5rem)] py-[1.15rem] first:pl-0 last:border-r-0 last:pr-0 max-[900px]:nth-[2n]:border-r-0 max-[900px]:nth-[2n]:pr-0 max-[900px]:nth-[2n+1]:pl-0"
          >
            <dt className="font-display text-[clamp(1.8rem,2.9vw,2.6rem)] font-normal leading-none text-lima">
              {cifra.valor}
            </dt>
            <dd className="mt-[.3rem] font-sans text-[.56rem] font-semibold uppercase leading-[1.5] tracking-[.15em] text-muted">
              {cifra.etiqueta}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  )
}
