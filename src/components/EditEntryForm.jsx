import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { translate } from "../translations/translate";
import { EntryForm } from "./EntryForm";

export const EditEntryForm = ({ onSubmit, entry, goToDashboard }) => {
  const language = useContext(LanguageContext);

  return (
    <EntryForm
      title={translate(language, "editEntryFormTitle")}
      entry={entry}
      goToDashboard={goToDashboard}
      onSubmit={onSubmit}
    />
  );
};
