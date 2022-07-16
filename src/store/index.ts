import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { STANDARD_DECK } from "../common/cards";
import { DEFAULT_RULES } from "../common/rules";
import { CardValue, ICard, IUndoCard } from "../interfaces/card.interface";
import usePrevious from "./usePrevious.hook";
/*TODO refactor to own file */
interface IGameState {
  deck: ICard[];
  drawnCards: ICard[];
  disposedCards: ICard[];
  rule: string;
  rules: Partial<Record<CardValue, string>>;
  newRule: string;
  modalIsOpen: boolean;
}
type GameRules = Partial<Record<CardValue, string>>;
interface IGameActions {
  setDeck: (deck: ICard[]) => void;
  setDrawnCards: (cards: ICard[]) => void;
  setDisposedCards: (cards: ICard[]) => void;
  setRule: (rule: string) => void;
  setRules: (rules: GameRules) => void;
  setNewRule: (newRule: string) => void;
  toggleModal: () => void;
}

interface IGameHelpers {
  winner: ICard | null | undefined;
  loser: ICard | null | undefined;
  roundHasStarted: boolean;
  roundHasEnded: boolean;
}

export interface IInjections {
  state: IGameState;
  actions: IGameActions;
  helpers: IGameHelpers;
}
type WinnerCallback = (e: IInjections) => void;
export type WinnerCallbacks = Partial<Record<CardValue, WinnerCallback>>;
interface IUseGameStateOptions {
  discardedPileSize?: number;
  playerCount?: number;
  winnerCallbacks?: WinnerCallbacks;
}

export function useGameState({
  discardedPileSize: DISCARDED_PILE_SIZE = 30,
  playerCount: PLAYER_COUNT = 2,
  winnerCallbacks: WINNER_CALLBACKS = {},
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
    rules: { ...DEFAULT_RULES },
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

  const setRules = (newRules: GameRules) => {
    setState((oldState) => ({ ...oldState, rules: newRules }));
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

  /**
   * Sorts ICard by `#value` from low to high.
   * @param a {ICard}
   * @param b {ICard}
   * @returns {number}
   */
  function sortCardsByValue(a: ICard, b: ICard) {
    return a.value - b.value;
  }

  const [winner, loser] = useMemo<(ICard | null)[]>(() => {
    const sorted = [...state.drawnCards].sort(sortCardsByValue);
    const cardValues = sorted.map((c) => c.value);
    const uniqueCardValues = new Set(cardValues);

    const deltaSetLength = Math.abs(sorted.length - uniqueCardValues.size);
    const allDraw = sorted.length === deltaSetLength + 1;

    if (allDraw) return [null, null];

    return [sorted[sorted.length - 1], sorted[0]];
  }, [state.drawnCards]);

  const helpers: IGameHelpers = {
    winner,
    loser,
    roundHasStarted,
    roundHasEnded,
  };
  /* HELPERS */

  /**
   * Update Rule On New Win
   */
  useEffect(() => {
    if (!state.drawnCards.length) return setRule("");
    if (!winner) {
      toast.error("It's a draw.");
      return setRule("");
    }
    WINNER_CALLBACKS[winner.value]?.({ state, actions, helpers });

    const rule = state.rules[winner.value];
    const fallback = "You got lucky";
    setRule(rule ?? fallback);
    toast.success(rule);
  }, [state.rules, winner]);

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
  };
}
