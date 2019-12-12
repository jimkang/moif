import { Beat, Choice, FreeText } from '../types';
var d3 = require('d3-selection');
var accessor = require('accessor');

var beatContainer = d3.select('#beat-container');
var setupArea = beatContainer.select('.setup');
//var resolutionArea = beatContainer.select('.resolution');

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
    if (Array.isArray(beat.playerOptions)) {
      let choiceRoot = setupArea.append('ul').classed('choices', true);
      let choices = choiceRoot
        .selectAll('.choice')
        .data(beat.playerOptions, accessor());
      choices
        .enter()
        .append('li')
        .classed('choice', true)
        .text(accessor('desc'))
        .on('click', onChoiceClick);
    } else {
      setupArea.append('textarea').classed('free-text').true;
    }
  }

  function onChoiceClick(choice: Choice) {
    d3.select(this).classed('selected', true);
    onPlayerAction({ choice });
  }
}
