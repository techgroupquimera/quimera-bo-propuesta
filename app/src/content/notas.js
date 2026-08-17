/* Panel de revisión — lo que hay que resolver antes de publicar.
   Mismo mini-lenguaje que el resto del contenido, más `código` entre backticks.
   Lo ámbar es lo que no se pudo verificar o lo que hoy está falso en producción.
   Nada está inventado. */

export const NOTAS = {
  /* el ⚠ lo pone el botón con un ícono de la librería, no el texto */
  boton: 'Datos por completar',
  titulo: 'Antes de publicar',
  bajada:
    'Lo ámbar es lo que no pude verificar o lo que hoy está falso en producción. Nada está inventado.',
  bloques: [
    {
      titulo: 'Bloqueantes · hoy falsos en el sitio live',
      desde: 1,
      items: [
        '**WhatsApp inventado:** producción apunta a `wa.me/59170000000`.',
        '**Calendly vacío:** apunta a `calendly.com`, no a una agenda.',
        '**Correo ajeno:** usa `hola@quimera.com`, otro dominio.',
        '**Equipo ficticio:** /nosotros lista «Mateo Vargas — CEO», «Sofía Mendoza», «Diego Rojas», «Camila Quispe». No existen.',
        '**Leads sin dueño:** el backend envía a `cleverf200@gmail.com` desde `onboarding@resend.dev` y los logs no registran ni un lead enviado nunca.',
      ],
    },
    {
      titulo: 'Datos que necesito',
      desde: 6,
      items: [
        '**Métricas de Bolivia Fitness** — consultas/mes, pedidos sin humano, horas liberadas.',
        '**Precios** — al menos un «desde» para las tres modalidades.',
        '**Cifra de marcas:** el PDF dice 100+, el sitio dice +50 y +30, y hay 29 logos. Elegir una.',
        '**EIAN** — nombre y rol · **razón social** · **WhatsApp USA** · fotos reales de los 4 proyectos.',
      ],
    },
    {
      titulo: 'Cambios de esta pasada',
      desde: 10,
      items: [
        '**Una sola columna en todo el sitio.** Había **tres** bordes izquierdos distintos: el logo y la tira de cifras a 310px, el texto a 382px, y en las páginas internas el kicker pegado a 72px. Ahora las 6 páginas alinean en el mismo eje a cualquier ancho.',
        'Causa: `.topbar` y `footer` no llevaban el padding lateral del contenido, y `.phero` centraba a sus hijos dentro de un padding — el `.kicker`, al ser `inline-flex`, ni se centraba.',
        '**La foto de Johnny ya no se ve cortada.** El archivo traía una franja clara del techo del estudio arriba y la máscara CSS no llegaba a cero en ese borde (~86% de opacidad), así que el `mix-blend-mode:lighten` dibujaba la caja. Ahora el asset va recortado y con el desvanecido **horneado en el alfa**.',
        'Las cifras se leen **+100 / +30** en lugar de 100+ / 30+ (home y /nosotros).',
        '**Columna más ancha:** `--maxw` pasó de 1300 a **1560**. En una pantalla de 1610 el margen izquierdo bajó de 380px a 97px, así que el hero deja de "flotar al medio". Es una sola variable: subila o bajala y se mueve todo junto.',
        '**El verde de Ferrante volvió**, pero como luz de escena en lugar de la franja del techo que traía la foto, más saturación en el retrato y el calado FERRANTE más marcado.',
        'La tira de marcas respira: el bloque pasó de 1.8/2.6rem a `clamp(60px,7.5vh,104px)` arriba y abajo.',
        '**Servidor de revisión sin caché** (`tools/serve.py`) + `?v=` en el CSS y el JS: el navegador ya no puede mostrarte una versión vieja. Con F5 alcanza.',
        '**Johnny sin efectos:** se fue el `mix-blend-mode` y el halo. Ahora es la toma con el **tubo de luz verde real** (IMG_2359 del set de estudio), presentada como foto. Si preferís la de las tarjetas es cambiar una línea (IMG_2358).',
        'La placa vuelve a ser la foto de la placa sola — se ve más premium que el plano con la persona.',
      ],
    },
    {
      titulo: 'Variante B · qué cambia contra index.html',
      desde: 1,
      items: [
        '**La placa de CAMEBOL va con la prueba.** Queda pegada a «No son promesas»: los sistemas corriendo y la placa son las dos pruebas del sitio, y juntas pesan más que separadas. Ferrante entra después, como quien las firma.',
        '**«Cien mensajes» baja** y queda después de «Dejá de alquilar». Estaba pegada a «Diez herramientas»: dos diagnósticos seguidos, y el segundo es un subcaso del primero. Ahora demuestra en vez de volver a quejarse.',
        '**Se rompe el bloque de Johnny.** Eran placa + FERRANTE + video, tres pantallas seguidas de la misma persona. Ahora entre la placa y su video hay una parada, y se conserva FERRANTE → fotos → su reel, que es la mejor secuencia de la página.',
        '**Un solo pedido al final.** La auditoría cerraba con «Pedir la auditoría» y el cierre repetía «Tomémonos 30 minutos · Conversemos». La sección explica, el cierre pide.',
        'Arco resultante: **problema → qué construimos → un caso → la prueba → la placa → él → la visita → el primer paso.**',
      ],
    },
    {
      titulo: 'Nuevo · dos secciones armadas con tus propios reels',
      desde: 22,
      items: [
        '**«Cien mensajes al día»** — el dolor sale textual de tu reel `100 mensajes` («eso no es crecimiento, eso es caos») y la solución de `ia - kristel`. Los cuatro verbos —responde, califica, informa, agenda— son literalmente los de ella.',
        '**«No arranca con una propuesta»** — el escalón que faltaba en el embudo. No lo inventé: Johnny lo ofrece en cámara en `ia 1 ferrante`. El sitio live solo ofrecía «agendá una llamada», que es pedirle el paso 5 a quien está en el paso 1.',
        '**El «cara a cara» es el mejor argumento que tienen y no estaba escrito.** Aparece dos veces en los reels: «cansado de ver puras publicidades y no verlos físicamente» y «un proveedor que puedas ver face to face».',
        '**Falta el apellido y el rol de Kristel** para poder acreditarla bien.',
        '**Los reels traen íconos cian/turquesa**, no el lima `#81DE00` de la marca. Se nota al reproducirlos. Se puede regradear con ffmpeg o dejarlo así asumiendo que es material de redes.',
        '**Los subtítulos van quemados** en el video: por eso el clip se muestra vertical y sin recortar. Recortarlo a 16:9 le come la cabeza y le mete el subtítulo adentro (lo medí).',
        '**Decisión pendiente:** los reels dicen «agencia de Inteligencia Artificial» (Ferrante) y «si nos ves como una agencia más, ya empezamos mal» (Martha), y el PDF firma «Quimera·Tech». Son tres sustantivos distintos para lo mismo.',
        '**El reel `boca a boca` dice «En Quimera Marketing»** — marca vieja. Inutilizable con sonido.',
      ],
    },
    {
      titulo: 'Lo que todavía se lee "hecho por IA"',
      desde: 30,
      items: [
        '**Las 4 tarjetas** de «Dejá de alquilar tu tecnología» (y las 10 de /nosotros): cajas de vidrio + chip redondeado con ícono de librería. Es el patrón más de plantilla del sitio.',
        '**Los íconos SVG genéricos** (globo de chat, pin de mapa, gráfico): no dicen nada que no diga el título.',
        '**Media real ausente** en media página: «No son promesas» y «Dejá de alquilar» no tienen una sola imagen. Se resuelve con capturas de los 6 sistemas en línea — sigue pendiente de tu lado.',
        'Los **degradados verdes radiales** que no vienen de una luz de la escena. Ya saqué el peor (el halo detrás de Johnny); quedan el del hero y el de la placa.',
      ],
    },
  ],
}
