import { GameRules, WinnerCallbacks } from "./game.interface";

export interface IGameMode {
  winnerCallbacks: WinnerCallbacks;
  ruleSet: GameRules;
  title: string;
}
