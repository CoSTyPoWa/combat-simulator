(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.core = ns.core || {};

  function refreshAll() {
    var renderers = [
      'renderUniverses',
      'updateFilterLabels',
      'renderRoster',
      'renderTeams',
      'renderTeamMatchups',
      'renderCampaign',
      'renderVs',
      'renderResultsPanel'
    ];

    renderers.forEach(function (name) {
      var fn = window[name];
      if (typeof fn !== 'function') return;
      try {
        fn();
      } catch (err) {
        console.warn('Failed to refresh ' + name, err);
      }
    });

    return true;
  }

  function resetBattleView() {
    if (window.assignment && typeof window.assignment === 'object') {
      Object.keys(window.assignment).forEach(function (id) {
        delete window.assignment[id];
      });
    }

    var resultsSection = document.getElementById('results');
    if (resultsSection) resultsSection.style.display = 'none';

    var logBox = document.getElementById('logBox');
    if (logBox) logBox.innerHTML = '';

    var winnerBanner = document.getElementById('winnerBanner');
    if (winnerBanner) winnerBanner.innerHTML = '';

    if (typeof window.refreshAll === 'function') {
      window.refreshAll();
    }

    return true;
  }

  function clearArchive() {
    try {
      localStorage.removeItem('combatArchive');
    } catch (err) {
      console.warn('Could not clear archive', err);
    }

    if (typeof window.renderArchive === 'function') {
      window.renderArchive();
    }

    return true;
  }

  if (!window.refreshAll) {
    window.refreshAll = refreshAll;
  }
  if (!window.resetBattleView) {
    window.resetBattleView = resetBattleView;
  }
  if (!window.clearArchive) {
    window.clearArchive = clearArchive;
  }

  ns.core.flow = {
    refreshAll: refreshAll,
    resetBattleView: resetBattleView,
    clearArchive: clearArchive
  };
})();
