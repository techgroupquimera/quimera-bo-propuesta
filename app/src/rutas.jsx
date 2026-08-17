import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'

/* El árbol de rutas, sin el Router.

   Vive separado de App.jsx porque lo montan dos entradas distintas: el
   navegador lo envuelve en <BrowserRouter> (App.jsx) y el build en
   <StaticRouter> para escribir el HTML de cada página (entry-server.jsx). Es lo
   único que las dos comparten, y tenerlo una sola vez es lo que garantiza que
   el HTML pre-renderizado y el que hidrata el cliente sean el mismo árbol.

   ── Home va importada; las otras cinco, en diferido ──
   Antes las siete páginas viajaban en un bundle único de 412 KB, aunque
   quien entraba a la home no fuera a ver ninguna de las otras. Ahora cada una
   es su propio archivo y sólo baja la de la ruta que se pidió.

   Home es la excepción a propósito: es la ruta que se mide y la que recibe la
   mayoría de las visitas, y partirla en dos pedidos encadenados (bundle →
   chunk de Home) es exactamente el viaje de más que se está tratando de sacar.

   Para las otras cinco no hay parpadeo, aunque el chunk todavía no haya
   llegado: el HTML de esa página ya viene escrito en la respuesta y React lo
   deja en pantalla mientras el chunk viaja. Encima, el pre-render le mete a
   cada página un <link rel="modulepreload"> del chunk que le toca, así que
   viaja en paralelo con el bundle y no después. */
const Servicios = lazy(() => import('./pages/Servicios'))
const Tecnologia = lazy(() => import('./pages/Tecnologia'))
const Proyectos = lazy(() => import('./pages/Proyectos'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Contacto = lazy(() => import('./pages/Contacto'))
const Pendiente = lazy(() => import('./pages/Pendiente'))

/* Las seis rutas del sitio ya tienen página propia. `Pendiente` queda sólo para
   el 404: lo que falta de /contacto y de /proyectos lo dice el
   <PendienteSeccion> de cada una. */
export function Rutas() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/tecnologia" element={<Tecnologia />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<Pendiente titulo="Página no encontrada" origen="—" />} />
      </Route>
    </Routes>
  )
}

/* Las rutas que el build escribe como HTML. El orden es el de la navegación.
   `/404` no está: no es una ruta del sitio, la genera el pre-render aparte
   con el comodín. */
export const RUTAS_ESTATICAS = [
  '/',
  '/servicios',
  '/tecnologia',
  '/proyectos',
  '/nosotros',
  '/contacto',
]
