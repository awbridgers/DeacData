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
  //console.log(isDesc)
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

export const getColumns = (isMobile: boolean): Array<Column<Lineup>> => [
  {
    Header: 'Lineup',
    id: 'totalLineup',
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
          info.rows.reduce((prev, current) => prev +  current.original.time, 0),
        [info.rows]
      );
      return <>{fixTime(total)}</>;
    },
  },
  {
    Header: 'Team',
    id:'totalTeamFor',
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: () => null,
    columns: [
      {
        Header: 'Pts',
        id:'totalPtsFor',
        accessor: 'pointsFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.pointsFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'DRb',
        id:'totalDRbFor',
        accessor: 'dRebFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.dRebFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'ORb',
        id:'totalORbFor',
        accessor: 'oRebFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.oRebFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGM',
        id:'totalFGMFor',
        accessor: (row) => row.totalShots.madeFor,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.totalShots.madeFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGA',
        id:'totalFGAFor',
        accessor: (row) => row.totalShots.attemptedFor,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.totalShots.attemptedFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PM',
        id:'total2PMFor',
        accessor: 'madeTwosFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.madeTwosFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PA',
        id:'total2PAFor',
        accessor: 'attemptedTwosFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.attemptedTwosFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: '3PM',
        id:'total3PMFor',
        accessor: 'madeThreesFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.madeThreesFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3PA',
        id:'total3PAFor',
        accessor: 'attemptedThreesFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.attemptedThreesFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'Pnt',
        id:'totalPntFor',
        accessor: 'paintFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.paintFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2nd',
        id:'total2ndFor',
        accessor: 'secondFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.secondFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'Ast',
        id:'totalAstFor',
        accessor: 'assistsFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.assistsFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'TO',
        id:'totalTOFor',
        accessor: 'turnoversFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.turnoversFor,
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
        id:'totalPtsAgainst',
        accessor: 'pointsAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.pointsAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'DRb',
        id:'totalDRbAgainst',
        accessor: 'dRebAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.dRebAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'ORb',
        id:'totalORbAgainst',
        accessor: 'oRebAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.oRebAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGM',
        id:'totalFGMAgainst',
        accessor: (row) => row.totalShots.madeAgainst,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.totalShots.madeAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGA',
        id:'totalFGAAgainst',
        accessor: (row) => row.totalShots.attemptedAgainst,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.totalShots.attemptedAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PM',
        id:'total2PMAgainst',
        accessor: 'madeTwosAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.madeTwosAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PA',
        id:'total2PAAgainst',
        accessor: 'attemptedTwosAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.attemptedTwosAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3PM',
        id:'total3PMAgainst',
        accessor: 'madeThreesAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.madeThreesAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3PA',
        id:'total3PAAgainst',
        accessor: 'attemptedThreesAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.attemptedThreesAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'Pnt',
        id:'totalPntAgainst',
        accessor: 'paintAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.paintAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: '2nd',
        id:'total2ndAgainst',
        accessor: 'secondAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.secondAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'Ast',
        id:'totalAstAgainst',
        accessor: 'assistsAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.assistsAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'TO',
        id:'totalTOAgainst',
        accessor: 'turnoversAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.turnoversAgainst,
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
    id: 'netLineup',
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
          info.rows.reduce((prev, current) => prev +  current.original.time, 0),
        [info.rows]
      );
      return <>{fixTime(total)}</>;
    },
  },
  {
    Header: 'Pts',
    id: 'netPts',
    accessor: 'netPoints',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,
    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev +  current.original.netPoints,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'DRb',
    id: 'netDRb',
    accessor: 'netDRebounds',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev +  current.original.netDRebounds,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'ORb',
    id: 'netORb',
    accessor: 'netORebounds',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev +  current.original.netORebounds,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: '2PM',
    id: 'net2PM',
    accessor: 'netMadeTwos',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev +  current.original.netMadeTwos,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: '2PA',
    id: 'net2PA',
    accessor: 'netAttemptedTwos',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev +  current.original.netAttemptedTwos,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: '3PM',
    id: 'net3PM',
    accessor: 'netMadeThrees',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev +  current.original.netMadeThrees,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: '3PA',
    id: 'net3PA',
    accessor: 'netAttemptedThrees',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev +  current.original.netAttemptedThrees,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'Pnt',
    id: 'netPnt',
    accessor: 'netPaint',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev +  current.original.netPaint,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: '2nd',
    id: 'net2nd',
    accessor: 'netSecond',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev +  current.original.netSecond,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'Ast',
    id: 'netAst',
    accessor: 'netAssists',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev +  current.original.netAssists,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'TO',
    id: 'netTO',
    accessor: 'netTurnovers',
    Cell: ({value}) => <>{format.format(value)}</>,
    sortDescFirst: true,
    sortType: sortNumbers,

    Footer: (info) => {
      const total = useMemo(
        () =>
          info.rows.reduce(
            (prev, current) => prev +  current.original.netTurnovers,
            0
          ),
        [info.rows]
      );
      return <>{format.format(total)}</>;
    },
  },
  {
    Header: 'Lineup',
    id: 'advancedLineup',
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
    id: 'advancedPoss',
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
    id: 'advancedO RTG',
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
    id: 'advancedD RTG',
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
    id: 'advancedNet RTG',
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
    id: 'advancedORB%',
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
    id: 'advancedDRB%',
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
    id: 'advancedAST %',
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
    id: 'advancedA/P',
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
    id: 'advancedA/TO',
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
    id: 'advancedTO/P',
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
    id: 'shootingLineup',
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
        id:'shootingFGMFor',
        accessor: (row) => row.totalShots.madeFor,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.totalShots.madeFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGA',
        id:'shootingFGAFor',
        accessor: (row) => row.totalShots.attemptedFor,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.totalShots.attemptedFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'FG%',
        id:'shootingFG%For',
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
        id:'shooting2PMFor',
        accessor: 'madeTwosFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.madeTwosFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PA',
        id:'shooting2PAFor',
        accessor: 'attemptedTwosFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.attemptedTwosFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: '2P%',
        id:'shooting2P%For',
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
        id:'shooting3PMFor',
        accessor: 'madeThreesFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.madeThreesFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3PA',
        id:'shooting3PAFor',
        accessor: 'attemptedThreesFor',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.attemptedThreesFor,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3P%',
        id:'shooting3P%For',
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
        id:'shootingeFG%For',
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
        id:'shooting3ARFor',
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
        id:'shootingFGMAgainst',
        accessor: (row) => row.totalShots.madeAgainst,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.totalShots.madeAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: 'FGA',
        id:'shootingFGAAgainst',
        accessor: (row) => row.totalShots.attemptedAgainst,
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.totalShots.attemptedAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: 'FG%',
        id:'shootingFG%Against',
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
        id:'shooting2PMAgainst',
        accessor: 'madeTwosAgainst',

        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.madeTwosAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '2PA',
        id:'shooting2PAAgainst',
        accessor: 'attemptedTwosAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.attemptedTwosAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },

      {
        Header: '2P%',
        id:'shooting2P%Against',
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
        id:'shooting3PMAgainst',
        accessor: 'madeThreesAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.madeThreesAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3PA',
        id:'shooting3PAAgainst',
        accessor: 'attemptedThreesAgainst',
        sortDescFirst: true,
        sortType: sortNumbers,
        Footer: (info) => {
          const total = useMemo(
            () =>
              info.rows.reduce(
                (prev, current) => prev +  current.original.attemptedThreesAgainst,
                0
              ),
            [info.rows]
          );
          return <>{total}</>;
        },
      },
      {
        Header: '3P%',
        id:'shooting3P%Against',
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
        id:'shootingeFG%Against',
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
        id:'shooting3ARAgainst',
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
  {label: '2-PA', key: 'values.attemptedTwosFor'},
  {label: '3-PM', key: 'values.madeThreesFor'},
  {label: '3-PA', key: 'values.attemptedThreesFor'},
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
  {label: '3-PM', key: 'values.madeThreesAgainst'},
  {label: '3-PA', key: 'values.attemptedThreesAgainst'},
  {label: 'Paint', key: 'values.paintAgainst'},
  {label: '2nd Chance', key: 'values.secondAgainst'},
  {label: 'Ast', key: 'values.assistsAgainst'},
  {label: 'TO', key: 'values.turnoversAgainst'},
];
