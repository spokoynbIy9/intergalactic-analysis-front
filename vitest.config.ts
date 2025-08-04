/// <reference types="vitest" />
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default defineConfig((config) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const baseConfig = viteConfig(config) as UserConfig;

	return mergeConfig(
		baseConfig,
		defineConfig({
			test: {
				globals: true,
				environment: 'jsdom',
				setupFiles: 'vitest.setup.ts',
				include: [
					'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
				],
				exclude: ['tests/**', 'node_modules', 'dist'],
			},
		})
	);
});
