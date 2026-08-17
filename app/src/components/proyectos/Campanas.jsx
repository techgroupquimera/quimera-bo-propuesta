import { Maximize2 } from 'lucide-react'
import { CAMPANAS } from '../../content/proyectos'
import { useDesplegable } from '../../hooks/useDesplegable'
import { cx } from '../../lib/cx'
import { useMedia } from '../overlays/MediaContext'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'
import { VerMas } from '../ui/VerMas'

/* Wireframe: encabezado centrado y doce piezas en cuatro columnas.
   Mismo despliegue que «Sitios» y «Marca» —comparten hook y botón—, que acá
   además resuelve el problema del original: la grilla quieta sólo podía mostrar
   las 4:5, y por eso la página anterior tuvo que pasar a una tira en movimiento
   para no dejar catorce piezas afuera. Las doce en reposo son las doce 4:5; las
   otras catorce las abre el botón.

   ── Las tres proporciones ──
   Cada ficha es una caja 4:5 con la imagen en `contain`, no en `cover`. Una
   pieza de campaña es una composición cerrada: recortarla le come el remate o
   el logo, que es justo lo que hay que leer. En `contain` las 4:5 llenan la
   caja exacta (no se ve ninguna banda) y las cuadradas dejan dos franjas de un
   8 % que se leen como aire de la ficha, no como error.

   Los banners de ~2.7:1 no entran en ese trato: contenidos en una caja 4:5
   quedarían nadando en un 70 % de vacío. Ocupan dos columnas —tres cuando la
   grilla baja a tres, o sea todo el ancho— y van al final de la lista, así no
   parten una fila por el medio. `grid-flow-row-dense` mete el primero en el
   hueco que deja la última fila de fichas sueltas en vez de dejarlo vacío, y
   `self-center` evita que en esa fila mixta el navegador lo estire al alto de
   sus vecinas. */
const CAJA =
  'group relative block w-full cursor-pointer overflow-hidden rounded-[clamp(12px,1vw,18px)] ' +
  'border border-hair bg-white/2.5 p-0 transition-[background,border-color] duration-350 ease-soft ' +
  'hover:border-hair-lima hover:bg-white/5'

function Pieza({ pieza, n }) {
  const { abrirVisor } = useMedia()

  return (
    <button
      type="button"
      onClick={() =>
        abrirVisor({
          tipo: 'imagen',
          src: pieza.src,
          alt: 'Pieza de campaña',
          ancho: CAMPANAS.ancho,
        })
      }
      aria-label={`Ver la pieza de campaña ${n} en grande`}
      className={CAJA}
    >
      <img
        src={pieza.src}
        alt=""
        width={520}
        height={pieza.alto}
        loading="lazy"
        decoding="async"
        className={cx(
          'w-full object-contain transition-transform duration-500 ease-soft group-hover:scale-[1.03]',
          !pieza.ancha && 'aspect-[4/5]',
        )}
      />

      {/* la única señal de que la pieza se abre: no hay título ni destino que
          lo insinúe, como sí lo tienen las fichas de sitios y manuales */}
      <span className="pointer-events-none absolute right-[.55rem] top-[.55rem] grid h-8 w-8 place-items-center rounded-full border border-hair bg-ink/70 text-muted-2 opacity-0 backdrop-blur-[6px] transition-[opacity,color] duration-300 ease-soft group-hover:text-lima group-hover:opacity-100">
        <Maximize2 aria-hidden strokeWidth={1.8} className="h-[.95rem] w-[.95rem]" />
      </span>
    </button>
  )
}

export function Campanas() {
  const { lista, abierto, alternar, ocultas } = useDesplegable(
    CAMPANAS.piezas,
    CAMPANAS.visibles,
  )

  return (
    <Section id={CAMPANAS.id}>
      <div className="mx-auto max-w-[64ch] text-center">
        <Reveal>
          <Kicker>{CAMPANAS.kicker}</Kicker>
        </Reveal>

        <Reveal as="h2" className="mt-[-0.3rem] text-sec font-normal">
          <Rich texto={CAMPANAS.titulo} />
        </Reveal>

        <Reveal as="p" delay={0.07} className="mt-[1.2rem] text-bajada font-normal text-read">
          {CAMPANAS.bajada}
        </Reveal>
      </div>

      <div className="mt-[clamp(2.6rem,5vw,4.4rem)] grid grid-flow-row-dense grid-cols-2 gap-[clamp(.6rem,1vw,1.1rem)] min-[760px]:grid-cols-3 min-[1100px]:grid-cols-4">
        {lista.map((pieza, i) => (
          /* el retraso escalona por columna y no por posición: con doce fichas
             un escalonado corrido deja la última entrando medio segundo tarde,
             y en una grilla lo que se lee bien es la ola de izquierda a derecha */
          <Reveal
            key={pieza.src}
            delay={(i % 4) * 0.06}
            className={cx(
              pieza.ancha && 'col-span-2 self-center min-[760px]:max-[1099px]:col-span-3',
            )}
          >
            <Pieza pieza={pieza} n={i + 1} />
          </Reveal>
        ))}
      </div>

      {ocultas > 0 && (
        <VerMas
          abierto={abierto}
          onClick={alternar}
          mas={CAMPANAS.masLabel}
          menos={CAMPANAS.menosLabel}
        />
      )}
    </Section>
  )
}
