(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};
  var compat = ns.utils || ns.core;

  function callLegacy(name, args) {
    return compat && typeof compat.callLegacy === 'function'
      ? compat.callLegacy(name, args, window)
      : null;
  }

  function getSummaryBuilder() {
    if (window.CombatSimulator && window.CombatSimulator.core && typeof window.CombatSimulator.core.buildSummary === 'function') {
      return window.CombatSimulator.core.buildSummary;
    }
    if (typeof window.buildSummary === 'function') return window.buildSummary;
    return null;
  }

  ns.ui.results = {
    renderResults: function renderResults() { return callLegacy('renderResults', arguments); },
    renderArchive: function renderArchive() { return callLegacy('renderArchive', arguments); },
    saveToArchive: function saveToArchive() { return callLegacy('saveToArchive', arguments); },
    buildSummary: function buildSummary(events, winner) {
      var fn = getSummaryBuilder();
      if (typeof fn === 'function') {
        try {
          return fn(events, winner);
        } catch (err) {
          return { winner: winner || 'draw', lines: [] };
        }
      }
      return { winner: winner || 'draw', lines: [] };
    },
    buildSummaryText: function buildSummaryText(events, winner) {
      var summary = ns.ui.results.buildSummary(events, winner);
      return Array.isArray(summary && summary.lines) ? summary.lines.join(' ') : '';
    },
    clearArchive: function clearArchive() {
      try {
        if (typeof window.clearArchive === 'function') return window.clearArchive();
        localStorage.removeItem('combatArchive');
        return true;
      } catch (err) {
        return false;
      }
    }
  };
})();
