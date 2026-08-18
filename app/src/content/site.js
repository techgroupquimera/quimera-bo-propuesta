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
/* El lockup de la marca —la quimera alada, GROUP QUIMERA y la bajada— en SVG.
   Era un webp de 208px de ancho y a 74px de alto la línea «Marketing y Tech»
   se veía como una mancha gris: son letras de 6px, y a esa altura ningún
   raster aguanta. El SVG las dibuja nítidas a cualquier tamaño y en cualquier
   densidad de pantalla.

   Pesa 19 KB contra los 15 del webp, o sea 4 KB más — pero comprimido son 8 y
   el webp no se comprime, así que por la red viaja la mitad. Importa: este
   archivo es, medido con Lighthouse, el elemento LCP en móvil.

   `ancho` y `alto` son los del viewBox y no una medida de display: lo único
   que hacen es fijarle la proporción al <img> para que la barra no se
   reacomode cuando el archivo llega. El tamaño real lo pone la clase. */
export const MARCA = {
  lockup: '/assets/logo-lockup.svg',
  ancho: 694,
  alto: 619,
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
     Las dos sociedades con su dirección y su teléfono, y el correo, debajo del
     logo y la bajada. No es sólo información de contacto: nombrar a Quimera
     Group en Santa Cruz y a TechAgents LLC en Miami es parte del argumento del
     sitio —«un grupo, no un proveedor suelto»— y es lo que busca una empresa
     antes de firmar algo.

     Los datos son los que mandó el cliente. Van tal cual, con dos ajustes de
     forma y ninguno de fondo: la dirección de Miami vino en mayúsculas de
     documento legal y acá va en caja normal, como el resto del pie; y el
     teléfono boliviano se parte en grupos (77 314 890) porque un número de ocho
     dígitos corrido no se lee ni se copia bien.

     `href` va aparte del texto en los dos teléfonos: lo que se muestra lleva
     espacios y paréntesis, y lo que marca el teléfono no puede llevar nada más
     que el «+» y los dígitos.

     La razón social boliviana es «Quimera Marketing SRL», que NO es el nombre
     de la marca: el sitio se llama Group Quimera en todos lados y acá dice quién
     firma, que es otra cosa. Va tal como la escribió el cliente, sin puntos.

     ⚠ Lo que sigue sin cerrar, anotado en content/notas.js: el correo vino como
     «puede ser marketing@groupquimera.com». Se usa ése, pero /contacto sigue
     ofreciendo `hola@quimera.com` —otro dominio— así que el sitio dice dos
     correos distintos hasta que se unifiquen. */
  corporativo: {
    titulo: 'Corporate',
    sedes: [
      {
        pais: 'Bolivia',
        razon: 'Quimera Marketing SRL',
        direccion: ['Santa Cruz de la Sierra'],
        telefono: '+591 77 314 890',
        telefonoHref: 'tel:+59177314890',
      },
      {
        pais: 'United States',
        razon: 'TechAgents LLC',
        direccion: ['2 S Biscayne Boulevard, Suite 3200 #6835', 'Miami, FL 33131'],
        telefono: '+1 (803) 916-0333',
        telefonoHref: 'tel:+18039160333',
      },
    ],
    correo: 'marketing@groupquimera.com',
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
    /* ── Ecosistema ──
       Antes era «El grupo» y listaba los cinco dominios pelados
       (`quimerahosting.com`, `techagents.dev`…). Ahora dice los NOMBRES: un
       dominio es una dirección y una marca es una empresa, y lo que este bloque
       tiene que decir es qué hay atrás. El destino no se pierde — cada nombre
       enlaza a su sitio.

       Sapien9 va en su propio subtítulo y con la flecha. No es una unidad del
       grupo sino un aliado, y la flecha marca justamente eso: los cuatro de
       arriba llevan a sitios de la casa, éste sale afuera.

       ⚠ `groupquimera.com.pe` dejó de figurar: estaba en la lista vieja y el
       boceto nuevo no lo trae. Perú sigue nombrado en la columna de al lado
       («Technical Hub · Lima») pero ya no hay dónde clickearlo. */
    {
      titulo: 'Ecosistema',
      tipo: 'links',
      items: [
        { label: 'Group Quimera', href: 'https://groupquimera.com', externo: true },
        { label: 'Quimera Cloud', href: 'https://quimeracloud.com', externo: true },
        { label: 'Quimera Hosting', href: 'https://quimerahosting.com', externo: true },
        { label: 'Tech Agents LLC', href: 'https://techagents.dev', externo: true },
      ],
      sub: {
        titulo: 'Alianza estratégica',
        items: [
          { label: 'Sapien9', href: 'https://sapien9.com', externo: true, fuera: true },
        ],
      },
    },
    /* ── Presencia & red ──
       Eran cuatro plazas sueltas (Santa Cruz · Miami · Silicon Valley · Lima) y
       ahora se agrupan por país, con lo que se hace en cada uno. La diferencia
       no es de orden: «Silicon Valley · Ciberseguridad» leído en la misma lista
       que las otras tres decía que el grupo tiene oficina ahí, y lo que hay es
       un aliado. Por eso el partner va separado y con su nombre.

       Los encabezados van en inglés porque así vienen del cliente, igual que en
       el bloque corporativo de arriba. */
    {
      titulo: 'Presencia & red',
      tipo: 'datos',
      items: [
        { zona: 'Bolivia', lineas: ['Ingeniería & Operaciones', 'Santa Cruz de la Sierra'] },
        { zona: 'United States', lineas: ['Software, AI & Operations', 'Miami · Florida'] },
        { zona: 'Peru', lineas: ['Technical Hub', 'Lima'] },
        {
          zona: 'Strategic partner',
          lineas: ['Sapien9', 'Cybersecurity', 'Silicon Valley · USA'],
        },
      ],
    },
  ],

  /* La barra de abajo: quién firma, lo legal y las redes.

     El copyright nombra la MARCA y no la sociedad. Las dos están en el pie y
     cada una en su lugar: «Quimera Marketing SRL» arriba, en el bloque
     corporativo, que es donde se dice quién firma un contrato; acá abajo, el
     nombre con el que la conocen. (Ojo: el sitio actual usa «Quimera Group
     S.A.», que no es ninguna de las dos. Si esa sociedad existe, hay que
     decidir cuál va.)

     ⚠ Las tres piezas legales NO son enlaces todavía: las páginas no existen.
     Van como texto, que es la misma regla que se aplica en /contacto a los
     canales sin destino — un enlace que no lleva a ningún lado es peor que una
     línea de texto, porque promete algo y falla al tocarlo. Cuando existan las
     rutas se les agrega `href` y se vuelven enlaces sin tocar el componente.

     Y no es sólo cuestión de escribirlas: una política de privacidad tiene que
     decir qué datos toma el formulario, dónde se guardan y quién los ve. Eso lo
     define el cliente, no el sitio. */
  copyright: '© 2026 Group Quimera · All rights reserved',
  legales: [
    { label: 'Privacidad' },
    { label: 'Términos' },
    { label: 'Cookies' },
  ],
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/quimera_marketing/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/quimeramarketing/' },
    { label: 'Facebook', href: 'https://www.facebook.com/Marketing.Quimera/' },
  ],
}

export const VIDEO_DISERTACION = '/assets/disertacion.mp4'
