import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
//import Vuei18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import {dirname, resolve} from "node:path";

export default defineConfig({
  plugins: [vue(), vueJsx(),
  /*Vuei18nPlugin({
    include: resolve(
      dirname(fileURLToPath(import.meta.url)),
      "./src/locales/**"
    ),
  }),*/

],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
