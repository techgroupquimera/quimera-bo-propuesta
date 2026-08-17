import { Fragment } from 'react'

/* Resuelve el mini-lenguaje de énfasis del contenido a JSX.
   Se parsea en un solo barrido con un regex alternado — nada de reemplazos
   encadenados sobre strings, que es como se cuelan etiquetas a medio cerrar.
   El orden de las alternativas importa: ** antes que *, o `**x**` se leería
   como un `*` vacío seguido de `*x*`.

     **x**   negrita (hereda color)
     *x*     énfasis: Manrope Semibold en lima
     _x_     lima plano
     `x`     código monoespaciado
     \n      salto de línea
*/
const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_|`[^`]+`|\n)/g

export function Rich({ texto, className }) {
  if (!texto) return null

  const partes = texto.split(TOKEN).map((parte, i) => {
    if (!parte) return null
    const key = `${i}-${parte.slice(0, 8)}`

    if (parte === '\n') return <br key={key} />

    if (parte.startsWith('**') && parte.endsWith('**'))
      return (
        <b key={key} className="font-semibold">
          {parte.slice(2, -2)}
        </b>
      )

    /* El brandboard tiene dos tipografías: Bebas Neue y Manrope. El énfasis
       era Instrument Serif itálica — una tercera que no está en el sistema.
       Ahora es Manrope Semibold en lima: mismo texto, mismo ritmo, y el
       contraste lo hacen el peso y el color. */
    if (parte.startsWith('*') && parte.endsWith('*'))
      return (
        <em key={key} className="font-semibold not-italic text-lima">
          {parte.slice(1, -1)}
        </em>
      )

    if (parte.startsWith('_') && parte.endsWith('_'))
      return (
        <span key={key} className="text-lima">
          {parte.slice(1, -1)}
        </span>
      )

    if (parte.startsWith('`') && parte.endsWith('`'))
      return (
        <code key={key} className="font-mono text-[.78em] text-[#e8eede]">
          {parte.slice(1, -1)}
        </code>
      )

    return <Fragment key={key}>{parte}</Fragment>
  })

  return className ? <span className={className}>{partes}</span> : <>{partes}</>
}
