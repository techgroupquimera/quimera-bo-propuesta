import { NavLink } from 'react-router-dom'
import { FOOTER, MARCA } from '../../content/site'
import { cx } from '../../lib/cx'
import { Pend } from '../ui/Pend'

/* La marca pesa (logo al tamaño del header + bajada + plaza) y las columnas
   usan el mismo lenguaje de hairlines que el resto del sitio, en vez de listas
   al aire. El padding lateral es el de .px-column: la columna del footer
   arranca donde arranca el texto de las secciones. */
const CLASE_FILA = 'block border-b border-hair py-[.62rem] text-[.9rem] font-normal'

/* El color va aparte del resto: `cx` no resuelve conflictos, así que poner
   text-muted y text-lima juntos deja que gane el que Tailwind haya emitido
   último en la hoja — que es text-muted, y el enlace activo no se pinta. */
const claseEnlace = (activo) =>
  cx(
    CLASE_FILA,
    'transition-[color,padding-left] duration-300 ease-soft hover:pl-[7px] hover:text-lima',
    activo ? 'text-lima' : 'text-muted',
  )

export function Footer() {
  return (
    <footer className="border-t border-hair px-column pb-8 pt-[clamp(2.6rem,5vw,4rem)]">
      <div className="mx-auto mb-[clamp(2.2rem,4vh,3.2rem)] grid max-w-maxw grid-cols-[1.8fr_repeat(3,1fr)] gap-[clamp(1.8rem,3.4vw,3.6rem)] max-[880px]:grid-cols-2">
        <div className="max-[880px]:col-span-full">
          {/* El mismo archivo que el de la barra: para cuando el pie entra en
              pantalla ya está en cache y no se pide de nuevo. Va lazy igual,
              para que React no lo pre-cargue desde el HTML. */}
          <img
            src={MARCA.lockup}
            alt={MARCA.alt}
            width={MARCA.ancho}
            height={MARCA.alto}
            loading="lazy"
            decoding="async"
            className="mb-[1.35rem] h-[clamp(70px,5.6vw,86px)] w-auto"
          />
          <p className="max-w-[34ch] text-[.97rem] font-normal leading-[1.66] text-read-2">
            {FOOTER.bajada}
          </p>
          <p className="mt-[1.1rem] text-[.85rem] text-muted-2">{FOOTER.plaza}</p>
        </div>

        {FOOTER.columnas.map((col) => {
          const Contenedor = col.tipo === 'links' ? 'nav' : 'div'
          return (
            <Contenedor key={col.titulo}>
              <h5 className="border-b border-hair pb-[.95rem] font-sans text-tag font-semibold uppercase tracking-[.2em] text-lima-2">
                {col.titulo}
              </h5>

              {col.tipo === 'links'
                ? col.items.map((item) =>
                    item.externo ? (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener"
                        className={claseEnlace(false)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        end={item.href === '/'}
                        className={({ isActive }) => claseEnlace(isActive)}
                      >
                        {item.label}
                      </NavLink>
                    ),
                  )
                : col.items.map((item) => (
                    <span key={item.plaza} className={cx(CLASE_FILA, 'text-muted')}>
                      <b className="mb-[.05rem] block text-[.92rem] font-medium text-[#cfd8c6]">
                        {item.plaza}
                      </b>
                      {item.rol}
                    </span>
                  ))}
            </Contenedor>
          )
        })}
      </div>

      <div className="mx-auto flex max-w-maxw flex-wrap items-center justify-between gap-4 border-t border-hair pt-[1.6rem]">
        <p className="font-sans text-tag font-semibold uppercase tracking-[.14em] text-muted-2">
          {FOOTER.copyright}
          <Pend nota={FOOTER.copyrightPend.nota}>{FOOTER.copyrightPend.texto}</Pend>
        </p>
        <div className="flex gap-[1.4rem]">
          {FOOTER.social.map((red) => (
            <a
              key={red.href}
              href={red.href}
              target="_blank"
              rel="noopener"
              className="font-sans text-tag font-semibold uppercase tracking-[.14em] text-muted-2 hover:text-lima"
            >
              {red.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
