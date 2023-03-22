import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "pages/homePage";
import LoginPage from "pages/loginPage";
import ProfilePage from "pages/profilePage";
import { createContext } from "react";
import { useState } from "react";
export const ThemeContext = createContext(null);

function App() {

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))
  };

  return (
<ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div id={theme} className="app">
      <label className="allText">{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
      <input type="checkbox" className="toggle" onChange={toggleTheme} checked={theme === "dark"} />
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
