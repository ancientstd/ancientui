import next from '../../packages/eslint-config/next.js';

export default [
  {
    ignores: [
      'node_modules',
      '.next/',
      '.source/',
      'next.config.mjs',
      'postcss.config.js',
    ],
  },
  ...next,
  {
    rules: {
      'no-console': 'off',
    },
  },
];
