/* Todo el copy del home (variante B) — textual del HTML original.
   Sintaxis de énfasis, resuelta por <Rich>:
     \n     salto de línea
     *x*    énfasis: Manrope Semibold en lima
     _x_    lima plano
     **x**  negrita
   El diseño no vive acá: si cambia el layout, este archivo no se toca.
   Las etiquetas de botón tampoco llevan «→»: la flecha la pone <Button>. */

/* Todo el hero: columna de texto a la izquierda, panel de video a la derecha.
   La bajada va pegada al CTA, no al titular: el aire queda arriba de ella.
   Las cifras van adentro del panel, chicas. Estaban en una banda propia entre
   el hero y la marquesina de marcas, y ahí competían con los logos: son dos
   pruebas seguidas peleando por la misma atención. */
export const HERO = {
  badge: {
    icono: '/assets/marcas/camebol-icono.webp',
    iconoAlt: 'CAMEBOL',
    destacado: 'Speaker',
    texto: 'Foro FEM Económico Mujer 2026',
  },
  /* espacio duro adentro del énfasis: sin él el salto cae entre «a» y
     «trabajar» y la «a» queda colgando sola al final de la primera línea */
  titulo: 'Ponemos la IA *a\u00A0trabajar* dentro de tu empresa.',
  bajada:
    'Agentes que atienden y venden a toda hora. Procesos que dejan de hacerse a mano. La foto real del negocio en una sola pantalla. No cursos ni teoría: sistemas que quedan funcionando.',
  cta: { label: 'Pedir diagnóstico', href: '/contacto' },
  /* pie del panel de video: el ▶ lo pone el círculo, no el texto */
  ctaVideo: { label: 'Ver la disertación · 42 s' },
  nota: 'Santa Cruz · Miami · Silicon Valley · Lima',
  /* El poster sale de escenario-hd.webp con `npm run imagenes`, a 720 px: es lo
     primero que se ve del panel y —medido— el elemento que decide el LCP. */
  media: {
    video: '/assets/hero-loop.mp4',
    poster: '/assets/hero-poster.webp',
  },
  cifras: [
    { valor: '+100', etiqueta: 'Marcas atendidas' },
    { valor: '+30', etiqueta: 'Sistemas a medida' },
    { valor: '4', etiqueta: 'Plazas' },
    { valor: '24/7', etiqueta: 'Infraestructura propia' },
  ],
}

export const PROBLEMA = {
  id: 'problema',
  kicker: 'Quizás te suena',
  titulo: 'Diez herramientas, diez facturas,\ny nada *se habla entre sí*.',
  bajada:
    'La mayoría de las empresas viven pegando parches: una app para esto, otra para aquello, planillas sueltas. Pagás todos los meses y seguís dependiendo de otros.',
  dolores: [
    {
      dolor: 'Tu equipo copia datos de una planilla a otra todo el día.',
      arreglo: 'Eso lo hace un flujo, no una persona.',
    },
    {
      dolor: 'Entran consultas por WhatsApp a las 11 de la noche y se contestan al otro día.',
      arreglo: 'Eso lo atiende un agente, al instante.',
    },
    {
      dolor: 'Decidís con los números de la semana pasada, armados a mano.',
      arreglo: 'Eso lo resuelve un tablero que se actualiza solo.',
    },
    {
      dolor: 'Pagás mensualidades que suben y tus datos viven en servidores ajenos.',
      arreglo: 'Eso se termina cuando el sistema es tuyo.',
    },
  ],
  cta: { label: 'Cómo lo resolvemos', href: '/servicios' },
}

export const AUTORIDAD = {
  foto: {
    src: '/assets/placa-hd.webp',
    alt: 'Placa de CAMEBOL a Johnny Ferrante como speaker del Foro FEM Económico Mujer 2026',
  },
  kicker: 'Autoridad verificable',
  cita:
    '«Agradecemos por su participación como Speaker a _Lic. Johnny Ferrante_. Por su compromiso con el liderazgo femenino.»',
  bajada:
    'En julio de 2026 la Cámara de Mujeres Empresarias de Bolivia invitó a nuestro CEO a explicar, frente a la sala, cómo la inteligencia artificial transforma empresas. Esta web es la continuación de esa charla.',
  datos: [
    { valor: 'Foro FEM 2026', etiqueta: 'CAMEBOL · Santa Cruz' },
    { valor: 'IA & Finanzas', etiqueta: 'Tema de la disertación' },
  ],
}

