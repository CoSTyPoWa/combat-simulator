(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.data = ns.data || {};

  var fallbackUniverses = {
    marvel: { id: 'marvel', label: 'Marvel', icon: '🦸', chipHero: 'Eroe', chipVillain: 'Villain', characters: [] },
    pokemon: { id: 'pokemon', label: 'Pokémon', icon: '⚡', chipHero: 'Eroe', chipVillain: 'Villain', characters: [] },
    nintendo: { id: 'nintendo', label: 'Nintendo', icon: '🎮', chipHero: 'Eroe', chipVillain: 'Villain', characters: [] },
    multiverso: { id: 'multiverso', label: 'Multiverso', icon: '🌌', chipHero: 'Eroe', chipVillain: 'Villain', characters: [] }
  };

  window.UNIVERSES = window.UNIVERSES || fallbackUniverses;
  ns.data.universes = window.UNIVERSES || fallbackUniverses;
})();
