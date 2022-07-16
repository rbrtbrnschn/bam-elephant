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
          <Route index element={<GamePage />} />
          <Route element={<HomePage />} path="/info" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
