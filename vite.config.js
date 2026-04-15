import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        photos: resolve(__dirname, 'photos.html'),
        essays: resolve(__dirname, 'essays.html'),
        essayAiConvert: resolve(__dirname, 'essay-ai-convert.html'),
        essayFdaForAi: resolve(__dirname, 'essay-fda-for-ai.html'),
        essayWhoGetsToStudyAi: resolve(__dirname, 'essay-who-gets-to-study-ai.html'),
        essayMonomaniaAsProgress: resolve(__dirname, 'essay-monomania-as-progress.html'),
        essayWhyAiCantWriteLiterature: resolve(__dirname, 'essay-why-ai-cant-write-literature.html'),
      },
    },
  },
});
