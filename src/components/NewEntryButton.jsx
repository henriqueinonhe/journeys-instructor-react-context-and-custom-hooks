import { translate } from "../translations/translate";
import { Button } from "./Button";
import cx from "./NewEntryButton.module.scss";

export const NewEntryButton = ({ onClick, language }) => {
  return (
    <Button className={cx.container} onClick={onClick}>
      ➕ {translate(language, "newEntryButton")}
    </Button>
  );
};
