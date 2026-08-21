(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.data = ns.data || {};

  function ensureUniverseCatalog() {
    var catalog = window.UNIVERSES || ns.data.universes || {};
    ns.data.universes = catalog;
    if (!window.UNIVERSES) window.UNIVERSES = catalog;
    return catalog;
  }

  function getUniverse(universeId) {
    var catalog = ensureUniverseCatalog();
    return catalog[universeId || 'marvel'] || catalog.marvel || null;
  }

  function getActiveChars(universeId) {
    var uni = getUniverse(universeId || window.currentUniverse || 'marvel');
    if (!uni) return [];
    if (Array.isArray(uni.characters)) return uni.characters.slice();
    if (Array.isArray(window.CHARACTERS)) {
      return window.CHARACTERS.filter(function (c) {
        return c && (c.universe || 'marvel') === (universeId || window.currentUniverse || 'marvel');
      });
    }
    return [];
  }

  function setUniverse(universeId) {
    if (typeof window.currentUniverse !== 'undefined') {
      window.currentUniverse = universeId || 'marvel';
    }
    if (typeof window.refreshAll === 'function') {
      try { window.refreshAll(); } catch (err) { console.warn('refreshAll failed while switching universe', err); }
    }
    return window.currentUniverse;
  }

  ns.data.universes = ensureUniverseCatalog();
  ns.data.getActiveChars = getActiveChars;
  ns.data.setUniverse = setUniverse;
  ns.data.getUniverse = getUniverse;

  window.getActiveChars = window.getActiveChars || getActiveChars;
  window.setUniverse = window.setUniverse || setUniverse;
  window.getUniverse = window.getUniverse || getUniverse;
})();
