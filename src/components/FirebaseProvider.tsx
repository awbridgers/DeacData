import {getDatabase, ref, get} from 'firebase/database';
import firebase from '../firebaseConfig';
import {createContext, ReactNode, useEffect, useState} from 'react';
import {Lineup} from '../lineupClass';
import {rawData, dynastyData, gameData, gender} from '../types';
import categories from '../util/categories';

interface IProvider {
  children: ReactNode;
}
export interface appContext {
  years: {men: string[]; women: string[]};
  store: {
    data: dynastyData;
    setData: (year: string, gender: gender) => Promise<gameData[]>;
  };
}

const initData: appContext = {
  years: {men: [], women: []},
  store: {
    data: {men: {}, women: {}},
    setData: (year: string, gender: gender) =>
      null as unknown as Promise<gameData[]>,
  },
};

export const FirebaseContext = createContext<appContext>(initData);

const FirebaseProvider = ({children}: IProvider) => {
  const [data, setData] = useState<dynastyData>({men: {}, women: {}});
  const [years, setYears] = useState<{men: string[]; women: string[]}>({
    men: [],
    women: [],
  });
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchData = async (year: string, gender: gender) => {
    const db = getDatabase(firebase);
    const lineupRef = ref(db, `lineupData/${gender}/${year}`);
    const lineupData = await get(lineupRef);
    const rawData: rawData[] = lineupData.val();
    const results: gameData[] = rawData.map((category) => {
      /*
        It is possible to have no games of a category (i.e neutral site games),
        which means there is no lineup/player data for the category.
        Since FB won't upload empty object, there is a chance both do not exist.
        Must check if lineups/players exist for all categories.
      */
      const lineups = Object.values(category.lineups ? category.lineups : {})
        .map((x) => new Lineup(x.players, x))
        .sort((a, b) => b.time - a.time);
      const players = Object.values(category.players ? category.players : {})
        .map((x) => new Lineup(x.players, x))
        .sort((a, b) => b.time - a.time);
      return {...category, lineups, players, game: category.game.replace('_', ' ')};
    });
    setData((prev) => ({
      ...prev,
      [gender]: {...prev[gender], [year]: results},
    }));
    return results;
  };

  useEffect(() => {
    const fetchYearData = async (gender: gender) => {
      //default to men's data for init
      const db = getDatabase(firebase);
      const yearRef = ref(db, `lineupData/${gender}/years`);
      const seasons = await get(yearRef);
      const yearsPlayed: string[] = [];
      const yearResults: gameData[] = Array.from(
        {length: categories.length},
        (x, i) => ({
          score: {
            wake: 0,
            opp: 0,
          },
          order: i,
          game: categories[i],
          lineups: [],
          players: [],
          gameCount: 0,
        })
      );
      seasons.forEach((season) => {
        if (season.key) {
          yearsPlayed.push(season.key);
          const data: {category: string; lineup: Lineup; order: number}[] =
            season.val();
          for (let i = 0; i < data.length; i++) {
            const {lineup} = data[i];
            yearResults[i].lineups.push(new Lineup(lineup.players, lineup));
          }
        }
      });
      const seasonList = yearsPlayed.sort(
        (a, b) => +b.slice(0, 4) - +a.slice(0, 4)
      );
      setYears((prev) => ({...prev, [gender]: [...seasonList, 'Yearly']}));
      setData((prev) => ({
        ...prev,
        [gender]: {
          ...prev[gender],
          Yearly: yearResults.map((x) => ({
            ...x,
            lineups: x.lineups.sort(
              (a, b) => +b.players.slice(0, 4) - +a.players.slice(0, 4)
            ),
          })),
        },
      }));
    };
    fetchYearData('men');
    fetchYearData('women');
  }, []);

  //when new years are added to the data, fetch the lastest year on start
  useEffect(() => {
    const fetch = async () => {
      if (years.men.length) {
        await fetchData(years.men[0], 'men');
      }
      if (years.women.length) {
        await fetchData(years.women[0], 'women');
      }
    };
    fetch();
  }, [years]);
  useEffect(() => {
    if (
      Object.keys(data.men).length > 1 &&
      Object.keys(data.women).length > 1
    ) {
      setDataLoaded(true);
    }
  }, [data]);

  return (
    <FirebaseContext.Provider
      value={{
        years: years,
        store: {data: data, setData: fetchData},
      }}
    >
      {dataLoaded ? children : <div>Loading</div>}
    </FirebaseContext.Provider>
  );
};
export default FirebaseProvider;
