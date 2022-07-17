import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GAMEMODES, GameModes } from "../../common/game-modes";
import { PRESETS } from "../../common/presets";
import { RuleSets } from "../../common/rules";
import { GameMode, GameRules } from "../../interfaces/game.interface";
import { Game } from "./game";
import { GameOnboarding } from "./onboarding";
import { useGameRedirect } from "../home/redirect.hook";
import ReactTooltip from "react-tooltip";

export const GamePage = () => {
  useGameRedirect();
  const [needsOnboarding, setNeedsOnboarding] = useState(true);
  const [players, setPlayers] = useState<string[]>(["", ""]);
  const [ruleSet, setRuleSet] = useState<GameRules>();
  const [gamemode, setGamemode] = useState<GameMode>();

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [players, ruleSet, gamemode]);

  const ready2Submit = useMemo(
    () =>
      [
        players.length >= 2,
        players.every((e) => e.length),
        ruleSet,
        gamemode,
      ].every(Boolean),
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
    if (!Object.keys(gamemode || {}).length)
      return toast.error("Missing Game Mode. Please Select One first.");
    if (!Object.keys(ruleSet || {}).length)
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
