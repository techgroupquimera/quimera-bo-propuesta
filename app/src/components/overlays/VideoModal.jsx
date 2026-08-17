import { useEscape } from '../../hooks/useEscape'
import { useMedia } from './MediaContext'

/* Modal de la disertación (16:9). Se cierra con Escape, con el botón o
   clickeando el fondo — nunca sobre el propio video. */
export function VideoModal() {
  const { video, cerrarVideo } = useMedia()
  useEscape(Boolean(video), cerrarVideo)

  if (!video) return null

  return (
    <div
      className="fixed inset-0 z-[9996] grid place-items-center bg-[rgba(3,5,2,.95)] p-5 backdrop-blur-[10px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) cerrarVideo()
      }}
    >
      <button
        type="button"
        onClick={cerrarVideo}
        className="absolute right-5 top-[18px] cursor-pointer rounded-full border border-hair bg-white/5 px-4 py-[.65rem] font-sans text-[.64rem] font-semibold uppercase tracking-[.12em] text-white hover:border-lima hover:text-lima"
      >
        Cerrar ✕
      </button>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src={video}
        controls
        autoPlay
        playsInline
        className="max-h-[86svh] w-auto rounded-[14px] border border-hair"
      />
    </div>
  )
}
