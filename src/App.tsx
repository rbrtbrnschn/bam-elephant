import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { STANDARD_DECK } from "./common/cards";
import { CardValue, ICard } from "./interfaces/card.interface";
import { useGameState } from "./store";

function App() {
  const { state, actions, helpers } = useGameState();
  const { deck, drawnCards, modalIsOpen, newRule, rule, rules } = state;
  const { setDeck, setDrawnCards, setNewRule, setRules, toggleModal } = actions;
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
      <header className="App-header">
        <p>
          <code>{rule}</code>
        </p>
        <div className="cards">
          {drawnCards.map((c, i) => (
            <div key={i} style={{ display: "inline-block" }}>
              <div>
                Card#{i + 1}: {c.code}
              </div>
              <img
                src={c.images?.png}
                className={`card ${winner?.code === c.code ? "--winner" : ""}`}
                alt={c.code}
              />
            </div>
          ))}
        </div>

        {!hasEnded && <button onClick={() => drawCards()}>Draw</button>}
        {hasEnded && <button onClick={renewStack}>Renew</button>}

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
      </header>
    </div>
  );
}

export default App;
