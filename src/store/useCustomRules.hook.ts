import { useState } from "react";
import { IBaseRule } from "../interfaces/rules.interface";
import { useStorage } from "../utils/useStorage";

export const useCustomRules = () => {
  const { setLocalStorage, getLocaleStorage } = useStorage(localStorage);
  const [customRules, setCustomRules] = useState<IBaseRule[]>(
    JSON.parse(getLocaleStorage("game.custom-rules") || "[]")
  );
  const handleSetCustomRules = (newCustomRules: IBaseRule[]) => {
    const filtered = newCustomRules.filter(Boolean);
    const stringified = JSON.stringify(filtered.filter(Boolean));
    setCustomRules(filtered);
    setLocalStorage("game.custom-rules", stringified);
  };
  return {
    customRules,
    setCustomRules: handleSetCustomRules,
    __setCustomRules: setCustomRules,
  };
};
