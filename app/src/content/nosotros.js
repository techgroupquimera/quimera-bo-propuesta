/* Copy de /nosotros — textual de nosotros.html.
   Mismo mini-lenguaje que el resto: *x* énfasis, \n salto de línea. */

export const META = {
  titulo: 'Nosotros · Group Quimera · Un grupo tecnológico, no un proveedor suelto',
  descripcion:
    'Group Quimera reúne unidades y aliados especializados: Quimera Cloud, Quimera Hosting, Tech Agents LLC en Miami y la alianza Sapien9 en Silicon Valley. Santa Cruz, Bolivia.',
}

export const HERO = {
  migas: [{ label: 'Inicio', href: '/' }, { label: 'Nosotros' }],
  kicker: 'Quiénes somos',
  titulo: 'Un grupo tecnológico,\n*no un proveedor suelto*.',
  bajada:
    'Group Quimera reúne unidades propias y aliados especializados para que tu empresa tenga todo bajo un mismo respaldo: la estrategia, el software, la infraestructura y la seguridad.',
  /* El fondo del hero. En el original cada página trae el suyo y es lo único
     que las diferencia de lejos: acá va la foto de la audiencia, la que usa
     nosotros.html.

     La opacidad baja de .34 a .22 y no es capricho: el hero de acá ocupa el
     alto de la pantalla y el de nosotros.html no, así que la misma foto tiene
     el triple de superficie. A .34 la cara del primer plano se lee como sujeto
     —mira hacia el titular y le gana— en vez de como textura, que es lo que son
     los fondos de las otras tres páginas. El .22 es el valor que el original
     usa para su otro hero fotográfico, el de tecnologia.html. */
  /* La versión liviana (49 KB contra 149): va al 22% de opacidad y debajo de
     tres degradados. Sale de audiencia-hd.webp con `npm run imagenes`. */
  fondo: { src: '/assets/audiencia-fondo.webp', opacidad: 0.22 },
  /* Este índice NO está en el original: la barra viene del hero de /proyectos,
     que es el diseño que se pidió repetir acá. Se gana el lugar igual — son
     seis secciones y con ella se entra por donde a uno le interesa. Si el
     cliente la quiere afuera, es borrar `indice` y el <nav> del componente.
     El `id` es el de la sección de destino. */
  indice: [
    { id: 'unidades', label: 'Las unidades' },
    { id: 'presencia', label: 'Presencia' },
    { id: 'trayectoria', label: 'Trayectoria' },
    { id: 'johnny', label: 'Quien lidera' },
    { id: 'autoridad', label: 'Autoridad' },
    { id: 'compromiso', label: 'Compromiso' },
  ],
}

/* Las cinco unidades, textuales del original.

   El wireframe dibuja cuatro paneles pegados, pero el titular dice «Cinco
   marcas» y en el original son cinco: van los cinco.

   En reposo cada panel muestra sólo el logo —es lo que identifica a la unidad,
   como decía el comentario del original: «con las marcas reales, cada unidad se
   reconoce sola»— y al pasar el mouse aparecen la etiqueta, el nombre, la
   descripción y el enlace.

   `logo.ancho` y `logo.alto` son las medidas NATIVAS del archivo, no las de
   pantalla: con ellas `factorOptico` calcula el alto de cada uno para que las
   cinco manchas pesen igual. Van de 0.99:1 (Sapien9) a 10.1:1 (Tech Agents), y
   a alto uniforme el lockup de Tech Agents ocuparía cinco veces el área de
   Sapien9. */
