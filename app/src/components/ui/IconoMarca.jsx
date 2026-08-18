import { Bot, Server } from 'lucide-react'
import { cx } from '../../lib/cx'
import { MARCAS_SVG } from './marcas-svg'

/* El logotipo de una tecnología del stack, buscado por el NOMBRE de la ficha.

   La búsqueda por nombre y no por un campo `icono` en el contenido es a
   propósito: content/tecnologia.js lista el stack como nombres sueltos —«son
   nombres textuales del stack que la propia página lista más abajo»— y meterle
   una clave de icono a cada uno sería mezclar copy con implementación. Si
   aparece una tecnología sin trazado, la ficha sale con su glifo de respaldo y
   nada se rompe.

   ── Los tres respaldos ──
   OpenAI no tiene icono en simple-icons (lo sacaron a pedido de la marca) y
   Llama no tiene uno propio —usa el de Meta, que es de quien es—. «Servidor
   propio» no es una marca: es la infraestructura de la casa, y por eso lleva un
   glifo y no un logo. Los dos respaldos salen de lucide, que es la librería de
   iconos que ya usa el sitio, así que no entra nada nuevo por esto.

   Para OpenAI el glifo es un robot y no la chispa de «IA» que sería lo obvio:
   Claude ya es una ráfaga y Gemini una estrella de cuatro puntas, y una tercera
   forma con brillos en la misma columna se lee como que las tres son lo mismo. */
const RESPALDOS = {
  'OpenAI · GPT': Bot,
  'Servidor propio': Server,
}

export function IconoMarca({ nombre, className }) {
  const trazado = MARCAS_SVG[nombre]

  if (!trazado) {
    const Glifo = RESPALDOS[nombre]
    /* Sin trazado y sin respaldo la ficha se queda con su texto solo: es una
       tecnología que se agregó al contenido y todavía no pasó por el script. */
    if (!Glifo) return null
    return <Glifo aria-hidden strokeWidth={1.6} className={cx('shrink-0', className)} />
  }

  return (
    /* `fill="currentColor"` y ningún color propio: el logo toma el de la ficha.
       Todos los trazados de simple-icons vienen en un viewBox de 24×24. */
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cx('shrink-0', className)}
    >
      <path d={trazado} />
    </svg>
  )
}
