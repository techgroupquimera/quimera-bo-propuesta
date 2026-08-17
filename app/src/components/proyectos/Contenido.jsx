import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CONTENIDO } from '../../content/proyectos'
import { useSinMovimiento } from '../../hooks/useSinMovimiento'
import { useMedia } from '../overlays/MediaContext'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Wireframe: el encabezado abajo a la izquierda y los reels en una tira a la
   derecha, con el tercero cortado contra el borde.

   Una tira que se desplaza y no una grilla: los reels son verticales, y seis en
   grilla de tres darían dos filas de 400px de alto cada una. En tira ocupan una
   sola altura y el que quiera ver los seis los pasa.

   Acá va sólo el póster y el play; el video se reproduce en el visor 9:16, que
   es el que sabe mostrar verticales sin dos franjas negras a los costados. Así
   tampoco hay seis <video> descargando de fondo.

   ── El desplazamiento ──
   La barra nativa se esconde y en su lugar van dos flechas. La tira sigue
   siendo scroll de verdad —rueda, gesto táctil y teclado funcionan igual—, sólo
   que sin la barra a la vista. Las flechas mueven de a un reel: con
   snap-mandatory el navegador termina de encuadrar, así que el paso no tiene
   que ser exacto, pero igual sale del ancho real del primer reel más el hueco
   en vez de un número escrito a mano.

   Se apagan al llegar a cada punta, y si la tira no desborda no se dibujan: en
   una pantalla donde entran los seis, dos flechas muertas son ruido. */
const FLECHA =
  'grid h-10 w-10 place-items-center rounded-full border border-hair bg-white/4 text-read-2 ' +
  'transition-[background,border-color,color,opacity] duration-300 ease-soft ' +
  'enabled:cursor-pointer enabled:hover:border-hair-lima enabled:hover:bg-lima/8 ' +
  'enabled:hover:text-lima disabled:opacity-30'

export function Contenido() {
  const { abrirVisor } = useMedia()
  const sinMovimiento = useSinMovimiento()
  const tira = useRef(null)
  const [enInicio, setEnInicio] = useState(true)
  const [enFin, setEnFin] = useState(true)
  const [desborda, setDesborda] = useState(false)

  const medir = useCallback(() => {
    const el = tira.current
    if (!el) return
    const sobra = el.scrollWidth - el.clientWidth
    setDesborda(sobra > 4)
    setEnInicio(el.scrollLeft <= 4)
    setEnFin(el.scrollLeft >= sobra - 4)
  }, [])

  useEffect(() => {
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [medir])

  const pasar = (signo) => {
    const el = tira.current
    if (!el) return
    const primero = el.firstElementChild
    const hueco = parseFloat(getComputedStyle(el).columnGap) || 0
    const paso = (primero?.offsetWidth || el.clientWidth * 0.8) + hueco
    el.scrollBy({ left: signo * paso, behavior: sinMovimiento ? 'auto' : 'smooth' })
  }

  return (
    <Section id={CONTENIDO.id}>
      <div className="grid gap-[clamp(2.2rem,4vw,4rem)] min-[900px]:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] min-[900px]:items-end">
        <div>
          <Reveal>
            <Kicker>{CONTENIDO.kicker}</Kicker>
          </Reveal>

          <Reveal as="h2" className="mt-[-0.3rem] text-sec font-normal">
            <Rich texto={CONTENIDO.titulo} />
          </Reveal>

          <Reveal as="p" delay={0.07} className="mt-[1.2rem] text-bajada font-normal text-read">
            {CONTENIDO.bajada}
          </Reveal>

          {desborda && (
            <Reveal delay={0.14} className="mt-[clamp(1.4rem,2.4vw,2rem)] flex gap-[.6rem]">
              <button
                type="button"
                onClick={() => pasar(-1)}
                disabled={enInicio}
                aria-label="Ver los reels anteriores"
                className={FLECHA}
              >
                <ChevronLeft aria-hidden className="h-5 w-5" strokeWidth={1.8} />
              </button>

              <button
                type="button"
                onClick={() => pasar(1)}
                disabled={enFin}
                aria-label="Ver los reels siguientes"
                className={FLECHA}
              >
                <ChevronRight aria-hidden className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </Reveal>
          )}
        </div>

        {/* El ref va en el div de adentro y no en el Reveal: Reveal usa el suyo
            para el observer y lo asigna antes de esparcir el resto de props, así
            que uno de afuera lo pisaría y la sección no aparecería nunca.

            `min-w-0` no es decorativo: un hijo de grid trae `min-width:auto`, o
            sea que su mínimo es el min-content. Abajo de 900px la grilla es de
            una sola columna con la pista en `auto`, y el min-content de una tira
            flex es la SUMA de los seis reels — la pista se estiraba a 1064px y
            arrastraba a toda la página, que se iba de lado en el teléfono.
            Arriba de 900 no pasaba porque las dos columnas ya van con
            `minmax(0,…)`, que es la misma cuenta escrita a mano. */}
        <Reveal delay={0.12} className="min-w-0">
          <div
            ref={tira}
            onScroll={medir}
            className="scrollbar-none flex snap-x snap-mandatory gap-[clamp(.7rem,1.1vw,1.1rem)] overflow-x-auto"
          >
            {CONTENIDO.piezas.map((pieza) => (
              <figure
                key={pieza.nombre}
                className="w-[clamp(168px,15vw,240px)] shrink-0 snap-start"
              >
                <button
                  type="button"
                  onClick={() =>
                    abrirVisor({
                      tipo: 'video',
                      src: pieza.video,
                      alt: `Pieza de contenido para ${pieza.nombre}`,
                    })
                  }
                  aria-label={`Reproducir el reel de ${pieza.nombre}`}
                  className="group relative block w-full cursor-pointer overflow-hidden rounded-[14px] border border-hair bg-black p-0"
                >
                  <img
                    src={pieza.poster}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-[9/16] w-full object-cover transition-transform duration-500 ease-soft group-hover:scale-[1.03]"
                  />

                  <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-linear-160 from-[#a6f22a] to-[#7ac400] text-[#0a1a00] shadow-[0_10px_30px_-6px_rgba(129,222,0,.5)] transition-transform duration-300 ease-soft group-hover:scale-[1.07]">
                    <Play className="h-5 w-5 translate-x-px" fill="currentColor" strokeWidth={0} />
                  </span>
                </button>

                <figcaption className="mt-[.7rem] font-sans text-[.85rem] font-medium text-read-2">
                  {pieza.nombre}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
