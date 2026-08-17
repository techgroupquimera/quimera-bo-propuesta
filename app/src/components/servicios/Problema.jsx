import { PROBLEMA } from '../../content/servicios'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Según wireframe: encabezado centrado y los cuatro síntomas en escalera —
   cada barra corre un paso a la derecha respecto de la anterior.

   La escalera no es decoración: los cuatro son el mismo problema agravándose
   (sistemas sueltos → costos → datos ajenos → ninguna foto del negocio), y el
   desplazamiento hace que se lean en orden en vez de como una lista pareja.

   Sólo corre de los 900px para arriba. En una columna el escalonado deja las
   barras cortadas contra el borde y se lee como un error de maquetación. */
const PASO = 15 // % que se corre cada barra respecto de la anterior
const ANCHO = 50 // % de ancho de cada barra

export function Problema() {
  /* La escalera ocupa (n-1) pasos + el ancho de una barra. Lo que sobra se
     reparte a los dos lados: sin esta sangría arranca pegada al borde
     izquierdo y deja todo el hueco a la derecha, descentrada.
     Se calcula y no se escribe a mano para que siga cerrando si cambian el
     paso, el ancho o la cantidad de síntomas. */
  const ocupa = (PROBLEMA.sintomas.length - 1) * PASO + ANCHO
  const sangria = (100 - ocupa) / 2

  return (
    <Section id={PROBLEMA.id}>
      {/* El ancho lo manda la bajada, no el titular: el titular trae sus dos
          saltos escritos, así que no depende de dónde corte la caja. A 84ch la
          bajada cae en dos líneas — a 62 caía en tres. */}
      <div className="mx-auto max-w-[84ch] text-center">
        <Reveal>
          <Kicker>{PROBLEMA.kicker}</Kicker>
        </Reveal>

        <Reveal as="h2" className="mt-[-0.3rem] text-sec font-normal">
          <Rich texto={PROBLEMA.titulo} />
        </Reveal>

        <Reveal as="p" delay={0.07} className="mt-[1.4rem] text-bajada font-normal text-read">
          {PROBLEMA.bajada}
        </Reveal>
      </div>

      <div className="mt-[clamp(2.8rem,6vw,5rem)] flex flex-col gap-[clamp(.6rem,.9vw,.9rem)]">
        {PROBLEMA.sintomas.map((sintoma, i) => (
          <Reveal
            key={sintoma}
            delay={i * 0.07}
            style={{ '--paso': `${sangria + i * PASO}%`, '--ancho': `${ANCHO}%` }}
            /* El verde ya no es sólo del hover: en reposo llevan un lavado lima
               en diagonal y su hairline lima. Con el gris plano la escalera se
               perdía contra el fondo y sólo tomaba color la barra que tenía el
               mouse encima. El hover ahora sube el mismo lavado en vez de
               estrenarlo. */
            className="rounded-[clamp(12px,1.1vw,16px)] border border-hair-lima bg-linear-100 from-lima/10 from-20% to-lima/3 px-[clamp(1.2rem,2vw,1.8rem)] py-[clamp(1rem,1.5vw,1.35rem)] text-[.97rem] leading-normal text-read-3 transition-[background,border-color,opacity,transform] duration-500 ease-soft hover:border-lima/40 hover:from-lima/18 hover:to-lima/6 min-[900px]:ms-(--paso) min-[900px]:w-(--ancho)"
          >
            {sintoma}
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
