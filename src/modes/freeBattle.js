(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.modes = ns.modes || {};

  function getUniverseRoster() {
    var universeId = window.currentUniverse || 'marvel';
    if (window.UNIVERSES && window.UNIVERSES[universeId] && Array.isArray(window.UNIVERSES[universeId].characters)) {
      return window.UNIVERSES[universeId].characters;
    }
    if (Array.isArray(window.CHARACTERS)) return window.CHARACTERS;
    return [];
  }

  function shuffle(list) {
    var copy = list.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function buildRandomTeam(size, sideBias) {
    var roster = getUniverseRoster();
    var filtered = roster.filter(function (character) {
      if (!character || !character.id) return false;
      if (sideBias === 'heroes') return String(character.side || '').toLowerCase() !== 'villain';
      if (sideBias === 'villain') return String(character.side || '').toLowerCase() === 'villain';
      return true;
    });
    var picks = shuffle(filtered).slice(0, Math.max(1, Number(size) || 2));
    return picks.map(function (character) { return character.id; });
  }

  function applyRandomFreeTeams(size, alsoFight) {
    if (typeof window.applyRandomFreeTeams === 'function' && window.applyRandomFreeTeams !== applyRandomFreeTeams) {
      try {
        return window.applyRandomFreeTeams(size, alsoFight);
      } catch (err) {
        console.warn('Legacy random free teams failed; falling back to local generator.', err);
      }
    }

    var normalizedSize = Math.max(1, Number(size) || 2);
    var teamA = buildRandomTeam(normalizedSize, 'heroes');
    var teamB = buildRandomTeam(normalizedSize, 'villain');
    if (!teamA.length) teamA = buildRandomTeam(normalizedSize, 'all');
    if (!teamB.length) teamB = buildRandomTeam(normalizedSize, 'all');

    if (!window.assignment) window.assignment = {};
    Object.keys(window.assignment).forEach(function (id) { delete window.assignment[id]; });

    teamA.forEach(function (id) { window.assignment[id] = 'A'; });
    teamB.forEach(function (id) { window.assignment[id] = 'B'; });

    if (typeof window.refreshAll === 'function') {
      window.refreshAll();
    }

    if (alsoFight) {
      var fightButton = document.getElementById('fightBtn');
      if (fightButton && !fightButton.disabled) {
        fightButton.click();
      }
    }

    return { teamA: teamA, teamB: teamB };
  }

  function renderCampaign() {
    if (typeof window.renderCampaign === 'function' && window.renderCampaign !== renderCampaign) {
      try {
        return window.renderCampaign();
      } catch (err) {
        console.warn('Legacy campaign renderer failed; using compatibility wrapper.', err);
      }
    }

    var campaignGrid = document.getElementById('campGrid');
    if (!campaignGrid || !window.CAMPAIGNS) return null;

    var uni = window.currentUniverse || 'marvel';
    var list = (window.CAMPAIGNS[uni] || window.CAMPAIGNS.marvel || []).slice();
    var prog = window.campaignProgress || {};

    campaignGrid.innerHTML = '';
    list.forEach(function (mission) {
      var card = document.createElement('article');
      card.className = 'camp-card' + (window.activeCampMission && window.activeCampMission.id === mission.id ? ' selected' : '');
      if (mission.boss) card.classList.add('boss');
      var unlocked = mission.id === list[0].id || !!prog[uni + ':' + mission.id];
      var done = !!prog[uni + ':' + mission.id];
      var inner = '<h4>' + (mission.title || mission.id) + '</h4>' +
        '<p>' + (mission.description || '') + '</p>' +
        '<div class="camp-meta">Nemici: ' + (mission.enemies || []).length + ' · Max eroi: ' + (mission.maxHeroes || (mission.enemies || []).length) + '</div>' +
        '<button type="button" ' + (unlocked ? '' : 'disabled') + '>' + (done ? 'COMPLETATA' : 'AVVIA MISSIONE') + '</button>';
      card.innerHTML = inner;
      var button = card.querySelector('button');
      if (button && unlocked) {
        button.addEventListener('click', function () {
          if (typeof window.startCampaignMission === 'function') {
            window.startCampaignMission(mission);
          } else {
            window.activeCampMission = mission;
            if (typeof window.refreshAll === 'function') window.refreshAll();
          }
        });
      }
      campaignGrid.appendChild(card);
    });

    return campaignGrid;
  }

  function startCampaignMission(mission) {
    if (typeof window.startCampaignMission === 'function' && window.startCampaignMission !== startCampaignMission) {
      try {
        return window.startCampaignMission(mission);
      } catch (err) {
        console.warn('Legacy campaign start failed; using compatibility wrapper.', err);
      }
    }

    window.activeCampMission = mission || null;
    if (typeof window.setAppMode === 'function') {
      window.setAppMode('camp');
    }
    if (typeof window.refreshAll === 'function') {
      window.refreshAll();
    }
    if (typeof window.renderCampaign === 'function') {
      window.renderCampaign();
    }
    return window.activeCampMission;
  }

  function bindRandomButtons() {
    var randomTeamsBtn = document.getElementById('randomTeamsBtn');
    var randomFightBtn = document.getElementById('randomFightBtn');
    if (randomTeamsBtn && randomTeamsBtn.dataset.randomBound !== 'true') {
      randomTeamsBtn.addEventListener('click', function () {
        var size = window.freeRandomSize || 2;
        applyRandomFreeTeams(size, false);
      });
      randomTeamsBtn.dataset.randomBound = 'true';
    }
    if (randomFightBtn && randomFightBtn.dataset.randomBound !== 'true') {
      randomFightBtn.addEventListener('click', function () {
        var size = window.freeRandomSize || 2;
        applyRandomFreeTeams(size, true);
      });
      randomFightBtn.dataset.randomBound = 'true';
    }
  }

  if (!window.applyRandomFreeTeams) {
    window.applyRandomFreeTeams = applyRandomFreeTeams;
  }
  if (!window.renderCampaign) {
    window.renderCampaign = renderCampaign;
  }
  if (!window.startCampaignMission) {
    window.startCampaignMission = startCampaignMission;
  }

  ns.modes.freeBattle = {
    getUniverseRoster: getUniverseRoster,
    buildRandomTeam: buildRandomTeam,
    applyRandomFreeTeams: applyRandomFreeTeams,
    renderCampaign: renderCampaign,
    startCampaignMission: startCampaignMission
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindRandomButtons, { once: true });
  } else {
    bindRandomButtons();
  }
})();
