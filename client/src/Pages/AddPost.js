import React, { useState } from "react";
import DasboardNavbar from "../Components/DasboardNavbar";
import AdminSidebar from "../Components/AdminSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AddPost = ({ token }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const uid = new URLSearchParams(location.search).get("uid");
  const adminID = new URLSearchParams(location.search).get("admin_id");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    cover_img: "", // Change initial value to null
    event_name: "",
    event_desc: "",
    category_id: "",
    contact: "",
    email: "",
    google_form_link: "",
    uid: uid,
    admin_id: adminID,
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === "cover_img") {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [name]: e.target.files[0], // Store selected file object
  //     }));
  //   } else {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${token}`, // Send token in the headers
      };
      console.log("Image URL:", formData.cover_img); // Log the image URL
      await axios.post("http://localhost:5000/add_posts", formData, {
        headers,
      });

      alert("Post Added Successfully");
      setFormData({
        cover_img: "", // Reset cover_img to null
        event_name: "",
        event_desc: "",
        category_id: "",
        contact: "",
        email: "",
        google_form_link: "",
      });

      // Redirect to the dashboard after adding the post
      navigate(`/dashboard?uid=${uid}&admin_id=${adminID}`);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred during post addition.");
      }
    }
  };

  const BackToLogin = () => {
    navigate("/login");
  };

  if (!(uid && adminID)) {
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
          <h2>LOGIN TO ACCESS FURTHER</h2>
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
            className="col-lg-3 col-md-3 col-sm-3 col-3 sidebar"
            style={{ backgroundColor: "#272727", height: "110vh" }}
          >
            <AdminSidebar />
          </div>
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
                <input
                  type="hidden"
                  name="admin_id"
                  value={formData.admin_id} // Use the UID from the URL query parameter
                />
                <div className="mb-3">
                  <label htmlFor="cover_img" className="form-label fw-bolder ">
                    Cover Img :
                  </label>
                  <input
                    type="file"
                    name="cover_img"
                    className="form-control admin-profile-inputs"
                    id="cover_img"
                    required
                    onChange={handleChange}
                    value={formData.cover_img}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="event_name" className="form-label fw-bolder ">
                    Event Name :
                  </label>
                  <input
                    type="text"
                    name="event_name"
                    className="form-control admin-profile-inputs"
                    id="event_name"
                    required
                    onChange={handleChange}
                    value={formData.event_name}
                  />
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    name="event_desc"
                    className="form-control admin-profile-inputs"
                    placeholder="Leave a comment here"
                    id="event_desc"
                    style={{ height: 100 }}
                    onChange={handleChange}
                    value={formData.event_desc}
                  />
                  <label htmlFor="event_desc">Event Description</label>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="category_id"
                    className="form-label fw-bolder "
                  >
                    Category :
                  </label>
                  <select
                    name="category_id"
                    className="form-control admin-profile-inputs"
                    id="category_id"
                    required
                    onChange={handleChange}
                    value={formData.category_id} // Set the selected value using the state value
                    aria-label="Default select example"
                  >
                    <option value="">Open this select menu</option>
                    <option value="1">Cultural</option>
                    <option value="2">Social</option>
                    <option value="3">Technical</option>
                    <option value="4">Placement</option>
                  </select>
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
                    required
                    onChange={handleChange}
                    value={formData.contact}
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
                    required
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="google_form_link"
                    className="form-label fw-bolder "
                  >
                    Google Form Link :
                  </label>
                  <input
                    type="url"
                    name="google_form_link"
                    className="form-control admin-profile-inputs"
                    id="google_form_link"
                    required
                    onChange={handleChange}
                    value={formData.google_form_link}
                  />
                </div>
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

export default AddPost;
