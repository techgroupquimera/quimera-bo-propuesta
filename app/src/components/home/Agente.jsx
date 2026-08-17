import { AGENTE } from '../../content/home'
import { Checks } from '../ui/Checks'
import { Cita } from '../ui/Cita'
import { Eyebrow, Kicker } from '../ui/Kicker'
import { PanelVerde } from '../ui/PanelVerde'
import { Reel } from '../ui/Reel'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'

/* Según wireframe: la sección va sobre un panel propio, separado del resto de
   la página. A la izquierda kicker, titular, bajada y los cuatro puntos; a la
   derecha la cita arriba y el reel debajo.

   La cita estaba al pie de la columna de texto, después de los checks. Movida
   al costado queda encabezando el video — que es de donde salió: es textual de
   la persona que aparece en el clip, así que quedan juntas la frase y la cara
   que la dijo.

   La columna del reel es bastante más alta que la de texto (un 9:16 a 400px
   mide ~710px), así que sobran ~350px que hay que poner en algún lado. Con
   justify-between se iban todos al medio y el titular quedaba a una pantalla
   de distancia de los checks. Acá el bloque va centrado con un hueco propio
   acotado: parte del sobrante separa los dos grupos y el resto se reparte
   arriba y abajo, contra la cita y el pie del video. */

export function Agente() {
  return (
    <PanelVerde id={AGENTE.id}>
      {/* el ancho del reel lo fija esta columna: el componente no trae tope */}
      <div className="grid grid-cols-[1fr_minmax(260px,400px)] gap-[clamp(2rem,5vw,5rem)] max-[900px]:grid-cols-1 max-[900px]:gap-y-[2.6rem]">
        <div className="flex flex-col justify-center gap-[clamp(2.8rem,11vh,8rem)]">
          <div>
            <Reveal>
              <Kicker>{AGENTE.kicker}</Kicker>
            </Reveal>

            <Reveal as="h2" className="mb-[1.2rem] mt-[-0.3rem] text-sec font-normal">
              <Rich texto={AGENTE.titulo} />
            </Reveal>

            <Reveal as="p" className="max-w-[56ch] text-bajada font-normal text-read">
              {AGENTE.bajada}
            </Reveal>
          </div>

          <div>
            <Reveal>
              <Eyebrow className="mb-[1.2rem]">{AGENTE.listaTitulo}</Eyebrow>
            </Reveal>

            <Reveal>
              <Checks items={AGENTE.lista} negritaLima />
            </Reveal>
          </div>
        </div>

        <div className="max-[900px]:mx-auto max-[900px]:max-w-85">
          <Reveal>
            <Cita texto={AGENTE.cita.texto} firma={AGENTE.cita.firma} />
          </Reveal>

          <Reveal delay={0.08} className="mt-[clamp(1.4rem,2.2vw,2rem)]">
            <Reel reel={AGENTE.reel} />
          </Reveal>
        </div>
      </div>
    </PanelVerde>
  )
}
