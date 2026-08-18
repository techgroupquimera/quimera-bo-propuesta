/* Copy de /proyectos — textual de proyectos6.html.
   Mismo mini-lenguaje que el resto: *x* énfasis, \n salto de línea. */

export const META = {
  titulo: 'Proyectos · Group Quimera · Prueba real, en línea hoy',
  descripcion:
    'Diez sitios en producción, agentes de IA atendiendo por empresas reales, marcas construidas desde cero y campañas al aire. Todo funcionando, no mockups.',
}

export const HERO = {
  migas: [{ label: 'Inicio', href: '/' }, { label: 'Proyectos' }],
  kicker: 'Prueba real · en línea hoy',
  /* El mismo titular que la sección «No son promesas» del home. Así está en el
     original: la página entera es el desarrollo de esa afirmación. */
  titulo: 'No son *promesas*.\nEstán funcionando.',
  bajada:
    'Estos sistemas están corriendo ahora mismo, con clientes usándolos todos los días. Podemos mostrarte cualquiera en vivo durante la reunión.',
  /* El fondo del hero. Es bg-bokeh-2 y no bg-bokeh, como en el original: son
     páginas distintas y el fondo es lo único que las diferencia de lejos. */
  fondo: { src: '/assets/bg-bokeh-2-lite.webp', opacidad: 0.4 },
  /* Sin barra de índice: las siete secciones ya no viven acá. La entrada tiene
     dos destinos y para dos destinos no hace falta un índice — hace falta que
     se vean, que es lo que hacen las dos tarjetas de <Accesos>. */
}

/* ── Los dos destinos ──
   La página se partió en dos porque las siete secciones eran dos trabajos
   distintos con un mismo título: por un lado lo que CORRE (sitios, agentes,
   sistemas bajo acuerdo), por el otro lo que se PUBLICA (identidades, piezas,
   campañas). Quien entra buscando una de las dos cosas tenía que scrollear la
   otra entera para llegar.

   Los titulares y los textos de estas dos tarjetas son de las únicas cadenas
   nuevas de la división: todo lo demás son las secciones tal cual estaban. Los
   textos se armaron con las bajadas de las propias secciones que anuncian, y
   la última frase de cada una es textual del hero y de la meta de la página
   original («no hay mockups», «podemos mostrarte cualquiera en vivo»).

   La imagen es una pieza real de cada rubro y no un ícono: CAMEBOL —el sitio
   que abre la sección de sitios— y el manual de marca de Shiba Hogar. */
export const ACCESOS = [
  {
    id: 'tecnologia',
    href: '/proyectos/tecnologia',
    kicker: 'Tecnología',
    titulo: 'Lo que está *corriendo*.',
    texto:
      'Doce sitios en producción, agentes de IA atendiendo por empresas reales y los sistemas que corren bajo acuerdo. Podemos mostrarte cualquiera en vivo.',
    imagen: '/assets/proyectos/camebol.webp',
  },
  {
    id: 'marketing',
    href: '/proyectos/marketing',
    kicker: 'Marketing',
    titulo: 'Lo que salió *al aire*.',
    texto:
      'Marcas construidas desde cero con su manual, piezas rodadas y editadas por el equipo, y campañas publicadas. No hay mockups.',
    imagen: '/assets/proyectos/br-shiva.webp',
  },
]

/* ── Los heroes de las dos páginas ──
   Mismo fondo que la entrada a propósito: son la misma página abierta en dos,
   no dos páginas de temas distintos. Lo que cambia es el índice, que ahora sí
   lista sólo lo que hay debajo.

   Las migas suman un tramo: Inicio › Proyectos › el rubro. El tramo del medio
   es enlace, así que se puede volver a la entrada sin el botón del navegador. */
