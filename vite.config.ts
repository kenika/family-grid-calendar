import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/family-grid-calendar-card.ts'),
      output: {
        entryFileNames: 'family-grid-calendar.js',
        format: 'es',
        inlineDynamicImports: true,
      },
    },
  },
});
