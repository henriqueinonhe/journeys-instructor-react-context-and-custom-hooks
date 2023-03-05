import { translate } from "../translations/translate";
import { EntryForm } from "./EntryForm";

export const NewEntryForm = ({ onSubmit, goToDashboard, language }) => {
  return (
    <EntryForm
      title={translate(language, "newEntryFormTitle")}
      goToDashboard={goToDashboard}
      onSubmit={onSubmit}
      language={language}
    />
  );
};