export const HERO_TECNOLOGIA = {
  migas: [
    { label: 'Inicio', href: '/' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Tecnología' },
  ],
  kicker: 'Proyectos · Tecnología',
  titulo: 'Sitios y agentes\n*en producción*.',
  bajada:
    'Están corriendo ahora mismo, con clientes usándolos todos los días. Podemos mostrarte cualquiera en vivo durante la reunión.',
  fondo: { src: '/assets/bg-bokeh-2-lite.webp', opacidad: 0.4 },
  indice: [
    { id: 'sitios', label: 'Sitios' },
    { id: 'agentes', label: 'Agentes de IA' },
    { id: 'destacado', label: 'Caso destacado' },
    { id: 'acuerdo', label: 'Bajo acuerdo' },
  ],
}

export const HERO_MARKETING = {
  migas: [
    { label: 'Inicio', href: '/' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Marketing' },
  ],
  kicker: 'Proyectos · Marketing',
  titulo: 'Marcas, contenido\ny *campañas*.',
  bajada:
    'Identidades con su manual, piezas rodadas por el equipo y campañas que salieron al aire. Todo publicado, no mockups.',
  fondo: { src: '/assets/bg-bokeh-2-lite.webp', opacidad: 0.4 },
  indice: [
    { id: 'marca', label: 'Marca' },
    { id: 'contenido', label: 'Contenido' },
    { id: 'anuncios', label: 'Campañas' },
  ],
}

export const META_TECNOLOGIA = {
  titulo: 'Proyectos · Tecnología · Group Quimera',
  descripcion:
    'Doce sitios en producción y agentes de IA atendiendo por empresas reales. Todo funcionando, no mockups.',
}

export const META_MARKETING = {
  titulo: 'Proyectos · Marketing · Group Quimera',
  descripcion:
    'Marcas construidas desde cero, contenido rodado por el equipo y campañas al aire. Todo publicado, no mockups.',
}

/* Doce sitios en producción, textuales del original — no diez, como decía el
   comentario de proyectos6.html.

   El wireframe muestra cuatro y un botón: se abren de a cuatro en vez de tirar
   los doce de una. `masLabel` y `menosLabel` son las ÚNICAS cadenas nuevas de
   esta sección; todo lo demás es copy original.

   En el original CAMEBOL y Quimera Hosting iban a ancho completo (clase
   `ancha`). Acá la grilla es pareja, como la dibuja el wireframe. */
export const SITIOS = {
  id: 'sitios',
  kicker: 'Sitios en producción',
  titulo: 'Sitios que podés *abrir ahora*.',
  bajada: 'Cada uno está en línea. No hay mockups ni pantallas de ejemplo: entrá y miralos.',
  visibles: 4,
  masLabel: 'Ver los doce sitios',
  menosLabel: 'Ver menos',
  obras: [
    {
      nombre: 'CAMEBOL Santa Cruz',
      url: 'camebolscz.com',
      href: 'https://camebolscz.com/',
      img: '/assets/proyectos/camebol.webp',
      texto:
        'La filial cruceña de la Cámara de Mujeres Empresarias de Bolivia — la misma que invitó a Johnny como speaker del Foro FEM.',
    },
    {
      nombre: 'Victlan',
      url: 'victlan.com',
      href: 'https://victlan.com/',
      img: '/assets/proyectos/victlan.webp',
      texto:
        'Constructora, desarrolladora e inmobiliaria en un mismo proceso vertical. Estética arquitectónica y editorial.',
    },
    {
      nombre: 'Peredo.ai',
      url: 'peredo.ai',
      href: 'https://peredo.ai/',
      img: '/assets/proyectos/peredo.webp',
      texto:
        'Dr. Marcelo Peredo, Global CISO y AI Risk Strategist. Una web que tiene que transmitir autoridad y nada más.',
    },
    {
      nombre: 'Juan Wagner',
      url: 'juanwagner.com',
      href: 'https://www.juanwagner.com/',
      img: '/assets/proyectos/juanwagner.webp',
      texto:
        'Creador de contenido, entrenador en línea y actor, con *más de 3 millones de seguidores*. Planes, alianzas y sponsors en un solo lugar.',
      pend: { texto: 'año por confirmar', nota: 'Confirmar el año' },
    },
    {
      nombre: 'GH Tractor',
      url: 'ghtractor.com',
      href: 'https://ghtractor.com/',
      img: '/assets/proyectos/ghtractor.webp',
      texto:
        'Repuestos alternativos para maquinaria pesada: *más de 13.000 ítems*, catálogo buscable y cotización directa por WhatsApp.',
      pend: { texto: 'año por confirmar', nota: 'Confirmar el año' },
    },
    {
      nombre: 'Grupo Givera',
      url: 'grupogivera.com',
      href: 'https://grupogivera.com/',
      img: '/assets/proyectos/givera.webp',
      texto:
        '*Más de 35 años* en nutrición vegetal y maquinaria agrícola. La web tenía que transmitir respaldo científico sin volverse ilegible.',
    },
    {
      nombre: 'Sapien9',
      url: 'sapien9.com',
      href: 'https://sapien9.com/',
      img: '/assets/proyectos/sapien9.webp',
      texto:
        'Plataforma de ciberseguridad empresarial. Visual premium, narrativa clara y código optimizado para velocidad.',
    },
    {
      nombre: 'Bolecuarg',
      url: 'bolecuarg.com',
      href: 'https://bolecuarg.com/',
      img: '/assets/proyectos/bolecuarg.webp',
      texto:
        'Empresa agrícola fundada *en 1989*. Tono cercano y técnico — «la tierra habla, nosotros escuchamos».',
    },
    {
      nombre: 'Talento y Empleabilidad Hub',
      url: 'talentoyempleabilidadhub.com',
      href: 'https://talentoyempleabilidadhub.com/',
      img: '/assets/proyectos/talento.webp',
      texto:
        'Consultora de gestión de talento humano. Tiene que hablarle a dos públicos a la vez: profesionales y empresas.',
    },
    {
      nombre: 'Natukira',
      url: 'natukira.com',
      href: 'https://natukira.com/',
      img: '/assets/proyectos/natukira.webp',
      texto:
        'Desodorantes naturales para niños y adolescentes. Web cálida y dermo-consciente, dirigida a padres.',
    },
    {
      nombre: 'Shiba · IKA y LTR',
      url: 'ika.com.bo',
      href: 'https://ika.com.bo/',
      img: '/assets/proyectos/shiba.webp',
      texto:
        'Distribuidor de climatización. Dos identidades distintas sobre una misma base técnica, optimizadas para conversión por WhatsApp.',
    },
    {
      nombre: 'Quimera Hosting',
      url: 'quimerahosting.com',
      href: 'https://quimerahosting.com/',
      img: '/assets/proyectos/quimerahosting.webp',
      texto:
        'La casa propia: búsqueda y transferencia de dominios, planes claros y contratación sin fricción. Corre sobre nuestra propia infraestructura.',
    },
  ],
}

/* Los siete manuales de marca, en la misma grilla que «Sitios en producción».

   Nota del original, que sigue en pie: los siete vienen como el mismo mockup
   sobre fondo blanco, así que en tarjetas se parecen mucho entre sí — por eso
   allá iban en tira. Acá van en grilla por pedido del cliente; lo que los
   distingue es la tapa de cada uno.

   Se abren en el visor porque a este tamaño un manual no se puede leer. Van con
   su ancho nativo (900px) para que el visor no los tope en los 560 que usan las
   capturas de teléfono. */
export const MARCA = {
  id: 'marca',
  kicker: 'Identidad',
  titulo: 'Marcas construidas\n*desde cero*.',
  bajada:
    'Cada una con su manual: logotipo, paleta, tipografías y usos. Tocá una tapa para verla grande.',
  visibles: 4,
  masLabel: 'Ver los siete manuales',
  menosLabel: 'Ver menos',
  ancho: 900,
  manuales: [
    { nombre: 'Dudu Service', img: '/assets/proyectos/br-dudu.webp' },
    { nombre: 'Welding Solutions', img: '/assets/proyectos/br-welding.webp' },
    { nombre: 'Seremar', img: '/assets/proyectos/br-seremar.webp' },
    { nombre: 'Fisio & Spa', img: '/assets/proyectos/br-fisiospa.webp' },
    /* el archivo se llama br-shiva pero la marca es Shiba Hogar */
    { nombre: 'Shiba Hogar', img: '/assets/proyectos/br-shiva.webp' },
    { nombre: 'Tecnotel', img: '/assets/proyectos/br-tecnotel.webp' },
    { nombre: 'Tu Estilo Favorito', img: '/assets/proyectos/br-tuestilofavorito.webp' },
  ],
}

/* Las seis piezas de contenido. Cada una es un reel vertical: en la sección va
   sólo el póster y el play, y el video se reproduce en el visor 9:16.

   El wireframe muestra tres y la tercera cortada al borde — es una tira que se
   desplaza, no una grilla de tres. Las seis entran en la tira. */
export const CONTENIDO = {
  id: 'contenido',
  kicker: 'Producción audiovisual',
  titulo: 'Y el contenido que\nlas *pone a andar*.',
  bajada: 'Piezas para redes, rodadas y editadas por el equipo. Tocá para reproducir con sonido.',
  piezas: [
    {
      nombre: 'Tu Estilo Favorito',
      poster: '/assets/proyectos/ct-tuestilo.webp',
      video: '/assets/proyectos/ct-tuestilo.mp4',
    },
    {
      nombre: 'Shiba Hogar',
      poster: '/assets/proyectos/ct-shibacont.webp',
      video: '/assets/proyectos/ct-shibacont.mp4',
    },
    {
      nombre: 'Servicentro',
      poster: '/assets/proyectos/ct-servicentro.webp',
      video: '/assets/proyectos/ct-servicentro.mp4',
    },
    {
      nombre: 'Metal Forte',
      poster: '/assets/proyectos/ct-metalforte.webp',
      video: '/assets/proyectos/ct-metalforte.mp4',
    },
    {
      nombre: 'Rekids',
      poster: '/assets/proyectos/ct-rekids.webp',
      video: '/assets/proyectos/ct-rekids.mp4',
    },
    {
      nombre: 'Patio Belén',
      poster: '/assets/proyectos/ct-patiobelen.webp',
      video: '/assets/proyectos/ct-patiobelen.mp4',
    },
  ],
}

/* El caso destacado. Los cuatro puntos van numerados del 1 al 4 según el
   wireframe: en el original eran una lista de tildes.

   Ojo con el titular: en el original va más chico que un t-sec normal
   (clamp(1.9rem,3.4vw,3rem)) y tiene sentido — es el nombre de un cliente, no
   una afirmación de la empresa. Se respeta.

   Los cuatro puntos salen de la propia conversación del mockup y de la ficha
   del proyecto. Antes acá había tres cifras en «—» esperando el dato del
   cliente: tres guiones vacíos en mitad de la página. El pendiente sigue
   marcado, pero ya no deja huecos a la vista. */
export const DESTACADO = {
  id: 'destacado',
  kicker: 'Caso destacado',
  titulo: 'Bolivia Fitness',
  bajada:
    'Un agente de atención y venta que muestra el catálogo completo, responde las dudas de siempre, registra el pedido y lo sincroniza con el sistema del cliente. Funciona de noche, los domingos y en feriados.',
  /* El mockup completo (apaisado, sobre blanco) y no el recorte `-cut`: es el
     bloque que dibuja el wireframe. Ojo: las dos imágenes muestran la MISMA
     conversación, así que el botón ya no revela nada nuevo — sigue sirviendo
     para verla en grande, que a este tamaño hace falta. */
  foto: {
    src: '/assets/proyectos/boliviafitness.webp',
    alt: 'Conversación real del agente de Bolivia Fitness en WhatsApp: saluda, ofrece el catálogo y lista las sucursales',
  },
  completa: '/assets/proyectos/boliviafitness.webp',
  verLabel: 'Ver la conversación completa',
  pend: {
    texto: 'Faltan los tres números del cliente',
    nota: 'Consultas atendidas por mes, pedidos cerrados sin intervención humana y horas liberadas al equipo. Es el dato que más convierte de toda la web.',
  },
  puntos: [
    'Atiende consultas de **cinco ciudades** — Santa Cruz, La Paz, Cochabamba, Oruro y Sucre.',
    'Muestra el catálogo por categoría y pregunta cuál interesa antes de cerrar.',
    'Registra el pedido para pago, con opción de recojo o envío.',
    'Todo queda en base de datos y el equipo entra a la conversación cuando quiere.',
  ],
}

/* Los seis agentes que ya están operando. Salen de projects.ts del sitio en
   producción — no son inventados.

   La ficha es sólo nombre y qué hace: ni captura ni la línea de conversación.
   `completa` es la captura que abre el visor al tocarla.

   Salieron dos cosas que el original sí mostraba y que conviene tener anotadas
   por si se quieren de vuelta — las dos siguen en proyectos6.html:
   · el recorte `-cut.webp` de cada pantalla (los archivos siguen en
     public/assets/proyectos);
   · la cita textual de cada conversación. El original la había subido a la
     ficha justamente porque «lo que está detrás de un clic no lo ve nadie»;
     ahora la prueba vuelve a estar detrás del botón. */
export const AGENTES = {
  id: 'agentes',
  kicker: 'Automatización con IA',
  titulo: 'Agentes *atendiendo*\npor empresas reales.',
  /* Dos frases retocadas respecto del original, y sólo porque el diseño cambió:
     decía «su conversación real, AL LADO» y «tocá UNA PANTALLA y se abre
     entera», que describían la captura junto al texto. Sin captura en la ficha
     esas dos frases apuntaban a algo que ya no está. Lo demás es textual. */
  bajada:
    'No son demos: cada uno tiene su conversación real, tal como ocurrió. Atienden, califican y dejan el registro donde el equipo del cliente lo revisa e interviene cuando hace falta. Tocá cualquiera y se abre la conversación entera.',
  verLabel: 'Ver la conversación completa',
  lista: [
    {
      nombre: 'Bolivia Fitness',
      completa: '/assets/proyectos/boliviafitness.webp',
      texto:
        'Muestra el catálogo, responde las dudas de siempre y registra el pedido con recojo o envío. Todo queda en base de datos y el equipo interviene desde un panel.',
    },
    {
      nombre: 'Academia Diamond Art',
      completa: '/assets/proyectos/diamondart.webp',
      texto:
        'Inscripciones para una academia de danza infantil: da la bienvenida, muestra las sucursales con ubicación en Maps y los horarios de cada disciplina, y deja todo anotado para seguir las clases de prueba.',
    },
    {
      nombre: 'Meta Miami Investment Forum',
      completa: '/assets/proyectos/metamiami.webp',
      texto:
        'Agente de venta para una firma inmobiliaria: conversa, califica y asigna al asesor que sigue la cita. El equipo lo opera desde GoHighLevel con cada interacción registrada.',
    },
    {
      nombre: 'Xiaomi',
      completa: '/assets/proyectos/xiaomi.webp',
      texto:
        'Chatbot de registro para la promoción del Día de la Madre: inscribe al participante, valida los datos y deja todo auditable para el equipo de la marca.',
    },
    {
      nombre: 'Quimera AI',
      completa: '/assets/proyectos/quimeraai.webp',
      texto:
        'El agente de la propia casa: atiende la consulta inicial, califica el lead, muestra los servicios y conecta con el equipo según la necesidad concreta.',
    },
    {
      nombre: 'Shiba Hogar',
      completa: '/assets/proyectos/shibahogar.webp',
      /* el único que todavía no está en producción — el original lo marca con
         el punto en ámbar y la etiqueta al lado */
      enDesarrollo: true,
      texto:
        'Vende y asesora en aires acondicionados: cierra la venta, avisa al encargado cuando entra un depósito y envía la ubicación para cotizar.',
    },
  ],
}

/* El muro de campañas. Son las mismas veintiséis del original: en el directorio
   hay treinta y un archivos, pero a02, a18, a19, a26 y a29 quedaron afuera de
   la selección allá y siguen afuera acá.

   Vienen en tres proporciones: 4:5 (diecisiete), cuadradas (cinco) y banners de
   ~2.7:1 (cuatro). El original las puso en tira justamente porque una grilla
   quieta sólo aceptaba las 4:5 y dejaba catorce afuera; el wireframe pide la
   grilla de doce, así que las doce visibles son exactamente doce 4:5 —en reposo
   no se recorta ni se enmarca nada— y las otras catorce salen con el botón,
   igual que en «Sitios» y «Marca».

   `ancha` es lo único que decide el armado: los banners ocupan dos columnas y
   van al final de la lista, para no partir la grilla por el medio.

   Las piezas son todas de 520px de ancho nativo: de ahí sale el `ancho` del
   visor. Si el cliente manda los originales en alta, ese número sube. */
const anuncio = (n, alto) => ({
  src: `/assets/proyectos/anuncios/${n}.webp`,
  alto,
  /* el corte es holgado a propósito: las 4:5 y las cuadradas van de 520 a 650,
     los banners no pasan de 200 */
  ancha: alto < 300,
})

export const CAMPANAS = {
  /* el id sigue siendo el del original porque la barra de índice del hero
     apunta ahí */
  id: 'anuncios',
  kicker: 'Campañas',
  titulo: 'Campañas que\n*salieron al aire*.',
  /* El original cerraba con «Pasá el mouse para frenar la tira y tocá cualquiera
     para verla completa». La tira ya no existe, así que la primera mitad de esa
     instrucción describía algo que no está. Se cae; el resto es textual. */
  bajada:
    'Una selección de piezas, para marcas de rubros muy distintos. Hay muchas más. Tocá cualquiera para verla completa.',
  visibles: 12,
  masLabel: 'Ver las 26 piezas',
  menosLabel: 'Ver menos',
  ancho: 520,
  piezas: [
    /* las doce del primer carril del original — todas 4:5, y en ese orden */
    anuncio('a01', 650),
    anuncio('a03', 650),
    anuncio('a05', 650),
    anuncio('a06', 650),
    anuncio('a08', 650),
    anuncio('a14', 650),
    anuncio('a20', 650),
    anuncio('a21', 650),
    anuncio('a23', 650),
    anuncio('a24', 650),
    anuncio('a30', 650),
    anuncio('a31', 650),
    /* el segundo carril, reagrupado por forma: primero las 4:5 que faltaban */
    anuncio('a25', 650),
    anuncio('a11', 634),
    anuncio('a09', 650),
    anuncio('a10', 650),
    anuncio('a07', 648),
    /* las cuadradas */
    anuncio('a16', 520),
    anuncio('a12', 520),
    anuncio('a13', 520),
    anuncio('a17', 520),
    anuncio('a15', 520),
    /* y los banners al final: son los que ocupan dos columnas */
    anuncio('a04', 200),
    anuncio('a22', 194),
    anuncio('a27', 186),
    anuncio('a28', 186),
  ],
}

/* Los seis sistemas que no se pueden nombrar. Textual del original, incluido el
   pendiente: los seis salen del PDF de capacidades y hay que confirmar cuáles
   son de verdad confidenciales.

   El original los ponía a dos columnas de tres. El wireframe los apila en una
   sola tira de seis a la derecha del encabezado, que además es lo que hace que
   se lean como una lista de sistemas y no como una grilla de tarjetas más —
   ésta es la única sección de la página sin una sola imagen. */
export const ACUERDO = {
  id: 'acuerdo',
  kicker: 'Bajo acuerdo',
  /* sin salto forzado: la columna es angosta y el titular parte solo */
  titulo: 'Y otros que *no podemos nombrar*.',
  bajada:
    'Son sistemas que corren dentro de empresas que prefieren no figurar. Los podemos mostrar funcionando en la reunión, sin decir de quién son.',
  cta: { label: 'Quiero verlos en vivo', href: '/contacto' },
  pend: {
    texto: 'Confirmar cuáles son de verdad confidenciales',
    nota: 'Estos seis salen del PDF de capacidades. Hay que confirmar cuáles son realmente confidenciales y cuáles sí se pueden nombrar — si alguno se puede nombrar, sube arriba con los demás.',
  },
  sistemas: [
    {
      nombre: 'Catálogo digital de servicios',
      texto: 'Vende y toma pedidos solo · *el dueño deja de contestar todo*',
    },
    {
      nombre: 'CRM de ventas propio',
      texto: 'Pipeline y métricas en vivo · *el equipo sabe qué cerrar hoy*',
    },
    {
      nombre: 'Central de operaciones',
      texto: 'Multi-marca, equipo y clientes · *toda la agencia en un tablero*',
    },
    {
      nombre: 'Portal de datos en vivo',
      texto: 'Información en tiempo real · *alto tráfico, siempre al aire*',
    },
    {
      nombre: 'Plataforma con cobros',
      texto: 'Pagos y facturación automáticos · *factura sola, sin intervención*',
    },
    {
      nombre: 'Sistema de visión con cámaras',
      texto: 'Evidencia verificable · *seguridad con prueba forense*',
    },
  ],
}

/* El mismo bloque que cierra el home, /servicios y /tecnología —un solo pedido,
   centrado, sobre el resplandor que se funde con la sección de arriba— con el
   copy propio de esta página. Comparten componente: `ui/Cierre.jsx`.

   Lo único que cambia respecto del original es lo mismo que en las otras tres:
   la itálica serif del énfasis pasa a Manrope Semibold en lima, y la separación
   dura con la sección de arriba la reemplaza el degradado. */
export const CIERRE = {
  kicker: 'El siguiente paso',
  titulo: 'El próximo caso\n*puede ser el tuyo*.',
  bajada:
    'Tomémonos 30 minutos y te mostramos, en vivo, cómo se vería tu empresa con sus propios sistemas.',
  cta: { label: 'Conversemos', href: '/contacto' },
}
