module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  rules: {
    "comma-dangle": 0,
    "consistent-return": 0,
    "no-underscore-dangle": 0,
    "func-names": 0,
    "no-unused-expressions": 0,
    "no-console": 0,
    "import/prefer-default-export": 0,
    "global-require": 0,
    "implicit-arrow-linebreak": 0,
    "function-paren-newline": 0,
    "no-new": 0
  }
};
