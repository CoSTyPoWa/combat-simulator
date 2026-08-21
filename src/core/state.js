(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.state = ns.state || {};
  ns.core = ns.core || {};

  function ensureState() {
    ns.state.assignment = ns.state.assignment || (typeof window.assignment !== 'undefined' ? window.assignment : {});
    ns.state.appMode = typeof ns.state.appMode !== 'undefined' ? ns.state.appMode : (typeof window.appMode !== 'undefined' ? window.appMode : 'free');
    ns.state.currentUniverse = typeof ns.state.currentUniverse !== 'undefined' ? ns.state.currentUniverse : (typeof window.currentUniverse !== 'undefined' ? window.currentUniverse : 'marvel');
    ns.state.currentFilter = typeof ns.state.currentFilter !== 'undefined' ? ns.state.currentFilter : (typeof window.currentFilter !== 'undefined' ? window.currentFilter : 'all');
    ns.state.activeCampMission = typeof ns.state.activeCampMission !== 'undefined' ? ns.state.activeCampMission : (typeof window.activeCampMission !== 'undefined' ? window.activeCampMission : null);
    syncLegacyGlobals();
    return ns.state;
  }

  function syncLegacyGlobals() {
    if (typeof window.assignment === 'undefined' || window.assignment !== ns.state.assignment) {
      window.assignment = ns.state.assignment;
    }
    if (typeof window.appMode === 'undefined' || window.appMode !== ns.state.appMode) {
      window.appMode = ns.state.appMode;
    }
    if (typeof window.currentUniverse === 'undefined' || window.currentUniverse !== ns.state.currentUniverse) {
      window.currentUniverse = ns.state.currentUniverse;
    }
    if (typeof window.currentFilter === 'undefined' || window.currentFilter !== ns.state.currentFilter) {
      window.currentFilter = ns.state.currentFilter;
    }
    if (typeof window.activeCampMission === 'undefined' || window.activeCampMission !== ns.state.activeCampMission) {
      window.activeCampMission = ns.state.activeCampMission;
    }
    return window;
  }

  function getAssignment() {
    return ensureState().assignment;
  }

  function setAssignment(nextAssignment) {
    ns.state.assignment = nextAssignment || {};
    syncLegacyGlobals();
    return ns.state.assignment;
  }

  function setAppMode(mode) {
    ns.state.appMode = mode || 'free';
    if (typeof window.refreshAll === 'function') {
      try { window.refreshAll(); } catch (err) {}
    }
    syncLegacyGlobals();
    return ns.state.appMode;
  }

  function setCurrentUniverse(universeId) {
    ns.state.currentUniverse = universeId || 'marvel';
    syncLegacyGlobals();
    return ns.state.currentUniverse;
  }

  function setCurrentFilter(filterName) {
    ns.state.currentFilter = filterName || 'all';
    syncLegacyGlobals();
    return ns.state.currentFilter;
  }

  function setActiveCampMission(mission) {
    ns.state.activeCampMission = mission || null;
    syncLegacyGlobals();
    return ns.state.activeCampMission;
  }

  ns.core.state = {
    ensureState: ensureState,
    syncLegacyGlobals: syncLegacyGlobals,
    getAssignment: getAssignment,
    setAssignment: setAssignment,
    setAppMode: setAppMode,
    setCurrentUniverse: setCurrentUniverse,
    setCurrentFilter: setCurrentFilter,
    setActiveCampMission: setActiveCampMission
  };

  ns.core.ensureState = ensureState;
  ns.core.syncLegacyGlobals = syncLegacyGlobals;
  ns.core.getAssignment = getAssignment;
  ns.core.setAssignment = setAssignment;
  ns.core.setAppMode = setAppMode;
  ns.core.setCurrentUniverse = setCurrentUniverse;
  ns.core.setCurrentFilter = setCurrentFilter;
  ns.core.setActiveCampMission = setActiveCampMission;

  ensureState();
})();
