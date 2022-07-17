import { IGamePreset } from "../../interfaces/gamemode.interface";
import { ADVERSITY_RICH_RULES, CRAZY_RULES } from "../rules";
import { AT_THE_CLUB_GAME_MODE, OUTDOORS_GAME_MODE } from "../game-modes";

export const AT_THE_CLUB_PRESET: IGamePreset = {
  title: "@ the club",
  ruleSet: { ...ADVERSITY_RICH_RULES },
  gamemode: { ...AT_THE_CLUB_GAME_MODE },
};
