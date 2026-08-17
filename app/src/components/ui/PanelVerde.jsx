import { cx } from '../../lib/cx'

/* Sección sobre panel propio, separada del resto de la página.
   La usan las dos secciones armadas alrededor de un reel — «Cien mensajes» y
   «No arranca con una propuesta» — así el tratamiento se lee como un sistema
   («las que traen video van sobre panel») y no como dos decisiones sueltas.

   El verde vive en .fondo-verde (index.css), compartido con el bloque de «No
   son promesas». */
export function PanelVerde({ id, className, pie, children }) {
  return (
    /* El panel lleva su propio aire adentro, así que la sección aporta la mitad
       que las demás: entre el margen de afuera y el padding de adentro queda el
       mismo respiro que en el resto del sitio. Sale de --spacing-aire y no de un
       clamp propio, así el panel sigue el ritmo de SU página —cada una fija esa
       variable— en vez de quedarse con el del home. */
    <section id={id} className="contenido-diferido mx-auto max-w-maxw px-g py-[calc(var(--spacing-aire)/2)]">
      <div
        className={cx(
          'fondo-verde rounded-[clamp(18px,1.8vw,28px)] border border-hair-lima',
          'px-[clamp(1.4rem,3.4vw,4rem)] py-[clamp(2.4rem,5vw,4.5rem)]',
          className,
        )}
      >
        {children}
      </div>

      {/* Lo que va DEBAJO del panel, sobre el fondo de la página y no adentro
          del verde. Lo usa la franja de pastillas de /servicios. */}
      {pie}
    </section>
  )
}
