(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.core = ns.core || {};
  ns.core.engine = ns.core.engine || {};

  function simulateBattle(teamAIds, teamBIds, battleOpts) {
    if (typeof window.simulateBattle === 'function') {
      return window.simulateBattle(teamAIds, teamBIds, battleOpts);
    }
    if (typeof window.computeBattle === 'function') {
      return window.computeBattle(teamAIds, teamBIds, battleOpts);
    }
    if (ns.core && typeof ns.core.simulateBattle === 'function' && ns.core.simulateBattle !== simulateBattle) {
      return ns.core.simulateBattle(teamAIds, teamBIds, battleOpts);
    }
    return { winner: 'draw', log: [], events: { totalRounds: 0, survivorsA: [], survivorsB: [] } };
  }

  ns.core.engine.simulateBattle = simulateBattle;
  ns.core.simulateBattle = simulateBattle;
})();
