# eslint-plugin-baseline-check

ESLint plugin to check for non-Baseline web features using the `web-features` npm package.

This plugin helps ensure your web application uses only features that are supported in Baseline browsers, improving compatibility across platforms.

## What is Baseline?

[Baseline](https://web.dev/baseline/) is a minimal browser feature set that works across major browser engines including Chrome, Edge, Firefox, and Safari. Using Baseline features ensures your web app works reliably for the vast majority of users.

## Installation

```bash
npm install eslint-plugin-baseline-check --save-dev
```

## Usage

Add `baseline-check` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "plugins": ["baseline-check"]
}
```

Then configure the rules you want to use:

```json
{
  "rules": {
    "baseline-check/no-nonbaseline-api": "warn",
    "baseline-check/no-nonbaseline-css": "warn"
  }
}
```

Or, use the recommended configuration which enables all rules:

```json
{
  "extends": ["plugin:baseline-check/recommended"]
}
```

## Rules

This plugin provides the following rules:

### no-nonbaseline-api

Checks JavaScript code for usage of APIs that are not supported in Baseline browsers.

```js
// ❌ Not Baseline
navigator.share({ title: 'My Page', url: window.location.href });

// ❌ Not Baseline
new Intl.DurationFormat('en', { style: 'long' });

// ✅ Baseline
document.querySelector('.element');
localStorage.getItem('key');
```

### no-nonbaseline-css

Checks CSS (in JavaScript strings, template literals, and JSX) for properties and selectors that are not supported in Baseline browsers.

```js
// ❌ Not Baseline - :has() selector
const styles = css`
  div:has(> span) {
    color: red;
  }
`;

// ❌ Not Baseline - container queries
const Container = styled.div`
  container-type: inline-size;
`;

// ❌ Not Baseline - aspect-ratio
<div style={{ aspectRatio: '16/9' }} />;

// ✅ Baseline
const styles = css`
  display: flex;
  color: blue;
`;
```

## Customization

You can adjust the rule severity as needed:

```json
{
  "rules": {
    "baseline-check/no-nonbaseline-api": "error",
    "baseline-check/no-nonbaseline-css": "warn"
  }
}
```

## For Development

To build and test this plugin locally:

```bash
# Install dependencies
npm install

# Run tests
npm test

# Lint the plugin code
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT