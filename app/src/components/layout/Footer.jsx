import { ArrowUpRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { FOOTER, MARCA } from '../../content/site'
import { cx } from '../../lib/cx'

/* La marca pesa (logo al tamaño del header + bajada + plaza) y las columnas
   usan el mismo lenguaje de hairlines que el resto del sitio, en vez de listas
   al aire. El padding lateral es el de .px-column: la columna del footer
   arranca donde arranca el texto de las secciones. */
const CLASE_FILA = 'block border-b border-hair py-[.62rem] text-[.9rem] font-normal'

/* La tipografía de la barra de abajo. La comparten los tres grupos —firma,
   legales y redes— y estaba escrita dos veces. */
const BARRA = 'font-sans text-tag font-semibold uppercase tracking-[.14em] text-muted-2'

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

          <Corporativo />
        </div>

        {FOOTER.columnas.map((col) => (
          <Columna key={col.titulo} col={col} />
        ))}
      </div>

      {/* La barra de abajo: firma, legales y redes. `gap-x-8` y no
          `justify-between` a secas: con tres grupos, el espacio repartido dejaba
          los legales flotando en el medio de la nada en pantallas anchas. */}
      <div className="mx-auto flex max-w-maxw flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-hair pt-[1.6rem]">
        <p className={BARRA}>{FOOTER.copyright}</p>

        {/* Texto y no enlaces: las tres páginas todavía no existen. El separador
            es un «·» de verdad entre elementos y no un borde, porque así se
            copia y se lee igual que el resto de la barra. */}
        <ul className={cx(BARRA, "flex flex-wrap gap-x-[.55rem]")}>
          {FOOTER.legales.map((legal, i) => (
            <li key={legal.label}>
              {/* el punto hereda el color de la fila: con `text-hair-lima`, que
                  es un color de borde al 22%, no se veía sobre el negro */}
              {i > 0 && <span className="mr-[.55rem]">·</span>}
              {legal.href ? (
                <NavLink to={legal.href} className="transition-colors duration-250 hover:text-lima">
                  {legal.label}
                </NavLink>
              ) : (
                legal.label
              )}
            </li>
          ))}
        </ul>

        <div className="flex gap-[1.4rem]">
          {FOOTER.social.map((red) => (
            <a
              key={red.href}
              href={red.href}
              target="_blank"
              rel="noopener"
              className={cx(BARRA, "transition-colors duration-250 hover:text-lima")}
            >
              {red.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* Una columna del pie. Dos formas: `links`, que es una lista de destinos, y
   `datos`, que es información agrupada por país y no lleva a ningún lado.

   Salió del cuerpo del <Footer> cuando la columna de links ganó un subtítulo
   («Alianza estratégica») y la de datos pasó de una línea por plaza a un grupo
   con varias: eran tres ternarios anidados adentro de un map, que es donde el
   marcado deja de leerse. */
function Columna({ col }) {
  const Contenedor = col.tipo === "links" ? "nav" : "div"

  return (
    <Contenedor>
      <h5 className="border-b border-hair pb-[.95rem] font-sans text-tag font-semibold uppercase tracking-[.2em] text-lima-2">
        {col.titulo}
      </h5>

      {col.tipo === "links" ? (
        <>
          {col.items.map((item) => (
            <Enlace key={item.href} item={item} />
          ))}

          {/* El subtítulo va con el aire de un bloque nuevo y no con el de una
              fila más: lo que separa a Sapien9 de los cuatro de arriba es que no
              es del grupo, y eso tiene que verse antes de leerlo. */}
          {col.sub && (
            <>
              <h6 className="mt-[1.6rem] font-sans text-tag font-semibold uppercase tracking-[.16em] text-muted-2">
                {col.sub.titulo}
              </h6>
              {col.sub.items.map((item) => (
                <Enlace key={item.href} item={item} />
              ))}
            </>
          )}
        </>
      ) : (
        col.items.map((zona) => (
          <div key={zona.zona} className="border-b border-hair py-[.62rem]">
            <b className="block font-sans text-tag font-semibold uppercase tracking-[.16em] text-[#cfd8c6]">
              {zona.zona}
            </b>
            {zona.lineas.map((linea) => (
              <span key={linea} className="mt-[.2rem] block text-[.9rem] text-muted">
                {linea}
              </span>
            ))}
          </div>
        ))
      )}
    </Contenedor>
  )
}

/* Un destino de la columna. `fuera` marca al que sale del grupo —hoy sólo
   Sapien9— y es lo único que lleva flecha: los otros cuatro externos son sitios
   de la casa, y una flecha en cada uno diría que todos son ajenos. */
function Enlace({ item }) {
  if (!item.externo) {
    return (
      <NavLink
        to={item.href}
        end={item.href === "/"}
        className={({ isActive }) => claseEnlace(isActive)}
      >
        {item.label}
      </NavLink>
    )
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener"
      className={cx(claseEnlace(false), item.fuera && "flex items-center gap-[.4rem]")}
    >
      {item.label}
      {item.fuera && (
        <ArrowUpRight aria-hidden strokeWidth={1.6} className="h-[.85em] w-[.85em]" />
      )}
    </a>
  )
}

/* Las dos sociedades —con su dirección y su teléfono— y el correo, colgando de
   la columna de la marca. Van acá y no en una columna propia: son el pie de la
   identidad —quién firma— y no una lista de enlaces como las otras tres.

   El encabezado repite el tratamiento de las columnas (versalita lima sobre
   hairline) en vez de la línea de guiones del boceto: el sitio ya tiene una
   forma de decir «acá empieza un bloque» y usarla ata este a los de al lado.

   La medida es la misma de la bajada (34ch), así que las tres piezas de la
   columna caen sobre el mismo eje.

   Los dos teléfonos van enlazados con `tel:` y el correo con `mailto:`: son
   datos reales. Mientras el teléfono fue un marcador («+591 XXX XXX XX») iba
   como texto plano, porque un `tel:` a un número que no existe es un enlace
   roto de los que no avisan. */
function Corporativo() {
  const { titulo, sedes, correo } = FOOTER.corporativo

  return (
    <div className="mt-[clamp(1.9rem,3.4vh,2.6rem)] max-w-[34ch]">
      <h5 className="border-b border-hair pb-[.95rem] font-sans text-tag font-semibold uppercase tracking-[.2em] text-lima-2">
        {titulo}
      </h5>

      {/* <dl> y no una lista suelta: cada sede es un país y lo que hay en ese
          país, que es exactamente un par término/descripción. */}
      <dl className="mt-[1.25rem] grid gap-[1.15rem]">
        {sedes.map((sede) => (
          <div key={sede.pais}>
            <dt className="font-sans text-tag font-semibold uppercase tracking-[.16em] text-muted-2">
              {sede.pais}
            </dt>
            <dd className="mt-[.4rem] text-[.9rem] leading-[1.5] text-read-2">
              {sede.razon}
              {sede.direccion.map((linea) => (
                <span key={linea} className="block text-muted">
                  {linea}
                </span>
              ))}
              {/* el número va en su propia línea y no pegado a la dirección:
                  es lo único de la ficha en lo que se puede hacer clic */}
              <a
                href={sede.telefonoHref}
                className="mt-[.3rem] block w-fit transition-colors duration-250 ease-soft hover:text-lima"
              >
                {sede.telefono}
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-[1.25rem] text-[.9rem] leading-[1.6]">
        <a
          href={`mailto:${correo}`}
          className="text-read-2 transition-colors duration-250 ease-soft hover:text-lima"
        >
          {correo}
        </a>
      </p>
    </div>
  )
}
