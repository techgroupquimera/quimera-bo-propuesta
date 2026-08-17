import { RESOLVEMOS } from '../../content/servicios'
import { Icono } from '../ui/iconos'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Wireframe: encabezado corto arriba a la izquierda y ocho tarjetas parejas en
   cuatro columnas por dos filas. Nada escalonado, ninguna en lima.

   Viene justo debajo de «Lo que construimos», que son cuatro tarjetas altas
   escalonadas con una de acento. Si estas ocho usaran la misma caja, la página
   se leería como la misma grilla dos veces. Tres cosas las separan sin tocar el
   wireframe: son bastante más bajas, el ícono va suelto en lima en vez de
   dentro de la pastilla, y el contenido corre desde arriba en lugar de colgar
   del pie. Arriba se presentan cuatro piezas; acá se enumeran ocho áreas, y una
   enumeración quiere leerse rápido. */
export function Resolvemos() {
  return (
    <Section id={RESOLVEMOS.id}>
      {/* El tope va en el h2 y no en un div de afuera: ch se resuelve contra la
          fuente del elemento que lo lleva, y en el contenedor eso son los 17px
          del body, no los 44px del titular — un 38ch ahí mide 388px reales y
          parte el título en tres líneas. Acá 30ch son 30 anchos de dígito del
          propio titular: entra la línea escrita y manda el salto del texto. */}
      <div>
        <Reveal>
          <Kicker>{RESOLVEMOS.kicker}</Kicker>
        </Reveal>

        <Reveal as="h2" className="mt-[-0.3rem] max-w-[30ch] text-sec font-normal">
          <Rich texto={RESOLVEMOS.titulo} />
        </Reveal>
      </div>

      {/* Sin items-start: acá la grilla SÍ tiene que estirar, así las cuatro de
          cada fila terminan al ras aunque los textos midan distinto. */}
      <div className="mt-[clamp(2.6rem,5vw,4.5rem)] grid grid-cols-4 gap-[clamp(.75rem,1.1vw,1.1rem)] max-[1100px]:grid-cols-2 max-[560px]:grid-cols-1">
        {RESOLVEMOS.areas.map((area, i) => (
          <Reveal
            as="article"
            key={area.titulo}
            /* el mismo escalonado de .04s que traía el original */
            delay={i * 0.04}
            className="flex min-h-[clamp(148px,13vw,206px)] flex-col rounded-[clamp(14px,1.2vw,18px)] border border-hair bg-white/2.5 p-[clamp(1.1rem,1.5vw,1.5rem)] transition-[background,border-color,opacity,transform] duration-500 ease-soft hover:border-hair-lima hover:bg-white/5"
          >
            <Icono nombre={area.icono} className="h-5.5 w-5.5 text-lima" />

            <h3 className="mt-[1.15rem] text-card font-medium">{area.titulo}</h3>
            <p className="mt-[.55rem] text-body-m text-read-2">{area.texto}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
