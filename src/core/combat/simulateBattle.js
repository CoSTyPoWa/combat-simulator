window.CombatSimulator = window.CombatSimulator || {};
window.CombatSimulator.core = window.CombatSimulator.core || {};
window.CombatSimulator.core.simulateBattle = function simulateBattle({ teamA = [], teamB = [] } = {}) {
  return {
    winner: 'draw',
    teamA,
    teamB,
    log: []
  };
};
