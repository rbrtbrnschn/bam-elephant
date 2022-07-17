import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GameModes } from "../../common/game-modes";
import { Presets, PRESETS } from "../../common/presets";
import { RuleSets } from "../../common/rules";
import { MyCard2 } from "../../components/card/card2";
import { MyFooter } from "../../components/footer/footer";
import { MyNavbar } from "../../components/navbar/navbar";
import { useGameOnboarding } from "../../store/game.onboarding";

export const GameOnboarding = () => {
  const { state, actions } = useGameOnboarding();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<string[]>(["", ""]);
  const [ruleSet, setRuleSet] = useState<RuleSets>();
  const [gameMode, setGameMode] = useState<GameModes>();
  const ready2Submit = useMemo(
    () =>
      [inputs.length >= 2, ruleSet?.length, gameMode?.length].every(Boolean),
    [inputs, ruleSet, gameMode]
  );
  const addInput = () => {
    setInputs((oldInputs) => [...oldInputs, ""]);
  };
  const deleteInput = () => {
    const newInputs = [...inputs];
    if (newInputs.length <= 2) return;
    newInputs.pop();
    setInputs(newInputs);
  };

  const onSubmit = () => {
    if (!gameMode)
      return toast.error("Missing Game Mode. Please Select One first.");
    if (!ruleSet)
      return toast.error("Missing Rule Set. Please Select One first.");

    navigate(
      encodeURIComponent(
        `/v1?players=${inputs.join(
          ","
        )}&game-mode=${gameMode}&rule-set=${ruleSet}`
      )
    );
  };

  return (
    <div>
      <MyNavbar />
      <div className="relative py-8 px-4 mx-auto max-w-screen-xl  lg:py-16 lg:px-12">
        <form onSubmit={onSubmit}>
          <div className="relative z-0 mb-6 w-full group">
            <input required className="hidden" value={ruleSet} />
            <input required className="hidden" value={gameMode} />
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
              isSelected={gameMode === "lowkey"}
              onClick={() => {
                setGameMode("lowkey");
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
              isSelected={ruleSet === "basic"}
              onClick={() => {
                setRuleSet("basic");
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
          <button
            type="submit"
            className={`bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded ${
              ready2Submit
                ? "bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500"
                : ""
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
