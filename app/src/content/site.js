/* Contenido compartido por todas las páginas: navegación, marcas y footer.
   Nada de esto es diseño — si cambia el layout, este archivo no se toca. */

/* ── El sitio, para lo que hay que nombrarlo con URL absoluta ──
   Canonical, Open Graph, sitemap y datos estructurados no aceptan rutas
   relativas: los tres tienen que decir el host. Vive acá, una vez, y de acá lo
   lee el pre-render — así no queda el dominio escrito a mano en cuatro lugares
   distintos que después se desincronizan.

   ⚠ `origen` ES EL DATO A CONFIRMAR. Está puesto en el .bo porque es lo que
   sugiere el pendiente de /contacto («definir correo en groupquimera.com.bo») y
   porque separa este sitio del .com del grupo y del .com.pe de Perú. Si el
   sitio va a otro host, se cambia esta línea y con eso se mueven las canonical
   de las ocho páginas, el Open Graph y el sitemap.

   Sin barra al final: las rutas ya empiezan con «/».
   `imagenOg` va en JPG y no en webp: la comparte WhatsApp, que es por donde se
   va a compartir esto, y ahí el webp todavía no es confiable. */
export const SITIO = {
  origen: 'https://groupquimera.com.bo',
  nombre: 'Group Quimera',
  imagenOg: '/assets/og.jpg',
  imagenOgAlt: 'Johnny Ferrante de Group Quimera durante su disertación en el Foro FEM de CAMEBOL',
  imagenOgAncho: 1200,
  imagenOgAlto: 630,
  locale: 'es_BO',
}
/* `sub` es opcional y hoy lo usa sólo Proyectos, que es la única que se
   partió en dos. El padre sigue siendo un destino real —lleva a la entrada,
   donde están las dos puertas grandes—, así que el desplegable es un atajo y
   no la única forma de llegar: si el hover no existe o falla, el enlace
   funciona igual.

   Cada hijo lleva `texto` porque un menú de dos palabras sueltas no dice cuál
   es cuál: «Tecnología» a secas se confunde con la página del stack, que está
   dos lugares más a la izquierda en la misma barra. */
export const NAV = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Tecnología', href: '/tecnologia' },
  {
    label: 'Proyectos',
    href: '/proyectos',
    sub: [
      {
        label: 'Tecnología',
        href: '/proyectos/tecnologia',
        texto: 'Sitios y agentes en producción',
      },
      {
        label: 'Marketing',
        href: '/proyectos/marketing',
        texto: 'Marcas, contenido y campañas',
      },
    ],
  },
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

  /* ── Los datos corporativos ──
     Las dos sociedades, el correo y el teléfono, debajo del logo y la bajada.
     No es sólo información de contacto: nombrar la S.R.L. boliviana y la LLC de
     Miami es parte del argumento del sitio —«un grupo, no un proveedor suelto»—
     y es lo que una empresa que va a firmar algo busca antes de escribir.

     ⚠ DOS DE ESTOS CAMPOS SON MARCADORES, NO DATOS: la razón social boliviana y
     el teléfono. Van escritos como los mandó el cliente —«[NOMBRE LEGAL] S.R.L.»
     y «+591 XXX XXX XX»— y no con algo que parezca real: un pie con una razón
     social inventada es mucho peor que uno que muestra el hueco. Están anotados
     en content/notas.js.

     El correo sí es real y va enlazado. Ojo con esto: /contacto todavía ofrece
     `hola@quimera.com`, que es de otro dominio y está marcado como pendiente
     desde el principio. Ahora el sitio dice dos correos distintos en dos lugares
     — hay que unificarlos. */
  corporativo: {
    titulo: 'Corporate',
    sedes: [
      {
        pais: 'Bolivia',
        razon: '[NOMBRE LEGAL] S.R.L.',
        plaza: 'Santa Cruz de la Sierra',
      },
      {
        pais: 'United States',
        razon: 'Tech Agents LLC',
        plaza: 'Miami · Florida',
      },
    ],
    correo: 'contacto@groupquimera.com',
    telefono: '+591 XXX XXX XX',
  },
  columnas: [
    {
      titulo: 'Navegar',
      tipo: 'links',
      items: [
        { label: 'Inicio', href: '/' },
        { label: 'Servicios', href: '/servicios' },
        { label: 'Tecnología', href: '/tecnologia' },
        { label: 'Proyectos', href: '/proyectos' },
        /* Las dos mitades de /proyectos entran acá y no en la barra de arriba: el
           menú principal son cuatro destinos y sumarle dos anidados lo convierte
           en un desplegable. Abajo, en cambio, el mapa del sitio tiene que
           nombrar todo lo que existe o esas dos páginas no se descubren desde
           ningún lado salvo entrando a la entrada. */
        { label: '· Tecnología', href: '/proyectos/tecnologia' },
        { label: '· Marketing', href: '/proyectos/marketing' },
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
