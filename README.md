# Propuesta groupquimera.com.bo

Propuesta de rediseño del sitio de Group Quimera Bolivia, con el pivote de
marketing hacia **IA aplicada**. HTML estático, sin build ni dependencias.

> **Repositorio privado.** Contiene material de clientes: capturas de sus sitios,
> piezas de campaña y conversaciones reales de WhatsApp con números de teléfono a
> la vista. Varios clientes **todavía no confirmaron** que aprueban aparecer, y
> hay seis sistemas bajo acuerdo de confidencialidad. No hacerlo público sin
> revisar eso primero — está anotado en el panel de revisión de cada página.

## Migración a React

El sitio se está pasando a **React + Tailwind** en [`app/`](app/) — mismo
contenido, diseño nuevo.

```bash
cd app && npm install && npm run dev
```

**Las seis rutas ya viven en React.** Faltan dos secciones («El caso Shiba» en
`/proyectos` y «Dónde estamos» en `/contacto`) y los datos que tiene que
confirmar el cliente.

📄 **[`PROYECTO.md`](PROYECTO.md) es la vista completa**: estado, estructura,
convenciones, qué falta y por qué. El detalle del sistema de diseño está en
[`app/README.md`](app/README.md).

## Páginas

| Archivo | Qué es |
|---|---|
| `index.html` · `index2.html` | Home, dos variantes |
| `nosotros.html` · `servicios.html` · `tecnologia.html` · `contacto.html` | Secciones |
| `proyectos.html` | **v1** del portafolio — la base aprobada |
| `proyectos2…5.html` | Iteraciones descartadas, se conservan por lo que se aprendió en cada una |
| `proyectos6.html` | **Versión vigente**: la v1 con los injertos que sí funcionaron |
| `v1.html` | Maqueta original |

Cada página trae abajo a la derecha un botón que abre el **panel de revisión**:
qué cambió, por qué, y qué sigue pendiente del lado del cliente.

## Levantar el sitio

```bash
python tools/serve.py . 8000
```

Después abrir <http://127.0.0.1:8000/proyectos6.html>.

No alcanza con abrir el HTML directamente: el servidor manda
`Cache-Control: no-store`, que es lo que evita que el navegador sirva una
versión cacheada del CSS mientras se revisa.

## Herramientas (`tools/`)

Sin dependencias — Node 24 ya trae `WebSocket` y `fetch` globales.

| Script | Uso |
|---|---|
| `serve.py <dir> <puerto>` | Servidor de revisión con `no-store` |
| `shot.mjs <url> <salida.png> [ancho] [alto] [selector\|full]` | Captura por CDP. Hace scroll real antes para disparar los `IntersectionObserver` de los `.rv`, que si no salen en opacidad 0 |
| `measure.mjs <ancho>` | Imprime el borde izquierdo de los elementos clave de las páginas |

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
