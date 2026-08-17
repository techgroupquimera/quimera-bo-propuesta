import { PRUEBA } from '../../content/home'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Según wireframe: a la izquierda un panel con el texto apoyado abajo —kicker,
   titular, bajada y el CTA— y a la derecha los seis sistemas como bloques
   apilados.

   El panel se estira al alto de la columna de la derecha, que la fijan los seis
   bloques. Así los dos lados cierran a la misma altura sin números mágicos.

   Va en verde y no con una foto: las capturas de los seis sistemas siguen
   pendientes y son los que están bajo acuerdo de confidencialidad, así que
   cualquier imagen acá iba a ser un relleno. El verde es material propio y
   además emparenta este bloque con los dos paneles de reel. */
export function PruebaReal() {
  return (
    <Section id="prueba">
      <div className="grid gap-[clamp(1rem,1.6vw,1.4rem)] min-[900px]:grid-cols-[1.05fr_1fr]">
        <Reveal className="fondo-verde flex min-h-[clamp(340px,42vw,480px)] flex-col justify-end overflow-hidden rounded-[clamp(16px,1.6vw,24px)] border border-hair-lima p-[clamp(1.6rem,2.6vw,2.8rem)]">
          <Kicker>{PRUEBA.kicker}</Kicker>

          <h2 className="mb-[1rem] mt-[-0.3rem] text-sec font-normal">
            <Rich texto={PRUEBA.titulo} />
          </h2>

          <p className="max-w-[44ch] text-bajada font-normal text-read">{PRUEBA.bajada}</p>

          <p className="mt-[1.8rem]">
            <Button href={PRUEBA.cta.href} flecha>
              {PRUEBA.cta.label}
            </Button>
          </p>
        </Reveal>

        {/* Los seis, apilados. El punto que late no es decoración: la sección se
            llama «en línea hoy» y es lo que dice que están corriendo ahora. */}
        <div className="flex flex-col gap-[clamp(.5rem,.7vw,.7rem)]">
          {PRUEBA.sistemas.map((sistema, i) => (
            <Reveal
              key={sistema.nombre}
              delay={i * 0.05}
              className="flex flex-1 items-start gap-[.9rem] rounded-[clamp(12px,1.1vw,16px)] border border-hair bg-white/[.025] px-[clamp(1.1rem,1.6vw,1.5rem)] py-[clamp(.9rem,1.3vw,1.2rem)] transition-[background,border-color,opacity,transform] duration-500 ease-soft hover:border-hair-lima hover:bg-lima/[.04]"
            >
              <span
                aria-hidden
                className="mt-[.45rem] h-2 w-2 shrink-0 animate-dot rounded-full bg-lima shadow-[0_0_10px_var(--color-lima)] motion-reduce:animate-none"
              />
              <span>
                <b className="block text-base font-medium tracking-[-.01em]">{sistema.nombre}</b>
                <span className="mt-[.15rem] block text-[.86rem] text-muted">
                  {sistema.detalle}
                </span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
