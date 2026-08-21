(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};

  function getCurrentUniverse() {
   return window.currentUniverse || (ns.ui.selection && ns.ui.selection.currentUniverse) || 'marvel';
  }

  function getCurrentFilter() {
   return window.currentFilter || (ns.ui.selection && ns.ui.selection.currentFilter) || 'all';
  }

  function getUniverseRoster() {
   var universeId = getCurrentUniverse();
   var universe = window.UNIVERSES && window.UNIVERSES[universeId];
   if (universe && Array.isArray(universe.characters)) return universe.characters;
   return Array.isArray(window.CHARACTERS) ? window.CHARACTERS : [];
  }

  function getVisibleCharacters() {
   var filterKey = getCurrentFilter();
   var roster = getUniverseRoster();
   if (filterKey === 'all') return roster;
   if (filterKey === 'heroes') return roster.filter(function (character) { return String(character.side || '').toLowerCase() !== 'villain'; });
   if (filterKey === 'villain') return roster.filter(function (character) { return String(character.side || '').toLowerCase() === 'villain'; });
   if (filterKey === 'marvel' || filterKey === 'pokemon' || filterKey === 'nintendo') return roster.filter(function (character) { return (character.universe || '') === filterKey; });
   return roster;
  }

  function updateFilterLabels() {
   if (typeof window.updateFilterLabels === 'function' && window.updateFilterLabels !== updateFilterLabels) {
     try {
       return window.updateFilterLabels();
     } catch (err) {
       console.warn('Legacy updateFilterLabels failed in roster module', err);
     }
   }

   var filterBar = document.getElementById('filterBar');
   if (!filterBar) return getCurrentFilter();

   filterBar.innerHTML = '';
   var options = ['all'];
   var currentUniverse = getCurrentUniverse();
   if (currentUniverse === 'multiverso') {
     options = ['all', 'marvel', 'pokemon', 'nintendo'];
   } else {
     options = ['all', 'heroes', 'villain'];
   }

   options.forEach(function (option) {
     var button = document.createElement('button');
     button.type = 'button';
     button.className = 'filter-btn' + ((getCurrentFilter() === option) ? ' active' : '');
     button.setAttribute('data-filter', option);
     button.textContent = option === 'all' ? 'TUTTI' : (option === 'heroes' ? 'EROI' : (option === 'villain' ? 'VILLAIN' : option.toUpperCase()));
     button.addEventListener('click', function () {
       window.currentFilter = option;
       if (ns.ui.selection) ns.ui.selection.currentFilter = option;
       renderRoster();
       if (typeof window.refreshAll === 'function') window.refreshAll();
     });
     filterBar.appendChild(button);
   });

   return getCurrentFilter();
  }

  function renderRoster() {
   if (typeof window.renderRoster === 'function' && window.renderRoster !== renderRoster) {
     try {
       return window.renderRoster();
     } catch (err) {
       console.warn('Legacy renderRoster failed in roster module', err);
     }
   }

   var rosterGrid = document.getElementById('rosterGrid');
   var rosterCount = document.getElementById('rosterCount');
   if (!rosterGrid) return null;

   var roster = getVisibleCharacters();
   if (rosterCount) {
     rosterCount.textContent = roster.length + ' personaggi · ' + (window.UNIVERSES && window.UNIVERSES[getCurrentUniverse()] ? window.UNIVERSES[getCurrentUniverse()].label : getCurrentUniverse());
   }

   rosterGrid.innerHTML = '';
   roster.forEach(function (character) {
     var card = document.createElement('div');
     card.className = 'card' + ((character.side || '').toLowerCase() === 'villain' ? ' villain' : '');
     card.innerHTML = '<div class="card-top"><div class="name-wrap"><div class="icon-badge">' + (character.icon || '') + '</div><div class="card-name">' + (character.name || '') + '</div></div><div class="chip">' + ((character.side || '').toLowerCase() === 'villain' ? 'Villain' : 'Eroe') + '</div></div>' +
       '<div class="stat-line">Tier ' + (character.tier || 'B') + ' · ' + (character.stats ? ((character.stats.forza || 0) + (character.stats.velocita || 0) + (character.stats.durabilita || 0) + (character.stats.energia || 0) + (character.stats.combattimento || 0) + (character.stats.intelligenza || 0)) : 0) + ' pt</div>' +
       '<div class="ability-line">★ ' + ((character.ability && character.ability.name) || 'Abilità') + '</div>' +
       '<div class="blurb">' + (character.blurb || '') + '</div>';
     rosterGrid.appendChild(card);
   });

   return roster;
  }

  function applyFilterSelection(filterKey) {
   if (typeof window.applyFilterSelection === 'function' && window.applyFilterSelection !== applyFilterSelection) {
     try {
       return window.applyFilterSelection(filterKey);
     } catch (err) {
       console.warn('Legacy applyFilterSelection failed in roster module', err);
     }
   }
   var nextKey = filterKey || 'all';
   window.currentFilter = nextKey;
   if (ns.ui.selection) ns.ui.selection.currentFilter = nextKey;
   return renderRoster();
  }

  if (!window.renderRoster) {
   window.renderRoster = renderRoster;
  }
  if (!window.updateFilterLabels) {
   window.updateFilterLabels = updateFilterLabels;
  }
  if (!window.applyFilterSelection) {
   window.applyFilterSelection = applyFilterSelection;
  }

  ns.ui.roster = {
   getCurrentUniverse: getCurrentUniverse,
   getCurrentFilter: getCurrentFilter,
   getVisibleCharacters: getVisibleCharacters,
   renderRoster: renderRoster,
   updateFilterLabels: updateFilterLabels,
   applyFilterSelection: applyFilterSelection
  };
})();
