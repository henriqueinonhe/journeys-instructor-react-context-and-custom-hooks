import cx from "./Notification.module.scss";

export const Notification = ({ state }) => {
  const { message, show } = state;

  return (
    <div className={`${cx.container} ${show ? cx.show : ""}`}>❕ {message}</div>
  );
};
