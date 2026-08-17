import { Base } from '../components/tecnologia/Base'
import { Diferencial } from '../components/tecnologia/Diferencial'
import { Hero } from '../components/tecnologia/Hero'
import { Seguridad } from '../components/tecnologia/Seguridad'
import { Stack } from '../components/tecnologia/Stack'
import { Cierre } from '../components/ui/Cierre'
import { CIERRE } from '../content/tecnologia'

/* /tecnologia · completa.
   Mismo ritmo apretado que /servicios: son páginas internas del mismo tipo.

   «Sin ataduras» NO se migra: el cliente pidió sacarla. Iba entre «Antes del
   stack» y ciberseguridad, y hablaba de código abierto, respaldos automáticos y
   alojar en la nube o en servidor propio. Queda en tecnologia.html por si hay
   que recuperarla. */
export default function Tecnologia() {
  return (
    <div className="[--spacing-aire:clamp(72px,9.6vh,146px)]">
      <Hero />
      <Stack />
      <Base />
      <Seguridad />
      <Diferencial />
      {/* Mismo componente que el cierre del home y de /servicios */}
      <Cierre cierre={CIERRE} />
    </div>
  )
}
