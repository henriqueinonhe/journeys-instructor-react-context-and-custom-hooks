import { useEffect } from "react";

export const useKeyPressed = (key, callback) => {
  useEffect(() => {
    const innerCallback = (event) => {
      if (event.key === key) {
        callback();
      }
    };

    window.addEventListener("keydown", innerCallback);
    window.addEventListener("keyup", innerCallback);

    return () => {
      window.removeEventListener("keydown", innerCallback);
      window.removeEventListener("keyup", innerCallback);
    };
  }, [key, callback]);
};
