import React, { useEffect, useState } from "react";
import "./App.css";
import { STANDARD_DECK } from "./common/cards";
import { CardValue, cardValueToName, ICard } from "./interfaces/card.interface";
import { useGameState, WinnerCallbacks } from "./store";
import { MyCard } from "./components/card/card";
import { MyBanner } from "./components/banner/banner";
import { MyTable } from "./components/table/table";
import { toast } from "react-toastify";

function App() {
  const [playerCount, setPlayerCount] = useState(2);
  //@TODO refactor to common
  const winnerCallbacks: WinnerCallbacks = {
    [CardValue.ACE]: (options) => {
      toggleModal();
    },
  };
  const { state, actions, helpers, thunks } = useGameState({
    playerCount,
    winnerCallbacks,
  });
  const { deck, drawnCards, modalIsOpen, newRule, rule, rules, disposedCards } =
    state;
  const { setDeck, setDrawnCards, setNewRule, setRules, toggleModal, setRule } =
    actions;
  const { hasEnded, hasStarted, winner, loser } = helpers;
  const { shuffle, restart } = thunks;
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
  const renewStack = () => {
    setDeck([...STANDARD_DECK].sort(() => 0.5 - Math.random()));
    setDrawnCards([]);
  };

  // useEffect(() => {
  //   if (winner?.value === CardValue.ACE) {
  //     toggleModal();
  //   }
  // }, [winner]);

  return (
    <div className="App">
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
          className="w-full flex justify-center items-center gap-10"
          style={{ minHeight: "500px" }}
        >
          {drawnCards.map((c, i) => (
            <MyCard
              key={"card#" + i}
              imageUrl={c.images?.png}
              title={c.code + ""}
            />
          ))}
        </div>
        <div className="full-w flex items-center justify-center gap-4">
          {!hasEnded && (
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => drawCards()}
            >
              Draw
            </button>
          )}
          {hasEnded && (
            <button
              className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
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
                const newRules = { ...rules };
                if (loser?.code.length) {
                  newRules[loser.value] = newRule;
                }
                setRules(newRules);
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
          body={Object.entries(rules).map(([key, value], index) => {
            return [
              cardValueToName(parseInt(key) as unknown as CardValue),
              value,
            ];
          })}
        />
      </div>
    </div>
  );
}

export default App;
