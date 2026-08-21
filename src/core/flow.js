(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.core = ns.core || {};

  function refreshAll() {
    if (typeof window.refreshAll === 'function') {
      return window.refreshAll();
    }
    if (typeof window.refreshRuntime === 'function') {
      return window.refreshRuntime();
    }
    return true;
  }

  function resetBattleView() {
    if (typeof window.resetBattleView === 'function') {
      return window.resetBattleView();
    }
    return true;
  }

  function clearArchive() {
    try {
      if (typeof window.clearArchive === 'function') return window.clearArchive();
      localStorage.removeItem('combatArchive');
      return true;
    } catch (err) {
      return false;
    }
  }

  ns.core.flow = {
    refreshAll: refreshAll,
    resetBattleView: resetBattleView,
    clearArchive: clearArchive
  };
})();
