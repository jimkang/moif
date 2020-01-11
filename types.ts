export interface BeatOpKit {
  beat: Beat;
  probable?: any;
  choice?: Choice;
  freeText?: FreeText;
  state?: any;
  actionLog: Array<any>;
}

export type NextFn = (BeatOpKit) => NextResult;

export type ConditionFn = ({ state }: { state: any }) => boolean;

export interface NextResult {
  beatId: string;
  encounterId?: string;
  resolutionText?: string;
}

export interface Choice {
  id: string;
  desc: string;
  next: NextFn;
  condition?: ConditionFn;
  oneTime?: boolean;
}

export interface FreeText {
  id: string;
  hint: string;
  next: NextFn;
  value?: string;
  condition?: ConditionFn;
}

export interface PlayerOptions {
  choices?: Array<Choice>;
  freeText?: FreeText;
}

export interface Beat {
  id: string;
  img?: string;
  imgAlt?: string;
  desc?: string; // TODO: Transform by state
  question?: string;
  playerOptions?: PlayerOptions;
  endOfEncounter?: boolean;
}

export type Encounter = Record<string, Beat>;

export interface Adventure {
  id: string;
  name: string;
  // TODO: Consider table def type.
  rootTableDef: Record<string, Array<any>>;
  initialState: Record<string, any>;
  state?: Record<string, any>;
}
