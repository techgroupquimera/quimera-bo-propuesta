import { cx } from '../../lib/cx'
import { Kicker } from './Kicker'
import { Migas } from './Migas'
import { Reveal } from './Reveal'
import { Rich } from './Rich'

/* El hero de las páginas largas: alto de pantalla, texto apoyado abajo, la luz
   verde naciendo arriba a la derecha, y al pie una barra con el índice de la
   propia página. Lo comparten /proyectos y /nosotros — dos páginas de siete y
   seis secciones, donde entrar por donde a uno le interesa vale más que
   scrollear todo.

   (La otra forma de hero, la de /servicios y /tecnología, cierra con una fila
   de apoyo en vez de un índice; ésas siguen en su propia carpeta.)

   El fondo lo pone quien lo usa: en el original cada página trae el suyo y es
   lo único que las diferencia de lejos. Va por `style` y no por clase — una
   clase armada con `${}` no la genera nunca el escáner de Tailwind, que lee el
   código como texto plano.

   ── La barra ──
   Es opcional: una página sin `indice` —/contacto, que tiene dos secciones— usa
   el mismo hero sin ella. Un índice de dos tramos no es un índice.

   Sólo son enlaces los tramos cuya sección ya existe en React. Los demás van
   como texto apagado: una barra de navegación donde la mitad de los clicks no
   hace nada se lee como rota, y estas páginas se migran por partes. `migradas`
   se actualiza en la página a medida que caen las secciones. */
export function HeroIndice({ hero, migradas = [], fondo, opacidad = 0.34 }) {
  return (
    <header className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden px-column pb-[clamp(2.4rem,6vh,4.5rem)] pt-[clamp(150px,20vh,240px)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url('${fondo}')`, opacity: opacidad }}
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
          <Migas tramos={hero.migas} />
        </Reveal>

        <Reveal inmediato delay={0.05} className="mt-[clamp(2.5rem,7vh,5rem)]">
          <Kicker>{hero.kicker}</Kicker>
        </Reveal>

        {/* El titular a la izquierda y la bajada en su propia columna a la
            derecha, alineadas por abajo: así la bajada cierra a la altura de la
            última línea del titular en vez de colgar debajo. En una columna
            vuelve a apilarse. */}
        <div className="grid gap-[clamp(1.2rem,3vw,3.5rem)] min-[1000px]:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] min-[1000px]:items-end">
          <Reveal
            inmediato
            as="h1"
            delay={0.1}
            className="mt-[-0.3rem] text-[clamp(2.4rem,4.6vw,4.8rem)] font-normal leading-[1.06] tracking-[-.03em]"
          >
            <Rich texto={hero.titulo} />
          </Reveal>

          <Reveal
            inmediato
            as="p"
            delay={0.16}
            className="text-bajada font-normal text-read max-[1000px]:max-w-[56ch] min-[1000px]:pb-[.5rem]"
          >
            {hero.bajada}
          </Reveal>
        </div>

        {hero.indice && (
        <Reveal
          inmediato
          as="nav"
          aria-label="Secciones de la página"
          delay={0.22}
          className="mt-[clamp(2.2rem,5vh,3.4rem)] flex flex-wrap gap-x-[clamp(1rem,1.8vw,1.9rem)] gap-y-[.7rem] border-t border-hair pt-[clamp(1.2rem,2vw,1.7rem)]"
        >
          {hero.indice.map((tramo) => {
            const listo = migradas.includes(tramo.id)
            return listo ? (
              <a
                key={tramo.id}
                href={`#${tramo.id}`}
                className="font-sans text-[.86rem] text-read-2 transition-colors duration-250 hover:text-lima"
              >
                {tramo.label}
              </a>
            ) : (
              <span
                key={tramo.id}
                className={cx('font-sans text-[.86rem] text-muted-2/70')}
                title="Sección todavía sin migrar"
              >
                {tramo.label}
              </span>
            )
          })}
        </Reveal>
        )}
      </div>
    </header>
  )
}
