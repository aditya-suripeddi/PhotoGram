import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // react plugin

  // when we run app on local, it should start in browser
  server: {
    open: true,
    port: 3000,
  },

  
  // Add the following code to the vite.config.ts so your app can resolve paths without error
  // https://ui.shadcn.com/docs/installation/vite

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
});


