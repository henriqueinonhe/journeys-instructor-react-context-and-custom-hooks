import { useContext, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { translate } from "../translations/translate";
import { EntryForm } from "./EntryForm";

export const EditEntryForm = ({
  onSubmit,
  entry,
  goToDashboard,
  onDeleteEntry,
}) => {
  const language = useContext(LanguageContext);

  useEffect(() => {
    const callback = (event) => {
      if (event.key === "Delete") {
        onDeleteEntry();
        goToDashboard();
      }
    };

    window.addEventListener("keydown", callback);

    return () => {
      window.removeEventListener("keydown", callback);
    };
  }, []);

  return (
    <EntryForm
      title={translate(language, "editEntryFormTitle")}
      entry={entry}
      goToDashboard={goToDashboard}
      onSubmit={onSubmit}
    />
  );
};
