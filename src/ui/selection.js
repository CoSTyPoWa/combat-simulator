(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};

  function ensureAssignment() {
    if (typeof window.assignment === 'undefined') {
      window.assignment = {};
    }
    return window.assignment;
  }

  function setCharacterAssignment(characterId, team) {
    var assignment = ensureAssignment();
    if (!characterId) return assignment;
    assignment[characterId] = team;
    return assignment;
  }

  function clearAssignment() {
    var assignment = ensureAssignment();
    Object.keys(assignment).forEach(function (key) { delete assignment[key]; });
    return assignment;
  }

  function getTeamIds(teamName) {
    var assignment = ensureAssignment();
    return Object.keys(assignment).filter(function (id) { return assignment[id] === teamName; });
  }

  ns.ui.selection = {
    ensureAssignment: ensureAssignment,
    setCharacterAssignment: setCharacterAssignment,
    clearAssignment: clearAssignment,
    getTeamIds: getTeamIds
  };
})();
