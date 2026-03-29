/**
 * Vitest Configuration
 * Referensi: https://vitest.dev/config/
 */

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'json-summary', 'lcov'],
      exclude: [
        'node_modules/',
        'src/main.jsx',
        'dist/',
      ],
      all: false,
      lines: 50,
      functions: 50,
      branches: 50,
      statements: 50,
    },
  },
});
