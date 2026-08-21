(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.data = ns.data || {};

  if (window.COMBAT_SIMULATOR_DATA) {
    ns.data = Object.assign(ns.data, window.COMBAT_SIMULATOR_DATA);
  }

  ns.data.characters = ns.data.characters || [];
  ns.data.universes = ns.data.universes || {};
  ns.data.types = ns.data.types || {};
  ns.data.tags = ns.data.tags || {};
  ns.data.synergies = ns.data.synergies || [];
  ns.data.rivalries = ns.data.rivalries || [];
  ns.data.campaigns = ns.data.campaigns || {};

  window.COMBAT_SIMULATOR_DATA = ns.data;
})();
