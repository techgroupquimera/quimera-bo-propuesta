import { Outlet } from 'react-router-dom'
import { MediaProvider } from '../overlays/MediaContext'
import { NotasProvider } from '../overlays/NotasContext'
import { Overlays } from '../overlays/Overlays'
import { Footer } from './Footer'
import { TopBar } from './TopBar'

/* Cáscara común: barra, contenido, footer y los overlays.
   Los providers envuelven todo para que cualquier sección pueda abrir el modal
   de la disertación, el visor 9:16 o el panel de revisión.

   Los tres overlays están detrás de <Overlays>, que los monta recién cuando se
   abren: acá se declaraban los tres y su código bajaba en todas las páginas
   aunque nadie los tocara. */
export function Layout() {
  return (
    <NotasProvider>
      <MediaProvider>
        <TopBar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <Overlays />
      </MediaProvider>
    </NotasProvider>
  )
}
