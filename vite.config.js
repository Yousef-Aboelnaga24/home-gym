import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'Home Gym Store',
        short_name: 'GymStore',
        description: 'Modern and responsive E-commerce website for selling gym equipment',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone'
      }
    })
  ],
});
