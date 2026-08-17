import { STACK } from '../../content/tecnologia'
import { useRotacion } from '../../hooks/useRotacion'
import { cx } from '../../lib/cx'
import { Reveal } from '../ui/Reveal'

/* Wireframe: los seis grupos como fichas a la izquierda y, a la derecha, el
   grupo elegido abriéndose en abanico hacia sus herramientas.

   Antes eran los seis abanicos dibujados a la vez, uno debajo del otro. Como
   selector ocupa un tercio del alto y, sobre todo, el abanico pasa a significar
   algo: se dibuja cuando elegís el grupo, en vez de ser un adorno estático
   repetido seis veces.

   Va sin encabezado porque el original tampoco lo tiene: el stack cae directo
   después del hero, que es el que dice de qué se trata. Por eso el padding de
   arriba es corto y no el de una sección normal.

   ── Cómo cierran las líneas con las fichas ──
   El abanico es un SVG estirado con preserveAspectRatio="none", así que las
   coordenadas son porcentajes del hueco y no hace falta medir nada del DOM: la
   ficha i está en (i + 0.5) / n de la altura.

   Eso sólo es cierto si todas las filas miden exactamente lo mismo, y con un
   `gap` NO lo es: el hueco va entre fichas pero no en los extremos, así que los
   centros se corren hacia adentro (medido: ~4px en un grupo de seis). Por eso
   la separación la pone el padding vertical de cada <li> en vez de un gap —
   filas idénticas, centros exactos, y la línea apunta al medio de la ficha.

   vector-effect="non-scaling-stroke" mantiene el trazo en 1px: sin eso el
   estirado no uniforme del viewBox lo engorda distinto en cada eje. */

const RONDA = 4200 // ms que se queda en cada grupo antes de pasar al siguiente
const HUECO = 'py-[calc(clamp(7px,.85vh,12px)/2)]'

/* El grupo más largo. Se usa de espaciador invisible para que el panel mida
   siempre lo mismo: sin eso, al pasar de uno de 7 fichas a uno de 5 la sección
   se acorta 100px de golpe y salta todo lo que tiene debajo. Sale de los datos
   y no de un alto escrito a mano, así sigue valiendo si cambia el stack. */
const MAS_LARGO = STACK.reduce((a, b) => (b.items.length > a.items.length ? b : a))

