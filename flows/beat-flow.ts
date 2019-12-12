import { Beat } from '../types';
import { renderBeat } from '../dom/render-beat';

function beatFlow({ beat }: { beat: Beat }) {
  renderBeat({ beat });
}

module.exports = beatFlow;
