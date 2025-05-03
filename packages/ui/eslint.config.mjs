import next from '../eslint-config/next.js';

export default [
  {
    ignores: ['scripts/**', 'node_modules/**'],
  },
  ...next,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
      'react/no-array-index-key': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      'import/no-relative-packages': 'off',
    },
  },
];
