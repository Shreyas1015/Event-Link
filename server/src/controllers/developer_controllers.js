const asyncHand = require("express-async-handler");
const { connection } = require("../config/dbConfig");
const bcrypt = require("bcrypt");

const getAdminCount = asyncHand((req, res) => {
  const searchQuery =
    "SELECT COUNT( * ) AS Total_No_Of_Admins from users where user_type = 1";

  connection.query(searchQuery, (err, result) => {
    if (err) {
      console.error("Error Fetching NO. Of Admins", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length === 0) {
      console.log("No Admins Found In the Database");
      res.status(403).json({ message: "No Admins Found In the Database" });
    } else {
      console.log("Total_No_Of_Admin Fetched Successfully");
      res.status(200).json({
        message: "Data fetched successfully",
        adminCount: result[0].Total_No_Of_Admins,
      });
    }
  });
});

const getUsersCount = asyncHand((req, res) => {
  const searchQuery =
    "SELECT COUNT( * ) AS Total_No_Of_Users from users where user_type = 2";

  connection.query(searchQuery, (err, result) => {
    if (err) {
      console.error("Error Fetching NO. Of Users", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length === 0) {
      console.log("No User Found In the Database");
      res.status(403).json({ message: "No Users Found In the Database" });
    } else {
      console.log("Total_No_Of_Users Fetched Successfully");
      res.status(200).json({
        message: "Data fetched successfully",
        usersCount: result[0].Total_No_Of_Users,
      });
    }
  });
});

const getAllPostsCount = asyncHand((req, res) => {
  const countQuery = "SELECT COUNT(*) As Total_Posts FROM add_posts ;";

  connection.query(countQuery, (err, result) => {
    if (err) {
      console.error("Internal Server error :", err);
      res.status(500).json({ message: "Internal Server error" });
    }
    if (result.length === 0) {
      console.log("No Posts Found In the Database");
      res.status(403).json({ message: "No Posts Found In the Database" });
    } else {
      console.log("Total_Posts Fetched Successfully");
      res.status(200).json({
        message: "Data fetched successfully",
        postsCount: result[0].Total_Posts,
      });
    }
  });
});

const getAllFeedbackCount = asyncHand((req, res) => {
  const countQuery = "SELECT COUNT(*) As Total_Feedbacks FROM feedback ;";

  connection.query(countQuery, (err, result) => {
    if (err) {
      console.error("Internal Server error :", err);
      res.status(500).json({ message: "Internal Server error" });
    }
    if (result.length === 0) {
      console.log("No Feedbacks Found In the Database");
      res.status(403).json({ message: "No Feedbacks Found In the Database" });
    } else {
      console.log("Total_Feedbacks Fetched Successfully");
      res.status(200).json({
        message: "Data fetched successfully",
        feedbackCount: result[0].Total_Feedbacks,
      });
    }
  });
});

const getAdminTeamData = asyncHand((req, res) => {
  const query =
    "SELECT admin_id,profile_img,college_name,contact,email,address,uid from admin_profile ;";

  connection.query(query, (err, result) => {
    if (err) {
      console.error("Internal Server error :", err);
      res.status(500).json({ message: "Internal Server error" });
    }
    if (result.length === 0) {
      console.log("No Admin Data Found In the Database");
      res.status(403).json({ message: "No Admin Data Found In the Database" });
    } else {
      console.log("AdminData Fetched Successfully");
      const csvData = result.map((row) => Object.values(row).join(","));
      res.status(200).json({
        message: "Data fetched successfully",
        adminData: result,
        csvData: csvData.join("\n"),
      });
    }
  });
});

const deleteAdmin = asyncHand(async (req, res) => {
  const adminID = req.params.admin_id;
  const userID = req.params.uid;

  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const deleteAdminQuery = "DELETE FROM admin_profile WHERE admin_id = ?";
    const deleteUserQuery = "DELETE FROM users WHERE uid = ?";

    connection.query(deleteAdminQuery, [adminID], (err, resultAdmin) => {
      if (err) {
        connection.rollback(() => {
          console.error("Error deleting admin:", err);
          res.status(500).json({ error: "Internal Server Error" });
        });
        return;
      }

      connection.query(deleteUserQuery, [userID], (err, resultUser) => {
        if (err) {
          connection.rollback(() => {
            console.error("Error deleting user:", err);
            res.status(500).json({ error: "Internal Server Error" });
          });
          return;
        }

        connection.commit((err) => {
          if (err) {
            connection.rollback(() => {
              console.error("Error committing transaction:", err);
              res.status(500).json({ error: "Internal Server Error" });
            });
            return;
          }

          console.log("Admin and user deleted successfully");
          res
            .status(200)
            .json({ message: "Admin and User Deleted Successfully" });
        });
      });
    });
  });
});

