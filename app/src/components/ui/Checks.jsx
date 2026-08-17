import { Check } from 'lucide-react'
import { cx } from '../../lib/cx'
import { Rich } from './Rich'

/* El check va absoluto y el <li> es un bloque normal: admite cualquier marcado
   inline sin romperse. Con `display:grid` cada corrida de texto separada por una
   etiqueta se volvía un item propio, así que un <li> con <b> adentro generaba
   TRES items y el texto se partía en filas. */
/* `grilla` reparte los items en columnas en vez de apilarlos. Se llamaba `dos`,
   pero auto-fit hace las columnas que entren —tres en «El diferencial»— así que
   el nombre mentía sobre lo que hace. */
export function Checks({ items, grilla = false, className, negritaLima = false }) {
  return (
    <ul
      className={cx(
        grilla
          ? 'grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-[clamp(1.5rem,3.4vw,3.4rem)]'
          : 'flex flex-col gap-[.1rem]',
        negritaLima && '[&_b]:text-lima',
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item}
          className="relative border-t border-hair py-4 pl-[2.4rem] text-[.97rem] leading-[1.6] text-read-3"
        >
          <span
            aria-hidden
            className="absolute left-0 top-[1.28rem] grid h-4 w-4 place-items-center rounded border border-hair-lima bg-lima/15"
          >
            <Check className="h-3 w-3 text-lima" strokeWidth={3} />
          </span>
          <Rich texto={item} />
        </li>
      ))}
    </ul>
  )
}
