import { IGamePreset } from "../../interfaces/gamemode.interface";
import { BASIC_RULES } from "../rules";
import { BASIC_GAME_MODE } from "../game-modes";

export const BASIC_PRESET: IGamePreset = {
  title: "basic",
  ruleSet: { ...BASIC_RULES },
  gamemode: { ...BASIC_GAME_MODE },
};
