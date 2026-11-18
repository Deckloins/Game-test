const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

test("browser achievement code contains no eval and supports declarative rules", () => {
  const source = fs.readFileSync(
    "public/js/Achievements.js",
    "utf8"
  );
  assert.doesNotMatch(source, /\beval\s*\(/);

  const context = { window: {}, fetch: async () => ({ ok: true, json: async () => [] }) };
  vm.runInNewContext(source, context);
  const evaluator = vm.runInNewContext(
    "AchievementRuleEvaluator",
    context
  );
  assert.equal(evaluator.evaluate({ type: "score", operator: ">=", value: 2 }, { score: 2 }), true);
});

test("achievement page uses a query user ID instead of a shared hard-coded ID", () => {
  const source = fs.readFileSync("public/js/showAchievements.js", "utf8");
  assert.doesNotMatch(source, /user-achievements\/2/);
  assert.match(source, /URLSearchParams/);
  assert.doesNotMatch(source, /fetch\(['"]\/api\/v1\/achievements/);
});
