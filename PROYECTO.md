# Group Quimera Bolivia · el proyecto

Rediseño del sitio de **Group Quimera**, con el pivote de marketing hacia **IA
aplicada**. El repositorio tiene dos capas que conviven a propósito:

- **La propuesta original**, en HTML estático en la raíz. Es donde se discutió y
  se aprobó el contenido, y sigue siendo la **fuente de verdad del copy**.
- **El sitio nuevo**, en [`app/`](app/): React 19 + Vite + Tailwind v4. Mismo
  contenido, diseño nuevo.

> ⚠️ **Repositorio privado, y no por costumbre.** Contiene material de clientes:
> capturas de sus sitios, piezas de campaña y conversaciones reales de WhatsApp
> con números de teléfono a la vista. Varios clientes **todavía no confirmaron**
> que aprueban aparecer, y hay seis sistemas bajo acuerdo de confidencialidad.
> Antes de publicar hay que revisar eso — está anotado sección por sección en el
> panel de revisión.

---

## Estado

Las **seis rutas ya viven en React**. Lo que falta son dos secciones y los datos
que tiene que confirmar el cliente.

| Ruta | Secciones | Estado |
|---|---|---|
| `/` | Hero · Marcas · Problema · Sistemas · Agente · Prueba real · Autoridad · Johnny · Auditoría · Cierre | ✅ completa |
| `/servicios` | Hero · Problema · Construimos · Resolvemos · Trabajamos · Diferencial · Formas · Proceso · Cierre | ✅ completa |
| `/tecnologia` | Hero · Stack · Base · Seguridad · Diferencial · Cierre | ✅ completa |
| `/proyectos` | Hero · Sitios · Agentes · Destacado · Marca · Contenido · Campañas · Bajo acuerdo · Marcas · Cierre | falta **El caso Shiba** |
| `/nosotros` | Hero · Unidades · Presencia · Trayectoria · Johnny · Credenciales · Autoridad · Compromiso · Marcas · Cierre | ✅ completa |
| `/contacto` | Hero · Formulario | falta **Dónde estamos** |

En números: **64 componentes**, ~7.700 líneas de JSX/JS/CSS y **1.810 líneas de
contenido**, sobre 26 MB de assets en 160 archivos.

De `/tecnologia` **no se migró «Sin ataduras»**: el cliente pidió sacarla. Está
en el `tecnologia.html` del original, que ya no está en el árbol — se recupera
con `git show 26b67ac:tecnologia.html`.

---

## Levantar el proyecto

### El sitio nuevo

```bash
cd app
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ — compila, pre-renderiza las 6 rutas y arma el CSS crítico
npm run lint     # oxlint
```

`predev` y `prebuild` corren `scripts/sync-assets.mjs`, que copia los assets de
la raíz a `app/public/`. No hay que copiarlos a mano.

