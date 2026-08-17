import { Agente } from '../components/home/Agente'
import { Auditoria } from '../components/home/Auditoria'
import { Hero } from '../components/home/Hero'
import { Problema } from '../components/home/Problema'
import { PruebaReal } from '../components/home/PruebaReal'
import { Sistemas } from '../components/home/Sistemas'
import { Autoridad } from '../components/ui/Autoridad'
import { Bio } from '../components/ui/Bio'
import { Cierre } from '../components/ui/Cierre'
import { Marcas } from '../components/ui/Marcas'
import { AUTORIDAD, BIO, CIERRE } from '../content/home'

/* Arco:
   problema → qué construimos → un caso → la prueba → la placa → él →
   la visita → el primer paso.

   La placa de CAMEBOL estaba arriba, justo después del problema: la variante B
   la había subido del 65% al ~30% porque Johnny era la última cara en aparecer
   en un sitio cuya tesis es que la web continúa su charla. Ahora baja y queda
   pegada a «No son promesas»: los sistemas corriendo y la placa son las dos
   pruebas del sitio y juntas pesan más, y Ferrante entra después como quien
   las firma. Sigue apareciendo antes del cierre, así que el problema que B
   arreglaba no vuelve. */
export default function Home() {
  return (
    <>
      <Hero />
      <Marcas />
      <Problema />
      <Sistemas />
      <Agente />
      <PruebaReal />
      <Autoridad autoridad={AUTORIDAD} />
      <Bio bio={BIO} />
      <Auditoria />
      <Cierre cierre={CIERRE} />
    </>
  )
}
