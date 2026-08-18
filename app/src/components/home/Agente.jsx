import { AGENTE } from '../../content/home'
import { Checks } from '../ui/Checks'
import { Cita } from '../ui/Cita'
import { Eyebrow, Kicker } from '../ui/Kicker'
import { PanelVerde } from '../ui/PanelVerde'
import { Reel } from '../ui/Reel'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'

/* Según wireframe: la sección va sobre un panel propio, separado del resto de
   la página. A la izquierda kicker, titular, bajada, la cita y los cuatro
   puntos; a la derecha el reel.

   La cita ya estuvo en los dos costados. Al pie de la columna de texto, después
   de los checks, quedaba como una nota al pie de una lista. Encabezando el
   video leía bien —la frase junto a la cara que la dijo— pero empujaba el reel
   media pantalla hacia abajo y dejaba un hueco en la columna de texto, que es
   lo que se ve en el panel a sangre: el titular arrancaba a un tercio de la
   altura y arriba no había nada.

   Debajo del titular hace las dos cosas: cierra el bloque de arriba —titular,
   bajada, la frase que lo resume— y le devuelve al video su borde superior. El
   costo es que la frase se despega de la cara que la dijo; lo paga la firma,
   que dice «dicho en cámara · reel de campaña» y manda a mirar el video.

   La columna del reel sigue siendo más alta que la de texto (un 9:16 a 400px
   mide ~710px), así que sobra alto que hay que poner en algún lado. Con
   justify-between se iba todo al medio y el titular quedaba a una pantalla de
   distancia de los checks. Acá el bloque va centrado con un hueco propio
   acotado: parte del sobrante separa los dos grupos y el resto se reparte
   arriba y abajo. */

export function Agente() {
  return (
    <PanelVerde id={AGENTE.id} sangre>
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

            {/* 42ch y no el 56 de la bajada: la cita va tres puntos más grande,
                y a la misma medida en caracteres sería una línea bastante más
                larga que la de arriba. Con este tope entra en dos renglones,
                que es la forma que tenía al costado del video. */}
            <Reveal delay={0.08}>
              <Cita
                texto={AGENTE.cita.texto}
                firma={AGENTE.cita.firma}
                className="mt-[clamp(1.6rem,2.6vw,2.2rem)] max-w-[42ch]"
              />
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
            <Reel reel={AGENTE.reel} />
          </Reveal>
        </div>
      </div>
    </PanelVerde>
  )
}
