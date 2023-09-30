import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import AddPost from "./Pages/AddPost";
import AdminProfile from "./Pages/AdminProfile";
import SignUpPage from "./Pages/SignUpPage";
import EditPost from "./Pages/EditPost";
import UserProfile from "./Pages/UserProfile";
import UserDashboard from "./Pages/UserDashboard";
import ShowPost from "./Pages/ShowPost";
import ForgetPass from "./Pages/ForgetPass";
import ResetPass from "./Pages/ResetPass";
import Report from "./Pages/Report";
import UserReport from "./Pages/UserReport";
import DeveloperDashboard from "./Pages/Developer/DeveloperDashboard";

const App = () => {
  const [token, setToken, handleSearch] = useState("");

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
            path="/"
            element={<LoginPage handleLogin={handleLogin} token={token} />}
          />
          <Route
            path="/signup"
            element={<SignUpPage handleLogin={handleLogin} token={token} />}
          />
          {localStorage.getItem("user_type") == 1 ? (
            <Route
              path="/adminprofile"
              element={
                <AdminProfile handleLogout={handleLogout} token={token} />
              }
            />
          ) : localStorage.getItem("user_type") == 2 ? (
            <Route
              path="/userprofile"
              element={
                <UserProfile handleLogout={handleLogout} token={token} />
              }
            />
          ) : localStorage.getItem("user_type") == 3 ? (
            <Route
              path="/developerdashboard"
              element={
                <DeveloperDashboard handleLogout={handleLogout} token={token} />
              }
            />
          ) : (
            <h2>Please Login</h2>
          )}

          <Route
            path="/dashboard"
            element={
              <Dashboard
                handleLogout={handleLogout}
                token={token}
                onSearch={handleSearch}
              />
            }
          />
          <Route
            path="/userdashboard"
            element={
              <UserDashboard handleLogout={handleLogout} token={token} />
            }
          />
          <Route
            path="/show_post"
            element={<ShowPost handleLogout={handleLogout} token={token} />}
          />
          <Route
            path="/addpost"
            element={<AddPost handleLogout={handleLogout} token={token} />}
          />
          <Route
            path="/edit_post"
            element={<EditPost handleLogout={handleLogout} token={token} />}
          />
          <Route
            path="/admin_feedback"
            element={<Report handleLogout={handleLogout} token={token} />}
          />
          <Route
            path="/user_feedback"
            element={<UserReport handleLogout={handleLogout} token={token} />}
          />
          <Route path="/forgetPass" element={<ForgetPass />} />
          <Route path="/resetPass" element={<ResetPass />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
