import { Play } from 'lucide-react'
import { DIFERENCIAL } from '../../content/tecnologia'
import { VIDEO_DISERTACION } from '../../content/site'
import { useMedia } from '../overlays/MediaContext'
import { Checks } from '../ui/Checks'
import { Kicker } from '../ui/Kicker'
import { Reveal } from '../ui/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

/* Wireframe: la foto grande a la izquierda con el botón del video adentro, al
   pie; a la derecha kicker, titular y los puntos.

   El botón adentro de la foto es lo que pidió el cliente y además resuelve algo:
   suelto abajo del texto quedaba a media pantalla de la imagen que abre, y no
   se leía como «esto reproduce ESTO». Es la misma fila del hero del home
   —círculo lima con el play y la etiqueta al lado— así que el disparador de la
   disertación se ve igual en todo el sitio.

   Toda la barra es el botón, no sólo el círculo: el círculo solo no da área de
   click cómoda y la etiqueta suelta no se lee como accionable. */
export function Diferencial() {
  const { abrirVideo } = useMedia()

  return (
    <Section id={DIFERENCIAL.id}>
      <div className="grid gap-[clamp(2.2rem,4.5vw,4.5rem)] min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] min-[900px]:items-center">
        <Reveal className="relative overflow-hidden rounded-[clamp(16px,1.6vw,24px)] border border-hair">
          {/* La foto original es vertical (690×1200) y a tamaño natural estiraba
              la sección a 1421px, con la columna de texto flotando en el medio
              de un vacío. Estuvo recortada a cuadrado —como la dibuja el
              wireframe— y ahora va a 4:5, que es el mismo recorte que usa la
              placa de <Autoridad> y por la misma razón: deja el panel
              claramente vertical sin que se despegue del alto de la columna de
              texto. A 690×1200 pelados el panel medía casi 1100px contra los
              ~400 del texto; a 4:5 son 790.

              El encuadre sube del 36% al 30%: el recorte más alto vuelve a
              traer por abajo el primer plano oscuro de nucas y la mesa con
              papeles que el cuadrado dejaba afuera, y subiendo el punto de
              anclaje esa franja se va y queda la pantalla con la lámina y él. */}
          <img
            src={DIFERENCIAL.foto.src}
            alt={DIFERENCIAL.foto.alt}
            loading="lazy"
            decoding="async"
            className="aspect-4/5 w-full object-cover object-[center_30%]"
          />

          {/* velo sólo en el tramo de abajo: sobre la foto a secas la etiqueta
              se pierde según qué le toque detrás */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-linear-to-t from-black/88 via-black/45 to-transparent"
          />

          <button
            type="button"
            onClick={() => abrirVideo(VIDEO_DISERTACION)}
            className="group absolute inset-x-0 bottom-0 flex cursor-pointer items-center gap-[.9rem] border-0 bg-transparent p-[clamp(1rem,1.6vw,1.6rem)] text-left"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-linear-160 from-[#a6f22a] to-[#7ac400] text-[#0a1a00] shadow-[0_10px_30px_-6px_rgba(129,222,0,.5)] transition-transform duration-300 ease-soft group-hover:scale-[1.07]">
              <Play className="h-4 w-4 translate-x-px" fill="currentColor" strokeWidth={0} />
            </span>
            <span className="text-[.92rem] font-medium tracking-[-.01em] text-paper transition-colors duration-250 group-hover:text-lima">
              {DIFERENCIAL.ctaVideo.label}
            </span>
          </button>
        </Reveal>

        <div>
          <Reveal delay={0.06}>
            <Kicker>{DIFERENCIAL.kicker}</Kicker>
          </Reveal>

          <Reveal as="h2" delay={0.1} className="mt-[-0.3rem] text-sec font-normal">
            <Rich texto={DIFERENCIAL.titulo} />
          </Reveal>

          <Reveal delay={0.16} className="mt-[clamp(1.6rem,2.6vw,2.4rem)]">
            <Checks items={DIFERENCIAL.puntos} negritaLima />
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
