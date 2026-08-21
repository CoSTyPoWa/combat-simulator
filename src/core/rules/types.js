(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.rules = ns.rules || {};

  function getTypeChart() {
    return window.TYPE_CHART || ns.rules.typeMatrix || {};
  }

  function typeMultiplier(atkId, defId, typeChart, charTags) {
    var rowMap = typeChart || getTypeChart();
    var tags = charTags || window.CHAR_TAGS || {};
    var atkTypes = Array.isArray(tags[atkId]) ? tags[atkId] : ((tags[atkId] && typeof tags[atkId] === 'string') ? [tags[atkId]] : ['physical']);
    var defTypes = Array.isArray(tags[defId]) ? tags[defId] : ((tags[defId] && typeof tags[defId] === 'string') ? [tags[defId]] : ['physical']);

    var values = [];
    atkTypes.forEach(function (atkType) {
      var row = rowMap[atkType] || {};
      defTypes.forEach(function (defType) {
        if (atkType === defType) {
          values.push(1);
        } else if (typeof row[defType] === 'number') {
          values.push(row[defType]);
        }
      });
    });

    if (!values.length) return 1;
    return Math.max.apply(Math, values);
  }

  ns.rules.typeMatrix = ns.rules.typeMatrix || {
    fire: { fire: 0.9, water: 0.8, earth: 1.1 },
    water: { fire: 1.1, water: 0.9, earth: 0.8 },
    earth: { fire: 0.8, water: 1.1, earth: 0.9 }
  };

  ns.rules.types = {
    getTypeChart: getTypeChart,
    typeMultiplier: typeMultiplier
  };
  ns.rules.typeMultiplier = typeMultiplier;
})();
