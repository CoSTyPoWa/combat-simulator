(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.core = ns.core || {};

  function simulateBattle(teamAIds, teamBIds, battleOpts) {
    if (typeof window.simulateBattle === 'function') {
      return window.simulateBattle(teamAIds, teamBIds, battleOpts);
    }
    if (typeof window.computeBattle === 'function') {
      return window.computeBattle(teamAIds, teamBIds, battleOpts);
    }
    if (ns.core.engine && typeof ns.core.engine.simulateBattle === 'function' && ns.core.engine.simulateBattle !== simulateBattle) {
      return ns.core.engine.simulateBattle(teamAIds, teamBIds, battleOpts);
    }

    return {
      winner: 'draw',
      log: [],
      events: {
        totalRounds: 0,
        survivorsA: [],
        survivorsB: []
      }
    };
  }

  ns.core.simulateBattle = simulateBattle;
  ns.core.engine = ns.core.engine || {};
  ns.core.engine.simulateBattle = simulateBattle;
  window.simulateBattle = window.simulateBattle || simulateBattle;
})();
