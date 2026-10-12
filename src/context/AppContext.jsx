import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState("Vinoth Kumar");

  function toggleTheme() {
    setDarkMode((current) => !current);
  }

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleTheme,
        userName,
        setUserName
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}