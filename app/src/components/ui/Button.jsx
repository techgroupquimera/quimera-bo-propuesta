import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cx } from '../../lib/cx'

/* Dos variantes de la MISMA forma: mismo alto (2.6em), mismo radio (.85em),
   mismo cuerpo (15px/500) y el mismo interletrado. Lo único que cambia es el
   peso visual — el primario se pinta de lima y se lleva el chip; el ghost es
   hairline sobre el fondo.

   · primario — el CTA de la marca. El chrome está en index.css (.cta /
     .cta-icono): al pasar el mouse el chip crece hasta ocupar el botón.
   · ghost    — todo lo demás. La flecha es opcional (`flecha`) porque hay
     botones que llevan otro ícono adelante o van hacia atrás.

   La flecha la pone el componente: las etiquetas del contenido no llevan «→».
   Cuando lo hacían salía dos veces en el primario, y en el ghost quedaba un
   glifo de texto al lado de íconos de librería. */
const GHOST =
  'group inline-flex h-[2.6em] cursor-pointer items-center justify-center gap-2 whitespace-nowrap ' +
  'rounded-[.85em] border border-hair bg-white/4 px-[1.15em] ' +
  'font-sans text-[15px] font-medium tracking-[.04em] text-paper ' +
  'transition-[background,border-color,color] duration-300 ease-soft ' +
  'hover:border-hair-lima hover:bg-lima/8 hover:text-lima'

export function Button({
  variante = 'ghost',
  flecha = false,
  href,
  className,
  children,
  ...resto
}) {
  const primario = variante === 'primario'
  const clases = cx(primario ? 'cta font-sans whitespace-nowrap' : GHOST, className)

  const contenido = primario ? (
    <>
      {children}
      <span className="cta-icono">
        <ArrowRight aria-hidden strokeWidth={2.2} />
      </span>
    </>
  ) : (
    <>
      {children}
      {flecha && (
        <ArrowRight
          aria-hidden
          strokeWidth={2.2}
          className="h-[1.05em] w-[1.05em] transition-transform duration-300 ease-soft group-hover:translate-x-[.15em]"
        />
      )}
    </>
  )

  if (href) {
    const externo = /^(https?:|mailto:|tel:)/.test(href)
    return externo ? (
      <a href={href} target="_blank" rel="noopener" className={clases} {...resto}>
        {contenido}
      </a>
    ) : (
      <Link to={href} className={clases} {...resto}>
        {contenido}
      </Link>
    )
  }

  return (
    <button type="button" className={clases} {...resto}>
      {contenido}
    </button>
  )
}
