import React, { useEffect } from "react";
import "./App.css";
import { STANDARD_DECK } from "./common/cards";
import { CardValue, ICard } from "./interfaces/card.interface";
import { useGameState } from "./store";
import { MyCard } from "./components/card/card";
import { MyBanner } from "./components/banner/banner";

function App() {
  const { state, actions, helpers } = useGameState();
  const { deck, drawnCards, modalIsOpen, newRule, rule, rules } = state;
  const { setDeck, setDrawnCards, setNewRule, setRules, toggleModal, setRule } =
    actions;
  const { hasEnded, hasStarted, winner, loser } = helpers;

  const drawCards = () => {
    const newDeck = [...deck];
    const newDrawnCards = new Array(2)
      .fill(0)
      .map((_, i) => newDeck.shift())
      .filter((e) => e) as ICard[];
    setDrawnCards(newDrawnCards);
    setDeck([...newDeck]);
  };
  const renewStack = () => {
    setDeck([...STANDARD_DECK].sort(() => 0.5 - Math.random()));
    setDrawnCards([]);
  };

  useEffect(() => {
    if (winner?.value === CardValue.ACE) {
      toggleModal();
    }
  }, [winner]);

  return (
    <div className="App">
      {rule && (
        <MyBanner
          title={rule}
          onClose={() => {
            setRule("");
          }}
        />
      )}

      <div className="container mx-auto px-4">
        <div
          className="w-full flex justify-center items-center gap-10"
          style={{ minHeight: "500px" }}
        >
          {drawnCards.map((c, i) => (
            <MyCard imageUrl={c.images?.png} title={c.code + ""} />
          ))}
        </div>
        <div className="full-w flex items-center justify-center">
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
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={renewStack}
            >
              Renew
            </button>
          )}
        </div>

        {modalIsOpen && (
          <div>
            <input
              value={newRule}
              placeholder={`Assign ${loser?.value} a new rule`}
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
      </div>
    </div>
  );
}

export default App;
