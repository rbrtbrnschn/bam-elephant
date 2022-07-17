import { IGamePreset } from "../../interfaces/preset.interface";
import { CRAZY_RULES } from "../rules";
import { OUTDOORS_GAME_MODE } from "../game-modes";

export const OUTDOORS_PRESET: IGamePreset = {
  title: "outdoors",
  ruleSet: { ...CRAZY_RULES },
  gamemode: { ...OUTDOORS_GAME_MODE },
};
