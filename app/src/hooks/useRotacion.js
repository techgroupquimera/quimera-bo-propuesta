import { useEffect, useState } from 'react'
import { useInView } from './useInView'
import { useSinMovimiento } from './useSinMovimiento'

/* Un selector que pasa solo de un ítem al siguiente hasta que alguien elige.

   La rotación se frena en las cuatro situaciones donde molestaría más de lo que
   aporta:

   · alguien eligió — se apaga para siempre. Volver a moverse sería pisarle la
     elección a quien acaba de hacerla;
   · el mouse está encima o hay foco de teclado adentro — está leyendo;
   · la sección todavía no entró en pantalla — si no, al llegar ya arrancó por
     la mitad y las animaciones de entrada no se ven nunca;
   · prefers-reduced-motion — ni se arma el temporizador.

   Lo usan el stack de /tecnologia y el mapa de /nosotros. Vive acá porque son
   cuatro condiciones de parada fáciles de olvidar al copiarlas.

   Devuelve `pausar` para esparcir en el contenedor y `ref` para el observer;
   `corriendo` sirve para el indicador de progreso, que tiene que frenarse con
   la rotación o miente. */
export function useRotacion(cantidad, ronda) {
  const [activo, setActivo] = useState(0)
  const [elegido, setElegido] = useState(false)
  const [pausa, setPausa] = useState(false)
  const sinMovimiento = useSinMovimiento()
  const [ref, aLaVista] = useInView()

  const corriendo = !elegido && !pausa && !sinMovimiento && aLaVista

  useEffect(() => {
    if (!corriendo) return
    const t = setInterval(() => setActivo((i) => (i + 1) % cantidad), ronda)
    return () => clearInterval(t)
  }, [corriendo, cantidad, ronda])

  return {
    activo,
    corriendo,
    ref,
    elegir: (i) => {
      setActivo(i)
      setElegido(true)
    },
    pausar: {
      onMouseEnter: () => setPausa(true),
      onMouseLeave: () => setPausa(false),
      onFocusCapture: () => setPausa(true),
      onBlurCapture: () => setPausa(false),
    },
  }
}
