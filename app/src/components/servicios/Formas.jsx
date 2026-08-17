import { FORMAS } from '../../content/servicios'
import { cx } from '../../lib/cx'
import { Icono } from '../ui/iconos'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Wireframe: encabezado centrado, las tres tarjetas abiertas en abanico —la del
   medio derecha y las de los costados giradas hacia afuera— y la nota al pie
   ocupando todo el ancho.

   En el wireframe la del medio se dibuja más clara. Eso es profundidad, no
   jerarquía: en un abanico la carta central va adelante. Si además la pintara
   de acento habría dos focos peleando, porque el destacado es el tercero —lo
   marca el original y es el tramo más alto de la escalera—. Así que el medio
   sólo se lleva el z-index y el color se queda donde significa algo.

   El abanico corre de 1100px para arriba. Apiladas o en dos columnas, unas
   tarjetas giradas se leen como un error de maquetación y no como un gesto. */
/* Las de los costados giran y además se corren HACIA el centro: el giro solo
   agranda la caja pero no acerca las cartas, y sin el corrimiento quedan tres
   cartas separadas y torcidas en vez de un abanico.

   La del medio va arriba (z-10) y las otras por debajo, que es como se sostiene
   un abanico. Medido: así la del medio les come ~25px del borde interno, así
   que ESE lado lleva padding de más — sin eso el texto de la 3 arrancaba a 3px
   de quedar cortado. El padding compensa lo que tapa el solape; si no, habría
   que elegir entre el abanico y el texto.

   Las clases van escritas enteras y no armadas con interpolación: Tailwind
   escanea el texto del archivo, y un `pe-[` + variable nunca aparece completo
   en la fuente, así que esa utilidad no se generaría nunca. */
const GIRO = [
  'relative z-0 min-[1100px]:-rotate-[11deg] min-[1100px]:translate-x-[clamp(5px,1vw,18px)] min-[1100px]:translate-y-[clamp(10px,1.4vw,26px)] min-[1100px]:pe-[clamp(1.3rem,2.6vw,2.9rem)]',
  'relative z-10',
  'relative z-0 min-[1100px]:rotate-[11deg] min-[1100px]:-translate-x-[clamp(5px,1vw,18px)] min-[1100px]:translate-y-[clamp(10px,1.4vw,26px)] min-[1100px]:ps-[clamp(1.3rem,2.6vw,2.9rem)]',
]

const CARA_OSCURA = 'border-hair bg-white/[.03] hover:border-hair-lima'
/* Misma superficie que el CTA primario y que la tarjeta destacada del resto del
   sitio: el lima se lee como UN material y no como varios verdes parecidos. */
const CARA_LIMA = 'border-lima bg-lima text-[#0a1a00] shadow-[inset_0_0_3em_-1.1em_#4e7a00]'

export function Formas() {
  return (
    <Section id={FORMAS.id}>
      <div className="mx-auto max-w-[74ch] text-center">
        <Reveal>
          <Kicker>{FORMAS.kicker}</Kicker>
        </Reveal>

        <Reveal as="h2" className="mt-[-0.3rem] text-sec font-normal">
          <Rich texto={FORMAS.titulo} />
        </Reveal>

        <Reveal as="p" delay={0.07} className="mt-[1.4rem] text-bajada font-normal text-read">
          {FORMAS.bajada}
        </Reveal>
      </div>

      {/* El grupo va más angosto que la columna —como en el wireframe, donde el
          abanico no llega a los extremos de las barras— y eso es lo que deja las
          tarjetas verticales. A todo lo ancho salen apaisadas, y una carta
          apaisada girada se lee como un banner torcido en vez de como una carta.

          items-start para que el giro no estire las cajas: con la altura de fila
          impuesta, las de los costados quedaban más altas que la del medio antes
          de girar y el abanico salía torcido de origen. */}
      {/* De 3 columnas pasa directo a 1. Con una parada en 2 la tercera —la
          destacada— quedaba sola en su fila, a media columna y con el alto de
          carta: se leía como una tarjeta que sobró. */}
      <div className="mx-auto mt-[clamp(3rem,5.5vw,5rem)] grid max-w-[64rem] grid-cols-3 items-start gap-[clamp(.8rem,1.2vw,1.4rem)] max-[780px]:grid-cols-1">
        {FORMAS.formas.map((forma, i) => (
          <Reveal
            as="article"
            key={forma.titulo}
            delay={i * 0.07}
            className={cx(
              /* el alto es lo que las mantiene verticales: a 330px de ancho,
                 450 de alto da la proporción de carta del wireframe */
              'flex min-h-[clamp(250px,30vw,450px)] flex-col rounded-[clamp(16px,1.4vw,22px)] border p-[clamp(1.3rem,1.8vw,1.9rem)]',
              'transition-[background,border-color,opacity,transform,filter] duration-500 ease-soft',
              forma.destacada ? CARA_LIMA : CARA_OSCURA,
              /* al pasar el mouse la carta se endereza y sube al frente: es el
                 gesto del abanico, no un efecto agregado encima */
              'min-[1100px]:hover:z-20 min-[1100px]:hover:translate-y-0 min-[1100px]:hover:rotate-0',
              forma.destacada ? 'hover:brightness-[1.04]' : 'hover:bg-white/[.05]',
              GIRO[i],
            )}
          >
            <span
              className={cx(
                'grid h-11 w-11 place-items-center rounded-xl border',
                forma.destacada
                  ? 'border-[#0a1a00]/22 bg-[#0a1a00]/16'
                  : 'border-hair-lima bg-linear-150 from-lima/18 to-lima/4',
              )}
            >
              <Icono
                nombre={forma.icono}
                className={cx('h-5 w-5', forma.destacada ? 'text-[#0a1a00]' : 'text-lima')}
              />
            </span>

            <h3 className="mt-auto pt-8 text-card font-medium">{forma.titulo}</h3>

            {/* el .tag del original: 0.57rem, semibold, versalita apretada en
                lima-2. Sobre la tarjeta lima ese verde no se lee, así que ahí
                va en el mismo tinta oscuro del texto. */}
            <span
              className={cx(
                'mb-[.8rem] mt-[.5rem] font-sans text-tag font-semibold uppercase',
                forma.destacada ? 'text-[#0a1a00]/70' : 'text-lima-2',
              )}
            >
              {forma.tag}
            </span>

            <p className={cx('text-body-m', forma.destacada ? 'text-[#0a1a00]/78' : 'text-read-2')}>
              {forma.texto}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal
        as="p"
        delay={0.24}
        /* margen generoso a propósito: a 11° las cartas bajan ~53px por debajo
           de su caja de layout, y con el margen normal las esquinas quedaban
           tocando la nota */
        className="mt-[clamp(2.6rem,5.2vw,5rem)] rounded-[14px] border border-hair-lima bg-lima/5 px-[clamp(1.1rem,1.6vw,1.4rem)] py-[1.1rem] text-[.95rem] text-[#cad3c0]"
      >
        <Rich texto={FORMAS.nota} />
      </Reveal>
    </Section>
  )
}
