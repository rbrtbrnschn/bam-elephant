import { IGamePreset } from "../../interfaces/gamemode.interface";
import { WALKTHROUGH_RULES } from "../rules";
import { WALKTHROUGH_GAME_MODE } from "../game-modes";

export const WALKTHROUGH_PRESET: IGamePreset = {
  title: "walkthrough",
  ruleSet: { ...WALKTHROUGH_RULES },
  gamemode: { ...WALKTHROUGH_GAME_MODE },
};
