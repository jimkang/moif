import { Beat } from '../types';

export var cultistsMeeting: Record<string, Beat> = {
  discussion: {
    id: 'discussion',
    img: 'https://smidgeo.com/bots/media/slop-cube4.gif',
    imgAlt: 'A picture of three guys',
    desc:
      '<p>Three people in robes sit at a table in the common room. They are having a heated discussion, but are straining to keep it quiet, only partially sucessfully.</p>',
    question: 'What do you do?',
    playerOptions: [
      {
        id: 'goAway',
        desc: 'Tell them to go away.',

        next({ probable, state }) {
          state.itemMartAgentsDismissed = true;
          if (probable.roll(2) === 0) {
            return { beatId: 'discussion', encounterId: 'cultMeeting' };
          } else {
            return { beatId: 'end' };
          }
        }
      },
      {
        id: 'askFor100',
        desc: 'Ask for 100 gp.',

        next({ state }) {
          state.gp = 100;
          return { beatId: 'scouting' };
        }
      },
      {
        id: 'openDoor',
        desc: 'Open the door.',

        next({ state }) {
          state.gp = 100;
          return { beatId: 'scouting' };
        }
      }
    ]
  }
};
