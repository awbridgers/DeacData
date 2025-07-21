import {dbData, Lineup} from './lineupClass';

export interface player {
  name: string;
  number: number;
}

export interface gameData {
  score: {
    wake: number;
    opp: number;
  };
  order: number;
  lineups: Lineup[];
  players: Lineup[];
  game: string;
  gameCount: number;
}

export interface stats {
  lineups: Lineup[];
  players: Lineup[];
  count: number;
}

export interface seasonData {
  
}

export interface dynastyData {
  [year: string]: gameData[];
}

export interface rawData {
    score: {
      wake: number;
      opp: number;
    };
    order: number;
    lineups: {[key: string]: dbData};
    players: {[key: string]: dbData};
    game: string;
    gameCount: number;
}
export interface finderPlayer {
  name: string;
  type: 'omit' | 'include';
}
export type group =  'players' | 'lineups';

export interface yearlyTotals {
  [year: string]: Lineup;
}
