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
  freeText?: string;
}) => NextResult;

export interface NextResult {
  beatId: string;
  encounterId?: string;
}

export interface Choice {
  id: string;
  desc: string;
  next: NextFn;
}

export interface FreeText {
  id: string;
  hint: string;
  next: NextFn;
}

export interface Beat {
  id: string;
  img?: string;
  imgAlt?: string;
  desc?: string; // TODO: Transform by state
  question?: string;
  playerOptions?: Array<Choice> | FreeText;
}

export type Encounter = Record<string, Beat>;
