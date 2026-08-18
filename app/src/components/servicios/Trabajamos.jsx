import { TRABAJAMOS } from '../../content/servicios'
import { cx } from '../../lib/cx'
import { Button } from '../ui/Button'
import { Cita } from '../ui/Cita'
import { Eyebrow, Kicker } from '../ui/Kicker'
import { PanelVerde } from '../ui/PanelVerde'
import { Pend } from '../ui/Pend'
import { Reel } from '../ui/Reel'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'

const { implementado: IMPL } = TRABAJAMOS

/* Wireframe: un panel con el texto a la izquierda y el reel vertical a la
   derecha, y debajo —ya fuera del panel— la franja de pastillas.

   El panel es el mismo verde que las dos secciones con reel del home: en todo
   el sitio «la que trae video va sobre panel», así que reusarlo agrupa las tres
   en vez de inventar una superficie nueva para la misma idea.

   La cita se queda en la columna de texto y no arriba del video como en el
   home: acá mide seis líneas y en una columna de 400px empujaría el reel media
   pantalla hacia abajo. En la columna ancha entra en tres.

   El reel va a 400px como los otros dos del sitio. Son los únicos videos y a
   distinto tamaño se leen como un descuido. */
export function Trabajamos() {
  return (
    <PanelVerde id={TRABAJAMOS.id} sangre pie={<Implementado />}>
      {/* items-center: el reel es bastante más alto que el texto, así que el
          texto se centra contra él y el video ocupa el alto del panel — que es
          como lo dibuja el wireframe, con la columna derecha arrancando más
          arriba que la izquierda. */}
      <div className="grid grid-cols-[1fr_minmax(260px,400px)] items-center gap-[clamp(2rem,5vw,5rem)] max-[900px]:grid-cols-1 max-[900px]:gap-y-[2.6rem]">
        {/* Dos grupos y no un bloque corrido. El reel mide ~760px y el texto
            ~390: sobran casi 400 que hay que poner en algún lado. Centrado
            entero dejaba dos huecos enormes arriba y abajo; con el sobrante
            repartido entre los grupos, parte separa el argumento de la acción
            y el resto queda de margen — que es como lo ordena el wireframe,
            con el hueco en medio de la columna izquierda.

            En una columna se colapsa: ahí el reel va debajo y ya no hay nada
            contra qué compensar, así que el mismo hueco queda como un agujero
            en medio del texto. */}
        <div className="flex flex-col justify-center gap-[clamp(2.6rem,14vh,10rem)] max-[900px]:gap-[2.2rem]">
          <div>
            <Reveal>
              <Kicker>{TRABAJAMOS.kicker}</Kicker>
            </Reveal>

            {/* 34ch y no 26: la segunda línea escrita mide 668px y a 26ch la
                caja daba 686 — 18px de margen antes de partirse sola. */}
            <Reveal as="h2" className="mb-[1.4rem] mt-[-0.3rem] max-w-[34ch] text-sec font-normal">
              <Rich texto={TRABAJAMOS.titulo} />
            </Reveal>

            <Reveal>
              <Cita texto={TRABAJAMOS.cita.texto} firma={TRABAJAMOS.cita.firma} />
            </Reveal>
          </div>

          <div>
            <Reveal as="p" className="max-w-[56ch] text-bajada font-normal text-read">
              <Rich texto={TRABAJAMOS.parrafo} />
            </Reveal>

            <Reveal as="p" className="mt-[1.9rem]">
              {/* primario: en el original es btn-p y es conversión, no navegación */}
              <Button variante="primario" href={TRABAJAMOS.cta.href}>
                {TRABAJAMOS.cta.label}
              </Button>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.08} className="max-[900px]:mx-auto max-[900px]:max-w-85">
          <Reel reel={TRABAJAMOS.reel} />
        </Reveal>
      </div>
    </PanelVerde>
  )
}

/* Las pastillas no son enlaces ni filtros: son etiquetas de lo que ya existe.
   Por eso van sin hover — un estado al pasar el mouse las haría parecer
   clicables y no llevan a ningún lado. */
const PASTILLA =
  'rounded-full border px-[clamp(.95rem,1.4vw,1.45rem)] py-[.62rem] text-[.9rem] leading-none'
const PASTILLA_APAGADA = 'border-hair bg-white/[.03] text-read-2'
/* Misma superficie que el CTA primario y que la tarjeta destacada: el lima del
   sitio se lee como un material y no como tres verdes parecidos. */
const PASTILLA_LIMA =
  'border-lima bg-lima font-medium text-[#0a1a00] shadow-[inset_0_0_2em_-.9em_#4e7a00]'

function Implementado() {
  return (
    <div className="mt-[clamp(2.4rem,4.4vw,3.8rem)] text-center">
      <Reveal>
        <Eyebrow>{IMPL.titulo}</Eyebrow>
      </Reveal>

      {/* El tope de ancho es lo que reparte las siete en 5 + 2. Medido a 1920:
          las cinco primeras suman 1024px con sus huecos y la sexta las llevaría
          a 1302, así que 6xl (1152) corta justo en el medio y aguanta que las
          etiquetas cambien de largo. Sin tope entraban seis arriba y «Chatbots»
          quedaba solo abajo. */}
      <Reveal className="mx-auto mt-6 flex max-w-6xl flex-wrap justify-center gap-[clamp(.5rem,.8vw,.8rem)]">
        {IMPL.items.map((item) => (
          <span
            key={item}
            className={cx(PASTILLA, item === IMPL.destacado ? PASTILLA_LIMA : PASTILLA_APAGADA)}
          >
            {item}
          </span>
        ))}
      </Reveal>

      <Reveal as="p" className="mt-[1.6rem] text-[.82rem]">
        <Pend nota={IMPL.pend.nota}>{IMPL.pend.texto}</Pend>
      </Reveal>
    </div>
  )
}