export const UNIDADES = {
  id: 'unidades',
  kicker: 'Las unidades',
  titulo: 'Cinco marcas, *un solo respaldo*.',
  /* En el original este marcador va INLINE, sobre «100 marcas atendidas» en la
     ficha de Group Quimera. Acá vive al pie de la fila, por dos razones: en un
     panel cuadrado esas dos líneas de más eran justo lo que hacía que la
     descripción no entrara, y un marcador clickeable adentro de un panel que
     entero es un enlace es HTML inválido. La cifra queda intacta en el texto y
     la etiqueta dice de qué unidad habla. */
  pend: {
    texto: 'Confirmar la cifra de Group Quimera',
    nota: 'El PDF de capacidades dice 100+; el sitio actual dice +50 empresas y +30 marcas. Hay que unificar la cifra.',
  },
  lista: [
    {
      nombre: 'Group Quimera',
      tag: 'La casa matriz',
      logo: { src: '/assets/unidades/quimera-group.webp', ancho: 175, alto: 150 },
      texto:
        'Estrategia, tecnología y la consultoría que define qué conviene construir antes de invertir un peso. Más de 100 marcas atendidas.',
      url: 'groupquimera.com',
      href: 'https://groupquimera.com',
    },
    {
      nombre: 'Quimera Cloud',
      tag: 'Plataformas & software',
      logo: { src: '/assets/unidades/quimera-cloud.webp', ancho: 590, alto: 120 },
      texto: 'Construcción de sistemas y plataformas a la medida de cada empresa.',
      url: 'quimeracloud.com',
      href: 'https://quimeracloud.com',
    },
    {
      nombre: 'Quimera Hosting',
      tag: 'Infraestructura',
      logo: { src: '/assets/unidades/quimera-hosting.webp', ancho: 315, alto: 120 },
      texto: 'Servidores y presencia web propia, funcionando las 24 horas.',
      url: 'quimerahosting.com',
      href: 'https://quimerahosting.com',
    },
    {
      nombre: 'Tech Agents LLC',
      tag: 'Operación EE.UU. · Miami',
      logo: { src: '/assets/unidades/techagents.webp', ancho: 647, alto: 64 },
      texto:
        'Agentes de IA hechos a medida para equipos y operaciones. Nuestra empresa en Estados Unidos, para trabajar con estándar internacional.',
      url: 'techagents.dev',
      href: 'https://techagents.dev',
    },
    {
      nombre: 'Alianza Sapien9',
      tag: 'Ciberseguridad · Silicon Valley',
      logo: { src: '/assets/unidades/sapien9.webp', ancho: 148, alto: 150 },
      texto: 'Protección de nivel enterprise para toda tu operación.',
      url: 'sapien9.com',
      href: 'https://sapien9.com',
    },
  ],
}

/* Las cuatro plazas. Textuales del original, incluidos los contornos de
   OpenStreetMap (en `contornos.js`) y su atribución, que es obligatoria.

   El orden es el del original —Santa Cruz primero porque es la casa— y acá
   además decide dónde arranca la rotación: la sección abre en Santa Cruz. */
export const PRESENCIA = {
  id: 'presencia',
  kicker: 'Presencia',
  titulo: 'Una red que *respalda*\ncada proyecto.',
  bajada: 'Un equipo binacional con aliados de primer nivel en cuatro plazas clave.',
  atribucion: {
    antes: 'Contornos: © ',
    enlace: 'OpenStreetMap',
    href: 'https://www.openstreetmap.org/copyright',
    despues: ' contributors · ODbL',
  },
  plazas: [
    {
      nombre: 'Santa Cruz',
      pais: 'Bolivia',
      contorno: 'santaCruz',
      tag: 'Ingeniería',
      texto: 'El corazón que diseña, construye y sostiene tu tecnología.',
    },
    {
      nombre: 'Miami',
      pais: 'Estados Unidos',
      contorno: 'miami',
      tag: 'Tech Agents LLC',
      texto: 'Nuestra empresa en EE.UU. para operar con estándar internacional.',
    },
    {
      nombre: 'Silicon Valley',
      pais: 'Estados Unidos',
      contorno: 'siliconValley',
      tag: 'Ciberseguridad',
      texto: 'Alianza con Sapien9 para proteger toda tu operación.',
    },
    {
      nombre: 'Lima',
      pais: 'Perú',
      contorno: 'lima',
      tag: 'Hub técnico',
      texto: 'Equipo y capacidad de desarrollo que suma al de Santa Cruz.',
    },
  ],
}

/* Las cuatro cifras, textuales del original. Van en Bebas como el resto de las
   cifras del sitio. */
export const TRAYECTORIA = {
  id: 'trayectoria',
  kicker: 'Trayectoria',
  titulo: 'Experiencia que *respalda*.',
  cifras: [
    { valor: '+100', etiqueta: 'Marcas atendidas en LATAM, EE.UU. y Europa' },
    { valor: '+30', etiqueta: 'Sistemas y plataformas construidos a medida' },
    { valor: '4', etiqueta: 'Plazas: Santa Cruz, Miami, Silicon Valley y Lima' },
    { valor: '24/7', etiqueta: 'Infraestructura propia, siempre en línea' },
  ],
}

/* El bloque de Johnny. El original lo dice con todas las letras: «mismo bloque
   que el inicio». Comparten componente (`ui/Bio.jsx`) y las mismas tres fotos;
   lo que cambia es el copy y que acá se suman las credenciales al pie.

   El kicker es «Quien lidera» y no «Quien responde» como en el home, y la
   bajada trae una frase de más —«no con un ejecutivo de cuentas que repite lo
   que le pasaron»— que allá está recortada. Los dos son textuales de su página.

   Los CTA también cambian: en el home el segundo lleva a /nosotros, que es
   justamente donde estamos, así que acá es el de contacto. */
