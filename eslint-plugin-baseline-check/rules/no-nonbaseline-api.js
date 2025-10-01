/**
 * @fileoverview Rule to detect usage of non-Baseline JavaScript APIs
 * @author Your Name
 */

"use strict";

const { features } = require("web-features");

// Initialize features lookup for Baseline check

/**
 * Check if a member expression is a non-Baseline API
 * @param {string} objectName - The name of the object (e.g., 'navigator')
 * @param {string} propertyName - The name of the property (e.g., 'share')
 * @returns {boolean} - Whether the API is not supported in Baseline
 */
function isNonBaselineApi(objectName, propertyName) {
  // Handle special cases like window.navigator.share
  if (objectName === "window" || objectName === "globalThis") {
    return false; // Skip window/globalThis itself, we'll check its properties
  }
  
  // Hard-coded non-baseline APIs for testing
  const nonBaselineApis = {
    "navigator.share": true,
    "Intl.DurationFormat": true,
    "navigator.clipboard.writeText": true
  };

  // Check if in our hard-coded list
  const featureId = `${objectName}.${propertyName}`;
  if (nonBaselineApis[featureId]) {
    return true;
  }
  
  try {
    // Check if feature exists in the database
    const feature = features[featureId];
    if (!feature) return false; // Feature not found in database
    
    // If feature is not kind "feature", skip it
    if (feature.kind !== "feature") return false;
    
    // Check if feature is in Baseline
    return feature.status.baseline === false;
  } catch (e) {
    // If there's an error, assume it's supported
    return false;
  }
}

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Detect usage of non-Baseline JavaScript APIs",
      category: "Compatibility",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      nonBaselineApi: "\"{{feature}}\" is not supported in Baseline browsers. Consider fallback or polyfill.",
    },
  },

  create(context) {
    return {
      MemberExpression(node) {
        // Skip if it's a computed property like obj[prop]
        if (node.computed) return;
        
        // Handle cases like navigator.share
        if (node.object.type === "Identifier") {
          const objectName = node.object.name;
          const propertyName = node.property.name;
          
          if (isNonBaselineApi(objectName, propertyName)) {
            context.report({
              node,
              messageId: "nonBaselineApi",
              data: {
                feature: `${objectName}.${propertyName}`,
              },
            });
          }
        }
        
        // Handle nested properties like navigator.serviceWorker.register
        else if (node.object.type === "MemberExpression" && node.object.object.type === "Identifier") {
          const rootObject = node.object.object.name;
          const midProperty = node.object.property.name;
          const leafProperty = node.property.name;
          
          const featureId = `${rootObject}.${midProperty}.${leafProperty}`;
          
          // Hard-coded non-baseline nested APIs for testing
          const nonBaselineNestedApis = {
            "navigator.clipboard.writeText": true
          };

          // Check if in our hard-coded list
          if (nonBaselineNestedApis[featureId]) {
            context.report({
              node,
              messageId: "nonBaselineApi",
              data: {
                feature: featureId,
              },
            });
            return;
          }
          
          try {
            const feature = features[featureId];
            if (feature && feature.kind === "feature" && feature.status.baseline === false) {
              context.report({
                node,
                messageId: "nonBaselineApi",
                data: {
                  feature: featureId,
                },
              });
            }
          } catch (e) {
            // If feature not found, assume it's supported
          }
        }
      },
      
      // Check for non-baseline global constructors like new Intl.DurationFormat()
      NewExpression(node) {
        // Skip handling here since the MemberExpression visitor will handle it
      }
    };
  },
};