import { SISTEMAS } from '../../content/home'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'
import { TarjetasEscalonadas } from '../ui/TarjetasEscalonadas'

/* Según wireframe y referencia: encabezado partido —kicker y titular a la
   izquierda, bajada alineada a la derecha— y cuatro tarjetas altas escalonadas,
   con una en el color de acento.

   Antes eran cuatro cajas de vidrio iguales en una fila pareja, que es el
   patrón que el propio panel de revisión marca como «lo que todavía se lee
   hecho por IA». El escalonado y la tarjeta en lima rompen la repetición sin
   agregar contenido que no existe.

   La referencia pone una etiqueta («Insights», «Automation») arriba de cada
   tarjeta. Acá no hay ese dato y no se inventa: ese lugar lo ocupa el ícono, y
   el título con su texto bajan al pie, como en la referencia. */
export function Sistemas() {
  return (
    <Section id={SISTEMAS.id}>
      {/* items-start y no -end: con los CTA colgando de la bajada, la columna
          derecha es la más alta y alinear por abajo empujaba el kicker y el
          titular hacia el medio, dejando un hueco arriba a la izquierda.
          La columna mide 28rem para que los dos botones entren en una fila. */}
      <div className="grid gap-[clamp(1.4rem,3vw,4rem)] min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] min-[900px]:items-start">
        <div>
          <Reveal>
            <Kicker>{SISTEMAS.kicker}</Kicker>
          </Reveal>

          {/* margen negativo, no cero: el titular arrastra ~14px de aire
              propio arriba de las mayúsculas (media interlínea + la distancia
              de la caja de la fuente a la altura de X). Con mt-0 el hueco
              contra el kicker seguía siendo el doble del que se ve. */}
          <Reveal as="h2" className="mt-[-0.3rem] text-sec font-normal">
            <Rich texto={SISTEMAS.titulo} />
          </Reveal>
        </div>

        {/* Los CTA cuelgan de la bajada, no de las tarjetas: cierran la
            columna de texto en vez de quedar sueltos al pie de la sección. */}
        <div>
          <Reveal
            as="p"
            delay={0.07}
            className="text-bajada font-normal text-read min-[900px]:text-right"
          >
            {SISTEMAS.bajada}
          </Reveal>

          {/* Una sola fila, uno contra cada borde de la columna. En móvil sí
              pueden envolver: a 430px los dos juntos no entran. */}
          <Reveal
            as="p"
            delay={0.14}
            className="mt-[1.6rem] flex flex-wrap gap-[.7rem] min-[900px]:flex-nowrap min-[900px]:justify-between"
          >
            {SISTEMAS.ctas.map((cta) => (
              <Button key={cta.href} href={cta.href} flecha>
                {cta.label}
              </Button>
            ))}
          </Reveal>
        </div>
      </div>

      <TarjetasEscalonadas
        piezas={SISTEMAS.piezas}
        className="mt-[clamp(2.6rem,5vw,4.5rem)]"
      />
    </Section>
  )
}
