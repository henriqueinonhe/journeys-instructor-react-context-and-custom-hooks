import { useMemo, useState } from "react";
import { LanguageContext } from "./LanguageContext";

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
