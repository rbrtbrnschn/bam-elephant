import { toast } from "react-toastify";
import { CardValue } from "../interfaces/card.interface";
import {
  GameMode,
  IGameModeWithDescription,
} from "../interfaces/game.interface";

export const LOW_KEY_GAME_MODE: GameMode = {
  [CardValue.SEVEN]: (options) => {
    options.thunks.shuffle();
    toast.warn("Shuffling Leftover Cards.");
  },
  [CardValue.ACE]: (options) => {
    options.actions.toggleModal();
  },
};

export const LOW_KEY_GAME_MODE_WITH_DESCRIPTION: IGameModeWithDescription = {
  title: "Low-Key",
  about:
    "A low-key scenario, just sit down with your friends. Put on some good music. Have a good time.",
  description: `Seven: shuffle deck
  Ace: assign new rule`,
  mode: LOW_KEY_GAME_MODE,
};

/* For Walkthrough Purposes Only */
export const WALKTHROUGH_GAME_MODE: GameMode = { ...LOW_KEY_GAME_MODE };

export const WALKTHROUGH_GAME_MODE_WITH_DESCRIPTION: IGameModeWithDescription =
  {
    title: "Walkthrough",
    about: "",
    description: "For educational purposes only.",
    mode: WALKTHROUGH_GAME_MODE,
  };
/* For Walkthrough Purposes Only */

export const OUTDOORS_GAME_MODE: GameMode = {
  [CardValue.JACK]: (options) => {
    options.actions.toggleModal();
  },
  [CardValue.QUEEN]: (options) => {
    options.actions.toggleModal();
  },
  [CardValue.KING]: (options) => {
    options.actions.toggleModal();
  },
};

export const OUTDOORS_GAME_MODE_WITH_DESCRIPTION: IGameModeWithDescription = {
  title: "Outdoors",
  about:
    "Share relevant, engaging, and inspirational brand messages to create a connection with your audience.",
  description: `
  Jack: assign new rule
  Queen: assign new rule
  KING assing new rule`,
  mode: OUTDOORS_GAME_MODE,
};
export const AT_THE_CLUB_GAME_MODE: GameMode = {
  ...OUTDOORS_GAME_MODE,
};
export const AT_THE_CLUB_GAME_MODE_WITH_DESCRIPTION: IGameModeWithDescription =
  {
    title: "@ the club",
    about:
      "Let us help you level up your search engine game, explore our solutions for digital marketing for your business.",
    description: "WIP.",
    mode: AT_THE_CLUB_GAME_MODE,
  };

export const GAME_MODES_WITH_DESCRIPTION = [
  OUTDOORS_GAME_MODE_WITH_DESCRIPTION,
  LOW_KEY_GAME_MODE_WITH_DESCRIPTION,
  AT_THE_CLUB_GAME_MODE_WITH_DESCRIPTION,
];
