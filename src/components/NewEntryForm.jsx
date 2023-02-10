import { EntryForm } from "./EntryForm";
import { useTranslation } from "../hooks/useTranslation";

export const NewEntryForm = ({ onSubmit }) => {
  const { t } = useTranslation();

  return <EntryForm title={t("newEntryFormTitle")} onSubmit={onSubmit} />;
};
