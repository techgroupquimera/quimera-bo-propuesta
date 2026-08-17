/* Copy de /tecnologia — textual de tecnologia.html.
   Mismo mini-lenguaje que el resto: *x* énfasis, \n salto de línea. */

export const META = {
  titulo: 'Tecnología · Group Quimera · El stack que ponemos a tu servicio',
  descripcion:
    'Los mejores modelos de IA, agentes y automatización, desarrollo moderno, datos en la nube o servidor propio, y ciberseguridad de nivel enterprise con Sapien9.',
}

export const HERO = {
  migas: [{ label: 'Inicio', href: '/' }, { label: 'Tecnología' }],
  kicker: 'La caja de herramientas',
  titulo: 'El *músculo tecnológico*\nque ponemos a tu servicio.',
  bajada:
    'Dominamos las mismas herramientas que usan las empresas más avanzadas del mundo, muchas de código abierto para que nada te ate.',
  /* Las fichas de las dos columnas en bucle. No es copy nuevo: son nombres
     textuales del stack que la propia página lista más abajo. El hero adelanta
     la caja de herramientas de la que habla el titular en vez de poner cuadros
     decorativos vacíos.

     Siete por columna es el mínimo para que un set sea más alto que la ventana
     y el bucle no abra hueco. Están repartidas por familia —la que sube trae IA
     y desarrollo, la que baja datos, nube e integraciones— así ninguna columna
     se lee como una lista sola cortada al medio. */
  columnas: [
    ['Claude', 'OpenAI · GPT', 'Gemini', 'Llama', 'n8n', 'LangGraph', 'Next.js', 'React', 'Python'],
    [
      'Supabase',
      'PostgreSQL',
      'Vercel',
      'Cloudflare',
      'Docker',
      'Odoo · ERP',
      'Stripe',
      'WhatsApp API',
      'Servidor propio',
    ],
  ],
}

/* Seis grupos, textuales del original. El wireframe dibuja cuatro; son los
   mismos seis en dos columnas.

   `apunte` es el <em> que el original le cuelga a dos de los títulos. Y
   `destacada` marca los dos grupos que iban en glass-lime: IA y agentes. No es
   decoración — son el diferencial de la empresa, y el original ya los separaba
   del resto. */
export const STACK = [
  {
    titulo: 'Inteligencia artificial',
    apunte: 'los mejores modelos',
    destacada: true,
    items: ['Claude', 'OpenAI · GPT', 'Gemini', 'DeepSeek', 'Llama', 'Qwen', 'Mistral'],
  },
  {
    titulo: 'Agentes & automatización',
    destacada: true,
    items: ['n8n', 'LangGraph', 'CrewAI', 'PydanticAI', 'Claude Code'],
  },
  {
    titulo: 'Desarrollo',
    items: ['Next.js', 'React', 'Node.js', 'Python', 'FastAPI', 'Astro', 'Apps móviles'],
  },
  {
    titulo: 'Datos & nube',
    items: ['Supabase', 'PostgreSQL', 'Neon', 'Railway', 'Vercel', 'Cloudflare', 'Servidor propio'],
  },
  {
    titulo: 'Open source',
    apunte: 'tecnología libre',
    items: ['Odoo · ERP', 'Ollama · IA local', 'Docker', 'Whisper', 'MediaPipe', 'Playwright'],
  },
  {
    titulo: 'Integraciones & pagos',
    items: ['Stripe', 'HubSpot', 'Salesforce', 'Kommo', 'WhatsApp API', 'Blockchain'],
  },
]

/* Cae justo después del stack a propósito: la lista de herramientas impresiona,
   y este bloque es el que dice la parte incómoda —que sin base no sirve de nada
   y que es un proceso—. Todo sale del reel «ia 2 ferrante», nada es copy
   nuevo. */
