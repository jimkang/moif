var d3 = require('d3-selection');
var accessor = require('accessor');
var TornEdges = require('@jimkang/torn-edges');
import { Adventure } from '../types';

var advSelContainer = d3.select('.adventure-selection-container');
var renderTears;

export function renderAdventureSelection({
  adventures,
  onAdventureSelection
}: {
  adventures: Array<Adventure>;
  onAdventureSelection: ({ advId }: { advId: string }) => void;
}) {
  var advSelArea = advSelContainer.select('.paper');
  if (advSelArea.empty()) {
    renderTears = TornEdges({
      parentEl: advSelContainer.node(),
      contentClassName: 'paper',
      pathFill: 'hsl(39.4, 47.1%, 73.3%)'
    });
    advSelArea = advSelContainer.select('.paper');
    advSelArea.append('ul').classed('adventure-selection-root', true);
  }

  var advSelRoot = advSelArea.select('.adventure-selection-root');

  var advSelections = advSelRoot
    .selectAll('.adventure-selection')
    .data(adventures, accessor());

  advSelections.exit().remove();
  advSelections
    .enter()
    .append('li')
    .classed('adventure-selection', true)
    .merge(advSelections)
    .text(accessor('name'))
    .on('click', onAdvSelClick);

  renderTears();

  advSelContainer.classed('hidden', false);

  function onAdvSelClick(adventure) {
    onAdventureSelection({ advId: adventure.id });
  }
}
