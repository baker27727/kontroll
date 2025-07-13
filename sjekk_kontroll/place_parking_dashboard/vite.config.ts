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
        name: 'Public Place',
        short_name: 'Public',
        description: 'Control panel for verified public places',
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