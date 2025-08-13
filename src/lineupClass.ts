import {player} from './types';
const emptyData = {
    pointsFor: 0,
    players: '',
    pointsAgainst: 0,
    dRebFor: 0,
    dRebAgainst: 0,
    oRebFor: 0,
    oRebAgainst: 0,
    madeTwosFor: 0,
    attemptedTwosFor: 0,
    madeTwosAgainst: 0,
    attemptedTwosAgainst: 0,
    madeThreesFor: 0,
    madeThreesAgainst: 0,
    attemptedThreesFor: 0,
    attemptedThreesAgainst: 0,
    paintFor: 0,
    paintAgainst: 0,
    secondFor: 0,
    secondAgainst: 0,
    turnoversFor: 0,
    turnoversAgainst: 0,
    assistsFor: 0,
    assistsAgainst: 0,
    ftaFor: 0,
    ftaAgainst: 0,
    time: 0,
}
export type dbData = typeof emptyData;

export class Lineup {
  players: string;
  time: number;
  pointsFor: number;
  pointsAgainst: number;
  dRebFor: number;
  dRebAgainst: number;
  oRebFor: number;
  oRebAgainst: number;
  madeTwosFor: number;
  attemptedTwosFor: number;
  madeTwosAgainst: number;
  attemptedTwosAgainst: number;
  madeThreesFor: number;
  madeThreesAgainst: number;
  attemptedThreesFor: number;
  attemptedThreesAgainst: number;
  turnoversFor: number;
  turnoversAgainst: number;
  assistsFor: number;
  assistsAgainst: number;
  ftaFor: number;
  ftaAgainst: number;
  paintFor: number;
  paintAgainst: number;
  secondFor: number;
  secondAgainst: number;
  constructor(players: string, data = {...emptyData}) {
    this.players = players;
    this.pointsFor = data.pointsFor;
    this.pointsAgainst = data.pointsAgainst;
    this.dRebFor = data.dRebFor;
    this.dRebAgainst = data.dRebAgainst;
    this.oRebFor = data.oRebFor;
    this.oRebAgainst = data.oRebAgainst;
    this.madeTwosFor = data.madeTwosFor;
    this.attemptedTwosFor = data.attemptedTwosFor;
    this.madeTwosAgainst = data.madeTwosAgainst;
    this.attemptedTwosAgainst = data.attemptedTwosAgainst;
    this.madeThreesFor = data.madeThreesFor;
    this.madeThreesAgainst = data.madeThreesAgainst;
    this.attemptedThreesFor = data.attemptedThreesFor;
    this.attemptedThreesAgainst = data.attemptedThreesAgainst;
    this.paintFor = data.paintFor;
    this.paintAgainst = data.paintAgainst;
    this.secondFor = data.secondFor;
    this.secondAgainst = data.secondAgainst;
    this.turnoversFor = data.turnoversFor;
    this.turnoversAgainst = data.turnoversAgainst;
    this.assistsFor = data.assistsFor;
    this.assistsAgainst = data.assistsAgainst;
    this.ftaFor = data.ftaFor;
    this.ftaAgainst = data.ftaAgainst;
    this.time = data.time;
  }
  combineLineup = (other: Lineup) => {
    const keys = Object.keys(other) as Array<keyof Lineup>;
    keys.forEach((property) => {
      const prop = other[property];
      if (typeof prop === 'number') {
        (this[property] as number) += prop;
      }
    });
  };
  get totalShots() {
    return {
      attemptedFor: this.attemptedThreesFor + this.attemptedTwosFor,
      attemptedAgainst: this.attemptedThreesAgainst + this.attemptedTwosAgainst,
      madeFor: this.madeTwosFor + this.madeThreesFor,
      madeAgainst: this.madeTwosAgainst + this.madeThreesAgainst,
    };
  }
  get fgPercentFor() {
    return this.totalShots.madeFor / this.totalShots.attemptedFor;
  }
  get fgPercentAgainst() {
    return this.totalShots.madeAgainst / this.totalShots.attemptedAgainst;
  }
  get twoPercentFor() {
    return this.madeTwosFor / this.attemptedTwosFor;
  }
  get twoPercentAgainst() {
    return this.madeTwosAgainst / this.attemptedTwosAgainst;
  }
  get threePercentFor() {
    return this.madeThreesFor / this.attemptedThreesFor;
  }
  get threePercentAgainst() {
    return this.madeThreesAgainst / this.attemptedThreesAgainst;
  }
  get netPoints() {
    return this.pointsFor - this.pointsAgainst;
  }
  get netORebounds() {
    return this.oRebFor - this.oRebAgainst;
  }
  get netDRebounds() {
    return this.dRebFor - this.dRebAgainst;
  }
  get netPaint() {
    return this.paintFor - this.paintAgainst;
  }
  get netSecond() {
    return this.secondFor - this.secondAgainst;
  }
  get netAssists() {
    return this.assistsFor - this.assistsAgainst;
  }
  get netTurnovers() {
    return this.turnoversFor - this.turnoversAgainst;
  }
  get netAttemptedTwos() {
    return this.attemptedTwosFor - this.attemptedTwosAgainst;
  }
  get netMadeTwos() {
    return this.madeTwosFor - this.madeTwosAgainst;
  }
  get netAttemptedThrees() {
    return this.attemptedThreesFor - this.attemptedThreesAgainst;
  }
  get netMadeThrees() {
    return this.madeThreesFor - this.madeThreesAgainst;
  }
  get possessions() {
    //FGA-OR + TO + .44*FTA
    const {attemptedFor, attemptedAgainst} = this.totalShots;
    const possFor =
      attemptedFor - this.oRebFor + this.turnoversFor + (0.44 * this.ftaFor);
    const possAgainst =
      attemptedAgainst -
      this.oRebAgainst +
      this.turnoversAgainst +
      (0.44 * this.ftaAgainst);
    //because lineups can change between possessions, just average out the possessions of off and def.
    return (possAgainst + possFor) / 2;
  }
  get oRating() {
    return (this.pointsFor / this.possessions) * 100;
  }
  get dRating() {
    return (this.pointsAgainst / this.possessions) * 100;
  }
  get netRating(){
    return this.oRating - this.dRating
  }
  get threeARFor() {
    const {attemptedFor} = this.totalShots;
    return (this.attemptedThreesFor / attemptedFor);
  }
  get threeARAgainst(){
    const {attemptedAgainst} = this.totalShots;
    return (this.attemptedThreesFor / attemptedAgainst);
  }
  get assistsPerPoss() {
    return this.assistsFor / this.possessions;
  }
  get turnoversPerPoss() {
    return this.turnoversFor / this.possessions;
  }
  get eFGFor() {
    const {attemptedFor, madeFor} = this.totalShots;
    return (madeFor + 0.5 * this.madeThreesFor) / attemptedFor;
  }
  get eFGAgainst(){
    const {attemptedAgainst, madeAgainst} = this.totalShots;
    return (madeAgainst + 0.5 * this.madeThreesAgainst) / attemptedAgainst;
  }
  get oRebPercent() {
    //Percent of missed shots that were O-rebounded by team.
    const {attemptedFor, madeFor} = this.totalShots;
    return attemptedFor - madeFor === 0 ? 0 : this.oRebFor / (attemptedFor - madeFor);
  }
  get dRebPercent() {
    //Percent of missed shots that were D-rebounded by team.
    const {attemptedAgainst, madeAgainst} = this.totalShots;
    return attemptedAgainst - madeAgainst === 0 ? 0 : this.dRebFor / (attemptedAgainst - madeAgainst);
  }
  get totalRebPercent(){
    const{attemptedAgainst, madeAgainst, madeFor, attemptedFor} = this.totalShots
    const possibleRebs = (attemptedAgainst - madeAgainst) + (attemptedFor-madeFor);
    const totalRebs = this.oRebFor + this.dRebFor;
    return possibleRebs === 0 ? 0 : totalRebs/possibleRebs
  }
  get assistPerFG() {
    const {madeFor} = this.totalShots;
    return madeFor === 0 ? 0 : this.assistsFor / madeFor;
  }
  get assistTurnoverRatio() {
    return this.turnoversFor === 0 ? 0 : this.assistsFor / this.turnoversFor;
  }
}
