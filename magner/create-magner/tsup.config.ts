import { defineConfig } from 'tsup';
import path from 'path';

export default defineConfig({
  entry: [path.join(__dirname, 'index.ts')],
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: path.join(__dirname, 'dist'),
});
