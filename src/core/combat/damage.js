(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.core = ns.core || {};
  ns.core.combat = ns.core.combat || {};

  function getRules() {
    return window.CombatSimulator && window.CombatSimulator.rules ? window.CombatSimulator.rules : {};
  }

  function computeDamage(attacker, defender) {
    if (typeof window.CombatSimulator !== 'undefined' && typeof window.CombatSimulator.rules !== 'undefined' && typeof window.CombatSimulator.rules.computeDamage === 'function') {
      return window.CombatSimulator.rules.computeDamage(attacker, defender);
    }
    if (!attacker || !defender) return 0;
    var s = attacker.stats || {};
    var dmg = ((s.forza || 0) * 0.35 + (s.energia || 0) * 0.35 + (s.combattimento || 0) * 0.30) * (0.78 + Math.random() * 0.44) * 2.6;
    var atkT = attacker.tierDmg || 1;
    var defT = defender.tierDmg || 1;
    var gap = atkT / Math.max(defT, 0.55);
    dmg *= atkT * (0.65 + 0.35 * gap);
    if (typeof window.typeMultiplier === 'function') {
      dmg *= window.typeMultiplier(attacker.id, defender.id);
    }
    var resist = ((defender.stats && defender.stats.durabilita) || 0) * 1.15 + ((defender.tier === 'S' ? 5 : defender.tier === 'A' ? 4 : defender.tier === 'B' ? 3 : defender.tier === 'C' ? 2 : 1) * 1.2);
    return Math.max(Math.round(dmg - resist), 4);
  }

  ns.core.combat.computeDamage = computeDamage;
  ns.core.damage = computeDamage;
  window.computeDamage = computeDamage;
})();
