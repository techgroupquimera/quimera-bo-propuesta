import { TriangleAlert } from 'lucide-react'
import { NOTAS } from '../../content/notas'
import { Rich } from '../ui/Rich'
import { useNotas } from './NotasContext'

/* Panel de revisión: qué cambió, por qué, y qué sigue pendiente del lado del
   cliente. Vive abajo a la derecha en todas las páginas. */
export function PanelNotas() {
  const { abierto, alternar } = useNotas()

  return (
    <>
      <button
        type="button"
        onClick={alternar}
        aria-expanded={abierto}
        className="fixed bottom-4 right-4 z-9995 flex cursor-pointer items-center gap-2 rounded-full border-0 bg-pend px-[1.15rem] py-[.8rem] font-sans text-[.62rem] font-semibold uppercase tracking-[.12em] text-[#1a1000] shadow-[0_10px_34px_rgba(0,0,0,.6)]"
      >
        <TriangleAlert className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
        {NOTAS.boton}
      </button>

      {abierto && (
        <div className="fixed bottom-[66px] right-4 z-[9995] max-h-[min(72vh,660px)] w-[min(430px,calc(100vw-32px))] overflow-y-auto rounded-2xl border border-pend bg-[#0b0f07] p-6">
          <h4 className="mb-[.3rem] font-display text-2xl uppercase text-pend">{NOTAS.titulo}</h4>
          <p className="text-[.8rem] text-muted">{NOTAS.bajada}</p>

          {NOTAS.bloques.map((bloque) => (
            <section key={bloque.titulo}>
              <span className="mb-2 mt-[1.3rem] block font-sans text-tag font-semibold uppercase tracking-[.18em] text-lima-2">
                {bloque.titulo}
              </span>
              <ol start={bloque.desde} className="ml-[1.1rem] mt-[.8rem] flex list-decimal flex-col gap-3">
                {bloque.items.map((item, i) => (
                  <li key={i} className="text-[.83rem] leading-[1.55] text-[#c7d0bd] [&_b]:text-pend">
                    <Rich texto={item} />
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}
    </>
  )
}
