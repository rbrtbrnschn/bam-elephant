import { AT_THE_CLUB_PRESET } from "./at-the-club";
import { BASIC_PRESET } from "./basic";
import { LOW_KEY_PRESET } from "./low-key";
import { OUTDOORS_PRESET } from "./outdoors";
import { WALKTHROUGH_PRESET } from "./walkthrough";

export const PRESETS = {
  basic: BASIC_PRESET,
  walkthrough: WALKTHROUGH_PRESET,
  lowKey: LOW_KEY_PRESET,
  outdoors: OUTDOORS_PRESET,
  atTheClub: AT_THE_CLUB_PRESET,
};
export type Presets = keyof typeof PRESETS;
