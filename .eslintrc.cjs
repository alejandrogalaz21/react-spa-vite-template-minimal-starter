module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  plugins: ['react-refresh', 'react-hooks', '@typescript-eslint'],

  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
  ],

  rules: {
    // --- Typescript ---
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'warn',

    // --- React refresh (vite) ---
    'react-refresh/only-export-components': 'off',

    // --- General ---
    'no-console': 'off', // puedes ponerlo en warn si quieres
    'no-unused-vars': 'off', // ya lo maneja TS
    'no-undef': 'off', // TS se encarga

    // --- React hooks ---
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },

  ignorePatterns: ['dist', 'build', 'node_modules', '*.config.*', '*.d.ts'],
};
