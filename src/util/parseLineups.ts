import {dbData, Lineup} from '../lineupClass';
import {stats} from '../types';

interface rawData {
  lineups: {[key: string]: dbData};
  players: {[key: string]: dbData};
  count: number
}

export const parseLineups = (data: rawData): stats => {
  const {count, ...lineupData} = data;
  const res: stats = {players: [], lineups: [], count};
  const keys = ['lineups' as keyof typeof lineupData, 'players' as keyof typeof lineupData];
  for (const key of keys) {
    Object.values(lineupData[key]).forEach((lineup) => {
      res[key].push(new Lineup(lineup.players, lineup))
    });
  }
  return res;
};

// interface rawGameData {
//   accGame: boolean;
//   game: string;
//   lineups: {[key: string]: Lineup};
//   players: {[key: string]: Lineup};
//   order: number;
//   quad: number;
//   score:{
//     wake:number;
//     opp:number;
//   }

// }
