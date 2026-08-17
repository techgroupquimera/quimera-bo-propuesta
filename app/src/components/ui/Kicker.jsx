import { cx } from '../../lib/cx'

/* Etiqueta de sección con el punto de luz lima delante. */
export function Kicker({ className, children }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-[.6rem] font-sans text-kicker font-semibold uppercase text-lima-2',
        className,
      )}
    >
      <span
        aria-hidden
        className="h-[5px] w-[5px] shrink-0 rounded-full bg-lima shadow-[0_0_10px_var(--color-lima)]"
      />
      {children}
    </span>
  )
}

/* Etiquetita suelta, sin punto (los "Lo que hace un agente…" del original). */
export function Eyebrow({ className, children }) {
  return (
    <p className={cx('font-sans text-eyebrow font-semibold uppercase text-muted-2', className)}>
      {children}
    </p>
  )
}
