(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.core = ns.core || {};
  ns.rules = ns.rules || {};

  function withLegacyFallback(name, fallback) {
    if (typeof window[name] === 'function') return window[name];
    if (typeof fallback === 'function') return fallback;
    return null;
  }

  var legacyHelpers = {
    getActiveSynergies: withLegacyFallback('getActiveSynergies', function getActiveSynergies(teamIds, syns) {
      var set = new Set(Array.isArray(teamIds) ? teamIds.filter(Boolean) : []);
      var list = Array.isArray(syns) ? syns : (window.SYNERGIES || []);
      return list.filter(function (syn) {
        if (!syn || !Array.isArray(syn.members)) return false;
        var present = syn.members.filter(function (id) { return set.has(id); });
        return present.length >= (syn.min || 1);
      }).map(function (syn) {
        var present = syn.members.filter(function (id) { return set.has(id); });
        var complete = syn.members.length <= 2 || present.length >= syn.members.length;
        return {
          id: syn.id,
          name: syn.name,
          members: syn.members,
          present: present,
          complete: complete,
          bonus: complete ? syn.full : syn.partial
        };
      });
    }),
    applySynergyBonus: withLegacyFallback('applySynergyBonus', function applySynergyBonus(baseStats, teamIds, syns) {
      var stats = Object.assign({}, baseStats || {});
      var active = ns.rules.getActiveSynergies(teamIds, syns);
      active.forEach(function (syn) {
        Object.keys(syn.bonus || {}).forEach(function (key) {
          stats[key] = (stats[key] || 0) + (syn.bonus[key] || 0);
        });
      });
      return stats;
    }),
    typeMultiplier: withLegacyFallback('typeMultiplier', function typeMultiplier(atkId, defId) {
      var charTags = window.CHAR_TAGS || {};
      var typeChart = window.TYPE_CHART || {};
      var values = [];
      var at = Array.isArray(charTags[atkId]) ? charTags[atkId] : ['physical'];
      var dt = Array.isArray(charTags[defId]) ? charTags[defId] : ['physical'];
      at.forEach(function (a) {
        var row = typeChart[a];
        if (!row) return;
        dt.forEach(function (d) {
          if (a === d) values.push(1);
          else if (typeof row[d] === 'number') values.push(row[d]);
        });
      });
      if (!values.length) return 1;
      var best = Math.max.apply(Math, values);
      var worst = Math.min.apply(Math, values);
      if (best > 1.02) return best;
      if (best >= 1) return 1;
      if (worst < 0.98) return worst;
      return 1;
    }),
    totalPower: withLegacyFallback('totalPower', function totalPower(character) {
      if (!character || !character.stats) return 0;
      var s = character.stats;
      return (s.forza || 0) + (s.velocita || 0) + (s.durabilita || 0) + (s.energia || 0) + (s.combattimento || 0) + (s.intelligenza || 0);
    }),
    findRivalry: withLegacyFallback('findRivalry', function findRivalry(id1, id2) {
      var list = Array.isArray(window.RIVALRIES) ? window.RIVALRIES : [];
      return list.find(function (r) {
        if (!r) return false;
        return (r.a === id1 && r.b === id2) || (r.a === id2 && r.b === id1);
      }) || null;
    })
  };

  Object.keys(legacyHelpers).forEach(function (key) {
    if (typeof ns.rules[key] !== 'function') ns.rules[key] = legacyHelpers[key];
    if (typeof ns.core[key] !== 'function') ns.core[key] = legacyHelpers[key];
    if (typeof window[key] !== 'function') window[key] = legacyHelpers[key];
  });
})();
