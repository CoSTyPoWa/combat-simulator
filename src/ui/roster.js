(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};

  function getActiveChars() {
    if (typeof window.getActiveChars === 'function') return window.getActiveChars(window.currentUniverse || 'marvel');
    var universeId = window.currentUniverse || 'marvel';
    var universe = (window.UNIVERSES && window.UNIVERSES[universeId]) || null;
    if (universe && Array.isArray(universe.characters)) return universe.characters.slice();
    if (Array.isArray(window.CHARACTERS)) {
      return window.CHARACTERS.filter(function (c) {
        return (c && c.universe || 'marvel') === universeId;
      });
    }
    return [];
  }

  function renderUniverses() {
    if (typeof window.renderUniverses === 'function') {
      return window.renderUniverses();
    }
    var grid = document.getElementById('universeGrid');
    if (!grid || !window.UNIVERSES) return null;
    grid.innerHTML = '';
    Object.keys(window.UNIVERSES).forEach(function (uniKey) {
      var universe = window.UNIVERSES[uniKey];
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'universe-btn' + ((window.currentUniverse || 'marvel') === uniKey ? ' active' : '');
      btn.innerHTML = '<span class="u-icon">' + (universe.icon || '⚔️') + '</span><span class="u-name">' + (universe.label || uniKey) + '</span><div class="u-count">' + (universe.characters ? universe.characters.length : 0) + ' eroi</div>';
      btn.addEventListener('click', function () {
        if (typeof window.setUniverse === 'function') {
          window.setUniverse(uniKey);
        } else {
          window.currentUniverse = uniKey;
        }
        if (typeof window.renderRoster === 'function') window.renderRoster();
      });
      grid.appendChild(btn);
    });
    return grid;
  }

  function updateFilterLabels() {
    if (typeof window.updateFilterLabels === 'function') {
      return window.updateFilterLabels();
    }
    var bar = document.getElementById('filterBar');
    if (!bar) return null;
    var filters = ['all', 'heroes', 'villain', 'tier-s', 'tier-a', 'tier-b'];
    bar.innerHTML = '';
    filters.forEach(function (name) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-btn' + ((window.currentFilter || 'all') === name ? ' active' : '');
      btn.textContent = name === 'all' ? 'Tutti' : (name === 'heroes' ? 'Eroi' : (name === 'villain' ? 'Nemici' : (name === 'tier-s' ? 'Tier S' : (name === 'tier-a' ? 'Tier A' : 'Tier B'))));
      btn.setAttribute('data-filter', name);
      btn.addEventListener('click', function () {
        window.currentFilter = name;
        if (typeof window.renderRoster === 'function') window.renderRoster();
      });
      bar.appendChild(btn);
    });
    return bar;
  }

  function renderRoster() {
    if (typeof window.renderRoster === 'function') {
      return window.renderRoster();
    }

    var grid = document.getElementById('rosterGrid');
    var stats = document.getElementById('rosterCount');
    if (!grid) return null;

    var characters = getActiveChars();
    grid.innerHTML = '';
    characters.forEach(function (char) {
      if (!char) return;
      var item = document.createElement('div');
      item.className = 'roster-card';
      item.innerHTML = '<div class="roster-top"><span class="char-icon">' + (char.icon || '⚔️') + '</span><span class="char-name">' + (char.name || char.id) + '</span><span class="char-tier">' + (char.tier || 'B') + '</span></div>' + '<div class="char-side">' + (char.side || 'heroes') + '</div>' + '<div class="char-blurb">' + (char.blurb || '') + '</div>';
      var addBtn = document.createElement('button');
      addBtn.className = 'add-btn';
      addBtn.type = 'button';
      addBtn.textContent = 'Aggiungi';
      addBtn.addEventListener('click', function () {
        if (typeof window.assignment === 'undefined') window.assignment = {};
        window.assignment[char.id] = 'A';
        if (typeof window.refreshAll === 'function') window.refreshAll();
      });
      item.appendChild(addBtn);
      grid.appendChild(item);
    });

    if (stats) stats.textContent = characters.length + ' eroi';
    return grid;
  }

  ns.ui.roster = {
    getActiveChars: getActiveChars,
    renderUniverses: renderUniverses,
    updateFilterLabels: updateFilterLabels,
    renderRoster: renderRoster
  };
  ns.ui.renderers = ns.ui.renderers || {};
  ns.ui.renderers.roster = renderRoster;
})();
