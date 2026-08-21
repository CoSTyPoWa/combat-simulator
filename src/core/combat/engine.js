(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  window.CombatSimulator.core = window.CombatSimulator.core || {};
  window.CombatSimulator.core.engine = window.CombatSimulator.core.engine || {};

  window.CombatSimulator.core.engine.simulateBattle = function simulateBattle(teamAIds, teamBIds, battleOpts) {
    if (typeof window.simulateBattle === 'function') {
      return window.simulateBattle(teamAIds, teamBIds, battleOpts);
    }
    return { winner: 'draw', log: [] };
  };
})();
