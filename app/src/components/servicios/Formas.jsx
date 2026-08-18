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

/* La sombra aparece con el hover y no antes: es lo que hace que la carta se
   despegue del fondo en vez de solamente moverse. En la oscura es negra —el
   sitio es casi negro, así que la sombra se lee como hueco— y en la lima es
   lima apagado, que a esa altura funciona como el halo del propio color.

   Ojo con la lima: `shadow-[...]` pisa la sombra entera, así que la de hover
   tiene que repetir la interna que le da el material — si no, al pasar el
   mouse la carta se aplana. */
const CARA_OSCURA =
  'border-hair bg-white/[.03] hover:border-hair-lima hover:shadow-[0_30px_64px_-34px_rgba(0,0,0,.95)]'
/* Misma superficie que el CTA primario y que la tarjeta destacada del resto del
   sitio: el lima se lee como UN material y no como varios verdes parecidos. */
const CARA_LIMA =
  'border-lima bg-lima text-[#0a1a00] shadow-[inset_0_0_3em_-1.1em_#4e7a00] ' +
  'hover:shadow-[0_26px_58px_-30px_rgba(129,222,0,.42),inset_0_0_3em_-1.1em_#4e7a00]'

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
              'group flex min-h-[clamp(250px,30vw,450px)] flex-col rounded-[clamp(16px,1.4vw,22px)] border p-[clamp(1.3rem,1.8vw,1.9rem)]',
              'transition-[background,border-color,box-shadow,opacity,transform,filter] duration-500 ease-soft motion-reduce:transition-none',
              forma.destacada ? CARA_LIMA : CARA_OSCURA,
              /* El gesto del hover son tres cosas que cuentan lo mismo: la carta
                 se endereza, se levanta y sube al frente — o sea, la sacás del
                 abanico para mirarla. No es un efecto agregado encima del
                 abanico, es el abanico.

                 El levantar va sin prefijo de ancho porque abajo de 1100px las
                 cartas no están giradas y ahí el hover se quedaba sin nada que
                 hacer. El enderezarse sí es de escritorio: es lo único que
                 depende de que haya giro.

                 El -10px reemplaza al `translate-y-0` que había: las dos son la
                 misma propiedad, y con las dos declaradas gana la que el
                 compilador ponga última, que no es una decisión de nadie.

                 La escala es de 2,8% y no de 5: son cartas de 450px de alto, y a
                 5% el borde superior se mueve 11px por su cuenta, encima de los
                 10 que ya sube. Junto se leía como un salto. */
              'hover:-translate-y-[10px] hover:scale-[1.028] ease-soft',
              'min-[1100px]:hover:z-20 min-[1100px]:hover:rotate-0',
              forma.destacada ? 'hover:brightness-[1.04]' : 'hover:bg-white/[.05]',
              GIRO[i],
            )}
          >
            <span
              className={cx(
                /* el chip crece con la carta: sin esto, el ícono es lo único que
                   se queda quieto y la tarjeta parece moverse detrás de él */
                'grid h-11 w-11 place-items-center rounded-xl border',
                'transition-transform duration-500 ease-soft group-hover:scale-[1.08] motion-reduce:transition-none',
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
