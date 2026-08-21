(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};

  function renderGuidePanel(kind) {
    if (typeof window.renderGuidePanel === 'function') {
      return window.renderGuidePanel(kind);
    }

    var panel = document.getElementById('guidePanel');
    if (!panel) return null;
    panel.classList.add('open');

    var html = '<div class="guide-title">Info</div>';
    if (kind === 'syn' || kind === 'syns') {
      html = '<div class="guide-title">Sinergie</div>';
      if (window.SYNERGIES && Array.isArray(window.SYNERGIES)) {
        window.SYNERGIES.forEach(function (s) {
          if (!s || !Array.isArray(s.members)) return;
          html += '<div class="guide-row"><strong>' + (s.name || 'Sinergia') + '</strong> · min ' + (s.min || 1) + '</div>';
        });
      }
    } else if (kind === 'nem' || kind === 'rivals') {
      html = '<div class="guide-title">Nemesi</div>';
      if (window.RIVALRIES && Array.isArray(window.RIVALRIES)) {
        window.RIVALRIES.forEach(function (r) {
          if (!r) return;
          html += '<div class="guide-row"><strong>' + (r.name || 'Nemesi') + '</strong></div>';
        });
      }
    } else {
      html = '<div class="guide-title">Tipi</div><div class="guide-row">Ogni personaggio ha tipi e debolezze. Le relazioni di tipo vengono applicate in battaglia.</div>';
    }

    panel.innerHTML = html;
    return html;
  }

  ns.ui.guide = {
    renderGuidePanel: renderGuidePanel
  };
})();
