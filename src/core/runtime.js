(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.core = ns.core || {};

  function ensureGlobal(name, defaultValue) {
    if (typeof window[name] === 'undefined') {
      window[name] = defaultValue;
    }
    return window[name];
  }

  function hydrateLegacyGlobals() {
    var assignment = ensureGlobal('assignment', {});
    var appMode = ensureGlobal('appMode', 'free');
    var currentUniverse = ensureGlobal('currentUniverse', 'marvel');
    var currentFilter = ensureGlobal('currentFilter', 'all');
    var activeCampMission = ensureGlobal('activeCampMission', null);

    ns.state = ns.state || {};
    ns.state.assignment = assignment;
    ns.state.appMode = appMode;
    ns.state.currentUniverse = currentUniverse;
    ns.state.currentFilter = currentFilter;
    ns.state.activeCampMission = activeCampMission;

    ns.ui = ns.ui || {};
    ns.ui.selection = ns.ui.selection || {};
    ns.ui.selection.assignment = ns.ui.selection.assignment || assignment;
    ns.ui.selection.appMode = ns.ui.selection.appMode || appMode;
    ns.ui.selection.currentUniverse = ns.ui.selection.currentUniverse || currentUniverse;
    ns.ui.selection.currentFilter = ns.ui.selection.currentFilter || currentFilter;
    ns.ui.selection.activeCampMission = ns.ui.selection.activeCampMission || activeCampMission;

    return {
      assignment: assignment,
      appMode: appMode,
      currentUniverse: currentUniverse,
      currentFilter: currentFilter,
      activeCampMission: activeCampMission
    };
  }

  function safeRender(name) {
    var fn = window[name];
    if (typeof fn !== 'function') return null;
    try {
      return fn();
    } catch (err) {
      console.warn('Runtime render fallback failed for ' + name, err);
      return null;
    }
  }

  function refreshRuntime() {
    hydrateLegacyGlobals();
    if (typeof window.renderTeams === 'function') safeRender('renderTeams');
    if (typeof window.renderRoster === 'function') safeRender('renderRoster');
    if (typeof window.renderUniverses === 'function') safeRender('renderUniverses');
    if (typeof window.renderCampaign === 'function') safeRender('renderCampaign');
    return ns.state;
  }

  ns.core.runtime = {
    ensureGlobal: ensureGlobal,
    hydrateLegacyGlobals: hydrateLegacyGlobals,
    safeRender: safeRender,
    refreshRuntime: refreshRuntime
  };

  if (!window.hydrateLegacyGlobals) {
    window.hydrateLegacyGlobals = hydrateLegacyGlobals;
  }
  if (!window.refreshRuntime) {
    window.refreshRuntime = refreshRuntime;
  }
})();
