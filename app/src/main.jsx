import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const raiz = document.getElementById('root')
const arbol = (
  <StrictMode>
    <App />
  </StrictMode>
)

/* Hidratar si el HTML ya vino escrito; montar desde cero si no.

   El build pre-renderiza las seis rutas (scripts/prerender.mjs), así que en
   producción `#root` siempre llega con contenido: React lo adopta en vez de
   volver a pintarlo. `npm run dev` sirve el index.html pelado y cae en
   createRoot — de ahí que sea una condición y no una constante. */
if (raiz.hasChildNodes()) {
  /* ── Primero pintar, después hidratar ──
     Hidratar el home entero —diez secciones, varios cientos de nodos— es
     medio segundo de trabajo en el hilo principal de un teléfono. Si eso
     arranca apenas termina de parsearse el HTML, el navegador no llega a
     pintar ni una vez antes: medido, el primer pintado se iba a 2,3 s con el
     DOM listo desde los 0,7. La página estaba entera y escrita, esperando a
     que React terminara para recién ahí aparecer.

     Dos `requestAnimationFrame` encadenados: el primero se agenda para el
     próximo cuadro, el segundo corre DESPUÉS de que ese cuadro se pintó. Ahí
     ya hay algo en pantalla y la hidratación no le saca el lugar a nadie.

     Lo que pasa en ese hueco —unos pocos cuadros— no se pierde: el HTML es la
     página de verdad, los enlaces son <a href> a rutas que existen como
     archivo, así que un click antes de tiempo navega igual, sólo que con una
     carga completa en vez de una transición de SPA. */
  requestAnimationFrame(() => requestAnimationFrame(() => hydrateRoot(raiz, arbol)))
} else {
  createRoot(raiz).render(arbol)
}
