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
  canales: {
    titulo: 'Escribinos directo',
    lista: [
      {
        icono: 'chat',
        titulo: 'WhatsApp Bolivia',
        pend: {
          texto: 'Falta el número real',
          nota: 'En producción hoy apunta a wa.me/59170000000, un número inventado.',
        },
      },
      {
        icono: 'chat',
        titulo: 'WhatsApp USA',
        pend: {
          texto: 'Falta el número de Tech Agents',
          nota: 'El PDF de capacidades ofrece un WhatsApp USA (Tech Agents LLC). Falta el número.',
        },
      },
      {
        icono: 'correo',
        titulo: 'Correo',
        pend: {
          texto: 'Definir correo en groupquimera.com.bo',
          nota: 'Hoy el sitio usa hola@quimera.com, un dominio que no es de la empresa.',
        },
      },
      {
        icono: 'agenda',
        titulo: 'Agendar 30 minutos',
        pend: {
          texto: 'Falta el link de agenda real',
          nota: 'En producción apunta a calendly.com, la home del servicio.',
        },
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
