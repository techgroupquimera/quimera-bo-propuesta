import { REVISION } from '../../lib/revision'
import { Eyebrow } from './Kicker'
import { Section } from './Section'

/* Marcador de lo que falta migrar de una página. No es diseño: es un recordatorio
   visible mientras la página se arma por partes, para que nadie la dé por
   terminada al ver el hero listo. Se saca de la página cuando no queda nada.

   Hoy lo usa sólo /proyectos, a la que le falta «El caso Shiba». */
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
