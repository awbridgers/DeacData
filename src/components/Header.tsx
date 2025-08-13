import {Dispatch, SetStateAction, useContext, useMemo} from 'react';
import Select, {components} from 'react-select';
import {gender, group} from '../types';
import Switch from 'react-switch';
import '../App.css';
import {Toggles, HeaderStyle, ToggleButton} from '../styles/header';
import {FirebaseContext} from './FirebaseProvider';

interface iProps {
  selectedYear: string;
  selectedGame: number;
  selectedStat: string;
  finderActive: boolean;
  selectedGroup: string;
  changeGroup: (group: group) => void;
  changeYear: (picked: string) => void;
  changeGame: (index: number) => void;
  changeStat: Dispatch<SetStateAction<string>>;
  changeShowFinder: Dispatch<SetStateAction<boolean>>;
  changeFinderActive: () => void;
  filter: boolean;
  setFilter: Dispatch<SetStateAction<boolean>>;
  gender: gender;
  setGender: (gender:gender)=>void;
}
interface gameChoice {
  label: string;
  value: number;
}
interface yearChoice {
  label: string;
  value: string;
}
interface statChoice {
  label: string;
  value: 'total' | 'net' | 'advanced' | 'shooting';
}
interface groupChoice {
  label: string;
  value: group;
}

const statOptions: statChoice[] = [
  {
    label: 'Total',
    value: 'total',
  },
  {
    label: 'Net',
    value: 'net',
  },
  {
    label: 'Advanced',
    value: 'advanced',
  },
  {
    label: 'Shooting',
    value: 'shooting',
  },
];
const groupOptions: groupChoice[] = [
  {value: 'lineups', label: 'Lineups'},
  {value: 'players', label: 'Players'},
];

//custom control compononet for select
const Control = (props: any) => {
  return (
    <>
      <div className="label">{props.title}</div>
      <components.Control {...props} />
    </>
  );
};

const checkedIcon = (
  <svg
    height="100%"
    width="100%"
    viewBox="-2 -5 17 21"
    style={{position: 'absolute', top: 0}}
  >
    <path
      d="M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0"
      fill="#000000"
      fillRule="evenodd"
    />
  </svg>
);

