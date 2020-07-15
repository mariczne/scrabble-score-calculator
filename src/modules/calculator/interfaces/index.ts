export interface WordScoreOptions {
  languageCode: string;
  scoreTable?: ScoreTable;
  bonuses?: [];
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

export interface ScoreTable {
  [languageCode: string]: {
    displayName: string;
    [pointValue: number]: string[];
    multigraphs?: string[][];
  };
}

export interface Multiplier {
  name: string;
  multiplier: number;
}

export interface Bonus {
  type: "tile" | "word" | "bingo";
  index?: number;
  multiplier?: number;
}

export interface WordBonus {
  type: "word";
  multiplier: number;
}

export interface TileBonus {
  type: "tile";
  index: number;
  multiplier: number;
}

export interface BingoBonus {
  type: "bingo";
}
