import { Button } from './Button'
import { Kicker } from './Kicker'
import { Reveal } from './Reveal'
import { Rich } from './Rich'

/* El cierre de una página: un solo pedido, centrado, sobre un resplandor que se
   funde con la sección de arriba. Lo comparten el home y /servicios — misma
   pieza, distinto copy — así el final de cualquier página se lee igual.

   El resplandor NO va recortado. Antes la sección tenía overflow-hidden y el
   halo, que nace por encima del borde superior, quedaba cortado plano justo
   ahí: se veía una línea recta donde el verde chocaba con el negro. Ahora
   desborda hacia arriba y se apaga solo dentro de la sección anterior, que es
   lo que hace la transición.

   Por eso también se fue la hairline de separación: con el halo cruzando el
   límite, una línea dura encima lo vuelve a cortar. Acá el degradado ES la
   separación.

   Y por eso esta sección NO lleva `contenido-diferido`, aunque esté siempre
   debajo del pliegue y sea la candidata más obvia. `content-visibility: auto`
   arrastra `contain: paint`, que recorta al borde de la caja exactamente igual
   que un overflow-hidden: se lo puso y volvió la misma línea recta de antes,
   ahora justo encima del footer y en las seis páginas. La regla general está
   anotada en index.css.

   El aire sale de --spacing-aire y no de un clamp propio, con un 20% de más
   porque es el final y respira distinto que una sección del medio. Así sigue el
   ritmo de SU página: en el home queda donde estaba y en /servicios acompaña al
   resto en vez de abrir un hueco al triple. */
export function Cierre({ cierre }) {
  return (
    <section className="relative mx-auto max-w-maxw px-g py-[calc(var(--spacing-aire)*1.2)] text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-38%] -z-10 aspect-[1.7] w-[min(1040px,100%)] -translate-x-1/2 rounded-[50%] blur-[80px]"
        style={{ background: 'radial-gradient(circle,rgba(129,222,0,.16),transparent 62%)' }}
      />

      <Reveal>
        <Kicker>{cierre.kicker}</Kicker>
      </Reveal>

      <Reveal as="h2" className="mt-[1.2rem] text-sec font-normal">
        <Rich texto={cierre.titulo} />
      </Reveal>

      <Reveal
        as="p"
        className="mx-auto mb-[2.1rem] mt-[1.3rem] max-w-[56ch] text-body-l font-normal text-read"
      >
        {cierre.bajada}
      </Reveal>

      <Reveal>
        <Button variante="primario" href={cierre.cta.href}>
          {cierre.cta.label}
        </Button>
      </Reveal>
    </section>
  )
}
