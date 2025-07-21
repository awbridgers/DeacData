import { dynastyData } from '../types';
import { Lineup } from '../lineupClass';

export const getYearlyData = (data:dynastyData) => {
  // const results:Lineup[] = [];
  // for (const year in data){
  //   //for each year, combine all lineups stats into 1 lineup object
  //   const tempLineup = new Lineup(year.replace(/-/g,'/'));
  //   data[year].season.lineups.forEach((lineup)=>tempLineup.combineLineup(lineup));
  //   results.push(tempLineup);
  // }
  // return results.sort((a,b)=>{
  //   const yearA = +a.players.slice(0,4);
  //   const yearB = +b.players.slice(0,4);
  //   return yearB - yearA
  // });
}