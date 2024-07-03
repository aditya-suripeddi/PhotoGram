import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"


// configure vite
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // configure vite to use react plugin

  server: {
    open: true,
    port: 3007,
  },

  // step4: "resolve path without errors"
  // https://ui.shadcn.com/docs/installation/vite
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

})



