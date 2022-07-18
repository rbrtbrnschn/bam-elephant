import { toast } from "react-toastify";
import { CardValue, ICard } from "../interfaces/card.interface";
import {
  GameMode,
  IGameInjections,
  IGameModeWithDescription,
  IGameState,
} from "../interfaces/game.interface";

/**
 * Sorts ICard by `#value` from low to high.
 * @param a {ICard}
 * @param b {ICard}
 * @returns {number}
 */
function sortCardsByValue(a: ICard, b: ICard) {
  return a.value - b.value;
}

const handleWinner = ({ state }: { state: IGameState }) => {
  const sorted = [...state.drawnCards].sort(sortCardsByValue);
  const cardValues = sorted.map((c) => c.value);
  const uniqueCardValues = new Set(cardValues);

  const deltaSetLength = Math.abs(sorted.length - uniqueCardValues.size);
  const allDraw = sorted.length === deltaSetLength + 1;

  if (allDraw) return [null, null];

  return [sorted[sorted.length - 1], sorted[0]];
};

const handleNotification = ({
  state,
  actions,
  helpers,
  ...rest
}: IGameInjections) => {
  const { winner } = helpers;
  const { setRule } = actions;
  if (!state.drawnCards.length) return setRule({ title: "", description: "" });
  if (!winner) {
    toast.error("It's a draw.");
    return setRule({ title: "", description: "" });
  }

  try {
    state.gameMode.mode[winner.value]?.({ state, actions, helpers, ...rest });
  } catch (e) {
    console.error(e);
  }

  const rule = state.gameRules.rules[winner.value];
  const fallbackRule = { title: "", description: "" };
  setRule(rule ?? fallbackRule);
  // toast.success(rule?.title);
};

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
  description: `Seven: shuffle deck. Ace: assign new rule. Winner Determined: Highest Card Value.
  `,
  mode: LOW_KEY_GAME_MODE,
  handleWinner,
  handleNotification,
  defaultRules: [],
};

/* For Walkthrough Purposes Only */
export const WALKTHROUGH_GAME_MODE: GameMode = { ...LOW_KEY_GAME_MODE };

export const WALKTHROUGH_GAME_MODE_WITH_DESCRIPTION: IGameModeWithDescription =
  {
    title: "Walkthrough",
    about: "",
    description: "For educational purposes only.",
    mode: WALKTHROUGH_GAME_MODE,
    handleWinner,
    handleNotification,
    defaultRules: [],
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
  handleWinner,
  handleNotification,
  defaultRules: [],
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
    handleWinner,
    handleNotification,
    defaultRules: [],
  };

export const GAME_MODES_WITH_DESCRIPTION = [
  OUTDOORS_GAME_MODE_WITH_DESCRIPTION,
  LOW_KEY_GAME_MODE_WITH_DESCRIPTION,
  AT_THE_CLUB_GAME_MODE_WITH_DESCRIPTION,
];
