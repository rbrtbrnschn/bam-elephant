import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { CardValue, ICard } from "../interfaces/card.interface";
import {
  GameMode,
  IGameInjections,
  IGameModeWithDescription,
  IGameState,
} from "../interfaces/game.interface";
import { fullShot, halfAShot, neverHaveIEver } from "./game-rules";

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
export const useLowKeyGameMode = () => {
  const { t } = useTranslation();
  const LOW_KEY_GAME_MODE_WITH_DESCRIPTION: IGameModeWithDescription = {
    title: t("gameModes.low-key.title"),
    about: t("gameModes.low-key.about"),
    description: t("gameModes.low-key.description"),
    mode: LOW_KEY_GAME_MODE,
    handleWinner,
    handleNotification,
    defaultRules: [halfAShot, fullShot, neverHaveIEver],
  };
  return LOW_KEY_GAME_MODE_WITH_DESCRIPTION;
};

/* For Walkthrough Purposes Only */
export const WALKTHROUGH_GAME_MODE: GameMode = { ...LOW_KEY_GAME_MODE };

export const useWalkthroughGameMode = () => {
  const { t } = useTranslation();
  const WALKTHROUGH_GAME_MODE_WITH_DESCRIPTION: IGameModeWithDescription = {
    title: t("gameModes.walkthrough.title"),
    about: t("gameModes.walkthrough.about"),
    description: t("gameModes.walkthrough.description"),
    mode: WALKTHROUGH_GAME_MODE,
    handleWinner,
    handleNotification,
    defaultRules: [halfAShot, fullShot, neverHaveIEver],
  };
  return WALKTHROUGH_GAME_MODE_WITH_DESCRIPTION;
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
export const useOutdoorsGameMode = () => {
  const { t } = useTranslation();
  const OUTDOORS_GAME_MODE_WITH_DESCRIPTION: IGameModeWithDescription = {
    title: t("gameModes.outdoors.title"),
    about: t("gameModes.outdoors.about"),
    description: t("gameModes.outdoors.description"),
    mode: OUTDOORS_GAME_MODE,
    handleWinner,
    handleNotification,
    defaultRules: [halfAShot, fullShot, neverHaveIEver],
  };
  return OUTDOORS_GAME_MODE_WITH_DESCRIPTION;
};

export const AT_THE_CLUB_GAME_MODE: GameMode = {
  ...OUTDOORS_GAME_MODE,
};
export const useAtTheClubGameMode = () => {
  const { t } = useTranslation();
  const At_THE_CLUB_GAME_MODE_WITH_DESCRIPTION: IGameModeWithDescription = {
    title: t("gameModes.atTheClub.title"),
    about: t("gameModes.atTheClub.about"),
    description: t("gameModes.atTheClub.description"),
    mode: AT_THE_CLUB_GAME_MODE,
    handleWinner,
    handleNotification,
    defaultRules: [halfAShot, fullShot, neverHaveIEver],
  };
  return At_THE_CLUB_GAME_MODE_WITH_DESCRIPTION;
};

export const useGameModesWithDescription = (): IGameModeWithDescription[] => {
  const OUTDOORS_GAME_MODE_WITH_DESCRIPTION = useOutdoorsGameMode();
  const LOW_KEY_GAME_MODE_WITH_DESCRIPTION = useLowKeyGameMode();
  const AT_THE_CLUB_GAME_MODE_WITH_DESCRIPTION = useAtTheClubGameMode();
  return [
    OUTDOORS_GAME_MODE_WITH_DESCRIPTION,
    LOW_KEY_GAME_MODE_WITH_DESCRIPTION,
    AT_THE_CLUB_GAME_MODE_WITH_DESCRIPTION,
  ];
};
