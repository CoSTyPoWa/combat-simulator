(function () {
  window.CombatSimulator = window.CombatSimulator || {};
  var ns = window.CombatSimulator;
  ns.ui = ns.ui || {};

  ns.ui.appShell = {
    ready: function ready() {
      return !!document && !!document.getElementById;
    },
    getPanel: function getPanel(id) {
      return document.getElementById(id);
    }
  };
})();
