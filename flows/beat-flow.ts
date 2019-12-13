import { Encounter, Beat, Choice, NextResult } from '../types';
import { renderBeat } from '../dom/render-beat';
var Probable = require('probable').createProbable;

// TODO: Tool to build this dict.
import { itemMartAnalysts } from '../encounters/item-mart-analysts';
import { cultistsMeeting } from '../encounters/cultists-meeting';

var encounterDict: Record<string, Encounter> = {
  itemMartAnalysts,
  cultistsMeeting
};

var state = {};

function beatFlow({
  encounterId,
  beatIds,
  addToRoute,
  random
}: {
  encounterId: string;
  beatIds: Array<string>;
  addToRoute: (object) => void;
  random: () => void;
}) {
  var probable = Probable({ random });
  var encounter: Encounter = encounterDict[encounterId];
  var beat: Beat = encounter[beatIds[beatIds.length - 1]];
  renderBeat({ beat, onPlayerAction });

  function onPlayerAction({ choice }: { choice: Choice }) {
    var result: NextResult = choice.next({ state, beat, probable, choice });
    beatIds.push(result.beatId);
    var routeUpdates: Record<string, string> = {
      beatIds: beatIds.map(encodeURIComponent).join('|')
    };
    if (result.encounterId) {
      routeUpdates.encounterId = result.encounterId;
    }
    addToRoute(routeUpdates);
  }
}

module.exports = beatFlow;
