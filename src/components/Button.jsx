import cx from "./Button.module.scss";

export const Button = ({
  onClick,
  children,
  className,
  "data-testid": dataTestId,
}) => {
  return (
    <button
      className={`${cx.container} ${className}`}
      onClick={onClick}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
};
