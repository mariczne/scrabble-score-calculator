export interface WordScoreOptions {
  languageCode: Language["languageCode"];
  scoreTable?: ScoreTable;
  bonuses?: Bonus[];
  isBingoUsed?: boolean;
}

export interface TileScoreOptions {
  languageCode: Language["languageCode"];
  scoreTable?: ScoreTable;
  multiplier?: number;
}

export interface TilesInWordOptions {
  languageCode: Language["languageCode"];
  scoreTable?: ScoreTable;
}

export type Multigraph = string;

export interface ScoreTable {
  [languageCode: string]: {
    displayName: string;
    scores: {
      [pointValue: string]: string[];
    };
  };
}

export interface Multiplier {
  name: string;
  multiplier: number;
}

export interface Bonus {
  type: "word" | "tile";
  index: number;
  multiplier: number;
}

export interface WordBonus extends Bonus {
  type: "word";
}

export interface TileBonus extends Bonus {
  type: "tile";
}

export interface Language {
  languageCode: string;
  displayName: string;
}
