# ESLint Plugin Baseline Check

This package provides ESLint rules to detect usage of web features that are not supported in Baseline browsers.

## Installation

```
npm install eslint-plugin-baseline-check --save-dev
```

## Usage

Add to your `.eslintrc.js`:

```js
module.exports = {
  plugins: ['baseline-check'],
  extends: ['plugin:baseline-check/recommended']
};
```

Or configure individual rules:

```js
module.exports = {
  plugins: ['baseline-check'],
  rules: {
    'baseline-check/no-nonbaseline-api': 'warn',
    'baseline-check/no-nonbaseline-css': 'warn'
  }
};
```