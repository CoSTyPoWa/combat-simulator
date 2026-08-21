(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.core = ns.core || {};

  var safeCall = function safeCall(name, fallback, args) {
    if (typeof window[name] === 'function') {
      return window[name].apply(null, args || []);
    }
    if (typeof fallback === 'function') {
      return fallback.apply(null, args || []);
    }
    return undefined;
  };

  ns.core.bridge = {
    typeMultiplier: function typeMultiplier(atkId, defId) {
      return safeCall('typeMultiplier', function () {
        if (typeof ns.rules.typeMultiplier === 'function') {
          return ns.rules.typeMultiplier(atkId, defId);
        }
        return 1;
      }, [atkId, defId]);
    },
    totalPower: function totalPower(character) {
      return safeCall('totalPower', function () {
        if (typeof ns.rules.totalPower === 'function') {
          return ns.rules.totalPower(character);
        }
        return 0;
      }, [character]);
    },
    getActiveSynergies: function getActiveSynergies(teamIds) {
      return safeCall('getActiveSynergies', function () {
        if (typeof ns.rules.getActiveSynergies === 'function') {
          return ns.rules.getActiveSynergies(teamIds);
        }
        return [];
      }, [teamIds]);
    },
    applySynergyBonus: function applySynergyBonus(baseStats, teamIds) {
      return safeCall('applySynergyBonus', function () {
        if (typeof ns.rules.applySynergyBonus === 'function') {
          return ns.rules.applySynergyBonus(baseStats, teamIds);
        }
        return baseStats || {};
      }, [baseStats, teamIds]);
    },
    findRivalry: function findRivalry(id1, id2) {
      return safeCall('findRivalry', function () {
        if (typeof ns.rules.findRivalry === 'function') {
          return ns.rules.findRivalry(id1, id2);
        }
        return null;
      }, [id1, id2]);
    }
  };
})();
