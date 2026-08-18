import { AUDITORIA } from '../../content/home'
import { Cita } from '../ui/Cita'
import { Kicker } from '../ui/Kicker'
import { PanelVerde } from '../ui/PanelVerde'
import { Reel } from '../ui/Reel'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'

/* Mismo panel verde que «Cien mensajes»: son las dos secciones construidas
   alrededor de un reel, y compartir superficie las agrupa.

   Lo que NO se comparte es el orden: acá el reel entra por la izquierda y el
   texto por la derecha, al revés que en la otra. Con el mismo fondo, mantener
   la fila espejada es lo que evita que se lean como la misma plantilla
   repetida dos veces. */
export function Auditoria() {
  return (
    <PanelVerde id={AUDITORIA.id} sangre>
      {/* mismo ancho de reel que «Cien mensajes»: son los dos videos de la
          página y a distinto tamaño se leen como un descuido */}
      <div className="grid grid-cols-[minmax(260px,400px)_1fr] items-center gap-[clamp(2rem,5vw,5rem)] max-[900px]:grid-cols-1 max-[900px]:gap-y-[2.4rem]">
        <Reveal className="max-[900px]:order-none max-[900px]:mx-auto max-[900px]:max-w-85">
          <Reel reel={AUDITORIA.reel} />
        </Reveal>

        <div>
          <Reveal>
            <Kicker>{AUDITORIA.kicker}</Kicker>
          </Reveal>

          <Reveal as="h2" className="mb-[1.2rem] mt-[-0.3rem] text-sec font-normal">
            <Rich texto={AUDITORIA.titulo} />
          </Reveal>

          <Reveal>
            <Cita texto={AUDITORIA.cita.texto} firma={AUDITORIA.cita.firma} />
          </Reveal>

          {AUDITORIA.parrafos.map((parrafo, i) => (
            <Reveal
              as="p"
              key={parrafo.slice(0, 24)}
              className={`max-w-[56ch] text-bajada font-normal text-read ${
                i === 0 ? 'mt-[1.7rem]' : 'mt-[1.1rem]'
              }`}
            >
              <Rich texto={parrafo} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Los tres pasos: hairline arriba de cada uno, como una tabla.
          El número sale del flujo y va ENCIMA del texto, calado y apagado — el
          título le pasa por debajo. Antes iba en línea a 2.2rem y ocupaba una
          fila propia sin pesar; así marca el paso sin robarle altura.

          El ancho de 30ch es lo que hace que las tres bajadas caigan en dos
          líneas: sueltas quedaban 1, 1 y 2 y la fila se veía desprolija.

          Todo centrado en su columna. Alineados a la izquierda funcionaban
          cuando el panel era una caja: al pasar la sección a sangre la fila
          creció ~130px y cada paso quedó pegado al borde izquierdo de una
          celda bastante más ancha que su texto, con un hueco muerto a la
          derecha de cada uno. El padding pasa a ser simétrico por lo mismo:
          con pr sola, el centro de la celda no es el centro visible. */}
      {/* Tres columnas fijas y no auto-fit: con minmax(190px,1fr) el ancho
          decide cuántas entran, y entre ~600 y ~760px entraban dos — el tercer
          paso caía solo en una fila con una celda vacía al lado. Centrado eso
          se ve como un error; alineado a la izquierda pasaba más piola, que es
          por lo que venía así. Debajo de 720px van los tres apilados. */}
      <Reveal className="mt-[clamp(2.8rem,5vw,4.2rem)] grid grid-cols-3 max-[720px]:grid-cols-1">
        {AUDITORIA.pasos.map((paso) => (
          <div
            key={paso.n}
            className="relative border-t border-hair px-[1.4rem] pb-[1.6rem] pt-[clamp(3.2rem,4vw,4rem)] text-center"
          >
            {/* el número arranca DEBAJO del hairline, no pegado a él: con
                top-0 el calado nacía sobre la línea misma y a 120px de cuerpo
                eso se lee como un número cortado por arriba. El padding de la
                celda sube en la misma medida, así el título sigue cruzando el
                número a media altura como estaba. */}
            <b className="pointer-events-none absolute left-1/2 top-[clamp(1.9rem,2.4vw,2.4rem)] z-[1] -translate-x-1/2 select-none stroke-lima-numero font-display text-[clamp(4rem,7vw,7.5rem)] font-normal leading-none">
              {paso.n}
            </b>

            <div className="relative z-0 pt-[clamp(1.3rem,2.6vw,2.6rem)]">
              <h4 className="mb-[.5rem] font-display text-[1.15rem] font-normal uppercase tracking-[.05em]">
                {paso.titulo}
              </h4>
              <p className="mx-auto max-w-[30ch] text-[.87rem] leading-[1.55] text-muted">
                {paso.texto}
              </p>
            </div>
          </div>
        ))}
      </Reveal>
    </PanelVerde>
  )
}
