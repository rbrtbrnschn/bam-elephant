import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../../common/useTranslation";
import ReactTooltip from "react-tooltip";
import { MyBanner } from "../../components/banner/banner";
import { MyCard } from "../../components/card/card";
import { AddRuleModal } from "../../components/modal/add-rule.modal";
import { MyNavbar } from "../../components/navbar/navbar";
import { MyTable } from "../../components/table/table";
import {
  CardValue,
  cardValueToName,
  ICard,
} from "../../interfaces/card.interface";
import { IGameModeWithDescription } from "../../interfaces/game.interface";
import {
  IBaseRule,
  IGameRulesWithDescription,
  IWarningRule,
} from "../../interfaces/rules.interface";
import { useGameState } from "../../store/game";
import { useCustomRules } from "../../store/useCustomRules.hook";
interface IGameProps {
  players: string[];
  gameRules: IGameRulesWithDescription;
  gameMode: IGameModeWithDescription;
}
export const Game = ({
  players,
  gameMode: givenGameMode,
  gameRules: givenGameRules,
}: IGameProps) => {
  const { state, actions, helpers, thunks } = useGameState({
    playerCount: players.length,
    gameMode: givenGameMode,
    gameRules: givenGameRules,
  });
  const {
    deck,
    drawnCards,
    modalIsOpen,
    rule,
    gameRules,
    gameMode,
    disposedCards,
  } = state;
  const { setDeck, setDrawnCards, setRules, toggleModal, setRule } = actions;
  const { hasEnded, hasStarted, winner, loser } = helpers;
  const { restart } = thunks;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    thunks.shuffle();
  }, []);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [drawnCards, rule]);
  const drawCards = (givenCards?: ICard[]) => {
    if (givenCards)
      return setDrawnCards(givenCards.map((c) => ({ ...c, isUndo: true })));

    const newDeck = [...deck];
    const newDrawnCards = new Array(players.length)
      .fill(0)
      .map((_, i) => newDeck.shift())
      .filter((e) => e) as ICard[];
    setDrawnCards(newDrawnCards);
    setDeck([...newDeck]);
  };

  const undo = () => {
    const previouslyDiscardedCards = [...state.disposedCards].slice(
      0,
      players.length
    );
    setDeck([...state.drawnCards, ...state.deck]);
    drawCards(previouslyDiscardedCards);
  };

  useEffect(() => {
    if (!modalIsOpen) return;
    //@ts-ignore
    if (window?.innerWidth > 700) modalRef?.current?.focusInput();
  }, [modalIsOpen]);

  const { customRules } = useCustomRules();

  const { t } = useTranslation();
  return (
    <div className="relative h-screen max-h-screen overflow-hidden">
      <MyNavbar />
      {modalIsOpen && (
        <AddRuleModal
          card={loser as ICard}
          playerName={players[drawnCards.indexOf(loser as ICard) || 0]}
          ref={modalRef}
          onClose={toggleModal}
          defaultRules={[...gameMode.defaultRules, ...customRules]}
          onSuccess={(rule: IBaseRule) => {
            setRules({
              ...gameRules,
              rules: {
                ...gameRules.rules,
                [(loser as ICard)?.value]: rule,
              },
            });
          }}
          placeholder={gameRules.rules[(loser as ICard)?.value]?.title}
        />
      )}

      <div className="container mx-auto px-4">
        <div className="h-0">
          {rule.title && (
            <MyBanner
              title={
                !(rule as IWarningRule).isWarning
                  ? players[
                      drawnCards.findIndex((c) => c.code === winner?.code) ?? 0
                    ] +
                    ": " +
                    rule.title
                  : rule.title
              }
              dataTip={rule.description}
              onClose={() => {
                setRule({ title: "", description: "asdd" });
              }}
              isDanger={(rule as IWarningRule).isWarning}
            />
          )}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div
          id="cards-view"
          className="min-h-[300px] lg:min-h-[500px] w-full flex justify-center mt-20 lg:mt-0 lg:items-center gap-2 sm:gap-6 md:gap-10"
        >
          {drawnCards.map((c, i) => (
            <div
              {...(gameRules.rules[c.value]?.title?.length && {
                "data-tip": "Rule: " + gameRules.rules[c.value]?.title,
              })}
              data-for="main"
              key={"container-card#" + i}
            >
              <MyCard
                key={"card#" + i}
                imageUrl={c.images?.png}
                title={c.code + ""}
                className={
                  c.value === CardValue.ELEPHANT
                    ? "border border-black dark:bg-white"
                    : ""
                }
              />
              <div className="text-center">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                  {players[i]}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="full-w flex items-center justify-center gap-4 mb-6">
          {!hasEnded && (
            <button
              id="draw-button"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => {
                drawCards();
              }}
            >
              {t("game.draw")}
            </button>
          )}
          {hasEnded && (
            <button
              className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
              onClick={restart}
            >
              {t("game.shuffle")}
            </button>
          )}
          {!hasEnded && disposedCards.length ? (
            <button
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
              onClick={() => {
                undo();
              }}
            >
              {t("game.undo")}
            </button>
          ) : null}
        </div>

        <MyTable
          head={[t("game.value"), t("game.rule")]}
          body={Object.entries(gameRules.rules).map(([key, value], index) => {
            return [
              cardValueToName(parseInt(key) as unknown as CardValue),
              value,
            ];
          })}
          winner={winner as ICard}
          className="h-80 overflow-y-scroll"
        />
      </div>
    </div>
  );
};
