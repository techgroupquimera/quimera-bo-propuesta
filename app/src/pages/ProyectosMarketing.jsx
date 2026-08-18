import { Campanas } from '../components/proyectos/Campanas'
import { Contenido } from '../components/proyectos/Contenido'
import { Marca } from '../components/proyectos/Marca'
import { Cierre } from '../components/ui/Cierre'
import { HeroIndice } from '../components/ui/HeroIndice'
import { CIERRE, HERO_MARKETING } from '../content/proyectos'

/* /proyectos/marketing · lo que salió al aire.

   Las tres secciones de comunicación de la /proyectos original, en su orden:
   los manuales de marca, las piezas de contenido y la tira de campañas.

   Los componentes son los mismos, sin tocar: la división es de páginas, no de
   secciones. Lo único propio es el hero. */
const MIGRADAS = ['marca', 'contenido', 'anuncios']

export default function ProyectosMarketing() {
  return (
    <div className="aire-corto">
      <HeroIndice
        hero={HERO_MARKETING}
        migradas={MIGRADAS}
        fondo={HERO_MARKETING.fondo.src}
        opacidad={HERO_MARKETING.fondo.opacidad}
      />
      <Marca />
      <Contenido />
      <Campanas />
      {/* El mismo cierre de la entrada: el próximo caso puede ser el tuyo. No
          se duplica copy — es el mismo objeto de contenido. */}
      <Cierre cierre={CIERRE} />
    </div>
  )
}
