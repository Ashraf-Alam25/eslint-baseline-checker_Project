# ESLint Plugin Baseline Check

An ESLint plugin to enforce baseline compatibility for JavaScript and CSS code, ensuring your projects only use approved APIs and CSS features.

## Description

ESLint Plugin Baseline Check helps development teams maintain compatibility with a defined set of baseline APIs and CSS features. This plugin provides rules to catch usage of non-baseline JavaScript APIs and CSS properties that might not be supported in your target environments.

## Features

- 🔍 Detects usage of non-baseline JavaScript APIs
- 🎨 Identifies non-baseline CSS properties and values
- ⚙️ Customizable baseline configurations
- 📋 Clear error reporting with suggestions for alternatives
- 🧪 Comprehensive test coverage

## Installation

```bash
npm install eslint-plugin-baseline-check --save-dev
```

## Usage

Add the plugin to your ESLint configuration:

```js
module.exports = {
  plugins: ['baseline-check'],
  rules: {
    'baseline-check/no-nonbaseline-api': 'error',
    'baseline-check/no-nonbaseline-css': 'error'
  }
};
```

For more detailed usage instructions, see the [usage documentation](docs/usage.md).

## Rules

### `no-nonbaseline-api`

This rule prevents the use of JavaScript APIs that are not part of your defined baseline.

### `no-nonbaseline-css`

This rule checks CSS properties and values against your baseline CSS compatibility list.

## Example

```js
// This will trigger an error if Array.prototype.at is not in your baseline
const lastItem = myArray.at(-1); 

// This will trigger an error if CSS gap property is not in your baseline
element.style.gap = '10px';
```

## Configuration

You can configure your baseline APIs by creating a `.baselinerc` file or adding a `baseline` section to your `package.json`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Authors

[Ashraf Alam]
