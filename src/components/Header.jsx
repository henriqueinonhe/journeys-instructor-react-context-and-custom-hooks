import cx from "./Header.module.scss";
import { translate } from "../translations/translate";

export const Header = ({ language, onLanguageChanged }) => {
  return (
    <header className={cx.container}>
      <h1 className={cx.title}>{translate(language, "appTitle")}</h1>

      <select
        value={language}
        onChange={(event) => onLanguageChanged(event.target.value)}
        className={cx.languageSelector}
      >
        <option value="en">EN</option>
        <option value="pt">PT</option>
      </select>
    </header>
  );
};
