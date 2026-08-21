(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};

  function drawBattleSummary(events, winner) {
    if (typeof window.buildSummary === 'function' && window.buildSummary !== drawBattleSummary) {
      try {
        return window.buildSummary(events, winner);
      } catch (err) {
        console.warn('Legacy buildSummary failed; using results compatibility wrapper.', err);
      }
    }

    var summary = [];
    if (events && events.scenario && events.scenario.nome) {
      summary.push({ tag: 'scene', text: 'Scontro in ' + events.scenario.nome + '.' });
    }
    return summary;
  }

  function renderResultsPanel(events, winner) {
    if (typeof window.renderResultsPanel === 'function' && window.renderResultsPanel !== renderResultsPanel) {
      try {
        return window.renderResultsPanel(events, winner);
      } catch (err) {
        console.warn('Legacy renderResultsPanel failed; falling back to wrapper.', err);
      }
    }

    var logBox = document.getElementById('logBox');
    var winnerBanner = document.getElementById('winnerBanner');
    if (!logBox && !winnerBanner) return null;

    var summary = drawBattleSummary(events, winner);
    if (logBox) {
      logBox.innerHTML = '';
      summary.forEach(function (line) {
        var row = document.createElement('div');
        row.className = 'log-line ' + (line.tag || 'narr');
        row.textContent = line.text || '';
        logBox.appendChild(row);
      });
    }

    if (winnerBanner) {
      winnerBanner.innerHTML = '';
      var text = winner === 'A' ? 'Vittoria Squadra A' : (winner === 'B' ? 'Vittoria Squadra B' : 'Pareggio');
      var banner = document.createElement('div');
      banner.className = 'winner-banner';
      banner.textContent = text;
      winnerBanner.appendChild(banner);
    }

    return summary;
  }

  function saveToArchive(winner, teamAIds, teamBIds, rounds) {
    if (typeof window.saveToArchive === 'function' && window.saveToArchive !== saveToArchive) {
      try {
        return window.saveToArchive(winner, teamAIds, teamBIds, rounds);
      } catch (err) {
        console.warn('Legacy saveToArchive failed; falling back to wrapper.', err);
      }
    }

    var archive = [];
    try {
      archive = JSON.parse(localStorage.getItem('combatArchive') || '[]');
    } catch (err) {
      archive = [];
    }

    var nameOf = function (id) {
      var findChar = window.findChar || function () { return null; };
      var character = findChar(id);
      return character ? character.name : id;
    };

    archive.unshift({
      date: new Date().toLocaleString('it-IT'),
      winner: winner,
      rounds: rounds || 0,
      universe: window.currentUniverse || 'marvel',
      teamA: (teamAIds || []).map(nameOf),
      teamB: (teamBIds || []).map(nameOf)
    });

    archive = archive.slice(0, 20);
    localStorage.setItem('combatArchive', JSON.stringify(archive));
    if (typeof window.renderArchive === 'function') {
      window.renderArchive();
    }
    return archive;
  }

  function renderArchive() {
    if (typeof window.renderArchive === 'function' && window.renderArchive !== renderArchive) {
      try {
        return window.renderArchive();
      } catch (err) {
        console.warn('Legacy renderArchive failed; falling back to wrapper.', err);
      }
    }

    var archiveSection = document.getElementById('archiveSection');
    var archiveGrid = document.getElementById('archiveGrid');
    if (!archiveSection || !archiveGrid) return null;

    var archive = [];
    try {
      archive = JSON.parse(localStorage.getItem('combatArchive') || '[]');
    } catch (err) {
      archive = [];
    }

    archiveSection.style.display = 'block';
    archiveGrid.innerHTML = '';

    if (!archive.length) {
      archiveGrid.innerHTML = '<div class="archive-empty">Nessuna battaglia ancora. Dopo il primo scontro comparirà qui lo storico.</div>';
      return archive;
    }

    archive.forEach(function (entry) {
      var card = document.createElement('div');
      card.className = 'archive-card';
      var winnerClass = entry.winner === 'A' ? 'win-a' : (entry.winner === 'B' ? 'win-b' : 'win-draw');
      var winnerText = entry.winner === 'pareggio' ? 'Pareggio' : ('Squadra ' + entry.winner);
      card.innerHTML = '<div class="arc-date">' + (entry.date || '') + (entry.rounds ? ' · ' + entry.rounds + ' round' : '') + (entry.universe ? ' · ' + entry.universe : '') + '</div>' +
        '<div class="arc-teams"><span>' + ((entry.teamA || []).join(', ') || '—') + '</span> vs <span>' + ((entry.teamB || []).join(', ') || '—') + '</span></div>' +
        '<div class="arc-winner"><span class="' + winnerClass + '">' + winnerText + '</span></div>';
      archiveGrid.appendChild(card);
    });

    return archive;
  }

  function bindResultsActions() {
    var resetBtn = document.getElementById('resetBtn');
    if (resetBtn && resetBtn.dataset.resultBind !== 'true') {
      resetBtn.addEventListener('click', function () {
        if (typeof window.resetBattleView === 'function') {
          window.resetBattleView();
        }
      });
      resetBtn.dataset.resultBind = 'true';
    }

    var clearBtn = document.getElementById('clearArchiveBtn');
    if (clearBtn && clearBtn.dataset.resultBind !== 'true') {
      clearBtn.addEventListener('click', function () {
        localStorage.removeItem('combatArchive');
        renderArchive();
      });
      clearBtn.dataset.resultBind = 'true';
    }
  }

  if (!window.buildSummary) {
    window.buildSummary = drawBattleSummary;
  }
  if (!window.renderArchive) {
    window.renderArchive = renderArchive;
  }
  if (!window.saveToArchive) {
    window.saveToArchive = saveToArchive;
  }
  if (!window.renderResultsPanel) {
    window.renderResultsPanel = renderResultsPanel;
  }

  ns.ui.results = {
    drawBattleSummary: drawBattleSummary,
    renderResultsPanel: renderResultsPanel,
    saveToArchive: saveToArchive,
    renderArchive: renderArchive,
    bindResultsActions: bindResultsActions
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindResultsActions, { once: true });
  } else {
    bindResultsActions();
  }
})();
