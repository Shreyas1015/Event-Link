// import axios from "axios";
// import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import DasboardNavbar from "../../Components/DasboardNavbar";
import DeveloperSidebar from "../../Components/DeveloperSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
// import UserSidebar from "../../Components/UserSidebar";

const firebaseConfig = {
  apiKey: "AIzaSyC3-kql5gHN8ZQRaFkrwWDBE8ksC5SbdAk",
  authDomain: "event-link-b0613.firebaseapp.com",
  projectId: "event-link-b0613",
  storageBucket: "event-link-b0613.appspot.com",
  messagingSenderId: "21608943759",
  appId: "1:21608943759:web:b96c788f67bcab9ee720fa",
  measurementId: "G-ZMGC41BPHD",
};

firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();
const DeveloperDashboard = ({ token }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const uid = new URLSearchParams(location.search).get("uid");
  console.log("UserId: ", uid);
  const [adminCount, setAdminCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  async function fetchNoOfAdmins() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/get_no_of_admins`
      );
      if (res.status === 200) {
        setAdminCount(res.data.adminCount);
      } else {
        console.error("Server Error:", res.data.message);
        alert("Server Error");
      }
    } catch (error) {
      console.error("Request Error:", error.message);
      alert("Error in fetching data");
    }
  }

  async function fetchNoOfUsers() {
    console.log("fetching users");
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/get_no_of_users`
      );
      if (res.status === 200) {
        setUsersCount(res.data.usersCount);
      } else {
        console.error("Server Error:", res.data.message);
        alert("Server Error");
      }
    } catch (error) {
      console.error("Request Error:", error.message);
      alert("Error in fetching data");
    }
  }

  useEffect(() => {
    fetchNoOfAdmins();
    fetchNoOfUsers();
    console.log("Fetching Admin Count");
  }, []);

  const BackToLogin = () => {
    navigate("/");
  };

  if (!uid) {
    return (
      <>
        <div className="container text-center fw-bold">
          <h2>INVALID URL. Please provide a valid UID.</h2>
          <button onClick={BackToLogin} className="btn blue-buttons">
            Back to Login
          </button>
        </div>
      </>
    );
  }
  if (!token) {
    return (
      <>
        <div className="container text-center fw-bold">
          <h2>You must be logged in to access this page.</h2>
          <button onClick={BackToLogin} className="btn blue-buttons">
            Back to Login
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <DasboardNavbar />
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-lg-2 col-md-2 col-sm-3 col-3 sidebar"
            style={{ backgroundColor: "#272727", height: "auto" }}
          >
            {/* Sidebar */}
            <DeveloperSidebar />
          </div>
          {/* Analysis */}
          <div className="col-lg-9 col-md-9 col-sm-9 col-9">
            <div className="container my-3">
              <h1 className="fw-bolder">Dashboard</h1>
              <hr />
              <p>Total Admins: {adminCount}</p>
              <p>Total Users: {usersCount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperDashboard;
