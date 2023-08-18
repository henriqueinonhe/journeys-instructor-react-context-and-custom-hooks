import { EntryForm } from "./EntryForm";
import { useTranslation } from "../hooks/useTranslation";

export const NewEntryForm = ({ onSubmit, goToDashboard }) => {
  const { t } = useTranslation();

  return (
    <EntryForm
      title={t("newEntryFormTitle")}
      goToDashboard={goToDashboard}
      onSubmit={onSubmit}
    />
  );
};
