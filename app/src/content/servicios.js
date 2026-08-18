/* Copy de /servicios — textual de servicios.html.
   Mismo mini-lenguaje que el resto: *x* énfasis, \n salto de línea.
   Las etiquetas de botón no llevan «→»: la flecha la pone <Button>. */

export const META = {
  titulo: 'Servicios · Group Quimera · Dejá de alquilar tu tecnología',
  descripcion:
    'Tu CRM, tu ERP y tus áreas conectadas, construidos a la medida de cómo trabaja tu empresa. Tu sistema, tus datos, tu infraestructura. Santa Cruz, Bolivia.',
}

export const HERO = {
  migas: [{ label: 'Inicio', href: '/' }, { label: 'Servicios' }],
  kicker: 'Nuestra propuesta',
  titulo: 'Dejá de *alquilar* tu tecnología.\nQue sea tuya.',
  /* El párrafo original entero, partido en sus dos ideas. Al pie del hero van
     como dos columnas separadas por una flecha —la primera dice qué se
     construye, la segunda de quién es— que es como lo ordena la referencia.
     No se recortó ni se reescribió nada: es el mismo texto en dos tramos. */
  apoyos: [
    'Te construimos tus propios sistemas, hechos a la medida de cómo trabaja tu empresa. Uno solo, integrado, y para siempre.',
    'Tu sistema, tus datos, tu infraestructura — sin dependencia de terceros ni sorpresas en la factura.',
  ],
  cta: { label: 'Pedir diagnóstico', href: '/contacto' },
}

export const PROBLEMA = {
  id: 'problema',
  kicker: 'Quizás te suena',
  titulo: 'Diez herramientas,\n*diez facturas*,\ny nada se habla entre sí.',
  bajada:
    'La mayoría de las empresas viven pegando parches: una app para esto, otra para aquello, planillas sueltas y datos que nadie termina de ver completos. Pagás todos los meses y seguís dependiendo de otros.',
  /* Son síntomas, no logros. En el HTML original iban con la lista de tildes
     lima —el mismo componente que marca lo que SÍ hace un agente— y una queja
     con un tilde verde al lado se lee al revés de lo que dice. Acá van sin
     marcador: el escalonado ya les da el ritmo. */
  sintomas: [
    'Ventas, finanzas y operaciones en sistemas que no se conectan.',
    'Mensualidades que suben y límites que no elegiste.',
    'Tus datos viviendo en servidores ajenos.',
    'Nadie te da, en una sola pantalla, la foto real del negocio.',
  ],
}

/* El wireframe de esta sección es el mismo que el de «Nuestra propuesta» del
   home: encabezado partido y cuatro tarjetas escalonadas. La diferencia es que
   acá el original NO trae párrafo de bajada — sólo kicker y titular — así que
   la columna derecha del encabezado queda libre. No se inventa uno. */
export const CONSTRUIMOS = {
  id: 'construimos',
  kicker: 'Lo que construimos',
  titulo: 'Un solo sistema, *tuyo*,\nhecho a tu medida.',
  /* Las mismas cuatro fotos que las tarjetas del home, y a propósito: son las
     mismas cuatro piezas contadas de nuevo, así que repetir la imagen es lo que
     hace que se reconozcan de una página a la otra. Las dos que acá cambian
     —«Áreas conectadas» y «A tu medida»— toman la agenda y el dueño mirando su
     negocio, que son las escenas que les corresponden. */
  piezas: [
    {
      icono: 'personas',
      titulo: 'Tu CRM',
      imagen: '/assets/tarjeta-crm.webp',
      texto: 'Tus clientes y tu proceso de ventas ordenados, sin pagar por usuario.',
      destacada: true,
    },
    {
      icono: 'documento',
      titulo: 'Tu ERP',
      imagen: '/assets/tarjeta-finanzas.webp',
      texto: 'Finanzas, inventario, equipo y facturación en un solo lugar.',
    },
    {
      icono: 'red',
      titulo: 'Áreas conectadas',
      imagen: '/assets/tarjeta-agenda.webp',
      texto: 'Ventas, soporte y finanzas hablándose solas, sin planillas sueltas.',
    },
    {
      icono: 'diana',
      titulo: 'A tu medida',
      imagen: '/assets/tarjeta-negocio.webp',
      texto: 'Diseñado para tu negocio, no una plantilla que hay que forzar.',
    },
  ],
}

