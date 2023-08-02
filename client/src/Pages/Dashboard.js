import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ token }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
    alert("Logged Out Successfully");
  };

  if (!token) {
    return (
      <>
        <div className="container text-center fw-bold">
          <h2>LOGIN TO ACCESS FURTHER</h2>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container-fluid">
        <h2>Dashboard</h2>
        <button className="btn btn-dark" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Dashboard;
