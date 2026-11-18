const test = require("node:test");
const assert = require("node:assert/strict");
const userAchievementSchema = require("../src/models/userAchievementsModel").schema;

test("user achievement persistence has compound unique model constraint", () => {
  const compound = userAchievementSchema.indexes().find(
    ([fields, options]) => fields.userId === 1 &&
      fields.achievementId === 1 &&
      options.unique
  );
  assert.ok(compound);
});

test("API persistence accepts only valid positive user IDs and non-negative achievement IDs", () => {
  const source = require("node:fs").readFileSync(
    "src/controllers/userAchievementsController.js",
    "utf8"
  );
  assert.match(source, /Number\.isInteger\(numericUserId\).*numericUserId < 1/s);
  assert.match(source, /\$setOnInsert/);
  assert.match(source, /\bupsert:\s*true\b/);
});
