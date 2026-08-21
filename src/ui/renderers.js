(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};

  function renderUniverses() {
    if (typeof window.renderUniverses === 'function') return window.renderUniverses();
    var universeGrid = document.getElementById('universeGrid');
    if (!universeGrid || !(window.UNIVERSES && window.UNIVERSES)) return null;
    universeGrid.innerHTML = '';
    Object.values(window.UNIVERSES).forEach(function (u) {
      var btn = document.createElement('button');
      btn.className = 'universe-btn' + (u.id === window.currentUniverse ? ' active' : '');
      btn.innerHTML = '<span class="u-icon">' + (u.icon || '') + '</span><span class="u-name">' + (u.label || u.id) + '</span><div class="u-count">' + ((u.characters || []).length || 0) + ' personaggi</div>';
      btn.addEventListener('click', function () {
        if (typeof window.refreshAll === 'function') {
          window.currentUniverse = u.id;
          if (typeof window.updateFilterLabels === 'function') window.updateFilterLabels();
          window.renderUniverses();
          window.refreshAll();
        }
      });
      universeGrid.appendChild(btn);
    });
    return universeGrid;
  }

  function renderRoster() {
    if (typeof window.renderRoster === 'function') return window.renderRoster();
    return null;
  }

  function renderTeams() {
    if (typeof window.renderTeams === 'function') return window.renderTeams();
    return null;
  }

  function renderCampaign() {
    if (typeof window.renderCampaign === 'function') return window.renderCampaign();
    return null;
  }

  ns.ui.renderers = {
    renderUniverses: renderUniverses,
    renderRoster: renderRoster,
    renderTeams: renderTeams,
    renderCampaign: renderCampaign
  };
})();
