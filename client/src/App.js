import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  const [token, setToken] = useState("");

  // Function to set token in state and localStorage
  const handleLogin = (newToken) => {
    setToken(newToken);
    window.localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  useEffect(() => {
    // Check if token is available in localStorage on app load
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage handleLogin={handleLogin} token={token} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard handleLogout={handleLogout} token={token} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
