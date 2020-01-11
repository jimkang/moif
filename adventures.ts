import { Adventure } from './types';

var adventures: Array<Adventure> = [
  {
    id: 'raven1',
    name: "Raven's Adventure I",
    rootTableDef: {
      root: [[1, { encounterId: 'cultistsMeeting', beatId: 'discussion' }]]
    },
    initialState: {
      hp: 27,
      gp: 126,
      str: 6,
      cha: 16
    }
  },
  {
    id: 'ravenWoods',
    name: 'Raven: Intrigue in the Woods',
    rootTableDef: {
      root: [
        [1, { encounterId: 'woodsIntrigue', beatId: 'gooseGnomeStandoff' }]
      ]
    },
    initialState: {
      hp: 27,
      gp: 126,
      cha: 16
    }
  }
];

module.exports = adventures;
