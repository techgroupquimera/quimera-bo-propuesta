import { useRef, useState } from 'react'

/* El apellido calado, a casi todo el ancho de pantalla, con un foco que sigue
   al mouse y pinta de blanco la parte que toca.

   Son dos copias de la misma palabra, una encima de la otra: abajo el calado
   lima de siempre, arriba el mismo calado en blanco, recortado con una máscara
   radial centrada en el cursor. Se mueven dos custom properties en cada
   mousemove y la máscara se recalcula sola — sin re-render de React, que a esta
   frecuencia se nota.

   La capa blanca va con pointer-events:none: si capturara el mouse, el
   mousemove del contenedor dejaría de dispararse sobre ella y el foco se
   quedaría trabado. */
const FOCO =
  'radial-gradient(circle at var(--fx,50%) var(--fy,50%),#000 0,#000 5vw,transparent 12vw)'

export function NombreCalado({ texto }) {
  const banda = useRef(null)
  const [activo, setActivo] = useState(false)

  const seguir = (e) => {
    const el = banda.current
    if (!el) return
    const caja = el.getBoundingClientRect()
    el.style.setProperty('--fx', `${e.clientX - caja.left}px`)
    el.style.setProperty('--fy', `${e.clientY - caja.top}px`)
  }

  return (
    <div
      ref={banda}
      aria-hidden
      onMouseMove={seguir}
      onMouseEnter={() => setActivo(true)}
      onMouseLeave={() => setActivo(false)}
      /* px chico y no el gutter del sitio: acá la palabra tiene que llegar
         al borde, no alinearse con la columna de texto */
      className="relative select-none px-[clamp(10px,1.6vw,32px)]"
    >
      <span className="block whitespace-nowrap stroke-lima text-center font-display text-[clamp(3rem,30.5vw,44rem)] leading-[.74] max-[900px]:whitespace-normal max-[900px]:text-[clamp(3rem,18vw,7rem)]">
        {texto}
      </span>

      <span
        className="pointer-events-none absolute inset-0 block whitespace-nowrap stroke-paper px-[clamp(10px,1.6vw,32px)] text-center font-display text-[clamp(3rem,30.5vw,44rem)] leading-[.74] transition-opacity duration-300 ease-soft max-[900px]:whitespace-normal max-[900px]:text-[clamp(3rem,18vw,7rem)]"
        style={{
          opacity: activo ? 1 : 0,
          maskImage: FOCO,
          WebkitMaskImage: FOCO,
        }}
      >
        {texto}
      </span>
    </div>
  )
}
