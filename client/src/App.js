import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import AddPost from "./Pages/AddPost";
import AdminProfile from "./Pages/AdminProfile";
import SignUpPage from "./Pages/SignUpPage";

const App = () => {
  const [token, setToken] = useState("");

  const handleLogin = (newToken) => {
    setToken(newToken);
    window.localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  useEffect(() => {
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
            path="/signup"
            element={<SignUpPage handleLogin={handleLogin} token={token} />}
          />
          <Route
            path="/adminprofile"
            element={<AdminProfile handleLogout={handleLogout} token={token} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard handleLogout={handleLogout} token={token} />}
          />
          <Route
            path="/addpost"
            element={<AddPost handleLogout={handleLogout} token={token} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
