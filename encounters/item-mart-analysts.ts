import { Beat, NextResult } from '../types';

export var itemMartAnalysts: Record<string, Beat> = {
  doorKnock: {
    id: 'doorKnock',
    img: 'https://smidgeo.com/bots/media/slop-cube4.gif',
    imgAlt: 'A picture of two guys',
    desc: `<p>Fred and Joe from Item Mart are at the door of your inn room!</p>
          <p>They describe themselves as Growth Opportunity Analysts. They are interested in your experiences with the Temple of Elemental Evil.
          <p>They mention that they want to pay you a 50 gp consulting fee.</p>`,
    question: 'What do you do?',
    playerOptions: {
      choices: [
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
            var resolutionText = `[Charisma check: ${check}]`;
            var nextBeatId = 'doorKnock';
            if (check <= 16) {
              state.gp += 100;
              resolutionText += ' They give you 100 gp.';
              state.paymentAccepted = true;
              nextBeatId = 'scouting';
            } else {
              resolutionText += ' "Sorry. That\'s not in our budget."';
            }
            return { beatId: nextBeatId, resolutionText };
          }
        },
        {
          id: 'inviteIn',
          desc: 'Invite them in.',
          next({ state }) {
            var resolutionText = 'They give you 50 gp.';
            state.gp += 50;
            return { beatId: 'scouting', resolutionText };
          }
        }
      ]
    }
  },
  end: {
    id: 'end',
    desc: 'You go back to sleep. The end.'
  },
  scouting: {
    id: 'scouting',
    desc: `<p>"We've seen that the Temple is a popular destination for high income individuals! At the same time, the supply of convenience &mdash; and luxury &mdash; goods is low," Fred explains.</p>
<p>Joe continues "Now, Mogredh, you and your team have spent considerable time scouting the Temple. We're very excited about the unique perspective you have as a Temple SME with a background at Item Mart as a 
<em>[glances at paper]</em>
Service Associate I."</p>
<p>"We're going to put a feeler out into this market by running a kiosk for a week!</p>`,
    question:
      '"As an expert on the Temple and convenience markets, where do you think we should set up our kiosk in order to optimize for both traffic and safety?"',
    playerOptions: {
      choices: [
        {
          id: 'outsideKiosk',
          desc: 'Close to the Temple, but not inside of it.',
          next() {
            return { beatId: 'stock' };
          }
        },
        {
          id: 'firstFloorKiosk',
          desc: 'In the grand hall on the ground floor.',
          next() {
            return { beatId: 'stock' };
          }
        },
        {
          id: 'dungeonLevel1Kiosk',
          desc: 'The first underground level of the Temple.',
          next() {
            return { beatId: 'stock' };
          }
        }
      ]
    }
  },
  stock: {
    id: 'stock',
    desc: `<p>"We have a budget of 300 gp for this venture. We'd love to get your opinion on spend prioritization!"</p>
    <p>Fred holds unrolls the budget scroll, which reads as follows:</p>
<ul>
  <li>Climbing supply box (ropes, spikes, grappling hooks): 20 gp</li>
  <li>Lighting box (lanterns, torches, oil, tinder kits): 10 gp</li>
  <li>Ammo box (flight arrows, quarrels, and darts): 10 gp</li>
  <li>Potion of Healing: 200 gp (retail for 300 gp)</li>
  <li>Worg Juice keg: 50 gp</li>
  <li>Dry rations (100) box: 50 gp</li>
  <li>Fully closeable and lockable kiosk upgrade: 100 gp</li>
  <li>Guard: 30 gp each</li>
  <li>Cleric: 225 gp</li>
  <li>Elite guard: 150 gp</li>
</ul>`,
    question: 'How should we budget this?',
    playerOptions: {
      freeText: {
        id: 'kioskBudget',
        hint: 'Write your budget recommendation here.',
        next() {
          return { beatId: 'consignment' };
        }
      }
    }
  },
  consignment: {
    id: 'consignment',
    desc: 'BTW, would you like to sell anything for consignment?'
  }
};
