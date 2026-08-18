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
   desfase deja de leerse como ritmo y queda como error.

   `pieza.imagen` es opcional: con foto la tarjeta cambia de material —vidrio
   sobre la imagen en vez de la caja plana— y sin foto queda como estaba. Hoy
   las dos secciones que usan el componente traen sus cuatro fotos, pero la
   rama sin imagen se sostiene: es la que permitió cambiar el home primero y
   /servicios después sin que la del medio quedara rota. */

const CARA_OSCURA = 'border border-hair bg-white/[.03] hover:border-hair-lima hover:bg-white/[.05]'
/* Con foto el borde sube a blanco: el hairline al 9% se pierde contra una
   imagen y la tarjeta deja de tener canto. La sombra la despega del fondo,
   que es lo que termina de leerse como un panel de vidrio apoyado encima. */
const CARA_VIDRIO =
  'border border-white/12 bg-white/[.02] shadow-[0_20px_44px_-30px_rgba(0,0,0,.95)] hover:border-hair-lima'
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
            'group relative isolate flex min-h-[clamp(176px,21vw,310px)] flex-col rounded-[clamp(16px,1.4vw,22px)] p-[clamp(1.25rem,1.7vw,1.7rem)]',
            /* isolate + overflow: la foto va en z negativo para quedar debajo
               del contenido, y sin contexto propio se iría detrás del fondo de
               la sección. El recorte es lo que le da a la foto las esquinas
               redondeadas de la tarjeta. */
            pieza.imagen && 'overflow-hidden',
            'transition-[background,border-color,filter,opacity,transform] duration-500 ease-soft',
            pieza.destacada ? CARA_LIMA : pieza.imagen ? CARA_VIDRIO : CARA_OSCURA,
            'min-[1100px]:nth-[2n]:mt-[clamp(28px,5vw,84px)]',
          )}
        >
          {pieza.imagen && <Fondo src={pieza.imagen} destacada={pieza.destacada} />}

          <span
            className={cx(
              'grid h-11 w-11 place-items-center rounded-xl border',
              pieza.destacada
                ? 'border-[#0a1a00]/22 bg-[#0a1a00]/16'
                : pieza.imagen
                  /* sobre foto el chip se vuelve vidrio oscuro: el degradado
                     lima al 18% es invisible contra la pantalla blanca de una
                     de las fotos, y el ícono lima encima tampoco se leía */
                  ? 'border-white/14 bg-ink/45 backdrop-blur-[10px]'
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

/* Tres capas, y el orden importa —cada una tapa a la anterior—:

     -z-30  la foto, apagada y desaturada. Las cuatro son de banco de imágenes,
            con azules y rojos que no son de la marca; a saturación plena
            pelean con el lima. Al 45% de saturación quedan casi monocromas y
            el único color vivo de la sección vuelve a ser el acento.
     -z-20  el vidrio: desenfoca la foto justo donde va el texto y se desvanece
            hacia arriba, así la mitad de arriba queda nítida. Es lo que hace
            que se lea como vidrio esmerilado y no como una foto con un velo.
     -z-10  el degradado a ink, que es quien garantiza el contraste del pie.
            Casi opaco abajo, apenas un tinte arriba.

   La destacada no lleva vidrio: sobre lima plano un desenfoque no tiene nada
   que desenfocar. Ahí la foto entra en soft-light, o sea como textura —le da
   grano al lima sin convertirlo en una foto verde— y el degradado devuelve el
   lima pleno en el pie, que es donde va el texto en #0a1a00. */
function Fondo({ src, destacada }) {
  return (
    <>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width={720}
        height={960}
        loading="lazy"
        decoding="async"
        className={cx(
          'pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover',
          'transition-[opacity,transform] duration-700 ease-soft motion-reduce:transition-none',
          destacada
            ? 'opacity-[.42] mix-blend-soft-light [filter:saturate(.5)] group-hover:opacity-[.55]'
            : 'opacity-[.46] [filter:saturate(.45)_contrast(1.06)] group-hover:opacity-[.62] group-hover:scale-[1.05] motion-reduce:group-hover:scale-100',
        )}
      />

      {!destacada && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[62%] bg-white/[.03] mask-vidrio backdrop-blur-[16px]"
        />
      )}

      <span
        aria-hidden="true"
        className={cx(
          'pointer-events-none absolute inset-0 -z-10 bg-linear-to-t',
          destacada ? 'from-lima via-lima/78 to-lima/30' : 'from-ink/94 via-ink/72 to-ink/34',
        )}
      />
    </>
  )
}
