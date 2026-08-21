(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};
  var compat = ns.utils || ns.core;

  function renderCampaign() {
    return compat && typeof compat.callLegacy === 'function'
      ? compat.callLegacy('renderCampaign', arguments)
      : null;
  }

  function loadCampProgress() {
    if (typeof window.loadCampProgress === 'function') {
      return window.loadCampProgress();
    }
    try {
      return JSON.parse(localStorage.getItem('combatCampaign') || '{}');
    } catch (err) {
      return {};
    }
  }

  function saveCampProgress(progress) {
    if (typeof window.saveCampProgress === 'function') {
      return window.saveCampProgress(progress);
    }
    try {
      localStorage.setItem('combatCampaign', JSON.stringify(progress || {}));
      return true;
    } catch (err) {
      return false;
    }
  }

  function campKey(universeId, missionId) {
    if (typeof window.campKey === 'function') {
      return window.campKey(universeId, missionId);
    }
    return (universeId || 'marvel') + ':' + (missionId || '');
  }

  ns.ui.campaign = {
    renderCampaign: renderCampaign,
    loadCampProgress: loadCampProgress,
    saveCampProgress: saveCampProgress,
    campKey: campKey
  };

  ns.ui.renderCampaign = renderCampaign;
  ns.ui.loadCampProgress = loadCampProgress;
  ns.ui.saveCampProgress = saveCampProgress;
  ns.ui.campKey = campKey;
})();
