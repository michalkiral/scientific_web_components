import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import storybookPlugin from 'eslint-plugin-storybook';

export default [
  js.configs.recommended,
  
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        customElements: 'readonly',
        HTMLElement: 'readonly',
        Event: 'readonly',
        CustomEvent: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        alert: 'readonly',
        getComputedStyle: 'readonly',
        performance: 'readonly',
        cytoscape: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'no-prototype-builtins': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '../shared',
              message: 'Import specific modules from ../shared/styles/* or ../shared/utils/* instead of the shared barrel to keep bundles predictable.',
            },
            {
              name: '../shared/index.js',
              message: 'Import specific modules from ../shared/styles/* or ../shared/utils/* instead of the shared barrel to keep bundles predictable.',
            },
          ],
        },
      ],
      
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/no-misused-promises': 'off', 
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
    },
  },
  
  {
    files: ['**/*_test.ts', '**/*.test.ts', '**/*.spec.ts', '**/test/**/*.ts'],
    languageOptions: {
      globals: {
        suite: 'readonly',
        test: 'readonly',
        setup: 'readonly',
        teardown: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  
  {
    files: ['*.config.js', '*.config.cjs', 'rollup.config.js', 'web-test-runner.config.js'],
    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
  },
  
  {
    files: ['**/*.stories.ts', '.storybook/**/*.js', '.storybook/**/*.ts'],
    plugins: {
      storybook: storybookPlugin,
    },
    rules: {
      ...storybookPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  
  {
    ignores: [
      'Build/**',
      'node_modules/**',
      'docs/**',
      'storybook-static/**',
      '*.d.ts',
      'custom-elements.json',
    ],
  },
];
