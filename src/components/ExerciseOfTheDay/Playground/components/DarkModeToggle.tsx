import React, { FC, useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

const DarkModeToggle: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="switch">
      <label htmlFor="toggle">
        <input
          id="toggle"
          className="toggle-switch"
          type="checkbox"
          checked={theme === "light"}
          onChange={toggleTheme}
        />
        <div className="sun-moon">
          <div className="dots"></div>
        </div>
        <div className="background">
          <div className="stars1"></div>
          <div className="stars2"></div>
        </div>
      </label>
    </div>
  );
};

export default DarkModeToggle;
