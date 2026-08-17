import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* En una SPA el navegador conserva el scroll al cambiar de ruta: se entra a la
   página nueva a mitad de página. Con `hash` no se toca — ese caso es un ancla
   dentro de la misma página. */
export function ScrollAlTope() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
