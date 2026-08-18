import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ACCESOS } from '../../content/proyectos'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Las dos puertas de /proyectos: tecnología y marketing.

   Son dos tarjetas del mismo material que las de «Nuestra propuesta» del home
   —foto de fondo, vidrio sobre el pie, hairline lima al pasar el mouse— pero
   acá el nodo es un <Link> y no un <article>: toda la tarjeta es el destino,
   no un texto con un enlace adentro.

   Dos columnas y no cuatro: son dos destinos, y a media pantalla cada uno la
   foto se lee como una pieza de trabajo y no como una miniatura. Debajo de
   760px se apilan.

   La proporción es fija (16:11) y no un alto mínimo: las dos fotos son
   apaisadas —un sitio y la tapa de un manual—, así que el encuadre que las
   respeta es ancho. Con un min-height, en dos columnas anchas quedaban dos
   franjas y no se veía de qué eran. */
export function Accesos() {
  return (
    <Section borde={false}>
      <div className="grid gap-[clamp(1rem,1.6vw,1.6rem)] min-[760px]:grid-cols-2">
        {ACCESOS.map((acceso, i) => (
          <Reveal key={acceso.id} delay={i * 0.07}>
            <Link
              to={acceso.href}
              className="group relative isolate flex aspect-16/11 flex-col justify-end overflow-hidden rounded-[clamp(16px,1.4vw,22px)] border border-white/12 bg-white/[.02] p-[clamp(1.4rem,2vw,2.2rem)] shadow-[0_20px_44px_-30px_rgba(0,0,0,.95)] transition-[border-color] duration-500 ease-soft hover:border-hair-lima"
            >
              {/* La foto: desaturada y al 42%, como en las tarjetas del home.
                  Son capturas de trabajo real —con sus azules, sus verdes y sus
                  rosas— y a brillo pleno le pelean el único color de la marca. */}
              <img
                src={acceso.imagen}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover object-top opacity-[.42] [filter:saturate(.45)_contrast(1.06)] transition-[opacity,transform] duration-700 ease-soft group-hover:scale-[1.04] group-hover:opacity-[.6] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />

              {/* el vidrio, sólo donde va el texto */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[62%] bg-white/[.03] mask-vidrio backdrop-blur-[16px]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-ink/94 via-ink/72 to-ink/34"
              />

              <Kicker>{acceso.kicker}</Kicker>

              {/* h2 y no h3: en esta página no hay un titular de sección arriba
                  al que colgarse — las dos tarjetas SON las secciones. */}
              <h2 className="mt-[.5rem] text-[clamp(1.6rem,2.6vw,2.4rem)] font-normal leading-[1.1] tracking-[-.02em]">
                <Rich texto={acceso.titulo} />
              </h2>

              <p className="mt-[.7rem] max-w-[46ch] text-body-m text-read-2">{acceso.texto}</p>

              <span className="mt-[1.2rem] inline-flex items-center gap-[.55rem] font-sans text-[.9rem] font-medium text-lima">
                Ver los proyectos
                <ArrowRight
                  aria-hidden
                  strokeWidth={2.2}
                  className="h-[1.05em] w-[1.05em] transition-transform duration-300 ease-soft group-hover:translate-x-[.2em]"
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
