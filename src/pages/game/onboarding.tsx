import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "../../common/useTranslation";
import { useGameModesWithDescription } from "../../common/game-modes";
import { useGameRulesWithDescription } from "../../common/game-rules";
import { IMyCard2Props, MyCard2 } from "../../components/card/card2";
import { MyFooter } from "../../components/footer/footer";
import { Info } from "../../components/info/info";
import { MyNavbar } from "../../components/navbar/navbar";
import { MyTable } from "../../components/table/table";
import { CardValue, cardValueToName } from "../../interfaces/card.interface";
import { IGameModeWithDescription } from "../../interfaces/game.interface";
import {
  IBaseRule,
  IGameRulesWithDescription,
} from "../../interfaces/rules.interface";
import { Input } from "../../components/input/input";
import { useStorage } from "../../utils/useStorage";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { Modal } from "../../components/modal/modal";
import { MyCard } from "../../components/card/card";
import { Input2 } from "../../components/input/input2";
import { Table } from "../../components/table/_table";
import { useCustomRules } from "../../store/useCustomRules.hook";

interface IGameOnboardingProps {
  onSubmit: (e?: any) => void;
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
  const { setLocalStorage, getLocaleStorage } = useStorage(localStorage);

  const [showCustomRuleModal, setShowCustomRuleModal] = useState(false);
  const [showCustomRules, setShowCustomRules] = useState(false);

  const [newRule, setNewRule] = useState<IBaseRule>({
    title: "",
    description: "",
  });
  const { customRules, setCustomRules } = useCustomRules();
  // const [customRules, setCustomRules] = useState<Array<IBaseRule>>(
  //   JSON.parse(getLocaleStorage("game.custom-rules") || "[]")
  // );

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [customRules, showCustomRuleModal]);

  const addons: IMyCard2Props[] = [
    {
      imageUrl: "/assets/elephant.png",
      c2a: "Add",
      description:
        "Add custom rule. These may be used when assigning new rules in each of the gamemodes.",
      title: "Custom Rule",
      onClick: (e) => {
        setShowCustomRuleModal(true);
      },
    },
    {
      imageUrl: "/assets/elephant.png",
      c2a: "Show",
      description: "List all custom rules. Here you may delete them too.",
      title: "Show Custom Rules",
      onClick: (e) => {
        setShowCustomRules(true);
      },
    },
  ];
  return (
    <div>
      <MyNavbar />
      {showCustomRules && (
        <Modal onClose={() => setShowCustomRules(false)}>
          <button
            type="button"
            className="transition absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="authentication-modal"
            onClick={() => {
              setShowCustomRuleModal(false);
            }}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span
              className="sr-only"
              onClick={() => {
                setShowCustomRules(false);
              }}
            >
              Close modal
            </span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Custom Rules
            </h3>
            {customRules.length ? (
              <Table
                head={["Rule", "Delete"]}
                body={customRules.map((r) => [
                  <span className="flex justify-start gap-2">
                    {r.title} <Info dataTip={r.description} />
                  </span>,
                  <button
                    className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                    onClick={() => {
                      const newRules = [...customRules].filter((cr) => {
                        console.log("compare", cr, r);
                        return cr.title !== r.title;
                      });
                      setCustomRules(newRules);
                    }}
                  >
                    Delete
                  </button>,
                ])}
              />
            ) : (
              <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                No custom rules yet.
              </div>
            )}
          </div>
        </Modal>
      )}
      {showCustomRuleModal && (
        <Modal
          onClose={() => {
            setShowCustomRuleModal(false);
          }}
        >
          <button
            type="button"
            className="transition absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="authentication-modal"
            onClick={() => {
              setShowCustomRuleModal(false);
            }}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Add Custom Rule
            </h3>
            <div className="flex justify-center align-center pb-2"></div>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("jih");
                //add-custom-rule-submit
                // if (e.currentTarget.id === "input-title") {
                //   return;
                // }
                const rules = getLocaleStorage("game.custom-rules") || "[]";
                const parsed = JSON.parse(rules) as IBaseRule[];
                const newRules = [...parsed, { ...newRule }];
                setCustomRules([...newRules]);

                toast.success(`Saved rule: '${newRule.title}'`);
                setLocalStorage("game.custom-rules", JSON.stringify(newRules));
                setNewRule({ description: "", title: "" });
                setShowCustomRuleModal(false);
              }}
            >
              <Input2
                name="title"
                id="input-title"
                value={newRule.title}
                placeholder={"Title"}
                title={"Rule Title"}
                onChange={(e) => {
                  setNewRule((rule) => ({
                    ...newRule,
                    title: e.target.value,
                  }));
                }}
                required
              />
              <Input2
                name="description"
                id="input-description"
                value={newRule.description}
                placeholder={"Description"}
                title="Rule Description"
                onChange={(e) => {
                  setNewRule((rule) => ({
                    ...newRule,
                    description: e.target.value,
                  }));
                }}
                required
              />

              <button
                type="submit"
                id="add-custom-rule-submit"
                className="transition w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                // onClick={(e) => {
                //   // e.preventDefault();
                //   const rules = getLocaleStorage("game.custom-rules") || "[]";
                //   const parsed = JSON.parse(rules) as IBaseRule[];
                //   const newRules = [...parsed, { ...newRule }];
                //   setCustomRules([...newRules]);

                //   toast.success(`Saved rule: '${newRule.title}'`);
                //   setLocalStorage(
                //     "game.custom-rules",
                //     JSON.stringify(newRules)
                //   );
                //   setNewRule({ description: "", title: "" });
                //   setShowNewRuleSection(false);
                // }}
                onSubmit={() => {
                  console.log("ran submit");
                }}
              >
                Submit
              </button>
              <div className="transition text-sm font-medium text-gray-500 dark:text-gray-300">
                {t("game.add-rule-modal.skip.prefix")}.{" "}
                <button
                  className="text-blue-700 hover:underline dark:text-blue-500"
                  onClick={() => {
                    setShowCustomRuleModal(false);
                  }}
                >
                  {t("game.add-rule-modal.skip.c2c")}.
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      <div className="relative py-8 px-4 mx-auto max-w-screen-xl  lg:py-16 lg:px-12">
        <form onSubmit={onSubmit} className="mb-6">
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
            {t("game.onboarding.headings.gameModes")}*
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
            {t("game.onboarding.headings.gameRules")}*
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
          <div className="mt-6"></div>
          {ready2Submit ? (
            <>
              <h2
                className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12 dark:text-white"
                id="rule-sets"
              >
                Addons
              </h2>
              <div className="grid md:grid-cols-3 md:gap-6 gap-6">
                {addons.map((a) => (
                  <MyCard2 tabIndex={0} {...a} />
                ))}
              </div>
              <div className="mt-6"></div>
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
              </button>{" "}
            </>
          ) : (
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
            >
              {t("game.onboarding.submit")}
            </button>
          )}
        </form>
      </div>

      <MyFooter />
    </div>
  );
};
// wow this is the longest file I've ever written.
