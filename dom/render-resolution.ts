var d3 = require('d3-selection');
var accessor = require('accessor');
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
  onAcknowledge: () => void;
}) {
  var resolutionArea = resolutionContainer.select('.paper');
  if (resolutionArea.empty()) {
    renderTears = TornEdges(resolutionContainer.node());
    resolutionArea = resolutionContainer.select('.paper');
  }

  resolutionContainer.classed('hidden', false);

  resolutionArea.select('*').remove();
  var resolutionDiv = resolutionArea.append('div');
  resolutionDiv.html(resolutionText);
  resolutionArea
    .append('button')
    .text('Acknowledge.')
    .on('click', onAcknowledgeClick);

  renderTears();

  function onAcknowledgeClick() {
    resolutionContainer.classed('hidden', true);
    onAcknowledge();
  }
}
