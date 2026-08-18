/* El interruptor de la capa de revisión.

   Son las tres piezas que el sitio muestra para no dar por cerrado lo que
   todavía no está confirmado con el cliente:

     · <Pend>              el marcador ámbar de dato pendiente, inline
     · <PendienteSeccion>  «todavía en proyectos6.html», al pie de una página
     · <PanelNotas>        el botón flotante «Datos por completar» y su panel

   En `false` la capa no se ve Y no se baja: el chunk del panel y los ~7 KB de
   content/notas.js dejan de pedirse. Lo que NO se toca es el contenido — los
   `pend` siguen en los archivos de content, con su texto y su nota, así que
   ponerlo en `true` devuelve las tres piezas enteras y en su lugar.

   Se apagó para mostrar el sitio: los marcadores son notas internas y en una
   demo se leen como errores de la página. Los pendientes que marcan siguen
   pendientes — la lista completa está en content/notas.js.

   Ojo con lo que NO es esta capa, y por eso no se apaga con esto: el «en
   desarrollo» de los agentes de /proyectos y los avisos del formulario de
   /contacto también van en ámbar, pero son contenido de la página para quien la
   visita, no recordatorios nuestros. */
export const REVISION = false
