(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;

  ns.config = ns.config || (window.COMBAT_SIMULATOR_CONFIG || {});
  ns.state = ns.state || {};
  ns.data = ns.data || {};
  ns.core = ns.core || {};
  ns.rules = ns.rules || {};
  ns.ui = ns.ui || {};
  ns.multiplayer = ns.multiplayer || {};
  ns.registry = ns.registry || {};

  ns.registry = {
    characters: ns.data.characters || [],
    universes: ns.data.universes || {},
    types: ns.data.types || {},
    tags: ns.data.tags || {},
    synergies: ns.data.synergies || [],
    rivalries: ns.data.rivalries || [],
    campaigns: ns.data.campaigns || {}
  };

  ns.bootstrap = function bootstrap() {
    var data = window.COMBAT_SIMULATOR_DATA || ns.data || {};
    ns.config = window.COMBAT_SIMULATOR_CONFIG || ns.config || {};
    ns.data = data;
    ns.registry.characters = data.characters || ns.registry.characters || [];
    ns.registry.universes = data.universes || ns.registry.universes || {};
    ns.registry.types = data.types || ns.registry.types || {};
    ns.registry.tags = data.tags || ns.registry.tags || {};
    ns.registry.synergies = data.synergies || ns.registry.synergies || [];
    ns.registry.rivalries = data.rivalries || ns.registry.rivalries || [];
    ns.registry.campaigns = data.campaigns || ns.registry.campaigns || {};

    if (typeof window.hydrateLegacyGlobals === 'function') {
      window.hydrateLegacyGlobals();
    }
    if (typeof window.refreshRuntime === 'function') {
      window.refreshRuntime();
    }

    ns.ready = true;
    return ns.config;
  };
})();
