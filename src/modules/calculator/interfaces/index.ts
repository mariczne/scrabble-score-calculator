export interface WordScoreOptions {
  languageCode: string;
  scoreTable?: ScoreTable;
  bonuses?: Bonus[];
  isBingoUsed?: boolean;
}

export interface TileScoreOptions {
  languageCode: string;
  scoreTable?: ScoreTable;
  multiplier?: number;
}

export interface TilesInWordOptions {
  languageCode: string;
  scoreTable?: ScoreTable;
}

export type Multigraph = string[];

export interface ScoreTable {
  [languageCode: string]: {
    displayName: string;
    scores: {
      [pointValue: string]: string[];
    };
    multigraphs?: Multigraph[];
  };
}

export interface Multiplier {
  name: string;
  multiplier: number;
}

export enum BonusType {
  Tile = "tile",
  Word = "word",
}

export interface Bonus {
  type: BonusType;
  index: number;
  multiplier: number;
}

export interface WordBonus {
  type: BonusType.Word;
  index: number;
  multiplier: number;
}

export interface TileBonus {
  type: BonusType.Tile;
  index: number;
  multiplier: number;
}

export interface Language {
  languageCode: string;
  displayName: string;
}
