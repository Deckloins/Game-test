function validateRule(rule) {
  if (!rule || typeof rule !== "object") return false;
  return rule.type === "score" &&
    rule.operator === ">=" &&
    Number.isInteger(rule.value) &&
    rule.value >= 0;
}

function evaluateRule(rule, gameState) {
  if (!validateRule(rule) || !gameState || typeof gameState.score !== "number") {
    return false;
  }
  if (rule.type === "score" && rule.operator === ">=") {
    return gameState.score >= rule.value;
  }
  return false;
}

module.exports = { validateRule, evaluateRule };
