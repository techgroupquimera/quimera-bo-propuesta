import { Fragment } from 'react'

/* Resuelve el mini-lenguaje de énfasis del contenido a JSX.
   Se parsea en un solo barrido con un regex alternado — nada de reemplazos
   encadenados sobre strings, que es como se cuelan etiquetas a medio cerrar.
   El orden de las alternativas importa: ** antes que *, o `**x**` se leería
   como un `*` vacío seguido de `*x*`.

     **x**   negrita (hereda color)
     *x*     énfasis: Instrument Serif itálica en lima
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

    /* La itálica de Instrument Serif, como en la propuesta original (.it en
       assets/quimera.css). Estuvo un tiempo en Manrope Semibold: el brandboard
       tenía dos familias y esta era una tercera, así que el contraste lo hacían
       el peso y el color. Volvió porque es la marca tipográfica de la
       propuesta — la palabra que cambia de VOZ adentro del titular, no sólo de
       color.

       El interletrado de -.01em también es del original: la itálica trae su
       propio ritmo y sin ese ajuste abre de más contra la Manrope que la rodea.

       El peso 400 va explícito: el <em> hereda el del titular que lo contiene,
       y la familia sólo se bajó en redonda. */
    if (parte.startsWith('*') && parte.endsWith('*'))
      return (
        <em key={key} className="font-serif font-normal italic tracking-[-.01em] text-lima">
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
