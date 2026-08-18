# Propuesta groupquimera.com.bo

Propuesta de rediseño del sitio de Group Quimera Bolivia, con el pivote de
marketing hacia **IA aplicada**. React + Tailwind, pre-renderizado a HTML
estático ruta por ruta en el build.

> **Repositorio privado.** Contiene material de clientes: capturas de sus sitios,
> piezas de campaña y conversaciones reales de WhatsApp con números de teléfono a
> la vista. Varios clientes **todavía no confirmaron** que aprueban aparecer, y
> hay seis sistemas bajo acuerdo de confidencialidad. No hacerlo público sin
> revisar eso primero — está anotado en el panel de revisión de cada página.

## El sitio

Vive en [`app/`](app/): mismo contenido que la propuesta original, diseño nuevo.

```bash
cd app && npm install && npm run dev
```

**Las ocho rutas viven en React.** Faltan dos secciones («El caso Shiba» en
`/proyectos` y «Dónde estamos» en `/contacto`) y los datos que tiene que
confirmar el cliente.

📄 **[`PROYECTO.md`](PROYECTO.md) es la vista completa**: estado, estructura,
convenciones, qué falta y por qué. El detalle del sistema de diseño está en
[`app/README.md`](app/README.md).

## La propuesta original en HTML

Ya no está en el árbol. Eran trece páginas estáticas —`index.html`,
`proyectos.html` a `proyectos6.html`, `v1.html` y las de sección— más
`assets/quimera.css` y `assets/quimera.js`, y fueron la fuente de todo el copy
y de casi todas las decisiones de diseño que hoy están en React.

Se borraron cuando el sitio nuevo quedó completo, pero siguen enteras en el
historial. Para recuperar una:

```bash
git show 26b67ac:proyectos6.html > proyectos6.html
git show 26b67ac:assets/quimera.css > assets/quimera.css
```

Los comentarios del código las siguen nombrando —«textual del original»,
«así está en proyectos6.html»— y esas referencias siguen siendo válidas: es a
ese commit al que apuntan.

## Herramientas (`tools/`)

Sin dependencias — Node 24 ya trae `WebSocket` y `fetch` globales.

| Script | Uso |
|---|---|
| `serve.py <dir> <puerto>` | Servidor de revisión con `no-store` |
| `shot.mjs <url> <salida.png> [ancho] [alto] [selector\|full]` | Captura por CDP. Hace scroll real antes para disparar los `IntersectionObserver` de los `.rv`, que si no salen en opacidad 0 |

## Notas de implementación

- **`--maxw` (1560px) es la única perilla de ancho.** Mueve logo, hero, secciones
  y footer juntos.
- Un solo borde izquierdo en toda la página:
  `padding-inline:max(var(--g),calc((100% - var(--maxw))/2 + var(--g)))`.
- **Los `<img>` con atributos `width`/`height` reciben un alto fijo que gana
  sobre `aspect-ratio`.** Sin `height:auto` las imágenes salen recortadas de los
  costados y los pies de foto caen a alturas distintas. Pasó dos veces.
- Las marquesinas necesitan que **una** copia del set sea más ancha que la
  pantalla antes de duplicar, o al llegar al -50% queda un hueco. La duración se
  calcula en px/s, no fija.
- Los teléfonos de la sección de agentes están **calados** (`assets/proyectos/*-cut.webp`,
  con alfa) — el mockup original viene con el aparato sobre una caja blanca.
