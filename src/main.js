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

  function initializeModules() {
    var queue = [
      'renderUniverses',
      'updateFilterLabels',
      'renderRoster',
      'renderTeams',
      'renderCampaign',
      'bindModeButtons',
      'bindRandomButtons',
      'bindResultsActions'
    ];

    queue.forEach(function (name) {
      var fn = window[name];
      if (typeof fn === 'function') {
        try {
          fn();
        } catch (err) {
          console.warn('Failed to initialize ' + name, err);
        }
      }
    });

    if (typeof window.refreshAll === 'function') {
      try {
        window.refreshAll();
      } catch (err) {
        console.warn('refreshAll failed during bootstrap', err);
      }
    }
  }

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
    ns.ready = true;
    return ns.config;
  };

  ns.initialize = function initialize() {
    ns.bootstrap();
    initializeModules();
    return ns;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      ns.initialize();
    }, { once: true });
  } else {
    ns.initialize();
  }
})();