const getIndividualAdminTeamData = asyncHand((req, res) => {
  const adminID = req.params.admin_id;
  const query = "SELECT * from admin_profile where admin_id = ?;";

  connection.query(query, [adminID], (err, result) => {
    if (err) {
      console.error("Internal Server error :", err);
      res.status(500).json({ message: "Internal Server error" });
    }
    if (result.length === 0) {
      console.log("No Admin Data Found In the Database");
      res.status(403).json({ message: "No Admin Data Found In the Database" });
    } else {
      console.log("AdminData Fetched Successfully");
      res.status(200).json({
        message: "Data fetched successfully",
        adminData: result[0],
      });
    }
  });
});

const postIndividualAdminTeamData = asyncHand(async (req, res) => {
  try {
    const adminData = req.body;
    const query =
      "UPDATE admin_profile SET profile_img = ?, college_name = ?, contact = ?,email = ?, address = ? where admin_id = ?;";

    connection.query(
      query,
      [
        adminData.profile_img,
        adminData.college_name,
        adminData.contact,
        adminData.email,
        adminData.address,
        adminData.admin_id,
      ],
      (err, result) => {
        if (err) {
          console.error("Internal Server error:", err);
          res.status(500).json({ message: "Internal Server error" });
        } else {
          console.log("Data Updated successfully");
          res.status(200).json({ message: "Data Updated successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error updating admin data:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
});

const getUserTeamData = asyncHand((req, res) => {
  const query =
    "SELECT user_profile_id,profile_img,college_name,contact,email,clg_address,name,uid from user_profile;";

  connection.query(query, (err, result) => {
    if (err) {
      console.error("Internal Server error :", err);
      res.status(500).json({ message: "Internal Server error" });
    }
    if (result.length === 0) {
      console.log("No User Data Found In the Database");
      res.status(403).json({ message: "No User Data Found In the Database" });
    } else {
      console.log("UserData Fetched Successfully");
      const csvData = result.map((row) => Object.values(row).join(","));
      res.status(200).json({
        message: "Data fetched successfully",
        userData: result,
        csvData: csvData.join("\n"),
      });
    }
  });
});

const deleteUser = asyncHand(async (req, res) => {
  const userProfileID = req.params.user_profile_id;
  const userID = req.params.uid;

  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const deleteAdminQuery =
      "DELETE FROM user_profile WHERE user_profile_id = ?";
    const deleteUserQuery = "DELETE FROM users WHERE uid = ?";

    connection.query(deleteAdminQuery, [userProfileID], (err, resultAdmin) => {
      if (err) {
        connection.rollback(() => {
          console.error("Error deleting admin:", err);
          res.status(500).json({ error: "Internal Server Error" });
        });
        return;
      }

      connection.query(deleteUserQuery, [userID], (err, resultUser) => {
        if (err) {
          connection.rollback(() => {
            console.error("Error deleting user:", err);
            res.status(500).json({ error: "Internal Server Error" });
          });
          return;
        }

        connection.commit((err) => {
          if (err) {
            connection.rollback(() => {
              console.error("Error committing transaction:", err);
              res.status(500).json({ error: "Internal Server Error" });
            });
            return;
          }

          console.log("UserProfile and user deleted successfully");
          res
            .status(200)
            .json({ message: "UserProfile and User Deleted Successfully" });
        });
      });
    });
  });
});

const getIndividualUserTeamData = asyncHand((req, res) => {
  const userProfileID = req.params.user_profile_id;
  const query = "SELECT * from user_profile where user_profile_id = ?;";

  connection.query(query, [userProfileID], (err, result) => {
    if (err) {
      console.error("Internal Server error :", err);
      res.status(500).json({ message: "Internal Server error" });
    }
    if (result.length === 0) {
      console.log("No User Data Found In the Database");
      res.status(403).json({ message: "No User Data Found In the Database" });
    } else {
      console.log("UserData Fetched Successfully");
      res.status(200).json({
        message: "Data fetched successfully",
        userData: result[0],
      });
    }
  });
});

const postIndividualUserTeamData = asyncHand(async (req, res) => {
  try {
    const userData = req.body;
    const query =
      "UPDATE user_profile SET profile_img = ?, college_name = ?, contact = ?, email = ?, clg_address = ? , name = ? where user_profile_id = ?;";

    connection.query(
      query,
      [
        userData.profile_img,
        userData.college_name,
        userData.contact,
        userData.email,
        userData.clg_address,
        userData.name,
        userData.user_profile_id,
      ],
      (err, result) => {
        if (err) {
          console.error("Internal Server error:", err);
          res.status(500).json({ message: "Internal Server error" });
        } else {
          console.log("Data Updated successfully");
          res.status(200).json({ message: "Data Updated successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
});

const getAllClientData = asyncHand((req, res) => {
  const query = "SELECT uid,email,user_type from users;";

  connection.query(query, (err, result) => {
    if (err) {
      console.error("Internal Server error :", err);
      res.status(500).json({ message: "Internal Server error" });
    }
    if (result.length === 0) {
      console.log("No Client Data Found In the Database");
      res.status(403).json({ message: "No Client Data Found In the Database" });
    } else {
      console.log("ClientData Fetched Successfully");
      const csvData = result.map((row) => Object.values(row).join(","));
      res.status(200).json({
        message: "Data fetched successfully",
        clientData: result,
        csvData: csvData.join("\n"),
      });
    }
  });
});

const deleteClient = asyncHand(async (req, res) => {
  const userID = req.params.uid;
  const deleteClientQuery = "DELETE FROM users WHERE uid = ?";

  connection.query(deleteClientQuery, [userID], (err, result) => {
    if (err) {
      console.error("Internal server Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("client deleted");
      res.status(200).json({ message: "client deleted" });
    }
  });
});

const addClient = asyncHand((req, res) => {
  const formData = req.body;

  try {
    const searchQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(searchQuery, [formData.email], async (err, result) => {
      if (err) {
        console.error("Error running the query: ", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (result.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

      const insertQuery =
        "INSERT INTO users (email, password , user_type) VALUES (?, ?, ?)";
      connection.query(
        insertQuery,
        [formData.email, hashedPassword, formData.user_type],
        (err, result) => {
          if (err) {
            console.error("Error Inserting data: ", err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            console.log("Client Registered Successfully");
            res.status(200).json({ message: "Client Registered Successfully" });
          }
        }
      );
    });
  } catch (error) {
    console.error("Error inserting data: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getAllFeedbacks = asyncHand((req, res) => {
  const query = "SELECT * FROM feedback where resolved = 0";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Internal Server Error ", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length === 0) {
      console.log("No Feedback Found");
      res.status(403).json({ message: "No Feedback Found" });
    } else {
      console.log("Feedbacks Fetched");
      res.status(200).json({
        message: "Feedbacks fetched",
        feedback: result,
      });
    }
  });
});

const getResolvedFeedbacks = asyncHand((req, res) => {
  const query = "SELECT * FROM feedback where resolved = 1";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Internal Server Error ", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length === 0) {
      console.log("No Feedback Found");
      res.status(403).json({ message: "No Feedback Found" });
    } else {
      console.log("Feedbacks Fetched");
      res.status(200).json({
        message: "Feedbacks fetched",
        feedback: result,
      });
    }
  });
});

const updateFeedback = asyncHand((req, res) => {
  const fid = req.params.fid;
  const resolvedDate = new Date();
  const query =
    "UPDATE feedback SET resolved = 1, feedback_resolved_date = ? WHERE fid = ?";

  console.log(`Attempting to update feedback with ID ${fid}`);

  connection.query(query, [resolvedDate, fid], (err, result) => {
    if (err) {
      console.error("Internal Server Error ", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      console.log(result);
      console.log("Feedback updated");
      res.status(200).json({ message: "Feedback updated" });
    }
  });
});

const updateUserType = asyncHand((req, res) => {
  const { uid } = req.params;
  const { user_type } = req.body;

  const query = "UPDATE users SET user_type = ? WHERE uid = ?";

  connection.query(query, [user_type, uid], (err, result) => {
    if (err) {
      console.error("Internal Server Error ", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      console.log("User Type updated");
      res.status(200).json({ message: "User Type updated" });
    }
  });
});

const recentFeedbacks = asyncHand((req, res) => {
  const query =
    "SELECT name,feedback_id,ratings FROM feedback ORDER BY feedback_date DESC LIMIT 5;";
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Internal Server error", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      console.log("Recent Feedback");
      res.status(200).json({
        message: "Recent Feedback",
        feedbacks: result,
      });
    }
  });
});

const barGraph = asyncHand((req, res) => {
  const query =
    "SELECT ratings, COUNT(*) as count FROM feedback GROUP BY ratings ORDER BY ratings DESC; ";

  connection.query(query, (err, result) => {
    if (err) {
      console.error("Internal Server error", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      console.log("Bar Graph");
      res.status(200).json({
        message: "Bar Graph",
        barGraph: result,
      });
    }
  });
});

const pieChart = asyncHand((req, res) => {
  const query =
    "SELECT ft.feedback_name, COUNT(f.feedback_id) as count FROM feedback_type ft LEFT JOIN feedback f ON ft.feedback_id = f.feedback_id GROUP BY ft.feedback_name; ";

  connection.query(query, (err, result) => {
    if (err) {
      console.error("Internal Server error", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      console.log("Pie Chart");
      res.status(200).json({
        message: "pie Chart Graph",
        pieChart: result,
      });
    }
  });
});

const lineChart = async (req, res) => {
  const query =
    "SELECT c.category_name, COUNT(p.posts_id) AS post_count FROM add_posts p JOIN category c ON p.category_id = c.category_id GROUP BY c.category_name; ";

  connection.query(query, (err, result) => {
    if (err) {
      console.error("Internal Server error", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      console.log("Line Chart");
      res.status(200).json({
        message: "Line Chart Graph",
        lineChartData: result,
      });
    }
  });
};

module.exports = {
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
};
