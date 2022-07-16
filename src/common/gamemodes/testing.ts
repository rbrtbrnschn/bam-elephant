import { IGameMode } from "../../interfaces/gamemode.interface";
import { TESTING_RULES } from "../rules";
import { TESTING_CALLBACKS } from "../winnerCallbacks";

export const TESTING_GAMEMODE: IGameMode = {
  title: "testing",
  ruleSet: { ...TESTING_RULES },
  winnerCallbacks: TESTING_CALLBACKS,
};
