export interface State {
  G: object;
  ctx: Ctx;
  deltalog?: Array<object>;
  _undo: Array<Undo>;
  _redo: Array<Undo>;
  _stateID: number;
}

export type StageName = string;
export type PlayerID = string;

interface ActivePlayers {
  [playerID: string]: StageName;
}

export interface Ctx {
  numPlayers: number;
  playOrder: Array<string>;
  playOrderPos: number;
  activePlayers: null | ActivePlayers;
  currentPlayer: string;
  numMoves?: number;
  gameover?: any;
  turn: number;
  phase: string;
  _activePlayersMoveLimit?: object;
  _activePlayersNumMoves?: object;
  _prevActivePlayers?: Array<string>;
  _random?: object;
}

export interface LogEntry {
  action: object;
  _stateID: number;
  turn: number;
  phase: string;
  redact?: boolean;
  automatic?: boolean;
}

type Plugin = object;

export interface LongFormMove {
  move: Function;
  redact?: boolean;
  client?: boolean;
  undoable?: boolean | Function;
}

export type Move = Function | LongFormMove;

export interface MoveMap {
  [moveName: string]: Move;
}

export interface PhaseConfig {
  start?: boolean;
  next?: string;
  onBegin?: Function;
  onEnd?: Function;
  endIf?: Function;
  moves?: MoveMap;
  turn?: TurnConfig;
}

export interface StageConfig {
  moves?: MoveMap;
  next?: string;
}

export interface StageMap {
  [stageName: string]: StageConfig;
}

export interface TurnConfig {
  activePlayers?: object;
  moveLimit?: number;
  onBegin?: Function;
  onEnd?: Function;
  endIf?: Function;
  onMove?: Function;
  stages?: StageMap;
  moves?: MoveMap;
  order?: object;
}

interface PhaseMap {
  [phaseName: string]: PhaseConfig;
}

export interface GameConfig {
  name?: string;
  seed?: string | number;
  setup?: Function;
  moves?: MoveMap;
  phases?: PhaseMap;
  turn?: TurnConfig;
  events?: {
    endGame?: boolean;
    endPhase?: boolean;
    endTurn?: boolean;
    setPhase?: boolean;
    endStage?: boolean;
    setStage?: boolean;
    pass?: boolean;
    setActivePlayers?: boolean;
  };
  endIf?: Function;
  playerView?: Function;
  plugins?: Array<Plugin>;
  processMove?: Function;
  flow?: any;
}

type Undo = { G: object; ctx: Ctx; moveType?: string };
