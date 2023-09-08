import cx from "./DashboardEntry.module.scss";
import { Button } from "./Button";
import { useTranslation } from "../hooks/useTranslation";
import { useViewState } from "../hooks/useViewState";

export const DashboardEntry = ({ entry, onDelete }) => {
  const { goToEditEntry } = useViewState();

  const { label, date, amount } = entry;

  const { formatDate, formatNumber } = useTranslation();

  return (
    <li className={cx.container} data-testid="dashboardEntry">
      <div className={cx.leftRow}>
        <span data-testid="dashboardEntryLabel">{label}</span>

        <span data-testid="dashboardEntryDate">{formatDate(date)}</span>
      </div>

      <div className={cx.rightRow}>
        <span data-testid="dashboardEntryAmount">$ {formatNumber(amount)}</span>

        <div className={cx.buttonContainer}>
          <Button
            className={cx.editButton}
            onClick={() => goToEditEntry(entry.id)}
            data-testid="dashboardEntryEditButton"
          >
            ✏️
          </Button>

          <Button
            className={cx.deleteButton}
            onClick={onDelete}
            data-testid="dashboardEntryDeleteButton"
          >
            🗑️
          </Button>
        </div>
      </div>
    </li>
  );
};
