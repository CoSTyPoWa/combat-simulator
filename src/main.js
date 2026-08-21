window.CombatSimulator = window.CombatSimulator || {};
window.CombatSimulator.config = window.COMBAT_SIMULATOR_CONFIG || {};
window.CombatSimulator.ready = true;
window.CombatSimulator.bootstrap = function bootstrap() {
  window.CombatSimulator.config = window.COMBAT_SIMULATOR_CONFIG || {};
  return window.CombatSimulator.config;
};
