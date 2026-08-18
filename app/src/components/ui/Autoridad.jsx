import { Kicker } from './Kicker'
import { Reveal } from './Reveal'
import { Rich } from './Rich'
import { Section } from './Section'

/* Según la referencia: la foto como panel alto a la izquierda y a la derecha
   kicker, la declaración, el texto y —abajo— dos fichas con los datos.

   Los dos datos ya estaban en el contenido; lo que cambia es que dejan de ser
   dos casilleros separados por hairlines y pasan a ser fichas con superficie,
   como las tarjetas del resto del sitio.

   Se fue el halo rosa radial que tenía la foto: no venía de ninguna luz de la
   escena y está en la lista de «lo que todavía se lee hecho por IA» del panel
   de revisión. El panel ahora se define por su propio borde.

   Lo comparten el home y /nosotros con distinto copy. Las fichas de datos son
   opcionales: /nosotros no las trae, en el original ese bloque es sólo la placa
   y la cita. */
export function Autoridad({ autoridad }) {
  return (
    <Section id="autoridad">
      <div className="grid gap-[clamp(1.6rem,3.5vw,3.5rem)] min-[900px]:grid-cols-[minmax(0,.72fr)_minmax(0,1fr)]">
        {/* La proporción la fija el panel, no la foto. El original es 2:3 y a
            todo el ancho de la columna se estiraba a más del doble de alto que
            el texto de al lado. A 4:5 la placa sigue entrando entera —queda
            centrada en el encuadre— y las dos columnas se parecen más. */}
        <Reveal className="relative aspect-4/5 overflow-hidden rounded-[clamp(16px,1.6vw,24px)] border border-hair">
          {/* lazy: la placa está bien abajo en la página. Sin esto React la
              pre-carga desde el HTML —lo hace con toda imagen que no sea lazy—
              y compite con el hero por el ancho de banda. La caja ya la reserva
              el aspect-4/5 del panel, así que no hay salto al llegar. */}
          <img
            src={autoridad.foto.src}
            alt={autoridad.foto.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </Reveal>

        <div className="flex flex-col justify-center">
          <Reveal>
            <Kicker>{autoridad.kicker}</Kicker>
          </Reveal>

          {/* La declaración hace de titular de la sección, pero se marca como
              cita porque lo es: es el texto de la placa, palabra por palabra.
              Y va en la itálica de las citas por lo mismo — el cuerpo ya era el
              del original, así que sólo cambian la familia y el interletrado,
              que la serif pide más suelto. */}
          <Reveal
            as="blockquote"
            className="mt-[1.1rem] font-serif text-[clamp(1.35rem,2.5vw,2.1rem)] font-normal italic leading-[1.3] tracking-[-.01em] text-read-hi"
          >
            <Rich texto={autoridad.cita} />
          </Reveal>

          <Reveal as="p" className="mt-[1.4rem] max-w-[52ch] text-bajada font-normal text-read">
            {autoridad.bajada}
          </Reveal>

          {/* No alcanza con el atributo `hidden`: la clase `grid` pisa el
              display:none del navegador y quedaría un <dl> vacío ocupando su
              margen de arriba. */}
          {autoridad.datos && (
            <Reveal
              as="dl"
              delay={0.08}
              className="mt-[clamp(2rem,3.4vw,3rem)] grid grid-cols-2 gap-[clamp(.6rem,.9vw,.9rem)] max-[420px]:grid-cols-1"
            >
              {autoridad.datos.map((dato) => (
                <div
                  key={dato.valor}
                  className="rounded-[clamp(12px,1.1vw,16px)] border border-hair bg-white/2.5 p-[clamp(1.1rem,1.6vw,1.5rem)] transition-[background,border-color] duration-500 ease-soft hover:border-hair-lima hover:bg-lima/4"
                >
                  <dt className="font-display text-[1.45rem] font-normal uppercase leading-[.9] tracking-[.02em] text-paper">
                    {dato.valor}
                  </dt>
                  {/* leading-[1.5] y no leading-normal: el @theme del proyecto no
                      define la escala de interlineado, así que `leading-normal`
                      emite line-height:var(--leading-normal) sin valor y el
                      navegador cae en `normal` (~1.2). Son 12px de menos en el
                      alto del home. */}
                  <dd className="mt-[.55rem] text-[.87rem] leading-[1.5] text-muted">
                    {dato.etiqueta}
                  </dd>
                </div>
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  )
}
