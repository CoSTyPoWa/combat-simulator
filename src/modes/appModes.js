(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.modes = ns.modes || {};

  function setAppMode(mode) {
    if (typeof window.setAppMode === 'function') {
      return window.setAppMode(mode);
    }

    window.appMode = mode || 'free';
    if (typeof window.refreshAll === 'function') {
      window.refreshAll();
    }
    return window.appMode;
  }

  ns.modes.setAppMode = setAppMode;
  ns.setAppMode = setAppMode;
})();
