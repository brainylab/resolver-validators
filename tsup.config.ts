import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts', 'src/typebox.ts', '!./src/**/*.spec.ts'],
	clean: true,
	target: 'es2020',
	format: ['cjs', 'esm'],
	splitting: false,
	external: ['@sinclair/typebox'],
});
