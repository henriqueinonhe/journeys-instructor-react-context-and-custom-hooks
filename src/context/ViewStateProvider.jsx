import { useMemo, useState } from "react";
import { ViewStateContext } from "./ViewStateContext";

export const ViewStateProvider = ({ children }) => {
  const [viewState, setViewState] = useState({
    name: "Dashboard",
  });

  const value = useMemo(
    () => ({
      viewState,
      setViewState,
    }),
    [viewState]
  );

  return (
    <ViewStateContext.Provider value={value}>
      {children}
    </ViewStateContext.Provider>
  );
};
