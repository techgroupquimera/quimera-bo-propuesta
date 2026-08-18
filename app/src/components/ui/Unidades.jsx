import { ArrowUpRight } from 'lucide-react'
import { UNIDADES } from '../../content/nosotros'
import { cx } from '../../lib/cx'
import { factorOptico } from '../../lib/optico'
import { Kicker } from './Kicker'
import { Pend } from './Pend'
import { Reveal } from './Reveal'
import { Rich } from './Rich'
import { Section } from './Section'

/* Lo comparten el home y /nosotros, con el MISMO copy — por eso vive en ui/ y
   no en nosotros/, que es donde estaba cuando lo usaba una sola página. En
   /nosotros presenta al grupo; en el home cierra el argumento justo antes del
   CTA final: quien llegó hasta ahí ya escuchó la propuesta y lo último que ve
   antes de que le pidan una reunión es que atrás hay cinco marcas y no una
   persona con una laptop.

   No toma el contenido por prop, a diferencia de <Autoridad> y <Bio>, que lo
   comparten con copy distinto: acá las dos páginas dicen exactamente lo mismo,
   y un prop que siempre recibe el mismo objeto es una indirección que no
   decide nada.

   Wireframe: encabezado centrado y los paneles pegados uno al lado del otro, sin
   aire entre ellos. En reposo cada panel muestra sólo su logo; al pasar el mouse
   aparecen la etiqueta, el nombre, la descripción y el enlace.

   ── El panel entero es el enlace ──
   Es una superficie grande con un destino: pedirle al que lo mira que apunte a
   una línea de texto de ocho píxeles no tiene sentido. Por eso el panel es un
   <a> y la dirección de adentro va como <span> — un enlace dentro de otro es
   HTML inválido.

   Eso también resuelve el teclado, que no tiene hover: el panel es focalizable
   por sí mismo y el reveal escucha `group-focus-visible`. Y es la razón por la
   que el marcador de dato pendiente se fue al pie de la fila: era clickeable, y
   clickeable adentro de un enlace es el mismo HTML inválido.

   ── Abajo de 1000px no hay hover ──
   Los paneles se apilan y el texto queda siempre a la vista. Un panel que sólo
   muestra un logo y esconde todo lo demás detrás de un gesto que en pantalla
   táctil no existe es contenido que no se puede leer. Por eso TODAS las clases
   del reveal van prefijadas con min-[1000px]: el estado por defecto es visible,
   y el que se esconde es el de escritorio.

   ── El logo se va, no se corre ──
   Antes subía para dejarle el pie al texto. En un panel cuadrado eso no cierra:
   a 1920 el panel mide 283×283 y el texto más largo se lleva 226 de esos 283.
   No hay lugar para los dos, así que se funden — sale el logo, entra el texto.
   El nombre no se pierde: está en el titular que aparece.

   ── Cuadrado desde 1400px ──
   El texto revelado va absoluto, y lo absoluto no empuja la caja: si no entra,
   se corta sin avisar. Por eso el cuadrado tiene piso. Con cinco columnas el
   panel mide un quinto del ancho de la columna, y abajo de 1400px ese quinto se
   vuelve más angosto que el alto que necesita la descripción más larga. De 1000
   a 1400 el panel vuelve al alto fijo —más alto que ancho— y recién arriba de
   1400 se cierra en cuadrado.

   Medido, no estimado: el peor caso deja 19px de aire a 1400 y 57 a 1920. Si
   alguna descripción crece, hay que volver a medirlo — el corte es mudo. */

/* Tonos alternados: en el wireframe los paneles se distinguen por color, no por
   una línea. Con dos valores basta — lo que se lee es el corte entre uno y
   otro, y el borde de la fila los cierra. */
const TONOS = ['bg-white/[.025]', 'bg-white/[.05]']

/* El alto del logo sale del área, no de la caja: los cinco van de casi cuadrado
   a diez a uno y a alto uniforme el más ancho ocuparía cinco veces la mancha del
   más compacto. Ver lib/optico.js.

   La base va en una custom property y no en la clase porque el alto se calcula
   con calc() en el style de cada <img>, multiplicado por su factor óptico.

   Y cambia en el quiebre, en contra de la intuición: en móvil el logo es MÁS
   grande. La base de escritorio escala con vw, pero abajo de 1000px el panel
   deja de ser un quinto del ancho y pasa a ocupar la pantalla entera — o sea que
   ahí hay más lugar, no menos. Con la base de escritorio el lockup de Tech
   Agents quedaba en 15px de alto dentro de un panel de 388px. */
