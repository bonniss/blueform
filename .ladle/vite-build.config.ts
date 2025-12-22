import { defineConfig } from 'vite';

/**
 * Vite configuration used **exclusively** for Ladle static builds.
 *
 * This file exists to prevent Ladle from automatically picking up
 * the Vite config at the project root.
 *
 * In this project, the root Vite config is configured in **library mode**.
 * If Ladle is allowed to use it, `ladle build` would incorrectly
 * build the library instead of a static Story UI.
 *
 * By explicitly passing this file via:
 *
 *   ladle build --viteConfig .ladle/vite-build.config.ts
 *
 * ensure that Ladle performs a normal static site build,
 * completely isolated from the library build configuration.
 *
 * @see https://ladle.dev/docs/cli/#build-command
 * @see https://vite.dev/config/
 */
export default defineConfig({});
