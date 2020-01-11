var handleError = require('handle-error-web');
var RouteState = require('route-state');
var beatFlow = require('./flows/beat-flow');
var adventureSelectionFlow = require('./flows/adventure-selection-flow');
var { version } = require('./package.json');
var { Tablenest } = require('tablenest');
var seedrandom = require('seedrandom');
var OLPE = require('one-listener-per-element');
var Crown = require('csscrown');
var adventures = require('./adventures');
var findWhere = require('lodash.findwhere');

var adventureTitleEl = document.getElementById('adventure-title');

var crown = Crown({
  crownClass: 'active-root'
});
var { on } = OLPE();

var actionLogs = [[]];

var routeState = RouteState({
  followRoute,
  windowObject: window,
  propsToCoerceToBool: ['hideUI', 'debug']
});

(function go() {
  renderVersion();
  window.onerror = reportTopLevelError;
  routeState.routeFromHash();
})();

function followRoute({ seed, advId, encounterId, beatIds }) {
  if (!seed) {
    seedWithDate();
    return;
  }

  if (!advId) {
    crown(document.getElementById('adventure-selection-container-container'));
    adventureSelectionFlow({ addToRoute: routeState.addToRoute, adventures });
    return;
  }

  var adventure = findWhere(adventures, { id: advId });
  if (!adventure.state) {
    resetAdventureState(adventure);
  }

  adventureTitleEl.textContent = adventure.name;
  on('#restart-link', 'click', reset);
  on('#change-adventure-link', 'click', resetAll);

  var random = seedrandom(seed);

  if (!encounterId) {
    var tablenest = Tablenest({ random });

    var rootEncounterRoll = tablenest(adventure.rootTableDef);
    let { encounterId, beatId } = rootEncounterRoll();
    // [ beatId ] serialized just ends up being beatId.
    routeState.addToRoute({ encounterId, beatIds: beatId });
    return;
  }

  var decodedBeatIds = [];
  if (beatIds) {
    decodedBeatIds = beatIds.split('|').map(decodeURIComponent);
  }

  crown(document.getElementById('adventure-container'));

  beatFlow({
    encounterId,
    beatIds: decodedBeatIds,
    addToRoute: routeState.addToRoute,
    random,
    state: adventure.state,
    actionLogs
  });

  function reset() {
    resetAdventureState(adventure);
    actionLogs.push([]);
    routeState.overwriteRouteEntirely({ advId });
  }

  function resetAll() {
    resetAdventureState(adventure);
    actionLogs.push([]);
    routeState.overwriteRouteEntirely({});
  }
}

function resetAdventureState(adventure) {
  adventure.state = Object.assign({}, adventure.initialState);
}

function seedWithDate() {
  routeState.addToRoute({ seed: new Date().toISOString() });
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

function renderVersion() {
  var versionInfo = document.getElementById('version-info');
  versionInfo.textContent = version;
}
