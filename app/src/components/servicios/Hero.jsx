import { ArrowRight } from 'lucide-react'
import { HERO } from '../../content/servicios'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'
import { Migas } from '../ui/Migas'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'

/* Hero de /servicios según la referencia: el fondo es el hecho visual, el
   titular se apoya abajo a la izquierda y al pie corre una fila de apoyo.

   La referencia usa una superficie clara y abstracta; acá el equivalente es el
   verde de la marca difuminado sobre el negro, que ya es material del sitio
   (.fondo-verde lo usan los paneles del home) más la textura de bokeh.

   La fila del pie son las dos ideas del párrafo original separadas por una
   flecha —qué construimos / de quién es— y el CTA cerrando a la derecha. En la
   referencia ese lugar lo ocupa una prueba social; acá no se inventa una, así
   que lo toma la acción. */
export function Hero() {
  return (
    /* Alto completo de pantalla con el contenido apoyado abajo (justify-end),
       como la referencia: el fondo se queda con la parte de arriba y el bloque
       de texto cierra contra el borde inferior. A 82vh el contenido llenaba la
       caja justo y no quedaba nada que empujar, así que el justify-end no hacía
       nada y la sección siguiente asomaba. El pt sigue como piso para pantallas
       bajas, donde el texto no entra y el hero tiene que crecer. */
    <header className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden px-column pb-[clamp(2.4rem,6vh,4.5rem)] pt-[clamp(150px,20vh,240px)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[url('/assets/bg-bokeh-lite.webp')] bg-cover bg-center opacity-[.28]"
      />
      {/* la luz: nace arriba a la derecha y se apaga hacia la esquina opuesta,
          así el titular queda sobre la parte más oscura */}
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

        <Reveal inmediato delay={0.05} className="mt-[clamp(2.5rem,7vh,5rem)]">
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

        {/* fila de apoyo: dos tramos del párrafo + el CTA */}
        <Reveal
          inmediato
          delay={0.16}
          className="mt-[clamp(2.4rem,6vh,4rem)] grid items-start gap-[clamp(1.2rem,2.4vw,2.4rem)] border-t border-hair pt-[clamp(1.4rem,2.4vw,2rem)] min-[1000px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto]"
        >
          <p className="max-w-[38ch] text-bajada font-normal text-read">{HERO.apoyos[0]}</p>

          <ArrowRight
            aria-hidden
            strokeWidth={1.6}
            className="mt-[.35rem] h-5 w-5 shrink-0 text-oliva max-[1000px]:hidden"
          />

          <p className="max-w-[38ch] text-bajada font-normal text-read">{HERO.apoyos[1]}</p>

          <div className="min-[1000px]:pt-[.2rem]">
            <Button variante="primario" href={HERO.cta.href}>
              {HERO.cta.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </header>
  )
}
