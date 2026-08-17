import { Compromiso } from '../components/nosotros/Compromiso'
import { Credenciales } from '../components/nosotros/Credenciales'
import { Presencia } from '../components/nosotros/Presencia'
import { Trayectoria } from '../components/nosotros/Trayectoria'
import { Unidades } from '../components/nosotros/Unidades'
import { Autoridad } from '../components/ui/Autoridad'
import { Bio } from '../components/ui/Bio'
import { Cierre } from '../components/ui/Cierre'
import { HeroIndice } from '../components/ui/HeroIndice'
import { Marcas } from '../components/ui/Marcas'
import { AUTORIDAD, BIO, CIERRE, HERO, MARCAS_TITULO } from '../content/nosotros'

/* /nosotros · completa.

   El hero y la mitad de abajo son piezas que ya existían: el hero es el de
   /proyectos (`ui/HeroIndice`), y Johnny, la placa, la tira de marcas y el
   cierre son los del home con el copy de esta página. Lo propio de acá son las
   unidades, el mapa de presencia, las cifras y el compromiso.

   MIGRADAS es la única perilla de la barra de índice del hero. Ya están las
   seis, así que los seis tramos son enlaces. */
const MIGRADAS = ['unidades', 'presencia', 'trayectoria', 'johnny', 'autoridad', 'compromiso']

export default function Nosotros() {
  return (
    <div className="[--spacing-aire:clamp(72px,9.6vh,146px)]">
      <HeroIndice
        hero={HERO}
        migradas={MIGRADAS}
        fondo={HERO.fondo.src}
        opacidad={HERO.fondo.opacidad}
      />
      <Unidades />
      <Presencia />
      <Trayectoria />
      {/* Las credenciales van al pie del bloque de Johnny: en la columna
          angosta del tríptico no entran sin estirarlo. */}
      <Bio bio={BIO} pie={<Credenciales />} />
      <Autoridad autoridad={AUTORIDAD} />
      <Compromiso />
      <Marcas titulo={MARCAS_TITULO} />
      <Cierre cierre={CIERRE} />
    </div>
  )
}
