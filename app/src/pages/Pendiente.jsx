import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Kicker } from '../components/ui/Kicker'
import { Button } from '../components/ui/Button'

/* Las páginas internas (servicios, tecnología, proyectos, nosotros, contacto)
   siguen en HTML estático en la raíz del repo. Se migran después del hero, que
   es lo que define el lenguaje visual del resto. */
export default function Pendiente({ titulo, origen }) {
  return (
    <section className="relative isolate overflow-hidden px-column pb-[clamp(48px,7vh,80px)] pt-[clamp(148px,20vh,220px)]">
      <div className="mx-auto max-w-maxw">
        <p className="mb-6 font-sans text-eyebrow font-semibold uppercase tracking-[.18em] text-muted-2">
          <Link to="/" className="hover:text-lima">
            Inicio
          </Link>
          <i className="mx-2 not-italic opacity-50">/</i>
          {titulo}
        </p>

        <Kicker>Sin migrar todavía</Kicker>

        <h1 className="mb-[1.4rem] mt-6 max-w-[20ch] text-hero font-normal">{titulo}</h1>

        <p className="max-w-[56ch] text-body-l font-normal text-read">
          Esta sección todavía vive en <code className="font-mono text-[.9em] text-read-hi">{origen}</code>,
          el HTML original. Se migra a React después de cerrar el diseño del hero.
        </p>

        <p className="mt-8">
          <Button href="/">
            <ArrowLeft className="h-[1.05em] w-[1.05em]" strokeWidth={2.2} aria-hidden />
            Volver al inicio
          </Button>
        </p>
      </div>
    </section>
  )
}
