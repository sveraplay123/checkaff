import js from '@eslint/js';

export default [
  {
    ignores: ['dist/**']
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        document: 'readonly',
        console: 'readonly',
        window: 'readonly',
        fetch: 'readonly',
        MutationObserver: 'readonly'
      }
    }
  }
];
