import { IGameMode } from "../../interfaces/gamemode.interface";
import { BASIC_RULES } from "../rules";
import { BASIC_CALLBACKS } from "../winnerCallbacks";

export const BASIC_GAMEMODE: IGameMode = {
  title: "basic",
  ruleSet: { ...BASIC_RULES },
  winnerCallbacks: BASIC_CALLBACKS,
};
