import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useStoreActions, useStoreState } from "./store";
import { STANDARD_DECK } from "./common/deck";
import { CardValue, ICard } from "./interfaces/card.interface";

function App() {
  const [deck, setDeck] = useState([...STANDARD_DECK]);
  const [drawnCards, setDrawnCards] = useState<ICard[]>([]);
  const [rule, setRule] = useState("");

  const hasStarted = useMemo(
    () => deck.length && drawnCards.length,
    [drawnCards.length, deck.length]
  );
  const hasEnded = useMemo(() => !deck.length, [deck.length]);

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

    [drawCards]
  );
  useEffect(() => {
    if (!drawnCards.length) return setRule("");
    if (!winner) return;

    if (winner.value === CardValue.ACE) return setRule("Slap Bet");
    if (winner.value === CardValue.KING) return setRule("1 Shot");
    if (winner.value === CardValue.QUEEN) return setRule("Never Have I Ever");
    if (winner.value === CardValue.JACK) return setRule("1/2 Shot");
    setRule("You got lucky");
  }, [drawnCards]);

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
      </header>
    </div>
  );
}

export default App;
