import { IGameMode } from "../../interfaces/gamemode.interface";
import { WALKTHROUGH_RULES } from "../rules";
import { WALKTHROUGH_CALLBACKS } from "../winnerCallbacks";

export const WALKTHROUGH_GAMEMODE: IGameMode = {
  title: "walkthrough",
  ruleSet: { ...WALKTHROUGH_RULES },
  winnerCallbacks: WALKTHROUGH_CALLBACKS,
};
