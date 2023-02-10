import { useContext, useRef } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { wait } from "../utils/wait";

export const useNotification = () => {
  const value = useContext(NotificationContext);

  if (value === undefined) {
    throw new Error("You forgot NotificationProvider!");
  }

  const { state, setState, runIdRef } = value;

  const showNotification = async (message) => {
    const runId = Math.random();
    runIdRef.current = runId;

    if (state.show) {
      clearNotification();
    }

    await wait(300);

    if (runId !== runIdRef.current) {
      return;
    }

    setState({
      show: true,
      message: message,
    });

    await wait(2000);

    if (runId !== runIdRef.current) {
      return;
    }

    clearNotification();
  };

  const clearNotification = () => {
    setState((state) => ({
      show: false,
      message: state.message,
    }));
  };

  return {
    showNotification,
    clearNotification,
  };
};
