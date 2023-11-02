const asyncHand = require("express-async-handler");
const { connection } = require("../config/dbConfig");

//Get User PRofile Id
const userProfleID = asyncHand((req, res) => {
  const uid = req.query.uid;

  const getUserProfileIdQuery =
    "SELECT user_profile_id FROM user_profile WHERE uid = ?";
  connection.query(getUserProfileIdQuery, [uid], (err, result) => {
    if (err) {
      console.error("Error fetching admin_id:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result && result.length > 0) {
        const UserProfileID = result[0].user_profile_id;
        res.status(200).json({ user_profile_id: UserProfileID });
      } else {
        res.status(404).json({ error: "User Profile ID not found" });
      }
    }
  });
});

const userProfileSetup = asyncHand((req, res) => {
  if (!req.user || !req.user.email) {
    console.log("checking..");
    return res
      .status(401)
      .json({ message: "Unauthorized - Missing or invalid token" });
  } else {
    const formData = req.body;
    const uid = formData.uid;

    const checkQuery = "SELECT * FROM user_profile WHERE uid = ?";
    connection.query(checkQuery, [uid], (checkErr, checkResult) => {
      if (checkErr) {
        console.error("Error Checking Data:", checkErr);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (checkResult && checkResult.length > 0) {
          const updateQuery = "UPDATE user_profile SET ? WHERE uid = ?";
          connection.query(
            updateQuery,
            [formData, uid],
            (updateErr, updateResult) => {
              if (updateErr) {
                console.error("Error Updating Data:", updateErr);
                res.status(500).json({ error: "Internal Server Error" });
              } else {
                console.log("Data updated successfully");
                res.status(200).json({ message: "Data Updated Successfully" });
              }
            }
          );
        } else {
          const insertQuery = "INSERT INTO user_profile SET ?";
          connection.query(insertQuery, formData, (insertErr, insertResult) => {
            if (insertErr) {
              console.error("Error Inserting Data:", insertErr);
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              const UserProfileTD = insertResult.insertId;
              console.log("Generated user_profile_id:", UserProfileTD);
              console.log("Data inserted successfully");
              res.status(200).json({
                message: "Data Inserted Successfully",
                user_profile_id: UserProfileTD,
              });
            }
          });
        }
      }
    });
  }
});

const userData = asyncHand((req, res) => {
  const uid = req.query.uid;
  const userProfileID = req.query.user_profile_id;
  const UserDataQuery =
    "SELECT profile_img, name, college_name, contact, email FROM user_profile WHERE uid = ? AND user_profile_id = ?";
  connection.query(
    UserDataQuery,
    [uid, userProfileID],
    (err, UserDataResults) => {
      if (err) {
        console.error("Error fetching admin data:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const userData = UserDataResults[0];
        console.log("Fetched admin data:", userData);
        res.status(200).json({ userData });
      }
    }
  );
});

const getAllPosts = asyncHand((req, res) => {
  const postsQuery = "SELECT * FROM add_posts ORDER BY POSTS_ID DESC ;";

  connection.query(postsQuery, (err, postsResults) => {
    if (err) {
      console.error("Error fetching posts:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(postsResults);
    }
  });
});

const userFeedBack = asyncHand(async (req, res) => {
  const formData = req.body;
  const userProfileID = formData.user_profile_id;
  const uid = formData.uid;

  const insertQuery = `
    INSERT INTO feedback (name, email, feedback_id, feedback_subject, feedback_desc, ratings, attachments, contact_preference_id, uid, user_profile_id, feedback_date)
    SELECT '${formData.name}', '${formData.email}', '${formData.feedback_id}', '${formData.feedback_subject}', '${formData.feedback_desc}', '${formData.ratings}', '${formData.attachments}', '${formData.contact_preference_id}', ${uid}, ${userProfileID} ,  DATE(NOW())
    FROM user_profile up
    WHERE up.user_profile_id = ${userProfileID} AND up.uid = ${uid};
  `;

  connection.query(insertQuery, (err, result) => {
    if (err) {
      console.error("Error Inserting Data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("FeeBack Submitted successfully");
      res.status(200).json({ message: "FeeBack Submitted Successfully" });
    }
  });
});

const getUserProfileData = asyncHand((req, res) => {
  const userProfileID = req.query.user_profile_id;

  const getUserProfileDataQuery = `
    SELECT name, college_name, email, contact, clg_address
    FROM user_profile
    WHERE user_profile_id = ?
  `;

  connection.query(getUserProfileDataQuery, [userProfileID], (err, result) => {
    if (err) {
      console.error("Error fetching user profile data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result && result.length > 0) {
        const profileData = result[0];
        res.status(200).json(profileData);
      } else {
        res.status(404).json({ error: "User profile data not found" });
      }
    }
  });
});

module.exports = {
  userProfleID,
  userData,
  getAllPosts,
  userProfileSetup,
  userFeedBack,
  getUserProfileData,
};
