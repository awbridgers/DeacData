import {getDatabase, ref, get} from 'firebase/database';
import firebase from '../firebaseConfig';
import {createContext, ReactNode, useEffect, useState} from 'react';
import {Lineup} from '../lineupClass';
import {rawData, dynastyData, gameData} from '../types';

interface IProvider {
  children: ReactNode;
}
export interface appContext {
  years: string[];
  store: {
    data: dynastyData;
    setData: (year: string) => Promise<gameData>;
  };
}

const initData: appContext = {
  years: [],
  store: {
    data: {},
    setData: (year: string) => null as unknown as Promise<gameData>,
  },
};

const categories = [
  'Total',
  'Conference',
  'Non-Conference',
  'Home',
  'Away',
  'Q1',
  'Q2',
  'Q3',
  'Q4',
];

export const FirebaseContext = createContext<appContext>(initData);

const FirebaseProvider = ({children}: IProvider) => {
  const [data, setData] = useState<dynastyData>({});
  const [years, setYears] = useState<string[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchData = async (year: string) => {
    const db = getDatabase(firebase);
    const lineupRef = ref(db, `lineupData/test/men/${year}`);
    const lineupData = await get(lineupRef);
    const rawData: rawData[] = lineupData.val();
    const results: gameData[] = rawData.map((category) => {
      const lineups = Object.values(category.lineups)
        .map((x) => new Lineup(x.players, x))
        .sort((a, b) => b.time - a.time);
      const players = Object.values(category.players)
        .map((x) => new Lineup(x.players, x))
        .sort((a, b) => b.time - a.time);
      return {...category, lineups, players};
    });
    setData((prev) => ({...prev, [year]: results}));
    return results[0];
  };

  useEffect(() => {
    const fetchYearData = async () => {
      //default to men's data for init
      const db = getDatabase(firebase);
      const yearRef = ref(db, 'lineupData/test/men/years');
      const seasons = await get(yearRef);
      const yearsPlayed: string[] = [];
      const yearResults: gameData[] = Array.from({length: 9}, (x, i) => ({
        score: {
          wake: 0,
          opp: 0,
        },
        order: i,
        game: categories[i],
        lineups: [],
        players: [],
        gameCount: 0,
      }));
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
      setYears([...seasonList, 'Yearly']);
      setData((prev) => ({
        ...prev,
        Yearly: yearResults.map((x) => ({
          ...x,
          lineups: x.lineups.sort(
            (a, b) => +b.players.slice(0, 4) - +a.players.slice(0, 4)
          ),
        })),
      }));
    };
    fetchYearData();
  }, []);

  //when new years are added to the data, fetch the lastest year on start
  useEffect(() => {
    const fetch = async () => {
      if (years.length) {
        await fetchData(years[0]);
        setDataLoaded(true);
      }
    };
    fetch();
  }, [years]);

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
