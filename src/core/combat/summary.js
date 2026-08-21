(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.core = ns.core || {};
  ns.core.combat = ns.core.combat || {};

  function buildSummary(events, winner) {
    if (!events) {
      return { title: 'Battaglia', lines: [], winner: winner || 'draw' };
    }

    if (Array.isArray(events.namesA) || Array.isArray(events.namesB)) {
      var namesA = events.namesA || [];
      var namesB = events.namesB || [];
      return {
        winner: winner || 'draw',
        title: 'Scontro tra ' + (namesA.slice(0, 3).join(', ') || 'A') + ' e ' + (namesB.slice(0, 3).join(', ') || 'B'),
        lines: [
          'Lo scontro si è concluso con ' + (winner || 'draw') + '.',
          'Squadra A: ' + (namesA.length ? namesA.slice(0, 3).join(', ') : 'nessuno'),
          'Squadra B: ' + (namesB.length ? namesB.slice(0, 3).join(', ') : 'nessuno')
        ],
        scenario: events.scenario || null,
        survivorsA: events.survivorsA || [],
        survivorsB: events.survivorsB || []
      };
    }

    var namesA = Array.isArray(events.namesA) ? events.namesA.slice(0, 3) : [];
    var namesB = Array.isArray(events.namesB) ? events.namesB.slice(0, 3) : [];
    var summary = {
      winner: winner || 'draw',
      title: 'Scontro tra ' + (namesA.join(', ') || 'A') + ' e ' + (namesB.join(', ') || 'B'),
      lines: [
        'Lo scontro si è concluso con ' + (winner || 'draw') + '.',
        'Squadra A: ' + (namesA.length ? namesA.join(', ') : 'nessuno'),
        'Squadra B: ' + (namesB.length ? namesB.join(', ') : 'nessuno')
      ],
      scenario: events.scenario || null,
      survivorsA: events.survivorsA || [],
      survivorsB: events.survivorsB || []
    };

    return summary;
  }

  function buildSummaryText(events, winner) {
    var summary = buildSummary(events, winner);
    if (!summary || !Array.isArray(summary.lines)) return '';
    return summary.lines.join(' ');
  }

  ns.core.combat.buildSummary = buildSummary;
  ns.core.buildSummary = buildSummary;
  ns.core.combat.buildSummaryText = buildSummaryText;
})();
