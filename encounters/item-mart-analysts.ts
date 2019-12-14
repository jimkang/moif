import { Beat, NextResult } from '../types';

export var itemMartAnalysts: Record<string, Beat> = {
  doorKnock: {
    id: 'doorKnock',
    img: 'https://smidgeo.com/bots/media/slop-cube4.gif',
    imgAlt: 'A picture of two guys',
    desc: `<p>Fred and Joe are at the door of your inn room.</p>
          <p>They describe themselves as Growth Opportunity Analysts for Item Mart. They are interested in your experiences with the Temple of Elemental Evil.
          <p>They mention that they want to pay you a 50 gp consulting fee.</p>`,
    question: 'What do you do?',
    playerOptions: [
      {
        id: 'goAway',
        desc: 'Tell them to go away.',
        condition({ state }) {
          return !state.paymentAccepted;
        },
        next({ probable, state }) {
          state.itemMartAgentsDismissed = true;
          if (probable.roll(2) === 0) {
            return { beatId: 'discussion', encounterId: 'cultistsMeeting' };
          } else {
            return { beatId: 'end' };
          }
        }
      },
      {
        id: 'askFor100',
        desc: 'Ask for 100 gp.',
        condition({ state }) {
          return !state.itemMartHagglingDone;
        },
        next({ state, probable }): NextResult {
          state.itemMartHagglingDone = true;
          const check = probable.rollDie(20);
          var resolutionText = `[Charmisma check roll: ${check}]`;
          var nextBeatId = 'doorKnock';
          if (check <= 16) {
            state.gp = 100;
            resolutionText += ' They give you 100gp';
            state.paymentAccepted = true;
            nextBeatId = 'scouting';
          } else {
            resolutionText += ` "Sorry. That's not in our budget."`;
          }
          return { beatId: nextBeatId, resolutionText };
        }
      },
      {
        id: 'inviteIn',
        desc: 'Invite them in.',
        next({ state }) {
          state.gp = 100;
          return { beatId: 'scouting' };
        }
      }
    ]
  },
  end: {
    id: 'end',
    desc: 'You go back to sleep. The end.'
  },
  scouting: {
    id: 'scouting',
    desc:
      '<p>Item Mart has heard that there is a wealthy underserved market in the Temple of Elemental Evil.</p><p>They feel you have a unique perspective, given that you also have a background at Item Mart as a <em>[you hear paper rustling]</em> Service Associate I.</p>'
  }
};
