import { Play } from 'lucide-react'
import { useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { cx } from '../../lib/cx'
import { Pend } from './Pend'

/* Reel vertical, tal cual.
   Los clips son 9:16 con subtítulo quemado: son reels, y se presentan como
   reels. Nada de máscaras, blends ni halos encima — rectángulo, esquinas
   suaves, sombra. No se recorta a 16:9 porque a 1080 de ancho el recorte le
   come la cabeza y le mete el subtítulo adentro (medido). El poster es un
   fotograma real del propio clip.

   El play siempre es del usuario: el navegador bloquea el autoplay con audio.
   Al reproducir uno, se pausan los demás — solo suena uno a la vez. */
export function Reel({ reel, className }) {
  const ref = useRef(null)
  const [sonando, setSonando] = useState(false)

  /* El `poster` se pone recién cuando el reel entra en pantalla.

     `preload="none"` frena el video, pero NO el poster: el navegador lo pide
     igual, y encima React le agrega un <link rel="preload"> al HTML porque un
     poster no admite `loading="lazy"`. Son ~47 KB por reel, todos debajo del
     pliegue — en el home eran dos, en /proyectos son seis.

     El <figure> ya tiene su alto por el aspect-[9/16], así que sin poster el
     hueco es negro pero mide lo mismo: no hay salto cuando llega. */
  const [caja, aLaVista] = useInView({ threshold: 0, rootMargin: '200px 0px' })

  const reproducir = () => {
    document.querySelectorAll('video[data-reel]').forEach((otro) => {
      if (otro !== ref.current) otro.pause()
    })
    ref.current?.play()
  }

  return (
    /* Sin tope de ancho propio: el reel ocupa lo que le dé su contenedor, y
       cada sección decide cuánto. Tenerlo acá obligaba a pelear contra un
       max-w fijo desde afuera, y `cx` no resuelve ese conflicto. */
    <figure ref={caja} className={cx('relative w-full', className)}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        data-reel
        src={reel.video}
        poster={aLaVista ? reel.poster : undefined}
        playsInline
        controls
        preload="none"
        onPlay={() => setSonando(true)}
        onPause={() => setSonando(false)}
        onEnded={() => {
          setSonando(false)
          if (ref.current) ref.current.currentTime = 0
        }}
        className="aspect-[9/16] w-full rounded-[14px] bg-black object-cover shadow-[0_30px_70px_-26px_rgba(0,0,0,.95)]"
      />

      <button
        type="button"
        aria-label="Reproducir el reel con sonido"
        onClick={reproducir}
        className={cx(
          'absolute left-1/2 top-1/2 grid h-16.5 w-16.5 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center',
          'rounded-full border-0 bg-linear-160 from-[#a6f22a] to-[#7ac400] text-[#0a1a00]',
          'shadow-[0_10px_34px_-6px_rgba(129,222,0,.55)] transition-[transform,opacity] duration-300 ease-soft',
          'hover:scale-[1.07]',
          sonando && 'pointer-events-none opacity-0',
        )}
      >
        <Play className="h-6 w-6 translate-x-px" fill="currentColor" strokeWidth={0} />
      </button>

      <figcaption className="mt-[.9rem] text-[.78rem] leading-[1.5] text-muted-2">
        <b className="mb-[.15rem] block text-[.88rem] font-medium text-read-3">
          {reel.autor}
          {reel.autorPend && <Pend nota={reel.autorPend.nota}>{reel.autorPend.texto}</Pend>}
        </b>
        {reel.duracion}
      </figcaption>
    </figure>
  )
}
