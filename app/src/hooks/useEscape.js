import { useEffect } from 'react'

/** Escape cierra lo que esté abierto. Se registra solo mientras `activo`. */
export function useEscape(activo, alCerrar) {
  useEffect(() => {
    if (!activo) return
    const alTecla = (e) => {
      if (e.key === 'Escape') alCerrar()
    }
    addEventListener('keydown', alTecla)
    return () => removeEventListener('keydown', alTecla)
  }, [activo, alCerrar])
}