export const SISTEMAS = {
  id: 'sistemas',
  kicker: 'Nuestra propuesta',
  titulo: 'Dejá de *alquilar* tu tecnología.\nQue sea tuya.',
  bajada:
    'Un solo sistema, integrado, hecho a la medida de cómo trabaja tu empresa. Tu sistema, tus datos, tu infraestructura.',
  piezas: [
    {
      icono: 'personas',
      titulo: 'Tu CRM',
      texto: 'Tus clientes y tu proceso de ventas ordenados, sin pagar por usuario.',
      destacada: true,
    },
    {
      icono: 'documento',
      titulo: 'Tu ERP',
      texto: 'Finanzas, inventario, equipo y facturación en un solo lugar.',
    },
    {
      icono: 'chat',
      titulo: 'Agentes que atienden',
      texto: 'Responden en WhatsApp y en tu web a toda hora, con tu información.',
    },
    {
      icono: 'grafico',
      titulo: 'Datos que deciden',
      texto: 'La foto completa del negocio en una pantalla, actualizada sola.',
    },
  ],
  ctas: [
    { label: 'Ver todos los servicios', href: '/servicios' },
    { label: 'Ver el stack técnico', href: '/tecnologia' },
  ],
}

/* Par dolor→solución armado con dos reels que ya existen: el dolor sale de
   «100 mensajes» y la solución de «ia - kristel». Los cuatro verbos son
   textuales de ella: "responde, califica al cliente, le da información y
   agenda todo en segundos". */
export const AGENTE = {
  id: 'agente',
  kicker: 'El caso más común',
  /* el corte va después de «al día» y no en el punto: cortando en el punto la
     segunda línea era «Es caos.» sola, un muñón contra una primera línea que
     ocupaba todo el ancho */
  titulo: 'Cien mensajes al día\nno es crecimiento. Es *caos*.',
  bajada:
    'Respondés tarde. No queda anotado en ningún lado. Nadie sabe cuántos entran por día. El problema no es que te escriban mucho: es que no hay una estructura que lo sostenga.',
  listaTitulo: 'Lo que hace un agente bien configurado, solo',
  lista: [
    '**Responde** al instante, a cualquier hora, en WhatsApp, Instagram y Facebook.',
    '**Califica** — separa al que va a comprar del que solo pregunta.',
    '**Informa** con los datos reales de tu negocio, no con respuestas genéricas.',
    '**Agenda** la reunión y la deja puesta, sin que nadie intervenga.',
  ],
  cita: {
    texto: '«Mientras dormís, el sistema trabaja y responde por vos.»',
    firma: 'Dicho en cámara · reel de campaña',
  },
  reel: {
    video: '/assets/reel-agente.mp4',
    poster: '/assets/reel-agente.webp',
    autor: 'Kristel ',
    autorPend: {
      texto: '· apellido y rol por confirmar',
      nota: 'Falta el apellido y el rol',
    },
    duracion: '35 s · con sonido',
  },
}

export const PRUEBA = {
  kicker: 'Prueba real · en línea hoy',
  titulo: 'No son *promesas*.\nEstán funcionando.',
  bajada:
    'Estos sistemas están corriendo ahora mismo, con clientes usándolos todos los días. Podemos mostrarte cualquiera en vivo durante la reunión.',
  cta: { label: 'Ver los proyectos', href: '/proyectos' },
  /* Sin foto a propósito: el panel de revisión pide para esta sección
     «capturas de los seis sistemas en línea», que siguen pendientes, y esos
     seis son justamente los que están bajo acuerdo de confidencialidad —por eso
     se describen sin nombre—. Cualquier otra imagen acá sería relleno, así que
     el bloque va en el verde de la marca hasta que existan las capturas. */
  sistemas: [
    { nombre: 'Catálogo digital de servicios', detalle: 'El dueño deja de contestar todo' },
    { nombre: 'CRM de ventas propio', detalle: 'El equipo sabe qué cerrar hoy' },
    { nombre: 'Central de operaciones', detalle: 'Toda la agencia en un tablero' },
    { nombre: 'Portal de datos en vivo', detalle: 'Alto tráfico, siempre al aire' },
    { nombre: 'Plataforma con cobros', detalle: 'Factura sola, sin intervención' },
    { nombre: 'Sistema de visión con cámaras', detalle: 'Seguridad con prueba forense' },
  ],
}

