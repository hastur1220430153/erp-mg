module.exports = {
  // extends: ['prettier'],
  extends: ['soybeanjs/vue'],
  overrides: [
    {
      files: ['./scripts/*.ts'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['*.vue'],
      rules: {
        'no-undef': 'off', // use tsc to check the ts code of the vue
        'vue/no-setup-props-destructure': 'off', // wait to fix this rule
      },
    },
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '**/*.html'],
  settings: {
    'import/core-modules': ['uno.css', '~icons/*', 'virtual:svg-icons-register'],
  },
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'vue-router',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'pinia',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'naive-ui',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/constants',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/config',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/settings',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/plugins',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/layouts',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/views',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/router',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/service',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/store',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/context',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/composables',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/hooks',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/utils',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/assets',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['vue', 'vue-router', 'pinia', 'naive-ui'],
      },
    ],
    'object-property-newline': 'off',
    'prettier/prettier': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-undef': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-empty-pattern': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-constant-condition': 'off',
    'no-empty-function': 'off',
    'no-unused-expressions': 'off',
    'no-unreachable': 'off',
    'no-console': 'off',
    'import/order': 'off',
    'max-params': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'vue/require-default-prop': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    'array-callback-return': 'off',
    'no-plusplus': 'off',
    'no-warning-comments': 'off',
  },
}
