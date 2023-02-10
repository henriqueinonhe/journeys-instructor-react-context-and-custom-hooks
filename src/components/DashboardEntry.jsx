import cx from "./DashboardEntry.module.scss";
import { format } from "date-fns";
import { Button } from "./Button";
import { useTranslation } from "../hooks/useTranslation";
import { useViewState } from "../hooks/useViewState";

export const DashboardEntry = ({ entry, onDelete }) => {
  const { goToEditEntry } = useViewState();

  const { label, date, amount } = entry;

  const { formatDate, formatNumber } = useTranslation();

  return (
    <li className={cx.container}>
      <div className={cx.leftRow}>
        <span>{label}</span>

        <span>{formatDate(date)}</span>
      </div>

      <div className={cx.rightRow}>
        <span>$ {formatNumber(amount)}</span>

        <div className={cx.buttonContainer}>
          <Button
            className={cx.editButton}
            onClick={() => goToEditEntry(entry.id)}
          >
            ✏️
          </Button>

          <Button className={cx.deleteButton} onClick={onDelete}>
            🗑️
          </Button>
        </div>
      </div>
    </li>
  );
};
