import { Accesos } from '../components/proyectos/Accesos'
import { Cierre } from '../components/ui/Cierre'
import { HeroIndice } from '../components/ui/HeroIndice'
import { Marcas } from '../components/ui/Marcas'
import { PendienteSeccion } from '../components/ui/PendienteSeccion'
import { CIERRE, HERO } from '../content/proyectos'

/* /proyectos · la entrada.

   La página era una sola con siete secciones y ~55 piezas: doce sitios, seis
   agentes, ocho manuales de marca, seis reels, la tira de campañas y los
   sistemas bajo acuerdo. Eran dos trabajos distintos bajo un mismo título —lo
   que CORRE y lo que se PUBLICA— y quien entraba buscando uno tenía que
   scrollear el otro entero.

   Ahora esta página sólo bifurca, y las secciones viven en /proyectos/tecnologia
   y /proyectos/marketing. El titular se queda acá porque es el paraguas de las
   dos: «No son promesas. Están funcionando».

   «El caso Shiba» también se queda: es el único cliente con material en las
   cinco categorías —manual, dos sitios, agente, reel y ocho piezas—, así que
   cruza las dos páginas y no pertenece a ninguna. Sigue sin migrar, y por eso
   por ahora es el marcador de pendiente y no la sección. */
export default function Proyectos() {
  return (
    <div className="aire-corto">
      <HeroIndice hero={HERO} fondo={HERO.fondo.src} opacidad={HERO.fondo.opacidad} />
      <Accesos />
      <PendienteSeccion origen="el HTML original (26b67ac)" pendientes={['El caso Shiba']} />
      {/* La misma tira del home, con la misma frase. En el original está en las
          dos páginas; acá cierra en vez de abrir. */}
      <Marcas />
      {/* Mismo componente que el cierre del home, con el copy de esta página */}
      <Cierre cierre={CIERRE} />
    </div>
  )
}
