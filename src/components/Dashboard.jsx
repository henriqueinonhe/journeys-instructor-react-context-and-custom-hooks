import { NewEntryButton } from "./NewEntryButton";
import cx from "./Dashboard.module.scss";
import { DashboardEntry } from "./DashboardEntry";
import { isAfter } from "date-fns";
import { useViewState } from "../hooks/useViewState";

export const Dashboard = ({ entries, onEntryDelete }) => {
  const { goToNewEntry } = useViewState();

  const sortedEntries = entries.sort((first, second) =>
    isAfter(second.date, first.date) ? -1 : 1
  );

  return (
    <div>
      <div className={cx.newEntryButtonRow}>
        <NewEntryButton onClick={goToNewEntry} />
      </div>

      <ul className={cx.entryList}>
        {sortedEntries.map((entry) => (
          <DashboardEntry
            key={entry.id}
            entry={entry}
            onDelete={() => onEntryDelete(entry.id)}
          />
        ))}
      </ul>
    </div>
  );
};
