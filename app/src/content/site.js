/* Contenido compartido por todas las páginas: navegación, marcas y footer.
   Nada de esto es diseño — si cambia el layout, este archivo no se toca. */

export const NAV = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Tecnología', href: '/tecnologia' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Nosotros', href: '/nosotros' },
]

export const CTA_PRINCIPAL = { label: 'Conversemos', href: '/contacto' }

/* El lockup en webp y a 208 px de ancho: se ve a 74 de alto como máximo y a 62
   en un teléfono, así que cubre casi 3× de densidad. El PNG original (538×460,
   75 KB) sigue en assets/ — es la fuente, y de ahí sale éste con
   `npm run imagenes`.

   No es un logo cualquiera para la carga: está en la barra de las seis rutas y,
   medido, es el elemento LCP en móvil — el panel de video del hero queda debajo
   del pliegue, así que el logo es lo más grande de la primera pantalla. */
export const MARCA = {
  lockup: '/assets/logo-lockup.webp',
  ancho: 208,
  alto: 178,
  alt: 'Group Quimera · Marketing y Tech',
}

/* ── marquesina de marcas · 29 clientes ──
   Excluidos a propósito: 'meta' (puede leerse como "somos partner de Meta") y
   los logos propios.

   Cada entrada trae [slug, ancho, alto] de display. Declarar las dimensiones es
   necesario, no cosmético: sin ellas el layout se reacomoda a medida que cargan
   las imágenes, el ancho del track cambia en marcha y la animación (que se
   calcula sobre ese ancho) da saltos. Tampoco se usa loading="lazy": los logos
   fuera de vista no se cargaban hasta entrar al viewport, y al hacerlo estiraban
   el track en plena animación — era la causa de que el carrusel se cortara. La
   carga se decide por sección y no por imagen; el cómo está en ui/Marcas.jsx.
   El orden alterna logos anchos y compactos para que la tira se vea equilibrada. */
export const LOGOS = [
  ['laboliviana', 340, 31], ['monopol', 128, 64], ['xiaomi', 238, 44], ['la-ganga', 86, 64],
  ['placacenter', 340, 32], ['tecnotel', 77, 64], ['casacolor', 232, 45], ['re-kids', 62, 64],
  ['eglo', 221, 47], ['paradise', 82, 64], ['liulong', 241, 43], ['fisio-spa', 56, 64],
  ['natukira', 164, 64], ['gps-consulting', 118, 64], ['monopol-automotiva', 204, 51],
  ['diamondart', 61, 64], ['oscon', 190, 55], ['blue-jay', 95, 64], ['matri', 177, 59],
  ['sbt', 63, 64], ['ribepar', 170, 61], ['ghtractor', 95, 64], ['grupo-givera', 150, 64],
  ['bolfitness', 84, 64], ['shiba', 147, 64], ['tu-estilo', 90, 64],
  ['monopol-industrial', 204, 51], ['whl', 120, 64], ['gameworld', 96, 64],
]

/* El texto que encabeza la tira. Vive acá y no en home.js porque la misma tira
   —con la misma frase— cierra /proyectos, donde va entre «Bajo acuerdo» y el
   cierre. */
export const MARCAS = {
  titulo: 'Marcas que ya nos dejaron entrar a sus operaciones',
}

export const FOOTER = {
  bajada:
    'Tecnología a medida para empresas que quieren crecer. Tu sistema, tus datos, tu infraestructura.',
  plaza: 'Santa Cruz de la Sierra · Bolivia',
  columnas: [
    {
      titulo: 'Navegar',
      tipo: 'links',
      items: [
        { label: 'Inicio', href: '/' },
        { label: 'Servicios', href: '/servicios' },
        { label: 'Tecnología', href: '/tecnologia' },
        { label: 'Proyectos', href: '/proyectos' },
        { label: 'Nosotros', href: '/nosotros' },
        { label: 'Contacto', href: '/contacto' },
      ],
    },
    {
      titulo: 'El grupo',
      tipo: 'links',
      items: [
        { label: 'groupquimera.com', href: 'https://groupquimera.com', externo: true },
        { label: 'groupquimera.com.pe', href: 'https://groupquimera.com.pe', externo: true },
        { label: 'techagents.dev', href: 'https://techagents.dev', externo: true },
        { label: 'quimeracloud.com', href: 'https://quimeracloud.com', externo: true },
        { label: 'quimerahosting.com', href: 'https://quimerahosting.com', externo: true },
      ],
    },
    {
      titulo: 'Presencia',
      tipo: 'datos',
      items: [
        { plaza: 'Santa Cruz', rol: 'Ingeniería' },
        { plaza: 'Miami', rol: 'Tech Agents LLC' },
        { plaza: 'Silicon Valley', rol: 'Ciberseguridad' },
        { plaza: 'Lima', rol: 'Hub técnico' },
      ],
    },
  ],
  copyright: '© 2026 Group Quimera · ',
  copyrightPend: {
    texto: 'razón social a confirmar',
    nota: 'El sitio actual dice «Quimera Group S.A.» — confirmar',
  },
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/quimera_marketing/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/quimeramarketing/' },
    { label: 'Facebook', href: 'https://www.facebook.com/Marketing.Quimera/' },
  ],
}

export const VIDEO_DISERTACION = '/assets/disertacion.mp4'
