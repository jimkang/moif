var handleError = require('handle-error-web');
var RouteState = require('route-state');
var beatFlow = require('./flows/beat-flow');
var { version } = require('./package.json');
var { Tablenest } = require('tablenest');
import { itemMartAnalysts as encounter } from './encounters/item-mart-analysts';
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

function followRoute({ encounterId, beatId }) {
  if (!encounterId) {
    routeState.addToRoute(rootEncounterRoll());
    return;
  }

  // TODO: Actually look up encounter in dict of encounters.
  beatFlow({ beat: encounter[beatId] });
}

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

function renderVersion() {
  var versionInfo = document.getElementById('version-info');
  versionInfo.textContent = version;
}
