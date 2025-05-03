import library from '../eslint-config/library.js';

export default [
  ...library,
  {
    ignores: ['dist/', 'optimized/', 'scripts/', 'src/', 'node_modules/'],
  },
];
