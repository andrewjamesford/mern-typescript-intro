import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      srcDirectory: 'app',
    }),
    viteReact(),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
})
