/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import summary from 'rollup-plugin-summary';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import path from 'path';

const components = [
  {
    name: 'Button',
    input: 'src/Button/index.js', // Adjust to your main entry file for Button
    output: 'Build/Button/my-button.bundled.js', // Output file for Button
  },
  {
    name: 'Form',
    input: 'src/Form/index.js', // Adjust to your main entry file for Form
    output: 'Build/Form/my-form.bundled.js', // Output file for Form
  },
];

export default components.map(({ name, input, output }) => ({
  input,
  output: {
    file: output,
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({ preventAssignment: false, 'Reflect.decorate': 'undefined' }),
    resolve(),
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/, // Adjust property mangling as needed
        },
      },
    }),
    summary(),
  ],
}));