import { cx } from '../../lib/cx'

/* Cita textual de un video. Todo lo que va con este componente salió de la boca
   de ellos en cámara — no es copy escrito por nosotros.

   La marca de cita era la itálica de Instrument Serif, que salió del sistema al
   quedar el brandboard en dos tipografías. Ahora la sostienen tres cosas que ya
   estaban: la barra lima al costado, las comillas angulares del propio texto y
   el salto de tamaño contra el párrafo. */
export function Cita({ texto, firma, className }) {
  return (
    <blockquote
      className={cx(
        'border-l-2 border-lima pl-[clamp(1rem,1.8vw,1.5rem)] text-[clamp(1.12rem,1.85vw,1.5rem)] font-normal leading-[1.4] tracking-[-.015em] text-read-hi',
        className,
      )}
    >
      {texto}
      {firma && (
        <cite className="mt-3 block font-sans text-tag font-semibold uppercase tracking-[.16em] text-muted-2">
          {firma}
        </cite>
      )}
    </blockquote>
  )
}
