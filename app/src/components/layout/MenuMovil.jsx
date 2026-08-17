import { ArrowUpRight } from 'lucide-react'
import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { CTA_PRINCIPAL, FOOTER, NAV } from '../../content/site'
import { useEscape } from '../../hooks/useEscape'
import { cx } from '../../lib/cx'

/* El menú de abajo de 1050px.

   Existe porque hasta acá no había ninguno: la pill de navegación se escondía y
   no la reemplazaba nada, así que desde un teléfono el sitio tenía dos destinos
   —el logo al inicio y el CTA a contacto— y las cuatro páginas del medio no se
   podían alcanzar. Estaban sólo en el footer, al final de páginas de 12.000px.

   ── Detalles que no son decorativos ──
   · El panel arranca DEBAJO de la barra (top-[86px]) en vez de tapar la
     pantalla entera: así el logo y el botón de cerrar siguen a la vista y no
     hay que dibujar una segunda cabecera adentro del panel.
   · Se bloquea el scroll del fondo mientras está abierto — si no, el dedo
     mueve la página detrás del menú.
   · Se cierra solo al cambiar de ruta. Sin eso, al tocar «Servicios» el menú
     queda abierto sobre la página nueva.
   · Escape y el fondo también cierran. */
export function MenuMovil({ abierto, alCerrar }) {
  const { pathname } = useLocation()

  useEscape(abierto, alCerrar)

  useEffect(() => {
    alCerrar()
    /* sólo la ruta: agregar alCerrar dispararía el efecto en cada render */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (!abierto) return
    const previo = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previo
    }
  }, [abierto])

  return (
    <div
      id="menu-movil"
      /* inert saca del tab y del lector de pantalla todo lo de adentro cuando
         está cerrado, sin desmontarlo: así la transición de salida se ve */
      inert={!abierto || undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) alCerrar()
      }}
      className={cx(
        'fixed inset-x-0 bottom-0 top-0 z-[880] min-[1050px]:hidden',
        'bg-[rgba(4,6,3,.94)] backdrop-blur-[22px]',
        'transition-[opacity,visibility] duration-350 ease-soft',
        abierto ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-full w-full max-w-maxw flex-col justify-center gap-[.2rem] px-g pb-[clamp(2rem,10vh,5rem)] pt-[clamp(92px,14vh,132px)]"
      >
        {NAV.map((item, i) => (
          <NavLink
            key={item.href}
            to={item.href}
            style={{ transitionDelay: abierto ? `${0.05 + i * 0.045}s` : '0s' }}
            className={({ isActive }) =>
              cx(
                'flex items-baseline justify-between gap-4 border-b border-hair py-[clamp(.9rem,2.4vh,1.4rem)]',
                'text-[clamp(1.7rem,7vw,2.6rem)] font-normal leading-[1.1] tracking-[-.02em]',
                'transition-[opacity,transform,color] duration-450 ease-soft motion-reduce:transition-none',
                abierto ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                isActive ? 'text-lima' : 'text-paper',
              )
            }
          >
            {item.label}
            <ArrowUpRight aria-hidden strokeWidth={1.5} className="h-[.7em] w-[.7em] text-muted-2" />
          </NavLink>
        ))}

        {/* El CTA también vive en la barra, pero repetirlo acá evita que haya
            que cerrar el menú para encontrarlo. */}
        <NavLink
          to={CTA_PRINCIPAL.href}
          style={{ transitionDelay: abierto ? `${0.05 + NAV.length * 0.045}s` : '0s' }}
          className={cx(
            'mt-[clamp(1.6rem,4vh,2.6rem)] grid place-items-center rounded-full bg-lima',
            'py-[.95rem] font-sans text-[.95rem] font-medium tracking-[.02em] text-ink',
            'transition-[opacity,transform] duration-450 ease-soft motion-reduce:transition-none',
            abierto ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
          )}
        >
          {CTA_PRINCIPAL.label}
        </NavLink>

        <p className="mt-[clamp(1.2rem,3vh,2rem)] text-center font-sans text-[.76rem] text-muted-2">
          {FOOTER.plaza}
        </p>
      </nav>
    </div>
  )
}
