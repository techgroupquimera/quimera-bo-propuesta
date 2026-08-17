import { SEGURIDAD } from '../../content/tecnologia'
import { Icono } from '../ui/iconos'
import { Kicker } from '../ui/Kicker'
import { Pend } from '../ui/Pend'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Wireframe: encabezado arriba a la izquierda y tres tarjetas altas a distinta
   altura, unidas por una curva en S entre cada par.

   ── Cómo cierran las curvas con las tarjetas ──
   El desfase de cada tarjeta va como FRACCIÓN de su propio alto, no en píxeles.
   Con eso la fila mide (1 + el desfase mayor) altos, y el centro de la tarjeta i
   cae en (desfase + 0.5) / (1 + mayor) de la fila — un número, sin medir nada
   del DOM y sin depender del tamaño de pantalla.

   Los conectores son celdas propias de la grilla (no absolutos sobre el hueco):
   así toman el alto de la fila y las dos puntas de la S caen exactamente en el
   centro de la tarjeta que tienen a cada lado.

   De los 900px para abajo se van el desfase y las curvas: apiladas, unas
   tarjetas corridas se leen como un error y las curvas cruzarían el vacío. */
const ALTO = 'clamp(240px,25vw,370px)'
const DESFASE = [0, 0.28, 0.08] // en fracción del alto de la tarjeta
const MAYOR = Math.max(...DESFASE)
const centro = (i) => ((DESFASE[i] + 0.5) / (1 + MAYOR)) * 100

function Curva({ desde, hasta }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full text-hair-lima max-[900px]:hidden"
    >
      <path
        d={`M0 ${centro(desde)} C 42 ${centro(desde)}, 58 ${centro(hasta)}, 100 ${centro(hasta)}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/* El alto y el desfase salen los dos de --alto, que la grilla define una vez.
   Tenerlo en un solo lugar es lo que mantiene los centros de las curvas donde
   corresponde: si el alto y el desfase se pudieran mover por separado, la S
   dejaría de apuntar al medio de la tarjeta. */
function Tarjeta({ pieza, i }) {
  return (
    <Reveal
      as="article"
      delay={i * 0.08}
      style={{ '--desfase': `calc(var(--alto) * ${DESFASE[i]})` }}
      className="flex min-h-(--alto) flex-col rounded-[clamp(16px,1.4vw,22px)] border border-hair bg-white/3 p-[clamp(1.3rem,1.8vw,1.9rem)] transition-[background,border-color,opacity,transform] duration-500 ease-soft hover:border-hair-lima hover:bg-white/5 min-[900px]:mt-(--desfase)"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-hair-lima bg-linear-150 from-lima/18 to-lima/4">
        <Icono nombre={pieza.icono} className="h-5 w-5 text-lima" />
      </span>

      <h3 className="mt-auto pt-8 text-card font-medium">{pieza.titulo}</h3>
      <p className="mt-[.6rem] text-body-m text-read-2">{pieza.texto}</p>
    </Reveal>
  )
}

export function Seguridad() {
  return (
    <Section id={SEGURIDAD.id}>
      <div className="max-w-[42rem]">
        <Reveal>
          <Kicker>{SEGURIDAD.kicker}</Kicker>
        </Reveal>

        <Reveal as="h2" className="mt-[-0.3rem] text-sec font-normal">
          <Rich texto={SEGURIDAD.titulo} />
        </Reveal>

        <Reveal as="p" delay={0.07} className="mt-[1.4rem] text-bajada font-normal text-read">
          <Rich texto={SEGURIDAD.bajada} />
        </Reveal>

        <Reveal as="p" delay={0.12} className="mt-[1.4rem] text-[.82rem]">
          <Pend nota={SEGURIDAD.pend.nota}>{SEGURIDAD.pend.texto}</Pend>
        </Reveal>
      </div>

      {/* items-start: sin esto la grilla estira las tres al alto de la fila y el
          desfase, en vez de bajar la tarjeta, la acorta.
          Las celdas de los conectores sí se estiran (self-stretch): son la
          referencia de alto del SVG, y con items-start quedaban en cero y las
          curvas no se dibujaban. */}
      <div
        style={{ '--alto': ALTO }}
        className="mt-[clamp(2.8rem,5vw,4.6rem)] grid grid-cols-[minmax(0,1fr)_clamp(32px,5vw,110px)_minmax(0,1fr)_clamp(32px,5vw,110px)_minmax(0,1fr)] items-start max-[900px]:grid-cols-1 max-[900px]:gap-[clamp(.8rem,1.2vw,1.4rem)]"
      >
        <Tarjeta pieza={SEGURIDAD.piezas[0]} i={0} />
        {/* en una columna la celda del conector dejaría una fila vacía con su
            gap entre tarjeta y tarjeta */}
        <div className="relative self-stretch max-[900px]:hidden">
          <Curva desde={0} hasta={1} />
        </div>
        <Tarjeta pieza={SEGURIDAD.piezas[1]} i={1} />
        <div className="relative self-stretch max-[900px]:hidden">
          <Curva desde={1} hasta={2} />
        </div>
        <Tarjeta pieza={SEGURIDAD.piezas[2]} i={2} />
      </div>
    </Section>
  )
}
