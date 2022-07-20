import { useTranslation } from "react-i18next";
import { CardValue } from "../interfaces/card.interface";
import {
  GameRules,
  IBaseRule,
  IExampleRule,
  IGameRulesWithDescription,
} from "../interfaces/rules.interface";
/* RULES */
export const halfAShot: IBaseRule = {
  title: "1/2 Shots",
  description: "Drink half a shot.",
};
export const fullShot: IBaseRule = {
  title: "1 Shots",
  description: "Drink a shot.",
};
export const threeKamikazeShots = {
  title: "3 Kamikaze Shots",
  description:
    "Chug 3 shots after one another. But what are the odds of a 2 winning, right? Rule cannot be reassinged.",
};
export const neverHaveIEver: IExampleRule = {
  title: "Never Have I Ever",
  description:
    "You say 'Never have I ever done something before'. If the others have done it, drink up.",
  example:
    "You say ie: 'Never Have I ever been arrested before.' Everyone who has been arrested, must drink.",
};

export const twoTruthsOneLie: IExampleRule = {
  title: "Two Truths 1 Lie",
  description:
    "You tell 3 statements, 2 truths, 1 lie. The others must guess which is the lie, you have to drink, if they are wrong, they have to drink.",
  example:
    "I have a dog. I have a cat. I can fly. If you guessed 'I have a cat', you are right. Cat people, pff.",
};

export const chugTheNextDrink: IBaseRule = {
  title: "Chug the next drink you see, in one go.",
  description: "Chug it. Chug it. Chug it!",
};
/* RULES */

/* GAME RULES */

/* For Walkthrough Purposes */
export const WALKTHROUGH_GAME_RULES: GameRules = {
  [CardValue.JACK]: fullShot,
  [CardValue.QUEEN]: neverHaveIEver,
  [CardValue.KING]: twoTruthsOneLie,
};
export const useWalkthroughGameRules = () => {
  const { t } = useTranslation();
  const WALKTHROUGH_GAME_RULES_WITH_DESCRIPTION: IGameRulesWithDescription = {
    title: t("gameRules.walkthrough.title"),
    about: t("gameRules.walkthrough.about"),
    description: t("gameRules.walkthrough.description"),
    rules: WALKTHROUGH_GAME_RULES,
  };
  return WALKTHROUGH_GAME_RULES_WITH_DESCRIPTION;
};
/* For Walkthrough Purposes */

export const BASIC_GAME_RULES: GameRules = {};
BASIC_GAME_RULES[CardValue.JACK] = halfAShot;
BASIC_GAME_RULES[CardValue.QUEEN] = neverHaveIEver;
BASIC_GAME_RULES[CardValue.KING] = fullShot;
BASIC_GAME_RULES[CardValue.TWO] = threeKamikazeShots;
// BASIC_GAME_RULES[CardValue.THREE] = halfAShot;
// BASIC_GAME_RULES[CardValue.FOUR] = neverHaveIEver;
// BASIC_GAME_RULES[CardValue.FIVE] = fullShot;
// BASIC_GAME_RULES[CardValue.SEVEN] = threeKamikazeShots;

export const useBasicGameRules = () => {
  const { t } = useTranslation();
  const BASIC_GAME_RULES_WITH_DESCRIPTION: IGameRulesWithDescription = {
    title: t("gameRules.basic.title"),
    about: t("gameRules.basic.about"),
    description: t("gameRules.basic.description"),
    rules: BASIC_GAME_RULES,
  };
  return BASIC_GAME_RULES_WITH_DESCRIPTION;
};

export const CRAZY_GAME_RULES: GameRules = {
  ...BASIC_GAME_RULES,
  [CardValue.THREE]: chugTheNextDrink,
};
export const useCrazyGameRules = () => {
  const { t } = useTranslation();
  const CRAZY_GAME_RULES_WITH_DESCRIPTION: IGameRulesWithDescription = {
    title: t("gameRules.crazy.title"),
    about: t("gameRules.crazy.about"),
    description: t("gameRules.crazy.description"),
    rules: CRAZY_GAME_RULES,
  };
  return CRAZY_GAME_RULES_WITH_DESCRIPTION;
};
export const ADVERSITY_RICH_GAME_RULES: GameRules = {
  ...BASIC_GAME_RULES,
};
export const useAdversityRichGameRules = () => {
  const { t } = useTranslation();
  const ADVERSITY_RICH_GAME_RULES_WITH_DESCRIPTION: IGameRulesWithDescription =
    {
      title: t("gameRules.adversity-rich.title"),
      about: t("gameRules.adversity-rich.about"),
      description: t("gameRules.adversity-rich.description"),
      rules: ADVERSITY_RICH_GAME_RULES,
    };
  return ADVERSITY_RICH_GAME_RULES_WITH_DESCRIPTION;
};
/* GAME RULES */

export const useGameRulesWithDescription = () => {
  const crazyGameRules = useCrazyGameRules();
  const basicGameRules = useBasicGameRules();
  const adversityRichGamrRules = useAdversityRichGameRules();
  return [crazyGameRules, basicGameRules, adversityRichGamrRules];
};
