import { Maximize2 } from 'lucide-react'
import { MARCA } from '../../content/proyectos'
import { useDesplegable } from '../../hooks/useDesplegable'
import { useMedia } from '../overlays/MediaContext'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'
import { VerMas } from '../ui/VerMas'

/* Misma sección que «Sitios en producción»: encabezado centrado, dos columnas
   y el botón que abre el resto. Comparten el hook y el botón.

   La diferencia es a dónde lleva cada ficha. Un sitio se abre en su pestaña;
   un manual no tiene a dónde ir, así que abre en el visor — el original ya lo
   hacía, porque a este tamaño un manual no se puede leer. Por eso la ficha es
   un <button> y no un <a>. */
export function Marca() {
  const { abrirVisor } = useMedia()
  const { lista, abierto, alternar, ocultas } = useDesplegable(MARCA.manuales, MARCA.visibles)

  return (
    <Section id={MARCA.id}>
      <div className="mx-auto max-w-[64ch] text-center">
        <Reveal>
          <Kicker>{MARCA.kicker}</Kicker>
        </Reveal>

        <Reveal as="h2" className="mt-[-0.3rem] text-sec font-normal">
          <Rich texto={MARCA.titulo} />
        </Reveal>

        <Reveal as="p" delay={0.07} className="mt-[1.2rem] text-bajada font-normal text-read">
          {MARCA.bajada}
        </Reveal>
      </div>

      <div className="mt-[clamp(2.6rem,5vw,4.4rem)] grid gap-[clamp(1rem,1.6vw,1.8rem)] min-[820px]:grid-cols-2">
        {lista.map((manual, i) => (
          /* el retraso sólo escalona las cuatro primeras: al abrir el resto, un
             escalonado de siete deja la última entrando medio segundo tarde */
          <Reveal key={manual.nombre} delay={(i % MARCA.visibles) * 0.06}>
            <button
              type="button"
              onClick={() =>
                abrirVisor({
                  tipo: 'imagen',
                  src: manual.img,
                  alt: `Manual de marca de ${manual.nombre}`,
                  ancho: MARCA.ancho,
                })
              }
              className="group block w-full cursor-pointer overflow-hidden rounded-[clamp(14px,1.3vw,20px)] border border-hair bg-white/2.5 p-0 text-left transition-[background,border-color] duration-350 ease-soft hover:border-hair-lima hover:bg-white/5"
            >
              <img
                src={manual.img}
                alt={`Manual de marca de ${manual.nombre}`}
                loading="lazy"
                decoding="async"
                className="w-full"
              />

              <span className="flex items-center justify-between gap-3 p-[clamp(1.1rem,1.6vw,1.6rem)]">
                <span className="text-card font-medium">{manual.nombre}</span>

                {/* el ícono es la única señal de que la tapa se agranda: no hay
                    URL ni destino que lo insinúe */}
                <Maximize2
                  aria-hidden
                  strokeWidth={1.8}
                  className="h-[1.05rem] w-[1.05rem] shrink-0 text-muted-2 transition-colors duration-250 group-hover:text-lima"
                />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {ocultas > 0 && (
        <VerMas
          abierto={abierto}
          onClick={alternar}
          mas={MARCA.masLabel}
          menos={MARCA.menosLabel}
        />
      )}
    </Section>
  )
}
