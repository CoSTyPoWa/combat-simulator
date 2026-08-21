(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.core = ns.core || {};
  ns.core.utils = ns.core.utils || {};

  function normalizeIds(ids) {
    return Array.isArray(ids) ? ids.filter(Boolean) : [];
  }

  function pick(list) {
    var arr = Array.isArray(list) ? list : [];
    if (!arr.length) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function safeClone(value) {
    if (Array.isArray(value)) return value.slice();
    if (value && typeof value === 'object') return Object.assign({}, value);
    return value;
  }

  function summarizeTeam(ids) {
    var teamIds = normalizeIds(ids);
    return {
      ids: teamIds,
      count: teamIds.length,
      total: teamIds.reduce(function (sum, id) {
        var c = ns.core && ns.core.registry && typeof ns.core.registry.findCharacter === 'function' ? ns.core.registry.findCharacter(id) : null;
        if (!c || !c.stats) return sum;
        var s = c.stats;
        return sum + (s.forza || 0) + (s.velocita || 0) + (s.durabilita || 0) + (s.energia || 0) + (s.combattimento || 0) + (s.intelligenza || 0);
      }, 0)
    };
  }

  ns.core.utils = {
    normalizeIds: normalizeIds,
    pick: pick,
    safeClone: safeClone,
    summarizeTeam: summarizeTeam
  };
})();
