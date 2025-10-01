/**
 * @fileoverview Tests for no-nonbaseline-css rule
 * @author Your Name
 */

"use strict";

const rule = require("../../rules/no-nonbaseline-css");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  }
});

ruleTester.run("no-nonbaseline-css", rule, {
  valid: [
    // Standard CSS properties that are in Baseline
    "const styles = css`color: red; background-color: blue;`;",
    "element.style.cssText = 'display: flex; margin: 10px;';",
    "const StyledDiv = styled.div`padding: 20px; font-size: 16px;`;",
    // JSX with standard CSS properties
    "<div style={{ color: 'red', backgroundColor: 'blue' }} />",
  ],
  invalid: [
    // CSS :has() selector (non-Baseline)
    {
      code: "const styles = css`div:has(> span) { color: red; }`;",
      errors: [
        { messageId: "nonBaselineCssSelector", data: { selector: ":has" } }
      ]
    },
    // CSS container queries (non-Baseline)
    {
      code: "const StyledDiv = styled.div`container-type: inline-size; container-name: sidebar;`;",
      errors: [
        { messageId: "nonBaselineCssProperty", data: { property: "container-type" } },
        { messageId: "nonBaselineCssProperty", data: { property: "container-name" } }
      ]
    },
    // JSX with non-baseline CSS property
    {
      code: "<div style={{ aspectRatio: '16/9' }} />",
      errors: [
        { messageId: "nonBaselineCssProperty", data: { property: "aspect-ratio" } }
      ]
    }
  ]
});