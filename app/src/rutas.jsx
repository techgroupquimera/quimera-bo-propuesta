import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { META_RUTAS } from './content/meta'
import Home from './pages/Home'

/* El árbol de rutas, sin el Router.

   Vive separado de App.jsx porque lo montan dos entradas distintas: el
   navegador lo envuelve en <BrowserRouter> (App.jsx) y el build en
   <StaticRouter> para escribir el HTML de cada página (entry-server.jsx). Es lo
   único que las dos comparten, y tenerlo una sola vez es lo que garantiza que
   el HTML pre-renderizado y el que hidrata el cliente sean el mismo árbol.

   ── Home va importada; las otras siete, en diferido ──
   Antes las siete páginas viajaban en un bundle único de 412 KB, aunque
   quien entraba a la home no fuera a ver ninguna de las otras. Ahora cada una
   es su propio archivo y sólo baja la de la ruta que se pidió.

   Home es la excepción a propósito: es la ruta que se mide y la que recibe la
   mayoría de las visitas, y partirla en dos pedidos encadenados (bundle →
   chunk de Home) es exactamente el viaje de más que se está tratando de sacar.

   Para las otras no hay parpadeo, aunque el chunk todavía no haya
   llegado: el HTML de esa página ya viene escrito en la respuesta y React lo
   deja en pantalla mientras el chunk viaja. Encima, el pre-render le mete a
   cada página un <link rel="modulepreload"> del chunk que le toca, así que
   viaja en paralelo con el bundle y no después. */
const Servicios = lazy(() => import('./pages/Servicios'))
const Tecnologia = lazy(() => import('./pages/Tecnologia'))
const Proyectos = lazy(() => import('./pages/Proyectos'))
/* /proyectos se partió en tres: la entrada bifurca y cada rubro es su propia
   ruta. Van en diferido como las demás, así que quien entra por la entrada baja
   sólo la entrada — que es todo el punto de haberla partido. */
const ProyectosTecnologia = lazy(() => import('./pages/ProyectosTecnologia'))
const ProyectosMarketing = lazy(() => import('./pages/ProyectosMarketing'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Contacto = lazy(() => import('./pages/Contacto'))
const Pendiente = lazy(() => import('./pages/Pendiente'))

/* Las ocho rutas del sitio ya tienen página propia. `Pendiente` queda sólo para
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
        <Route path="/proyectos/tecnologia" element={<ProyectosTecnologia />} />
        <Route path="/proyectos/marketing" element={<ProyectosMarketing />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<Pendiente titulo="Página no encontrada" origen="—" />} />
      </Route>
    </Routes>
  )
}

/* Las rutas que el build escribe como HTML. El orden es el de la navegación y
   es también el del sitemap.

   Sale de las claves de META_RUTAS y no de una lista propia: cada ruta
   pre-renderizada necesita su título y su descripción, y con dos listas
   paralelas lo que pasa es que se agrega una ruta y su metadato queda para
   después — o queda un metadato de una ruta que ya no existe. Derivada, las dos
   cosas son la misma.

   `/404` no está: no es una ruta del sitio, la genera el pre-render aparte con
   el comodín y con noindex. */
export const RUTAS_ESTATICAS = Object.keys(META_RUTAS)
