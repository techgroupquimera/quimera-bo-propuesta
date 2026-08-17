import { cx } from '../../lib/cx'

/* La columna de contenido del sitio: un ancho máximo, centrada, con el gutter
   lateral común. Los fondos a sangre van aparte, absolutos dentro de la sección.

   Acá vivía también un <Head> que armaba kicker + titular + bajada en bloque.
   Se fue cuando las secciones pasaron a encabezados partidos: cada una acomoda
   esas tres piezas distinto, y un componente que ya no comparte nadie es una
   indirección de más. */
/* El resto de props va al <section>: hay secciones que necesitan un ref (para
   un observer) o manejadores de mouse y foco (para frenar una rotación). En
   React 19 `ref` es una prop más, así que viaja en el spread como cualquier
   otra. */
/* ── `contenido-diferido` ──
   Le dice al navegador que no calcule el layout ni pinte una sección hasta que
   esté cerca de la pantalla. Es `content-visibility: auto`, y está en
   index.css junto con su `contain-intrinsic-size`.

   Importa porque el home son diez secciones y /proyectos casi otras tantas: sin
   esto, la primera pantalla no se pinta hasta haber maquetado la página entera,
   incluidas nueve secciones que nadie va a ver todavía. Medido, era la mitad
   del trabajo de layout de la carga.

   No va en el hero, que es lo único que sí se ve desde el arranque. */
export function Section({ id, className, borde = true, children, ...resto }) {
  return (
    <section
      id={id}
      className={cx(
        'contenido-diferido relative mx-auto max-w-maxw px-g py-aire',
        borde && 'border-t border-hair',
        className,
      )}
      {...resto}
    >
      {children}
    </section>
  )
}
