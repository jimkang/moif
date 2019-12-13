import { Beat } from '../types';

export var itemMartAnalysts: Record<string, Beat> = {
  doorKnock: {
    id: 'doorKnock',
    img: 'https://smidgeo.com/bots/media/slop-cube4.gif',
    imgAlt: 'A picture of two guys',
    desc: `<p>Fred and Joe are at your door.</p>
          <p>They describe themselves as Growth Opportunity Analysts for Item Mart. They are interested in your experiences with the Temple of Elemental Evil. They feel you have a unique perspective, given that you also have a background at Item Mart as a <em>[you hear paper rustling]</em> Service Associate I.</p>
          <p>They mention that they want to pay you a 50 gp consulting fee.</p>`,
    question: 'What do you do?',
    playerOptions: [
      {
        id: 'goAway',
        desc: 'Tell them to go away.',

        next({ probable, state }) {
          state.itemMartAgentsDismissed = true;
          if (probable.roll(2) === 0) {
            return 'council';
          } else {
            return 'end';
          }
        }
      },
      {
        id: 'askFor100',
        desc: 'Ask for 100 gp.',

        next({ state }) {
          state.gp = 100;
          return 'scouting';
        }
      },
      {
        id: 'openDoor',
        desc: 'Open the door.',

        next({ state }) {
          state.gp = 100;
          return 'scouting';
        }
      }
    ]
  }
};
