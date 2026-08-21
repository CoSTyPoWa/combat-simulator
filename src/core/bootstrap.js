(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;

  ns.config = ns.config || (window.COMBAT_SIMULATOR_CONFIG || {});
  ns.state = ns.state || {};
  ns.data = ns.data || {};
  ns.core = ns.core || {};
  ns.rules = ns.rules || {};
  ns.ui = ns.ui || {};
  ns.modes = ns.modes || {};
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
    ns.config = window.COMBAT_SIMULATOR_CONFIG || ns.config || {};
    ns.data = window.CombatSimulator.data || ns.data || {};
    ns.registry.characters = ns.data.characters || ns.registry.characters || [];
    ns.registry.universes = ns.data.universes || ns.registry.universes || {};
    ns.registry.types = ns.data.types || ns.registry.types || {};
    ns.registry.tags = ns.data.tags || ns.registry.tags || {};
    ns.registry.synergies = ns.data.synergies || ns.registry.synergies || [];
    ns.registry.rivalries = ns.data.rivalries || ns.registry.rivalries || [];
    ns.registry.campaigns = ns.data.campaigns || ns.registry.campaigns || {};
    if (typeof window.hydrateLegacyGlobals === 'function') window.hydrateLegacyGlobals();
    if (typeof window.refreshRuntime === 'function') window.refreshRuntime();
    ns.ready = true;
    return ns.config;
  };
})();
