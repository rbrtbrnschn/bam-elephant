import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useStoreActions, useStoreState } from "./store";
import { STANDARD_DECK } from "./common/cards";
import { CardValue, ICard } from "./interfaces/card.interface";
import { DEFAULT_RULES } from "./common/rules";

function App() {
  const [deck, setDeck] = useState([...STANDARD_DECK]);
  const [drawnCards, setDrawnCards] = useState<ICard[]>([]);
  const [rule, setRule] = useState("");
  const [rules, setRules] = useState<Partial<Record<CardValue, string>>>({
    ...DEFAULT_RULES,
  });
  const [newRule, setNewRule] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = (boo?: boolean) =>
    setModalIsOpen((isOpen) => boo ?? !isOpen);

  /* HELPERS */
  const hasStarted = useMemo(
    () => deck.length && drawnCards.length,
    [drawnCards.length, deck.length]
  );
  const hasEnded = useMemo(() => !deck.length, [deck.length]);

  /* HELPERS */

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
    setDeck([...STANDARD_DECK]);
    setDrawnCards([]);
    setRule("");
  };
  const winner = useMemo<ICard | null>(
    () =>
      drawnCards.length
        ? drawnCards?.[0].value > drawnCards?.[1].value
          ? drawnCards[0]
          : drawnCards[1]
        : null,

    [drawnCards]
  );
  const loser = useMemo<ICard | null>(
    () => drawnCards.find((c) => c.code !== winner?.code) || null,
    [drawnCards, winner]
  );
  useEffect(() => {
    if (!drawnCards.length) return setRule("");
    if (!winner) return;

    if (winner.value === CardValue.ACE) {
      toggleModal();
    } else {
      const rule = rules[winner.value];
      const fallback = "You got lucky";
      setRule(rule ?? fallback);
    }
  }, [drawnCards.length, rules, winner]);

  // useEffect(() => {
  //   fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  //     .then((res) => res.json())
  //     .then((data) =>
  //       fetch(
  //         `https://www.deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=52`
  //       )
  //     )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data, JSON.stringify(data)));
  // }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>{rule}</code>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
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
        </a>
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
                setModalIsOpen(false);
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