export const BASE = {
  id: 'base',
  kicker: 'Antes del stack',
  titulo: 'Si no hay base,\nno hay IA que *valga*.',
  cita: {
    texto: '«Si tu empresa no tiene la infraestructura digital mínima, podemos empezar por ahí.»',
    firma: 'Johnny Ferrante',
  },
  parrafo:
    'Ninguna de las herramientas de arriba sirve sola. Si los datos no están, si el proceso no existe o si el embudo comercial todavía se maneja a mano, el primer trabajo es ese — y está bien empezar ahí.',
  puntos: [
    'Esto no es de la noche a la mañana. Es un proceso, y por eso arranca con un plan.',
    'Lo importante no es que compres un servicio y veas un resultado suelto: es que la IA quede integrada en tu día a día.',
    'Un sistema que opera todo el año, no una demo que impresiona en la reunión.',
  ],
  reel: {
    video: '/assets/reel-base.mp4',
    poster: '/assets/reel-base.webp',
    autor: 'Johnny Ferrante · Founder & CEO',
    duracion: '39 s · con sonido',
  },
}

/* «Sin ataduras» (código abierto, respaldos, nube o servidor propio) se sacó por
   pedido del cliente: no se migra. Estaba entre «Antes del stack» y esta. */
export const SEGURIDAD = {
  id: 'ciberseguridad',
  kicker: 'Silicon Valley · Ciberseguridad',
  titulo: 'Tu tecnología,\n*protegida*.',
  bajada:
    'La tranquilidad también es seguridad. Operamos junto a **Sapien9**, con experiencia de nivel enterprise en Estados Unidos, para blindar tu operación.',
  pend: {
    texto: 'Confirmar con Sapien9 el uso de su nombre',
    nota: 'Confirmar con Sapien9 que aprueban aparecer nombrados y cómo quieren que se los mencione',
  },
  /* Las tres van iguales: el original no destaca ninguna y el wireframe tampoco.
     Lo que las ordena es el desfase vertical, no el color. */
  piezas: [
    {
      icono: 'escudo',
      titulo: 'Protección seria',
      texto: 'Seguridad de nivel corporativo, sin necesitar un departamento entero.',
    },
    {
      icono: 'lupa',
      titulo: 'Revisión previa',
      texto: 'Auditamos antes de publicar: tus accesos, tus pagos y los datos de tus clientes.',
    },
    {
      icono: 'lista',
      titulo: 'Cumplimiento',
      texto: 'Buenas prácticas para operar con confianza y clientes exigentes.',
    },
  ],
}

/* El wireframe dibuja un párrafo entre el titular y la lista. El original no
   tiene uno acá —sólo kicker, titular, los tres puntos y el botón del video— y
   ese hueco queda vacío antes que inventar copy.

   Los tres puntos son los mismos que en «El diferencial» de /servicios: así
   están en el HTML original, en las dos páginas. */
export const DIFERENCIAL = {
  id: 'diferencial',
  kicker: 'El diferencial',
  titulo: 'Inteligencia que\n*hace el trabajo*.',
  /* No es escenario-hd.webp: aquella era la entrega de la placa entre
     bambalinas, con Johnny de espaldas y la consola de audio en cuadro, y el
     alt decía «disertando sobre inteligencia artificial». Este fotograma sí es
     la disertación. */
  foto: {
    src: '/assets/disertacion-escena.webp',
    alt: 'Johnny Ferrante en el escenario del Foro FEM 2026 de CAMEBOL, con su lámina sobre acceso financiero proyectada detrás',
  },
  ctaVideo: { label: 'Ver la disertación · 42 s' },
  puntos: [
    'Sistemas que aprenden de **tus** datos y responden con tu información, no con generalidades.',
    'Asistentes que ejecutan tareas de principio a fin, entre tus áreas, sin que tengas que estar encima.',
    'Manejamos los mejores modelos del mundo y elegimos el correcto para cada trabajo.',
  ],
}

/* Mismo bloque de cierre que el home y /servicios —comparten componente— con el
   copy propio de esta página. */
export const CIERRE = {
  kicker: 'El siguiente paso',
  titulo: '¿Querés ver alguno\n*funcionando en vivo*?',
  bajada:
    'Podemos mostrarte cualquiera de nuestros sistemas en la reunión, con datos reales corriendo.',
  cta: { label: 'Conversemos', href: '/contacto' },
}
