import React, { useEffect, useState } from "react";
import DasboardNavbar from "../Components/DasboardNavbar";
import AdminSidebar from "../Components/AdminSidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = ({ token }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const uid = new URLSearchParams(location.search).get("uid");
  const adminID = new URLSearchParams(location.search).get("admin_id");

  console.log("Received Token:", token);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    titleImage: "",
    collegeName: "",
    contact: "",
    email: "",
  });

  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching dashboard data and posts...");

        const headers = {
          Authorization: `Bearer ${storedToken}`,
        };

        const dashboardResponse = await axios.get(
          `http://localhost:5000/get_admin_data?uid=${uid}&admin_id=${adminID}`,
          { headers }
        );
        console.log("Dashboard data response:", dashboardResponse.data);
        setDashboardData(dashboardResponse.data.adminData);

        const postsResponse = await axios.get(
          `http://localhost:5000/get_posts?uid=${uid}&admin_id=${adminID}`,
          { headers }
        );
        console.log("Posts response:", postsResponse.data);
        setPosts(postsResponse.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }

    if (uid && adminID && storedToken) {
      fetchData();
    }
  }, [uid, adminID, storedToken]);

  const BackToLogin = () => {
    navigate("/");
  };

  const handleDelete = async (postID) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(`http://localhost:5000/delete_post/${postID}`, {
        headers,
      });

      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.posts_id !== postID)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
    }
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

  if (!storedToken) {
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
            style={{ backgroundColor: "#272727", height: "auto" }}
          >
            <AdminSidebar uid={uid} adminID={adminID} />
          </div>
          <div className="col-lg-9 col-md-9 col-sm-9 col-9">
            <div className="container my-3">
              <div className="dashboard-info">
                <img
                  src={decodeURIComponent(dashboardData.titleImage)}
                  alt="Dashboard Title"
                />
                <h3>{dashboardData.collegeName}</h3>
                <p>Contact: {dashboardData.contact}</p>
                <p>Email: {dashboardData.email}</p>
              </div>
              <hr />
              <h2>YOUR POSTS</h2>
              <div className="row">
                {isLoading ? (
                  <p>Loading posts...</p>
                ) : (
                  posts.map((post) => (
                    <div className="col-lg-4" key={post.posts_id}>
                      <div className="card my-3" style={{ width: "18rem" }}>
                        <img
                          src={post.cover_img}
                          className="card-img-top img-fluid"
                          alt="..."
                        />
                        <div className="card-body">
                          <h5 className="card-title">{post.event_name}</h5>
                          <p className="card-text">{post.event_desc}</p>
                          <Link
                            to={`/edit_post?post_id=${post.posts_id}`}
                            className="post-link text-decoration-none"
                          >
                            <button className="btn blue-buttons me-4">
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(post.posts_id)}
                            className="btn blue-buttons ms-4"
                          >
                            Delete Post
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
