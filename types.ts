export type NextFn = ({
  beat,
  probable,
  choice,
  freeText,
  state
}: {
  beat: Beat;
  probable: any;
  choice?: Choice;
  state: any;
  freeText?: FreeText;
}) => NextResult;

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
}

export type Encounter = Record<string, Beat>;
