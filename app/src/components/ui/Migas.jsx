import { Link } from 'react-router-dom'
import { cx } from '../../lib/cx'

/* Rastro de navegación de las páginas internas. El último tramo es la página
   actual: va sin enlace y marcado con aria-current, que es lo que lo distingue
   para un lector de pantalla ahora que visualmente sólo cambia el color. */
export function Migas({ tramos, className }) {
  return (
    <nav
      aria-label="Ruta"
      className={cx(
        'font-sans text-eyebrow font-semibold uppercase tracking-[.18em] text-muted-2',
        className,
      )}
    >
      {tramos.map((tramo, i) => (
        <span key={tramo.label}>
          {i > 0 && (
            <i aria-hidden className="mx-2 not-italic opacity-50">
              ›
            </i>
          )}
          {tramo.href ? (
            <Link to={tramo.href} className="transition-colors duration-250 hover:text-lima">
              {tramo.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-muted">
              {tramo.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
