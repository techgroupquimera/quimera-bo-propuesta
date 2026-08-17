import { ArrowUpRight } from 'lucide-react'
import { AGENTES } from '../../content/proyectos'
import { cx } from '../../lib/cx'
import { useMedia } from '../overlays/MediaContext'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Wireframe: encabezado arriba a la izquierda y las seis fichas en dos
   columnas, con la derecha corrida hacia abajo media ficha.

   Las fichas van SIN captura, sólo texto. Las capturas son pantallas de
   teléfono verticales: recortadas perdían la conversación y a tamaño natural la
   sección medía 5008px. Sacándolas, lo que queda es lo que de verdad prueba
   cada agente —qué hace y qué dijo, textual— y la captura entera está a un clic
   en el visor 9:16, que es el que sabe mostrar verticales sin dejar dos franjas
   negras a los costados.

   Toda la ficha es el disparador. Sin imagen, el enlace de abajo es el único
   acceso a la prueba y una línea suelta no da área de click cómoda. */
export function Agentes() {
  const { abrirVisor } = useMedia()

  return (
    <Section id={AGENTES.id}>
      <div className="max-w-232">
        <Reveal>
          <Kicker>{AGENTES.kicker}</Kicker>
        </Reveal>

        <Reveal as="h2" className="mt-[-0.3rem] text-sec font-normal">
          <Rich texto={AGENTES.titulo} />
        </Reveal>

        <Reveal
          as="p"
          delay={0.07}
          className="mt-[1.4rem] max-w-[68ch] text-bajada font-normal text-read"
        >
          {AGENTES.bajada}
        </Reveal>
      </div>

      {/* La grilla va centrada en la pantalla y más angosta que la columna del
          sitio: a todo el ancho las fichas cuadradas medían 688px de lado con
          180 de contenido, y medio cuadrado vacío se lee como caja rota.

          items-start para que el desfase baje la ficha en vez de estirarla.

          El hueco entre columnas es bastante mayor que el de las filas —134px
          contra 32 a 1920— así se lee como dos columnas separadas y no como una
          cuadrícula pareja. El ancho del bloque (1152) sale de las dos cosas
          juntas: es lo que deja fichas de ~510px de lado DESPUÉS de descontar
          ese hueco. Si se toca uno de los dos, el otro acompaña. */}
      <div className="mx-auto mt-[clamp(2.6rem,5vw,4.4rem)] grid max-w-6xl items-start gap-x-[clamp(2rem,7vw,8.5rem)] gap-y-[clamp(1rem,1.8vw,2rem)] min-[820px]:grid-cols-2">
        {AGENTES.lista.map((agente, i) => (
          <Reveal
            as="article"
            key={agente.nombre}
            delay={(i % 2) * 0.07}
            className={cx(
              'overflow-hidden rounded-[clamp(14px,1.3vw,20px)] border border-hair bg-white/2.5 transition-[background,border-color,opacity,transform] duration-500 ease-soft hover:border-hair-lima hover:bg-white/5',
              /* la columna derecha, corrida: son las de índice impar */
              i % 2 === 1 && 'min-[820px]:mt-[clamp(2rem,5vw,5.5rem)]',
            )}
          >
            <button
              type="button"
              onClick={() =>
                abrirVisor({
                  tipo: 'imagen',
                  src: agente.completa,
                  alt: `Conversación real del agente de ${agente.nombre}`,
                })
              }
              className="group block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
            >
              {/* aspect-square: las fichas son cuadradas, como el wireframe. El
                  contenido va al pie con mt-auto —el mismo patrón que las
                  tarjetas del resto del sitio— así el aire de arriba se lee
                  como decisión y no como una caja a medio llenar. */}
              <div className="flex aspect-square flex-col p-[clamp(1.3rem,1.9vw,2rem)]">
                <h3 className="mt-auto flex items-center gap-[.55rem] text-card font-medium">
                  <span
                    aria-hidden
                    className={cx(
                      'h-1.75 w-1.75 shrink-0 rounded-full',
                      agente.enDesarrollo
                        ? 'bg-pend'
                        : 'animate-dot bg-lima shadow-[0_0_10px_var(--color-lima)]',
                    )}
                  />
                  {agente.nombre}
                  {agente.enDesarrollo && (
                    <span className="font-sans text-[.7rem] font-normal text-pend">
                      en desarrollo
                    </span>
                  )}
                </h3>

                <p className="mt-[.6rem] text-body-m text-read-2">{agente.texto}</p>

                <p className="mt-[1.1rem] inline-flex items-center gap-[.35rem] font-sans text-[.82rem] text-lima-2 transition-colors duration-250 group-hover:text-lima">
                  {AGENTES.verLabel}
                  <ArrowUpRight aria-hidden strokeWidth={2} className="h-[.95em] w-[.95em]" />
                </p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
