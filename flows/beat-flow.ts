import { Beat, Choice } from '../types';
import { renderBeat } from '../dom/render-beat';

var state = {};

function beatFlow({
  beat,
  routeState,
  probable
}: {
  beat: Beat;
  routeState: any;
  probable: any;
}) {
  renderBeat({ beat, onPlayerAction });

  function onPlayerAction({ choice }: { choice: Choice }) {
    const playerMove: string = choice.next({ state, beat, probable, choice });
    routeState.addToRoute({ playerMove });
  }
}

module.exports = beatFlow;
