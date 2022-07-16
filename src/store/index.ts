import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { STANDARD_DECK } from "../common/cards";
import { DEFAULT_RULES } from "../common/rules";
import { CardValue, ICard } from "../interfaces/card.interface";

export function useGameState() {
  interface IGameState {
    deck: ICard[];
    drawnCards: ICard[];
    rule: string;
    rules: Partial<Record<CardValue, string>>;
    newRule: string;
    modalIsOpen: boolean;
  }
  const [state, setState] = useState<IGameState>({
    deck: [...STANDARD_DECK],
    drawnCards: [],
    rule: "",
    rules: { ...DEFAULT_RULES },
    newRule: "",
    modalIsOpen: false,
  });

  /* ACTIONS */
  const setDeck = (newDeck: ICard[]) => {
    setState((oldState) => ({ ...oldState, deck: newDeck }));
  };

  const setDrawnCards = (newDrawnCards: ICard[]) => {
    setState((oldState) => ({ ...oldState, drawnCards: newDrawnCards }));
  };

  const setRule = (newRule: string) => {
    setState((oldState) => ({ ...oldState, rule: newRule }));
  };
  const setRules = (newRules: Partial<Record<CardValue, string>>) => {
    setState((oldState) => ({ ...oldState, rules: newRules }));
  };
  const setNewRule = (newRule: string) => {
    setState((oldState) => ({ ...oldState, newRule }));
  };
  const toggleModal = () => {
    setState((oldState) => ({ ...oldState, modalIsOpen: !state.modalIsOpen }));
  };
  /* ACTIONS */

  /* HELPERS */
  const roundHasStarted = useMemo(
    () => state.deck.length && state.drawnCards.length,
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
  /* HOOKS */

  useCleanupNewRuleDelegationDialoge();

  return {
    state,
    __setState: setState,
    actions: {
      toggleModal,
      setDeck,
      setDrawnCards,
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
