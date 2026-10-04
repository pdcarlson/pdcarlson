import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

// eslint-config-next still ships the old config format, so it goes through FlatCompat
const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const files = ['**/*.{js,mjs,ts,tsx}'];

const eslintConfig = [
  // infra is not part of the Next app. The lambda is its own package and the
  // CloudFront function runs on CloudFront's runtime.
  { ignores: ['.next/**', 'out/**', 'next-env.d.ts', 'infra/**'] },

  ...compat
    .extends('next/core-web-vitals', 'next/typescript')
    .map((config) => ({ ...config, files })),

  { files, linterOptions: { reportUnusedDisableDirectives: 'error' } },
];

export default eslintConfig;
