module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['eslint-plugin'],
  rules: {
    'eslint-plugin/prefer-placeholders': 'warn',
    'eslint-plugin/prefer-replace-text': 'warn',
    'eslint-plugin/report-message-format': ['warn', '[^a-z].*\\.$'],
    'eslint-plugin/require-meta-docs-description': [
      'warn',
      { pattern: '^(Enforce|Require|Disallow) .+[^. ]$' },
    ],
    'internal-rules/no-invalid-meta': 'off',
    'no-undef': 'off',
  },
};
