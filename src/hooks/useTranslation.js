import { useContext } from "react";
import { translate } from "../translations/translate";
import { LanguageContext } from "../context/LanguageContext";

export const useTranslation = () => {
  const language = useContext(LanguageContext);

  if (language === undefined) {
    throw new Error("You forgot the LanguageContext!");
  }

  const t = (key) => translate(language, key);

  return {
    t,
  };
};
