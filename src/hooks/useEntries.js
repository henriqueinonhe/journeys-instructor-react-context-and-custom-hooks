import { useContext } from "react";
import { EntriesContext } from "../context/EntriesContext";
import { entriesStorage } from "../infrastructure/entriesStorage";

export const useEntries = () => {
  const value = useContext(EntriesContext);

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

      return updatedEntries;
    });
  };

  const deleteEntry = (id) => {
    setEntries((entries) => {
      const updatedEntries = entries.filter((entry) => entry.id !== id);

      entriesStorage.store(updatedEntries);

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
