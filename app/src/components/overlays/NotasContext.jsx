import { createContext, useContext, useMemo, useState } from 'react'

const Ctx = createContext({ abierto: false, abrir: () => {}, alternar: () => {}, cerrar: () => {} })

export function NotasProvider({ children }) {
  const [abierto, setAbierto] = useState(false)

  const valor = useMemo(
    () => ({
      abierto,
      abrir: () => setAbierto(true),
      cerrar: () => setAbierto(false),
      alternar: () => setAbierto((v) => !v),
    }),
    [abierto],
  )

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}

export const useNotas = () => useContext(Ctx)
