import { Beat, Choice, FreeText } from '../types';
var d3 = require('d3-selection');
var accessor = require('accessor');
var TornEdges = require('../torn-edges/index');

var beatContainer = d3.select('#beat-container');
var setupContainer = beatContainer.select('.setup-container');
var renderTears;

export function renderBeat({
  beat,
  onPlayerAction
}: {
  beat: Beat;
  onPlayerAction: ({
    choice,
    freeText
  }: {
    choice?: Choice;
    freeText?: FreeText;
  }) => void;
}) {
  var setupArea = setupContainer.select('.paper');
  if (setupArea.empty()) {
    renderTears = TornEdges(setupContainer.node());
    setupArea = setupContainer.select('.paper');
  }

  setupContainer.classed('hidden', false);

  setupArea.select('*').remove();
  setupArea.html(beat.desc);
  if (beat.img) {
    setupArea
      .insert('img', ':first-child')
      .classed('picture', true)
      .attr('src', beat.img)
      .attr('alt', beat.imgAlt);
  }
  if (beat.question) {
    setupArea
      .append('span')
      .classed('question', true)
      .text(beat.question);
  }
  if (beat.playerOptions) {
    if (beat.playerOptions.choices) {
      let choiceRoot = setupArea.append('ul').classed('choices', true);
      let choices = choiceRoot
        .selectAll('.choice')
        .data(beat.playerOptions.choices, accessor());
      choices
        .enter()
        .append('li')
        .classed('choice', true)
        .text(accessor('desc'))
        .on('click', onChoiceClick);
    } else if (beat.playerOptions.freeText) {
      let freeTextContainer = setupArea
        .append('div')
        .classed('free-text-container', true)
        .classed('centered-col', true);
      freeTextContainer
        .append('div')
        .classed('free-text-hint', true)
        .text(beat.playerOptions.freeText.hint);
      freeTextContainer.append('textarea').classed('free-text', true);
      freeTextContainer
        .append('button')
        .text('Done')
        .classed('continue-button', true)
        .classed('free-text-button', true)
        .on('click', onFreeTextDoneClick);
    }
  }

  renderTears();

  function onChoiceClick(choice: Choice) {
    d3.select(this).classed('selected', true);
    onPlayerAction({ choice });
  }

  function onFreeTextDoneClick() {
    beat.playerOptions.freeText.value = setupArea
      .select('.free-text')
      .node().value;
    onPlayerAction({ freeText: beat.playerOptions.freeText });
  }
}
