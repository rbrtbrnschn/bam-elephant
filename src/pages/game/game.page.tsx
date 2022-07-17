import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IGameModeWithDescription } from "../../interfaces/game.interface";
import { Game } from "./game";
import { GameOnboarding } from "./onboarding";
import { useGameRedirect } from "../home/redirect.hook";
import ReactTooltip from "react-tooltip";
import { IGameRulesWithDescription } from "../../interfaces/rules.interface";

export const GamePage = () => {
  useGameRedirect();
  const [needsOnboarding, setNeedsOnboarding] = useState(true);
  const [players, setPlayers] = useState<string[]>(["", ""]);
  const [gameRules, setGameRules] = useState<IGameRulesWithDescription>();
  const [gameMode, setGameMode] = useState<IGameModeWithDescription>();

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [players, gameRules, gameMode]);

  const ready2Submit = useMemo(
    () =>
      [
        players.length >= 2,
        players.every((e) => e.length),
        gameRules,
        gameMode,
      ].every(Boolean),
    [players, gameRules, gameMode]
  );
  const addInput = () => {
    setPlayers((oldInputs) => [...oldInputs, ""]);
  };
  const deleteInput = () => {
    const newInputs = [...players];
    if (newInputs.length <= 2) return;
    newInputs.pop();
    setPlayers(newInputs);
  };

  const onSubmit = () => {
    if (!Object.keys(gameMode || {}).length)
      return toast.error("Missing Game Mode. Please Select One first.");
    if (!Object.keys(gameRules || {}).length)
      return toast.error("Missing Rule Set. Please Select One first.");
    if (!ready2Submit) return;

    setNeedsOnboarding(false);
  };
  return (
    <div>
      {needsOnboarding ? (
        <GameOnboarding
          onSubmit={onSubmit}
          addInput={addInput}
          deleteInput={deleteInput}
          gameMode={gameMode}
          players={players}
          ready2Submit={ready2Submit}
          gameRules={gameRules}
          setGameMode={setGameMode}
          setPlayers={setPlayers}
          setGameRules={setGameRules}
        />
      ) : (
        <Game
          players={players}
          gameMode={gameMode as IGameModeWithDescription}
          gameRules={gameRules as IGameRulesWithDescription}
        />
      )}
    </div>
  );
};
