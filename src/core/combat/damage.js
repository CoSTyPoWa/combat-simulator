(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.core = ns.core || {};
  ns.core.combat = ns.core.combat || {};

  function computeDamage(attacker, defender, opts) {
    if (typeof window.computeDamage === 'function') {
      return window.computeDamage(attacker, defender, opts);
    }
    if (
      ns.core &&
      typeof ns.core.computeDamage === 'function' &&
      ns.core.computeDamage !== computeDamage
    ) {
      return ns.core.computeDamage(attacker, defender, opts);
    }
    if (!attacker || !defender || !attacker.stats || !defender.stats) return 0;

    var a = attacker.stats || {};
    var d = defender.stats || {};
    var base = ((a.forza || 0) * 0.35 + (a.energia || 0) * 0.35 + (a.combattimento || 0) * 0.30) * 2.6;
    var resist = (d.durabilita || 0) * 1.15 + (d.energia || 0) * 0.25 + (d.combattimento || 0) * 0.18;
    var dmg = Math.max(Math.round(base - resist), 4);
    var multiplier = (opts && typeof opts.multiplier === 'number') ? opts.multiplier : 1;

    return Math.max(0, dmg * multiplier);
  }

  function applyDamage(amount) {
    return Math.max(0, Number(amount) || 0);
  }

  ns.core.combat.computeDamage = computeDamage;
  ns.core.computeDamage = computeDamage;
  ns.core.damage = applyDamage;
})();
