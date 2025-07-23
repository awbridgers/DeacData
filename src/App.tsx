import {useContext, useRef, useState} from 'react';
import './App.css';
import {Lineup} from './lineupClass';
import {finderPlayer, group} from './types';
import Header from './components/Header';
import Table from './components/Table';
import Finder from './components/Finder';
import PlayerReport from './components/Report';
import {FirebaseContext} from './components/FirebaseProvider';

const defaultFinder: finderPlayer[] = [
  {name: '', type: 'include'},
  {name: '', type: 'include'},
  {name: '', type: 'include'},
  {name: '', type: 'include'},
  {name: '', type: 'include'},
];

const App = () => {
  const data = useContext(FirebaseContext).store.data;
  const years = useContext(FirebaseContext).years;
  const fetchData = useContext(FirebaseContext).store.setData;

  //state variables
  const [displayData, setDisplayData] = useState<Lineup[]>(
    data[years[0]][0].lineups.sort((a, b) => b.time - a.time)
  );
  const [selectedYear, setSelectedYear] = useState<string>(years[0]);
  //games are order 0-32 so using -1 for season and -2 for conference totals etc
  const [selectedGame, setSelectedGame] = useState<number>(0);
  const [selectedStat, setSelectedStat] = useState<string>('total');
  const [selectedGroup, setSelectedGroup] = useState<group>('lineups');
  const [showFinder, setShowFinder] = useState<boolean>(false);
  const [finderActive, setFinderActive] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);
  const [filterPoss, setFilterPoss] = useState<boolean>(true);
  const [finderPlayers, setFinderPlayers] =
    useState<finderPlayer[]>(defaultFinder);
  //const prevGame = useRef<number>(0);
  //const prevGroup = useRef<group>('lineups');

  //change the year
  const changeYear = async (year: string) => {
    if (!data[year]) {
      //this data doesn't exist
      const newData = await fetchData(year);
      setDisplayData(newData[selectedGroup]);
    } else {
      setDisplayData(data[year][0][selectedGroup]);
    }
    setSelectedYear(year);
    setSelectedGame(0);
  };
  //change the selected game/category
  const changeGame = (index: number) => {
    if (finderActive) {
      findLineups(index);
    } else {
      setDisplayData(data[selectedYear][index][selectedGroup]);
      
    }
    setSelectedGame(index);
  };
  //change group (lineups/players)
  const changeGroup = (group: group) => {
    setSelectedGroup(group);
    setDisplayData(data[selectedYear][selectedGame][group]);
  };
  const cancel = () => {
    setShowFinder(false);
    setFinderPlayers(defaultFinder);
    setFinderActive(false);
    setDisplayData(data[selectedYear][selectedGame].lineups)
  };
  const findLineups = (category:number) => {
    //split the players into omitted and included
    const include = finderPlayers.filter(
      (x) => x.type === 'include' && x.name !== ''
    );
    const omit = finderPlayers.filter(
      (x) => x.type === 'omit' && x.name !== ''
    );
    const found = data[selectedYear][category].lineups
      .filter((lineups) =>
        include.every((name) => lineups.players.includes(name.name))
      )
      .filter((lineups) =>
        omit.every((name) => !lineups.players.includes(name.name))
      );
    setDisplayData(found);
    //Maybe add later: store the game and group before switch over to finder
    //so user is returned there after closing the finder
    setShowFinder(false);
    setFinderActive(true);
  };
  if (!data || !selectedYear) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Header
        selectedYear={selectedYear}
        selectedGame={selectedGame}
        selectedStat={selectedStat}
        selectedGroup={selectedGroup}
        changeShowFinder={setShowFinder}
        changeYear={changeYear}
        changeGame={changeGame}
        changeStat={setSelectedStat}
        changeGroup={changeGroup}
        finderActive={finderActive}
        changeFinderActive={cancel}
        filter={filterPoss}
        setFilter={setFilterPoss}
      />
      <Table
        data={displayData}
        type={selectedStat}
        onClick={() => setShowReport(true)}
        filter={filterPoss}
        count={data[selectedYear][selectedGame].gameCount}
      />
      {showReport && (
        <PlayerReport
          year={selectedYear}
          back={() => setShowReport(false)}
          key={selectedYear}
        />
      )}
      {showFinder && (
        <Finder
          year={selectedYear}
          players={finderPlayers}
          changePlayers={setFinderPlayers}
          cancel={() => setShowFinder(false)}
          submit={()=>findLineups(selectedGame)}
        />
      )}
    </div>
  );
};

export default App;
