import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { translate } from "../translations/translate";
import { Button } from "./Button";
import cx from "./NewEntryButton.module.scss";

export const NewEntryButton = ({ onClick }) => {
  const language = useContext(LanguageContext);

  return (
    <Button className={cx.container} onClick={onClick}>
      ➕ {translate(language, "newEntryButton")}
    </Button>
  );
};
