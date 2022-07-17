import { toast } from "react-toastify";
import { CardValue } from "../interfaces/card.interface";
import { WinnerCallbacks } from "../interfaces/game.interface";

export const BASIC_CALLBACKS: WinnerCallbacks = {
  [CardValue.SEVEN]: (options) => {
    options.thunks.shuffle();
    toast.warn("Shuffling Leftover Cards.");
  },
  [CardValue.ACE]: (options) => {
    options.actions.toggleModal();
  },
};

export const WALKTHROUGH_CALLBACKS: WinnerCallbacks = { ...BASIC_CALLBACKS };
