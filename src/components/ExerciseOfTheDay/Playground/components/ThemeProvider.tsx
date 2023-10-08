/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactNode, createContext, useState } from "react";

export const ThemeContext = createContext<
  { theme: string; toggleTheme: () => void } | any
>(null);

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`ThemeProvider ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
