import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    /* El pre-render lo necesita: de acá saca, para cada página, cuál es el
       chunk de su ruta, y le mete el <link rel="modulepreload"> a ese HTML.
       Sin eso el chunk se descubre recién cuando React llega a la ruta, o sea
       un viaje de ida y vuelta después del bundle. */
    manifest: true,

    /* Chrome, Firefox, Safari y Edge de los últimos años. El objetivo por
       defecto de Vite ('baseline-widely-available') transpila cosas que estos
       navegadores entienden nativas: sin `??=`, sin campos privados de clase,
       sin `at()`. Son varios KB de ayudantes que se bajan y se ejecutan en cada
       carga para navegadores que el sitio no tiene. */
    target: ['chrome111', 'edge111', 'firefox111', 'safari16.4'],

    rollupOptions: {
      output: {
        /* React y el router en un chunk aparte del código del sitio.

           No es por tamaño —el total es el mismo— sino por cache: son la parte
           que no cambia entre despliegues. Con todo junto, tocar una coma de
           una sección invalida también los 180 KB de React y quien ya había
           entrado los vuelve a bajar. */
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router)/.test(id)) {
            return 'react'
          }
        },
      },
    },
  },
})
