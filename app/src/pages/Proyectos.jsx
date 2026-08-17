import { Acuerdo } from '../components/proyectos/Acuerdo'
import { Agentes } from '../components/proyectos/Agentes'
import { Campanas } from '../components/proyectos/Campanas'
import { Contenido } from '../components/proyectos/Contenido'
import { Destacado } from '../components/proyectos/Destacado'
import { Marca } from '../components/proyectos/Marca'
import { Sitios } from '../components/proyectos/Sitios'
import { Cierre } from '../components/ui/Cierre'
import { HeroIndice } from '../components/ui/HeroIndice'
import { Marcas } from '../components/ui/Marcas'
import { PendienteSeccion } from '../components/ui/PendienteSeccion'
import { CIERRE, HERO } from '../content/proyectos'

/* /proyectos · migrado por partes, de arriba hacia abajo.
   Mismo ritmo apretado que /servicios y /tecnologia.

   MIGRADAS es la única perilla de la barra de índice del hero: se agrega el id
   de cada sección cuando cae, y su tramo pasa de texto apagado a enlace. */
const MIGRADAS = ['sitios', 'agentes', 'marca', 'contenido', 'anuncios', 'acuerdo']

/* «El caso Shiba» va entre Sitios y Agentes en el original. Se migra después:
   es el único bloque centrado y a sangre de la página, así que no comparte
   nada con las secciones de grilla y conviene armarlo aparte. */
export default function Proyectos() {
  return (
    <div className="[--spacing-aire:clamp(72px,9.6vh,146px)]">
      <HeroIndice
        hero={HERO}
        migradas={MIGRADAS}
        fondo={HERO.fondo.src}
        opacidad={HERO.fondo.opacidad}
      />
      <Sitios />
      <Agentes />
      <Destacado />
      <Marca />
      <Contenido />
      <Campanas />
      <Acuerdo />
      <PendienteSeccion origen="proyectos6.html" pendientes={['El caso Shiba']} />
      {/* La misma tira del home, con la misma frase. En el original está en las
          dos páginas; acá cierra en vez de abrir. */}
      <Marcas />
      {/* Mismo componente que el cierre del home, con el copy de esta página */}
      <Cierre cierre={CIERRE} />
    </div>
  )
}
