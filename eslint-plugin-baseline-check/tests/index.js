/**
 * @fileoverview Entry point for ESLint plugin tests
 * @author Your Name
 */

"use strict";

const assert = require("assert");
const plugin = require("../index");

// Test that plugin exports the expected rules
describe("eslint-plugin-baseline-check", function() {
  it("should export all rules", function() {
    assert.strictEqual(typeof plugin.rules["no-nonbaseline-api"], "object");
    assert.strictEqual(typeof plugin.rules["no-nonbaseline-css"], "object");
  });

  it("should have recommended config", function() {
    assert.strictEqual(typeof plugin.configs.recommended, "object");
    assert.strictEqual(typeof plugin.configs.recommended.plugins, "object");
    assert.strictEqual(plugin.configs.recommended.plugins[0], "baseline-check");
  });
});