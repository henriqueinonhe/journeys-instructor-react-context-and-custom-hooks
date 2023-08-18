import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { translate } from "../translations/translate";
import { EntryForm } from "./EntryForm";

export const NewEntryForm = ({ onSubmit, goToDashboard }) => {
  const language = useContext(LanguageContext);

  return (
    <EntryForm
      title={translate(language, "newEntryFormTitle")}
      goToDashboard={goToDashboard}
      onSubmit={onSubmit}
    />
  );
};
