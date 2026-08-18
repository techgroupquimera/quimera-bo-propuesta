import { Suspense, lazy, useEffect, useState } from 'react'
import { REVISION } from '../../lib/revision'
import { useMedia } from './MediaContext'

/* Los tres overlays del sitio, montados sólo cuando hacen falta.

   Antes los tres viajaban en el bundle principal y se renderizaban en todas las
   páginas: el modal y el visor devolvían `null` hasta que alguien los abría,
   pero su código bajaba, se parseaba y se ejecutaba igual — y el panel de
   revisión se traía además las 7 KB de content/notas.js. Nada de eso lo mira
   quien entra a la home y se va.

   Ahora cada uno es su propio archivo y baja cuando se abre. El `fallback` es
   `null` a propósito: el chunk pesa poco y llega entre el click y el primer
   fotograma; poner un spinner sería anunciar una espera que no se ve.

   Este componente existe porque la condición («¿está abierto?») vive en el
   contexto, y para leerlo hay que estar ADENTRO del provider — Layout, que es
   quien lo declara, no puede. */
const VideoModal = lazy(() =>
  import('./VideoModal').then((m) => ({ default: m.VideoModal })),
)
const Visor = lazy(() => import('./Visor').then((m) => ({ default: m.Visor })))
const PanelNotas = lazy(() =>
  import('./PanelNotas').then((m) => ({ default: m.PanelNotas })),
)

export function Overlays() {
  const { video, visor } = useMedia()

  /* El panel de revisión es el caso distinto: su botón está siempre a la vista,
     así que no se lo puede atar a un click. Se monta cuando el navegador queda
     libre —después de pintar, después de hidratar— para que ni su código ni sus
     notas compitan con la carga de la página.

     `requestIdleCallback` no está en Safari; el `setTimeout` es el respaldo. */
  const [conPanel, setConPanel] = useState(false)
  useEffect(() => {
    /* Con la capa de revisión apagada el chunk no se pide nunca: son el panel
       más los ~7 KB de las notas, y sin botón que lo abra no hay nada que
       precargar. Ver lib/revision.js. */
    if (!REVISION) return

    const pedir = window.requestIdleCallback ?? ((f) => setTimeout(f, 900))
    const cancelar = window.cancelIdleCallback ?? clearTimeout
    const id = pedir(() => setConPanel(true))
    return () => cancelar(id)
  }, [])

  return (
    <Suspense fallback={null}>
      {video && <VideoModal />}
      {visor && <Visor />}
      {conPanel && <PanelNotas />}
    </Suspense>
  )
}
