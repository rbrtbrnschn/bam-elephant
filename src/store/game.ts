import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { STANDARD_DECK } from "../common/cards";
import { LOW_KEY_GAME_MODE_WITH_DESCRIPTION } from "../common/game-modes";
import { BASIC_GAME_RULES_WITH_DESCRIPTION } from "../common/game-rules";
import { CardValue, ICard, IUndoCard } from "../interfaces/card.interface";
import {
  IGameActions,
  IGameHelpers,
  IGameInjections,
  IGameState,
  IGameThunks,
  IUseGameStateOptions,
} from "../interfaces/game.interface";
import { IGameRulesWithDescription } from "../interfaces/rules.interface";
import usePrevious from "./usePrevious.hook";

export function useGameState({
  discardedPileSize: DISCARDED_PILE_SIZE = 30,
  playerCount: PLAYER_COUNT = 2,
  gameMode = LOW_KEY_GAME_MODE_WITH_DESCRIPTION,
  gameRules = BASIC_GAME_RULES_WITH_DESCRIPTION,
}: IUseGameStateOptions = {}) {
  /*TODO refactor constants */
  const MAX_PLAYER_COUNT = 8;

  /* Error Handling */
  if (PLAYER_COUNT > MAX_PLAYER_COUNT)
    throw new Error(
      `Too many Players. Max Player Count is ${MAX_PLAYER_COUNT}.`
    );
  /* Error Handling */

  const [state, setState] = useState<IGameState>({
    deck: [...STANDARD_DECK],
    drawnCards: [],
    disposedCards: [],
    rule: "",
    gameRules: { ...gameRules },
    gameMode: { ...gameMode },
    newRule: "",
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

  const setRule = (newRule: string) => {
    setState((oldState) => ({ ...oldState, rule: newRule }));
  };

  const setRules = (newRules: IGameRulesWithDescription) => {
    setState((oldState) => ({
      ...oldState,
      gameRules: newRules,
    }));
  };

  const setNewRule = (newRule: string) => {
    setState((oldState) => ({ ...oldState, newRule }));
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
    setNewRule,
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
    () => gameMode.handleWinner({ state }),
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
    gameMode.handleNotification(gameInjections);
  }, [state.gameRules, winner]);

  /* HOOKS */
  /**
   * Cleanup New Rule Modal
   * if skipped.
   */
  function useCleanupNewRuleDelegationDialoge() {
    useEffect(() => {
      const noAce = winner?.value !== CardValue.ACE;
      const modalIsOpen = state.modalIsOpen === true;
      if (noAce && modalIsOpen) {
        toggleModal();
      }
    }, [state.drawnCards]);
  }

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

  useCleanupNewRuleDelegationDialoge();
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
      setNewRule,
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
