import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import "./styles/global.scss";
import cx from "./App.module.scss";
import { NewEntryForm } from "./components/NewEntryForm";
import { EditEntryForm } from "./components/EditEntryForm";
import { entriesStorage } from "./infrastructure/entriesStorage";

function App() {
  const [language, setLanguage] = useState("en");

  const [viewState, setViewState] = useState({
    name: "Dashboard",
  });

  const goToDashboard = () =>
    setViewState({
      name: "Dashboard",
    });

  const goToNewEntry = () =>
    setViewState({
      name: "New Entry",
    });

  const goToEditEntry = (id) =>
    setViewState({
      name: "Edit Entry",
      id,
    });

  const [entries, setEntries] = useState(entriesStorage.retrieve());

  const handleNewEntrySubmitted = (entryIntent) => {
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

    goToDashboard();
  };

  const handleEntryDeleted = (id) => {
    setEntries((entries) => {
      const updatedEntries = entries.filter((entry) => entry.id !== id);

      entriesStorage.store(updatedEntries);

      return updatedEntries;
    });
  };

  const handleEntryEdited = (id, entryIntent) => {
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

    goToDashboard();
  };

  return (
    <>
      <Header
        language={language}
        onLanguageChanged={(language) => setLanguage(language)}
      />

      <main className={cx.main}>
        {viewState.name === "Dashboard" && (
          <Dashboard
            entries={entries}
            onEntryEdit={goToEditEntry}
            onEntryDelete={handleEntryDeleted}
            onEntryNew={goToNewEntry}
          />
        )}

        {viewState.name === "New Entry" && (
          <NewEntryForm
            onSubmit={handleNewEntrySubmitted}
            goToDashboard={goToDashboard}
          />
        )}

        {viewState.name === "Edit Entry" && (
          <EditEntryForm
            entry={entries.find((entry) => entry.id === viewState.id)}
            goToDashboard={goToDashboard}
            onSubmit={(entryIntent) =>
              handleEntryEdited(viewState.id, entryIntent)
            }
          />
        )}
      </main>
    </>
  );
}

export default App;
