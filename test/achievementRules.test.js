const test = require("node:test");
const assert = require("node:assert/strict");
const { validateRule, evaluateRule } = require("../src/services/achievementRules");

test("validates declarative score rules", () => {
  assert.equal(validateRule({ type: "score", operator: ">=", value: 10 }), true);
  assert.equal(validateRule({ type: "score", operator: ">=", value: -1 }), false);
  assert.equal(validateRule({ type: "score", operator: "JS", value: 10 }), false);
});

test("evaluates score rules without executable code", () => {
  const rule = { type: "score", operator: ">=", value: 10 };
  assert.equal(evaluateRule(rule, { score: 9 }), false);
  assert.equal(evaluateRule(rule, { score: 10 }), true);
  assert.equal(evaluateRule(null, { score: 10 }), false);
});
