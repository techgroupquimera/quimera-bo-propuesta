import { Acuerdo } from '../components/proyectos/Acuerdo'
import { Agentes } from '../components/proyectos/Agentes'
import { Destacado } from '../components/proyectos/Destacado'
import { Sitios } from '../components/proyectos/Sitios'
import { Cierre } from '../components/ui/Cierre'
import { HeroIndice } from '../components/ui/HeroIndice'
import { CIERRE, HERO_TECNOLOGIA } from '../content/proyectos'

/* /proyectos/tecnologia · lo que está corriendo.

   Las cuatro secciones de sistemas de la /proyectos original, en su orden: los
   doce sitios, los agentes atendiendo, el caso Bolivia Fitness —que es un
   agente, por eso cae de este lado— y los que corren bajo acuerdo.

   Los componentes son los mismos, sin tocar: la división es de páginas, no de
   secciones. Lo único propio es el hero.

   `migradas` va con las cuatro puestas porque las cuatro existen. La barra del
   hero era una perilla de migración —marcaba en gris lo que todavía vivía en
   el HTML original— y en esta página ya no queda nada en gris. */
const MIGRADAS = ['sitios', 'agentes', 'destacado', 'acuerdo']

export default function ProyectosTecnologia() {
  return (
    <div className="aire-corto">
      <HeroIndice
        hero={HERO_TECNOLOGIA}
        migradas={MIGRADAS}
        fondo={HERO_TECNOLOGIA.fondo.src}
        opacidad={HERO_TECNOLOGIA.fondo.opacidad}
      />
      <Sitios />
      <Agentes />
      <Destacado />
      <Acuerdo />
      {/* El mismo cierre de la entrada: el próximo caso puede ser el tuyo. No
          se duplica copy — es el mismo objeto de contenido. */}
      <Cierre cierre={CIERRE} />
    </div>
  )
}
