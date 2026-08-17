import { CONSTRUIMOS } from '../../content/servicios'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'
import { TarjetasEscalonadas } from '../ui/TarjetasEscalonadas'

/* Mismo wireframe que «Nuestra propuesta» del home, así que comparte el
   componente de tarjetas escalonadas.

   El encabezado va sólo con kicker y titular: el original de servicios.html no
   trae párrafo para esta sección. El wireframe dibuja dos líneas arriba a la
   derecha —donde en el home va la bajada— y acá esa columna queda libre a
   propósito, antes que rellenarla con texto inventado. */
export function Construimos() {
  return (
    <Section id={CONSTRUIMOS.id}>
      {/* El tope va en el h2, no en un div de afuera: ch se resuelve contra la
          fuente del elemento que lo lleva, así que en el contenedor mide los
          17px del body y no los 44px del titular. Estos 30ch son 30 anchos de
          dígito del propio título: entra «Un solo sistema, tuyo,» y el salto lo
          sigue mandando el texto. */}
      <div>
        <Reveal>
          <Kicker>{CONSTRUIMOS.kicker}</Kicker>
        </Reveal>

        <Reveal as="h2" className="mt-[-0.3rem] max-w-[30ch] text-sec font-normal">
          <Rich texto={CONSTRUIMOS.titulo} />
        </Reveal>
      </div>

      <TarjetasEscalonadas piezas={CONSTRUIMOS.piezas} className="mt-[clamp(2.6rem,5vw,4.5rem)]" />
    </Section>
  )
}
