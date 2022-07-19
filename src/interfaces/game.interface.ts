import { CardValue, ICard } from "./card.interface";
import { IBaseRule, IGameRulesWithDescription } from "./rules.interface";

export interface IGameState {
  deck: ICard[];
  drawnCards: ICard[];
  disposedCards: ICard[];
  rule: IBaseRule;
  gameRules: IGameRulesWithDescription;
  gameMode: IGameModeWithDescription;
  newRule: string;
  modalIsOpen: boolean;
}
export interface IGameActions {
  setDeck: (deck: ICard[]) => void;
  setDrawnCards: (cards: ICard[]) => void;
  setDisposedCards: (cards: ICard[]) => void;
  setRule: (rule: IBaseRule) => void;
  setRules: (rules: IGameRulesWithDescription) => void;
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

export interface IGameModeWithDescription {
  title: string;
  about: [string, IBaseRule][];
  description: string;
  mode: GameMode;
  handleWinner: ({ state }: { state: IGameState }) => (ICard | null)[];
  handleNotification: (gameInjections: IGameInjections) => void;
  defaultRules: IBaseRule[];
  deck?: ICard[];
}
export interface IUseGameStateOptions {
  discardedPileSize?: number;
  playerCount?: number;
  gameMode?: IGameModeWithDescription;
  gameRules?: IGameRulesWithDescription;
  deck?: ICard[];
}
