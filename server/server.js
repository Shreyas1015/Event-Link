const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
app.use(express.json());

//Database Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shreyas@15",
  database: "event_link",
});

connection.connect((err) => {
  if (err) {
    console.error("Error Connecting to the database :", err);
    return;
  }
  console.log("Successfully connected to MySql");
});

//JWT Key genration function
function generateJwtToken() {
  const SecretKey = crypto.randomBytes(32).toString("hex");
  return SecretKey;
}

const JWTSecreteKey = generateJwtToken();
console.log("SecretKey :", JWTSecreteKey);

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
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const searchQuery = "SELECT * from users where email = ?";
  try {
    connection.query(searchQuery, [email], async (err, [user]) => {
      if (err) {
        console.error("Error running the query : ", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (!user) {
        return res
          .status(401)
          .json({ error: "User Not Found / Invalid Credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }

      const userId = user.uid;
      const token = jwt.sign({ userId }, JWTSecreteKey, { expiresIn: "1h" });
      res.status(200).json({ token, uid: userId });
    });
  } catch (error) {
    console.error("Error running the query : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Register Form
app.post("/signup", async (req, res) => {
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

      const insertQuery = "INSERT INTO users (email, password) VALUES (?, ?)";
      connection.query(
        insertQuery,
        [formData.email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Error inserting data: ", err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            const userId = result.insertId;
            console.log("User Registered Successfully");
            res
              .status(200)
              .json({ message: "User Registered Successfully", uid: userId });
          }
        }
      );
    });
  } catch (error) {
    console.error("Error inserting data: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Profile SetUp
app.get("/get_admin_id", (req, res) => {
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

// Profile setup endpoint
app.post("/profile_setup", authenticateToken, (req, res) => {
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

//Add Post
app.post("/add_posts", authenticateToken, async (req, res) => {
  const formData = req.body;

  const insertQuery = "INSERT INTO add_posts SET ?";
  connection.query(insertQuery, formData, (err, result) => {
    if (err) {
      console.error("Error Inserting Data :", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Data inserted successfully");
      res.status(200).json({ message: "Data Inserted Successfully" });
    }
  });
});

// Edit Post (GET)
app.get("/edit_post/:post_id", authenticateToken, (req, res) => {
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

// Edit Post (PUT)
app.put("/edit_post/:post_id", authenticateToken, (req, res) => {
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

// Route to get dashboard data
app.get("/get_admin_data", authenticateToken, (req, res) => {
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
      console.log("Fetched admin data:", adminData); // Log the fetched admin data
      res.status(200).json({ adminData });
    }
  });
});

// Delete Post
app.delete("/delete_post/:post_id", authenticateToken, (req, res) => {
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

// Route to get posts
app.get("/get_posts", authenticateToken, (req, res) => {
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

app.listen(port, () => {
  console.log("Server Is Running on PORT :", port);
});
