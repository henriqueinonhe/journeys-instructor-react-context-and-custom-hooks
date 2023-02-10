import { EntryForm } from "./EntryForm";
import { useTranslation } from "../hooks/useTranslation";
import { useKeyPressed } from "../hooks/useKeyPressed";

export const EditEntryForm = ({
  onSubmit,
  entry,
  goToDashboard,
  onDeleteEntry,
}) => {
  const { t } = useTranslation();

  useKeyPressed("Delete", () => {
    onDeleteEntry();
    goToDashboard();
  });

  return (
    <EntryForm
      title={t("editEntryFormTitle")}
      entry={entry}
      goToDashboard={goToDashboard}
      onSubmit={onSubmit}
    />
  );
};
