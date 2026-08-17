import { ArrowUpRight } from 'lucide-react'
import { SITIOS } from '../../content/proyectos'
import { useDesplegable } from '../../hooks/useDesplegable'
import { Kicker } from '../ui/Kicker'
import { Pend } from '../ui/Pend'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'
import { VerMas } from '../ui/VerMas'

/* Wireframe: encabezado centrado, las obras en dos columnas y un botón al pie.

   Se abren de a cuatro. Son doce capturas de pantalla y tirarlas todas de una
   es justo lo que hacía sentir la página como «todo en un solo lugar» — además
   de doce imágenes cargando de entrada. Las que están ocultas ni se montan, así
   que tampoco pesan hasta que alguien las pide.

   Cada obra es un <a> entero y no una tarjeta con un enlace adentro: el titular
   de la sección dice «entrá y miralos», así que toda la ficha tiene que llevar
   al sitio. Abre en pestaña nueva — son sitios de terceros. */

/* Las capturas vienen en dos proporciones (2.2:1 y 16:9). Forzarlas a una sola
   es lo que empareja las filas; recorta por abajo, que en una captura de web es
   lo que menos identifica al sitio. */
const CAPTURA = 'aspect-[2.2/1] w-full object-cover object-top'

function Obra({ obra }) {
  return (
    <a
      href={obra.href}
      target="_blank"
      rel="noopener"
      className="group block overflow-hidden rounded-[clamp(14px,1.3vw,20px)] border border-hair bg-white/2.5 transition-[background,border-color] duration-350 ease-soft hover:border-hair-lima hover:bg-white/5"
    >
      <img
        src={obra.img}
        alt={`Sitio de ${obra.nombre}`}
        loading="lazy"
        decoding="async"
        className={CAPTURA}
      />

      <div className="p-[clamp(1.1rem,1.6vw,1.6rem)]">
        <h3 className="text-card font-medium">{obra.nombre}</h3>

        <p className="mt-[.5rem] text-body-m text-read-2">
          <Rich texto={obra.texto} />
        </p>

        <p className="mt-[.9rem] inline-flex items-center gap-[.35rem] font-sans text-[.82rem] text-lima-2 transition-colors duration-250 group-hover:text-lima">
          {obra.url}
          <ArrowUpRight aria-hidden strokeWidth={2} className="h-[.95em] w-[.95em]" />
          {obra.pend && <Pend nota={obra.pend.nota}>{obra.pend.texto}</Pend>}
        </p>
      </div>
    </a>
  )
}

export function Sitios() {
  const { lista, abierto, alternar, ocultas } = useDesplegable(SITIOS.obras, SITIOS.visibles)

  return (
    <Section id={SITIOS.id}>
      <div className="mx-auto max-w-[64ch] text-center">
        <Reveal>
          <Kicker>{SITIOS.kicker}</Kicker>
        </Reveal>

        <Reveal as="h2" className="mt-[-0.3rem] text-sec font-normal">
          <Rich texto={SITIOS.titulo} />
        </Reveal>

        <Reveal as="p" delay={0.07} className="mt-[1.2rem] text-bajada font-normal text-read">
          {SITIOS.bajada}
        </Reveal>
      </div>

      <div className="mt-[clamp(2.6rem,5vw,4.4rem)] grid gap-[clamp(1rem,1.6vw,1.8rem)] min-[820px]:grid-cols-2">
        {lista.map((obra, i) => (
          /* el retraso sólo escalona las cuatro primeras: al abrir el resto, un
             escalonado de ocho deja la última entrando medio segundo tarde */
          <Reveal key={obra.href} delay={(i % SITIOS.visibles) * 0.06}>
            <Obra obra={obra} />
          </Reveal>
        ))}
      </div>

      {ocultas > 0 && (
        <VerMas
          abierto={abierto}
          onClick={alternar}
          mas={SITIOS.masLabel}
          menos={SITIOS.menosLabel}
        />
      )}
    </Section>
  )
}
