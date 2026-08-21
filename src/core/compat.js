(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.core = ns.core || {};
  ns.utils = ns.utils || {};

  function callLegacy(name, args, targetScope) {
    var scope = targetScope || window;
    var fn = scope[name];
    if (typeof fn !== 'function') return null;
    try {
      return fn.apply(scope, args || []);
    } catch (err) {
      console.warn('Legacy helper failed: ' + name, err);
      return null;
    }
  }

  function setWindowAlias(name, value) {
    if (typeof window[name] === 'undefined' && typeof value !== 'undefined') {
      window[name] = value;
    }
    return window[name];
  }

  function ensureStateObject(objectName, initialValue) {
    if (!window[objectName]) {
      window[objectName] = initialValue;
    }
    return window[objectName];
  }

  ns.utils.callLegacy = callLegacy;
  ns.utils.setWindowAlias = setWindowAlias;
  ns.utils.ensureStateObject = ensureStateObject;
  ns.core.callLegacy = callLegacy;
  ns.core.setWindowAlias = setWindowAlias;
  ns.core.ensureStateObject = ensureStateObject;
})();
