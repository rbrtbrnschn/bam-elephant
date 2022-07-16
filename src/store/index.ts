import { useMemo, useState } from "react";
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

  /* HELPERS */
  const hasStarted = useMemo(
    () => state.deck.length && state.drawnCards.length,
    [state.drawnCards.length, state.deck.length]
  );
  const hasEnded = useMemo(() => !state.deck.length, [state.deck.length]);

  /* HELPERS */

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
      hasStarted,
      hasEnded,
    },
  };
}
