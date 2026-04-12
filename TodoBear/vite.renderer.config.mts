import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular'
import { resolve } from 'path'

// https://vitejs.dev/config
export default defineConfig({
  root: 'src/renderer',
  plugins: [
    angular({
      tsconfig: resolve(__dirname, 'src/renderer/tsconfig.app.json'),
    }),
  ],
});
