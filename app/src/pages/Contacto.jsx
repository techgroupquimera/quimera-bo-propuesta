import { Formulario } from '../components/contacto/Formulario'
import { HeroIndice } from '../components/ui/HeroIndice'
import { PendienteSeccion } from '../components/ui/PendienteSeccion'
import { HERO } from '../content/contacto'

/* /contacto · migrado por partes, de arriba hacia abajo.

   El hero es el mismo componente que el de /proyectos y /nosotros, con el fondo
   propio de esta página y sin la barra de índice: son dos secciones, y un
   índice de dos tramos no es un índice.

   ── Una advertencia sobre el alto ──
   El hero ocupa el alto de la pantalla, como en las demás páginas. En ésta eso
   deja el formulario entero abajo del pliegue, y el original justamente le
   había puesto a este hero un alto corto (`padding-bottom:clamp(30px,4vh,50px)`
   en vez del alto completo) por esa razón. Se hizo igual que las otras porque
   es lo que se pidió; si se quiere el formulario a la vista, es cambiar el
   `min-h-svh` del componente por un alto propio para esta página. */
export default function Contacto() {
  return (
    <div className="aire-corto">
      <HeroIndice hero={HERO} fondo={HERO.fondo.src} opacidad={HERO.fondo.opacidad} />
      <Formulario />
      <PendienteSeccion origen="contacto.html" pendientes={['Dónde estamos']} />
    </div>
  )
}
