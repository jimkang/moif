import { Encounter, Beat, Choice, FreeText, NextResult } from '../types';
import { renderBeat } from '../dom/render-beat';
import { renderResolution } from '../dom/render-resolution';
var Probable = require('probable').createProbable;
import { sendEncounter } from '../tasks/send-encounter';
var ep = require('errorback-promise');
var findWhere = require('lodash.findwhere');
var cloneDeep = require('lodash.clonedeep');

import { encounterDict } from '../encounters';

async function beatFlow({
  encounterId,
  beatIds,
  addToRoute,
  random,
  state,
  actionLogs
}: {
  encounterId: string;
  beatIds: Array<string>;
  addToRoute: (object) => void;
  random: () => void;
  state: any;
  actionLogs: Array<Array<any>>;
}) {
  var actionLog = actionLogs[actionLogs.length - 1];
  var probable = Probable({ random });
  var encounter: Encounter = encounterDict[encounterId];
  var beat: Beat = cloneDeep(encounter[beatIds[beatIds.length - 1]]);
  updateBeat(beat);

  renderBeat({ beat, onPlayerAction });

  if (beat.endOfEncounter) {
    let { error } = await ep(sendEncounter, {
      encounterId,
      beatIds,
      state,
      actionLogs
    });
    let resolutionText =
      'End of encounter. Your feats were sent to the DM! Nice work.';
    if (error) {
      resolutionText = `Doh! This would normally be the end, but there was an error while sending encounter report to the DM. <a href="https://jimkang.com/moif">Try again?</a> Error message: <pre>${error.message}</pre>`;
    }
    renderResolution({ resolutionText });
  }

  function onPlayerAction({
    choice,
    freeText
  }: {
    choice: Choice;
    freeText: FreeText;
  }) {
    var result: NextResult;
    if (choice) {
      result = choice.next({ state, beat, probable, choice });
    } else if (freeText) {
      result = freeText.next({ state, beat, probable, freeText });
    }
    beatIds.push(result.beatId);
    actionLog.push(choice || freeText);
    actionLog.push(result);
    console.log('actionLog', JSON.stringify(actionLog, null, 2));

    updateBeat(beat);
    renderBeat({ beat, onPlayerAction });

    if (result.resolutionText) {
      renderResolution({
        resolutionText: result.resolutionText,
        onAcknowledge: moveOn
      });
      return;
    } else {
      moveOn();
    }

    function moveOn() {
      var routeUpdates: Record<string, string> = {
        beatIds: beatIds.map(encodeURIComponent).join('|')
      };
      if (result.encounterId) {
        routeUpdates.encounterId = result.encounterId;
      }
      addToRoute(routeUpdates);
    }
  }

  function updateBeat(beat: Beat) {
    if (beat.playerOptions && beat.playerOptions.choices) {
      beat.playerOptions.choices = (beat.playerOptions.choices as Array<
        Choice
      >).filter(choiceConditionsMet);
    }
    // TODO: Also filter freeText

    function choiceConditionsMet(choice: Choice) {
      if (choice.oneTime) {
        if (findWhere(actionLog, { id: choice.id })) {
          return false;
        }
      }
      if (choice.condition) {
        return choice.condition({ state });
      }
      return true;
    }
  }
}

module.exports = beatFlow;
