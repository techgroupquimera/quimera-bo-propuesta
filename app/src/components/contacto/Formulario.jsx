import { useState } from 'react'
import { FORMULARIO } from '../../content/contacto'
import { WEB3FORMS } from '../../content/site'
import { cx } from '../../lib/cx'
import { Button } from '../ui/Button'
import { Icono } from '../ui/iconos'
import { Pend } from '../ui/Pend'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

/* Mismo formulario que el original: mismos campos, mismo orden, mismas
   opciones, mismo comportamiento —valida y avisa, no manda nada— y las mismas
   dos tarjetas al costado. Lo único que cambia es la tipografía.

   ── Qué cambia de la tipografía ──
   Casi nada de tamaño: las etiquetas del original ya eran 0.57rem con 0.16em de
   interletrado, que es exactamente el `text-tag` del sistema. Lo que cambia es
   que ahora salen de la escala en vez de ser un valor suelto.

   El cambio de verdad es el peso de los campos: el original los pone en Light
   300, y el brandboard no lista ese peso —el README lo dice: «si aparece un
   font-light en el código, es un descuido»—. Van en 400, que además a 0.95rem
   sobre negro es lo que se sostiene.

   ── Los canales no son enlaces ──
   Los cuatro de arriba apuntan a `#` en el original: ninguno tiene todavía su
   destino real, y los cuatro están marcados como pendientes. Un enlace que no
   lleva a ningún lado es peor que una fila de texto, así que van como filas con
   su marcador hasta que lleguen los datos. */

const CAMPO =
  'w-full rounded-[10px] border border-hair bg-white/3 px-[.95rem] py-[.82rem] ' +
  'font-sans text-[.95rem] font-normal text-paper placeholder:text-muted-2 ' +
  'transition-[border-color,background] duration-250 ease-soft ' +
  'focus:border-lima focus:bg-lima/4 focus:outline-none'

const TARJETA =
  'rounded-[clamp(14px,1.3vw,20px)] border border-hair bg-white/2.5 p-[clamp(1.4rem,2.6vw,2.2rem)]'

function Campo({ campo }) {
  const comun = {
    id: campo.id,
    name: campo.name,
    required: campo.requerido || undefined,
    placeholder: campo.placeholder,
    className: CAMPO,
  }

  return (
    <p className="flex flex-col gap-[.45rem]">
      <label htmlFor={campo.id} className="font-sans text-tag font-semibold uppercase text-muted">
        {campo.label}
      </label>

      {campo.control === 'textarea' ? (
        <textarea {...comun} rows={4} className={cx(CAMPO, 'min-h-[104px] resize-y')} />
      ) : campo.control === 'select' ? (
        <select {...comun} defaultValue={campo.valor}>
          {campo.opciones.map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...comun} type={campo.tipo || 'text'} />
      )}
    </p>
  )
}

/* Los tres que el original marca como obligatorios. La validación es la misma
   de siempre: un aviso al pie y no los globos del navegador campo por campo. */
const OBLIGATORIOS = ['name', 'email', 'need']

