import React, { useState, useEffect } from "react";
import ReactSwitch from "react-switch";

const DarkMode = () => {
  const [themeState, setThemeState] = useState(false);

  const toggleTheme = () => {
    //  setTheme((curr) => (curr === "light" ? "dark" : "light"));

    setThemeState(!themeState);
  };

  useEffect(() => {
    const getTheme = localStorage.getItem("Theme");
    if (getTheme === "dark") {
      setThemeState(true);
    }
  }, []);

  useEffect(() => {
    if (themeState) {
      localStorage.setItem("Theme", "dark");
      document.body.classList.add("dark-mode");
    } else {
      localStorage.setItem("Theme", "light");
      document.body.classList.remove("dark-mode");
    }

    //   if (!token) {
    //     localStorage.setItem("Theme", "light");
    //     document.body.classList.remove("dark-mode");
    //   }
  }, [themeState]);
  return (
    <div className="flex items-center mode-switcher">
      <p className="mr-5">{themeState ? <>Dark Mode</> : <>Light Mode</>}</p>
      <ReactSwitch
        onChange={toggleTheme}
        checked={themeState === true}
        onColor="#ef6074"
        onHandleColor="#E72641"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
        className="react-switch"
        id="material-switch"
      />
    </div>
  );
};

export default DarkMode;
