import {useContext, useMemo, useState} from 'react';
import Select, {CSSObjectWithLabel} from 'react-select';
import Switch from 'react-switch';
import '../App.css';
import {Lineup} from '../lineupClass';
import styled, {CSSProperties} from 'styled-components';
import {FirebaseContext} from './FirebaseProvider';
import categories from '../util/categories'
interface IProps {
  year: string;
  back: () => void;
}
interface Options {
  value: string;
  label: string;
}
const format = new Intl.NumberFormat('en-us', {
  signDisplay: 'always',
  maximumFractionDigits: 1,
});
const percent = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});


const PlayerReport = ({year, back}: IProps) => {
  const data = useContext(FirebaseContext).store.data[year];
  const [player, setPlayer] = useState<string>('');
  const [category, setCategory] = useState<number>(0);
  const [conPlay, setConPlay] = useState<boolean>(false);
  const styleNum = (
    stat1: Number | undefined,
    stat2: Number | undefined
  ): CSSProperties => {
    if (stat1 && stat2) {
      return stat1 > stat2 ? {color: '#0f6606'} : {color: '#920e09'};
    }
    return {};
  };

  const onCourt = useMemo(() => {
    if (!player) return null;
    const res = new Lineup('on');
    data[category].lineups.forEach((lineup) => {
      if (lineup.players.includes(player)) res.combineLineup(lineup);
    });
    return res;
  }, [player, category, data]);
  const offCourt = useMemo(() => {
    if (!player) return null;
    const res = new Lineup('off');
    data[category].lineups.forEach((lineup) => {
      if (!lineup.players.includes(player)) res.combineLineup(lineup);
    });
    return res;
  }, [player, category, data]);
  return (
    <Report>
      <div className="title">Player Report</div>
      <div className="selectBox">
        <Select<Options>
          value={player ? {value: player, label: player} : null}
          onChange={(picked) => {
            setPlayer(picked ? picked.value : '');
          }}
          options={data[0].players.map((x) => ({
            value: x.players,
            label: x.players,
          }))}
          //isClearable
          isSearchable={false}
          className="select"
          styles={{
            indicatorsContainer: (provided: CSSObjectWithLabel) => ({
              ...provided,
              position: 'absolute',
              right: '0px',
            }),
            valueContainer: (provided: CSSObjectWithLabel) => ({
              ...provided,
              fontSize: '24px',
            }),
          }}
          placeholder={`Select a Player`}
          isOptionDisabled={(option) => option.value === player}
        />
        <Select<{value: number, label: string}>
          value={{value: category, label: categories[category]}}
          onChange={(picked) => {
            setCategory(picked ? picked.value : category);
          }}
          options={categories.map((x,i)=>({value: i, label: x}))}
          //isClearable
          isSearchable={false}
          className="select"
          styles={{
            indicatorsContainer: (provided: CSSObjectWithLabel) => ({
              ...provided,
              position: 'absolute',
              right: '0px',
            }),
            valueContainer: (provided: CSSObjectWithLabel) => ({
              ...provided,
              fontSize: '24px',
            }),
          }}
          placeholder={`Select a Player`}
          isOptionDisabled={(option) => option.value === category}
        />
      </div>
      <table className="reportTable">
        <thead>
          <tr>
            <th>Stat</th>
            <th>Court</th>
            <th>Bench</th>
            <th>Diff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>O Rtg</td>
            <td>{onCourt?.oRating.toFixed(1)}</td>
            <td>{offCourt?.oRating.toFixed(1)}</td>
            <td
              className="diff"
              style={styleNum(onCourt?.oRating, offCourt?.oRating)}
            >
              {onCourt && offCourt
                ? format.format(onCourt.oRating - offCourt.oRating)
                : null}
            </td>
          </tr>
          <tr>
            <td>D Rtg</td>
            <td>{onCourt?.dRating.toFixed(1)}</td>
            <td>{offCourt?.dRating.toFixed(1)}</td>
            <td
              className="diff"
              style={styleNum(offCourt?.dRating, onCourt?.dRating)}
            >
              {onCourt && offCourt
                ? format.format(onCourt.dRating - offCourt.dRating)
                : null}
            </td>
          </tr>
          <tr>
            <td>eFG%</td>
            <td>{onCourt ? percent.format(onCourt.eFGFor * 100) : null}</td>
            <td>{offCourt ? percent.format(offCourt.eFGFor * 100) : null}</td>
            <td
              className="diff"
              style={styleNum(onCourt?.eFGFor, offCourt?.eFGFor)}
            >
              {onCourt && offCourt
                ? format.format((onCourt.eFGFor - offCourt.eFGFor) * 100)
                : null}
            </td>
          </tr>
          <tr>
            <td>Reb%</td>
            <td>
              {onCourt ? percent.format(onCourt.totalRebPercent * 100) : null}
            </td>
            <td>
              {offCourt ? percent.format(offCourt.totalRebPercent * 100) : null}
            </td>
            <td
              className="diff"
              style={styleNum(
                onCourt?.totalRebPercent,
                offCourt?.totalRebPercent
              )}
            >
              {onCourt && offCourt
                ? format.format(
                    (onCourt.totalRebPercent - offCourt.totalRebPercent) * 100
                  )
                : null}
            </td>
          </tr>
          <tr>
            <td>AST %</td>
            <td>
              {onCourt
                ? percent.format(
                    (onCourt.assistsFor * 100) / onCourt.totalShots.madeFor
                  )
                : null}
            </td>
            <td>
              {offCourt
                ? percent.format(
                    (offCourt.assistsFor * 100) / offCourt.totalShots.madeFor
                  )
                : null}
            </td>
            <td
              className="diff"
              style={
                onCourt && offCourt
                  ? styleNum(
                      onCourt?.assistsFor / onCourt.totalShots.madeFor,
                      offCourt?.assistsFor / offCourt.totalShots.madeFor
                    )
                  : {}
              }
            >
              {onCourt && offCourt
                ? format.format(
                    (onCourt.assistsFor * 100) / onCourt.totalShots.madeFor -
                      (offCourt.assistsFor * 100) / offCourt.totalShots.madeFor
                  )
                : null}
            </td>
          </tr>
          <tr>
            <td>Net +/-</td>
            <td>{onCourt ? format.format(onCourt.netPoints) : null}</td>
            <td>{offCourt ? format.format(offCourt.netPoints) : null}</td>
            <td
              className="diff"
              style={styleNum(onCourt?.netPoints, offCourt?.netPoints)}
            >
              {onCourt && offCourt
                ? format.format(onCourt.netPoints - offCourt.netPoints)
                : null}
            </td>
          </tr>
          <tr>
            <td>Poss</td>
            <td>{onCourt && Math.round(onCourt.possessions)}</td>
            <td>{offCourt && Math.round(offCourt.possessions)}</td>
            <td
              className="diff"
              style={styleNum(onCourt?.possessions, offCourt?.possessions)}
            >
              {onCourt && offCourt
                ? format.format(
                    Math.round(onCourt.possessions - offCourt.possessions)
                  )
                : null}
            </td>
          </tr>
        </tbody>
      </table>
      <button className="cancel" onClick={back}>
        Back
      </button>
    </Report>
  );
};

