import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import "./styles/global.scss";
import cx from "./App.module.scss";
import { NewEntryForm } from "./components/NewEntryForm";
import { EditEntryForm } from "./components/EditEntryForm";
import { LanguageProvider } from "./context/LanguageProvider";
import { ViewStateProvider } from "./context/ViewStateProvider";
import { useViewState } from "./hooks/useViewState";
import { EntriesProvider } from "./context/EntriesProvider";
import { NotificationProvider } from "./context/NotificationProvider";

function App() {
  const { viewState } = useViewState();

  return (
    <>
      <Header />

      <main className={cx.main}>
        {viewState.name === "Dashboard" && <Dashboard />}

        {viewState.name === "New Entry" && <NewEntryForm />}

        {viewState.name === "Edit Entry" && <EditEntryForm />}
      </main>
    </>
  );
}

const AppWithProviders = () => (
  <LanguageProvider>
    <ViewStateProvider>
      <EntriesProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </EntriesProvider>
    </ViewStateProvider>
  </LanguageProvider>
);

export default AppWithProviders;
