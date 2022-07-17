import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GAMEMODES, GameModes } from "../../common/game-modes";
import { Presets, PRESETS } from "../../common/presets";
import { RuleSets, RULE_SETS } from "../../common/rules";
import { MyCard2 } from "../../components/card/card2";
import { MyFooter } from "../../components/footer/footer";
import { MyNavbar } from "../../components/navbar/navbar";
import { MyTable } from "../../components/table/table";
import { CardValue, cardValueToName } from "../../interfaces/card.interface";
import { GameMode, GameRules } from "../../interfaces/game.interface";
import { useGameOnboarding } from "../../store/game.onboarding";

interface IGameOnboardingProps {
  onSubmit: () => void;
  ruleSet: GameRules;
  gameMode: GameMode;
  ready2Submit: boolean;
  players: string[];
  setPlayers: (a: string[]) => void;
  addInput: () => void;
  deleteInput: () => void;
  setGameMode: (gamemode: GameMode) => void;
  setRuleSet: (ruleSet: GameRules) => void;
}
export const GameOnboarding = ({
  onSubmit,
  addInput,
  deleteInput,
  gameMode,
  ready2Submit,
  ruleSet,
  players: inputs,
  setPlayers: setInputs,
  setGameMode,
  setRuleSet,
  ...props
}: IGameOnboardingProps) => {
  const hasRuleSelection = Object.keys(ruleSet || {}).length;
  const hasGameModeSelection = Object.keys(gameMode || {}).length;
  return (
    <div>
      <MyNavbar />
      <div className="relative py-8 px-4 mx-auto max-w-screen-xl  lg:py-16 lg:px-12">
        <form onSubmit={onSubmit}>
          <div className="relative z-0 mb-6 w-full group">
            <input required className="hidden" value={ruleSet ? "1" : ""} />
            <input required className="hidden" value={gameMode ? "1" : ""} />
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
                  Name Player {index + 1}
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
                Add Player
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteInput();
                }}
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
              >
                Remove Last Player
              </button>
            </div>
          </div>

          <h2
            className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12"
            id="rule-sets"
          >
            Game Modes
          </h2>
          <div className="grid md:grid-cols-3 md:gap-6 mb-6">
            <MyCard2
              title="Low-Key"
              description="Assign new Rules as fast as possible. Every face card gets you one step closer."
              imageUrl="/assets/sex-on-the-beach.png"
              c2a="Select"
              isSelected={gameMode === GAMEMODES.lowkey.gamemode}
              onClick={() => {
                setGameMode(GAMEMODES.lowkey.gamemode);
              }}
            />
            <MyCard2
              title="Outdoors"
              description="A low-key scenario, just sit down with your friends. Put on some good music. Have a good time."
              imageUrl="/assets/beer-cocktail.png"
              c2a="Select"
              isSelected={gameMode === "outdoors"}
              disabled
            />
            <MyCard2
              title="@ The club"
              description="A low-key scenario, just sit down with your friends. Put on some good music. Have a good time."
              imageUrl="/assets/pina-colada.png"
              c2a="Select"
              isSelected={gameMode === "atTheClub"}
              disabled
            />
          </div>
          {/* <div className={!hasGameModeSelection ? "hidden" : ""}>
            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">
              Sample
            </h3>
            <p className="mb-5 text-sm font-medium text-gray-500 dark:text-gray-300">
              Lorem Ipsum.
            </p>
          </div> */}
          <h2
            className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12"
            id="rule-sets"
          >
            Rule Sets
          </h2>
          <div className="grid md:grid-cols-3 md:gap-6">
            <MyCard2
              title="Basic"
              description="At this point I'm out of information."
              imageUrl="/assets/coconut-drink.png"
              c2a="Select"
              isSelected={ruleSet === RULE_SETS.basic.rules}
              onClick={() => {
                setRuleSet(RULE_SETS.basic.rules);
              }}
            />
            <MyCard2
              title="Crazy"
              description="Lorem Ipsum. I don't even know, how to describe it. That's how crazy it is."
              imageUrl="/assets/soft-drink.png"
              c2a="Select"
              isSelected={ruleSet === "crazy"}
              disabled
            />
            <MyCard2
              title="Adversity-rich"
              description="I'm just making up words as I go now."
              imageUrl="/assets/beer.png"
              c2a="Select"
              isSelected={ruleSet === "adversityRich"}
              disabled
            />
          </div>
          <div className="mt-6"></div>
          <div className={hasRuleSelection ? "w-full" : "hidden"}>
            <h2
              className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12"
              id="rule-sets"
            >
              Rule Set Preview
            </h2>
            <div className="grid md:grid-cols-1 md:gap-6">
              <MyTable
                head={["Card Value", "Rule"]}
                body={Object.entries(ruleSet || {}).map(([key, val]) => [
                  cardValueToName(parseInt(key)),
                  val,
                ])}
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
            Submit
          </button>
        </form>
      </div>
      <MyFooter />
    </div>
  );
};
