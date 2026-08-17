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

/* Hero según el wireframe: el video deja de ir a sangre y pasa a ser un panel
   contenido en la mitad derecha, separado del borde de pantalla por un margen
   parejo. A la izquierda van badge, titular, bajada, CTA y la nota de plazas;
   adentro del panel, las cuatro cifras y el play de la disertación.

   El segundo CTA («Ver la disertación») vive ADENTRO del panel: es la acción
   sobre el video, no una acción más de la columna de texto. Al estar dentro
   del mismo nodo, en móvil baja con el panel sin duplicar marcado ni consultar
   el ancho desde JS.

   El borde izquierdo de la copy sigue siendo el de todo el sitio (.px-column).
   El wireframe lo dibuja más pegado al margen, pero mover sólo el hero
   reintroduce el problema de los tres bordes izquierdos distintos que se
   arregló: si se quiere angostar, la perilla es --container-maxw y se mueve
   todo junto. El panel, en cambio, sí se mide contra la pantalla. */

/* margen del panel contra el borde de pantalla, y de sus hijos contra el panel */
const MARGEN = 'clamp(14px,1.6vw,30px)'

/* ── El panel de video, y por qué está armado así ──

   Antes era `<video autoPlay poster>`. Con `autoPlay` el navegador ignora
   cualquier `preload` y se baja el clip entero —1,2 MB— peleando por el ancho
   de banda con el CSS, la fuente y el propio poster.

   Sacar el `autoPlay` y montar el <video> más tarde parece la solución obvia, y
   es peor: el panel es lo más grande de la primera pantalla, así que ES el
   elemento LCP. Montar el video después significa pintar un elemento nuevo y
   grande tarde, y el LCP pasa a contarse desde ahí. Medido: 2,7 s contra 1,3.

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

     Además tiene que estar EN PANTALLA (en un teléfono el panel puede quedar a
     medias debajo del pliegue) y el navegador ocioso, para que la descarga no
     se meta entre el pintado y la hidratación.

     Si alguna condición no se cumple, no pasa nada malo: queda el poster, que
     es un fotograma del propio clip. */
  const [panel, panelALaVista] = useInView({ threshold: 0, rootMargin: '0px' })

  useEffect(() => {
    if (!panelALaVista || sinMovimiento || !convieneElLoop()) return

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
  }, [panelALaVista, sinMovimiento])

  return (
    <header
      id="top"
      className="relative isolate flex min-h-svh flex-col px-column pb-[clamp(40px,9vh,110px)] pt-[clamp(136px,16vh,190px)]"
    >
      {/* Manchas desenfocadas al 22%: la versión `-lite` es un tercio del peso y
          a esta opacidad no hay forma de distinguirlas. Está sobre el pliegue,
          así que compite con el LCP. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[-1] bg-[url('/assets/bg-bokeh-lite.webp')] bg-cover bg-center opacity-[.22]"
      />

      {/* columna de texto */}
      <div className="relative flex flex-1 flex-col min-[900px]:max-w-[min(40%,620px)]">
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

        <h1
          data-intro
          style={intro('titulo')}
          className="mt-7 text-[clamp(2.25rem,3.9vw,3.9rem)] font-normal leading-[1.06] tracking-[-.03em]"
        >
          <Rich texto={HERO.titulo} />
        </h1>

        {/* La bajada y el CTA van juntos abajo: el mt-auto empuja el par al pie
            de la columna, así el aire queda entre el titular y la bajada, que
            es donde lo pone la referencia. */}
        <div className="mt-auto pt-[clamp(2.5rem,8vh,5rem)]">
          <p
            data-intro
            style={intro('bajada')}
            className="max-w-[58ch] text-bajada font-normal text-read"
          >
            {HERO.bajada}
          </p>

          <div data-intro style={intro('cta')} className="mt-8">
            <Button variante="primario" href={HERO.cta.href}>
              {HERO.cta.label}
            </Button>
          </div>

          <p
            data-intro
            style={intro('nota')}
            className="mt-[1.4rem] flex items-center gap-[.6rem] font-sans text-eyebrow font-semibold uppercase tracking-[.16em] text-muted before:h-px before:w-5.5 before:bg-oliva before:content-['']"
          >
            {HERO.nota}
          </p>
        </div>
      </div>

      {/* panel de video · en móvil baja al flujo, con su propia proporción */}
      <div
        ref={panel}
        data-intro
        style={{ '--margen': MARGEN, ...intro('panel') }}
        className="relative mt-10 aspect-4/5 w-full overflow-hidden rounded-[clamp(14px,1.2vw,20px)] border border-hair min-[900px]:absolute min-[900px]:right-(--margen) min-[900px]:top-(--margen) min-[900px]:bottom-(--margen) min-[900px]:left-auto min-[900px]:mt-0 min-[900px]:aspect-auto min-[900px]:w-[clamp(320px,50vw,960px)]"
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
          className="absolute inset-0 h-full w-full object-cover object-[52%_40%]"
        />

        {/* Dos capas: un tinte parejo, para que el panel no quede a brillo pleno
            contra un sitio que es casi negro, y un velo arriba, que es donde
            caen la pill de navegación y «Conversemos» cuando el fotograma se
            aclara. Si se quiere el video más limpio, la perilla es el tinte. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(rgba(5,6,4,.26),rgba(5,6,4,.26)),' +
              'linear-gradient(to bottom,rgba(5,6,4,.72),transparent 22%)',
          }}
        />

        {/* Pie del panel: las cifras arriba, el play abajo, los dos apoyados
            sobre el velo. Las cifras van acá y no en una banda propia debajo
            del hero porque ahí quedaban pegadas a la marquesina de marcas —
            dos pruebas seguidas peleando por la misma atención. */}
        {/* El velo va acá y no en el panel: medido en % del panel funcionaba en
            escritorio (el bloque ocupa ~12% del alto) y se quedaba corto en
            móvil (~30%, y el video seguía asomando detrás de las cifras).
            Anclado al bloque cubre lo que tiene que cubrir a cualquier alto. */}
        <div
          className="absolute inset-x-0 bottom-0 px-(--margen) pb-(--margen) pt-20"
          style={{
            background:
              'linear-gradient(to top,rgba(5,6,4,.94),rgba(5,6,4,.86) 55%,transparent)',
          }}
        >
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 min-[520px]:grid-cols-4">
            {HERO.cifras.map((cifra, i) => (
              <div key={cifra.etiqueta} data-intro style={intro('cifra', i)}>
                <dt className="font-display text-[clamp(1.2rem,1.55vw,1.75rem)] font-normal leading-none tracking-[.02em] text-lima">
                  {cifra.valor}
                </dt>
                <dd className="mt-1 font-sans text-[.5rem] font-semibold uppercase leading-[1.4] tracking-[.14em] text-white/72">
                  {cifra.etiqueta}
                </dd>
              </div>
            ))}
          </dl>

          {/* Toda la fila es el disparador: el círculo solo no da área de click
              cómoda y la etiqueta suelta no se lee como accionable. */}
          <button
            type="button"
            data-intro
            style={intro('play')}
            onClick={() => abrirVideo(VIDEO_DISERTACION)}
            className="group mt-4 flex w-full cursor-pointer items-center gap-[.9rem] border-0 border-t border-t-white/15 bg-transparent px-0 pb-0 pt-4 text-left"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-linear-160 from-[#a6f22a] to-[#7ac400] text-[#0a1a00] shadow-[0_10px_30px_-6px_rgba(129,222,0,.5)] transition-transform duration-300 ease-soft group-hover:scale-[1.07]">
              <Play className="h-4 w-4 translate-x-px" fill="currentColor" strokeWidth={0} />
            </span>
            <span className="text-[.92rem] font-medium tracking-[-.01em] text-paper transition-colors duration-250 group-hover:text-lima">
              {HERO.ctaVideo.label}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
