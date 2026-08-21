(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};

  function getCurrentFilter() {
    if (ns.ui.selection && ns.ui.selection.currentFilter) return ns.ui.selection.currentFilter;
    return window.currentFilter || 'all';
  }

  function countVisibleCharacters(filterKey) {
    var key = filterKey || getCurrentFilter();
    var universeId = window.currentUniverse || 'marvel';
    var universe = window.UNIVERSES && window.UNIVERSES[universeId];
    var roster = (universe && universe.characters) || (window.CHARACTERS || []);
    if (!Array.isArray(roster) || !roster.length) return 0;

    if (key === 'heroes') return roster.filter(function (character) { return String(character.side || '').toLowerCase() !== 'villain'; }).length;
    if (key === 'villain') return roster.filter(function (character) { return String(character.side || '').toLowerCase() === 'villain'; }).length;
    return roster.length;
  }

  function applyFilterSelection(filterKey) {
    var key = filterKey || 'all';
    if (ns.ui.selection) ns.ui.selection.currentFilter = key;
    window.currentFilter = key;

    var buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(function (button) {
      var isActive = button.getAttribute('data-filter') === key;
      button.classList.toggle('active', isActive);
    });

    if (typeof window.renderRoster === 'function') {
      try {
        window.renderRoster();
      } catch (err) {
        console.warn('renderRoster failed in filter module', err);
      }
    }

    if (typeof window.refreshAll === 'function') {
      try {
        window.refreshAll();
      } catch (err) {
        console.warn('refreshAll failed in filter module', err);
      }
    }

    return key;
  }

  function updateFilterLabels() {
    var key = getCurrentFilter();
    var buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(function (button) {
      var isActive = button.getAttribute('data-filter') === key;
      button.classList.toggle('active', isActive);
    });

    var rosterCount = document.getElementById('rosterCount');
    if (rosterCount) {
      rosterCount.textContent = countVisibleCharacters(key) + ' personaggi';
    }

    return key;
  }

  function bindFilterButtons() {
    var buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(function (button) {
      if (button.dataset.filterBound === 'true') return;
      button.addEventListener('click', function () {
        applyFilterSelection(button.getAttribute('data-filter') || 'all');
      });
      button.dataset.filterBound = 'true';
    });
  }

  if (!window.updateFilterLabels) {
    window.updateFilterLabels = updateFilterLabels;
  }

  if (!window.applyFilterSelection) {
    window.applyFilterSelection = applyFilterSelection;
  }

  ns.ui.filters = {
    getCurrentFilter: getCurrentFilter,
    countVisibleCharacters: countVisibleCharacters,
    applyFilterSelection: applyFilterSelection,
    updateFilterLabels: updateFilterLabels,
    bindFilterButtons: bindFilterButtons
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindFilterButtons, { once: true });
  } else {
    bindFilterButtons();
  }
})();
