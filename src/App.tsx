import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GamePage } from "./pages/game/game";
import { HomePage } from "./pages/home/home";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/v1" element={<GamePage />} />
          <Route path="*" element={<GamePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
