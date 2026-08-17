import { useEscape } from '../../hooks/useEscape'
import { useMedia } from './MediaContext'

/* Visor 9:16.
   Los reels son verticales. Abrirlos a pantalla completa los deja con dos
   franjas negras enormes a los costados y el video minúsculo al medio: el
   navegador respeta el alto de la pantalla, no el del video. Acá el visor toma
   la altura disponible y el ancho sale de la proporción, como en TikTok. */
export function Visor() {
  const { visor, cerrarVisor } = useMedia()
  useEscape(Boolean(visor), cerrarVisor)

  if (!visor) return null

  return (
    <div
      className="fixed inset-0 z-[9996] grid place-items-center bg-[rgba(3,5,2,.95)] p-[clamp(14px,3vw,32px)] backdrop-blur-[12px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) cerrarVisor()
      }}
    >
      <button
        type="button"
        onClick={cerrarVisor}
        className="absolute right-[clamp(12px,2vw,22px)] top-[clamp(12px,2vw,20px)] cursor-pointer rounded-full border border-hair bg-white/5 px-4 py-[.65rem] font-sans text-[.64rem] font-semibold uppercase tracking-[.12em] text-white hover:border-lima hover:text-lima"
      >
        Cerrar ✕
      </button>

      {visor.tipo === 'video' ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          src={visor.src}
          controls
          autoPlay
          playsInline
          className="block aspect-[9/16] h-[min(86svh,92vw*16/9)] w-auto rounded-2xl bg-black shadow-[0_40px_100px_-30px_#000]"
        />
      ) : (
        /* El tope de ancho lo pone quien abre, con el ancho NATIVO de su
           archivo: sin él una captura de teléfono de 468px se estiraba a la
           altura de la pantalla y salía borrosa, y con uno fijo un manual
           apaisado de 900px se quedaba chico y no se podía leer. Los 560 de
           antes eran el tope de las capturas; ahora es el que corresponda. */
        <img
          src={visor.src}
          alt={visor.alt || ''}
          style={{ maxWidth: `min(92vw, ${visor.ancho || 560}px)` }}
          className="block max-h-[86svh] w-auto rounded-2xl shadow-[0_40px_100px_-30px_#000]"
        />
      )}
    </div>
  )
}
