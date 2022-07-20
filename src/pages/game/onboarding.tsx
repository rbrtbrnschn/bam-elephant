import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useEffect } from "react";
import { useTranslation } from "../../common/useTranslation";
import { useGameModesWithDescription } from "../../common/game-modes";
import { useGameRulesWithDescription } from "../../common/game-rules";
import { MyCard2 } from "../../components/card/card2";
import { MyFooter } from "../../components/footer/footer";
import { Info } from "../../components/info/info";
import { MyNavbar } from "../../components/navbar/navbar";
import { MyTable } from "../../components/table/table";
import { CardValue, cardValueToName } from "../../interfaces/card.interface";
import { IGameModeWithDescription } from "../../interfaces/game.interface";
import { IGameRulesWithDescription } from "../../interfaces/rules.interface";

interface IGameOnboardingProps {
  onSubmit: () => void;
  gameRules?: IGameRulesWithDescription;
  gameMode?: IGameModeWithDescription;
  ready2Submit: boolean;
  players: string[];
  setPlayers: (a: string[]) => void;
  addInput: () => void;
  deleteInput: () => void;
  setGameMode: (gameMode: IGameModeWithDescription) => void;
  setGameRules: (gameRules: IGameRulesWithDescription) => void;
}
export const GameOnboarding = ({
  onSubmit,
  addInput,
  deleteInput,
  gameMode,
  ready2Submit,
  gameRules,
  players: inputs,
  setPlayers: setInputs,
  setGameMode,
  setGameRules,
  ...props
}: IGameOnboardingProps) => {
  const hasRuleSelection = Object.keys(gameRules || {}).length;
  const hasGameModeSelection = Object.keys(gameMode || {}).length;
  const gameModes = useGameModesWithDescription();
  const allGameRules = useGameRulesWithDescription();
  const { t } = useTranslation();

  return (
    <div>
      <MyNavbar />
      <div className="relative py-8 px-4 mx-auto max-w-screen-xl  lg:py-16 lg:px-12">
        <form onSubmit={onSubmit}>
          <div className="relative z-0 mb-6 w-full group">
            <h2
              className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12 dark:text-white"
              id="rule-sets"
            >
              {t("game.onboarding.add-player", { count: 5 })}{" "}
            </h2>
            <input
              required
              className="hidden"
              readOnly
              value={gameRules ? "1" : ""}
            />
            <input
              required
              className="hidden"
              readOnly
              value={gameMode ? "1" : ""}
            />
            {inputs.map((input, index) => (
              <div
                key={"input-" + (index + 1)}
                className="relative z-0 mb-6 w-full group"
              >
                <input
                  type="text"
                  name={"player-" + index + 1}
                  id={"player-" + index + 1}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={input}
                  onChange={(e) => {
                    const newInputs = [...inputs];
                    newInputs[index] = e.currentTarget.value;
                    setInputs(newInputs);
                  }}
                  placeholder=" "
                  required={index <= 1}
                />
                <label
                  htmlFor={"player-" + index + 1}
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  {t("game.onboarding.name-player")} {index + 1}
                </label>
              </div>
            ))}
            <div className="flex gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addInput();
                }}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              >
                {t("game.onboarding.add-player")}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteInput();
                }}
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
              >
                {t("game.onboarding.remove-last-player")}
              </button>
            </div>
          </div>

          <h2
            className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12 dark:text-white"
            id="rule-sets"
          >
            {t("game.onboarding.headings.gameModes")}
            <Info
              className="ml-2 h-7 w-7"
              dataTip={t("game.onboarding.dataTips.gameModes")}
            />
          </h2>
          <div className="grid md:grid-cols-3 md:gap-6 gap-6 mb-6">
            {gameModes.map((gameModeWithDescription, i) => (
              <MyCard2
                title={gameModeWithDescription.title}
                description={gameModeWithDescription.description}
                imageUrl={
                  [
                    "/assets/beer-cocktail.png",
                    "/assets/pina-colada.png",
                    "/assets/sex-on-the-beach.png",
                  ][i]
                }
                c2a={t("game.onboarding.select")}
                isSelected={gameMode?.title === gameModeWithDescription.title}
                onClick={() => {
                  setGameMode(gameModeWithDescription);
                }}
                onKeyDown={(e) => {
                  e.key === "Enter" && setGameMode(gameModeWithDescription);
                }}
                disabled={i !== 1}
                {...(i === 1 && { tabIndex: 0, role: "button" })}
                key={"gameMode-" + (i + 1)}
              />
            ))}
          </div>

          <div className={!gameMode ? "hidden" : ""}>
            <h2 className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12 dark:text-white">
              {t("game.onboarding.headings.about")}:
            </h2>
            <p className="mb-6 font-normal text-gray-700 dark:text-gray-400">
              {/* {gameMode?.about} */}
              <MyTable
                head={[t("game.value"), t("game.rule")]}
                body={gameMode?.about || []}
              />
            </p>
          </div>

          <h2
            className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12 dark:text-white"
            id="rule-sets"
          >
            {t("game.onboarding.headings.gameRules")}
            <Info
              className="ml-2 h-7 w-7"
              dataTip={t("game.onboarding.dataTips.gameRules")}
            />
          </h2>
          <div className="grid md:grid-cols-3 md:gap-6 gap-6">
            {allGameRules.map((gameRuleWithDescription, i) => (
              <MyCard2
                title={gameRuleWithDescription.title}
                description={gameRuleWithDescription.description}
                imageUrl={
                  [
                    "/assets/soft-drink.png",
                    "/assets/coconut-drink.png",
                    "/assets/beer.png",
                  ][i]
                }
                c2a={t("game.onboarding.select")}
                isSelected={gameRules?.title === gameRuleWithDescription.title}
                onClick={() => {
                  setGameRules(gameRuleWithDescription);
                }}
                disabled={i !== 1}
                {...(i === 1 && { tabIndex: 0, role: "button" })}
                onKeyDown={(e) => {
                  e.key === "Enter" && setGameRules(gameRuleWithDescription);
                }}
                key={"gameRule-" + (i + 1)}
              />
            ))}
          </div>
          <div className="mt-6"></div>
          <div
            className={`transition ${hasRuleSelection ? "w-full" : "hidden"}`}
          >
            <h2
              className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12 dark:text-white"
              id="rule-sets"
            >
              {t("game.onboarding.headings.preview")}
            </h2>
            <div className="grid md:grid-cols-1 md:gap-6">
              <MyTable
                head={[t("game.value"), t("game.rule")]}
                body={Object.entries(gameRules?.rules || {}).map(
                  ([key, val]) => [cardValueToName(parseInt(key)), val]
                )}
                className="mb-6"
              />
            </div>
          </div>
          <button
            type="submit"
            className={`text-white font-bold py-2 px-4 border-b-4 rounded ${
              ready2Submit
                ? "bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500"
                : "bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500"
            }`}
            onClick={onSubmit}
          >
            {t("game.onboarding.submit")}
          </button>
        </form>
      </div>
      <MyFooter />
    </div>
  );
};
