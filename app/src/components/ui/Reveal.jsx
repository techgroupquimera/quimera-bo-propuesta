import { useInView } from '../../hooks/useInView'
import { cx } from '../../lib/cx'

/* El .rv del sitio original: entra desde 22px abajo, 1s, ease suave.
   `delay` va en segundos para que se lea igual que en el HTML (.07, .14, .21).

   El `style` del llamador se mezcla, no se pisa: iba después del spread y
   cualquiera que pasara un style —para una custom property, por ejemplo— se
   llevaba puesto el transitionDelay y el escalonado dejaba de existir sin que
   nada avisara.

   ── `inmediato`: para lo que ya está en pantalla al cargar ──
   La entrada normal la dispara un IntersectionObserver, o sea JavaScript. Para
   una sección que aparece al scrollear eso está bien: para cuando el visitante
   llega, el bundle hace rato que corrió.

   Para el hero de una página es al revés, y se paga caro. El titular está en
   pantalla desde el primer instante, así que el observer se cumple enseguida —
   pero «enseguida» es después de bajar, parsear e hidratar React. Medido en
   /nosotros: el <h1> es el elemento LCP y no se pintaba hasta los 3,4 s, porque
   estaba esperando a que el JavaScript le diera permiso para existir.

   Con `inmediato` la misma entrada la hace CSS —el keyframe `intro-hero`, el
   mismo que usa el hero del home— y arranca con el primer pintado, sin esperar
   a nada. La coreografía se ve igual; lo que cambia es quién la dispara.

   Regla práctica: `inmediato` en todo lo que esté sobre el pliegue, el
   observer para el resto. */
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  inmediato = false,
  className,
  style,
  children,
  ...resto
}) {
  const [ref, visible] = useInView()

  if (inmediato) {
    return (
      <Tag
        data-intro
        style={{
          '--intro-en': `${delay * 1000}ms`,
          '--intro-dura': '1000ms',
          '--intro-y': '22px',
          /* el keyframe trae --ease-intro por defecto (el del hero del home);
             acá se pisa con el ease del reveal de siempre */
          '--intro-ease': 'var(--ease-soft)',
          ...style,
        }}
        className={className}
        {...resto}
      >
        {children}
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}s`, ...style } : style}
      className={cx(
        'transition-[opacity,transform] duration-1000 ease-soft motion-reduce:transition-none',
        /* El escondido va como clase propia y no como utilidades sueltas: la
           regla vive en index.css bajo `[data-js]`, así que sólo se aplica si
           hay JavaScript. Sin él la sección se ve, que es como sale en el HTML
           pre-renderizado. Ver el porqué en index.css. */
        !visible && 'reveal-oculto',
        className,
      )}
      {...resto}
    >
      {children}
    </Tag>
  )
}
