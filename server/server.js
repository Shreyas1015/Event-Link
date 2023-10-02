const express = require("express");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const JWTSecreteKey = require("./controllers/jwtToken");
const { login, signUp } = require("./controllers/authController");
const {
  adminProfileID,
  adminProfileSetup,
  addPosts,
  editPosts,
  putPostData,
  getAdminData,
  deletePosts,
  particularPosts,
  getAdminPosts,
  feedBack,
  getAdminProfileData,
} = require("./controllers/admin_controllers");
const {
  userProfleID,
  userProfileSetup,
  userData,
  getAllPosts,
  userFeedBack,
  getUserProfileData,
} = require("./controllers/user_controllers");
const { forgetPass, resetPass } = require("./controllers/otpControllers");

const {
  getAdminCount,
  getUsersCount,
  getAllPostsCount,
  getAllFeedbackCount,
  getAdminTeamData,
  deleteAdmin,
  getIndividualAdminTeamData,
  postIndividualAdminTeamData,
  getUserTeamData,
  deleteUser,
  getIndividualUserTeamData,
  postIndividualUserTeamData,
  getAllClientData,
  deleteClient,
  addClient,
  getAllFeedbacks,
  getResolvedFeedbacks,
  updateFeedback,
  updateUserType,
} = require("./controllers/developer_controllers");
const { auth } = require("google-auth-library");

const port = 5000;

const app = express();

// MiddleWares
const allowedOrigins = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

// JWT authentication token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Received Token:", token); // Log received token

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  } else {
    jwt.verify(token, JWTSecreteKey, (err, user) => {
      if (err) {
        console.log("Token Verification Error:", err);
        return res.status(403).json({ error: "Forbidden" });
      }
      req.userID = user.userId;
      next();
    });
  }
}

// Login Form
app.post("/login", login);

// Register Form
app.post("/signup", signUp);

//Profile SetUp
app.get("/get_admin_id", adminProfileID);

//Get User PRofile Id
app.get("/get_user_profile_id", userProfleID);

// Profile setup endpoint
app.post("/profile_setup", authenticateToken, adminProfileSetup);

//User Profile Setup
app.post("/user_profile_setup", authenticateToken, userProfileSetup);

//Add Post
app.post("/add_posts", authenticateToken, addPosts);

// Edit Post (GET)
app.get("/edit_post/:post_id", authenticateToken, editPosts);

//Show Posts
app.get("/show_post/:post_id", authenticateToken, particularPosts);

// Edit Post (PUT)
app.put("/edit_post/:post_id", authenticateToken, putPostData);

// Route to get dashboard data
app.get("/get_admin_data", authenticateToken, getAdminData);

//Get user Data
app.get("/get_user_data", authenticateToken, userData);

// Delete Post
app.delete("/delete_post/:post_id", authenticateToken, deletePosts);

// Route to get posts
app.get("/get_posts", authenticateToken, getAdminPosts);

//TO Get all Posts
app.get("/get_all_posts", authenticateToken, getAllPosts);

//Forget Password
app.post("/forget_password", forgetPass);

//Reset Password
app.post("/reset_password", resetPass);

//Feedback
app.post("/submit_feedback", feedBack);

//User Feedback
app.post("/submit_user_feedback", userFeedBack);

//admin profile data
app.get("/get_admin_profile_data", authenticateToken, getAdminProfileData);

//user profile data
app.get("/get_user_profile_data", authenticateToken, getUserProfileData);

//Count of admins
app.get("/get_no_of_admins", authenticateToken, getAdminCount);

//Count of users
app.get("/get_no_of_users", authenticateToken, getUsersCount);

//Count of posts
app.get("/get_no_of_posts", authenticateToken, getAllPostsCount);

//Count of feedbacks
app.get("/get_no_of_feedbacks", authenticateToken, getAllFeedbackCount);

//Admin Team Data
app.get("/getAdminTeamData", authenticateToken, getAdminTeamData);

// Delete Post
app.delete("/delete_admin/:admin_id/:uid", authenticateToken, deleteAdmin);

//Get Individual Admin Data
app.get(
  "/getIndividualAdminTeamData/:admin_id",
  authenticateToken,
  getIndividualAdminTeamData
);

//Uodate Individual Admin Data
app.post(
  "/postIndividualAdminTeamData",
  authenticateToken,
  postIndividualAdminTeamData
);

//User Team Data
app.get("/getUserTeamData", authenticateToken, getUserTeamData);

// Delete Post
app.delete("/delete_user/:user_profile_id/:uid", authenticateToken, deleteUser);

//Get Individual User Data
app.get(
  "/getIndividualUserTeamData/:user_profile_id",
  authenticateToken,
  getIndividualUserTeamData
);

//Uodate Individual User Data
app.post(
  "/postIndividualUserTeamData",
  authenticateToken,
  postIndividualUserTeamData
);

//User Team Data
app.get("/getAllClientData", authenticateToken, getAllClientData);

// Delete Post
app.delete("/delete_client/:uid", authenticateToken, deleteClient);

//Add Client
app.post("/add_client", authenticateToken, addClient);

//get all feedbacks
app.get("/get_all_feedbacks", authenticateToken, getAllFeedbacks);

//get resolved feedbacks
app.get("/get_resolved_feedbacks", authenticateToken, getResolvedFeedbacks);

//update feedback
app.put("/update_feedback/:fid", authenticateToken, updateFeedback);

//update user type
app.put("/update_user_type/:uid", authenticateToken, updateUserType);

app.listen(port, () => {
  console.log("Server Is Running on PORT :", port);
});
