import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { STANDARD_DECK } from "../common/cards";
import { useLowKeyGameMode } from "../common/game-modes";
import { useBasicGameRules } from "../common/game-rules";
import { CardValue, ICard, IUndoCard } from "../interfaces/card.interface";
import {
  IGameActions,
  IGameHelpers,
  IGameInjections,
  IGameModeWithDescription,
  IGameState,
  IGameThunks,
  IUseGameStateOptions,
} from "../interfaces/game.interface";
import {
  IBaseRule,
  IExampleRule,
  IGameRulesWithDescription,
} from "../interfaces/rules.interface";
import usePrevious from "./usePrevious.hook";

export function useGameState({
  discardedPileSize: DISCARDED_PILE_SIZE = 30,
  playerCount: PLAYER_COUNT = 2,
  gameMode,
  gameRules,
  deck = [...STANDARD_DECK],
}: IUseGameStateOptions = {}) {
  const lowKeyGameModeWithDescription = useLowKeyGameMode();
  const basicGameRulesWithDescription = useBasicGameRules();
  if (!gameMode) gameMode = lowKeyGameModeWithDescription;
  if (!gameRules) gameRules = basicGameRulesWithDescription;

  /*TODO refactor constants */
  const MAX_PLAYER_COUNT = 8;

  /* Error Handling */
  if (PLAYER_COUNT > MAX_PLAYER_COUNT)
    throw new Error(
      `Too many Players. Max Player Count is ${MAX_PLAYER_COUNT}.`
    );
  /* Error Handling */

  const [state, setState] = useState<IGameState>({
    deck,
    drawnCards: [],
    disposedCards: [],
    rule: {
      title: "",
      description: "",
    },
    gameRules: { ...gameRules },
    gameMode: { ...gameMode },
    modalIsOpen: false,
  });
  const previousDrawnCards = usePrevious<ICard[]>(state.drawnCards);

  /* ACTIONS */
  const setDeck = (newDeck: ICard[]) => {
    setState((oldState) => ({ ...oldState, deck: newDeck }));
  };

  const setDrawnCards = (newDrawnCards: ICard[]) => {
    setState((oldState) => ({ ...oldState, drawnCards: newDrawnCards }));
  };

  const setDisposedCards = (newDisposedCards: ICard[]) => {
    setState((oldState) => ({ ...oldState, disposedCards: newDisposedCards }));
  };

  const setRule = (newRule: IBaseRule) => {
    setState((oldState) => ({ ...oldState, rule: newRule }));
  };

  const setRules = (newRules: IGameRulesWithDescription) => {
    setState((oldState) => ({
      ...oldState,
      gameRules: newRules,
    }));
  };

  const toggleModal = () => {
    setState((oldState) => ({ ...oldState, modalIsOpen: !state.modalIsOpen }));
  };

  const actions: IGameActions = {
    setDeck,
    setDrawnCards,
    setDisposedCards,
    setRule,
    setRules,
    toggleModal,
  };
  /* ACTIONS */

  /* HELPERS */
  const roundHasStarted = useMemo(
    () => !!(state.deck.length && state.drawnCards.length),
    [state.drawnCards.length, state.deck.length]
  );
  const roundHasEnded = useMemo(() => !state.deck.length, [state.deck.length]);

  const [winner, loser] = useMemo<(ICard | null)[]>(
    () => (gameMode as IGameModeWithDescription).handleWinner({ state }),
    [state.drawnCards]
  );

  const helpers: IGameHelpers = {
    winner,
    loser,
    roundHasStarted,
    roundHasEnded,
  };

  /* THUNKS */
  const shuffle = (shuffleAlg = () => 0.5 - Math.random()) => {
    setDeck([...state.deck].sort(shuffleAlg));
    // setDrawnCards([]);
  };
  const restart = () => {
    setDeck([...STANDARD_DECK].sort(() => 0.5 * Math.random()));
    setDrawnCards([]);
    setDisposedCards([]);
  };

  const thunks: IGameThunks = {
    shuffle,
    restart,
  };
  /* THUNKS */

  const gameInjections: IGameInjections = {
    state,
    actions,
    helpers,
    thunks,
  };
  /* HELPERS */

  /**
   * Update Rule On New Win
   */
  useEffect(() => {
    (gameMode as IGameModeWithDescription).handleNotification(gameInjections);
  }, [state.gameRules, winner]);

  /* HOOKS */

  /**
   * Shift old `drawnCards` to `disposedCards` pile for history
   * and undo purposes.
   */
  function useDisposeLastDrawnCards() {
    useEffect(() => {
      if (!previousDrawnCards) return;

      const isUndoCards = state.drawnCards.some(
        (c) => (c as IUndoCard)?.isUndo
      );
      if (isUndoCards) {
        return setDisposedCards([...state.disposedCards.slice(PLAYER_COUNT)]);
      }

      setDisposedCards([
        ...previousDrawnCards,
        ...state.disposedCards.slice(0, DISCARDED_PILE_SIZE),
      ]);
    }, [state.drawnCards]);
  }

  /* HOOKS */

  useDisposeLastDrawnCards();

  return {
    state,
    __setState: setState,
    actions: {
      toggleModal,
      setDeck,
      setDrawnCards,
      setDisposedCards,
      setRule,
      setRules,
    },
    helpers: {
      hasStarted: roundHasStarted,
      hasEnded: roundHasEnded,
      winner,
      loser,
    },
    thunks,
  };
}
