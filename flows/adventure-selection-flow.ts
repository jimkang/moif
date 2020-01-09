import { renderAdventureSelection } from '../dom/render-adventure-selection';
import { Adventure } from '../types';

async function adventureSelectionFlow({
  adventures,
  addToRoute
}: {
  adventures: Array<Adventure>;
  addToRoute: (object) => void;
}) {
  renderAdventureSelection({ adventures, onAdventureSelection });

  function onAdventureSelection({ advId }: { advId: string }) {
    addToRoute({ advId });
  }
}

module.exports = adventureSelectionFlow;
