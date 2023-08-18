import { EntryForm } from "./EntryForm";

export const NewEntryForm = ({ onSubmit, goToDashboard }) => {
  return (
    <EntryForm
      title="New Entry"
      goToDashboard={goToDashboard}
      onSubmit={onSubmit}
    />
  );
};