export const BIO = {
  id: 'johnny',
  apellido: 'Ferrante',
  kicker: 'Quien responde',
  nombre: 'Johnny Ferrante',
  bajada:
    'Founder & CEO. Es quien da la charla, quien toma el diagnóstico y quien firma lo que se construye. Si trabajás con nosotros, hablás con él.',
  ctas: [
    { label: 'La disertación', accion: 'video' },
    { label: 'Conocer el grupo', href: '/nosotros' },
  ],
  /* Tríptico: tres tomas de la misma sesión, sin recortar, escalonadas. */
  fotos: [
    {
      src: '/assets/op-2358.webp',
      alt: 'Johnny Ferrante en el estudio de Group Quimera, Santa Cruz',
    },
    { src: '/assets/op-2367.webp', alt: 'Johnny Ferrante en el estudio de Group Quimera' },
    { src: '/assets/op-2369.webp', alt: 'Johnny Ferrante en el estudio de Group Quimera' },
  ],
}

/* El escalón que faltaba en el embudo. El sitio live solo ofrecía "agendá una
   llamada" — el paso 5 a quien está en el paso 1. Johnny ya lo ofrece en cámara
   («vamos a tu empresa, te auditamos y te hacemos una propuesta a medida»), y el
   "cara a cara" es el diferenciador que ninguna página dice hoy. */
export const AUDITORIA = {
  id: 'auditoria',
  kicker: 'El primer paso',
  titulo: 'No arranca con una propuesta.\nArranca con una *visita*.',
  cita: {
    texto: '«Vamos a tu empresa, te auditamos y te hacemos una propuesta a medida.»',
    firma: 'Johnny Ferrante',
  },
  parrafos: [
    'Nadie compra un sistema por catálogo. Primero hay que ver cómo trabaja tu empresa hoy: qué se hace a mano, dónde se pierde el tiempo, qué datos existen y cuáles no. De ahí sale la propuesta — y recién ahí tiene sentido hablar de precio.',
    'Y lo hacemos en persona. Somos _un proveedor que podés ver cara a cara_, no una agencia que solo aparece en tus anuncios.',
  ],
  reel: {
    video: '/assets/reel-auditoria.mp4',
    poster: '/assets/reel-auditoria.webp',
    autor: 'Johnny Ferrante · Founder & CEO',
    duracion: '31 s · con sonido',
  },
  pasos: [
    {
      n: '01',
      titulo: 'Vamos',
      texto: 'A tu oficina, tu planta o tu local. Sin costo y sin compromiso.',
    },
    {
      n: '02',
      titulo: 'Auditamos',
      texto: 'Miramos cómo trabajás hoy y dónde se está yendo el tiempo.',
    },
    {
      n: '03',
      titulo: 'Propuesta',
      texto: 'A medida de lo que encontramos, con alcance y precio escritos.',
    },
  ],
}

export const CIERRE = {
  kicker: 'El siguiente paso',
  titulo: 'Empecemos por la *visita*.',
  bajada:
    'Vamos a tu empresa, miramos cómo trabajás hoy y salís con una propuesta escrita. Sin costo y sin compromiso.',
  cta: { label: 'Pedir la auditoría', href: '/contacto' },
}

export const META = {
  titulo: '[B] Group Quimera · Tecnología a medida para empresas · Santa Cruz, Bolivia',
  descripcion:
    'Ponemos la IA a trabajar dentro de tu empresa: agentes que atienden y venden, procesos automáticos y la foto real del negocio en una pantalla. Santa Cruz, Bolivia.',
}
