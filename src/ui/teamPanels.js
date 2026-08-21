(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};

  function getAssignment() {
    if (typeof window.assignment === 'undefined') {
      window.assignment = {};
    }
    return window.assignment;
  }

  function getTeamIds(teamKey) {
    var assignment = getAssignment();
    return Object.keys(assignment).filter(function (id) { return assignment[id] === teamKey; });
  }

  function renderTeams() {
    if (typeof window.renderTeams === 'function') {
      return window.renderTeams();
    }
    return null;
  }

  ns.ui.teamPanels = {
    getAssignment: getAssignment,
    getTeamIds: getTeamIds,
    renderTeams: renderTeams
  };
})();
