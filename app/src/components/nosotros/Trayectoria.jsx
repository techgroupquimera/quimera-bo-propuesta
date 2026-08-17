import { TRAYECTORIA } from '../../content/nosotros'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Las cuatro cifras del original, en fila. Van en Bebas, que es la familia que
   el brandboard reserva para cifras y etiquetas — la misma de las fichas de
   datos de la placa.

   Sin bajada porque el original tampoco la tiene: acá el titular y los números
   dicen todo, y una frase de relleno debajo sólo separaría las dos cosas que
   tienen que leerse juntas. */
export function Trayectoria() {
  return (
    <Section id={TRAYECTORIA.id}>
      <div>
        <Reveal>
          <Kicker>{TRAYECTORIA.kicker}</Kicker>
        </Reveal>

        <Reveal as="h2" className="mt-[-0.3rem] text-sec font-normal">
          <Rich texto={TRAYECTORIA.titulo} />
        </Reveal>
      </div>

      <dl className="mt-[clamp(2.4rem,4.5vw,4rem)] grid gap-[clamp(1.4rem,2.6vw,2.6rem)] min-[560px]:grid-cols-2 min-[980px]:grid-cols-4">
        {TRAYECTORIA.cifras.map((cifra, i) => (
          <Reveal key={cifra.valor} delay={i * 0.06} className="border-t border-hair pt-[1.1rem]">
            <dt className="font-display text-[clamp(2.6rem,4.4vw,4rem)] font-normal uppercase leading-[.86] tracking-[.01em] text-lima">
              {cifra.valor}
            </dt>

            <dd className="mt-[.9rem] max-w-[26ch] text-[.88rem] leading-[1.55] text-read-2">
              {cifra.etiqueta}
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  )
}
