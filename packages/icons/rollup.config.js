import babel from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

/** @type {import('rollup').RollupOptions[]} */
const config = [
  {
    input: 'src/index.js',
    external: [/@babel\/runtime/, 'react'],
    plugins: [
      resolve(),
      babel({
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      filesize(),
    ],
    output: [
      {
        file: 'dist/esm/index.js',
        format: 'esm',
        plugins: [terser()],
      },
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
        plugins: [terser()],
      },
      {
        file: 'dist/es/index.js',
        format: 'es',
        plugins: [terser()],
      },
      {
        file: 'dist/umd/index.js',
        format: 'umd',
        plugins: [terser()],
        name: 'AncientIcons',
        globals: {
          react: 'React',
          '@babel/runtime/helpers/extends': '_extends',
        },
      },
    ],
  },
];

export default config;
