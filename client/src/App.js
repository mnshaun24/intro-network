import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "pages/homePage";
import LoginPage from "pages/loginPage";
import ProfilePage from "pages/profilePage";
import FeedPage from "pages/feedPage";
import { useState } from "react";
import { ThemeContext } from "state/context";
import { useSelector } from "react-redux";

function App() {
  // Theme change logic
  function getLocalStorageTheme() {
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

  const isAuth = Boolean(useSelector((state) => state.token));

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

        {/* //TODO Root path is set as welcome page. Feed is set as post feed. Add blogs */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/feed"
              element={isAuth ? <FeedPage /> : <Navigate to="/" />}
            />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
