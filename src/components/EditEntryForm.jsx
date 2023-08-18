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
    window.addEventListener("keyup", callback);

    return () => {
      window.removeEventListener("keydown", callback);
      window.removeEventListener("keyup", callback);
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
