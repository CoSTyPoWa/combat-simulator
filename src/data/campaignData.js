(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.data = ns.data || {};

  ns.data.CAMPAIGN_BOSSES = {
    marvel: { id:'mboss', title:'BOSS — Inevitabile', blurb:'Thanos. Al massimo due eroi — scegli bene.', enemies:['thanos'], maxHeroes:2, boss:true, bossHp:1.25, hint:'fino a 2 vs 1' },
    pokemon: { id:'pboss', title:'BOSS — Mewtwo', blurb:'Il clone. Al massimo due alleati — scegli bene.', enemies:['mewtwo'], maxHeroes:2, boss:true, bossHp:1.25, hint:'fino a 2 vs 1' },
    nintendo: { id:'nboss', title:'BOSS — Ganondorf', blurb:'Il Re Demone. Al massimo due eroi — scegli bene.', enemies:['ganondorf'], maxHeroes:2, boss:true, bossHp:1.25, hint:'fino a 2 vs 1' },
    multiverso: { id:'xboss', title:'BOSS — Trono spezzato', blurb:'Thanos, Dormammu e Palkia. Squadra stretta.', enemies:['thanos','dormammu','palkia'], maxHeroes:4, boss:true, bossHp:1.15, hint:'fino a 4 vs 3' }
  };

  ns.data.CAMPAIGNS = {
    marvel: [
      { id:'m1', title:'Ombre su New York', blurb:'Goblin, Electro e Mysterio.', enemies:['goblin','electro','mysterio'], maxHeroes:3, hint:'3 vs 3' },
      { id:'m2', title:'Ragnatele e tentacoli', blurb:'Venom, Doc Ock e Kingpin.', enemies:['venom','docock','kingpin'], maxHeroes:3, hint:'3 vs 3' },
      { id:'m3', title:'Tradimenti e sangue', blurb:'Loki, Carnage e Ultron.', enemies:['loki','carnage','ultron'], maxHeroes:3, hint:'3 vs 3' }
    ],
    pokemon: [
      { id:'p1', title:'Palestre d\'ombra', blurb:'Gengar, Umbreon e Absol.', enemies:['gengar','umbreon','absol'], maxHeroes:3, hint:'3 vs 3' },
      { id:'p2', title:'Artigli e ombre', blurb:'Weavile, Zoroark e Absol.', enemies:['weavile','zoroark'], maxHeroes:3, hint:'fino a 3 vs 2' },
      { id:'p3', title:'Incubi e draghi', blurb:'Darkrai, Salamence e Hydreigon.', enemies:['darkrai','salamence'], maxHeroes:3, hint:'fino a 3 vs 2' }
    ],
    nintendo: [
      { id:'n1', title:'Regno sotto assedio', blurb:'Wario e Bowser Jr.', enemies:['wario','bowserjr'], maxHeroes:3, hint:'fino a 3 vs 2' },
      { id:'n2', title:'Crepuscolo e maniero', blurb:'Zant e King Boo.', enemies:['zant','kingboo'], maxHeroes:3, hint:'fino a 3 vs 2' },
      { id:'n3', title:'Caccia e rivali', blurb:'Ridley e Wolf.', enemies:['ridley','wolf'], maxHeroes:3, hint:'fino a 3 vs 2' }
    ],
    multiverso: [
      { id:'x1', title:'Prima fenditura', blurb:'Taskmaster, Vulture e Bowser.', enemies:['taskmaster','vulture','bowser'], maxHeroes:3, hint:'3 vs 3' },
      { id:'x2', title:'Tiranni e bestie', blurb:'Killmonger, Red Skull e Hydreigon.', enemies:['killmonger','redskull','hydreigon'], maxHeroes:3, hint:'3 vs 3' },
      { id:'x3', title:'Stregoni e Zebes', blurb:'Hela, Doom e Mother Brain.', enemies:['hela','doom','motherbrain'], maxHeroes:3, hint:'3 vs 3' },
      { id:'x4', title:'Macchine e leggende', blurb:'Kang, Magneto e Andross.', enemies:['kang','magneto','andross'], maxHeroes:3, hint:'3 vs 3' },
      { id:'x5', title:'Abissi', blurb:'Giratina, Galleom e Dark Samus.', enemies:['giratina','galleom','darksamus'], maxHeroes:3, hint:'3 vs 3' },
      { id:'x6', title:'Fine del ciclo', blurb:'Yveltal, Dialga, Tyranitar e K. Rool.', enemies:['yveltal','dialga','tyranitar'], maxHeroes:3, hint:'3 vs 3' },
      { id:'x7', title:'Residui', blurb:'K. Rool, Dedede e Bowser Jr.', enemies:['krool','dedede','bowserjr'], maxHeroes:3, hint:'3 vs 3' }
    ]
  };

  function campKey(universeId, missionId) {
    return (universeId || 'marvel') + ':' + (missionId || '');
  }

  function loadCampProgress(){
    try { return JSON.parse(localStorage.getItem('combatCampaign') || '{}'); } catch (err) { return {}; }
  }

  function saveCampProgress(progress){
    try { localStorage.setItem('combatCampaign', JSON.stringify(progress)); } catch (err) { console.warn('Could not save campaign progress', err); }
  }

  function loadCampUsed(){
    try { return JSON.parse(localStorage.getItem('combatCampaignUsed') || '{}'); } catch (err) { return {}; }
  }

  function saveCampUsed(store){
    try { localStorage.setItem('combatCampaignUsed', JSON.stringify(store)); } catch (err) { console.warn('Could not save campaign usage', err); }
  }

  function getCampUsedIds(universeId){
    var stored = loadCampUsed();
    return new Set((stored[universeId] || []).slice());
  }

  function markCampHeroesUsed(universeId, ids){
    var stored = loadCampUsed();
    var set = new Set((stored[universeId] || []).slice());
    (ids || []).forEach(function (id) { set.add(id); });
    stored[universeId] = Array.from(set);
    saveCampUsed(stored);
    return stored[universeId];
  }

  function clearCampUsed(universeId){
    var stored = loadCampUsed();
    if (!universeId) {
      Object.keys(stored).forEach(function (key) { delete stored[key]; });
    } else {
      delete stored[universeId];
    }
    saveCampUsed(stored);
    return stored;
  }

  ns.data.campaignData = {
    CAMPAIGN_BOSSES: ns.data.CAMPAIGN_BOSSES,
    CAMPAIGNS: ns.data.CAMPAIGNS,
    campKey: campKey,
    loadCampProgress: loadCampProgress,
    saveCampProgress: saveCampProgress,
    loadCampUsed: loadCampUsed,
    saveCampUsed: saveCampUsed,
    getCampUsedIds: getCampUsedIds,
    markCampHeroesUsed: markCampHeroesUsed,
    clearCampUsed: clearCampUsed
  };

  window.CAMPAIGN_BOSSES = ns.data.CAMPAIGN_BOSSES;
  window.CAMPAIGNS = ns.data.CAMPAIGNS;
  window.loadCampProgress = loadCampProgress;
  window.saveCampProgress = saveCampProgress;
  window.campKey = campKey;
  window.loadCampUsed = loadCampUsed;
  window.saveCampUsed = saveCampUsed;
  window.getCampUsedIds = getCampUsedIds;
  window.markCampHeroesUsed = markCampHeroesUsed;
  window.clearCampUsed = clearCampUsed;
})();
