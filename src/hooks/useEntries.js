import { useContext } from "react";
import { EntriesContext } from "../context/EntriesContext";
import { entriesStorage } from "../infrastructure/entriesStorage";
import { useNotification } from "./useNotification";
import { useTranslation } from "./useTranslation";

export const useEntries = () => {
  const value = useContext(EntriesContext);
  const { showNotification } = useNotification();
  const { t } = useTranslation();

  if (value === undefined) {
    throw new Error("You forgot EntriesProvider!");
  }

  const { entries, setEntries } = value;

  const createEntry = (entryIntent) => {
    setEntries((entries) => {
      const updatedEntries = [
        ...entries,
        {
          id: (Math.random() * 10).toString(),
          ...entryIntent,
        },
      ];

      entriesStorage.store(updatedEntries);

      showNotification(t("entryCreatedNotification"));

      return updatedEntries;
    });
  };

  const deleteEntry = (id) => {
    setEntries((entries) => {
      const updatedEntries = entries.filter((entry) => entry.id !== id);

      entriesStorage.store(updatedEntries);

      showNotification(t("entryDeletedNotification"));

      return updatedEntries;
    });
  };

  const editEntry = (id, entryIntent) => {
    const updatedEntry = {
      id,
      ...entryIntent,
    };

    setEntries((entries) => {
      const updatedEntries = [...entries];
      const updatedEntryIndex = updatedEntries.findIndex(
        (entry) => entry.id === id
      );
      updatedEntries[updatedEntryIndex] = updatedEntry;

      entriesStorage.store(updatedEntries);

      showNotification(t("entryEditedNotification"));

      return updatedEntries;
    });
  };

  return {
    entries,
    createEntry,
    deleteEntry,
    editEntry,
  };
};
