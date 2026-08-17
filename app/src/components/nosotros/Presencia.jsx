import { CONTORNOS } from '../../content/contornos'
import { PRESENCIA } from '../../content/nosotros'
import { useRotacion } from '../../hooks/useRotacion'
import { cx } from '../../lib/cx'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Referencia del cliente: un mapa grande al centro, el nombre y la descripción
   abajo a la izquierda, y las guías verticales de fondo. Acá el mapa además
   pasa solo de una plaza a la siguiente.

   ── Qué es «el mapa» ──
   No hay ningún archivo de mapa en el proyecto. Lo único cartográfico que existe
   son los cuatro contornos administrativos de OpenStreetMap que el original ya
   traía embebidos, uno por plaza. Dibujar un contorno del continente a mano no
   era opción: no hay asset, y una silueta inventada en una página que presume de
   datos reales se nota.

   ── La rotación ──
   Vive en useRotacion, junto con las cuatro condiciones que la frenan (elección,
   mouse encima, foco de teclado, sección fuera de pantalla, y prefers-reduced-
   motion). La comparte con el stack de /tecnologia.

   Arranca en Santa Cruz porque es la casa: es el primer elemento del contenido.

   ── Dos altos fijos ──
   Ni el mapa ni el bloque de texto pueden cambiar de alto al pasar de plaza, o
   la sección salta cada cinco segundos y arrastra todo lo que tiene debajo. El
   mapa lo resuelve con un alto propio.

   El texto lo resuelve apilando LAS CUATRO plazas en la misma celda, tres
   invisibles: la celda toma el alto de la más alta y no hay que adivinar cuál
   es. Probé con un solo espaciador —el de la descripción más larga— y la
   sección seguía saltando 54px: lo que crece en Silicon Valley no es la
   descripción sino el NOMBRE, que a ese cuerpo se parte en dos líneas. Con las
   cuatro apiladas eso deja de importar.

   ── El nombre completo ──
   Bajo el nombre va el país: «Silicon Valley» y «Miami» son lugares, no países,
   y un mapa que muestra el condado de Santa Clara sin decir Estados Unidos deja
   al que mira adivinando qué está viendo. */

const RONDA = 5200 // ms que se queda en cada plaza antes de pasar a la siguiente

function Titulo({ plaza, className, ...resto }) {
  return (
    <div className={className} {...resto}>
      <p className="font-sans text-[.66rem] font-semibold uppercase tracking-[.16em] text-lima-2">
        {plaza.tag}
      </p>

      <h3 className="mt-[.5rem] font-sans text-[clamp(2rem,3.4vw,3.4rem)] font-semibold uppercase leading-[1] tracking-[-.02em]">
        {plaza.nombre}
      </h3>

      <p className="mt-[.35rem] font-sans text-[.72rem] uppercase tracking-[.16em] text-muted-2">
        {plaza.pais}
      </p>

      <p className="mt-[1rem] max-w-[34ch] text-bajada font-normal text-read">{plaza.texto}</p>
    </div>
  )
}

