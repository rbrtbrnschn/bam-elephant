import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  CardValue,
  cardValueToName,
  ICard,
} from "../../interfaces/card.interface";
import { IBaseRule } from "../../interfaces/rules.interface";
import { MyCard } from "../card/card";

interface IAddRuleModalProps extends React.HTMLAttributes<HTMLDivElement> {
  card?: ICard;
  onClose: () => void;
  onSuccess: (rule: IBaseRule) => void;
  defaultRules?: IBaseRule[];
  playerName: string;
}
export const AddRuleModal = forwardRef<HTMLDivElement, IAddRuleModalProps>(
  (props, ref) => {
    const {
      onClose,
      onSuccess: tbd,
      card,
      placeholder,
      defaultRules: customRules,
      playerName = "",
    } = props;
    const [rule, setRule] = useState<IBaseRule>({ title: "", description: "" });
    const inputRef = useRef<HTMLInputElement>(null);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRule({ title: e.currentTarget.value, description: "Custom" });
    };
    useImperativeHandle(
      ref,
      //@ts-ignore
      () => ({
        focusInput: (e: React.ChangeEvent<HTMLInputElement>) => {
          //@TODO remove - sadly not working with react-joyride
          inputRef?.current?.focus();
        },
      }),
      []
    );
    const { t } = useTranslation("translation", {
      keyPrefix: "game.add-rule-modal",
    });
    return (
      <div ref={ref} {...props}>
        <div className="absolute w-screen h-full-with-nav overflow-hidden bg-slate-700/50 z-10"></div>
        <div
          aria-hidden="true"
          className="absolute h-full w-full overflow-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center"
        >
          <div className="relative p-4 w-full max-w-md h-full h-auto z-50">
            <div
              id="add-rule-modal"
              className="relative bg-white rounded-lg shadow dark:bg-gray-700"
            >
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="authentication-modal"
                onClick={onClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  {t("add-rule-to")} {cardValueToName((card as ICard)?.value)}
                </h3>
                <div className="flex justify-center align-center pb-2">
                  <MyCard
                    imageUrl={card?.image}
                    className={
                      card?.value === CardValue.ELEPHANT ? "dark:bg-white" : ""
                    }
                  />
                </div>
                <form
                  className="space-y-6"
                  action="#"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (e.currentTarget.id === "add-rule-input") {
                      return;
                    }
                  }}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {t("your-new-rule")}
                    </label>

                    <input
                      type="text"
                      name="email"
                      id="add-rule-input"
                      ref={inputRef}
                      value={rule.title}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder={placeholder || t("no-rule-set")}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div className={!customRules?.length ? "hidden" : ""}>
                    <label
                      htmlFor="custom-rule"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {t("custom-rule-instead")}
                    </label>
                    <select
                      id="custom-rule"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => {
                        const rule = customRules?.find(
                          (r) =>
                            r.title.toLocaleLowerCase() ===
                            e.currentTarget.value.toLocaleLowerCase()
                        );
                        if (!rule) return;
                        setRule(rule);
                      }}
                    >
                      {customRules?.map((rule, i) => (
                        <option
                          data-tip={rule.description}
                          data-for="main"
                          key={"default-rule-option" + i}
                          onClick={() => {
                            setRule(rule);
                          }}
                          value={rule.title}
                        >
                          {rule.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    id="add-rule-submit"
                    className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    onClick={(e) => {
                      rule.title.length && tbd(rule);
                    }}
                  >
                    {t("submit", { player: playerName })}
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    {t("skip.prefix")}.{" "}
                    <a
                      href="#"
                      className="text-blue-700 hover:underline dark:text-blue-500"
                      onClick={onClose}
                    >
                      {t("skip.c2c")}.
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