const Header = ({
  selectedGroup,
  selectedGame,
  selectedYear,
  finderActive,
  changeGame,
  changeYear,
  changeGroup,
  selectedStat,
  changeStat,
  changeShowFinder,
  changeFinderActive,
  filter,
  setFilter,
  gender,
  setGender,
}: iProps) => {
  const years = useContext(FirebaseContext).years[gender];
  const data = useContext(FirebaseContext).store.data[gender][selectedYear];
  const gameOptions: gameChoice[] = useMemo(
    () => data.map((x, i) => ({label: x.game, value: i})),
    [data]
  );

  const yearOptions: yearChoice[] = useMemo(
    () =>
      years.map((year) => ({
        label: year,
        value: year,
      })),
    [years]
  );
  return (
    <div style={{paddingBottom: '10px'}}>
      <HeaderStyle>
        <div className="headerYearControls">
          <div className="selectContainer">
            <Select
              options={yearOptions}
              onChange={(picked) =>
                picked
                  ? changeYear(picked.value)
                  : console.log('no option selected')
              }
              isClearable={false}
              value={yearOptions.find((x) => x.value === selectedYear)}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              className="select year"
              isSearchable={false}
              isDisabled={finderActive}
              styles={{
                control: (provided) => ({...provided, padding: '5px 0px'}),
                valueContainer: (provided) => ({
                  ...provided,
                  marginTop: 'auto',
                }),
              }}
              components={{
                Control: (props) => <Control {...props} title="Season" />,
              }}
            />
          </div>
          <div className="headerFinder">
            <button onClick={() => changeShowFinder(true)}>
              Search Lineups
            </button>
          </div>
        </div>
        <div className="headerGameControls">
          {finderActive && (
            <div
              className="gameInfo"
              style={{display: 'flex', flexFlow: 'column'}}
            >
              <div className="totals">Lineup Finder</div>
              <button className="back" onClick={changeFinderActive}>
                Exit Finder
              </button>
            </div>
          )}
          {!finderActive && (
            <div className="gameInfo">
              {selectedGame < 10 ? (
                <div className="totals">{data[selectedGame].game}</div>
              ) : (
                <div className="score">
                  <div>Wake Forest: {data[selectedGame].score.wake}</div>
                  <div>
                    {data[selectedGame].game}: {data[selectedGame].score.opp}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="selectContainer">
            <Select<gameChoice>
              options={gameOptions}
              value={gameOptions.find((x) => x.value === selectedGame)}
              onChange={(picked) =>
                picked
                  ? changeGame(picked.value)
                  : console.log('No option selected')
              }
              className="game select"
              isSearchable={false}
              isClearable={false}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value.toFixed()}
              styles={{
                control: (provided) => ({...provided, padding: '5px 0px'}),
                valueContainer: (provided) => ({
                  ...provided,
                  marginTop: 'auto',
                }),
              }}
              components={{
                Control: (props) => <Control {...props} title="Game" />,
              }}
            />
          </div>
        </div>
        <div className="headerStatControls">
          <div className="selectController">
            <Select<statChoice>
              options={statOptions}
              value={statOptions.find((x) => x.value === selectedStat)}
              onChange={(picked) =>
                picked
                  ? changeStat(picked.value)
                  : console.log('No option selected')
              }
              className="stat select"
              isSearchable={false}
              isClearable={false}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              styles={{
                control: (provided) => ({...provided, padding: '5px 0px'}),
                valueContainer: (provided) => ({
                  ...provided,
                  marginTop: 'auto',
                }),
              }}
              components={{
                Control: (props) => <Control {...props} title="Stat Type" />,
              }}
            />
          </div>
          <div className="playerSwitch">
            <Select<groupChoice>
              options={groupOptions}
              value={groupOptions.find((x) => x.value === selectedGroup)}
              onChange={(picked) =>
                picked
                  ? changeGroup(picked.value)
                  : console.log('No option selected')
              }
              className="group select"
              isSearchable={false}
              isClearable={false}
              isDisabled={finderActive}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              styles={{
                control: (provided) => ({...provided, padding: '5px 0px'}),
                valueContainer: (provided) => ({
                  ...provided,
                  marginTop: 'auto',
                }),
              }}
              components={{
                Control: (props) => <Control {...props} title="Group" />,
              }}
            />
          </div>
        </div>
      </HeaderStyle>
      <Toggles>
        <ToggleButton>
          <label style={{margin: '0px 5px'}}>Poss Limit</label>
          <Switch
            checked={filter}
            checkedIcon = {checkedIcon}
            onChange={(checked) => setFilter(checked)}
            height={20}
            width={40}
            handleDiameter={18}
            disabled={selectedGame >= 10}
            borderRadius={6}
            onColor="#cfb53b"
            offColor="#474747"
          />
        </ToggleButton>
        <ToggleButton>
          <label
            style={{
              margin: '0px 5px',
              color: gender === 'men' ? 'white' : '#474747',
              fontWeight: 'bold',
            }}
          >
            Men
          </label>
          <Switch
            checked={gender === 'women'}
            onChange={(checked) => setGender(checked ? 'women' : 'men')}
            onColor="#cfb53b"
            offColor="#cfb53b"
            height={20}
            width={35}
            handleDiameter={18}
            checkedIcon={false}
            uncheckedIcon={false}
            borderRadius={6}
          />
          <label
            style={{
              margin: '0px 5px',
              color: gender === 'women' ? 'white' : '#5b5b5b',
              fontWeight: 'bold',
            }}
          >
            Women
          </label>
        </ToggleButton>
      </Toggles>
    </div>
  );
};

export default Header;
