(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};

  function setFilter(filterName) {
    var chosen = filterName || 'all';
    if (typeof window.currentFilter !== 'undefined') {
      window.currentFilter = chosen;
    }
    if (typeof window.refreshAll === 'function') {
      try {
        window.refreshAll();
      } catch (err) {
        console.warn('refreshAll failed while applying filter', err);
      }
    }
    if (typeof window.renderRoster === 'function') {
      try {
        window.renderRoster();
      } catch (err) {
        console.warn('renderRoster failed while applying filter', err);
      }
    }
    return chosen;
  }

  function bindFilterButtons() {
    var buttons = document.querySelectorAll('.filter-btn[data-filter]');
    if (!buttons || !buttons.length) return false;

    buttons.forEach(function (btn) {
      var filterName = btn.getAttribute('data-filter');
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        setFilter(filterName);
      });
    });

    return true;
  }

  ns.ui.filters = { setFilter: setFilter, bindFilterButtons: bindFilterButtons }; 
  ns.ui.filter = ns.ui.filters;
})();
