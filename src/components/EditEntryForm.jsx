import { EntryForm } from "./EntryForm";
import { useTranslation } from "../hooks/useTranslation";
import { useKeyPressed } from "../hooks/useKeyPressed";
import { useViewState } from "../hooks/useViewState";
import { useEntries } from "../hooks/useEntries";
import { useNotification } from "../hooks/useNotification";

export const EditEntryForm = () => {
  const { t } = useTranslation();
  const { viewState, goToDashboard } = useViewState();
  const { entries, editEntry, deleteEntry } = useEntries();

  const entry = entries.find((entry) => entry.id === viewState.id);

  useKeyPressed("Delete", () => {
    deleteEntry(entry.id);

    goToDashboard();
  });

  return (
    <EntryForm
      title={t("editEntryFormTitle")}
      entry={entry}
      onSubmit={(entryIntent) => editEntry(entry.id, entryIntent)}
    />
  );
};
