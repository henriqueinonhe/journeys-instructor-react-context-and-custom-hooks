import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { wait } from "../utils/wait";

export const useNotification = () => {
  const value = useContext(NotificationContext);

  if (value === undefined) {
    throw new Error("You forgot NotificationProvider!");
  }

  const { setState, runIdRef } = value;

  const showNotification = async (message) => {
    const runId = Math.random();

    const anotherRunIsInProgress = () => runIdRef.current !== runId;

    if (anotherRunIsInProgress()) {
      clearNotification();
    }

    await wait(300);

    runIdRef.current = runId;

    if (anotherRunIsInProgress()) {
      return;
    }

    setState({
      show: true,
      message: message,
    });

    await wait(2000);

    if (anotherRunIsInProgress()) {
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
