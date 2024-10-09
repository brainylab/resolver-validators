import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/typebox.ts', '!**/*.spec.ts'],
	clean: true,
	target: 'es2020',
	format: ['cjs', 'esm'],
	external: ['@sinclair/typebox'],
});
