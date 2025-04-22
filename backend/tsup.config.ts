import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
        format: ['cjs'],
        platform: 'node',
        sourcemap: true, 
        clean: true,
        tsconfig: './tsconfig.json',
        entry :['src/index.ts'],
        outDir:'dist',
        treeshake: true,
        ...options,
}));