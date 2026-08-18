import { META as CONTACTO } from './contacto'
import { META as HOME } from './home'
import { META as NOSOTROS } from './nosotros'
import { META as PROYECTOS, META_MARKETING, META_TECNOLOGIA } from './proyectos'
import { META as SERVICIOS } from './servicios'
import { META as TECNOLOGIA } from './tecnologia'

/* Qué título y qué descripción le toca a cada ruta.

   ── Por qué existe este archivo ──
   Los ocho META ya estaban escritos, cada uno en el archivo de contenido de su
   página, y no los leía NADIE: las ocho rutas se servían con el `<title>` y la
   `description` de app/index.html, o sea las de la home. Ocho páginas con el
   mismo título es una sola página para un buscador, y en un resultado de
   búsqueda cualquiera de las ocho se anunciaba como si fuera el home.

   La tabla no repite el copy: lo importa de donde vive. Lo único que agrega es
   la correspondencia ruta → contenido, que es lo que faltaba.

   ── De acá sale también la lista de rutas ──
   `RUTAS_ESTATICAS` (src/rutas.jsx) se deriva de estas claves, así que no hay
   forma de agregar una ruta al pre-render y olvidarse de su título, ni de dejar
   un título huérfano de una ruta que ya no existe. El orden es el de la
   navegación y es el que sale en el sitemap.

   `/404` no está: no es una página del sitio y el pre-render la emite aparte,
   con noindex. */
export const META_RUTAS = {
  '/': HOME,
  '/servicios': SERVICIOS,
  '/tecnologia': TECNOLOGIA,
  '/proyectos': PROYECTOS,
  '/proyectos/tecnologia': META_TECNOLOGIA,
  '/proyectos/marketing': META_MARKETING,
  '/nosotros': NOSOTROS,
  '/contacto': CONTACTO,
}
