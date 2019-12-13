var handleError = require('handle-error-web');
var RouteState = require('route-state');
var beatFlow = require('./flows/beat-flow');
var { version } = require('./package.json');
var { Tablenest } = require('tablenest');
var probable = require('probable');
// TODO: Encounter type?

var tablenest = Tablenest(); // TODO: Use seed

var rootEncounterRoll = tablenest({
  root: [[1, { encounterId: 'itemMartAnalysts', beatId: 'doorKnock' }]]
});

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

function followRoute({ encounterId, beatIds }) {
  if (!encounterId) {
    let { encounterId, beatId } = rootEncounterRoll();
    // [ beatId ] serialized just ends up being beatId.
    routeState.addToRoute({ encounterId, beatIds: beatId });
    return;
  }

  var decodedBeatIds = [];
  if (beatIds) {
    decodedBeatIds = beatIds.split('|').map(decodeURIComponent);
  }

  beatFlow({
    encounterId,
    beatIds: decodedBeatIds,
    routeState,
    probable
  });
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

function renderVersion() {
  var versionInfo = document.getElementById('version-info');
  versionInfo.textContent = version;
}
