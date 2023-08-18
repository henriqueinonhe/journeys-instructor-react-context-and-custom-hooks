import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { translate } from "../translations/translate";
import { EntryForm } from "./EntryForm";
import { useKeyPressed } from "../hooks/useKeyPressed";

export const EditEntryForm = ({
  onSubmit,
  entry,
  goToDashboard,
  onDeleteEntry,
}) => {
  const language = useContext(LanguageContext);

  useKeyPressed("Delete", () => {
    onDeleteEntry();
    goToDashboard();
  });

  return (
    <EntryForm
      title={translate(language, "editEntryFormTitle")}
      entry={entry}
      goToDashboard={goToDashboard}
      onSubmit={onSubmit}
    />
  );
};
