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
    <PanelVerde id={AUDITORIA.id}>
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
          líneas: sueltas quedaban 1, 1 y 2 y la fila se veía desprolija. */}
      <Reveal className="mt-[clamp(2.8rem,5vw,4.2rem)] grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))]">
        {AUDITORIA.pasos.map((paso) => (
          <div key={paso.n} className="relative border-t border-hair pb-[1.6rem] pr-[1.4rem] pt-[1.6rem]">
            <b className="pointer-events-none absolute left-0 top-0 z-[1] select-none stroke-lima-numero font-display text-[clamp(4rem,7vw,7.5rem)] font-normal leading-none">
              {paso.n}
            </b>

            <div className="relative z-0 pt-[clamp(1.3rem,2.6vw,2.6rem)]">
              <h4 className="mb-[.5rem] font-display text-[1.15rem] font-normal uppercase tracking-[.05em]">
                {paso.titulo}
              </h4>
              <p className="max-w-[30ch] text-[.87rem] leading-[1.55] text-muted">{paso.texto}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </PanelVerde>
  )
}
