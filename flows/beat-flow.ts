import { Encounter, Beat, Choice } from '../types';
import { renderBeat } from '../dom/render-beat';

import { itemMartAnalysts } from '../encounters/item-mart-analysts';

var encounterDict: Record<string, Encounter> = {
  itemMartAnalysts
};

var state = {};

function beatFlow({
  encounterId,
  beatIds,
  routeState,
  probable
}: {
  encounterId: string;
  beatIds: Array<string>;
  routeState: any;
  probable: any;
}) {
  var encounter: Encounter = encounterDict[encounterId];
  var beat: Beat = encounter[beatIds[beatIds.length - 1]];
  renderBeat({ beat, onPlayerAction });

  function onPlayerAction({ choice }: { choice: Choice }) {
    const nextBeatId: string = choice.next({ state, beat, probable, choice });
    beatIds.push(nextBeatId);
    routeState.addToRoute({
      beatIds: beatIds.map(encodeURIComponent).join('|')
    });
  }
}

module.exports = beatFlow;
