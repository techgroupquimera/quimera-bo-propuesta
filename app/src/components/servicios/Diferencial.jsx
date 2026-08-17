import { DIFERENCIAL } from '../../content/servicios'
import { Checks } from '../ui/Checks'
import { Eyebrow, Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Wireframe: el titular en una línea corta arriba, la cita ocupando cuatro
   líneas de ancho casi completo, y los tres puntos en una fila al pie.

   La cita acá NO usa <Cita>. Ese componente la trata como apoyo de un titular
   —barra lima al costado, cuerpo intermedio— y en esta sección la relación se
   da vuelta: la frase es la sección y el h2 es la entrada. Va a cuerpo de
   titular, al ras del margen izquierdo y sin barra, porque una barra a 60px de
   cuerpo pinta un bloque de color al costado en vez de marcar una cita. Las
   comillas angulares ya vienen en el texto y la firma va debajo.

   Pendiente pedido: revelar la frase palabra por palabra con el scroll. Va en
   un solo nodo de texto a propósito — partirla en <span> ahora sería markup
   muerto hasta que exista el efecto. */
export function Diferencial() {
  return (
    <Section id={DIFERENCIAL.id}>
      <Reveal>
        <Kicker>{DIFERENCIAL.kicker}</Kicker>
      </Reveal>

      <Reveal as="h2" className="mt-[-0.3rem] text-sec font-normal">
        <Rich texto={DIFERENCIAL.titulo} />
      </Reveal>

      {/* El cuerpo sale de un clamp propio y no de --text-sec: es el único
          texto del sitio entre el titular de sección (44px) y el del hero
          (99px), y ese salto es lo que lo hace destacar. */}
      <Reveal
        as="blockquote"
        delay={0.07}
        className="mt-[clamp(1.8rem,3.4vw,3rem)] text-[clamp(1.55rem,4.2vw,3.85rem)] font-normal leading-[1.18] tracking-[-.03em] text-read-hi"
      >
        {DIFERENCIAL.cita.texto}
      </Reveal>

      <Reveal delay={0.14} className="mt-[clamp(1.1rem,1.6vw,1.5rem)]">
        <Eyebrow>{DIFERENCIAL.cita.firma}</Eyebrow>
      </Reveal>

      <Reveal delay={0.2} className="mt-[clamp(2.8rem,5vw,4.6rem)]">
        <Checks items={DIFERENCIAL.puntos} grilla negritaLima />
      </Reveal>
    </Section>
  )
}
