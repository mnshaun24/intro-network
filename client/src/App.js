import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "pages/homePage";
import LoginPage from "pages/loginPage";
import ProfilePage from "pages/profilePage";
import { useState } from "react";
import { ThemeContext } from "state/context";

function App() {
  // Theme change logic
  function getLocalStorageTheme() {
    console.log(localStorage);
    return localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "light";
  }

  function setLocalStorageTheme() {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }

  const [theme, setTheme] = useState(getLocalStorageTheme);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
    setLocalStorageTheme();
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme} className="app">
        <label className="allText">
          {theme === "light" ? "Light Mode" : "Dark Mode"}
        </label>
        <input
          type="checkbox"
          className="toggle"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
