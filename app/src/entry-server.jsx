import { StaticRouter } from 'react-router-dom'
import { prerender } from 'react-dom/static'
import { Rutas } from './rutas'

/* Se re-exporta lo que el script de pre-render necesita leer del contenido: la
   lista de rutas, el título y la descripción de cada una, y los datos del sitio
   (dominio, imagen para compartir). El script corre en Node pelado y no puede
   importar JSX ni resolver los alias de Vite; este archivo, en cambio, pasa por
   Vite, así que es el puente. Sin esto habría que mantener una copia del copy y
   del dominio adentro del script. */
export { RUTAS_ESTATICAS } from './rutas'
export { META_RUTAS } from './content/meta'
export { FOOTER, SITIO } from './content/site'

/* La entrada del build. No corre nunca en el navegador: la usa
   scripts/prerender.mjs para escribir el HTML de cada ruta.

   `prerender` de react-dom/static y no `renderToString`: las cinco páginas que
   no son la home entran por React.lazy, y renderToString no espera a que
   resuelvan — devolvería el fallback del Suspense en vez de la página. Esta
   API espera a que se cierren todos los límites de Suspense antes de dar el
   HTML, que es exactamente lo que hace falta para un sitio estático.

   Sin <StrictMode>: acá no aporta nada (los efectos no corren en el servidor) y
   duplicaría cada render. En el navegador sigue puesto, ver main.jsx.

   Tampoco va <ScrollAlTope>: es un efecto sobre `window` para las navegaciones
   dentro de la SPA. Del lado del servidor no tiene qué hacer, y no pinta nada
   que pueda faltar en el HTML. */
export async function render(url) {
  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <Rutas />
    </StaticRouter>,
  )

  /* `prelude` es un stream web. Se junta entero: no hay streaming que
     aprovechar cuando el destino es un archivo en disco. */
  return new Response(prelude).text()
}
