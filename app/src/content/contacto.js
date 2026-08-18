/* Copy de /contacto — textual de contacto.html.
   Mismo mini-lenguaje que el resto: *x* énfasis, \n salto de línea. */

export const META = {
  titulo: 'Contacto · Group Quimera · Imaginemos tu tecnología ideal',
  descripcion:
    'Tomémonos 30 minutos y te mostramos cómo se vería tu empresa con sus propios sistemas. Santa Cruz de la Sierra, Bolivia.',
}

export const HERO = {
  migas: [{ label: 'Inicio', href: '/' }, { label: 'Contacto' }],
  kicker: 'El siguiente paso',
  titulo: 'Imaginemos tu\n*tecnología ideal*.',
  bajada:
    'Tomémonos 30 minutos. Salís con una idea clara de cómo se vería tu empresa con sus propios sistemas, sin compromiso. Si no es para nosotros, te lo decimos y te ahorramos la reunión.',
  /* El mismo bokeh que /servicios y /tecnología, como en el original. */
  fondo: { src: '/assets/bg-bokeh-lite.webp', opacidad: 0.28 },
  /* Sin `indice`: la página tiene dos secciones y un índice de dos tramos no es
     un índice. `HeroIndice` lo omite cuando no está. */
}

/* El formulario y los canales, textuales del original: mismos campos, mismo
   orden, mismos textos, mismas opciones del selector. Lo único que cambia es la
   tipografía, que pasa a la del sistema.

   Las etiquetas van en `label` y no en el placeholder: un placeholder que hace
   de etiqueta desaparece apenas escribís y deja el campo sin nombre. Así estaba
   en el original y así queda.

   Los cuatro canales de arriba apuntan a `#` en el original y están marcados
   como pendientes: ninguno tiene todavía su destino real. Por eso acá no se
   dibujan como enlaces —un enlace que no lleva a ningún lado es peor que una
   fila de texto— y cada uno lleva su marcador. Cuando lleguen los datos, se
   agrega `href` y vuelven a ser enlaces. */
export const FORMULARIO = {
  id: 'formulario',
  titulo: 'Contanos qué se hace a mano en tu empresa',
  filas: [
    [
      {
        id: 'nombre',
        name: 'name',
        label: 'Nombre y apellido',
        placeholder: 'Tu nombre',
        requerido: true,
      },
      {
        id: 'email',
        name: 'email',
        tipo: 'email',
        label: 'Email',
        placeholder: 'vos@tuempresa.com',
        requerido: true,
      },
    ],
    [
      { id: 'empresa', name: 'company', label: 'Empresa', placeholder: 'Nombre de tu empresa' },
      { id: 'telefono', name: 'phone', label: 'Teléfono / WhatsApp', placeholder: 'Opcional' },
    ],
    [
      {
        id: 'urgencia',
        name: 'urgency',
        control: 'select',
        label: '¿Qué tan urgente es?',
        valor: 'media',
        opciones: [
          { valor: 'alta', label: 'Lo necesito este mes' },
          { valor: 'media', label: 'En los próximos meses' },
          { valor: 'baja', label: 'Estoy investigando' },
        ],
      },
    ],
    [
      {
        id: 'necesidad',
        name: 'need',
        control: 'textarea',
        label: '¿Qué tarea te gustaría dejar de hacer a mano?',
        placeholder:
          'El proceso concreto: quién lo hace hoy, cuánto tiempo le toma y con qué sistemas.',
        requerido: true,
      },
    ],
  ],
  enviar: 'Enviar',
  /* El comportamiento del original: valida y avisa, no manda nada. */
  avisos: {
    falta: 'Completá nombre, email y el proceso que querés automatizar.',
    ok: 'Demo local: todavía no envía. En producción va al endpoint /leads del backend, que ya existe y funciona — falta apuntarlo a un correo de la empresa.',
  },
  /* Los cuatro canales ya tienen su destino real: los dos números y el correo
     salieron del bloque corporativo del pie, y la agenda es un Google Calendar.
     Los cuatro son enlaces y toda la fila es el destino, no sólo el título.

     Hasta acá iban como texto con un marcador ámbar, porque ninguno tenía a
     dónde ir: un enlace que no lleva a ningún lado es peor que una fila de
     texto. La única que queda sin enlace es la dirección, que no lleva a
     ningún lado por definición.

     `texto` es lo que se muestra —con espacios y paréntesis, para que se lea— y
     `href` lo que se abre. En wa.me el número va sin «+», sin espacios y sin
     paréntesis: cualquier otra cosa y WhatsApp abre una conversación vacía. */
  canales: {
    titulo: 'Escribinos directo',
    lista: [
      {
        icono: 'chat',
        titulo: 'WhatsApp Bolivia',
        texto: '+591 77 314 890',
        href: 'https://wa.me/59177314890',
        externo: true,
      },
      {
        icono: 'chat',
        titulo: 'WhatsApp USA',
        texto: '+1 (803) 916-0333',
        href: 'https://wa.me/18039160333',
        externo: true,
      },
      {
        icono: 'correo',
        titulo: 'Correo',
        texto: 'marketing@groupquimera.com',
        href: 'mailto:marketing@groupquimera.com',
      },
      {
        icono: 'agenda',
        titulo: 'Agendar 30 minutos',
        href: 'https://calendar.app.google/7DnFaRvwcbYMipKu5',
        externo: true,
      },
      {
        icono: 'lugar',
        titulo: 'Santa Cruz de la Sierra',
        texto: 'Bolivia · También trabajamos en remoto',
      },
    ],
  },
  despues: {
    titulo: 'Lo que pasa después',
    texto:
      'Leemos tu caso, te decimos si hay algo automatizable y te proponemos el diagnóstico solo si tiene sentido. Sin llamada de ventas de por medio.',
    nota: 'Respuesta en menos de 24 horas hábiles',
  },
}
