import { translate } from "../translations/translate";
import { Button } from "./Button";
import cx from "./SaveButton.module.scss";

export const SaveButton = ({ language }) => {
  return (
    <Button className={cx.button} type="submit">
      {translate(language, "saveButton")}
    </Button>
  );
};