/* Ocho áreas, todas del mismo peso: es un inventario, no un ranking. Por eso
   ninguna va destacada ni escalonada —eso es de la sección de arriba— y el
   orden es el del original. */
export const RESOLVEMOS = {
  id: 'resolvemos',
  kicker: 'Lo que resolvemos',
  titulo: 'Tranquilidad en *cada área*\nde tu negocio.',
  areas: [
    {
      icono: 'grafico',
      titulo: 'Ventas',
      texto: 'Ordena tus oportunidades y te muestra qué cerrar hoy. Nada se pierde.',
    },
    {
      icono: 'chat',
      titulo: 'Atención',
      texto: 'Respuestas al instante, a toda hora, con la información correcta.',
    },
    {
      icono: 'caja',
      titulo: 'Operaciones',
      texto: 'Procesos que corren solos: menos trabajo manual, menos errores.',
    },
    {
      icono: 'datos',
      titulo: 'Finanzas',
      texto: 'Cobros e ingresos claros y automáticos, sin perseguir números.',
    },
    {
      icono: 'altavoz',
      titulo: 'Marketing',
      texto: 'Contenido y campañas que trabajan por tu marca todos los días.',
    },
    {
      icono: 'grilla',
      titulo: 'Dirección',
      texto: 'La foto completa del negocio en una pantalla, para decidir con datos.',
    },
    {
      icono: 'foco',
      titulo: 'Consultoría',
      texto: 'Te asesoramos qué tecnología conviene antes de construir nada.',
    },
    {
      icono: 'persona',
      titulo: 'Tu equipo',
      texto: 'Personas y roles organizados, con acceso a lo que cada uno necesita.',
    },
  ],
}

export const TRABAJAMOS = {
  id: 'implementado',
  kicker: 'Cómo trabajamos',
  titulo: 'No es un catálogo.\nEs un equipo que se mete *adentro*.',
  cita: {
    texto:
      '«Un equipo que se integre a tu empresa, que entienda tus operaciones desde adentro y que piense como parte de tu equipo.»',
    firma: 'Dicho en cámara · reel de campaña',
  },
  parrafo:
    'Por eso no cotizamos por catálogo. Vamos a tu empresa, miramos cómo trabaja hoy y de ahí sale la propuesta. En persona — _un proveedor que podés ver cara a cara_, no una agencia que solo aparece en tus anuncios.',
  cta: { label: 'Pedir la auditoría', href: '/contacto' },
  reel: {
    video: '/assets/reel-socio.mp4',
    poster: '/assets/reel-socio.webp',
    autor: 'Martha ',
    autorPend: {
      texto: '· apellido y rol por confirmar',
      nota: 'Falta el apellido y el rol',
    },
    duracion: '29 s · con sonido',
  },
  /* La enumeración es textual del reel «ia 1 ferrante» — no la escribimos
     nosotros. Va en pastillas y no en tarjetas: arriba en la página ya hay dos
     grillas seguidas, y si esto fuera una tercera se leería como más de lo
     mismo en vez de como la prueba de lo anterior. */
  implementado: {
    titulo: 'Lo que ya pusimos a funcionar dentro de empresas reales',
    /* El wireframe marca una pastilla distinta de las demás. Va en la de
       agentes porque es de lo que trata el resto del sitio; el original no
       tiene jerarquía acá, así que mover el destacado es cambiar esta línea. */
    destacado: 'Agentes de inteligencia artificial',
    items: [
      'Onboarding de personal',
      'Reclutamiento',
      'Salidas y desvinculaciones',
      'Finanzas',
      'Sistemas administrativos completos',
      'Agentes de inteligencia artificial',
      'Chatbots',
    ],
    pend: {
      texto: 'Confirmar que las siete siguen vigentes',
      nota: 'La enumeración sale del reel «ia 1 ferrante». Confirmar que las siete siguen vigentes y si falta alguna.',
    },
  },
}

/* Acá la cita no acompaña al titular: es la sección. El wireframe la dibuja a
   cuatro líneas de ancho completo y todo lo demás alrededor, así que va a
   cuerpo de titular y el h2 queda como entrada. */
