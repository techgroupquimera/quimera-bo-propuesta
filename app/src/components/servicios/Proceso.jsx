import { PROCESO } from '../../content/servicios'
import { Kicker } from '../ui/Kicker'
import { Pend } from '../ui/Pend'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Wireframe: el encabezado arriba a la izquierda y los pasos apilados en la
   columna derecha. La izquierda queda vacía debajo del titular a propósito —es
   el aire que hace que la columna de pasos se lea como una sola tirada.

   Va como <ol>: es una secuencia numerada, y un lector de pantalla tiene que
   anunciar «lista de 5 elementos» y no cinco bloques sueltos.

   El riel lo dibuja el ::before de cada paso, desde debajo de su nodo hasta el
   final de su caja; el último lo oculta. Así el riel termina en el nodo 05 en
   vez de seguir de largo hasta el borde de la sección, sin tener que calcular
   ningún alto.

   Sin animar, como se pidió. Lo único que se mueve es el Reveal de entrada que
   ya usa todo el sitio. */
export function Proceso() {
  return (
    <Section id={PROCESO.id}>
      <div className="grid gap-[clamp(2.4rem,5vw,5rem)] min-[900px]:grid-cols-2 min-[900px]:items-start">
        <div>
          <Reveal>
            <Kicker>{PROCESO.kicker}</Kicker>
          </Reveal>

          {/* 26ch y no 20: el titular mide 523px y a 20ch la caja daba 528 —
              cinco píxeles antes de partirse solo */}
          <Reveal as="h2" className="mt-[-0.3rem] max-w-[26ch] text-sec font-normal">
            <Rich texto={PROCESO.titulo} />
          </Reveal>
        </div>

        <ol>
          {PROCESO.pasos.map((paso, i) => (
            <Reveal
              as="li"
              key={paso.n}
              delay={i * 0.06}
              className="relative grid grid-cols-[2.6rem_minmax(0,1fr)] gap-x-[clamp(.9rem,1.4vw,1.4rem)] pb-[clamp(1rem,1.5vw,1.3rem)] before:absolute before:bottom-0 before:left-[1.3rem] before:top-[2.9rem] before:w-px before:-translate-x-1/2 before:bg-hair-lima last:pb-0 last:before:hidden"
            >
              {/* el nodo va en Bebas: los números del sitio son de esa familia */}
              <span
                aria-hidden
                className="grid h-[2.6rem] w-[2.6rem] place-items-center rounded-full border border-hair-lima bg-lima/8 font-display text-[1.1rem] font-normal leading-none text-lima"
              >
                {paso.n}
              </span>

              <div className="rounded-[clamp(12px,1.1vw,16px)] border border-hair bg-white/2.5 px-[clamp(1.1rem,1.6vw,1.5rem)] py-[clamp(.9rem,1.3vw,1.2rem)] transition-[background,border-color] duration-500 ease-soft hover:border-hair-lima hover:bg-white/5">
                <h3 className="text-card font-medium">{paso.titulo}</h3>
                <p className="mt-[.4rem] text-body-m text-read-2">{paso.texto}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal as="p" className="mt-[clamp(2rem,3.4vw,3rem)] text-[.82rem]">
        <Pend nota={PROCESO.pend.nota}>{PROCESO.pend.texto}</Pend>
      </Reveal>
    </Section>
  )
}
