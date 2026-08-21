(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.runtime = ns.runtime || {};

  function hydrateLegacyGlobals() {
    if (typeof window.assignment === 'undefined' && ns.state && ns.state.assignment) {
      window.assignment = ns.state.assignment;
    }
    if (typeof window.appMode === 'undefined') window.appMode = 'free';
    if (typeof window.currentUniverse === 'undefined') window.currentUniverse = 'marvel';
    if (typeof window.currentFilter === 'undefined') window.currentFilter = 'all';
    if (typeof window.activeCampMission === 'undefined') window.activeCampMission = null;
    return window;
  }

  function refreshRuntime() {
    if (typeof window.refreshAll === 'function') {
      window.refreshAll();
    }
    if (typeof window.renderRoster === 'function') {
      window.renderRoster();
    }
    if (typeof window.renderTeams === 'function') {
      window.renderTeams();
    }
    return true;
  }

  ns.runtime.hydrateLegacyGlobals = hydrateLegacyGlobals;
  ns.runtime.refreshRuntime = refreshRuntime;
  ns.hydrateLegacyGlobals = hydrateLegacyGlobals;
  ns.refreshRuntime = refreshRuntime;
})();
