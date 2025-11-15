import styled from 'styled-components';

export const TableStyle = styled.div`
  display: block;
  padding-bottom: 50px;
  width: 100%;
  .table {
    width: 100%;

    .thead {
      position: sticky;
      top: 0px;
      color: #fff;
      z-index: 4;

      .tr {
        border-bottom: 2px solid black;
      }
      .th {
        background: #42444e;
      }
    }
    .tbody {
      .td{
        overflow: hidden;
      }
      .tr {
        min-height: 100px;

        &:nth-child(odd) {
          .td {
            background: #d3d3d3;
          }
        }
        &:nth-child(even) {
          .td {
            background: #888888;
            
          }
        }
      }
    }
    .tfoot {
      position: sticky;
      bottom: 0;
      z-index: 4;
      .tr {
        color: #fff;
        min-height: 50px;
      }
      .td {
        background-color: #42444e;
      }
    }
  }
  .net,
  .advanced
   {
    .td {
      white-space: pre;
      padding: 3px 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 2px solid black;
      border-right: 2px solid black;
      font-size: 14px;
      font-weight: bold;
      font-family: tahoma;
    }
    .th {
      height: 50px;
      word-wrap: break-word;
      text-align: center;
      border-right: 2px solid black;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .total, .shooting {
    .td {
      white-space: pre;
      padding: 3px 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 2px solid black;
      border-right: 2px solid black;
      font-size: 12px;
      font-weight: 600;
      font-family: tahoma;
    }
    .th {
      height: 50px;
      word-wrap: break-word;
      text-align: center;
      border-right: 2px solid black;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
      a {
        color: white;
      }
    }
    [data-sticky-td] {
      position: sticky;
    }
  }
  @media screen and (max-width: 850px) {
    overflow: hidden;
    padding-bottom: 0px;
    .table {
      overflow: scroll;
      height: 100%;
      width: 100%;
    /* All the rows more space so they can scroll */
    /* Total needs way more space than the rest */
    }
    .total, .shooting {
      .thead,
      .tbody,
      .tfoot {
        min-width: 1000px;
      }
      .td {
        font-size: 11px;
      }
      .th {
        font-size: 13px;
      }
    }
    .net,
    .advanced
     {
      .thead,
      .tbody,
      .tfoot {
        min-width: 600px;
      }
      .td {
        font-size: 12px;
      }
      .th {
        font-size: 12px;
      }
    }
  }
`;
