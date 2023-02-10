import { EntryForm } from "./EntryForm";
import { useTranslation } from "../hooks/useTranslation";
import { useKeyPressed } from "../hooks/useKeyPressed";
import { useViewState } from "../hooks/useViewState";

export const EditEntryForm = ({ onSubmit, entry, onDeleteEntry }) => {
  const { t } = useTranslation();
  const { goToDashboard } = useViewState();

  useKeyPressed("Delete", () => {
    onDeleteEntry();

    goToDashboard();
  });

  return (
    <EntryForm
      title={t("editEntryFormTitle")}
      entry={entry}
      onSubmit={onSubmit}
    />
  );
};
