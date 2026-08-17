/* El botón que abre el resto de una grilla. Va con el hook useDesplegable.
   aria-expanded es lo que le dice a un lector de pantalla que este botón
   despliega contenido, y en qué estado está. */
export function VerMas({ abierto, onClick, mas, menos }) {
  return (
    <p className="mt-[clamp(1.6rem,2.6vw,2.4rem)]">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={abierto}
        className="cursor-pointer rounded-full border border-hair bg-white/4 px-[1.35rem] py-[.72rem] font-sans text-[.86rem] font-medium tracking-[.02em] text-paper transition-[background,border-color,color] duration-300 ease-soft hover:border-hair-lima hover:bg-lima/8 hover:text-lima"
      >
        {abierto ? menos : mas}
      </button>
    </p>
  )
}
