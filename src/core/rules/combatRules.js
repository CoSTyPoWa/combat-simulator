(function () {
  var ns = window.CombatSimulator = window.CombatSimulator || {};
  ns.core = ns.core || {};
  ns.rules = ns.rules || {};

  var TIER_COST = { S: 12, A: 7, B: 3, C: 0, D: -2 };
  var TIER_RANK = { S: 5, A: 4, B: 3, C: 2, D: 1 };
  var TIER_DMG = { S: 1.55, A: 1.25, B: 1.0, C: 0.78, D: 0.65 };
  var TIER_HP = { S: 1.42, A: 1.20, B: 1.0, C: 0.85, D: 0.75 };

  function getTypeChart() {
    var chart = window.TYPE_CHART || (ns.data && ns.data.types) || {};
    return chart || {};
  }

  function getCharacterTags() {
    var tags = window.CHAR_TAGS || (ns.data && ns.data.tags) || {};
    return tags || {};
  }

  function getSyns() {
    var list = window.SYNERGIES || (ns.data && ns.data.synergies) || [];
    return Array.isArray(list) ? list : [];
  }

  function getRivalries() {
    var list = window.RIVALRIES || (ns.data && ns.data.rivalries) || [];
    return Array.isArray(list) ? list : [];
  }

  function safeSet(ids) {
    return Array.isArray(ids) ? ids.filter(Boolean) : [];
  }

  function getActiveSynergies(teamIds, syns) {
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
        bonus: complete ? (syn.full || syn.partial || {}) : (syn.partial || {})
      });
    });

    return active;
  }

  function applySynergyBonus(baseStats, teamIds, syns) {
    var stats = Object.assign({}, baseStats || {});
    var active = getActiveSynergies(teamIds, syns);

    active.forEach(function (syn) {
      Object.keys(syn.bonus || {}).forEach(function (key) {
        stats[key] = (stats[key] || 0) + (syn.bonus[key] || 0);
      });
    });

    return stats;
  }

  function synergyPowerBonus(teamIds) {
    var syns = getActiveSynergies(teamIds);
    var extra = 0;
    syns.forEach(function (s) {
      Object.values(s.bonus || {}).forEach(function (v) {
        extra += v;
      });
    });
    return extra;
  }

  function typeMultiplier(atkId, defId, typeChart, charTags) {
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
  }

  function totalPower(character) {
    if (!character || !character.stats) return 0;
    var s = character.stats;
    var base = (s.forza || 0) + (s.velocita || 0) + (s.durabilita || 0) + (s.energia || 0) + (s.combattimento || 0) + (s.intelligenza || 0);
    return base + (TIER_COST[character.tier || 'B'] || 0);
  }

  function findRivalry(id1, id2, rivalries) {
    var list = Array.isArray(rivalries) ? rivalries : getRivalries();
    return list.find(function (r) {
      if (!r) return false;
      return (r.a === id1 && r.b === id2) || (r.a === id2 && r.b === id1);
    }) || null;
  }

  function findChar(id, allChars) {
    var list = Array.isArray(allChars) ? allChars : ((window.CHARACTERS || [])
      .concat(window.POKEMON || [])
      .concat(window.NINTENDO || [])
      .concat((ns.data && ns.data.characters) || []));
    return list.find(function (c) { return c && c.id === id; }) || null;
  }

  function charTier(character) {
    return (character && character.tier) || 'B';
  }

  function makeFighter(id, teamIds, opts) {
    var c = findChar(id, (window.CHARACTERS || []).concat(window.POKEMON || []).concat(window.NINTENDO || []).concat((ns.data && ns.data.characters) || []));
    if (!c) return null;
    var tier = charTier(c);
    var st = applySynergyBonus(c.stats || {}, teamIds || []);
    var maxHp = Math.round((65 + (st.durabilita || 0) * 9) * (TIER_HP[tier] || 1));
    if (opts && opts.bossHp && opts.bossIds && opts.bossIds.has(id)) {
      maxHp = Math.round(maxHp * opts.bossHp);
    }
    var tierDmg = TIER_DMG[tier] || 1;
    if (opts && opts.enemyDmg && opts.bossIds && opts.bossIds.has(id)) {
      tierDmg *= opts.enemyDmg;
    }
    return {
      id: c.id,
      name: c.name,
      icon: c.icon,
      tier: tier,
      tierDmg: tierDmg,
      stats: Object.assign({}, st),
      ability: Object.assign({}, c.ability),
      hp: maxHp,
      maxHp: maxHp,
      debuffed: false,
      debuffValue: 1,
      scenarioBoosted: false
    };
  }

  function computeDamage(attacker, defender) {
    var s = attacker.stats || {};
    var base = (s.forza || 0) * 0.35 + (s.energia || 0) * 0.35 + (s.combattimento || 0) * 0.30;
    var rand = 0.78 + Math.random() * 0.44;
    var dmg = base * rand * 2.6;
    var atkT = attacker.tierDmg || 1;
    var defT = defender.tierDmg || 1;
    var gap = atkT / Math.max(defT, 0.55);
    dmg *= atkT * (0.65 + 0.35 * gap);
    dmg *= typeMultiplier(attacker.id, defender.id);
    if (((s.energia || 0) >= 8) && ((defender.stats && defender.stats.durabilita) || 0) >= 8) dmg *= 1.06;
    var resist = (defender.stats && defender.stats.durabilita || 0) * 1.15 + (TIER_RANK[defender.tier] || 3) * 1.2;
    dmg = Math.max(Math.round(dmg - resist), 4);
    return dmg;
  }

  ns.rules = {
    getActiveSynergies: getActiveSynergies,
    applySynergyBonus: applySynergyBonus,
    synergyPowerBonus: synergyPowerBonus,
    typeMultiplier: typeMultiplier,
    totalPower: totalPower,
    findRivalry: findRivalry,
    findChar: findChar,
    charTier: charTier,
    makeFighter: makeFighter,
    computeDamage: computeDamage,
    TIER_COST: TIER_COST,
    TIER_RANK: TIER_RANK,
    TIER_DMG: TIER_DMG,
    TIER_HP: TIER_HP
  };

  ns.core.getActiveSynergies = ns.rules.getActiveSynergies;
  ns.core.applySynergyBonus = ns.rules.applySynergyBonus;
  ns.core.typeMultiplier = ns.rules.typeMultiplier;
  ns.core.totalPower = ns.rules.totalPower;
  ns.core.findRivalry = ns.rules.findRivalry;
  ns.core.findChar = ns.rules.findChar;
  ns.core.computeDamage = ns.rules.computeDamage;

  window.getActiveSynergies = ns.rules.getActiveSynergies;
  window.applySynergyBonus = ns.rules.applySynergyBonus;
  window.typeMultiplier = ns.rules.typeMultiplier;
  window.findRivalry = ns.rules.findRivalry;
  window.findChar = ns.rules.findChar;
  window.totalPower = ns.rules.totalPower;
})();