export const BIO = {
  id: 'johnny',
  apellido: 'Ferrante',
  kicker: 'Quien lidera',
  nombre: 'Johnny Ferrante',
  bajada:
    'Founder & CEO. Es quien da la charla, quien toma el diagnóstico y quien firma lo que se construye. Si trabajás con nosotros, hablás con él — no con un ejecutivo de cuentas que repite lo que le pasaron.',
  ctas: [
    { label: 'Ver la disertación · 42 s', accion: 'video' },
    { label: 'Hablar con Johnny', href: '/contacto', variante: 'primario' },
  ],
  fotos: [
    {
      src: '/assets/op-2358.webp',
      alt: 'Johnny Ferrante en el estudio de Group Quimera, Santa Cruz',
    },
    { src: '/assets/op-2367.webp', alt: 'Johnny Ferrante en el estudio de Group Quimera' },
    { src: '/assets/op-2369.webp', alt: 'Johnny Ferrante en el estudio de Group Quimera' },
  ],
  /* Las cuatro credenciales, textuales del original. El marcador de dato
     pendiente va en la de EIAN —que es donde el original lo pone— y de paso es
     la más corta: sin él, su tarjeta quedaba casi vacía al lado de las otras
     tres. */
  credenciales: [
    {
      texto:
        'Speaker del **Foro FEM Económico Mujer 2026** de CAMEBOL, la Cámara de Mujeres Empresarias de Bolivia, con la disertación «IA & Finanzas Inteligentes para la Nueva Economía».',
    },
    {
      texto:
        'Reconocido por CAMEBOL **por su compromiso con el liderazgo femenino**, Santa Cruz, julio 2026.',
    },
    {
      texto: 'Miembro de EIAN.',
      pend: {
        texto: 'Falta confirmar el nombre completo y el rol',
        nota: 'Confirmar el nombre completo de EIAN y el rol exacto de Johnny antes de publicar.',
      },
    },
    {
      texto:
        'Cinco años dirigiendo proyectos de marketing y tecnología para marcas bolivianas y de la región.',
    },
  ],
}

/* La placa de CAMEBOL. Mismo componente que el home (`ui/Autoridad.jsx`) con el
   copy de esta página, que es más corto y no trae las dos fichas de datos. */
export const AUTORIDAD = {
  foto: {
    src: '/assets/placa-hd.webp',
    alt: 'Placa de reconocimiento de CAMEBOL a Johnny Ferrante, Foro FEM Económico Mujer 2026',
  },
  kicker: 'Autoridad verificable',
  cita:
    '«Agradecemos por su participación como Speaker a _Lic. Johnny Ferrante_. Por su compromiso con el liderazgo femenino.»',
  bajada:
    'No es una autodescripción: es una placa entregada por una cámara empresarial frente a su propia sala. Cuando alguien nos escucha hablar de inteligencia artificial, esta web es donde la conversación sigue.',
}

export const COMPROMISO = {
  id: 'compromiso',
  kicker: 'Nuestro compromiso',
  titulo: 'Tecnología con la que\n*dormís tranquilo*.',
  bajada:
    'Construir es fácil; sostener es lo difícil. Nos hacemos cargo de que tu sistema siga funcionando, seguro y creciendo con vos.',
  puntos: [
    'Seguridad revisada por expertos antes de cada publicación.',
    'Tu información aislada y protegida, nunca mezclada con la de otros.',
    'Respaldos automáticos: ante cualquier problema, volvemos atrás en minutos.',
    'El sistema y los accesos son tuyos. Sin quedar atado a nadie.',
  ],
}

/* La tira de marcas cierra también esta página, pero con otra frase que en el
   home y /proyectos. Es textual del original. */
export const MARCAS_TITULO = 'Algunas de las marcas con las que trabajamos'

/* Mismo cierre que las demás páginas. El copy es idéntico al de /servicios —así
   está en los dos originales— pero cada página trae el suyo: si mañana cambia
   uno, no arrastra al otro. */
export const CIERRE = {
  kicker: 'El siguiente paso',
  titulo: 'Imaginemos tu *tecnología ideal*.',
  bajada:
    'Tomémonos 30 minutos. Salís con una idea clara de cómo se vería tu empresa con sus propios sistemas, sin compromiso.',
  cta: { label: 'Conversemos', href: '/contacto' },
}
