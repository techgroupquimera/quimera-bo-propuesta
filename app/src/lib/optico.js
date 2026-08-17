/* ── Peso óptico, no caja ──
   Limitar por alto y ancho a la vez deja a los lockups largos ocupando el
   triple de mancha que a los compactos: MONOPOL INDUSTRIAL salía 200×50 y TU
   ESTILO 70×50 — el mismo alto, tres veces el área. Por eso unos se leían
   grandes y otros chiquitos.

   Acá el alto sale de la proporción de cada logo para que el ÁREA quede pareja:
   factor = √(2·alto/ancho), calibrado para que un logo 2:1 dé exactamente 1.

   El techo (1.40) existe para que un logo casi cuadrado no haga la tira el
   doble de alta; el piso (.40) es una red y en la práctica no llega a actuar
   porque antes topa el max-width. Con estos valores el área más grande es
   1,17× la más chica — venía siendo 2× con topes de caja.

   Lo usan la marquesina de marcas (`ui/Marcas.jsx`) y los paneles de unidades
   de /nosotros, que es el mismo problema: cinco logos uno al lado del otro, de
   casi cuadrado (Sapien9, 0.99:1) a diez a uno (Tech Agents, 10.1:1). */
const OPTICO_MIN = 0.4
const OPTICO_MAX = 1.4

export const factorOptico = (ancho, alto) =>
  Math.min(OPTICO_MAX, Math.max(OPTICO_MIN, Math.sqrt((2 * alto) / ancho)))
