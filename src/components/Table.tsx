import {useEffect, useMemo, useRef, useState} from 'react';
import {Lineup} from '../lineupClass';
import {
  total,
  advanced,
  shooting,
  net,
  csvHeaders,
  headerList,
} from '../util/tableSetup';
import {Column, useTable, useSortBy, useFlexLayout} from 'react-table';
import {CSVLink} from 'react-csv';
import {TableStyle} from '../styles/table';
import {useMediaQuery} from 'react-responsive';
import {useSticky} from 'react-table-sticky';

import {getHeaderName} from '../util/getHeaderName';

interface iProps {
  data: Lineup[];
  type: string;
  onClick?: () => void;
  filter: boolean;
  count: number;
}

const Table = ({data, type, onClick, filter, count}: iProps) => {
  const tableData = useMemo<Lineup[]>(
    () => data.filter((x) => x.possessions >= count || !filter),
    [data, count, filter]
  );
  const isMobile = useMediaQuery({maxWidth: '767px'});
  const tableColumns = useMemo<Column<Lineup>[]>(() => {
    return [
      ...total(isMobile),
      ...advanced(isMobile),
      ...net(isMobile),
      ...shooting(isMobile),
    ];
  }, [isMobile]);
  const hiddenCols = useMemo(() => {
    return headerList.filter((x) => !x.includes(type));
  }, [type]);
  const defaultColumn = useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 0, // minWidth is only used as a limit for resizing
      width: isMobile ? 15 : 30, // width is used for both the flex-basis and flex-grow
      maxWidth: isMobile ? 80 : 200, // maxWidth is only used as a limit for resizing
    }),
    [isMobile]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    setHiddenColumns,
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
      defaultColumn,
      initialState: {
        hiddenColumns: hiddenCols,
      },
    },
    useSortBy,
    useFlexLayout,
    useSticky
  );
  useEffect(() => {
    setHiddenColumns(hiddenCols);
  }, [type]);
  return (
    <TableStyle>
      <div {...getTableProps()} className={`table sticky ${type}`}>
        <div className="thead">
          {headerGroups.map((headerGroup) => {
            const {key, ...props} = headerGroup.getHeaderGroupProps();
            return (
              <div key={key} {...props} className="tr">
                {headerGroup.headers.map((column) => {
                  const {key: columnKey, ...columnProps} =
                    column.getHeaderProps(column.getSortByToggleProps());
                  return (
                    <div
                      key={columnKey}
                      {...columnProps}
                      title={getHeaderName(column.id)}
                      className={`th ${column.className}`}
                    >
                      {column.id === 'players_placeholder_0' &&
                      type === 'total' ? (
                        <CSVLink headers={csvHeaders} data={rows}>
                          Download
                        </CSVLink>
                      ) : column.id === 'time_placeholder_1' &&
                        type === 'total' ? (
                        <div style={{cursor: 'pointer'}} onClick={onClick}>
                          Report
                        </div>
                      ) : (
                        column.render('Header')
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div {...getTableBodyProps()} className="tbody">
          {rows.map((row) => {
            prepareRow(row);
            const {key: rowKey, ...rowProps} = row.getRowProps();
            return (
              <div key={rowKey} {...rowProps} className="tr">
                {row.cells.map((cell) => {
                  const {key: cellKey, ...cellProps} = cell.getCellProps();
                  return (
                    <div
                      key={cellKey}
                      {...cellProps}
                      className={`td ${cell.column.className}`}
                    >
                      {cell.render('Cell')}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="tfoot">
          {footerGroups.map(
            (foot, i) =>
              i === 0 && (
                <div
                  {...foot.getHeaderGroupProps()}
                  key={foot.getHeaderGroupProps().key}
                  className="tr"
                >
                  {foot.headers.map((column) => (
                    <div
                      {...column.getHeaderProps()}
                      key={column.getHeaderProps().key}
                      className="td"
                    >
                      {column.render('Footer')}
                    </div>
                  ))}
                </div>
              )
          )}
        </div>
      </div>
    </TableStyle>
  );
};

export default Table;
