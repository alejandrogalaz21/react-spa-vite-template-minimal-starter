// vite.config.ts
import path from 'path';
import checker from 'vite-plugin-checker';
import { loadEnv, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const PORT = 8081;

const env = loadEnv('all', process.cwd());

export default defineConfig({
  //base: env.VITE_BASE_PATH ?? '/',
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint:
        process.env.NODE_ENV !== 'production'
          ? {
              lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
            }
          : false,
      overlay: {
        position: 'tl',
        initialIsOpen: false,
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
      { find: '@/', replacement: path.resolve(__dirname, 'src', '') },
      { find: '@/core', replacement: path.resolve(__dirname, 'src/core') },
      { find: '@/store', replacement: path.resolve(__dirname, 'src/store') },
      { find: '@/redux', replacement: path.resolve(__dirname, 'src/redux') },
      { find: '@/layouts', replacement: path.resolve(__dirname, 'src/layouts') },
      { find: '@/services', replacement: path.resolve(__dirname, 'src/services') },
      { find: '@/types', replacement: path.resolve(__dirname, 'src/types') },
      { find: '@/mock', replacement: path.resolve(__dirname, 'src/_mock') },
      { find: '@/actions', replacement: path.resolve(__dirname, 'src/actions') },
      { find: '@/assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@/auth', replacement: path.resolve(__dirname, 'src/auth') },
      { find: '@/components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@/hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@/locales', replacement: path.resolve(__dirname, 'src/locales') },
      { find: '@/pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@/routes', replacement: path.resolve(__dirname, 'src/routes') },
      { find: '@/sections', replacement: path.resolve(__dirname, 'src/sections') },
      { find: '@/theme', replacement: path.resolve(__dirname, 'src/theme') },
      { find: '@/utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@/features', replacement: path.resolve(__dirname, 'src/features') },
      { find: '@/shared', replacement: path.resolve(__dirname, 'src/features/shared') },
    ],
  },
  server: { port: PORT, host: true },
  preview: { port: PORT, host: true },
});
