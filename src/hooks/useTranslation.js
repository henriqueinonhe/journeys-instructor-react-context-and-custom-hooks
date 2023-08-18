import { useContext } from "react";
import { translate } from "../translations/translate";
import { LanguageContext } from "../context/LanguageContext";

export const useTranslation = () => {
  const value = useContext(LanguageContext);

  if (value === undefined) {
    throw new Error("You forgot the LanguageProvider!");
  }

  const { language, setLanguage } = value;

  const t = (key) => translate(language, key);
  const formatNumber = Intl.NumberFormat(language, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format;
  const formatDate = Intl.DateTimeFormat(language).format;

  return {
    language,
    setLanguage,
    t,
    formatNumber,
    formatDate,
  };
};
