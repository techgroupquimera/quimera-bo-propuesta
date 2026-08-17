import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CTA_PRINCIPAL, MARCA, NAV } from '../../content/site'
import { cx } from '../../lib/cx'
import { Button } from '../ui/Button'
import { MenuMovil } from './MenuMovil'

/* Logo suelto afuera + pill de navegación separada.
   La barra usa el MISMO ancho y el MISMO padding lateral que el contenido: así
   el logo cae exactamente sobre la columna de texto de las secciones.

   Abajo de 1050px la pill se esconde y toma su lugar el botón del menú. Antes
   no la reemplazaba nada y las cuatro páginas del medio quedaban inalcanzables
   desde un teléfono. */
export function TopBar() {
  const [pegada, setPegada] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const alScroll = () => setPegada(scrollY > 30)
    alScroll()
    addEventListener('scroll', alScroll, { passive: true })
    return () => removeEventListener('scroll', alScroll)
  }, [])

  return (
    <>
      {/* El panel va ANTES y afuera de la barra: adentro heredaría su contexto
          de apilamiento y taparía al logo y al botón de cerrar por más que su z
          fuera menor. Acá el z-880 del panel sí queda debajo del z-900 de la
          barra, que es lo que deja la cabecera usable con el menú abierto. */}
      <MenuMovil abierto={menu} alCerrar={() => setMenu(false)} />

      <div className="pointer-events-none fixed left-1/2 top-[14px] z-[900] flex w-[min(var(--container-maxw),100%)] -translate-x-1/2 items-center justify-between gap-4 px-g max-lg:top-3 [&>*]:pointer-events-auto">
      {/* El logo original, sin caja: vive sobre la página.
          El lockup es apilado y por debajo de ~60px "Marketing y Tech" deja de
          leerse y se vuelve una mancha — por eso el piso del clamp es 62 y no
          baja más. El techo sí se puede seguir bajando. */}
      <Link to="/" className="block shrink-0 transition-opacity hover:opacity-[.82]">
        {/* Eager y con prioridad alta: es lo primero que se ve, en las seis
            rutas. Las medidas van declaradas para que la barra no se reacomode
            cuando llega — es el elemento más alto de la cabecera. */}
        <img
          src={MARCA.lockup}
          alt={MARCA.alt}
          width={MARCA.ancho}
          height={MARCA.alto}
          fetchPriority="high"
          decoding="async"
          className="h-[clamp(62px,5vw,74px)] w-auto drop-shadow-[0_6px_22px_rgba(0,0,0,.7)]"
        />
      </Link>

      {/* la pill: solo los enlaces */}
      <nav
        className={cx(
          'flex items-center gap-[clamp(1.1rem,1.9vw,1.9rem)] rounded-full border px-[1.6rem] py-[.78rem]',
          'backdrop-blur-[20px] backdrop-saturate-[1.3] transition-[background,border-color] duration-400',
          'max-[1050px]:hidden',
          pegada
            ? 'border-lima/16 bg-[rgba(6,8,5,.88)]'
            : 'border-hair bg-[rgba(8,11,6,.55)]',
        )}
      >
        {NAV.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cx(
                'relative whitespace-nowrap text-[.83rem] font-normal transition-colors duration-250',
                isActive
                  ? 'text-paper after:absolute after:inset-x-0 after:-bottom-[7px] after:h-px after:bg-lima'
                  : 'text-[#a4ae9b] hover:text-paper',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-[.6rem]">
        {/* Se esconde en dos casos, y en los dos sigue estando adentro del menú:
            en pantallas muy angostas, donde con el botón al lado no le queda
            ancho y empujaba al logo; y mientras el menú está abierto, para no
            mostrar «Conversemos» dos veces en la misma pantalla. */}
        <Button
          variante="primario"
          href={CTA_PRINCIPAL.href}
          className={cx('max-[420px]:hidden', menu && 'max-[1049px]:hidden')}
        >
          {CTA_PRINCIPAL.label}
        </Button>

        <button
          type="button"
          onClick={() => setMenu((v) => !v)}
          aria-expanded={menu}
          aria-controls="menu-movil"
          aria-label={menu ? 'Cerrar el menú' : 'Abrir el menú'}
          className={cx(
            'grid h-[2.9rem] w-[2.9rem] shrink-0 cursor-pointer place-items-center rounded-full border',
            'backdrop-blur-[20px] transition-[background,border-color,color] duration-350 ease-soft',
            'min-[1050px]:hidden',
            menu
              ? 'border-lima bg-lima/10 text-lima'
              : 'border-hair bg-[rgba(8,11,6,.55)] text-paper hover:border-hair-lima hover:text-lima',
          )}
        >
          {menu ? (
            <X aria-hidden strokeWidth={1.8} className="h-5 w-5" />
          ) : (
            <Menu aria-hidden strokeWidth={1.8} className="h-5 w-5" />
          )}
        </button>
      </div>

      </div>
    </>
  )
}