export function Presencia() {
  const { activo, corriendo, ref, elegir, pausar } = useRotacion(PRESENCIA.plazas.length, RONDA)
  const plaza = PRESENCIA.plazas[activo]
  const contorno = CONTORNOS[plaza.contorno]

  return (
    <Section id={PRESENCIA.id} className="overflow-hidden" ref={ref} {...pausar}>
      {/* Guías verticales de la referencia. Van detrás de todo y alineadas con
          la columna del sitio, así no son un patrón suelto sino la retícula. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 grid w-full max-w-maxw -translate-x-1/2 grid-cols-4 px-g"
      >
        <span className="border-l border-hair/50" />
        <span className="border-l border-hair/50" />
        <span className="border-l border-hair/50" />
        <span className="border-x border-hair/50" />
      </div>

      <div className="grid gap-[clamp(2.4rem,3.4vw,3.6rem)] min-[1000px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.5fr)_minmax(0,.7fr)]">
        {/* encabezado arriba, la plaza que está sonando apoyada en el pie */}
        <div className="flex flex-col justify-between gap-[clamp(2.4rem,8vh,5rem)]">
          <div>
            <Reveal>
              <Kicker>{PRESENCIA.kicker}</Kicker>
            </Reveal>

            {/* Más chico que el text-sec de todas las demás secciones, a
                propósito y sólo acá: el que manda en esta sección es el nombre
                de la plaza, que está abajo a 3.4vw. Con los dos al mismo cuerpo
                se peleaban y el mapa quedaba de fondo de dos titulares. */}
            <Reveal
              as="h2"
              delay={0.05}
              className="mt-[-0.2rem] text-[clamp(1.45rem,2.1vw,2.3rem)] font-normal leading-[1.14] tracking-[-.02em]"
            >
              <Rich texto={PRESENCIA.titulo} />
            </Reveal>

            <Reveal
              as="p"
              delay={0.1}
              className="mt-[.9rem] max-w-[32ch] text-[.82rem] leading-[1.65] font-normal text-read"
            >
              {PRESENCIA.bajada}
            </Reveal>
          </div>

          {/* Las cuatro apiladas en una celda fijan el alto; la que está sonando
              va encima.

              El pb despega el bloque del borde de abajo de la sección: con
              justify-between quedaba calzado contra el filo y el nombre —que es
              lo más grande de la sección— se leía como que se caía. */}
          <div className="grid *:col-start-1 *:row-start-1 pb-[clamp(1.5rem,6vh,4.5rem)]">
            {PRESENCIA.plazas.map((p) => (
              <Titulo key={p.nombre} plaza={p} aria-hidden className="invisible" />
            ))}

            {/* key: al cambiar de plaza React desmonta y remonta, que es lo que
                rearranca la animación de entrada. Sin esto el texto cambiaría de
                golpe y sólo se animaría la primera vez. */}
            <Titulo
              key={plaza.nombre}
              plaza={plaza}
              className="self-end animate-aparece motion-reduce:animate-none"
            />
          </div>
        </div>

        {/* El mapa manda en la sección, así que se lleva el alto. El tope en vh
            y no en px es lo que evita que en una pantalla baja empuje al resto
            fuera de la vista.

            En una sola columna el alto baja: ahí la silueta la limita el ancho
            de la pantalla, no el alto, y con el alto de escritorio quedaban
            170px de vacío arriba y abajo del contorno. */}
        <Reveal
          delay={0.14}
          className="relative flex h-[clamp(230px,42vh,400px)] items-center justify-center min-[1000px]:h-[clamp(300px,62vh,660px)]"
        >
          <svg
            key={plaza.nombre}
            viewBox={contorno.viewBox}
            role="img"
            aria-label={`Contorno de ${plaza.nombre}, ${plaza.pais}`}
            preserveAspectRatio="xMidYMid meet"
            className="h-full w-auto max-w-full fill-lima/80 animate-aparece motion-reduce:animate-none"
          >
            <path d={contorno.d} fillRule="evenodd" />
          </svg>
        </Reveal>

        <div className="flex flex-col justify-center">
          {/* Botones y no una lista: elegir una plaza cambia lo que se ve al
              centro, así que es un control y tiene que llegar por teclado.
              aria-pressed dice cuál está puesta. */}
          <ul className="grid gap-[clamp(.5rem,1vh,.9rem)]">
            {PRESENCIA.plazas.map((p, i) => (
              <li key={p.nombre}>
                <button
                  type="button"
                  onClick={() => elegir(i)}
                  aria-pressed={i === activo}
                  className={cx(
                    'w-full cursor-pointer border-b py-[.7rem] text-left font-sans text-[.92rem]',
                    'transition-[border-color,color] duration-350 ease-soft',
                    i === activo
                      ? 'border-lima text-lima'
                      : 'border-hair text-read-2 hover:border-hair-lima hover:text-read-hi',
                  )}
                >
                  {p.nombre}
                </button>

                {/* Cuánto falta para la próxima. Se rearranca con `key` en cada
                    vuelta y se congela cuando la rotación se frena — si siguiera
                    corriendo con el mouse encima estaría mintiendo. */}
                <span aria-hidden className="block h-px bg-hair">
                  {i === activo && (
                    <span
                      key={`${plaza.nombre}-${corriendo}`}
                      style={{ animationDuration: `${RONDA}ms` }}
                      className={cx(
                        'block h-px origin-left bg-lima animate-barra motion-reduce:hidden',
                        !corriendo && '[animation-play-state:paused]',
                      )}
                    />
                  )}
                </span>
              </li>
            ))}
          </ul>

          {/* donde la referencia pone la leyenda del degradado. La atribución de
              OpenStreetMap es obligatoria, no cortesía. */}
          <Reveal
            as="p"
            delay={0.4}
            className="mt-[clamp(1.6rem,2.6vw,2.4rem)] text-[.7rem] leading-[1.6] text-muted-2"
          >
            {PRESENCIA.atribucion.antes}
            <a
              href={PRESENCIA.atribucion.href}
              target="_blank"
              rel="noopener"
              className="border-b border-hair transition-colors duration-250 hover:border-hair-lima hover:text-lima"
            >
              {PRESENCIA.atribucion.enlace}
            </a>
            {PRESENCIA.atribucion.despues}
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