export const DIFERENCIAL = {
  id: 'diferencial',
  kicker: 'El diferencial',
  titulo: 'Inteligencia que *hace el trabajo*.',
  cita: {
    texto:
      '«No usamos la inteligencia artificial para impresionar. La usamos para que tu empresa trabaje sola, con la calma de saber que todo está funcionando.»',
    firma: 'Así pensamos la tecnología',
  },
  puntos: [
    'Sistemas que aprenden de **tus** datos y responden con tu información, no con generalidades.',
    'Asistentes que ejecutan tareas de principio a fin, entre tus áreas, sin que tengas que estar encima.',
    'Manejamos los mejores modelos del mundo y elegimos el correcto para cada trabajo.',
  ],
}

export const FORMAS = {
  id: 'formas',
  kicker: 'Cómo empezamos juntos',
  titulo: 'Tres formas de *trabajar con vos*.',
  bajada:
    'Desde una web o tienda online con un asistente inteligente de preguntas frecuentes, hasta un sistema completo que corre toda tu empresa. Elegí según tu momento.',
  /* El orden es una escalera —arrancar, escalar, diferenciarse— así que no se
     reordena para acomodar el diseño. El destacado es el tercero porque es el
     que el original marca en verde, y es el tramo más alto de esa escalera. */
  formas: [
    {
      icono: 'tienda',
      titulo: 'Web & tienda',
      tag: 'Para arrancar',
      texto:
        'Tu web o tienda online lista para vender, con un asistente inteligente que responde solo las preguntas frecuentes de tus clientes.',
    },
    {
      icono: 'monitor',
      titulo: 'Tu plataforma',
      tag: 'Para escalar',
      texto:
        'Tu CRM y tu ERP a medida, tus áreas conectadas y tus procesos automáticos. El sistema que sostiene el crecimiento.',
    },
    {
      icono: 'estrella',
      titulo: 'Tecnología de élite',
      tag: 'Para diferenciarte',
      texto:
        'Lo que casi nadie ofrece: inteligencia a la medida, sistemas avanzados y seguridad de nivel internacional.',
      destacada: true,
    },
  ],
  nota: '*Siempre a medida.* En cualquiera de las tres, diseñamos la solución para tu negocio, nunca una plantilla genérica.',
}

/* Los cinco pasos son una secuencia de iguales: ninguno va destacado. El
   wireframe marca uno de los bloques, pero acá eso diría «el paso 3 importa más
   que los otros», que no es lo que dice el original ni tendría sentido en un
   proceso. La jerarquía la da el orden, y eso ya lo cuenta el riel. */
export const PROCESO = {
  id: 'proceso',
  kicker: 'Nuestro proceso',
  titulo: 'Sin sorpresas, *paso a paso*.',
  pasos: [
    {
      n: '01',
      titulo: 'Escuchamos',
      texto: 'Entendemos tu negocio y qué querés lograr, con metas claras.',
    },
    {
      n: '02',
      titulo: 'Diseñamos',
      texto: 'Te mostramos cómo se verá antes de construirlo. Vos aprobás.',
    },
    {
      n: '03',
      titulo: 'Construimos',
      texto: 'Con avances visibles. Ves cómo crece, no una caja cerrada.',
    },
    {
      n: '04',
      titulo: 'Probamos',
      texto: 'Lo revisamos como lo usaría un cliente real, hasta que funcione.',
    },
    {
      n: '05',
      titulo: 'Acompañamos',
      texto: 'Lo ponemos en marcha y seguimos a tu lado para hacerlo crecer.',
    },
  ],
  /* La nota es de «Tres formas», no del proceso — habla de las modalidades.
     Se queda acá porque acá la puso el original; moverla es decisión del
     cliente, no de la migración. */
  pend: {
    texto: 'Falta definir precios o un «desde» para cada modalidad',
    nota: 'Definir un rango de inversión o un «desde» para cada una de las tres formas de trabajar',
  },
}

/* Mismo bloque que el cierre del home —un solo pedido, centrado, sobre el
   resplandor— con el copy propio de esta página. Comparten componente. */
export const CIERRE = {
  kicker: 'El siguiente paso',
  titulo: 'Imaginemos tu *tecnología ideal*.',
  bajada:
    'Tomémonos 30 minutos. Salís con una idea clara de cómo se vería tu empresa con sus propios sistemas, sin compromiso.',
  cta: { label: 'Conversemos', href: '/contacto' },
}