function Abanico({ n, estatico }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full text-hair-lima"
    >
      {Array.from({ length: n }, (_, i) => {
        const y = ((i + 0.5) * 100) / n
        return (
          <path
            key={i}
            /* sale horizontal de la etiqueta y llega horizontal a la ficha: los
               dos tiradores en 42/58 son lo que da la curva del wireframe */
            d={`M0 50 C 42 50, 58 ${y}, 100 ${y}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            /* pathLength=1 vuelve el largo del trazo independiente de la curva:
               las seis líneas se dibujan en el mismo tiempo aunque midan
               distinto. Sin animación el dashoffset queda en 0 y se ven enteras. */
            pathLength="1"
            strokeDasharray="1"
            style={estatico ? undefined : { animationDelay: `${0.06 * i}s` }}
            className={estatico ? undefined : 'animate-trazo motion-reduce:animate-none'}
          />
        )
      })}
    </svg>
  )
}

function Panel({ grupo, estatico, className, ...resto }) {
  return (
    <div
      className={cx(
        /* La columna del medio es el recorrido del abanico, y tiene que ser
           ancha: con 65px contra 330 de despliegue vertical las líneas salían
           casi verticales y no se leían como un abanico. */
        'grid grid-cols-[minmax(0,.72fr)_clamp(48px,7vw,145px)_minmax(0,1fr)] max-[620px]:grid-cols-1',
        className,
      )}
      {...resto}
    >
      <div className="flex items-center max-[620px]:mb-4">
        <h3
          className={cx(
            'w-full rounded-[clamp(12px,1.1vw,16px)] border px-[clamp(.9rem,1.4vw,1.3rem)] py-[clamp(.8rem,1.2vw,1.1rem)] text-card font-medium',
            /* el acento se queda acá y no en las fichas de la izquierda: allá
               pelearía con el estado de seleccionado. Marca los dos grupos que
               el original ponía en glass-lime — IA y agentes */
            grupo.destacada
              ? 'border-hair-lima bg-lima/8 text-lima'
              : 'border-hair bg-white/3 text-paper',
          )}
        >
          {grupo.titulo}
          {grupo.apunte && (
            <span className="mt-[.3rem] block font-sans text-tag font-semibold uppercase text-muted-2">
              {grupo.apunte}
            </span>
          )}
        </h3>
      </div>

      {/* la celda va sin alinear a propósito: al estirarse toma el alto del
          grupo —que lo manda la columna de fichas— y es lo que hace que el
          abanico empiece y termine donde están las fichas */}
      <div className="relative max-[620px]:hidden">
        <Abanico n={grupo.items.length} estatico={estatico} />
      </div>

      <ul className="flex flex-col">
        {grupo.items.map((item, i) => (
          <li
            key={item}
            style={estatico ? undefined : { animationDelay: `${0.06 * i + 0.1}s` }}
            className={cx(HUECO, !estatico && 'animate-entra-x motion-reduce:animate-none')}
          >
            <span className="block rounded-[clamp(9px,.8vw,12px)] border border-hair bg-white/2.5 px-[clamp(.8rem,1.1vw,1.1rem)] py-[.6rem] font-sans text-[.85rem] text-read-2 transition-[background,border-color,color] duration-350 ease-soft hover:border-hair-lima hover:text-read-hi">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* La rotación —y las cuatro condiciones que la frenan— vive en useRotacion:
   la comparte con el mapa de /nosotros. */
export function Stack() {
  const { activo, elegir, ref, pausar } = useRotacion(STACK.length, RONDA)

  return (
    <section
      id="stack"
      ref={ref}
      {...pausar}
      className="mx-auto max-w-maxw px-g pb-aire pt-[clamp(24px,4vh,48px)]"
    >
      <Reveal className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-[clamp(2.2rem,4vw,3.4rem)] min-[900px]:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] min-[900px]:items-center">
        {/* Botones y no una lista con hover: elegir un grupo cambia lo que se ve
            al costado, así que es un control y tiene que llegar por teclado.
            aria-pressed dice cuál está puesto. */}
        <div className="grid grid-cols-2 gap-[clamp(.5rem,.8vw,.8rem)]">
          {STACK.map((grupo, i) => (
            <button
              key={grupo.titulo}
              type="button"
              onClick={() => elegir(i)}
              aria-pressed={i === activo}
              className={cx(
                'cursor-pointer rounded-[clamp(10px,.9vw,14px)] border px-[clamp(.7rem,1vw,1rem)] py-[clamp(.6rem,.9vw,.85rem)] text-left font-sans text-[.86rem] leading-tight',
                'transition-[background,border-color,color] duration-350 ease-soft',
                i === activo
                  ? 'border-lima bg-lima/10 text-lima'
                  : 'border-hair bg-white/2.5 text-read-2 hover:border-hair-lima hover:text-read-hi',
              )}
            >
              {grupo.titulo}
            </button>
          ))}
        </div>

        {/* Los dos hijos comparten celda: el espaciador fija el alto y el panel
            real se centra encima sin estirarse —si se estirara, el SVG tomaría
            más alto que las fichas y el abanico volvería a apuntar a nada—. */}
        <div className="grid *:col-start-1 *:row-start-1">
          <Panel grupo={MAS_LARGO} estatico aria-hidden className="invisible" />

          {/* key: al cambiar de grupo React desmonta el panel y lo vuelve a
              montar, que es lo que rearranca las animaciones de trazo y
              entrada. Sin esto el contenido cambia de golpe y sólo se dibuja la
              primera vez. */}
          <Panel key={STACK[activo].titulo} grupo={STACK[activo]} className="self-center" />
        </div>
      </Reveal>
    </section>
  )
}
