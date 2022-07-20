import { StringMap, TOptions } from "i18next";
import { useTranslation as useOriginalTranslation } from "react-i18next";

export const useTranslation = () => {
  type Options = TOptions<StringMap> | undefined;
  const { t } = useOriginalTranslation();

  type T = typeof t;
  return {
    t: (key: string = "", options: Options = {}): string => {
      const splitByDot = key.split(".");
      const last = splitByDot?.[splitByDot.length - 1];
      return t(key, { defaultValue: last, ...options });
    },
  };
};
