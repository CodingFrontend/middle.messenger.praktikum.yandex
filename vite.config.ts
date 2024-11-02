import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: resolve(__dirname, '.'),
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context: {
        username: 'John Doe',
      },
    }),
  ],
  server: {
    port: 3000,
  },
});
