import { createContext, useContext, useMemo, useState } from 'react'

/* Un solo lugar desde donde cualquier sección abre el modal de la disertación
   o el visor 9:16. El <video> se monta al abrir y se desmonta al cerrar: así no
   queda nada descargando ni sonando de fondo. */
const Ctx = createContext(null)

export function MediaProvider({ children }) {
  const [video, setVideo] = useState(null) // src de la disertación (16:9)
  const [visor, setVisor] = useState(null) // {tipo:'video'|'imagen', src, alt} 9:16

  const valor = useMemo(
    () => ({
      video,
      visor,
      abrirVideo: (src) => setVideo(src),
      cerrarVideo: () => setVideo(null),
      abrirVisor: (media) => setVisor(media),
      cerrarVisor: () => setVisor(null),
    }),
    [video, visor],
  )

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}

export const useMedia = () => useContext(Ctx)
