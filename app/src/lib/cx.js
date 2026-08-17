/** Une clases ignorando falsy. Sin dependencias — no hace merge de conflictos:
 *  si dos clases pelean, gana la última que Tailwind emitió, no la última acá. */
export const cx = (...partes) => partes.filter(Boolean).join(' ')
