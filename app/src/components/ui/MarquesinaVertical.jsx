import { cx } from '../../lib/cx'

/* Columna de fichas en bucle. Mismo truco que la tira de marcas del home: UN
   solo track con el set duplicado, corrido medio track. Dos tracks animados por
   separado se desfasan un frame y el corte se ve en la junta.

   La matemática del -50% sólo cierra si el track termina con un hueco igual al
   gap: 2N fichas → (2N-1) gaps + el pb final = 2N gaps, y ahí medio track es
   exactamente un set completo. Por eso el pb repite el mismo valor del gap.

   Invariante: UN set tiene que ser más alto que la ventana. Si entra entero, al
   llegar a -50% se ve el hueco entre el final de la copia y el arranque del
   bucle. Con el alto y el paso de acá, siete fichas dan ~610px contra una
   ventana que topa en 520.

   Sin movimiento no hay bucle que sostener: se apaga la animación y la copia se
   esconde, así el lector no oye la lista dos veces. */
const FICHA =
  'grid shrink-0 place-items-center rounded-[clamp(12px,1vw,16px)] border border-hair ' +
  'bg-white/[.04] px-3 text-center font-sans text-[.8rem] leading-tight text-read-2 ' +
  'backdrop-blur-[2px]'

export function MarquesinaVertical({ items, sentido = 'arriba', className }) {
  return (
    <div
      className={cx(
        'h-[clamp(230px,42vh,520px)] w-[clamp(104px,9vw,146px)] overflow-hidden mask-fade-y',
        'motion-reduce:mask-none motion-reduce:[-webkit-mask-image:none]',
        className,
      )}
    >
      <div
        className={cx(
          'flex flex-col gap-[clamp(8px,.9vh,13px)] pb-[clamp(8px,.9vh,13px)] will-change-transform motion-reduce:animate-none motion-reduce:pb-0',
          sentido === 'abajo' ? 'animate-mq-abajo' : 'animate-mq-arriba',
        )}
      >
        {items.map((item) => (
          <span key={item} className={cx(FICHA, 'h-[clamp(54px,5.4vh,76px)]')}>
            {item}
          </span>
        ))}
        {items.map((item) => (
          <span
            key={`copia-${item}`}
            aria-hidden
            className={cx(FICHA, 'h-[clamp(54px,5.4vh,76px)] motion-reduce:hidden')}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
