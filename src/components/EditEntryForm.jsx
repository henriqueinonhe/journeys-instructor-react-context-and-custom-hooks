import { translate } from "../translations/translate";
import { EntryForm } from "./EntryForm";

export const EditEntryForm = ({ onSubmit, entry, goToDashboard, language }) => {
  return (
    <EntryForm
      title={translate(language, "editEntryFormTitle")}
      entry={entry}
      goToDashboard={goToDashboard}
      onSubmit={onSubmit}
      language={language}
    />
  );
};
