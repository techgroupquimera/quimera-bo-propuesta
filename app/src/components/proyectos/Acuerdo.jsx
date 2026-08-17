import { ACUERDO } from '../../content/proyectos'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'
import { Pend } from '../ui/Pend'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Wireframe: el encabezado abajo a la izquierda y los seis sistemas en una tira
   de barras a la derecha. Mismo eje que «Producción audiovisual» —encabezado
   apoyado en el pie de la columna— y por la misma razón: la tira de la derecha
   es más alta que el texto, así que alinear arriba dejaba el bloque de la
   izquierda flotando contra un vacío.

   Es la única sección de la página sin una sola imagen, y eso es a favor: seis
   sistemas anónimos justo después de veintiséis piezas de campaña se leen mejor
   como una lista sobria que como otra grilla de tarjetas.

   Cada barra lleva el nombre arriba y lo que hace abajo, como el original. En
   una sola línea no entran: los dos textos juntos pasan de ochenta caracteres y
   la columna no llega a la mitad del ancho de la página.

   El punto lima es el mismo de las fichas de agentes — dice «esto está
   corriendo», que es justamente lo que no se puede probar con un enlace acá. */
const BARRA =
  'flex items-start gap-[.9rem] rounded-[clamp(12px,1vw,16px)] border border-hair bg-white/2.5 ' +
  'px-[clamp(1.1rem,1.6vw,1.5rem)] py-[clamp(.95rem,1.3vw,1.15rem)]'

export function Acuerdo() {
  return (
    <Section id={ACUERDO.id}>
      <div className="grid gap-[clamp(2.4rem,4vw,4.5rem)] min-[980px]:grid-cols-2 min-[980px]:items-end">
        <div>
          <Reveal>
            <Kicker>{ACUERDO.kicker}</Kicker>
          </Reveal>

          {/* el tope va en el h2 y no en un div de afuera: `ch` se mide contra
              la fuente del elemento que lleva la clase, y en el contenedor sale
              el cuerpo de párrafo — un tercio de lo que uno cree estar pidiendo */}
          <Reveal as="h2" className="mt-[-0.3rem] max-w-[16ch] text-sec font-normal">
            <Rich texto={ACUERDO.titulo} />
          </Reveal>

          <Reveal
            as="p"
            delay={0.07}
            className="mt-[1.2rem] max-w-[46ch] text-bajada font-normal text-read"
          >
            {ACUERDO.bajada}
          </Reveal>

          <Reveal
            delay={0.14}
            className="mt-[clamp(1.6rem,2.6vw,2.2rem)] flex flex-wrap items-center gap-[.8rem]"
          >
            <Button href={ACUERDO.cta.href} flecha>
              {ACUERDO.cta.label}
            </Button>

            <Pend nota={ACUERDO.pend.nota}>{ACUERDO.pend.texto}</Pend>
          </Reveal>
        </div>

        <ul className="grid gap-[clamp(.5rem,.8vw,.8rem)]">
          {ACUERDO.sistemas.map((sistema, i) => (
            <Reveal as="li" key={sistema.nombre} delay={i * 0.04} className={BARRA}>
              <span
                aria-hidden
                className="mt-[.55rem] h-1.75 w-1.75 shrink-0 animate-dot rounded-full bg-lima shadow-[0_0_10px_var(--color-lima)]"
              />

              <span>
                <span className="block text-card font-medium">{sistema.nombre}</span>

                <span className="mt-[.3rem] block text-body-m text-read-2">
                  <Rich texto={sistema.texto} />
                </span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
