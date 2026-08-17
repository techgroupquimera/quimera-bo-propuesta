import { useState } from 'react'

/* Muestra los primeros N de una lista y deja el resto detrás de un botón.
   Lo usan «Sitios en producción» (12) y «Marcas construidas» (7) de /proyectos:
   las dos son grillas de capturas, y tirarlas todas de una es lo que hacía
   sentir la página como «todo en un solo lugar».

   Lo que NO está montado no pesa: las ocultas ni siquiera piden su imagen. */
export function useDesplegable(items, visibles) {
  const [abierto, setAbierto] = useState(false)

  return {
    lista: abierto ? items : items.slice(0, visibles),
    abierto,
    alternar: () => setAbierto((v) => !v),
    ocultas: Math.max(0, items.length - visibles),
  }
}
