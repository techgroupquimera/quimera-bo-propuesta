import { HERO } from '../../content/tecnologia'
import { Kicker } from '../ui/Kicker'
import { MarquesinaVertical } from '../ui/MarquesinaVertical'
import { Migas } from '../ui/Migas'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'

/* Mismo hero que /servicios —alto de pantalla, fondo con la luz verde, texto
   apoyado abajo— con lo que pide el wireframe de esta página: dos columnas de
   fichas en bucle a la derecha, una subiendo y otra bajando.

   Las columnas van en la grilla y no absolutas: con items-end, la columna
   derecha crece hacia ARRIBA desde el pie —fichas arriba, bajada abajo— y el
   titular de la izquierda queda alineado al mismo pie. Es exactamente el orden
   del wireframe, y sin posicionar nada a mano no hay forma de que las fichas se
   monten sobre el texto cuando cambia el alto de la ventana.

   Debajo de 1000px las columnas se van. En una sola columna quedarían encima
   del titular o lo empujarían fuera de la pantalla, y son ambiente: lo que
   dicen —el stack— la página lo lista entero más abajo. */
export function Hero() {
  return (
    <header className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden px-column pb-[clamp(2.4rem,6vh,4.5rem)] pt-[clamp(150px,20vh,240px)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[url('/assets/bg-bokeh-lite.webp')] bg-cover bg-center opacity-[.28]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(85% 70% at 78% 8%,rgba(129,222,0,.20),transparent 62%),' +
            'radial-gradient(60% 50% at 0% 40%,rgba(129,222,0,.06),transparent 60%),' +
            'linear-gradient(to bottom,rgba(5,6,4,.35),rgba(5,6,4,.82) 62%,#050604)',
        }}
      />

      <div className="mx-auto w-full max-w-maxw">
        <Reveal inmediato>
          <Migas tramos={HERO.migas} />
        </Reveal>

        <div className="mt-[clamp(2.5rem,7vh,5rem)] grid gap-[clamp(2.4rem,4vw,4rem)] min-[1000px]:grid-cols-[minmax(0,1fr)_auto] min-[1000px]:items-end">
          <div>
            <Reveal inmediato delay={0.05}>
              <Kicker>{HERO.kicker}</Kicker>
            </Reveal>

            <Reveal
              inmediato
              as="h1"
              delay={0.1}
              className="mt-[-0.3rem] text-[clamp(2.4rem,4.6vw,4.8rem)] font-normal leading-[1.06] tracking-[-.03em]"
            >
              <Rich texto={HERO.titulo} />
            </Reveal>
          </div>

          <div>
            {/* sin aria-hidden: los nombres son contenido real de la página, y
                la copia del bucle —lo único que sí sobra— ya la esconde la
                propia marquesina */}
            <Reveal inmediato delay={0.16} className="flex gap-[clamp(8px,.9vw,13px)] max-[1000px]:hidden">
              <MarquesinaVertical items={HERO.columnas[0]} sentido="arriba" />
              <MarquesinaVertical items={HERO.columnas[1]} sentido="abajo" />
            </Reveal>

            <Reveal
              inmediato
              as="p"
              delay={0.22}
              className="mt-[clamp(1.6rem,3vh,2.4rem)] max-w-[42ch] text-bajada font-normal text-read min-[1000px]:mt-[clamp(1.4rem,2.4vw,2rem)] min-[1000px]:max-w-[32ch] min-[1000px]:border-t min-[1000px]:border-hair min-[1000px]:pt-[clamp(1.2rem,2vw,1.7rem)]"
            >
              {HERO.bajada}
            </Reveal>
          </div>
        </div>
      </div>
    </header>
  )
}
