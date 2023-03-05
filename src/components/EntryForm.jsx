import { addMinutes, format } from "date-fns";
import { useState, useId, useContext, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { translate } from "../translations/translate";
import { BackButton } from "./BackButton";
import cx from "./EntryForm.module.scss";
import { Input } from "./Input";
import { SaveButton } from "./SaveButton";

export const EntryForm = ({ title, goToDashboard, onSubmit, entry }) => {
  const initialLabel = entry?.label ?? "";
  const initialAmount = entry?.amount?.toString() ?? "";
  const initialDate = entry
    ? format(entry.date, "yyyy-MM-dd")
    : format(new Date(), "yyyy-MM-dd");

  const [label, setLabel] = useState(initialLabel);
  const [amount, setAmount] = useState(initialAmount);
  const [date, setDate] = useState(initialDate);

  const labelId = useId();
  const amountId = useId();
  const dateId = useId();

  const language = useContext(LanguageContext);

  useEffect(() => {
    const callback = (event) => {
      if (event.key === "Escape") {
        goToDashboard();
      }
    };

    window.addEventListener("keydown", callback);
    window.addEventListener("keyup", callback);

    return () => {
      window.removeEventListener("keydown", callback);
      window.removeEventListener("keyup", callback);
    };
  }, []);

  useEffect(() => {
    const callback = (event) => {
      if (event.key === "Enter") {
        const entryIntent = {
          label,
          amount: Number(amount),
          date: addMinutes(new Date(date), new Date().getTimezoneOffset()),
        };

        onSubmit(entryIntent);
      }
    };

    window.addEventListener("keydown", callback);
    window.addEventListener("keyup", callback);

    return () => {
      window.removeEventListener("keydown", callback);
      window.removeEventListener("keyup", callback);
    };
  }, [label, amount, date]);

  return (
    <>
      <BackButton onClick={goToDashboard} />

      <form
        className={cx.form}
        onSubmit={(event) => {
          event.preventDefault();

          const entryIntent = {
            label,
            amount: Number(amount),
            date: addMinutes(new Date(date), new Date().getTimezoneOffset()),
          };

          onSubmit(entryIntent);
        }}
      >
        <h2 className={cx.title}>{title}</h2>

        <div className={cx.field}>
          <Input
            id={labelId}
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            label={translate(language, "labelInput")}
          />
        </div>

        <div className={cx.field}>
          <Input
            id={amountId}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            label={translate(language, "amountInput")}
          />
        </div>

        <div className={cx.field}>
          <Input
            id={dateId}
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            label={translate(language, "dateInput")}
          />
        </div>

        <div className={cx.saveButtonContainer}>
          <SaveButton />
        </div>
      </form>
    </>
  );
};
