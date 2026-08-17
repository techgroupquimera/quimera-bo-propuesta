import { Play } from 'lucide-react'
import { VIDEO_DISERTACION } from '../../content/site'
import { useMedia } from '../overlays/MediaContext'
import { Button } from './Button'
import { Kicker } from './Kicker'
import { NombreCalado } from './NombreCalado'
import { Reveal } from './Reveal'

/* Johnny · foto real, sin efectos.
   Antes el retrato iba en mix-blend-mode con una máscara y un halo verde: se
   leía como filtro de plantilla. Ahora es lo que es —fotos de estudio
   presentadas como fotos: rectángulo, esquinas suaves, sombra— y el apellido
   gigante queda arriba, que es un recurso de revista y no un shader.

   El apellido va ARRIBA, no detrás del texto: cuando cruzaba la columna de copy
   la mitad quedaba tapada y se leía "ERRANTE".

   Lo comparten el home y /nosotros —el original dice explícitamente «mismo
   bloque que el inicio»— con distinto copy. `pie` es lo único que /nosotros
   agrega: las credenciales, que en la columna angosta del tríptico no entran
   sin estirarla y por eso van a todo el ancho, debajo. */
export function Bio({ bio, pie }) {
  const { abrirVideo } = useMedia()

  return (
    <section id={bio.id} className="contenido-diferido relative isolate overflow-hidden border-t border-hair">
      <div
        aria-hidden
        className="absolute inset-0 z-[-3] bg-[url('/assets/bg-bokeh-2-lite.webp')] bg-cover bg-center opacity-30"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-2]"
        style={{
          background:
            'linear-gradient(to bottom,#050604 3%,rgba(5,6,4,.55) 42%,#050604 97%)',
        }}
      />

      {/* El apellido sale de la columna contenida: es lo único de la página que
          se mide contra la pantalla y no contra --container-maxw. */}
      <div className="relative pt-[clamp(130px,19vh,268px)]">
        <NombreCalado texto={bio.apellido} />
      </div>

      <div className="relative mx-auto grid max-w-maxw grid-cols-[minmax(260px,33%)_1fr] gap-x-[clamp(2rem,4vw,4rem)] px-g pb-[clamp(140px,19vh,268px)] pt-[clamp(1.5rem,3vh,3rem)] max-[900px]:grid-cols-1 max-[900px]:gap-y-[2.2rem]">
        <Reveal className="relative z-[2] col-start-1 row-start-1 self-center max-[900px]:row-start-2">
          <Kicker>{bio.kicker}</Kicker>
          <h2 className="mb-[.9rem] mt-4 text-sub font-normal">{bio.nombre}</h2>
          <p className="max-w-[56ch] text-body-l font-normal text-read">{bio.bajada}</p>
          <p className="mt-[1.8rem] flex flex-wrap gap-[.6rem]">
            {bio.ctas.map((cta) => (
              <Button
                key={cta.label}
                href={cta.href}
                /* el primario sólo lo pide /nosotros, donde este bloque cierra
                   con «Hablar con Johnny» y es la acción de la sección */
                variante={cta.variante}
                /* el que abre video lleva ▶ adelante; el que navega, flecha atrás */
                flecha={!cta.accion}
                onClick={cta.accion === 'video' ? () => abrirVideo(VIDEO_DISERTACION) : undefined}
              >
                {cta.accion === 'video' && (
                  <Play
                    className="h-[1.05em] w-[1.05em]"
                    fill="currentColor"
                    strokeWidth={0}
                    aria-hidden
                  />
                )}
                {cta.label}
              </Button>
            ))}
          </p>
        </Reveal>

        {/* Tríptico: tres tomas de la misma sesión, sin recortar, escalonadas.
            Escalonar los tres arranques es lo que evita que se lea como una
            grilla de tarjetas; son fotogramas de una tira de contactos. */}
        <div className="col-start-2 row-start-1 grid grid-cols-3 gap-[clamp(9px,1.1vw,16px)] self-center max-[900px]:col-start-1 max-[900px]:row-start-1">
          {bio.fotos.map((foto, i) => (
            <Reveal
              as="figure"
              key={foto.src}
              delay={i * 0.08}
              className={
                i === 0
                  ? 'mt-[clamp(22px,4vh,54px)]'
                  : i === 2
                    ? 'mt-[clamp(38px,7vh,92px)]'
                    : undefined
              }
            >
              <img
                src={foto.src}
                alt={foto.alt}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl shadow-[0_30px_70px_-26px_rgba(0,0,0,.95)]"
              />
            </Reveal>
          ))}
        </div>

        {/* Va a todo el ancho, debajo de las dos columnas: en la del texto no
            entra sin estirar el tríptico. */}
        {pie && <div className="col-span-full mt-[clamp(2.4rem,5vh,4rem)]">{pie}</div>}
      </div>
    </section>
  )
}