El `build` tiene tres pasos: el bundle del navegador, un segundo bundle para
Node (`dist-ssr/`) y `scripts/prerender.mjs`, que con ése escribe el HTML de
cada ruta. **El sitio se publica pre-renderizado**: el servidor devuelve la
página ya escrita y React llega después a hidratarla. El detalle está en
[`app/README.md`](app/README.md#carga).

Hay dos scripts que **no** corren en el build, para que no dependa ni de la red
ni de ffmpeg. Generan archivos que se versionan y sólo se vuelven a correr si
cambia lo que producen:

```bash
npm run fuentes    # baja los .woff2 a public/fonts/   (necesita red)
npm run imagenes   # genera las derivadas en ../assets (necesita ffmpeg)
```

### La propuesta original

Las trece páginas HTML de la raíz y su `assets/quimera.css` ya no están en el
árbol: se borraron cuando el sitio en React quedó completo. Siguen enteras en
el commit `26b67ac` y se recuperan de a una:

```bash
git show 26b67ac:proyectos6.html > proyectos6.html
git show 26b67ac:assets/quimera.css > assets/quimera.css
python tools/serve.py . 8000
```

---

## Cómo está organizado

```
├── app/                     el sitio nuevo (React)
│   ├── scripts/             sync de assets, pre-render, fuentes e imágenes
│   ├── public/fonts/        Manrope y Bebas propias (no Google Fonts)
│   ├── src/
│   │   ├── content/         TODO el copy, una página por archivo
│   │   ├── components/
│   │   │   ├── ui/          primitivas y bloques que comparten páginas
│   │   │   ├── layout/      barra, menú móvil, footer
│   │   │   ├── overlays/    modal de video, visor 9:16, panel de revisión
│   │   │   └── home|servicios|tecnologia|proyectos|nosotros|contacto/
│   │   ├── hooks/           useInView, useRotacion, useDesplegable, useEscape…
│   │   ├── lib/             cx (clases), optico (peso óptico de logos)
│   │   ├── pages/           una por ruta: sólo ensambla secciones
│   │   └── index.css        el sistema de diseño (@theme)
│   └── README.md            ← el detalle de diseño vive ahí
├── assets/                  imágenes, videos y logos originales
├── tools/                   servidor de revisión y capturas por CDP
├── vercel.json              config de despliegue (compila app/, publica app/dist)
├── netlify.toml             lo mismo, para Netlify
└── PROYECTO.md              este archivo
```

---

## La regla que sostiene todo

> **El texto no se escribe en los componentes.**

Vive en `src/content/` y se lee desde ahí. Rediseñar una sección es reescribir
su JSX **sin tocar el contenido**. Es lo que permitió rehacer el sitio entero
sección por sección sin perder una frase por el camino.

Los textos usan un mini-lenguaje que resuelve `<Rich>`:

| Marca | Resultado |
|---|---|
| `\n` | salto de línea |
| `*x*` | énfasis: Manrope Semibold en lima |
| `_x_` | lima plano |
| `**x**` | negrita |

Cada entrada de contenido lleva comentado **de dónde sale**, qué se desvió del
original y por qué. Cuando una frase cambió, el comentario dice cuál era y qué
la obligó a cambiar — casi siempre que describía algo que el diseño nuevo ya no
tiene («pasá el mouse para frenar la tira», por ejemplo).

---

## El sistema de diseño

El detalle completo está en **[`app/README.md`](app/README.md)**. Lo esencial:

**Dos familias, las del brandboard.** Bebas Neue para cifras y etiquetas;
Manrope para todo lo demás (400/500/600). No hay una tercera: el énfasis en los
titulares se marca con **peso y color**, no con itálica.

**Los tokens salen como utilidades**, no hay que escribir `var(--…)`:

```
text-lima  bg-ink  border-hair          color
text-sec  text-body-l  text-bajada      tipografía
px-g  max-w-maxw  px-column             la columna del sitio
py-aire                                 el ritmo vertical, por página
ease-soft  animate-mq  animate-dot      movimiento
```

**Tres perillas globales.** `--container-maxw` (1560px) mueve logo, hero,
secciones y footer juntos. `--spacing-aire` es el aire vertical y se pisa por
página: el home respira, las internas van más apretadas. El `font-size` del CTA
escala el botón entero.

**El movimiento es CSS por defecto** (`Reveal` + IntersectionObserver).
**anime.js entra sólo donde CSS se queda corto** — hoy, la entrada del hero del
home: ocho piezas con tiempos que se pisan entre sí. Todo respeta
`prefers-reduced-motion`.

---

## El sistema de revisión

Es la parte del proyecto que más se usa en las reuniones y la que conviene no
perder.

**Marcadores de dato pendiente** (`<Pend>`): subrayado ámbar punteado sobre el
dato que falta confirmar. Al tocarlo abre el panel con la explicación. Hay
**13 marcadores** vivos en el contenido.

**Panel de revisión**: el botón «Datos por completar», abajo a la derecha de
cada página. Dice qué cambió respecto del original, por qué, y qué falta del
lado del cliente. Son **7 grupos de notas**.

**Marcador de sección sin migrar** (`<PendienteSeccion>`): lista al pie de la
página lo que todavía vive en el HTML original, para que nadie la dé por
terminada al ver el hero listo.

### Lo que falta del lado del cliente

| Dónde | Qué falta |
|---|---|
| `/contacto` | El número real de **WhatsApp Bolivia** |
| `/contacto` | El número de **WhatsApp USA** (Tech Agents LLC) |
| `/contacto` | Definir el **correo** en `groupquimera.com.bo` — hoy usa un dominio ajeno |
| `/contacto` | El **link de agenda** real — hoy apunta a la home de Calendly |
| `/proyectos` | Los **tres números** del caso Bolivia Fitness |
| `/proyectos` | Confirmar cuáles de los seis sistemas son **de verdad confidenciales** |
| `/nosotros` | Unificar la **cifra de marcas atendidas** (el PDF dice 100+, el sitio +50) |
| `/nosotros` | Nombre completo de **EIAN** y el rol exacto de Johnny |
| `/nosotros` | Confirmar con **Sapien9** el uso de su nombre |
| `/servicios` | Definir **precios** o un «desde» para cada modalidad |
| varias | Apellidos, roles y años por confirmar en testimonios |

---

## Decisiones que conviene no deshacer sin leer

Están explicadas en el código, donde corresponden. Las que más veces mordieron:

**Las de carga están todas medidas**, y varias son contraintuitivas — montar el
video del hero más tarde empeora el LCP, diferir el bundle empeora la nota. La
tabla completa, con el porqué de cada una y lo que se probó y no funcionó, está
en [`app/README.md`](app/README.md#carga).

**`ch` se mide contra la fuente del elemento que lleva la clase**, no la de sus
hijos. Un `max-w-[38ch]` en un contenedor con cuerpo de párrafo da un tercio de
lo que uno cree estar pidiendo. El tope va siempre en el elemento con el texto.

**El escáner de Tailwind lee el código como texto plano.** Una clase armada con
`${}` no se genera nunca. Todas las clases van literales, aunque se repitan.

**Las «clases canónicas» que sugiere el linter asumen el tema por defecto.**
Este proyecto no declara la escala de interlineado, así que `leading-normal`
emite una variable sin valor y el navegador cae en `normal` (~1,2). Costó 12px
de alto en el home antes de detectarlo.

**Un hijo de grid trae `min-width:auto`.** Si adentro hay una tira flex con
scroll, su mínimo es la suma de todos los hijos y la página entera se va de
lado. Hace falta `min-w-0`.

**Los logos se escalan por área, no por caja** (`lib/optico.js`). Limitarlos por
alto y ancho deja a los lockups largos con el triple de mancha que a las
insignias compactas. Con la fórmula, el área mayor es 1,03× la menor.

**El texto que aparece en hover va absoluto, y lo absoluto no empuja la caja.**
Si no entra, se corta sin avisar. Donde eso pasa (las unidades de `/nosotros`)
está medido y anotado cuánto aire queda.

---

## Lo que sigue

1. **El caso Shiba** en `/proyectos` — el bloque ancla de la página, el único
   centrado y a sangre.
2. **Dónde estamos** en `/contacto` — las cuatro plazas.
3. **Los datos del cliente** de la tabla de arriba.
4. **El endpoint del formulario**: hoy valida y avisa, no manda. En producción
   va a `/leads`, que ya existe y funciona; falta apuntarlo a un correo de la
   empresa.
5. **Revisar los permisos de los clientes** antes de publicar.
