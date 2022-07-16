import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useStoreActions, useStoreState } from "./store";

function App() {
  const STANDARD__DECK = [1, 3, 4, 2, 7, 5];
  const [deck, setDeck] = useState([...STANDARD__DECK]);
  const [drawnCards, setDrawnCards] = useState<number[]>([]);
  const [rule, setRule] = useState("");
  const drawCards = () => {
    const newDeck = [...deck];
    const newDrawnCards = new Array(2)
      .fill(0)
      .map((_, i) => newDeck.shift())
      .filter((e) => e) as number[];
    setDrawnCards(newDrawnCards);
    setDeck([...newDeck]);
  };

  useEffect(() => {
    if (!drawnCards.length) return setRule("");
    const winner =
      drawnCards[0] > drawnCards[1] ? drawnCards[0] : drawnCards[1];

    if (winner % 3 === 0) return setRule("Never Have I Ever");
    if (winner % 2 === 0) return setRule("1 Shot");

    setRule("You got lucky");
  }, [drawnCards]);

  useEffect(() => {
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((res) => res.json())
      .then((data) =>
        fetch(
          `https://www.deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=52`
        )
      )
      .then((res) => res.json())
      .then((data) => console.log(data, JSON.stringify(data)));
  }, []);
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
            <div key={i}>
              Card#{i + 1}: {c}
            </div>
          ))}
        </a>
        <button onClick={() => drawCards()}>Draw</button>
      </header>
    </div>
  );
}

export default App;
