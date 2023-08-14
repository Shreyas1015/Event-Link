const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const port = 5000;

const app = express();

//MiddleWares
app.use(cors());
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
        console.log("Token Verification Error:", err); // Log verification error
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

      // Compare the provided password with the hashed password stored in the database
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
    // Check if the user already exists in the database
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

      // Hash the password before storing in the database
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

      // Store the user data in the database
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

app.post("/profile_setup", authenticateToken, (req, res) => {
  const formData = req.body;
  const uid = formData.uid;

  // Check if profile data exists for the given UID
  const checkQuery = "SELECT * FROM admin_profile WHERE uid = ?";
  connection.query(checkQuery, [uid], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error Checking Data:", checkErr);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (checkResult && checkResult.length > 0) {
        // Profile data exists, perform an UPDATE operation
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
        // Profile data doesn't exist, perform an INSERT operation
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
app.post("/add_posts", authenticateToken, (req, res) => {
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

// Route to get dashboard data
app.get("/get_admin_data", authenticateToken, (req, res) => {
  const uid = req.query.uid;
  const adminId = req.query.admin_id;
  const adminDataQuery =
    "SELECT CONVERT(profile_img USING utf8) AS profile_img, college_name, contact, email FROM admin_profile WHERE uid = ? AND admin_id = ?";
  connection.query(adminDataQuery, [uid, adminId], (err, adminDataResults) => {
    if (err) {
      console.error("Error fetching admin data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const adminData = adminDataResults[0];
      res.status(200).json({ adminData });
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
      // Modify each post object to include the cover_img URL
      const postsWithUrls = postsResults.map((post) => ({
        ...post,
        cover_img: `http://yourserver.com/images/${encodeURIComponent(
          post.cover_img
        )}`,
      }));

      res.status(200).json(postsWithUrls);
    }
  });
});

app.listen(port, () => {
  console.log("Server Is Running on PORT :", port);
});
