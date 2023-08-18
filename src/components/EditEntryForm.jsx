import { EntryForm } from "./EntryForm";

export const EditEntryForm = ({ onSubmit, entry, goToDashboard }) => {
  return (
    <EntryForm
      title="Edit Entry"
      entry={entry}
      goToDashboard={goToDashboard}
      onSubmit={onSubmit}
    />
  );
};
