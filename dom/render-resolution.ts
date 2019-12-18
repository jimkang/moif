var d3 = require('d3-selection');
var TornEdges = require('../torn-edges/index');

var beatContainer = d3.select('#beat-container');
var resolutionContainer = beatContainer.select('.resolution-container');
var renderTears;
//var resolutionArea = beatContainer.select('.resolution');

export function renderResolution({
  resolutionText,
  onAcknowledge
}: {
  resolutionText: string;
  onAcknowledge?: () => void;
}) {
  var resolutionArea = resolutionContainer.select('.paper');
  if (resolutionArea.empty()) {
    renderTears = TornEdges({
      parentEl: resolutionContainer.node(),
      contentClassName: 'paper'
    });
    resolutionArea = resolutionContainer.select('.paper');
  }

  resolutionContainer.classed('hidden', false);

  resolutionArea.selectAll('*').remove();
  var resolutionDiv = resolutionArea.append('div');
  resolutionDiv.html(resolutionText);
  if (onAcknowledge) {
    resolutionArea
      .append('button')
      .classed('continue-button', true)
      .text('Continue.')
      .on('click', onAcknowledgeClick);
  }

  renderTears();

  function onAcknowledgeClick() {
    resolutionContainer.classed('hidden', true);
    onAcknowledge();
  }
}
