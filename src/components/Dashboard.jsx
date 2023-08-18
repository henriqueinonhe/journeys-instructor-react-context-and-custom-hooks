import { NewEntryButton } from "./NewEntryButton";
import cx from "./Dashboard.module.scss";
import { DashboardEntry } from "./DashboardEntry";
import { isAfter } from "date-fns";

export const Dashboard = ({
  entries,
  onEntryNew,
  onEntryEdit,
  onEntryDelete,
  language,
}) => {
  const sortedEntries = entries.sort((first, second) =>
    isAfter(second.date, first.date) ? -1 : 1
  );

  return (
    <div>
      <div className={cx.newEntryButtonRow}>
        <NewEntryButton onClick={onEntryNew} language={language} />
      </div>

      <ul className={cx.entryList}>
        {sortedEntries.map((entry) => (
          <DashboardEntry
            key={entry.id}
            entry={entry}
            onEdit={() => onEntryEdit(entry.id)}
            onDelete={() => onEntryDelete(entry.id)}
          />
        ))}
      </ul>
    </div>
  );
};
