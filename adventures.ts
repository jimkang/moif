import { Adventure } from './types';

var adventures: Array<Adventure> = [
  {
    id: 'raven1',
    name: "Raven's Adventure I",
    rootTableDef: {
      root: [[1, { encounterId: 'cultistsMeeting', beatId: 'discussion' }]]
    }
  },
  {
    id: 'ravenWoods',
    name: 'Raven: Intrigue in the Woods',
    rootTableDef: {
      root: [
        [1, { encounterId: 'woodsIntrigue', beatId: 'gooseGnomeStandoff' }]
      ]
    }
  }
];

module.exports = adventures;
