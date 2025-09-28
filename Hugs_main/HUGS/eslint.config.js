import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { ESLint } from 'eslint';

export default {
  parser: '@typescript-eslint/parser', // Use the TypeScript parser
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    js.configs.recommended, 
    'plugin:@typescript-eslint/recommended', // Adding TypeScript ESLint rules
    'plugin:react/recommended', // Add React plugin rules
    'plugin:react-hooks/recommended', // Add React Hooks rules
  ],
  plugins: [
    'react-hooks', 
    'react-refresh',
    '@typescript-eslint', // TypeScript plugin
  ],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'], // Apply TypeScript rules to .ts and .tsx files only
      rules: {
        // Custom TypeScript rules or overrides
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  globals: {
    ...globals.browser,
  },
  ignorePatterns: ['dist'], // Ignore dist directory
};
