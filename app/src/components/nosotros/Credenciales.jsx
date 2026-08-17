import { Check } from 'lucide-react'
import { BIO } from '../../content/nosotros'
import { Pend } from '../ui/Pend'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'

/* Las credenciales de Johnny, al pie de su bloque. En tarjetas y no en la lista
   de tildes que usa el resto del sitio: son cuatro reconocimientos sueltos, no
   los puntos de un mismo argumento, y a todo el ancho de la columna cada uno se
   leía como una línea perdida en un renglón de 1400px.

   Cuatro columnas y no dos: los textos son de largos muy distintos —de 16 a 170
   caracteres— y en dos columnas la fila del corto quedaba con la mitad vacía.
   En cuatro, la grilla empareja el alto y el desbalance se reparte.

   El marcador de dato pendiente vive dentro de su tarjeta, que es donde el
   original lo pone. No hay conflicto de interactivos: acá la tarjeta no es un
   enlace. */
export function Credenciales() {
  return (
    <ul className="grid gap-[clamp(.6rem,1vw,1rem)] min-[640px]:grid-cols-2 min-[1100px]:grid-cols-4">
      {BIO.credenciales.map((credencial, i) => (
        <Reveal
          as="li"
          key={credencial.texto}
          delay={i * 0.06}
          className="flex flex-col rounded-[clamp(12px,1.1vw,16px)] border border-hair bg-white/2.5 p-[clamp(1.1rem,1.5vw,1.4rem)] transition-[background,border-color] duration-350 ease-soft hover:border-hair-lima hover:bg-white/5"
        >
          <span
            aria-hidden
            className="grid h-4 w-4 shrink-0 place-items-center rounded border border-hair-lima bg-lima/15"
          >
            <Check className="h-3 w-3 text-lima" strokeWidth={3} />
          </span>

          <p className="mt-[.9rem] text-[.88rem] leading-[1.6] text-read-3">
            <Rich texto={credencial.texto} />
          </p>

          {credencial.pend && (
            /* mt-auto lo empuja al pie: así queda alineado con el borde de
               abajo de la tarjeta en vez de flotando bajo un texto corto */
            <p className="mt-auto pt-[.9rem] text-[.78rem]">
              <Pend nota={credencial.pend.nota}>{credencial.pend.texto}</Pend>
            </p>
          )}
        </Reveal>
      ))}
    </ul>
  )
}
