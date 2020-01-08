import { renderAdventureSelection } from '../dom/render-adventure-selection';

var adventures = [
  { id: 'raven1', name: 'Raven I' },
  { id: 'raven2', name: 'Raven: Intrigue in the Woods' }
];

async function adventureSelectionFlow({
  addToRoute
}: {
  addToRoute: (object) => void;
}) {
  renderAdventureSelection({ adventures, onAdventureSelection });

  function onAdventureSelection({ advId }: { advId: string }) {
    addToRoute({ advId });
  }
}

module.exports = adventureSelectionFlow;
