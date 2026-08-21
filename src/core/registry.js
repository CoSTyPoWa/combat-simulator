(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.core = ns.core || {};
  ns.core.registry = ns.core.registry || {};

  function toArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function getCharacters() {
    return toArray((ns.data && ns.data.characters) || window.CHARACTERS || []);
  }

  function getUniverses() {
    return (ns.data && ns.data.universes) || window.UNIVERSES || {};
  }

  function findCharacter(id) {
    if (!id) return null;
    var chars = getCharacters();
    return chars.find(function (c) { return c && c.id === id; }) || null;
  }

  function getUniverseCharacters(universeId) {
    var uni = getUniverses();
    var selected = universeId ? (uni[universeId] || null) : null;
    if (!selected) return getCharacters();
    return Array.isArray(selected.characters) ? selected.characters : getCharacters();
  }

  function teamPower(ids) {
    var teamIds = toArray(ids);
    return teamIds.reduce(function (sum, id) {
      var c = findCharacter(id);
      if (!c || !c.stats) return sum;
      var s = c.stats;
      return sum + (s.forza || 0) + (s.velocita || 0) + (s.durabilita || 0) + (s.energia || 0) + (s.combattimento || 0) + (s.intelligenza || 0);
    }, 0);
  }

  ns.core.registry = {
    getCharacters: getCharacters,
    getUniverses: getUniverses,
    findCharacter: findCharacter,
    getUniverseCharacters: getUniverseCharacters,
    teamPower: teamPower
  };
})();
