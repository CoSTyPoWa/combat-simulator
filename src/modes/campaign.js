(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.modes = ns.modes || {};

  function getCampaignProgress() {
    try {
      return JSON.parse(localStorage.getItem('combatCampaign') || '{}');
    } catch (err) {
      return {};
    }
  }

  function saveCampaignProgress(progress) {
    try {
      localStorage.setItem('combatCampaign', JSON.stringify(progress));
    } catch (err) {
      console.warn('Could not save campaign progress', err);
    }
  }

  function campKey(universeId, missionId) {
    return (universeId || 'marvel') + ':' + (missionId || '');
  }

  function loadCampUsedIds(universeId) {
    try {
      var stored = JSON.parse(localStorage.getItem('combatCampaignUsed') || '{}');
      return new Set((stored[universeId] || []).slice());
    } catch (err) {
      return new Set();
    }
  }

  function markCampHeroesUsed(universeId, ids) {
    var stored = {};
    try {
      stored = JSON.parse(localStorage.getItem('combatCampaignUsed') || '{}');
    } catch (err) {
      stored = {};
    }
    var set = new Set((stored[universeId] || []).slice());
    (ids || []).forEach(function (id) { set.add(id); });
    stored[universeId] = Array.from(set);
    localStorage.setItem('combatCampaignUsed', JSON.stringify(stored));
    return stored[universeId];
  }

  function clearCampUsed(universeId) {
    try {
      if (!universeId) {
        localStorage.removeItem('combatCampaignUsed');
        return true;
      }
      var stored = JSON.parse(localStorage.getItem('combatCampaignUsed') || '{}');
      delete stored[universeId];
      localStorage.setItem('combatCampaignUsed', JSON.stringify(stored));
      return true;
    } catch (err) {
      return false;
    }
  }

  ns.modes.campaign = {
    getCampaignProgress: getCampaignProgress,
    saveCampaignProgress: saveCampaignProgress,
    campKey: campKey,
    loadCampUsedIds: loadCampUsedIds,
    markCampHeroesUsed: markCampHeroesUsed,
    clearCampUsed: clearCampUsed
  };
  ns.modes.campaignHelpers = ns.modes.campaign;
})();
