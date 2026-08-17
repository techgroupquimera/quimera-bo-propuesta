import { useInView } from '../../hooks/useInView'
import { LOGOS, MARCAS } from '../../content/site'
import { factorOptico } from '../../lib/optico'

/* Marquesina de marcas.
   La comparten el home —arriba, apenas debajo del hero— y /proyectos, donde va
   al final, entre «Bajo acuerdo» y el cierre. Es la misma tira con el mismo
   texto en el original de las dos páginas, así que vive acá y no en home/.

   UN solo track con el contenido duplicado, desplazado a -50%. Antes eran dos
   tracks animados por separado: cualquier desfase de un frame entre ambas
   animaciones se ve como un corte en la junta. La matemática del -50% es exacta
   porque el padding-right iguala al gap: 2N logos → (2N-1) gaps + 1 de padding
   = 2N gaps, así que la mitad del ancho es exactamente un set completo con su
   gap final.

   ── Cuándo se piden los 29 logos ──
   Son ~205 KB, y la tira está siempre debajo del pliegue (en el home, apenas
   debajo del hero, que mide una pantalla entera). Pedirlos durante la carga es
   quitarle a la primera pantalla un segundo de ancho de banda en un teléfono.

   `loading="lazy"` NO sirve acá, y ya se probó: el navegador decide imagen por
   imagen contra el viewport, así que los logos que están fuera del track no se
   cargaban hasta que la animación los traía, y al llegar estiraban la tira en
   marcha — era la causa de que el carrusel se cortara.

   Lo que sí sirve es decidir por SECCIÓN, no por imagen: hasta que la tira no
   entra en pantalla, los <img> se pintan sin `src`; cuando entra, los 58 lo
   reciben a la vez. La animación nunca ve una carga a medias, que es la
   condición que necesitaba, y la primera pantalla no paga los 205 KB.

   La caja está reservada desde el principio —width/height declarados más el
   alto en el style—, así que la tira mide lo mismo con src y sin él: no hay
   salto cuando llegan. */
const bonito = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

/* El alto de cada logo sale de `factorOptico` (lib/optico.js): lo que empareja
   la tira es el ÁREA de cada mancha, no su altura.

   Medido a 1920: altos entre 21 y 70px, anchos entre 55 y 250. Que un lockup
   largo mida un tercio del alto de una insignia cuadrada es correcto: lo que
   el ojo pesa es la mancha, no la altura. */
const CLASE_LOGO =
  'w-auto max-w-[clamp(162px,17vw,250px)] shrink-0 object-contain ' +
  'opacity-[.78] grayscale brightness-200 transition-[opacity,filter] duration-350 ' +
  'hover:opacity-100 hover:grayscale-0 hover:brightness-100 ' +
  /* sin movimiento la tira es una grilla estática: la copia del set sobra */
  'motion-reduce:aria-hidden:hidden'

function Logo({ slug, ancho, alto, copia, pedir }) {
  return (
    <img
      /* Sin `src` hasta que la tira entra en pantalla. Un <img> sin src no pide
         nada y ocupa exactamente lo mismo, porque la proporción sale de
         width/height y el alto lo fija el style. */
      src={pedir ? `/assets/marcas/${slug}.webp` : undefined}
      width={ancho}
      height={alto}
      decoding="async"
      alt={copia ? '' : bonito(slug)}
      aria-hidden={copia || undefined}
      style={{ height: `calc(var(--mq-alto) * ${factorOptico(ancho, alto).toFixed(3)})` }}
      className={CLASE_LOGO}
    />
  )
}

/* `titulo` se pisa porque el original no dice lo mismo en las tres páginas: en
   el home y /proyectos es «Marcas que ya nos dejaron entrar a sus operaciones»
   y en /nosotros «Algunas de las marcas con las que trabajamos». */
export function Marcas({ titulo = MARCAS.titulo }) {
  /* El mismo observer que usa <Reveal>, con el margen inferior en NEGATIVO.

     Es la parte que importa y la que se hizo mal la primera vez: en el home la
     tira arranca justo donde termina el hero, que mide una pantalla exacta. Con
     un margen positivo —incluso de 200px— el observer ya se cumple sin haber
     scrolleado un píxel, y los 29 logos se piden durante la carga: exactamente
     lo que se venía a evitar. Con -12% la tira tiene que haber entrado de
     verdad en pantalla. */
  const [ref, cerca] = useInView({ threshold: 0, rootMargin: '0px 0px -12% 0px' })

  return (
    <section ref={ref} className="contenido-diferido px-g py-[clamp(92px,11.5vh,162px)]">
      <p className="mb-[clamp(1.9rem,3.2vw,2.8rem)] text-center font-sans text-eyebrow font-semibold uppercase text-muted-2">
        {titulo}
      </p>

      {/* --mq-alto es la altura de referencia: la que toma un logo 2:1. El
          resto se escala contra ella. Es la única perilla de tamaño de la tira. */}
      <div
        className="overflow-hidden mask-fade-x motion-reduce:mask-none motion-reduce:[-webkit-mask-image:none]"
        style={{ '--mq-alto': 'clamp(34px, 3.4vw, 50px)' }}
      >
        <div className="flex w-max items-center gap-mq-gap pr-mq-gap animate-mq will-change-transform hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0">
          {LOGOS.map(([slug, ancho, alto]) => (
            <Logo key={slug} slug={slug} ancho={ancho} alto={alto} pedir={cerca} />
          ))}
          {LOGOS.map(([slug, ancho, alto]) => (
            <Logo
              key={`copia-${slug}`}
              slug={slug}
              ancho={ancho}
              alto={alto}
              pedir={cerca}
              copia
            />
          ))}
        </div>
      </div>
    </section>
  )
}
