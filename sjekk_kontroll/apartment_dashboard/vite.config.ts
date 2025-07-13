import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
        type: 'module',
      },
      srcDir: 'src',
      strategies: 'injectManifest',
      injectRegister: 'script',
      injectManifest: {
        injectionPoint: undefined
      },
      registerType: 'autoUpdate',
      manifest: {
        name: 'Apartment Dashboard',
        short_name: 'Apartment',
        description: 'Control panel for verified apartments',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/assets/s_logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/s_logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      }
    })
  ],
});