export function Formulario() {
  const [aviso, setAviso] = useState(null)
  const [enviando, setEnviando] = useState(false)

  /* ── El envío ──
     Va directo del navegador a Web3Forms, que manda el correo. El sitio sigue
     siendo estático: no hay backend nuestro en el medio.

     Se manda el <form> entero como FormData en vez de armar un objeto campo por
     campo: así, cuando alguien agregue una pregunta al contenido, viaja sola —
     Web3Forms lista en el correo todo lo que reciba, con el `name` de cada
     campo como etiqueta.

     Sin clave no se intenta: la petición devolvería un error del servidor y el
     visitante leería «no se pudo enviar» sin que sea su culpa. Con clave vacía
     el formulario valida igual y avisa que no está conectado. */
  const enviar = async (e) => {
    e.preventDefault()
    const formulario = e.target

    if (OBLIGATORIOS.some((n) => !formulario[n].value.trim())) {
      return setAviso('falta')
    }

    if (!WEB3FORMS.clave) return setAviso('sinClave')

    setEnviando(true)
    setAviso('enviando')

    try {
      const datos = new FormData(formulario)
      datos.append('access_key', WEB3FORMS.clave)
      datos.append('subject', WEB3FORMS.asunto)
      datos.append('from_name', WEB3FORMS.remitente)

      const respuesta = await fetch(WEB3FORMS.url, { method: 'POST', body: datos })
      const cuerpo = await respuesta.json()

      setAviso(cuerpo.success ? 'ok' : 'error')
      if (cuerpo.success) formulario.reset()
    } catch {
      /* sin red, o el servicio caído: es lo mismo para quien está mirando */
      setAviso('error')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Section id={FORMULARIO.id} borde={false} className="pt-[clamp(24px,4vh,44px)]">
      <div className="grid gap-[clamp(.9rem,1.4vw,1.1rem)] min-[900px]:grid-cols-2 min-[900px]:items-start">
        <Reveal className={TARJETA}>
          <h2 className="mb-[1.4rem] text-card font-medium">{FORMULARIO.titulo}</h2>

          {/* noValidate: la validación la hace el submit y muestra UN aviso, en
              vez de los globos del navegador campo por campo. Es el
              comportamiento del original. */}
          <form onSubmit={enviar} noValidate className="flex flex-col gap-[1rem]">
            {FORMULARIO.filas.map((fila) => (
              <div
                key={fila[0].id}
                className={cx(
                  'grid gap-[1rem]',
                  fila.length > 1 && 'min-[900px]:grid-cols-2',
                )}
              >
                {fila.map((campo) => (
                  <Campo key={campo.id} campo={campo} />
                ))}
              </div>
            ))}

            {/* El honeypot de Web3Forms: los bots completan todo lo que
                encuentran, y si esta casilla llega marcada el envío se descarta
                del lado de ellos. Va escondida con `hidden` y fuera del tabulador
                para que no exista para quien navega con teclado o lector. */}
            <input type="checkbox" name="botcheck" hidden tabIndex={-1} autoComplete="off" />

            <Button
              variante="primario"
              type="submit"
              disabled={enviando}
              className={cx('self-start', enviando && 'pointer-events-none opacity-60')}
            >
              {FORMULARIO.enviar}
            </Button>

            {/* aria-live: el aviso aparece sin mover el foco, así que hay que
                avisarle al lector de pantalla que algo cambió */}
            <p
              aria-live="polite"
              className={cx(
                'text-[.83rem] leading-[1.6]',
                /* ámbar para lo que hay que corregir o no funcionó, lima para lo
                   que salió bien o está en camino */
                aviso === 'falta' || aviso === 'error' || aviso === 'sinClave'
                  ? 'text-pend'
                  : 'text-lima-2',
              )}
            >
              {aviso ? FORMULARIO.avisos[aviso] : ''}
            </p>
          </form>
        </Reveal>

        <div className="grid gap-[clamp(.9rem,1.4vw,1.1rem)]">
          <Reveal delay={0.06} className={TARJETA}>
            <h3 className="mb-[1.2rem] text-card font-medium">{FORMULARIO.canales.titulo}</h3>

            <ul>
              {FORMULARIO.canales.lista.map((canal) => (
                <li key={canal.titulo} className="border-t border-hair first:border-t-0">
                  <Canal canal={canal} />
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className={TARJETA}>
            <h3 className="mb-[.6rem] text-card font-medium">{FORMULARIO.despues.titulo}</h3>

            <p className="text-body-m text-read-2">{FORMULARIO.despues.texto}</p>

            <p className="mt-[1.2rem] border-t border-hair pt-[1.1rem] font-sans text-tag font-semibold uppercase text-muted-2">
              {FORMULARIO.despues.nota}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/* Una fila de «Escribinos directo».

   Con `href` toda la fila es el enlace y no sólo el título: es una superficie
   de 38px de alto con un solo destino, y pedirle a alguien que apunte a dos
   palabras cuando puede tocar la fila entera no tiene sentido —el mismo
   criterio que los paneles de <Unidades>—.

   Sin `href` sale como <div>: es lo que pasa con la agenda, que todavía no
   tiene link, y con la dirección, que no lleva a ningún lado por definición. */
function Canal({ canal }) {
  const Fila = canal.href ? "a" : "div"
  const props = canal.href
    ? {
        href: canal.href,
        ...(canal.externo ? { target: "_blank", rel: "noopener" } : null),
      }
    : {}

  return (
    <Fila
      {...props}
      className={cx(
        "group flex items-center gap-[1rem] py-[1.05rem]",
        canal.href && "transition-colors duration-250 ease-soft",
      )}
    >
      <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[11px] border border-hair-lima bg-lima/[.09] transition-[background,border-color] duration-250 ease-soft group-hover:bg-lima/[.16]">
        <Icono nombre={canal.icono} className="h-[17px] w-[17px] text-lima" grosor={1.7} />
      </span>

      <span className="min-w-0">
        <span className="block text-[.97rem] font-medium tracking-[-.01em] transition-colors duration-250 group-hover:text-lima">
          {canal.titulo}
        </span>

        {canal.texto && (
          <span className="mt-[.15rem] block text-[.8rem] text-muted">{canal.texto}</span>
        )}

        {canal.pend && (
          <span className="mt-[.3rem] block text-[.8rem]">
            <Pend nota={canal.pend.nota}>{canal.pend.texto}</Pend>
          </span>
        )}
      </span>
    </Fila>
  )
}
