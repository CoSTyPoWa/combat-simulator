(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};

  ns.ui.selection = {
    assignment: {},
    currentUniverse: 'marvel',
    currentFilter: 'all',
    appMode: 'free',
    activeCampMission: null,
    getTeamIds: function getTeamIds(teamKey) {
      var assignment = ns.ui.selection.assignment || {};
      var ids = Object.keys(assignment).filter(function (id) { return assignment[id] === teamKey; });
      return ids;
    },
    setAssignment: function setAssignment(id, team) {
      var assignment = ns.ui.selection.assignment || {};
      if (team) assignment[id] = team;
      else delete assignment[id];
      ns.ui.selection.assignment = assignment;
      return assignment;
    },
    clearAssignment: function clearAssignment() {
      ns.ui.selection.assignment = {};
      return ns.ui.selection.assignment;
    }
  };
})();
