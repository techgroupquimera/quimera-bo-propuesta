import { Construimos } from '../components/servicios/Construimos'
import { Diferencial } from '../components/servicios/Diferencial'
import { Formas } from '../components/servicios/Formas'
import { Hero } from '../components/servicios/Hero'
import { Problema } from '../components/servicios/Problema'
import { Proceso } from '../components/servicios/Proceso'
import { Resolvemos } from '../components/servicios/Resolvemos'
import { Trabajamos } from '../components/servicios/Trabajamos'
import { Cierre } from '../components/ui/Cierre'
import { CIERRE } from '../content/servicios'

/* /servicios · completa.

   La página corre con menos aire entre secciones que el home: --spacing-aire
   se pisa una vez acá y lo toman todas las Section de adentro, incluidas las
   que falten. Acá las secciones son capítulos de un mismo argumento y se leen
   seguidas; el aire del home las dejaba sueltas. */
export default function Servicios() {
  return (
    <div className="[--spacing-aire:clamp(72px,9.6vh,146px)]">
      <Hero />
      <Problema />
      <Construimos />
      <Resolvemos />
      <Trabajamos />
      <Diferencial />
      <Formas />
      <Proceso />
      {/* Mismo componente que el cierre del home, con el copy de esta página */}
      <Cierre cierre={CIERRE} />
    </div>
  )
}
