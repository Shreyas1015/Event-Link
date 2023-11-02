const express = require("express");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const JWTSecreteKey = require("./src/utils/generateSecretKey");
const { login, signUp } = require("./src/controllers/authController");
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
} = require("./src/controllers/admin_controllers");
const {
  userProfleID,
  userProfileSetup,
  userData,
  getAllPosts,
  userFeedBack,
  getUserProfileData,
} = require("./src/controllers/user_controllers");
const { forgetPass, resetPass } = require("./src/controllers/otpControllers");

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
  recentFeedbacks,
  barGraph,
  pieChart,
  lineChart,
} = require("./src/controllers/developer_controllers");
const authenticateToken = require("./src/middlewares/authMiddleware");
const corsOptions = require("./src/middlewares/corsMiddleware");
const port = 5000;

const app = express();

// MiddleWares

app.use(cors(corsOptions));
app.use(express.json());

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

// User Team Data including Excel and CSV formats
app.get("/getUserTeamData", authenticateToken, getUserTeamData);

// Delete Post
app.delete("/delete_user/:user_profile_id/:uid", authenticateToken, deleteUser);

//Get Individual User Data
app.get(
  "/getIndividualUserTeamData/:user_profile_id",
  authenticateToken,
  getIndividualUserTeamData
);

//Update Individual User Data
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

//get recent feedbacks
app.get("/get_recent_feedbacks", authenticateToken, recentFeedbacks);

//bar graph
app.get("/getBarGraph", authenticateToken, barGraph);

//pie chart
app.get("/getPieChart", authenticateToken, pieChart);

//line chart
app.get("/getLineChart", authenticateToken, lineChart);

app.listen(port, () => {
  console.log("Server Is Running on PORT :", port);
});
