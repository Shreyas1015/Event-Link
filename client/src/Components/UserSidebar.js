import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const uid = new URLSearchParams(location.search).get("uid");
  const [UserProfileID, setUserProfileID] = useState("");

  useEffect(() => {
    async function fetchUserProfileID() {
      try {
        const response = await axios.get(
          `http://localhost:5000/get_user_profile_id?uid=${uid}`
        );
        const fetchedUserProfileID = response.data.user_profile_id;
        setUserProfileID(fetchedUserProfileID);
      } catch (error) {
        console.error("Error fetching admin_id:", error);
        // Handle error
      }
    }
    fetchUserProfileID();
  }, [uid]);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
    alert("Logged Out Successfully");
  };

  return (
    <>
      {/* My Profile */}
      <ul className="m-4 p-0" style={{ listStyle: "none" }}>
        <Link className="text-decoration-none" to={`/userprofile?uid=${uid}`}>
          <li className="py-3 px-3 sidebar-li my-2 blue-buttons rounded-3">
            <i className="fa-solid fa-layer-group" /> My Profile
          </li>
        </Link>
        {/* Render the Dashboard link only if UserProfileID is available */}
        {UserProfileID && (
          <Link
            className="text-decoration-none"
            to={`/userdashboard?uid=${uid}&user_profile_id=${UserProfileID}`}
          >
            <li className="py-3 px-3 sidebar-li my-2 blue-buttons rounded-3">
              <i className="fa-solid fa-layer-group" /> Dashboard
            </li>
          </Link>
        )}

        <li
          className="py-3 px-3 sidebar-li my-2 blue-buttons rounded-3"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-arrow-right-from-bracket" /> Logout
        </li>
      </ul>
    </>
  );
};

export default UserSidebar;
