import { IGamePreset } from "../../interfaces/preset.interface";
import { LOW_KEY_RULES } from "../rules";
import { LOW_KEY_GAME_MODE } from "../game-modes";

export const LOW_KEY_PRESET: IGamePreset = {
  title: "low-key",
  ruleSet: { ...LOW_KEY_RULES },
  gamemode: { ...LOW_KEY_GAME_MODE },
};
