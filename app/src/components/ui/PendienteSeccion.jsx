import { REVISION } from '../../lib/revision'
import { Eyebrow } from './Kicker'
import { Section } from './Section'

/* Marcador de lo que falta migrar de una página. No es diseño: es un recordatorio
   visible mientras la página se arma por partes, para que nadie la dé por
   terminada al ver el hero listo. Se saca de la página cuando no queda nada.

   Lo usan /proyectos («El caso Shiba») y /contacto («Dónde estamos»).

   `origen` decía el archivo del sitio original —«proyectos6.html»— y esos
   archivos se borraron del árbol cuando el sitio en React quedó completo. Ahora
   dice el commit, que es donde siguen enteros: `git show 26b67ac:proyectos6.html`.

   Nada de esto se ve hoy: la capa de revisión está apagada (lib/revision.js). */
export function PendienteSeccion({ origen, pendientes }) {
  if (!REVISION) return null

  return (
    <Section>
      <Eyebrow className="text-pend">Todavía en {origen}</Eyebrow>
      <ul className="mt-[1.2rem] flex flex-wrap gap-x-[1.6rem] gap-y-[.6rem]">
        {pendientes.map((nombre) => (
          <li key={nombre} className="text-[.9rem] text-muted-2">
            {nombre}
          </li>
        ))}
      </ul>
    </Section>
  )
}
