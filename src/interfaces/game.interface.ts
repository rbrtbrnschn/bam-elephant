import { IBaseRule } from "../common/rules";
import { CardValue, ICard } from "./card.interface";
import { IGamePreset } from "./preset.interface";

export type GameRules = Partial<Record<CardValue, IBaseRule>>;
export interface IGameState {
  deck: ICard[];
  drawnCards: ICard[];
  disposedCards: ICard[];
  rule: string;
  rules: GameRules;
  newRule: string;
  modalIsOpen: boolean;
}
export interface IGameActions {
  setDeck: (deck: ICard[]) => void;
  setDrawnCards: (cards: ICard[]) => void;
  setDisposedCards: (cards: ICard[]) => void;
  setRule: (rule: string) => void;
  setRules: (rules: GameRules) => void;
  setNewRule: (newRule: string) => void;
  toggleModal: () => void;
}

export interface IGameHelpers {
  winner: ICard | null | undefined;
  loser: ICard | null | undefined;
  roundHasStarted: boolean;
  roundHasEnded: boolean;
}
export interface IGameThunks {
  shuffle: () => void;
  restart: () => void;
}

export interface IGameInjections {
  state: IGameState;
  actions: IGameActions;
  helpers: IGameHelpers;
  thunks: IGameThunks;
}
export type GameModeHook = (e: IGameInjections) => void;
export type GameMode = Partial<Record<CardValue, GameModeHook>>;
export interface IUseGameStateOptions {
  discardedPileSize?: number;
  playerCount?: number;
  preset?: IGamePreset;
}
