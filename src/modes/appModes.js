(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.modes = ns.modes || {};

  function getAppMode() {
    if (window.appMode) return window.appMode;
    if (ns.ui && ns.ui.selection && ns.ui.selection.appMode) return ns.ui.selection.appMode;
    return 'free';
  }

  function setAppMode(mode) {
    var nextMode = ['free', 'vs', 'camp'].indexOf(mode) >= 0 ? mode : 'free';
    window.appMode = nextMode;
    if (ns.ui && ns.ui.selection) ns.ui.selection.appMode = nextMode;

    var buttons = document.querySelectorAll('.mode-btn');
    buttons.forEach(function (button) {
      var isActive = (button.getAttribute('data-mode') || '') === nextMode;
      button.classList.toggle('active', isActive);
    });

    var vsSection = document.getElementById('vsSection');
    var campSection = document.getElementById('campSection');
    var freeRandomBar = document.getElementById('freeRandomBar');

    if (vsSection) {
      vsSection.classList.toggle('hidden', nextMode !== 'vs');
    }
    if (campSection) {
      campSection.classList.toggle('hidden', nextMode !== 'camp');
    }
    if (freeRandomBar) {
      freeRandomBar.style.display = nextMode === 'free' ? 'flex' : 'none';
    }

    if (typeof window.refreshAll === 'function') {
      try {
        window.refreshAll();
      } catch (err) {
        console.warn('refreshAll failed during app mode switch', err);
      }
    }

    if (nextMode === 'camp' && typeof window.renderCampaign === 'function') {
      try {
        window.renderCampaign();
      } catch (err) {
        console.warn('renderCampaign failed during app mode switch', err);
      }
    }

    return nextMode;
  }

  function bindModeButtons() {
    var buttons = document.querySelectorAll('.mode-btn');
    buttons.forEach(function (button) {
      if (button.dataset.modeBound === 'true') return;
      button.addEventListener('click', function () {
        setAppMode(button.getAttribute('data-mode') || 'free');
      });
      button.dataset.modeBound = 'true';
    });
  }

  if (!window.setAppMode) {
    window.setAppMode = setAppMode;
  }
  if (!window.getAppMode) {
    window.getAppMode = getAppMode;
  }

  ns.modes = {
    getAppMode: getAppMode,
    setAppMode: setAppMode,
    bindModeButtons: bindModeButtons
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      bindModeButtons();
      setAppMode(getAppMode());
    }, { once: true });
  } else {
    bindModeButtons();
    setAppMode(getAppMode());
  }
})();
