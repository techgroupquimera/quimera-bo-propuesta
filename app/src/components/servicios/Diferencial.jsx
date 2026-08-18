import { DIFERENCIAL } from '../../content/servicios'
import { Checks } from '../ui/Checks'
import { Eyebrow, Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Se parte una vez, al cargar el módulo, y no en cada render. El texto no
   lleva énfasis ni saltos, así que cortar por espacios lo reconstruye igual. */
const PALABRAS = DIFERENCIAL.cita.texto.split(' ')

/* Wireframe: el titular en una línea corta arriba, la cita ocupando cuatro
   líneas de ancho casi completo, y los tres puntos en una fila al pie.

   La cita acá NO usa <Cita>. Ese componente la trata como apoyo de un titular
   —barra lima al costado, cuerpo intermedio— y en esta sección la relación se
   da vuelta: la frase es la sección y el h2 es la entrada. Va a cuerpo de
   titular, al ras del margen izquierdo y sin barra, porque una barra a 60px de
   cuerpo pinta un bloque de color al costado en vez de marcar una cita. Las
   comillas angulares ya vienen en el texto y la firma va debajo.

   La frase se llena palabra por palabra con el scroll. Cada palabra es un
   <span> con su índice, y quien las enciende es una animación atada al scroll
   —no hay JavaScript—: la regla está en index.css, bajo @supports, así que
   donde no haya scroll timelines la frase sale completa y quieta.

   El <Reveal> del bloque se fue: escondía la frase entera para traerla de
   golpe al cruzar el umbral, que es exactamente lo que el revelado por palabra
   reemplaza. Los dos juntos eran dos entradas peleando por el mismo texto. */
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
          (99px), y ese salto es lo que lo hace destacar.

          La itálica es la de todas las citas del sitio; el tamaño NO es el del
          original, que acá la trata como una <Cita> más con barra lima. Esta
          sección invierte la relación —la frase es la sección y el h2 es la
          entrada—, así que se queda a cuerpo de titular.

          El interletrado se afloja de -.03 a -.02em: a 60px, el -.03 estaba
          calculado para la Manrope y sobre la itálica junta demasiado. */}
      <blockquote
        style={{ '--n': PALABRAS.length }}
        className="revela-scroll mt-[clamp(1.8rem,3.4vw,3rem)] font-serif text-[clamp(1.55rem,4.2vw,3.85rem)] font-normal italic leading-[1.18] tracking-[-.02em] text-read-hi"
      >
        {PALABRAS.map((palabra, i) => (
          /* el <span> queda inline: así la frase sigue cortando líneas donde
             corresponde y el espacio entre palabras es un espacio de verdad */
          <span key={`${i}-${palabra}`} className="palabra" style={{ '--i': i }}>
            {palabra}{' '}
          </span>
        ))}
      </blockquote>

      <Reveal delay={0.14} className="mt-[clamp(1.1rem,1.6vw,1.5rem)]">
        <Eyebrow>{DIFERENCIAL.cita.firma}</Eyebrow>
      </Reveal>

      <Reveal delay={0.2} className="mt-[clamp(2.8rem,5vw,4.6rem)]">
        <Checks items={DIFERENCIAL.puntos} grilla negritaLima />
      </Reveal>
    </Section>
  )
}
