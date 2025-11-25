import path from 'node:path';
import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';

const projectRoot = process.cwd();

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-onboarding',
    '@storybook/addon-vitest',
  ],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: [
          {
            find: /^~(.+)/,
            replacement: path.join(projectRoot, 'node_modules/$1'),
          },
          {
            find: /^src(.+)/,
            replacement: path.join(projectRoot, 'src/$1'),
          },
          { find: '@/', replacement: path.resolve(projectRoot, 'src') },
          { find: '@/store', replacement: path.resolve(projectRoot, 'src/store') },
          { find: '@/redux', replacement: path.resolve(projectRoot, 'src/redux') },
          { find: '@/layouts', replacement: path.resolve(projectRoot, 'src/layouts') },
          { find: '@/services', replacement: path.resolve(projectRoot, 'src/services') },
          { find: '@/types', replacement: path.resolve(projectRoot, 'src/types') },
          { find: '@/mock', replacement: path.resolve(projectRoot, 'src/_mock') },
          { find: '@/actions', replacement: path.resolve(projectRoot, 'src/actions') },
          { find: '@/assets', replacement: path.resolve(projectRoot, 'src/assets') },
          { find: '@/auth', replacement: path.resolve(projectRoot, 'src/auth') },
          { find: '@/components', replacement: path.resolve(projectRoot, 'src/components') },
          { find: '@/hooks', replacement: path.resolve(projectRoot, 'src/hooks') },
          { find: '@/locales', replacement: path.resolve(projectRoot, 'src/locales') },
          { find: '@/pages', replacement: path.resolve(projectRoot, 'src/pages') },
          { find: '@/routes', replacement: path.resolve(projectRoot, 'src/routes') },
          { find: '@/sections', replacement: path.resolve(projectRoot, 'src/sections') },
          { find: '@/theme', replacement: path.resolve(projectRoot, 'src/theme') },
          { find: '@/utils', replacement: path.resolve(projectRoot, 'src/utils') },
          { find: '@/features', replacement: path.resolve(projectRoot, 'src/features') },
          { find: '@/shared', replacement: path.resolve(projectRoot, 'src/features/shared') },
        ],
      },
    });
  },
};

export default config;
