(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};

  function safeLegacyCall(name, args) {
    var fn = window[name];
    if (typeof fn === 'function') return fn.apply(window, args || []);
    return null;
  }

  ns.ui.renderers = {
    roster: function roster() { return safeLegacyCall('renderRoster', arguments); },
    teams: function teams() { return safeLegacyCall('renderTeams', arguments); },
    campaign: function campaign() { return safeLegacyCall('renderCampaign', arguments); },
    results: function results() { return safeLegacyCall('renderResults', arguments); },
    archive: function archive() { return safeLegacyCall('renderArchive', arguments); }
  };
})();
