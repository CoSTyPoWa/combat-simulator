(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.core = ns.core || {};

  function callLegacy(name, args) {
    var fn = window[name];
    if (typeof fn !== 'function') return null;
    try {
      return fn.apply(window, args || []);
    } catch (err) {
      console.warn('Legacy core helper failed: ' + name, err);
      return null;
    }
  }

  function saveToArchive(winner, teamAIds, teamBIds, rounds) {
    var fn = window.saveToArchive;
    if (typeof fn === 'function') return fn.call(window, winner, teamAIds, teamBIds, rounds);
    try {
      var archive = [];
      try { archive = JSON.parse(localStorage.getItem('combatArchive') || '[]'); } catch (e) {}
      archive.unshift({
        date: new Date().toLocaleString('it-IT'),
        winner: winner,
        rounds: rounds || 0,
        teamA: teamAIds || [],
        teamB: teamBIds || []
      });
      if (archive.length > 20) archive = archive.slice(0, 20);
      localStorage.setItem('combatArchive', JSON.stringify(archive));
      return archive;
    } catch (err) {
      return null;
    }
  }

  function renderArchive() {
    var fn = window.renderArchive;
    if (typeof fn === 'function') return fn.call(window);
    return null;
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

  ns.core.results = {
    saveToArchive: saveToArchive,
    renderArchive: renderArchive,
    clearArchive: clearArchive
  };
  ns.core.saveToArchive = saveToArchive;
  ns.core.renderArchive = renderArchive;
  ns.core.clearArchive = clearArchive;
})();
