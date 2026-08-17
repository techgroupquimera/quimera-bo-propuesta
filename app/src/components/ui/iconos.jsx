import {
  Box,
  CalendarDays,
  Database,
  FileText,
  LayoutGrid,
  Lightbulb,
  LineChart,
  ListChecks,
  Mail,
  MapPin,
  MessageCircle,
  Monitor,
  Search,
  Share2,
  ShieldCheck,
  Star,
  Store,
  Target,
  User,
  Users,
  Volume2,
} from 'lucide-react'

/* Los íconos salen de lucide-react: un solo trazo para todo el sitio, en vez de
   paths sueltos copiados de distintas librerías.

   Nota del panel de revisión que sigue en pie: los de las tarjetas son
   genéricos y no dicen nada que no diga el título. Cambiar la librería no
   arregla eso — arregla la consistencia. El mapa vive acá para que reemplazar
   uno sea una línea. */
export const ICONOS = {
  personas: Users,
  documento: FileText,
  chat: MessageCircle,
  grafico: LineChart,
  /* los dos de /servicios: el original dibujaba tres círculos unidos por líneas
     y tres círculos concéntricos — Share2 y Target son los mismos glifos */
  red: Share2,
  diana: Target,
  /* Los de «Lo que resolvemos». Cada uno es el equivalente en lucide del path
     que dibujaba servicios.html, no una reinterpretación: cubo, cilindros
     apilados, parlante con onda, cuatro cuadrados, bombilla y una persona.
     Ventas y Atención reusan grafico y chat — ahí el original ya dibujaba
     exactamente LineChart y MessageCircle. */
  caja: Box,
  datos: Database,
  altavoz: Volume2,
  grilla: LayoutGrid,
  foco: Lightbulb,
  /* singular a propósito: «Tu equipo» dibujaba UNA persona. Users ya lo usa
     «Tu CRM» dos secciones más arriba y repetir el glifo los confunde. */
  persona: User,
  /* Los de «Tres formas». Monitor y Star son los glifos del original tal cual.
     `tienda` NO lo es: ahí el original dibujaba una casa con puerta, y una casa
     no es lo que dice «Web & tienda». Store es el mismo tipo de glifo —un
     edificio— pero nombra el local. Volver a la casa es cambiar esta línea. */
  tienda: Store,
  monitor: Monitor,
  estrella: Star,
  /* Los de ciberseguridad. Los tres son el glifo del original tal cual: escudo
     con tilde, lupa, y una lista con tildes al margen. */
  escudo: ShieldCheck,
  lupa: Search,
  lista: ListChecks,
  /* Los canales de /contacto. Los tres son el glifo del original tal cual:
     sobre, calendario y pin de mapa. El de WhatsApp reusa `chat`, que es la
     burbuja que el original ya dibujaba. */
  correo: Mail,
  agenda: CalendarDays,
  lugar: MapPin,
}

export function Icono({ nombre, className, grosor = 1.6 }) {
  const Glifo = ICONOS[nombre]
  return Glifo ? <Glifo className={className} strokeWidth={grosor} aria-hidden /> : null
}
