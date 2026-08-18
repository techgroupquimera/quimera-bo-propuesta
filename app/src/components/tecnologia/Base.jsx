import { BASE } from '../../content/tecnologia'
import { Checks } from '../ui/Checks'
import { Cita } from '../ui/Cita'
import { Kicker } from '../ui/Kicker'
import { PanelVerde } from '../ui/PanelVerde'
import { Reel } from '../ui/Reel'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'

/* La misma pieza que «Cómo trabajamos» de /servicios: panel verde con el reel
   al costado. En todo el sitio «la que trae video va sobre panel», así que las
   cuatro secciones con reel comparten superficie.

   Acá el reel entra por la IZQUIERDA, como en el original de esta página —y
   como «No arranca con una propuesta» del home—. Con el mismo fondo en las
   cuatro, espejar la fila es lo que evita que se lean como la misma plantilla
   repetida.

   El reel va a 400px como los otros tres del sitio: son los únicos videos y a
   distinto tamaño se leen como un descuido. */
export function Base() {
  return (
    <PanelVerde id={BASE.id} sangre>
      <div className="grid grid-cols-[minmax(260px,400px)_minmax(0,1fr)] items-center gap-[clamp(2rem,5vw,5rem)] max-[900px]:grid-cols-1 max-[900px]:gap-y-[2.6rem]">
        <Reveal className="max-[900px]:mx-auto max-[900px]:max-w-85">
          <Reel reel={BASE.reel} />
        </Reveal>

        <div>
          <Reveal delay={0.06}>
            <Kicker>{BASE.kicker}</Kicker>
          </Reveal>

          <Reveal as="h2" delay={0.1} className="mb-[1.4rem] mt-[-0.3rem] text-sec font-normal">
            <Rich texto={BASE.titulo} />
          </Reveal>

          <Reveal delay={0.14}>
            <Cita texto={BASE.cita.texto} firma={BASE.cita.firma} />
          </Reveal>

          {/* El mismo tope en los dos, y en rem y no en ch: el ch del párrafo
              se mide con su propia fuente (.97rem) y el del contenedor de los
              checks con los 17px del body, así que el mismo número daba anchos
              distintos y las hairlines terminaban 280px más a la derecha que
              el texto de arriba. */}
          <Reveal
            as="p"
            delay={0.18}
            className="mt-[1.7rem] max-w-[38rem] text-bajada font-normal text-read"
          >
            {BASE.parrafo}
          </Reveal>

          <Reveal delay={0.22} className="mt-[1.6rem] max-w-[38rem]">
            <Checks items={BASE.puntos} />
          </Reveal>
        </div>
      </div>
    </PanelVerde>
  )
}
