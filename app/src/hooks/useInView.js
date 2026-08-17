import { useEffect, useRef, useState } from 'react'

/* Un observer por elemento, que se desconecta al primer cruce: el reveal es
   de ida, no de ida y vuelta. Con prefers-reduced-motion no se instala el
   observer: la sección se muestra y listo.

   El primer render siempre sale oculto, incluso con la preferencia puesta. Es
   por el HTML pre-renderizado: en el build no hay `matchMedia`, así que el
   servidor escribe el marcado oculto. Leer la preferencia en el primer render
   del cliente daría un árbol distinto del que vino en la respuesta y React
   tiraría el HTML del servidor para rehacerlo entero. Se resuelve en el efecto,
   que corre antes de que se pinte nada. */
const sinMovimiento = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function useInView({ threshold = 0.1, rootMargin = '0px 0px -6% 0px' } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    if (sinMovimiento()) {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            setVisible(true)
            io.disconnect()
          }
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin, visible])

  return [ref, visible]
}