const BASE_MOVIL = '[--base-logo:clamp(50px,15vw,68px)]'
const BASE_ESCRITORIO = 'min-[1000px]:[--base-logo:clamp(34px,2.9vw,50px)]'

function Unidad({ unidad, i }) {
  return (
    <a
      href={unidad.href}
      target="_blank"
      rel="noopener"
      className={cx(
        'group relative flex flex-col gap-[1.2rem] p-[clamp(1.2rem,1.7vw,1.7rem)] transition-colors duration-400 ease-soft',
        'min-[1000px]:h-[clamp(360px,26vw,480px)] min-[1000px]:justify-center min-[1000px]:gap-0',
        'min-[1400px]:aspect-square min-[1400px]:h-auto',
        'hover:bg-lima/[.07] focus-visible:bg-lima/[.07] focus-visible:outline-none',
        TONOS[i % 2],
      )}
    >
      {/* el logo se funde a la salida: en un panel cuadrado no caben los dos */}
      <div className="flex justify-center transition-opacity duration-400 ease-soft min-[1000px]:group-hover:opacity-0 min-[1000px]:group-focus-visible:opacity-0 motion-reduce:transition-none">
        <img
          src={unidad.logo.src}
          alt={unidad.nombre}
          width={unidad.logo.ancho}
          height={unidad.logo.alto}
          loading="lazy"
          decoding="async"
          style={{
            height: `calc(var(--base-logo) * ${factorOptico(unidad.logo.ancho, unidad.logo.alto).toFixed(3)})`,
          }}
          className="w-auto max-w-full object-contain opacity-[.85]"
        />
      </div>

      <div className="min-[1000px]:absolute min-[1000px]:inset-0 min-[1000px]:flex min-[1000px]:flex-col min-[1000px]:justify-center min-[1000px]:p-[clamp(1.2rem,1.7vw,1.7rem)] min-[1000px]:translate-y-2 min-[1000px]:opacity-0 min-[1000px]:transition-[opacity,transform] min-[1000px]:duration-400 min-[1000px]:ease-soft min-[1000px]:group-hover:translate-y-0 min-[1000px]:group-hover:opacity-100 min-[1000px]:group-focus-visible:translate-y-0 min-[1000px]:group-focus-visible:opacity-100 motion-reduce:transition-none">
        <p className="font-sans text-[.66rem] font-semibold uppercase tracking-[.14em] text-lima-2">
          {unidad.tag}
        </p>

        <h3 className="mt-[.5rem] text-[clamp(1.05rem,1.2vw,1.24rem)] font-medium leading-[1.2] tracking-[-.015em]">
          {unidad.nombre}
        </h3>

        {/* .8rem y no .85: en el panel cuadrado una línea de más es lo que
            separa que entre de que se corte */}
        <p className="mt-[.55rem] text-[.8rem] leading-[1.55] text-read-2">{unidad.texto}</p>

        {/* <span> y no <a>: el enlace es el panel entero */}
        <span className="mt-[.9rem] inline-flex items-center gap-[.3rem] font-sans text-[.8rem] text-lima-2 transition-colors duration-250 group-hover:text-lima">
          {unidad.url}
          <ArrowUpRight aria-hidden strokeWidth={2} className="h-[.95em] w-[.95em]" />
        </span>
      </div>
    </a>
  )
}

export function Unidades() {
  return (
    <Section id={UNIDADES.id}>
      <div className="mx-auto max-w-[64ch] text-center">
        <Reveal>
          <Kicker>{UNIDADES.kicker}</Kicker>
        </Reveal>

        <Reveal as="h2" className="mt-[-0.3rem] text-sec font-normal">
          <Rich texto={UNIDADES.titulo} />
        </Reveal>
      </div>

      {/* Sin gap: los paneles se tocan, como en el wireframe. El borde y el
          overflow-hidden de la fila son los que redondean las dos puntas — cada
          panel con su propio radio dejaría cuatro esquinas curvas en medio. */}
      <Reveal
        delay={0.07}
        className={cx(
          'mt-[clamp(2.6rem,5vw,4.4rem)] grid overflow-hidden rounded-[clamp(14px,1.3vw,20px)] border border-hair min-[1000px]:grid-cols-5',
          BASE_MOVIL,
          BASE_ESCRITORIO,
        )}
      >
        {UNIDADES.lista.map((unidad, i) => (
          <Unidad key={unidad.nombre} unidad={unidad} i={i} />
        ))}
      </Reveal>

      <Reveal delay={0.12} className="mt-[1.1rem] text-[.8rem]">
        <Pend nota={UNIDADES.pend.nota}>{UNIDADES.pend.texto}</Pend>
      </Reveal>
    </Section>
  )
}
