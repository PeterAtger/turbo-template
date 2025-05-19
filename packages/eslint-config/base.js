import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import stylisticJs from '@stylistic/eslint-plugin-js'
import importPlugin from "eslint-plugin-import";
import tsParser from '@typescript-eslint/parser';
import { rules as baseStyleRules } from './airbnb-flat/style.js';
import { rules as baseBestPracticesRules } from './airbnb-flat/best-practices.js';
import { rules as baseErrorsRules } from './airbnb-flat/errors.js';
import { rules as baseES6Rules } from './airbnb-flat/es6.js';
import { rules as baseImportsRules } from './airbnb-flat/imports.js';
import { rules as baseVariablesRules } from './airbnb-flat/variables.js';
import globals from "globals";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          modules: true
        },
        ecmaVersion: 'latest',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      '@stylistic/js': stylisticJs,
      'import': importPlugin,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
      },
      'import/resolver': {
        node: {
          extensions: ['.mjs', '.js', '.json', '.ts', '.d.ts'],
        },
      },
      'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    },
    rules: {
      ...baseStyleRules,
      ...baseBestPracticesRules,
      ...baseErrorsRules,
      ...baseES6Rules,
      ...baseImportsRules,
      ...baseVariablesRules,
      // Replace Airbnb 'brace-style' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
      'brace-style': 'off',
      '@stylistic/js/brace-style': baseStyleRules['brace-style'],

      "quotes": ["error", "single"],  // Enforce single quotes

      // disallow multiple empty lines, only one newline at the end, and no new lines at the beginning
      // https://eslint.org/docs/rules/no-multiple-empty-lines
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],

      "import/order": [
        "error",
        {
          "groups": [
            ["builtin", "external"],  // Built-in modules first, then external dependencies
            ["internal"],             // Then internal imports (if any)
            ["parent", "sibling", "index"],  // Finally, parent, sibling, and index imports
          ],
          "alphabetize": {
            "order": "asc", // Alphabetize imports within each group
            "caseInsensitive": true
          }
        }
      ],

      // Replace Airbnb 'camelcase' rule with '@typescript-eslint/naming-convention'
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
      camelcase: 'off',
      // The `@typescript-eslint/naming-convention` rule allows `leadingUnderscore` and `trailingUnderscore` settings. However, the existing `no-underscore-dangle` rule already takes care of this.
      '@typescript-eslint/naming-convention': [
        'error',
        // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        // Allow camelCase functions (23.2), and PascalCase functions (23.8)
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],

      // Replace Airbnb 'comma-dangle' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-dangle.md
      '@stylistic/js/comma-dangle': [
        baseStyleRules['comma-dangle'][0],
        {
          ...baseStyleRules['comma-dangle'][1],
        },
      ],

      // Replace Airbnb 'comma-spacing' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
      'comma-spacing': 'off',
      '@stylistic/js/comma-spacing': baseStyleRules['comma-spacing'],

      // Replace Airbnb 'default-param-last' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/default-param-last.md
      'default-param-last': 'off',
      '@typescript-eslint/default-param-last': baseBestPracticesRules['default-param-last'],

      // Replace Airbnb 'dot-notation' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': baseBestPracticesRules['dot-notation'],

      // Replace Airbnb 'func-call-spacing' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
      'func-call-spacing': 'off',
      '@stylistic/js/func-call-spacing': baseStyleRules['func-call-spacing'],

      // Replace Airbnb 'indent' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
      indent: 'off',
      '@stylistic/js/indent': baseStyleRules.indent,

      // Replace Airbnb 'keyword-spacing' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
      'keyword-spacing': 'off',
      '@stylistic/js/keyword-spacing': baseStyleRules['keyword-spacing'],

      // Replace Airbnb 'lines-between-class-members' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
      'lines-between-class-members': 'off',
      '@stylistic/js/lines-between-class-members': baseStyleRules['lines-between-class-members'],

      // Replace Airbnb 'no-array-constructor' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor': baseStyleRules['no-array-constructor'],

      // Replace Airbnb 'no-dupe-class-members' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': baseES6Rules['no-dupe-class-members'],

      // Replace Airbnb 'no-empty-function' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': baseBestPracticesRules['no-empty-function'],

      // Replace Airbnb 'no-extra-parens' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
      'no-extra-parens': 'off',
      '@stylistic/js/no-extra-parens': baseErrorsRules['no-extra-parens'],

      // Replace Airbnb 'no-extra-semi' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
      'no-extra-semi': 'off',
      '@stylistic/js/no-extra-semi': baseErrorsRules['no-extra-semi'],

      // Replace Airbnb 'no-implied-eval' and 'no-new-func' rules with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
      'no-implied-eval': 'off',
      'no-new-func': 'off',
      '@typescript-eslint/no-implied-eval': baseBestPracticesRules['no-implied-eval'],

      // Replace Airbnb 'no-loss-of-precision' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loss-of-precision.md
      'no-loss-of-precision': 'off',
      '@typescript-eslint/no-loss-of-precision': baseErrorsRules['no-loss-of-precision'],

      // Replace Airbnb 'no-loop-func' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loop-func.md
      'no-loop-func': 'off',
      '@typescript-eslint/no-loop-func': baseBestPracticesRules['no-loop-func'],

      // Replace Airbnb 'no-magic-numbers' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
      'no-magic-numbers': 'off',
      '@stylistic/js/no-magic-numbers': baseBestPracticesRules['no-magic-numbers'],

      // Replace Airbnb 'no-redeclare' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-redeclare.md
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': baseBestPracticesRules['no-redeclare'],

      // Replace Airbnb 'no-shadow' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': baseVariablesRules['no-shadow'],

      // Replace Airbnb 'space-before-blocks' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-blocks.md
      'space-before-blocks': 'off',
      '@stylistic/js/space-before-blocks': baseStyleRules['space-before-blocks'],

      // Replace Airbnb 'no-throw-literal' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
      'no-throw-literal': 'off',
      '@typescript-eslint/only-throw-error': baseBestPracticesRules['no-throw-literal'],

      // Replace Airbnb 'no-unused-expressions' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': baseBestPracticesRules['no-unused-expressions'],

      // Replace Airbnb 'no-unused-vars' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': baseVariablesRules['no-unused-vars'],

      // Replace Airbnb 'no-use-before-define' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': baseVariablesRules['no-use-before-define'],

      // Replace Airbnb 'no-useless-constructor' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': baseES6Rules['no-useless-constructor'],

      // Replace Airbnb 'quotes' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
      quotes: 'off',
      '@stylistic/js/quotes': baseStyleRules.quotes,

      // Replace Airbnb 'semi' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
      semi: 'off',
      '@stylistic/js/semi': baseStyleRules.semi,

      // Replace Airbnb 'space-before-function-paren' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
      'space-before-function-paren': 'off',
      '@stylistic/js/space-before-function-paren': baseStyleRules['space-before-function-paren'],

      // Replace Airbnb 'require-await' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
      'require-await': 'off',
      '@stylistic/js/require-await': baseBestPracticesRules['require-await'],

      // Replace Airbnb 'no-return-await' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
      'no-return-await': 'off',
      '@typescript-eslint/return-await': [baseBestPracticesRules['no-return-await'], 'in-try-catch'],

      '@typescript-eslint/no-unsafe-function-type': 'off',

      '@typescript-eslint/no-explicit-any': 'warn',

      "import/extensions": "off",

      'no-console': 'warn',

      // Replace Airbnb 'space-infix-ops' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-infix-ops.md
      'space-infix-ops': 'off',
      '@stylistic/js/space-infix-ops': baseStyleRules['space-infix-ops'],

      // Replace Airbnb 'object-curly-spacing' rule with '@typescript-eslint' version
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/object-curly-spacing.md
      'object-curly-spacing': 'off',
      '@stylistic/js/object-curly-spacing': baseStyleRules['object-curly-spacing'],

      // Append 'ts' and 'tsx' extensions to Airbnb 'import/no-extraneous-dependencies' rule
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
      'import/no-extraneous-dependencies': [
        baseImportsRules['import/no-extraneous-dependencies'][0],
        {
          ...baseImportsRules['import/no-extraneous-dependencies'][1],
          devDependencies: baseImportsRules[
            'import/no-extraneous-dependencies'
          ][1].devDependencies.reduce((result, devDep) => {
            const toAppend = [devDep];
            const devDepWithTs = devDep.replace(/\bjs(x?)\b/g, 'ts$1');
            if (devDepWithTs !== devDep) {
              toAppend.push(devDepWithTs);
            }
            return [...result, ...toAppend];
          }, []),
        },
      ],
    },
  }
];
