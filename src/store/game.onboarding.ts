import { useState } from "react";
import { IGamePreset } from "../interfaces/gamemode.interface";
interface IGameOnboardingState {
  players: string[];
  gameMode?: IGamePreset;
}
export function useGameOnboarding() {
  const [state, setState] = useState<IGameOnboardingState>({
    players: [],
  });

  const setPlayers = (newPlayers: string[]) => {
    setState((oldState) => ({ ...oldState, players: newPlayers }));
  };

  const setGameMode = (newGameMode: IGamePreset) => {
    setState((oldState) => ({ ...oldState, gameMode: newGameMode }));
  };

  const actions = {
    setPlayers,
    setGameMode,
  };

  return { state, actions };
}
