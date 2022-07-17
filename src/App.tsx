import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GamePage } from "./pages/game/game";
import { HomePage } from "./pages/home/home";
import { WalkthroughPage } from "./pages/walkthrough/walkthrough.page";
import { StepType, TourProvider } from "@reactour/tour";

function App() {
  const steps: StepType[] = [
    {
      selector: "table.my-table",
      content:
        "Here you find all the rules, the actions you'll take or have others take when you win.",
    },
    {
      selector: "button#draw-button",
      content:
        "Click here to draw another round of cards. Let's see who wins this round.",
    },
    {
      selector: "#cards-view",
      content:
        "Here is your draw. At the top, you should see who won this round. If anybody even did.",
    },
    {
      selector: "#add-rule-modal",
      content:
        "A special card has been played. Whoever played the ACE must now assign a new rule to the lowest value card.",
    },
    // ...
  ];
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            path="/walk-through"
            element={
              <TourProvider steps={steps}>
                <WalkthroughPage />
              </TourProvider>
            }
          />
          <Route path="/v1" element={<GamePage />} />
          <Route path="*" element={<GamePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
