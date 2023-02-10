import { useMemo, useRef, useState } from "react";
import { Notification } from "../components/Notification";
import { NotificationContext } from "./NotificationContext";

export const NotificationProvider = ({ children }) => {
  const [state, setState] = useState({
    message: null,
    show: false,
  });

  const runIdRef = useRef();

  const value = useMemo(
    () => ({
      state,
      setState,
      runIdRef,
    }),
    [state]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Notification state={state} />
    </NotificationContext.Provider>
  );
};
