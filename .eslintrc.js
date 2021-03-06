module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  extends: "eslint:recommended",
  rules: {
    "no-unused-vars": 1,
    "no-redeclare": 2,
    "no-console": 0,
    "no-undef": 0,
    "no-extra-semi": 0,
  },
}
