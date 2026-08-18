import { cx } from '../../lib/cx'

/* Sección sobre panel propio, separada del resto de la página.
   La usan las dos secciones armadas alrededor de un reel — «Cien mensajes» y
   «No arranca con una propuesta» — así el tratamiento se lee como un sistema
   («las que traen video van sobre panel») y no como dos decisiones sueltas.

   El verde vive en .fondo-verde (index.css), compartido con el bloque de «No
   son promesas».

   ── `sangre` ──
   El mismo verde pero de borde a borde de la ventana, sin caja. Cambian tres
   cosas y ninguna es decorativa:

   · el ancho máximo se va del <section> y pasa a .px-column, que reproduce la
     columna de contenido SIN limitar el fondo. Es la diferencia entre un panel
     y una franja: el color llega al borde, el texto sigue alineado con el
     resto del sitio.
   · las esquinas redondeadas se van. A ancho completo curvarse contra el borde
     de la ventana no se lee como una caja, se lee como un recorte mal hecho.
   · el borde queda SOLO arriba. A los costados no hay nada que bordear, y
     abajo la línea ya la pone la sección siguiente: todas las <Section> del
     sitio abren con su propio hairline. Con las dos, debajo de la franja
     quedaban dos líneas paralelas separadas por un pelo, que es lo que se ve
     como error de maquetado y no como sistema.

   El aire de afuera baja a un cuarto del de la página, no a cero: sin él, el
   hairline de la sección de abajo cae justo sobre el canto de la franja y la
   deja subrayada. */
export function PanelVerde({ id, sangre = false, className, pie, children }) {
  return (
    /* El panel lleva su propio aire adentro, así que la sección aporta la mitad
       que las demás: entre el margen de afuera y el padding de adentro queda el
       mismo respiro que en el resto del sitio. Sale de --spacing-aire y no de un
       clamp propio, así el panel sigue el ritmo de SU página —cada una fija esa
       variable— en vez de quedarse con el del home. */
    <section
      id={id}
      className={cx(
        'contenido-diferido',
        sangre
          ? 'py-[calc(var(--spacing-aire)/4)]'
          : 'mx-auto max-w-maxw px-g py-[calc(var(--spacing-aire)/2)]',
      )}
    >
      <div
        className={cx(
          'fondo-verde',
          sangre
            ? 'border-t border-hair-lima px-column py-[clamp(2.8rem,5.5vw,5rem)]'
            : cx(
                'rounded-[clamp(18px,1.8vw,28px)] border border-hair-lima',
                'px-[clamp(1.4rem,3.4vw,4rem)] py-[clamp(2.4rem,5vw,4.5rem)]',
              ),
          className,
        )}
      >
        {children}
      </div>

      {/* Lo que va DEBAJO del panel, sobre el fondo de la página y no adentro
          del verde. Lo usa la franja de pastillas de /servicios.

          A sangre el <section> ya no trae columna —la lleva la franja—, así que
          el pie se la pone él: si no, saldría pegado al borde de la ventana. */}
      {pie && (sangre ? <div className="mx-auto max-w-maxw px-g">{pie}</div> : pie)}
    </section>
  )
}
