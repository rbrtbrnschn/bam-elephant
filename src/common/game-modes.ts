import { useTranslation } from "../common/useTranslation";
import { toast } from "react-toastify";
import { CardValue, ICard } from "../interfaces/card.interface";
import {
  GameMode,
  IGameInjections,
  IGameModeWithDescription,
  IGameState,
} from "../interfaces/game.interface";
import { IBaseRule, IWarningRule } from "../interfaces/rules.interface";
import { LOW_KEY_STANDARD_DECK } from "./cards";
import {
  fullShot,
  halfAShot,
  neverHaveIEver,
  threeKamikazeShots,
} from "./game-rules";

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
  if (sorted?.length < 2) return [null, null];

  const higher = sorted[sorted.length - 1];
  const lower = sorted[0];

  return [higher, lower];
};

const handleLowKeyWinner = ({ state }: { state: IGameState }) => {
  const sorted = [...state.drawnCards].sort(sortCardsByValue);
  const cardValues = sorted.map((c) => c.value);
  const uniqueCardValues = new Set(cardValues);

  const deltaSetLength = Math.abs(sorted.length - uniqueCardValues.size);
  const allDraw = sorted.length === deltaSetLength + 1;

  if (allDraw) return [null, null];
  if (sorted?.length < 2) return [null, null];

  const higher = sorted[sorted.length - 1];
  const lower = sorted[0];

  // Bam Elephant reverse winner and loser allows for a 2 to win
  if (higher?.value === CardValue.ELEPHANT) return [lower, higher];
  return [higher, lower];
};

const handleNotification = ({
  state,
  actions,
  helpers,
  ...rest
}: IGameInjections) => {
  const { winner } = helpers;
  const { setRule } = actions;
  if (!state.drawnCards.length)
    return setRule({ title: "", description: "no cards drawn" });
  if (!winner) {
    // toast.error("It's a draw.");
    return setRule({
      title: "It's a draw.",
      description: "Nothing happens",
      isWarning: true,
    } as IWarningRule);
  }

  const rule = state.gameRules.rules[winner.value];
  const fallbackRule = {
    title: "",
    description: "fallback handleNotification",
  };
  setRule(rule ?? fallbackRule);
  // toast.success(rule?.title);
  try {
    state.gameMode.mode[winner.value]?.({ state, actions, helpers, ...rest });
  } catch (e) {
    console.error(e);
  }
};
export const LOW_KEY_GAME_MODE: GameMode = {
  [CardValue.SEVEN]: (options) => {
    options.thunks.shuffle();
    options.actions.setRule({
      title: "Shuffling Cards.",
      description: "You should not have needed more information about this.",
      isWarning: true,
    } as IWarningRule);
  },
  [CardValue.ACE]: ({ actions, helpers, state }) => {
    // Not allow reassinging #2
    const TWO_HAS_RULE =
      state.gameRules.rules?.[2]?.description ===
      threeKamikazeShots.description;
    const LOSER_IS_TWO = helpers.loser?.value === CardValue.TWO;
    if (TWO_HAS_RULE && LOSER_IS_TWO) {
      //@TODO dont like doing this via rules
      actions.setRule({
        title: "Cannot Reassign Card!",
        description: "I don't make the game rules.",
        isWarning: true,
      } as IWarningRule);

      return;
    }
    const HAS_BEEN_ELEPHANT = state.drawnCards.some(
      (c) => c.value === CardValue.ELEPHANT
    );
    if (HAS_BEEN_ELEPHANT) {
      actions.setRule({
        title: "Cannot Reassign Card!",
        description: "I don't make the game rules.",
        isWarning: true,
      } as IWarningRule);
      return;
    }

    actions.toggleModal();
  },
  [CardValue.ELEPHANT]: (options) => {
    // reverse winner loser mechanic
  },
};
export const useLowKeyGameMode = () => {
  const { t } = useTranslation();
  const LOW_KEY_GAME_MODE_WITH_DESCRIPTION: IGameModeWithDescription = {
    title: t("gameModes.low-key.title"),
    about: t("gameModes.low-key.about") as unknown as [string, IBaseRule][],
    description: t("gameModes.low-key.description"),
    mode: LOW_KEY_GAME_MODE,
    handleWinner: handleLowKeyWinner,
    handleNotification,
    defaultRules: [halfAShot, fullShot, neverHaveIEver],
    deck: [...LOW_KEY_STANDARD_DECK],
  };
  return LOW_KEY_GAME_MODE_WITH_DESCRIPTION;
};

/* For Walkthrough Purposes Only */
export const WALKTHROUGH_GAME_MODE: GameMode = { ...LOW_KEY_GAME_MODE };

export const useWalkthroughGameMode = () => {
  const { t } = useTranslation();
  const WALKTHROUGH_GAME_MODE_WITH_DESCRIPTION: IGameModeWithDescription = {
    title: t("gameModes.walkthrough.title"),
    about: t("gameModes.walkthrough.about") as unknown as [string, IBaseRule][],
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
    about: t("gameModes.outdoors.about") as unknown as [string, IBaseRule][],
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
    about: t("gameModes.atTheClub.about") as unknown as [string, IBaseRule][],
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
