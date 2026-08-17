import { useEffect, useState } from 'react'

/* ¿El sistema pide menos movimiento? Lo que se puede resolver con
   `motion-reduce:` en CSS va por CSS; esto es para lo que hay que decidir en
   JS — por ejemplo no armar el temporizador que rota el stack solo.

   Escucha el cambio: alguien puede activar la preferencia con la página
   abierta, y un temporizador que ya arrancó seguiría corriendo. */
const CONSULTA = '(prefers-reduced-motion: reduce)'

/* Arranca en `false` siempre, también en el navegador, y el valor real llega en
   el efecto. Es por el HTML pre-renderizado: en el build no hay `matchMedia`,
   así que el servidor escribe el marcado como si no hubiera preferencia. Si acá
   se leyera la preferencia en el primer render, quien la tenga puesta
   hidrataría un árbol distinto del que vino en la respuesta, y React descarta el
   HTML del servidor y vuelve a renderizar del lado del cliente — justo lo que el
   pre-render viene a evitar.

   Un frame de diferencia no se ve: lo que este hook decide (no armar el
   temporizador que rota el stack, no arrancar el loop del hero) son cosas que
   igual pasan en un efecto. */
export function useSinMovimiento() {
  const [sinMovimiento, setSinMovimiento] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia?.(CONSULTA)
    if (!mq) return
    setSinMovimiento(mq.matches)
    const alCambiar = (e) => setSinMovimiento(e.matches)
    mq.addEventListener('change', alCambiar)
    return () => mq.removeEventListener('change', alCambiar)
  }, [])

  return sinMovimiento
}
