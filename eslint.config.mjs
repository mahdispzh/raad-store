// eslint.config.mjs

import { defineConfig, globalIgnores } from "eslint/config";

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import eslintConfigPrettier from "eslint-config-prettier";

import storybook from "eslint-plugin-storybook";
import unusedImports from "eslint-plugin-unused-imports";
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  ...storybook.configs["flat/recommended"],

  eslintConfigPrettier,

  {
    plugins: {
      "unused-imports": unusedImports,
    },

    rules: {
      "unused-imports/no-unused-imports": "error",

      "import/order": "off",

      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
        },
      ],

      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          reservedFirst: true,
        },
      ],
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
