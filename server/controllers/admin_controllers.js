const asyncHand = require("express-async-handler");
const { connection } = require("../models/db_connection");

const adminProfileID = asyncHand((req, res) => {
  const uid = req.query.uid;

  const getAdminIdQuery = "SELECT admin_id FROM admin_profile WHERE uid = ?";
  connection.query(getAdminIdQuery, [uid], (err, result) => {
    if (err) {
      console.error("Error fetching admin_id:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result && result.length > 0) {
        const adminID = result[0].admin_id;
        res.status(200).json({ admin_id: adminID });
      } else {
        res.status(404).json({ error: "Admin ID not found" });
      }
    }
  });
});

const adminProfileSetup = asyncHand((req, res) => {
  const formData = req.body;
  const uid = formData.uid;

  const checkQuery = "SELECT * FROM admin_profile WHERE uid = ?";
  connection.query(checkQuery, [uid], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error Checking Data:", checkErr);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (checkResult && checkResult.length > 0) {
        const updateQuery = "UPDATE admin_profile SET ? WHERE uid = ?";
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
        const insertQuery = "INSERT INTO admin_profile SET ?";
        connection.query(insertQuery, formData, (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error Inserting Data:", insertErr);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            const adminId = insertResult.insertId;
            console.log("Generated admin_id:", adminId);
            console.log("Data inserted successfully");
            res.status(200).json({
              message: "Data Inserted Successfully",
              admin_id: adminId,
            });
          }
        });
      }
    }
  });
});

const addPosts = asyncHand(async (req, res) => {
  const formData = req.body;
  const adminId = formData.admin_id; // Assuming you have admin_id in formData
  const uid = formData.uid; // Assuming you have uid in formData

  const insertQuery = `
    INSERT INTO add_posts (cover_img, event_name, event_desc, event_date, category_id, contact, email, google_form_link, uid, admin_id, college_name)
    SELECT '${formData.cover_img}', '${formData.event_name}', '${formData.event_desc}', '${formData.event_date}', ${formData.category_id}, '${formData.contact}', '${formData.email}', '${formData.google_form_link}', ${uid}, ${adminId}, ap.college_name
    FROM admin_profile ap
    WHERE ap.admin_id = ${adminId} AND ap.uid = ${uid};
  `;

  connection.query(insertQuery, (err, result) => {
    if (err) {
      console.error("Error Inserting Data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Data inserted successfully");
      res.status(200).json({ message: "Data Inserted Successfully" });
    }
  });
});

const editPosts = asyncHand((req, res) => {
  const postID = req.params.post_id;

  const getPostQuery = "SELECT * FROM add_posts WHERE posts_id = ?";
  connection.query(getPostQuery, [postID], (err, postResult) => {
    if (err) {
      console.error("Error fetching post data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const postData = postResult[0];
      if (!postData) {
        res.status(404).json({ error: "Post not found" });
      } else {
        res.status(200).json(postData);
      }
    }
  });
});

const particularPosts = asyncHand((req, res) => {
  const postID = req.params.post_id;

  const getPostQuery = "SELECT * FROM add_posts WHERE posts_id = ?";
  connection.query(getPostQuery, [postID], (err, postResult) => {
    if (err) {
      console.error("Error fetching post data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const postData = postResult[0];
      if (!postData) {
        res.status(404).json({ error: "Post not found" });
      } else {
        res.status(200).json(postData);
      }
    }
  });
});

const putPostData = asyncHand((req, res) => {
  const postID = req.params.post_id;
  const formData = req.body;

  const updateQuery = "UPDATE add_posts SET ? WHERE posts_id = ?";
  connection.query(updateQuery, [formData, postID], (err, result) => {
    if (err) {
      console.error("Error updating post:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Post updated successfully");
      res.status(200).json({ message: "Post Updated Successfully" });
    }
  });
});

const getAdminData = asyncHand((req, res) => {
  const uid = req.query.uid;
  const adminId = req.query.admin_id;
  const adminDataQuery =
    "SELECT profile_img, college_name, contact, email FROM admin_profile WHERE uid = ? AND admin_id = ?";
  connection.query(adminDataQuery, [uid, adminId], (err, adminDataResults) => {
    if (err) {
      console.error("Error fetching admin data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const adminData = adminDataResults[0];
      console.log("Fetched admin data:", adminData);
      res.status(200).json({ adminData });
    }
  });
});

const deletePosts = asyncHand((req, res) => {
  const postID = req.params.post_id;

  const deleteQuery = "DELETE FROM add_posts WHERE posts_id = ?";
  connection.query(deleteQuery, [postID], (err, result) => {
    if (err) {
      console.error("Error deleting post:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Post deleted successfully");
      res.status(200).json({ message: "Post Deleted Successfully" });
    }
  });
});

const getAdminPosts = asyncHand((req, res) => {
  const uid = req.query.uid;
  const adminID = req.query.admin_id;
  const postsQuery = "SELECT * FROM add_posts WHERE uid = ? AND admin_id = ?";

  connection.query(postsQuery, [uid, adminID], (err, postsResults) => {
    if (err) {
      console.error("Error fetching posts:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(postsResults);
    }
  });
});

module.exports = {
  adminProfileID,
  adminProfileSetup,
  addPosts,
  editPosts,
  particularPosts,
  putPostData,
  getAdminData,
  deletePosts,
  getAdminPosts,
};
