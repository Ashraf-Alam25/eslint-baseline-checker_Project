/**
 * @fileoverview ESLint plugin to check for non-Baseline web features
 * @author Your Name
 */

"use strict";

// Import all rules
const noNonbaselineApi = require("./rules/no-nonbaseline-api");
const noNonbaselineCss = require("./rules/no-nonbaseline-css");

// Export all the rules
module.exports = {
  rules: {
    "no-nonbaseline-api": noNonbaselineApi,
    "no-nonbaseline-css": noNonbaselineCss,
  },
  configs: {
    recommended: {
      plugins: ["baseline-check"],
      rules: {
        "baseline-check/no-nonbaseline-api": "warn",
        "baseline-check/no-nonbaseline-css": "warn",
      },
    },
    all: {
      plugins: ["baseline-check"],
      rules: {
        "baseline-check/no-nonbaseline-api": "warn",
        "baseline-check/no-nonbaseline-css": "warn",
      },
    },
  },
};