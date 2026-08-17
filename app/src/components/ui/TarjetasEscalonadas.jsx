import { cx } from '../../lib/cx'
import { Icono } from './iconos'
import { Reveal } from './Reveal'

/* Cuatro tarjetas altas en fila, la segunda y la cuarta corridas hacia abajo,
   con una en el color de acento. Es el mismo wireframe en «Nuestra propuesta»
   del home y en «Lo que construimos» de /servicios, así que vive acá y no
   duplicado en las dos.

   items-start es lo que hace que el escalonado se vea: por defecto la grilla
   estira cada celda al alto de la fila, así que el margen de arriba no bajaba
   la tarjeta, la acortaba, y las cuatro terminaban al ras abajo. Sin estirar,
   las cuatro miden lo mismo y la 2 y la 4 cuelgan por debajo.

   El escalonado corre sólo con las cuatro en fila: al pasar a dos columnas el
   desfase deja de leerse como ritmo y queda como error. */

const CARA_OSCURA = 'border border-hair bg-white/[.03] hover:border-hair-lima hover:bg-white/[.05]'
/* Misma superficie que el CTA primario (lima plano con sombra interna oscura),
   para que el lima del sitio se lea como un material y no como dos. */
const CARA_LIMA =
  'border border-lima bg-lima text-[#0a1a00] shadow-[inset_0_0_3em_-1.1em_#4e7a00] hover:brightness-[1.04]'

export function TarjetasEscalonadas({ piezas, className }) {
  return (
    <div
      className={cx(
        'grid grid-cols-4 items-start gap-[clamp(.75rem,1.1vw,1.1rem)] max-[1100px]:grid-cols-2 max-[560px]:grid-cols-1',
        className,
      )}
    >
      {piezas.map((pieza, i) => (
        <Reveal
          as="article"
          key={pieza.titulo}
          delay={i * 0.06}
          className={cx(
            /* el alto mínimo es lo que da el aire entre el ícono y el pie;
               en una columna las tarjetas son anchas y no hace falta tanto */
            'flex min-h-[clamp(176px,21vw,310px)] flex-col rounded-[clamp(16px,1.4vw,22px)] p-[clamp(1.25rem,1.7vw,1.7rem)]',
            'transition-[background,border-color,filter,opacity,transform] duration-500 ease-soft',
            pieza.destacada ? CARA_LIMA : CARA_OSCURA,
            'min-[1100px]:nth-[2n]:mt-[clamp(28px,5vw,84px)]',
          )}
        >
          <span
            className={cx(
              'grid h-11 w-11 place-items-center rounded-xl border',
              pieza.destacada
                ? 'border-[#0a1a00]/22 bg-[#0a1a00]/16'
                : 'border-hair-lima bg-linear-150 from-lima/18 to-lima/4',
            )}
          >
            <Icono
              nombre={pieza.icono}
              className={cx('h-5 w-5', pieza.destacada ? 'text-[#0a1a00]' : 'text-lima')}
            />
          </span>

          <h3 className="mt-auto pt-8 text-card font-medium">{pieza.titulo}</h3>
          <p
            className={cx(
              'mt-[.6rem] text-body-m',
              pieza.destacada ? 'text-[#0a1a00]/78' : 'text-read-2',
            )}
          >
            {pieza.texto}
          </p>
        </Reveal>
      ))}
    </div>
  )
}
