/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react', '@typescript-eslint', 'autofix', 'react-hooks'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    indent: 2,
    'arrow-body-style': ['error', 'as-needed'],
    'autofix/no-debugger': 'error',
    'prettier/prettier': ['error'],
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/prefer-stateless-function': [1],
    'react/static-property-placement': [1, 'property assignment'],
    'react/prop-types': 'off',
    'react/self-closing-comp': ['error', { component: true, html: true }],
    'react/react-in-jsx-scope': 'off',
    'no-console': [
      'error',
      {
        allow: ['error'],
      },
    ],
    'comma-dangle': [2, 'always-multiline'],
    'consistent-return': 'off',
    'dot-notation': 'error',
    'linebreak-style': 'off',
    'no-multi-assign': 'off',
    'no-multiple-empty-lines': 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'no-trailing-spaces': 'off',
    'no-use-before-define': 'off',
    'object-curly-newline': 'off',
    'object-curly-spacing': [2, 'always'],
    'no-unused-vars': 'error',
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
      },
    ],
    'comment spaced-comment': 'off',
    'max-len': 'warn',
    'import/no-useless-path-segments': 'warn',
    'import/prefer-default-export': 'warn',
    'react/self-closing-comp': 'warn',
    'autofix/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '@/**/**',
            group: 'parent',
            position: 'before',
          },
        ],
        alphabetize: { order: 'asc' },
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../'],
      },
    ],
  },
};
