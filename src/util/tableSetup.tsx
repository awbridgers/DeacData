import {Lineup} from '../lineupClass';
import {fixTime} from './fixTime';
import {Column, Row, useRowState} from 'react-table';
import {useMemo} from 'react';

interface SortProps {
  rowA: Row<Lineup>;
  rowB: Row<Lineup>;
  id: string;
  desc: boolean;
}

const format = new Intl.NumberFormat('en-us', {
  signDisplay: 'always',
  maximumFractionDigits: 2,
});
const sortNumbers = (
  rowA: Row<Lineup>,
  rowB: Row<Lineup>,
  id: string,
  desc?: boolean
): number => {
  const isDesc = desc ? desc : false;
  const a = +rowA.values[id];
  const b = +rowB.values[id];
  //take care of dividing by 0 for percentages
  //always keep NaN's at bottom of list
  if (isNaN(a) && isNaN(b)) {
    return 0;
  }
  if (isNaN(a)) {
    return isDesc ? -1 : 999;
  }
  if (isNaN(b)) {
    return isDesc ? 1 : -999;
  }
  return a > b ? 1 : a < b ? -1 : 0;
};

export const getCols = (isMobile: boolean): Array<Column<Lineup>> => [
  {
    Header: 'Lineup',
    id: 'totalPlayers',
    accessor: 'players',
    Cell: ({value}) => <>{value.replace(/\\/g, '\n')}</>,
    className: 'pre',
    disableSortBy: true,
    sticky: 'left',
    width: isMobile ? 55 : 120,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => info.rows.length, [info.rows]);
      return <>Total ({total} lineups)</>;
    },
  },
  {
    Header: 'Time',
    id: 'totalTime',
    accessor: 'time',
    Cell: ({value}) => <>{fixTime(value)}</>,
    width: isMobile ? 25 : 50,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce((prev, current) => prev + current.original.time, 0),
        [info.rows]
      );
      return <>{fixTime(total)}</>;
    },
  },
  {
    Header: 'Team',
    id: 'totalTeamFor',
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: () => null,
    columns: [
      {
        Header: 'Pts',
        id: 'totalPointsFor',
        accessor: 'pointsFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.pointsFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'DRb',
        id: 'totalDRebFor',
        accessor: 'dRebFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.dRebFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'ORb',
        id: 'totalORebFor',
        accessor: 'oRebFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.oRebFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGM',
        id: 'totalMadeFor',
        accessor: (row) => row.totalShots.madeFor,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.totalShots.madeFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGA',
        id: 'totalAttemptedFor',
        accessor: (row) => row.totalShots.attemptedFor,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) =>
                  prev + current.original.totalShots.attemptedFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PM',
        id: 'totalMadeTwosFor',
        accessor: 'madeTwosFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.madeTwosFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PA',
        id: 'totalAttemptedTwosFor',
        accessor: 'attemptedTwosFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.attemptedTwosFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: '3PM',
        id: 'totalMadeThreesFor',
        accessor: 'madeThreesFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.madeThreesFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3PA',
        id: 'totalAttemptedThreesFor',
        accessor: 'attemptedThreesFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.attemptedThreesFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'Pnt',
        id: 'totalPaintFor',
        accessor: 'paintFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.paintFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2nd',
        id: 'totalSecondFor',
        accessor: 'secondFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.secondFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'Ast',
        id: 'totalAssistsFor',
        accessor: 'assistsFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.assistsFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'TO',
        id: 'totalTurnoversFor',
        accessor: 'turnoversFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.turnoversFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
    ],
  },
  {
    Header: 'Opponent',
    id: 'totalOpponent',
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: () => null,
    columns: [
      {
        Header: 'Pts',
        id: 'totalPointsAgainst',
        accessor: 'pointsAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.pointsAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'DRb',
        id: 'totalDRebAgainst',
        accessor: 'dRebAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.dRebAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'ORb',
        id: 'totalORebAgainst',
        accessor: 'oRebAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.oRebAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGM',
        id: 'totalMadeAgainst',
        accessor: (row) => row.totalShots.madeAgainst,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) =>
                  prev + current.original.totalShots.madeAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGA',
        id: 'totalAttemptedAgainst',
        accessor: (row) => row.totalShots.attemptedAgainst,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) =>
                  prev + current.original.totalShots.attemptedAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PM',
        id: 'totalMadeTwosAgainst',
        accessor: 'madeTwosAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.madeTwosAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PA',
        id: 'totalAttemptedTwosAgainst',
        accessor: 'attemptedTwosAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.attemptedTwosAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3PM',
        id: 'totalMadeThreesAgainst',
        accessor: 'madeThreesAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.madeThreesAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3PA',
        id: 'totalAttemptedThreesAgainst',
        accessor: 'attemptedThreesAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) =>
                  prev + current.original.attemptedThreesAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'Pnt',
        id: 'totalPaintAgainst',
        accessor: 'paintAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.paintAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: '2nd',
        id: 'totalSecondAgainst',
        accessor: 'secondAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.secondAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'Ast',
        id: 'totalAssistsAgainst',
        accessor: 'assistsAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.assistsAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'TO',
        id: 'totalTurnoversAgainst',
        accessor: 'turnoversAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.turnoversAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
    ],
  },
  {
    Header: 'Lineup',
    id: 'netPlayers',
    accessor: 'players',
    Cell: ({value}) => <>{value.replace(/\\/g, '\n')}</>,
    className: 'pre',
    sticky: 'left',
    width: isMobile ? 55 : 140,
    disableSortBy: true,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const number = useMemo(() => info.rows.length, [info.rows]);
      return <>Total ({number} lineups)</>;
    },
  },
  {
    Header: 'Time',
    id: 'netTime',
    accessor: 'time',
    Cell: ({value}) => <>{fixTime(value)}</>,
    width: isMobile ? 20 : 60,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce((prev, current) => prev + current.original.time, 0),
        [info.rows]
      );
      return <>{fixTime(total)}</>;
    },
  },
  {
    Header: 'Pts',
    id: 'netPoints',
    accessor: 'netPoints',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.original.netPoints,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'DRb',
    id: 'netDRebounds',
    accessor: 'netDRebounds',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.original.netDRebounds,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'ORb',
    id: 'netORebounds',
    accessor: 'netORebounds',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.original.netORebounds,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: '2PM',
    id: 'netMadeTwos',
    accessor: 'netMadeTwos',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.original.netMadeTwos,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: '2PA',
    id: 'netAttemptedTwos',
    accessor: 'netAttemptedTwos',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.original.netAttemptedTwos,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: '3PM',
    id: 'netMadeThrees',
    accessor: 'netMadeThrees',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.original.netMadeThrees,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: '3PA',
    id: 'netAttemptedThrees',
    accessor: 'netAttemptedThrees',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.original.netAttemptedThrees,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'Pnt',
    id: 'netPaint',
    accessor: 'netPaint',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.original.netPaint,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: '2nd',
    id: 'netSecond',
    accessor: 'netSecond',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.original.netSecond,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'Ast',
    id: 'netAssists',
    accessor: 'netAssists',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.original.netAssists,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'TO',
    id: 'netTurnovers',
    accessor: 'netTurnovers',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.original.netTurnovers,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'Lineup',
    id: 'advancedPlayers',
    accessor: 'players',
    Cell: ({value}) => <>{value.replace(/\\/g, '\n')}</>,
    className: 'pre',
    disableSortBy: true,
    width: isMobile ? 55 : 140,
    sticky: 'left',
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => info.rows.length, [info.rows]);
      return <>Total ({total} lineups)</>;
    },
  },
  {
    Header: 'Poss',
    id: 'advancedPossessions',
    accessor: 'possessions',
    Cell: ({value}) => <>{Math.round(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev + current.original.possessions,
            0
          ),
        [info.rows]
      );
      return <>{Math.round(total)}</>;
    },
  },
  {
    Header: 'O RTG',
    id: 'advancedORating',
    accessor: 'oRating',
    Cell: ({value}) => <>{value.toFixed(2)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const poss = info.rows.reduce(
          (prev, current) => prev + current.original.possessions,
          0
        );
        const points = info.rows.reduce(
          (prev, current) => prev + current.original.pointsFor,
          0
        );
        return (points / poss) * 100;
      }, [info.rows]);
      return <>{total.toFixed(2)}</>;
    },
  },
  {
    Header: 'D RTG',
    id: 'advancedDRating',
    accessor: 'dRating',
    Cell: ({value}) => <>{value.toFixed(2)}</>,
    sortDescFirst: false,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const poss = info.rows.reduce(
          (prev, current) => prev + current.original.possessions,
          0
        );
        const points = info.rows.reduce(
          (prev, current) => prev + current.original.pointsAgainst,
          0
        );
        return (points / poss) * 100;
      }, [info.rows]);
      return <>{total.toFixed(2)}</>;
    },
  },
  {
    Header: 'Net RTG',
    id: 'advancedNetRating',
    accessor: 'netRating',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const possFor = info.rows.reduce(
          (prev, current) => prev + current.original.possessions,
          0
        );
        const pointsFor = info.rows.reduce(
          (prev, current) => prev + current.original.pointsFor,
          0
        );
        const possAgainst = info.rows.reduce(
          (prev, current) => prev + current.original.possessions,
          0
        );
        const pointsAgainst = info.rows.reduce(
          (prev, current) => prev + current.original.pointsAgainst,
          0
        );
        const oRating = (pointsFor / possFor) * 100;
        const dRating = (pointsAgainst / possAgainst) * 100;
        return oRating - dRating;
      }, [info.rows]);
      return <>{format.format(total)}</>;
    },
  },

  {
    Header: 'ORB%',
    id: 'advancedORebPercent',
    accessor: 'oRebPercent',
    disableSortBy: false,
    Cell: ({value}) => <>{value.toFixed(2)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const missedShots = info.rows.reduce((prev, current) => {
          const {madeFor, attemptedFor} = current.original.totalShots;
          return prev + (attemptedFor - madeFor);
        }, 0);
        const oReb = info.rows.reduce(
          (prev, current) => prev + current.original.oRebFor,
          0
        );
        return oReb / missedShots;
      }, [info.rows]);
      return <>{total.toFixed(2)}</>;
    },
  },
  {
    Header: 'DRB%',
    id: 'advancedDRebPercent',
    accessor: 'dRebPercent',
    disableSortBy: false,
    Cell: ({value}) => <>{value.toFixed(2)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const missedShots = info.rows.reduce((prev, current) => {
          const {madeAgainst, attemptedAgainst} = current.original.totalShots;
          return prev + (attemptedAgainst - madeAgainst);
        }, 0);
        const dReb = info.rows.reduce(
          (prev, current) => prev + current.original.dRebFor,
          0
        );
        return dReb / missedShots;
      }, [info.rows]);
      return <>{total.toFixed(2)}</>;
    },
  },

  {
    Header: 'AST %',
    id: 'advancedAssistPerFG',
    accessor: 'assistPerFG',
    Cell: ({value}) => <>{value.toFixed(2)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const assists = info.rows.reduce(
          (prev, current) => prev + current.original.assistsFor,
          0
        );
        const madeShots = info.rows.reduce(
          (prev, current) => prev + current.original.totalShots.madeFor,
          0
        );
        return assists / madeShots;
      }, [info.rows]);
      return <>{total.toFixed(2)}</>;
    },
  },
  {
    Header: 'A/P',
    id: 'advancedAssistsPerPoss',
    accessor: 'assistsPerPoss',
    Cell: ({value}) => <>{value.toFixed(2)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const assists = info.rows.reduce(
          (prev, current) => prev + current.original.assistsFor,
          0
        );
        const poss = info.rows.reduce(
          (prev, current) => prev + current.original.possessions,
          0
        );
        return assists / poss;
      }, [info.rows]);
      return <>{total.toFixed(2)}</>;
    },
  },
  {
    Header: 'A/TO',
    id: 'advancedAssistTurnoverRatio',
    accessor: 'assistTurnoverRatio',
    Cell: ({value}) => <>{value.toFixed(2)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const assists = info.rows.reduce(
          (prev, current) => prev + current.original.assistsFor,
          0
        );
        const turnovers = info.rows.reduce(
          (prev, current) => prev + current.original.turnoversFor,
          0
        );
        return assists / turnovers;
      }, [info.rows]);
      return <>{total.toFixed(2)}</>;
    },
  },
  {
    Header: 'TO/P',
    id: 'advancedTurnoverPerPoss',
    accessor: 'turnoversPerPoss',
    Cell: ({value}) => <>{value.toFixed(2)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => {
        const turnovers = info.rows.reduce(
          (prev, current) => prev + current.original.turnoversFor,
          0
        );
        const poss = info.rows.reduce(
          (prev, current) => prev + current.original.possessions,
          0
        );
        return turnovers / poss;
      }, [info.rows]);
      return <>{total.toFixed(2)}</>;
    },
  },
  {
    Header: 'Lineup',
    id: 'shootingPlayers',
    accessor: 'players',
    Cell: ({value}) => <>{value.replace(/\\/g, '\n')}</>,
    className: 'pre',
    disableSortBy: true,
    width: isMobile ? 55 : 150,
    sticky: 'left',
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(() => info.rows.length, [info.rows]);
      return <>Total ({total} lineups)</>;
    },
  },
  {
    Header: 'Team',
    id: 'shootingTeam',
    columns: [
      {
        Header: 'FGM',
        id: 'shootingMadeFor',
        accessor: (row) => row.totalShots.madeFor,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.totalShots.madeFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGA',
        id: 'shootingAttemptedFor',
        accessor: (row) => row.totalShots.attemptedFor,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) =>
                  prev + current.original.totalShots.attemptedFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'FG%',
        id: 'shootingFgPercentFor',
        accessor: 'fgPercentFor',
        Cell: ({value}) => <>{value.toFixed(2)}</>,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(() => {
            const total = info.rows.reduce(
              (prev, current) =>
                prev + current.original.totalShots.attemptedFor,
              0
            );
            const made = info.rows.reduce(
              (prev, current) => prev + current.original.totalShots.madeFor,
              0
            );
            return made / total;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: '2PM',
        id: 'shootingMadeTwosFor',
        accessor: 'madeTwosFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.madeTwosFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PA',
        id: 'shootingAttemptedTwosFor',
        accessor: 'attemptedTwosFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.attemptedTwosFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: '2P%',
        id: 'shootingTwoPercentFor',
        accessor: 'twoPercentFor',
        Cell: ({value}) => <>{value.toFixed(2)}</>,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(() => {
            const made = info.rows.reduce(
              (prev, current) => prev + current.original.madeTwosFor,
              0
            );
            const shot = info.rows.reduce(
              (prev, current) => prev + current.original.attemptedTwosFor,
              0
            );
            return made / shot;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: '3PM',
        id: 'shootingMadeThreesFor',
        accessor: 'madeThreesFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.madeThreesFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3PA',
        id: 'shootingAttemptedThreesFor',
        accessor: 'attemptedThreesFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.attemptedThreesFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3P%',
        id: 'shootingThreePercentFor',
        accessor: 'threePercentFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Cell: ({value}) => <>{value.toFixed(2)}</>,
        Footer: (info) => {
          const total = useMemo(() => {
            const made = info.rows.reduce(
              (prev, current) => prev + current.original.madeThreesFor,
              0
            );
            const shot = info.rows.reduce(
              (prev, current) => prev + current.original.attemptedThreesFor,
              0
            );
            return made / shot;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: 'eFG%',
        id: 'shootingEFGFor',
        accessor: 'eFGFor',
        Cell: ({value}) => <>{value.toFixed(2)}</>,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(() => {
            const shots = info.rows.reduce(
              (prev, current) =>
                prev + current.original.totalShots.attemptedFor,
              0
            );
            const threes = info.rows.reduce(
              (prev, current) => prev + current.original.madeThreesFor,
              0
            );
            const makes = info.rows.reduce(
              (prev, current) => prev + current.original.totalShots.madeFor,
              0
            );
            return (makes + 0.5 * threes) / shots;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: '3AR',
        id: 'shootingThreeARFor',
        accessor: 'threeARFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Cell: ({value}) => <>{value.toFixed(2)}</>,
        Footer: (info) => {
          const total = useMemo(() => {
            const threes = info.rows.reduce(
              (prev, current) => prev + current.original.attemptedThreesFor,
              0
            );
            const total = info.rows.reduce(
              (prev, current) =>
                prev + current.original.totalShots.attemptedFor,
              0
            );
            return threes / total;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
    ],
  },
  {
    Header: 'Opponent',
    id: 'shootingOpponent',
    columns: [
      {
        Header: 'FGM',
        id: 'shootingMadeAgainst',
        accessor: (row) => row.totalShots.madeAgainst,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) =>
                  prev + current.original.totalShots.madeAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGA',
        id: 'shootingAttemptedAgainst',
        accessor: (row) => row.totalShots.attemptedAgainst,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) =>
                  prev + current.original.totalShots.attemptedAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'FG%',
        id: 'shootingFgPercentAgainst',
        accessor: 'fgPercentAgainst',
        Cell: ({value}) => <>{value.toFixed(2)}</>,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(() => {
            const total = info.rows.reduce(
              (prev, current) =>
                prev + current.original.totalShots.attemptedAgainst,
              0
            );
            const made = info.rows.reduce(
              (prev, current) => prev + current.original.totalShots.madeAgainst,
              0
            );
            return made / total;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: '2PM',
        id: 'shootingMadeTwosAgainst',
        accessor: 'madeTwosAgainst',

        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.madeTwosAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PA',
        id: 'shootingAttemptedTwosAgainst',
        accessor: 'attemptedTwosAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.attemptedTwosAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: '2P%',
        id: 'shootingTwoPercentAgainst',
        accessor: 'twoPercentAgainst',
        Cell: ({value}) => <>{value.toFixed(2)}</>,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(() => {
            const made = info.rows.reduce(
              (prev, current) => prev + current.original.madeTwosAgainst,
              0
            );
            const shot = info.rows.reduce(
              (prev, current) => prev + current.original.attemptedTwosAgainst,
              0
            );
            return made / shot;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: '3PM',
        id: 'shootingMadeThreesAgainst',
        accessor: 'madeThreesAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev + current.original.madeThreesAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3PA',
        id: 'shootingAttemptedThreesAgainst',
        accessor: 'attemptedThreesAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) =>
                  prev + current.original.attemptedThreesAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3P%',
        id: 'shootingThreePercentAgainst',
        accessor: 'threePercentAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Cell: ({value}) => <>{value.toFixed(2)}</>,
        Footer: (info) => {
          const total = useMemo(() => {
            const made = info.rows.reduce(
              (prev, current) => prev + current.original.madeThreesAgainst,
              0
            );
            const shot = info.rows.reduce(
              (prev, current) => prev + current.original.attemptedThreesAgainst,
              0
            );
            return made / shot;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: 'eFG%',
        id: 'shootingEFGAgainst',
        accessor: 'eFGAgainst',
        Cell: ({value}) => <>{value.toFixed(2)}</>,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(() => {
            const shots = info.rows.reduce(
              (prev, current) =>
                prev + current.original.totalShots.attemptedAgainst,
              0
            );
            const threes = info.rows.reduce(
              (prev, current) => prev + current.original.madeThreesAgainst,
              0
            );
            const makes = info.rows.reduce(
              (prev, current) => prev + current.original.totalShots.madeAgainst,
              0
            );
            return (makes + 0.5 * threes) / shots;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
      {
        Header: '3AR',
        id: 'shootingThreeARAgainst',
        accessor: 'threeARAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Cell: ({value}) => <>{value.toFixed(2)}</>,
        Footer: (info) => {
          const total = useMemo(() => {
            const threes = info.rows.reduce(
              (prev, current) => prev + current.original.attemptedThreesAgainst,
              0
            );
            const total = info.rows.reduce(
              (prev, current) =>
                prev + current.original.totalShots.attemptedAgainst,
              0
            );
            return threes / total;
          }, [info.rows]);
          return <>{total.toFixed(2)}</>;
        },
      },
    ],
  },
];

export const csvHeaders = [
  {label: 'players', key: 'values.players'},
  {label: 'time (s)', key: 'values.time'},
  {label: 'TEAM', key: ''},
  {label: 'Pts', key: 'values.pointsFor'},
  {label: 'Drb', key: 'values.dRebFor'},
  {label: 'Orb', key: 'values.oRebFor'},
  {label: 'FGM', key: 'values.madeFor'},
  {label: 'FGA', key: 'values.attemptedFor'},
  {label: '2-PM', key: 'values.madeTwosFor'},
  {label: '2PA', key: 'values.attemptedTwosFor'},
  {label: '3PM', key: 'values.madeThreesFor'},
  {label: '3PA', key: 'values.attemptedThreesFor'},
  {label: 'Paint', key: 'values.paintFor'},
  {label: '2nd Chance', key: 'values.secondFor'},
  {label: 'Ast', key: 'values.assistsFor'},
  {label: 'TO', key: 'values.turnoversFor'},
  {label: 'OPP', key: ''},
  {label: 'Pts', key: 'values.pointsAgainst'},
  {label: 'Drb', key: 'values.dRebAgainst'},
  {label: 'Orb', key: 'values.oRebAgainst'},
  {label: 'FGM', key: 'values.madeAgainst'},
  {label: 'FGA', key: 'values.attemptedAgainst'},
  {label: '2PM', key: 'values.madeTwosAgainst'},
  {label: '2PA', key: 'values.attemptedTwosAgainst'},
  {label: '3PM', key: 'values.madeThreesAgainst'},
  {label: '3PA', key: 'values.attemptedThreesAgainst'},
  {label: 'Paint', key: 'values.paintAgainst'},
  {label: '2nd Chance', key: 'values.secondAgainst'},
  {label: 'Ast', key: 'values.assistsAgainst'},
  {label: 'TO', key: 'values.turnoversAgainst'},
];
