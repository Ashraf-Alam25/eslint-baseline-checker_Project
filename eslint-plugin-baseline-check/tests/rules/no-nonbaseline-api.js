/**
 * @fileoverview Tests for no-nonbaseline-api rule
 * @author Your Name
 */

"use strict";

const rule = require("../../rules/no-nonbaseline-api");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
  }
});

ruleTester.run("no-nonbaseline-api", rule, {
  valid: [
    // Standard APIs that are in Baseline
    "document.querySelector('div');",
    "window.localStorage.getItem('key');",
    "Array.isArray([]);",
    
    // These are assumed supported if not found in the database
    "someObject.someProperty;",
    "customLibrary.customMethod();"
  ],
  invalid: [
    {
      code: "navigator.share({ title: 'Title', text: 'Text', url: 'https://example.com' });",
      errors: [
        { messageId: "nonBaselineApi", data: { feature: "navigator.share" } }
      ]
    },
    {
      code: "new Intl.DurationFormat('en', { style: 'long' }).format({ hours: 2 });",
      errors: [
        { messageId: "nonBaselineApi", data: { feature: "Intl.DurationFormat" } }
      ]
    },
    {
      code: "navigator.clipboard.writeText('Copied text');",
      errors: [
        { messageId: "nonBaselineApi", data: { feature: "navigator.clipboard.writeText" } }
      ]
    }
  ]
});