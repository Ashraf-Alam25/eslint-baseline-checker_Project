module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["baseline-check"],
  extends: [
    "plugin:baseline-check/recommended"
  ],
  rules: {
    // Use correct rule names that match the exports in index.js
    "baseline-check/no-nonbaseline-api": "error",
    "baseline-check/no-nonbaseline-css": "error",
    // Disable standard rules for demonstration purposes
    "no-undef": "off",
    "no-unused-vars": "off"
  },
  // Add this section for debugging
  settings: {
    debug: true
  }
};