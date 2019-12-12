export interface Choice {
  id: string;
  desc: string;
}

export interface FreeText {
  id: string;
  hint: string;
}

export interface Beat {
  id: string;
  img?: string;
  imgAlt?: string;
  desc?: string;
  question?: string;
  playerOptions?: Array<Choice> | FreeText;
}
