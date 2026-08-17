import { BrowserRouter } from 'react-router-dom'
import { ScrollAlTope } from './components/layout/ScrollAlTope'
import { Rutas } from './rutas'

/* La entrada del navegador: el router de historia sobre el árbol de rutas.
   El árbol vive en rutas.jsx porque lo comparte con el pre-render, que lo monta
   sobre un <StaticRouter> para escribir el HTML de cada página. */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollAlTope />
      <Rutas />
    </BrowserRouter>
  )
}
