import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; // Import useLocation
import DasboardNavbar from "../Components/DasboardNavbar";
import AdminSidebar from "../Components/AdminSidebar";
import axios from "axios";

const AdminProfile = ({ token }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const uid = new URLSearchParams(location.search).get("uid");
  console.log("UserId : ", uid);

  const [errorMessage, setErrorMessage] = useState("");
  const [adminID, setAdminID] = useState("");

  useEffect(() => {
    async function fetchAdminID() {
      try {
        const response = await axios.get(
          `http://localhost:5000/get_admin_id?uid=${uid}`
        );
        const fetchedAdminID = response.data.admin_id;
        console.log("Fetched admin ID:", fetchedAdminID);
        setAdminID(fetchedAdminID);
        console.log("Response from API:", response.data);
      } catch (error) {
        console.error("Error fetching admin_id:", error);
      }
    }
    fetchAdminID();
  }, [uid]);

  const [formData, setFormData] = useState({
    profile_img: "",
    uid: uid,
    college_name: "",
    email: "",
    contact: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const BackToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${token}`, // Send token in the headers
      };

      const response = await axios.post(
        "http://localhost:5000/profile_setup",
        formData,
        { headers }
      );

      alert("Profile SetUp Completed");
      const newAdminID = response.data.admin_id;

      if (adminID) {
        navigate(`/addpost?uid=${uid}&admin_id=${adminID}`);
      } else {
        setAdminID(newAdminID);
        navigate(`/addpost?uid=${uid}&admin_id=${newAdminID}`);
      }

      setFormData({
        profile_img: "",
        college_name: "",
        email: "",
        contact: "",
        address: "",
      });
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred during profile setup.");
      }
    }
  };
  // Check if the UID exists in the URL query parameter
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

  // Check if the user is not logged in (based on token)
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

  const updateNote = (
    <div className="mb-3">
      <p className="text-info">
        To Update Your Profile Fill out all the fields again and then Submit
      </p>
    </div>
  );

  return (
    <>
      <DasboardNavbar />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div
            className="col-lg-3 col-md-3 col-sm-3 col-3 sidebar"
            style={{ backgroundColor: "#272727", height: "89.6vh" }}
          >
            {/* My Profile */}
            <AdminSidebar />
          </div>
          {/* Analysis */}
          <div className="col-lg-9 col-md-9 col-sm-9 col-9">
            <div className="container my-3">
              <h1>Hello , User</h1>
              <hr />
              <form onSubmit={handleSubmit}>
                <input
                  type="hidden"
                  name="uid"
                  value={formData.uid} // Use the UID from the URL query parameter
                />
                <div className="mb-3">
                  <label
                    htmlFor="profile_img"
                    className="form-label fw-bolder "
                  >
                    Profile Pic :
                  </label>
                  <input
                    type="file"
                    name="profile_img"
                    className="form-control admin-profile-inputs"
                    id="profile_img"
                    onChange={handleChange}
                    value={formData.profile_img}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="college_name"
                    className="form-label fw-bolder "
                  >
                    College Name :
                  </label>
                  <input
                    type="text"
                    name="college_name"
                    className="form-control admin-profile-inputs"
                    id="college_name"
                    onChange={handleChange}
                    value={formData.college_name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bolder ">
                    Email :
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control admin-profile-inputs"
                    id="email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label fw-bolder ">
                    Contact :
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    className="form-control admin-profile-inputs"
                    placeholder="888 888 8888"
                    maxLength="10"
                    onChange={handleChange}
                    value={formData.contact}
                  />
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    name="address"
                    className="form-control admin-profile-inputs"
                    placeholder="Leave a comment here"
                    id="address"
                    style={{ height: 100 }}
                    onChange={handleChange}
                    value={formData.address}
                  />
                  <label htmlFor="address">College Address</label>
                </div>
                {updateNote}
                <div className="mb-3">
                  <h3>{errorMessage}</h3>
                </div>
                <div className="mb-3">
                  <input
                    type="submit"
                    className="btn blue-buttons admin-profile-inputs"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
