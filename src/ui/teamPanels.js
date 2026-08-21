(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};

  function getAssignment() {
    if (window.assignment) return window.assignment;
    if (ns.ui.selection && ns.ui.selection.assignment) return ns.ui.selection.assignment;
    return {};
  }

  function getTeamIds(teamKey) {
    var assignment = getAssignment();
    return Object.keys(assignment).filter(function (id) {
      return assignment[id] === teamKey;
    });
  }

  function computePowerForIds(ids) {
    return (ids || []).reduce(function (sum, id) {
      var character = window.findChar ? window.findChar(id) : null;
      if (!character) return sum;
      var stats = window.applySynergyBonus ? window.applySynergyBonus(character.stats, ids) : character.stats;
      return sum + (
        (stats.forza || 0) +
        (stats.velocita || 0) +
        (stats.durabilita || 0) +
        (stats.energia || 0) +
        (stats.combattimento || 0) +
        (stats.intelligenza || 0)
      );
    }, 0);
  }

  function fillList(ids, ul) {
    ul.innerHTML = '';
    if (!ids.length) {
      var empty = document.createElement('li');
      empty.className = 'empty-note';
      empty.style.background = 'transparent';
      empty.textContent = 'Nessun personaggio ancora selezionato';
      ul.appendChild(empty);
      return;
    }

    ids.forEach(function (id) {
      var character = window.findChar ? window.findChar(id) : null;
      if (!character) return;

      var li = document.createElement('li');
      var label = document.createElement('span');
      var stats = window.applySynergyBonus ? window.applySynergyBonus(character.stats, ids) : character.stats;
      var power = (stats.forza || 0) + (stats.velocita || 0) + (stats.durabilita || 0) + (stats.energia || 0) + (stats.combattimento || 0) + (stats.intelligenza || 0);
      label.textContent = (character.icon || '') + ' ' + character.name + ' · ' + power;

      li.appendChild(label);

      var shouldAllowRemove = !(window.appMode === 'camp' && window.activeCampMission && getAssignment()[id] === 'B');
      if (shouldAllowRemove) {
        var rm = document.createElement('button');
        rm.className = 'rm';
        rm.textContent = '✕';
        rm.addEventListener('click', function () {
          delete getAssignment()[id];
          if (typeof window.refreshAll === 'function') {
            window.refreshAll();
          }
        });
        li.appendChild(rm);
      }

      ul.appendChild(li);
    });
  }

  function renderTeams() {
    if (typeof window.renderTeams === 'function' && window.renderTeams !== renderTeams) {
      try {
        return window.renderTeams();
      } catch (err) {
        console.warn('Legacy renderTeams failed; falling back to module renderer', err);
      }
    }

    var teamAList = document.getElementById('teamAList');
    var teamBList = document.getElementById('teamBList');
    var teamAPowerEl = document.getElementById('teamAPower');
    var teamBPowerEl = document.getElementById('teamBPower');

    if (!teamAList || !teamBList || !teamAPowerEl || !teamBPowerEl) return null;

    var teamAIds = getTeamIds('A');
    var teamBIds = getTeamIds('B');

    fillList(teamAIds, teamAList);
    fillList(teamBIds, teamBList);

    var powerA = computePowerForIds(teamAIds);
    var powerB = computePowerForIds(teamBIds);

    teamAPowerEl.textContent = powerA;
    teamBPowerEl.textContent = powerB;

    return {
      teamAIds: teamAIds,
      teamBIds: teamBIds,
      powerA: powerA,
      powerB: powerB
    };
  }

  if (!window.renderTeams) {
    window.renderTeams = renderTeams;
  }

  ns.ui.teamPanels = {
    getAssignment: getAssignment,
    getTeamIds: getTeamIds,
    computePowerForIds: computePowerForIds,
    renderTeams: renderTeams,
    fillList: fillList
  };
})();
