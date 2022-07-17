import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GAMEMODES, GameModes } from "../../common/game-modes";
import { PRESETS } from "../../common/presets";
import { RuleSets } from "../../common/rules";
import { GameMode, GameRules } from "../../interfaces/game.interface";
import { Game } from "./game";
import { GameOnboarding } from "./onboarding";

export const GamePage = () => {
  const [needsOnboarding, setNeedsOnboarding] = useState(true);
  const [players, setPlayers] = useState<string[]>(["", ""]);
  const [ruleSet, setRuleSet] = useState<GameRules>();
  const [gamemode, setGamemode] = useState<GameMode>();

  const ready2Submit = useMemo(
    () =>
      [players.length >= 2, players.every(Boolean), ruleSet, gamemode].every(
        Boolean
      ),
    [players, ruleSet, gamemode]
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
    if (!ready2Submit) return;
    if (!gamemode)
      return toast.error("Missing Game Mode. Please Select One first.");
    if (!ruleSet)
      return toast.error("Missing Rule Set. Please Select One first.");

    setNeedsOnboarding(false);
  };
  return (
    <div>
      {needsOnboarding ? (
        <GameOnboarding
          onSubmit={onSubmit}
          addInput={addInput}
          deleteInput={deleteInput}
          gameMode={gamemode as GameMode}
          players={players}
          ready2Submit={ready2Submit}
          ruleSet={ruleSet as GameRules}
          setGameMode={setGamemode}
          setPlayers={setPlayers}
          setRuleSet={setRuleSet}
        />
      ) : (
        <Game
          players={players}
          preset={{
            gamemode: gamemode as GameMode,
            ruleSet: ruleSet as GameRules,
            title: "Custom",
          }}
        />
      )}
    </div>
  );
};
