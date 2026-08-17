import { ArrowUpRight } from 'lucide-react'
import { DESTACADO } from '../../content/proyectos'
import { useMedia } from '../overlays/MediaContext'
import { Kicker } from '../ui/Kicker'
import { Pend } from '../ui/Pend'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Wireframe: a la izquierda el nombre del caso, la bajada y la imagen; a la
   derecha los cuatro puntos numerados del 1 al 4, en dos columnas.

   El número va DESPUÉS del texto, como lo dibuja el wireframe. No es una
   secuencia —son cuatro cosas que hace el agente, no cuatro pasos— así que el
   número no manda la lectura: los cuatro alineados al margen derecho arman una
   columna que ordena el bloque sin decir «primero esto, después esto».

   La imagen es el mockup apaisado del agente y llena la mitad izquierda. */
export function Destacado() {
  const { abrirVisor } = useMedia()

  const abrir = () =>
    abrirVisor({ tipo: 'imagen', src: DESTACADO.completa, alt: DESTACADO.foto.alt })

  return (
    <Section id={DESTACADO.id}>
      {/* Mitades iguales: el mockup es apaisado 4:3, así que la columna
          izquierda puede tomar todo el ancho que le toca sin volverse una
          columna altísima. */}
      <div className="grid gap-[clamp(2.4rem,5vw,5rem)] min-[900px]:grid-cols-2">
        <div>
          <Reveal>
            <Kicker>{DESTACADO.kicker}</Kicker>
          </Reveal>

          {/* más chico que un t-sec: es el nombre de un cliente, no una
              afirmación de la empresa. Así lo trae el original. */}
          <Reveal
            as="h2"
            className="mt-[-0.2rem] text-[clamp(1.9rem,3.4vw,3rem)] font-normal leading-[1.1] tracking-[-.025em]"
          >
            {DESTACADO.titulo}
          </Reveal>

          <Reveal as="p" delay={0.06} className="mt-[1.2rem] text-bajada font-normal text-read">
            {DESTACADO.bajada}
          </Reveal>

          {/* la imagen no llena la columna: el mockup ya trae mucho aire blanco
              alrededor del teléfono, y a ancho completo ese margen pesaba más
              que la conversación */}
          <Reveal
            delay={0.12}
            className="mt-[clamp(1.8rem,3vw,2.6rem)] max-w-[clamp(280px,42vw,700px)]"
          >
            <button
              type="button"
              onClick={abrir}
              className="group block w-full cursor-pointer overflow-hidden rounded-[clamp(14px,1.3vw,20px)] border border-hair bg-transparent p-0 transition-colors duration-350 ease-soft hover:border-hair-lima"
            >
              <img
                src={DESTACADO.foto.src}
                alt={DESTACADO.foto.alt}
                loading="lazy"
                decoding="async"
                className="w-full"
              />
            </button>

            <p className="mt-[1.1rem] flex flex-wrap items-center gap-x-[.9rem] gap-y-[.6rem]">
              <button
                type="button"
                onClick={abrir}
                className="group inline-flex cursor-pointer items-center gap-[.35rem] border-0 bg-transparent p-0 font-sans text-[.82rem] text-lima-2 transition-colors duration-250 hover:text-lima"
              >
                {DESTACADO.verLabel}
                <ArrowUpRight aria-hidden strokeWidth={2} className="h-[.95em] w-[.95em]" />
              </button>

              <Pend nota={DESTACADO.pend.nota}>{DESTACADO.pend.texto}</Pend>
            </p>
          </Reveal>
        </div>

        {/* Los cuatro en dos columnas, apoyados abajo como en el wireframe: la
            segunda fila cierra a la altura del pie de la columna izquierda.

            El hueco entre filas es bastante mayor que el de columnas: es el que
            se ve de verdad. Agrandar el de columnas sólo angosta el texto —el
            ancho de la mitad derecha es fijo— y a cuatro palabras por línea deja
            de respirar en vez de empezar. */}
        <ol className="grid gap-x-[clamp(1.3rem,3vw,3rem)] gap-y-[clamp(1.8rem,4vw,4rem)] min-[560px]:grid-cols-2 min-[900px]:content-end">
          {DESTACADO.puntos.map((punto, i) => (
            <Reveal
              as="li"
              key={punto}
              delay={i * 0.06}
              className="flex items-start gap-[clamp(1rem,1.7vw,1.7rem)]"
            >
              <p className="flex-1 text-body-m text-read-2">
                <Rich texto={punto} />
              </p>

              <span
                aria-hidden
                className="grid h-[clamp(52px,4.3vw,74px)] w-[clamp(52px,4.3vw,74px)] shrink-0 place-items-center rounded-[clamp(11px,1vw,16px)] border border-hair-lima bg-lima/8 font-display text-[clamp(1.6rem,2.2vw,2.4rem)] font-normal leading-none text-lima"
              >
                {i + 1}
              </span>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  )
}
