import { StepType, TourProvider, useTour } from "@reactour/tour";
import { useEffect, useRef, useState } from "react";
import ReactJoyride, { Step } from "react-joyride";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { MyBanner } from "../../components/banner/banner";
import { MyCard } from "../../components/card/card";
import { AddRuleModal } from "../../components/modal/add-rule.modal";
import { MyTable } from "../../components/table/table";
import {
  CardValue,
  cardValueToName,
  ICard,
} from "../../interfaces/card.interface";
import { useGameState } from "../../store/game";
import Joyride from "react-joyride";
import { WALKTHROUGH_GAME_MODE_WITH_DESCRIPTION } from "../../common/game-modes";
import {
  WALKTHROUGH_GAME_RULES,
  WALKTHROUGH_GAME_RULES_WITH_DESCRIPTION,
} from "../../common/game-rules";

export const WalkthroughPage = () => {
  const { setIsOpen, isOpen } = useTour();
  const navigate = useNavigate();
  const [playerCount, setPlayerCount] = useState(2);

  const { state, actions, helpers, thunks } = useGameState({
    playerCount,
    gameMode: WALKTHROUGH_GAME_MODE_WITH_DESCRIPTION,
    gameRules: WALKTHROUGH_GAME_RULES_WITH_DESCRIPTION,
  });
  const {
    deck,
    drawnCards,
    modalIsOpen,
    newRule,
    rule,
    gameRules,
    disposedCards,
  } = state;
  const { setDeck, setDrawnCards, setNewRule, setRules, toggleModal, setRule } =
    actions;
  const { hasEnded, hasStarted, winner, loser } = helpers;
  const { restart } = thunks;

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [drawnCards]);

  const drawCards = (givenCards?: ICard[]) => {
    if (givenCards)
      return setDrawnCards(givenCards.map((c) => ({ ...c, isUndo: true })));

    const newDeck = [...deck];
    const newDrawnCards = new Array(playerCount)
      .fill(0)
      .map((_, i) => newDeck.shift())
      .filter((e) => e) as ICard[];
    setDrawnCards(newDrawnCards);
    setDeck([...newDeck]);
  };

  const undo = () => {
    const previouslyDiscardedCards = [...state.disposedCards].slice(
      0,
      playerCount
    );
    setDeck([...state.drawnCards, ...state.deck]);
    drawCards(previouslyDiscardedCards);
  };
  const drawButtonRef = useRef<HTMLButtonElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [steps, setSteps] = useState<Array<Step>>([
    {
      content: <div>Click here to draw cards for each player.</div>,
      disableOverlayClose: true,
      placementBeacon: "top",
      spotlightClicks: false,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      title: "Let's get started.",
      target: "button#draw-button",
      showProgress: true,
    },
    {
      spotlightClicks: false,
      target: "#cards-view",
      content:
        "Now remember, KING is higher than JACK. JACK higher than 10, and so on.",
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      title: "Here is your draw.",
    },
    {
      spotlightClicks: false,
      target: "table.my-table",
      content:
        "Here you find all the rules, the actions you'll take or have others take when you win.",
    },
    {
      target: "table.my-table tr#table-row3",
      spotlightClicks: false,
      content:
        "The KING is the higher card here. Now, now you do whatever the rule says.",
    },
    {
      target: "button#draw-button",
      content: "Draw another round.",
      spotlightClicks: false,
    },
    {
      target: "#add-rule-modal",
      styles: {
        options: {
          zIndex: 10000,
        },
      },

      content:
        "A special card has been played. Whoever played the ACE must now assign a new rule to the lowest value card played that round.",
    },
    {
      target: "#add-rule-input",
      spotlightClicks: false,
      content: "Set a new rule for the 9. Try: 'What are the odds?'",
    },
    {
      target: "#add-rule-submit",
      content: "Alright, submit the rule.",
      spotlightClicks: false,
    },
    {
      target: "html",
      spotlightClicks: false,
      content: "Okay, you got the hang of it. Have fun.",
    },
  ]);
  const [run, setRun] = useState(true);
  return (
    <div className="relative">
      {/* <Joyride
        steps={steps}
        continuous
        run={true}
        showProgress
        callback={(data) => {
          console.log(data.index, data.status);
          if (
            !drawnCards.length &&
            data.index === 1 &&
            data.status === "running"
          ) {
            drawButtonRef.current?.click();
          } else if (data.index === 5 && data.status === "running") {
            drawButtonRef.current?.click();
          }
        }}
      /> */}
      <AddRuleModal
        ref={modalRef}
        card={loser as ICard}
        onClose={toggleModal}
        onSuccess={(rule: string) => {
          setRules({
            ...gameRules,
            rules: {
              ...gameRules.rules,
              [(loser as ICard)?.value]: { title: rule, description: "Custom" },
            },
          });
        }}
        placeholder={gameRules.rules[(loser as ICard)?.value]?.title}
        className={!modalIsOpen ? "hidden" : ""}
      />
      <div className="h-0">
        {rule && (
          <MyBanner
            title={rule}
            onClose={() => {
              setRule("");
            }}
          />
        )}
      </div>

      <div className="container mx-auto px-4">
        <div
          id="cards-view"
          className="w-full flex justify-center items-center gap-10"
          style={{ minHeight: "500px" }}
        >
          {drawnCards.map((c, i) => (
            <div
              {...(gameRules.rules[c.value]?.title?.length && {
                "data-tip": "Rule: " + gameRules.rules[c.value]?.title,
              })}
              data-for="main"
              key={"container-card#" + i}
              id={"image-wrapper" + (i + 1)}
              // ref={i === 0 ? image1Ref : image2Ref}
            >
              <MyCard
                key={"card#" + i}
                imageUrl={c.images?.png}
                title={c.code + ""}
              />
            </div>
          ))}
        </div>
        <div className="full-w flex items-center justify-center gap-4">
          {!hasEnded && (
            <button
              id="draw-button"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              ref={drawButtonRef}
              onClick={() => {
                drawCards();
              }}
            >
              Draw
            </button>
          )}
          {drawnCards.length && !isOpen && (
            <button
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
              onClick={() => {
                navigate("/v1");
              }}
            >
              Leave Demo.
            </button>
          )}
          {hasEnded && (
            <button
              className="bg-green-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
              onClick={restart}
            >
              Renew
            </button>
          )}
          {!hasEnded && disposedCards.length ? (
            <button
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
              onClick={() => {
                undo();
              }}
            >
              Undo
            </button>
          ) : null}
        </div>

        {modalIsOpen && (
          <div>
            <input
              value={newRule}
              placeholder={`Assign ${cardValueToName(
                loser?.value as CardValue
              )} a new rule`}
              onChange={(e) => {
                setNewRule(e.currentTarget.value);
              }}
            />
            <button
              type="submit"
              onClick={() => {
                const newGameRules = { ...gameRules };
                if (loser?.code.length) {
                  newGameRules.rules[loser.value] = {
                    title: newRule,
                    description: "",
                  };
                }
                setRules(newGameRules);
                setNewRule("");
                toggleModal();
              }}
            >
              Submit
            </button>
          </div>
        )}
        <MyTable
          head={["Value", "Rule"]}
          body={Object.entries(gameRules.rules).map(([key, value], index) => {
            return [
              cardValueToName(parseInt(key) as unknown as CardValue),
              value,
            ];
          })}
          winner={winner as ICard}
        />
      </div>
    </div>
  );
};
