import { useNotas } from '../overlays/NotasContext'

/* Dato pendiente de confirmar del lado del cliente. Ámbar, subrayado punteado,
   y al tocarlo abre el panel de revisión donde está la explicación completa.

   Va como <span> y no como <button>: el marcador es inline dentro de un párrafo
   que puede traer uppercase o tracking propios, y el <button> corta esa herencia
   (además de alinear el borde punteado a su propia caja, que queda a media
   altura del texto en vez de debajo). */
export function Pend({ nota, children }) {
  const { abrir } = useNotas()

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
