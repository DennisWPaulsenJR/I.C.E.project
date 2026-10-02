"use strict";
function expression(input = {}) { return { expressionId: input.expressionId, sourceUnitRef: input.sourceUnitRef, sourceText: input.sourceText, entityRef: input.entityRef }; }
function render(value, options = {}) { return { ...value, mode: options.mode, createsComprehension: false, sourceMutated: false }; }
module.exports = { expression, render };
