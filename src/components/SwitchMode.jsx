import React, { useEffect, useState } from "react";
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";

const SwitchMode = () => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="hidden md:block">
      <div className="ml-2">
        <label className="swap swap-rotate">
          <input onClick={toggleTheme} type="checkbox" />
          <div className="swap-on">
            <FiMoon />
          </div>
          <div className="swap-off">
            <FiSun />
          </div>
        </label>
      </div>
    </div>
  );
};

export default SwitchMode;
