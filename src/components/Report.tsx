import {Dispatch, useContext, useEffect, useState} from 'react';
import Select, {components, CSSObjectWithLabel} from 'react-select';
import {gameData, group, seasonData} from '../types';
import Switch from 'react-switch';
import '../App.css';
import {Lineup} from '../lineupClass';
import {HeaderStyle} from '../styles/header';
import styled, {CSSProperties} from 'styled-components';
import {FirebaseContext} from './FirebaseProvider';
interface IProps {
  data: seasonData;
  back: () => void;
}
interface Options {
  value: string;
  label: string;
}
const nullOption = {label: '', value: ''};
const format = new Intl.NumberFormat('en-us', {
  signDisplay: 'always',
  maximumFractionDigits: 1,
});
const percent = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});

const PlayerReport = ({data, back}: IProps) => {
  const [roster, setRoster] = useState<Options[]>([]);
  const [player, setPlayer] = useState<string>('');
  const [onCourt, setOnCourt] = useState<Lineup | null>();
  const [onBench, setOnBench] = useState<Lineup | null>();
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

  // useEffect(() => {
  //   //get the roster from the list of player data
  //   setRoster(
  //     data.season.players
  //       .sort((a, b) => b.time - a.time)
  //       .map((x) => ({
  //         label: x.players,
  //         value: x.players,
  //       }))
  //   );
  // }, [data]);
  // useEffect(() => {
  //   if (player && data) {
  //     let on = new Lineup(player);
  //     let off = new Lineup('rest');
  //     const dataArray = conPlay ? data.conference.lineups : data.season.lineups
  //     for (let unit of dataArray) {
  //       if (unit.players.includes(player)) {
  //         on.combineLineup(unit);
  //       } else {
  //         off.combineLineup(unit);
  //       }
  //     }
  //     setOnCourt(on);
  //     setOnBench(off);
  //   } else {
  //     setOnBench(null);
  //     setOnCourt(null);
  //   }
  // }, [player, data, conPlay]);

  return (
    <Report>
      <div className="title">Player Report</div>
      <div className="selectBox">
        <Select<Options>
          value={player ? {value: player, label: player} : null}
          onChange={(picked) => {
            setPlayer(picked ? picked.value : '');
          }}
          options={roster}
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
            <td>{onBench?.oRating.toFixed(1)}</td>
            <td
              className="diff"
              style={styleNum(onCourt?.oRating, onBench?.oRating)}
            >
              {onCourt && onBench
                ? format.format(onCourt.oRating - onBench.oRating)
                : null}
            </td>
          </tr>
          <tr>
            <td>D Rtg</td>
            <td>{onCourt?.dRating.toFixed(1)}</td>
            <td>{onBench?.dRating.toFixed(1)}</td>
            <td
              className="diff"
              style={styleNum(onBench?.dRating, onCourt?.dRating)}
            >
              {onCourt && onBench
                ? format.format(onCourt.dRating - onBench.dRating)
                : null}
            </td>
          </tr>
          <tr>
            <td>eFG%</td>
            <td>{onCourt ? percent.format(onCourt.eFGFor * 100) : null}</td>
            <td>{onBench ? percent.format(onBench.eFGFor * 100) : null}</td>
            <td
              className="diff"
              style={styleNum(onCourt?.eFGFor, onBench?.eFGFor)}
            >
              {onCourt && onBench
                ? format.format((onCourt.eFGFor - onBench.eFGFor) * 100)
                : null}
            </td>
          </tr>
          <tr>
            <td>Reb%</td>
            <td>
              {onCourt ? percent.format(onCourt.totalRebPercent * 100) : null}
            </td>
            <td>
              {onBench ? percent.format(onBench.totalRebPercent * 100) : null}
            </td>
            <td
              className="diff"
              style={styleNum(
                onCourt?.totalRebPercent,
                onBench?.totalRebPercent
              )}
            >
              {onCourt && onBench
                ? format.format(
                    (onCourt.totalRebPercent - onBench.totalRebPercent) * 100
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
              {onBench
                ? percent.format(
                    (onBench.assistsFor * 100) / onBench.totalShots.madeFor
                  )
                : null}
            </td>
            <td
              className="diff"
              style={
                onCourt && onBench
                  ? styleNum(
                      onCourt?.assistsFor / onCourt.totalShots.madeFor,
                      onBench?.assistsFor / onBench.totalShots.madeFor
                    )
                  : {}
              }
            >
              {onCourt && onBench
                ? format.format(
                    (onCourt.assistsFor * 100) / onCourt.totalShots.madeFor -
                      (onBench.assistsFor * 100) / onBench.totalShots.madeFor
                  )
                : null}
            </td>
          </tr>
          <tr>
            <td>Net +/-</td>
            <td>{onCourt ? format.format(onCourt.netPoints) : null}</td>
            <td>{onBench ? format.format(onBench.netPoints) : null}</td>
            <td
              className="diff"
              style={styleNum(onCourt?.netPoints, onBench?.netPoints)}
            >
              {onCourt && onBench
                ? format.format(onCourt.netPoints - onBench.netPoints)
                : null}
            </td>
          </tr>
          <tr>
            <td>Poss</td>
            <td>{onCourt && Math.round(onCourt.possessions)}</td>
            <td>{onBench && Math.round(onBench.possessions)}</td>
            <td
              className="diff"
              style={styleNum(onCourt?.possessions, onBench?.possessions)}
            >
              {onCourt && onBench
                ? format.format(
                    Math.round(onCourt.possessions - onBench.possessions)
                  )
                : null}
            </td>
          </tr>
        </tbody>
      </table>
        <div style = {{margin: '5px 0px'}}>
          <span className = 'label'>ACC Play Only</span>
          <Switch
            checked={conPlay}
            onChange={(checked) => setConPlay(checked)}
            borderRadius={20}
            className="slider"

          />
      </div>
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
  .slider{
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
