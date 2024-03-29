import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { GamePage } from "./pages/game";
import { HomePage } from "./pages/home/home";
import { WalkthroughPage } from "./pages/walkthrough/walkthrough.page";
import { StepType, TourProvider } from "@reactour/tour";
import { RulesPage } from "./pages/rules/rules";
import { TOSPage } from "./pages/tos/tos";
import { PrivacyPage } from "./pages/privacy/privacy";
import { Redirect } from "./components/redirect/redirect";
import ScrollToTop from "./components/scroll2Top/scroll2Top";
function App() {
  const steps: StepType[] = [
    {
      selector: "button#draw-button",
      content: "Let's get started. Click to draw a round of cards.",
      stepInteraction: true,
    },
    {
      selector: "#cards-view",
      content: "Here is your draw. Now, KING is higher than JACK.",
    },
    {
      selector: "table.my-table",
      content:
        "Here you find all the rules, the actions you'll take or have others take when you win.",
    },
    {
      selector: "table.my-table tr#table-row3",
      content:
        "The KING is the higher card here. Now, now you do whatever the rule says.",
    },
    {
      selector: "button#draw-button",
      content: "Draw another round.",
      stepInteraction: true,
    },
    {
      selector: "#add-rule-modal",
      content:
        "A special card has been played. Whoever played the ACE must now assign a new rule to the lowest value card played that round.",
    },
    {
      selector: "#add-rule-input",
      content: "Set a new rule for the 9. Try: 'What are the odds?'",
    },
    {
      selector: "#add-rule-submit",
      content: "Alright, submit the rule.",
    },
    {
      selector: "html",
      content: "Okay, you got the hang of it. Have fun.",
      actionAfter: () => {
        window.location.href = "";
        window.location.pathname =
          "/redirect?to=/v1&title=Walkthrough%20completed!&description=Now%20off%20to%20the%20real%20thing&duration=3000";
      },
    },
    // ...
  ];
  return (
    <div className="App bg-white dark:bg-gray-900">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            path="/walk-through"
            element={
              // <TourProvider steps={steps}>
              <WalkthroughPage />
              // </TourProvider>
            }
          />
          <Route path="/guide" element={<RulesPage />} />
          <Route path="/tos" element={<TOSPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />

          <Route path="/redirect" element={<Redirect />} />
          <Route path="/v1" element={<GamePage />} />
          <Route path="*" element={<GamePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
