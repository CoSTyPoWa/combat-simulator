window.CombatSimulator = window.CombatSimulator || {};
window.CombatSimulator.core = window.CombatSimulator.core || {};
window.CombatSimulator.core.damage = function applyDamage({ amount = 0 } = {}) {
  return Math.max(0, Number(amount) || 0);
};
