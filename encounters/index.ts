import { cultistsMeeting } from './cultists-meeting';
import { itemMartAnalysts } from './item-mart-analysts';
import { woodsIntrigue } from './woods-intrigue';

import { Encounter } from '../types';

export var encounterDict: Record<string, Encounter> = {
  cultistsMeeting,
  itemMartAnalysts,
  woodsIntrigue
};

