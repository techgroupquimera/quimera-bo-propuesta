import { REVISION } from '../../lib/revision'
import { useNotas } from '../overlays/NotasContext'

/* Dato pendiente de confirmar del lado del cliente. Ámbar, subrayado punteado,
   y al tocarlo abre el panel de revisión donde está la explicación completa.

   Va como <span> y no como <button>: el marcador es inline dentro de un párrafo
   que puede traer uppercase o tracking propios, y el <button> corta esa herencia
   (además de alinear el borde punteado a su propia caja, que queda a media
   altura del texto en vez de debajo). */
export function Pend({ nota, children }) {
  const { abrir } = useNotas()

  /* La capa de revisión apagada no deja rastro: el hijo de <Pend> ES el
     recordatorio («Falta el número real», «apellido y rol por confirmar»), no
     copy de la página, así que devolver los hijos sin el marcador dejaría una
     nota interna suelta en medio de un párrafo. El hook se llama igual y la
     salida temprana va después: es una constante de módulo, pero llamar hooks
     antes de cualquier return es la regla y no se rompe por un caso. */
  if (!REVISION) return null

  return (
    <span
      role="button"
      tabIndex={0}
      title={nota}
      onClick={abrir}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          abrir()
        }
      }}
      className="cursor-help border-b border-dashed border-pend bg-pend/6 px-[.2em] text-pend"
    >
      {children}
    </span>
  )
}
