import { useMemo, useState } from "react";
import { EntriesContext } from "./EntriesContext";
import { entriesStorage } from "../infrastructure/entriesStorage";

export const EntriesProvider = ({ children }) => {
  const [entries, setEntries] = useState(entriesStorage.retrieve());

  const value = useMemo(
    () => ({
      entries,
      setEntries,
    }),
    [entries]
  );

  return (
    <EntriesContext.Provider value={value}>{children}</EntriesContext.Provider>
  );
};
