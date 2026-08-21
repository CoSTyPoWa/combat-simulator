(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};

  function typeCard(type, mult) {
    var label = window.TYPE_LABELS && window.TYPE_LABELS[type] ? window.TYPE_LABELS[type] : type;
    var bonus = mult > 1 ? 'Vantaggio' : 'Danno standard';
    return '<div class="guide-card"><div class="guide-label">' + label + '</div><div class="guide-meta">' + bonus + '</div></div>';
  }

  function renderGuidePanel(kind) {
    if (typeof window.renderGuidePanel === 'function' && kind && kind !== 'types') {
      try {
        return window.renderGuidePanel(kind);
      } catch (err) {
        console.warn('legacy renderGuidePanel failed, using module fallback', err);
      }
    }

    var panel = document.getElementById('guidePanel');
    if (!panel) return null;

    var mode = kind || 'types';
    var html = '';

    if (mode === 'rivals') {
      var rivals = Array.isArray(window.RIVALRIES) ? window.RIVALRIES : [];
      var display = rivals.slice(0, 10);
      html = '<div class="guide-grid">' + display.map(function (pair) {
        var left = (window.CHARACTERS_BY_ID && window.CHARACTERS_BY_ID[pair.a]) ? window.CHARACTERS_BY_ID[pair.a].name : pair.a;
        var right = (window.CHARACTERS_BY_ID && window.CHARACTERS_BY_ID[pair.b]) ? window.CHARACTERS_BY_ID[pair.b].name : pair.b;
        return '<div class="guide-card rival"><div class="guide-label">' + left + ' vs ' + right + '</div><div class="guide-meta">' + (pair.name || 'Nemesi iconica') + '</div></div>';
      }).join('') + '</div>';
    } else if (mode === 'syns') {
      var synergies = Array.isArray(window.SYNERGIES) ? window.SYNERGIES : [];
      html = '<div class="guide-grid">' + synergies.slice(0, 10).map(function (entry) {
        var names = (entry.members || []).map(function (id) {
          var item = window.CHARACTERS_BY_ID && window.CHARACTERS_BY_ID[id];
          return item ? item.name : id;
        }).join(' + ');
        return '<div class="guide-card syn"><div class="guide-label">' + names + '</div><div class="guide-meta">' + (entry.note || 'Sinergia attiva') + '</div></div>';
      }).join('') + '</div>';
    } else {
      var chart = window.TYPE_CHART || {};
      var keys = Object.keys(chart);
      html = '<div class="guide-grid">' + keys.map(function (key) {
        var sample = chart[key] || {};
        var best = Object.keys(sample).filter(function (target) { return sample[target] > 1; }).slice(0, 3);
        return '<div class="guide-card"><div class="guide-label">' + (window.TYPE_LABELS && window.TYPE_LABELS[key] ? window.TYPE_LABELS[key] : key) + '</div><div class="guide-meta">' + (best.length ? 'Ha vantaggio contro: ' + best.map(function (item) { return window.TYPE_LABELS && window.TYPE_LABELS[item] ? window.TYPE_LABELS[item] : item; }).join(', ') : 'Matchup bilanciato') + '</div></div>';
      }).join('') + '</div>';
    }

    panel.innerHTML = html;
    return panel;
  }

  function bindGuideTabs() {
    var buttons = document.querySelectorAll('.guide-tab');
    buttons.forEach(function (button) {
      if (button.dataset.guideBound === 'true') return;
      button.addEventListener('click', function () {
        var kind = button.getAttribute('data-guide') || 'types';
        document.querySelectorAll('.guide-tab').forEach(function (tab) {
          tab.classList.toggle('active', tab === button);
        });
        renderGuidePanel(kind);
      });
      button.dataset.guideBound = 'true';
    });
  }

  if (!window.renderGuidePanel) {
    window.renderGuidePanel = renderGuidePanel;
  }
  if (!window.bindGuideTabs) {
    window.bindGuideTabs = bindGuideTabs;
  }

  ns.ui.guide = {
    renderGuidePanel: renderGuidePanel,
    bindGuideTabs: bindGuideTabs
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      bindGuideTabs();
      renderGuidePanel('types');
    }, { once: true });
  } else {
    bindGuideTabs();
    renderGuidePanel('types');
  }
})();
