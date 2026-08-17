import { COMPROMISO } from '../../content/nosotros'
import { Checks } from '../ui/Checks'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* El split del original: encabezado a la izquierda y los cuatro compromisos a
   la derecha, con la misma lista de tildes que usan /servicios y /tecnologia.

   El texto se alinea al centro de la columna: la lista es más alta que el
   encabezado, y arriba dejaba al titular flotando contra un vacío. */
export function Compromiso() {
  return (
    <Section id={COMPROMISO.id}>
      <div className="grid gap-[clamp(2rem,4vw,4rem)] min-[900px]:grid-cols-2 min-[900px]:items-center">
        <div>
          <Reveal>
            <Kicker>{COMPROMISO.kicker}</Kicker>
          </Reveal>

          <Reveal as="h2" className="mt-[-0.3rem] text-sec font-normal">
            <Rich texto={COMPROMISO.titulo} />
          </Reveal>

          <Reveal
            as="p"
            delay={0.07}
            className="mt-[1.2rem] max-w-[42ch] text-bajada font-normal text-read"
          >
            {COMPROMISO.bajada}
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <Checks items={COMPROMISO.puntos} />
        </Reveal>
      </div>
    </Section>
  )
}
