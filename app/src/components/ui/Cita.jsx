import { cx } from '../../lib/cx'

/* Cita textual de un video. Todo lo que va con este componente salió de la boca
   de ellos en cámara — no es copy escrito por nosotros.

   La marca de cita es la itálica de Instrument Serif, como en la propuesta
   original (.pull en assets/quimera.css). Estuvo un tiempo en Manrope, mientras
   esa familia no estaba en el sistema, sostenida por la barra lima al costado,
   las comillas angulares del propio texto y el salto de tamaño contra el
   párrafo. Esas tres siguen; la itálica se suma.

   El cuerpo sube de clamp(1.12,1.85vw,1.5) a clamp(1.2,2.1vw,1.7) —los números
   del original— y el interletrado se afloja de -.015 a -.01em. No es un cambio
   de gusto: a igual cuerpo la serif itálica lee más chica y más liviana que la
   Manrope que reemplaza, así que mantener el tamaño anterior habría sido
   achicar la cita sin decidirlo.

   La firma vuelve a redonda con `not-italic`: ahora hereda la itálica del
   blockquote, y en el original el <cite> lleva font-style:normal explícito. */
export function Cita({ texto, firma, className }) {
  return (
    <blockquote
      className={cx(
        'border-l-2 border-lima pl-[clamp(1rem,1.8vw,1.5rem)]',
        'font-serif text-[clamp(1.2rem,2.1vw,1.7rem)] font-normal italic leading-[1.34] tracking-[-.01em] text-read-hi',
        className,
      )}
    >
      {texto}
      {firma && (
        <cite className="mt-3 block font-sans text-tag font-semibold not-italic uppercase tracking-[.16em] text-muted-2">
          {firma}
        </cite>
      )}
    </blockquote>
  )
}
