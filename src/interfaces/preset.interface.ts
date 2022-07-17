import { GameRules, GameMode } from "./game.interface";

export interface IGamePreset {
  gamemode: GameMode;
  ruleSet: GameRules;
  title: string;
}
