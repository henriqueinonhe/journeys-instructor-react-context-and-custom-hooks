import cx from "./Header.module.scss";
import { useTranslation } from "../hooks/useTranslation";

export const Header = ({ language, onLanguageChanged }) => {
  const { t } = useTranslation();

  return (
    <header className={cx.container}>
      <h1 className={cx.title}>{t("appTitle")}</h1>

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
