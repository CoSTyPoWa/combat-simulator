(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.data = ns.data || {};

  function ensureRuleCatalog() {
    var typeChart = window.TYPE_CHART || ns.data.types || {};
    var synergies = window.SYNERGIES || ns.data.synergies || [];
    var rivalries = window.RIVALRIES || ns.data.rivalries || [];

    ns.data.types = typeChart;
    ns.data.synergies = synergies;
    ns.data.rivalries = rivalries;

    if (!window.TYPE_CHART) window.TYPE_CHART = typeChart;
    if (!window.SYNERGIES) window.SYNERGIES = synergies;
    if (!window.RIVALRIES) window.RIVALRIES = rivalries;

    return {
      types: typeChart,
      synergies: synergies,
      rivalries: rivalries
    };
  }

  ns.data.ruleCatalog = ensureRuleCatalog();
  ns.rules = ns.rules || {};
  ns.rules.catalog = ns.data.ruleCatalog;
})();