const Report = styled.div`
  width: 35vw;
  min-height: 400px;
  min-width: 400px;
  background-color: #daa520;
  margin: auto;
  color: black;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  .title {
    font-weight: bold;
    font-size: 24px;
    margin: 5px 0px;
  }
  .label {
    font-size: 20px;
    margin: 0px 10px 0px 0px;
  }
  .selectBox {
    width: 80%;
    margin: auto;
  }
  .select{
    margin: 5px;
  }
  .slider {
    vertical-align: middle;
  }
  .cancel {
    margin-top: 10px;
    font-weight: bold;
    font-size: 16px;
    border-radius: 8px;
    width: 125px;
    height: 40px;
    margin: 5px 5px;
  }
  .cancel:hover {
    background-color: #808080;
  }
  .reportTable {
    width: 80%;
    margin: auto;
    margin-bottom: 25px;
    table-layout: fixed;
    background-color: #d4a11e;
    th {
      font-size: 22px;
      margin-bottom: 5px;
      font-weight: 500;
      background-color: #a07917;
    }
    td {
      font-size: 20px;
      text-align: center;
    }
    tr:nth-child(even) {
      background-color: #a07917;
    }
    tr:nth-child(odd) {
      background-color: #c6961d;
    }
    .diff {
      font-weight: bold;
    }
  }
`;

export default PlayerReport;
