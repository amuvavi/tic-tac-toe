import { defineConfig } from 'vite';

export default defineConfig({
  base: '/tic-tac-toe/',
  root: 'src', 
  build: {
    outDir: '../dist', 
  },
});
