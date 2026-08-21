(function () {
  var ns = window.CombatSimulator = window.CombatSimulator || {};
  ns.core = ns.core || {};
  ns.rules = ns.rules || {};

  function safeSet(ids) {
    return Array.isArray(ids) ? ids.filter(Boolean) : [];
  }

  function getTypeChart() {
    return window.TYPE_CHART || {};
  }

  function getCharacterTags() {
    return window.CHAR_TAGS || {};
  }

  function getSyns() {
    return window.SYNERGIES || [];
  }

  function getRivalries() {
    return window.RIVALRIES || [];
  }

  ns.rules.getActiveSynergies = function getActiveSynergies(teamIds, syns) {
    var set = new Set(safeSet(teamIds));
    var list = Array.isArray(syns) ? syns : getSyns();
    var active = [];

    list.forEach(function (syn) {
      if (!syn || !Array.isArray(syn.members)) return;
      var present = syn.members.filter(function (id) { return set.has(id); });
      if (present.length < (syn.min || 1)) return;
      var isPair = syn.members.length <= 2;
      var complete = isPair || present.length >= syn.members.length;
      active.push({
        id: syn.id,
        name: syn.name,
        members: syn.members,
        present: present,
        complete: complete,
        bonus: complete ? syn.full : syn.partial
      });
    });

    return active;
  };

  ns.rules.applySynergyBonus = function applySynergyBonus(baseStats, teamIds, syns) {
    var stats = Object.assign({}, baseStats || {});
    var active = ns.rules.getActiveSynergies(teamIds, syns);

    active.forEach(function (syn) {
      Object.keys(syn.bonus || {}).forEach(function (key) {
        stats[key] = (stats[key] || 0) + (syn.bonus[key] || 0);
      });
    });

    return stats;
  };

  ns.rules.typeMultiplier = function typeMultiplier(atkId, defId, typeChart, charTags) {
    var at = safeSet((charTags || getCharacterTags())[atkId] || ['physical']);
    var dt = safeSet((charTags || getCharacterTags())[defId] || ['physical']);
    var rowMap = typeChart || getTypeChart();
    var vals = [];

    at.forEach(function (a) {
      var row = rowMap[a];
      if (!row) return;
      dt.forEach(function (d) {
        if (a === d) vals.push(1);
        else if (typeof row[d] === 'number') vals.push(row[d]);
      });
    });

    if (!vals.length) return 1;
    var best = Math.max.apply(Math, vals);
    var worst = Math.min.apply(Math, vals);

    if (best > 1.02) return best;
    if (best >= 1) return 1;
    if (worst < 0.98) return worst;
    return 1;
  };

  ns.rules.totalPower = function totalPower(character) {
    if (!character || !character.stats) return 0;
    var s = character.stats;
    return (s.forza || 0) + (s.velocita || 0) + (s.durabilita || 0) + (s.energia || 0) + (s.combattimento || 0) + (s.intelligenza || 0);
  };

  ns.rules.findRivalry = function findRivalry(id1, id2, rivalries) {
    var list = Array.isArray(rivalries) ? rivalries : getRivalries();
    return list.find(function (r) {
      if (!r) return false;
      return (r.a === id1 && r.b === id2) || (r.a === id2 && r.b === id1);
    }) || null;
  };

  ns.core.getActiveSynergies = ns.rules.getActiveSynergies;
  ns.core.applySynergyBonus = ns.rules.applySynergyBonus;
  ns.core.typeMultiplier = ns.rules.typeMultiplier;
  ns.core.totalPower = ns.rules.totalPower;
  ns.core.findRivalry = ns.rules.findRivalry;
})();
