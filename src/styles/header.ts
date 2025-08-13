import styled from 'styled-components';

export const HeaderStyle = styled.div`
  background-color: black;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  

  .headerGameControls {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    min-height: 130px;
    flex-grow: 1;
  }
  .headerStatControls,
  .headerYearControls {
    align-items: center;
    justify-content: space-around;
    display: flex;
    flex-flow: column nowrap;
    min-height: 130px;
  }
  .playerSwitch button,
  .headerFinder button {
    width: 125px;
    height: 50px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 16px;

    &:hover {
      background-color: #808080;
    }
  }

  .playerSwitch .close {
    background-color: rgb(218, 99, 99);

    &:hover {
      background-color: rgb(230, 38, 38);
    }
  }

  .gameInfo {
    text-align: center;
    font-size: 18px;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0px;
    flex-grow: 1;
    color: white;
  }
  .totals {
    font-size: 24px;
    font-weight: bold;
  }
  .score {
    font-size: 20px;
    font-weight: bold;
  }
  .title {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 90px;
  }
  .select {
    font-size: 16px;
    align-self: flex-end;
    font-weight: 600;
    z-index: 10;
  }
  .label {
    left: 5px;
    pointer-events: none;
    position: absolute;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
    top: 5%;
    color: grey;
    z-index: 1;
    font-size: 14px;
    font-weight: 500;
  }
  .year,
  .stat,
  .group {
    width: 125px;
  }
  .group {
    z-index: 4;
  }
  .game {
    width: 200px;
  }
  .selectContainer {
    display: flex;
  }
  .switch{
    color: white;
    
  }
  @media screen and (max-width: 850px) {
    margin-bottom: 20px;
    .playerSwitch button,
    .headerFinder button {
      width: 100px;
      height: 45px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 12px;
    }
    .year,
    .stat,
    .group {
      width: 100px;
    }
    .game {
      width: 125px;
    }
    .label {
      left: 5px;
      pointer-events: none;
      position: absolute;
      transition: 0.2s ease all;
      -moz-transition: 0.2s ease all;
      -webkit-transition: 0.2s ease all;
      top: 5%;
      color: grey;
      z-index: 1;
      font-size: 12px;
      font-weight: 500;
    }
    .select {
      font-size: 12px;
      align-self: flex-end;
      font-weight: 600;
    }
    .gameInfo {
      text-align: center;
      font-size: 14px;
      min-height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 2px 0px;
      flex-grow: 1;
      color: white;
    }
    .totals {
      font-size: 18px;
      font-weight: bold;
    }
    .score {
      font-size: 14px;
      font-weight: bold;
    }
  }
`;

export const Toggles = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

`
export const ToggleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
    font-size: 18px;
`