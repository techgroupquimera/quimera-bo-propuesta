import { PROBLEMA } from '../../content/home'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Según wireframe: el encabezado deja de correr a lo ancho y se convierte en
   una columna propia —kicker, titular, bajada y el CTA— con los cuatro dolores
   apilados al costado.

   Antes eran una grilla 2×2 separada por hairlines: los cuatro se leían de un
   golpe y ninguno pesaba. Apilados, cada uno es una parada y el ojo los lee en
   orden, que es como está escrito el argumento.

   La columna izquierda va arriba de todo (self-start) y no acompaña el scroll:
   el wireframe la dibuja fija en el tope y pegarla agregaría un comportamiento
   que nadie pidió. */
export function Problema() {
  return (
    <Section id={PROBLEMA.id} borde={false}>
      <div className="grid gap-[clamp(2.4rem,5vw,5.5rem)] min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <div className="self-start">
          <Reveal>
            <Kicker>{PROBLEMA.kicker}</Kicker>
          </Reveal>

          <Reveal as="h2" className="mt-[-0.3rem] text-sec font-normal">
            <Rich texto={PROBLEMA.titulo} />
          </Reveal>

          <Reveal
            as="p"
            delay={0.07}
            className="mt-[1.15rem] max-w-[48ch] text-bajada font-normal text-read"
          >
            {PROBLEMA.bajada}
          </Reveal>

          {/* ghost y no primario: «Cómo lo resolvemos» es navegación, no
              conversión. El wireframe dibuja todo en gris plano, así que la
              píldora no dice de qué tipo es — y el sitio guarda el CTA fuerte
              para los dos pedidos reales (hero y cierre). */}
          <Reveal delay={0.14} className="mt-[2.2rem]">
            <Button href={PROBLEMA.cta.href} flecha>
              {PROBLEMA.cta.label}
            </Button>
          </Reveal>
        </div>

        <div className="flex flex-col gap-3">
          {PROBLEMA.dolores.map((item, i) => (
            <Reveal
              as="article"
              key={item.dolor}
              delay={i * 0.06}
              className="rounded-2xl border border-hair bg-white/[.025] p-[clamp(1.3rem,2.1vw,1.9rem)] transition-[background,border-color,opacity,transform] duration-500 ease-soft hover:border-hair-lima hover:bg-lima/[.04]"
            >
              <q className="block text-[clamp(1rem,1.32vw,1.16rem)] font-normal leading-[1.45] text-[#d2dac8] [quotes:none]">
                {item.dolor}
              </q>
              <p className="mt-[.85rem] flex items-baseline gap-[.55rem] text-[clamp(.94rem,1.18vw,1.06rem)] font-semibold tracking-[-.015em] text-lima before:font-normal before:opacity-60 before:content-['→']">
                {item.arreglo}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
