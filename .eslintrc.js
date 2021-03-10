const { resolve } = require("path");

module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    commonjs: true
  },
  extends: ["eslint:recommended"],
  ignorePatterns: [
    "node_modules",
    "dist",
    "lib",
    "types",
    "*.d.ts",
    "__snapshots__",
    "coverage"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: ["prettier"],
  rules: {
    "unicode-bom": ["error", "never"],
    "prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn"
  },
  reportUnusedDisableDirectives: true,

  overrides: [
    {
      files: ["build/**/*.js", "config/rollup.js"],
      parserOptions: {
        sourceType: "module"
      }
    },
    {
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
      files: "**/*.ts",
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: resolve(__dirname, "tsconfig.json"),
        ecmaVersion: 2020
      },
      plugins: ["@typescript-eslint"],
      rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off"
      }
    },
    {
      env: {
        jest: true
      },
      files: "tests/**/*.ts"
    }
  ]
};
