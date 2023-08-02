const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
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
  database: "practice",
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

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  } else {
    jwt.verify(token, JWTSecreteKey, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden" });
      }
      req.userID = user.userId;
      next();
    });
  }
}

// Login Form
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const searchQuery = "SELECT * from users where email = ? AND password = ?";
  connection.query(searchQuery, [email, password], (err, result) => {
    if (err) {
      console.error("Error running the query : ", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      res.status(401).json({ error: "User Not Found / Invalid Credentials" });
    } else {
      const userId = result[0].uid;
      const token = jwt.sign({ userId }, JWTSecreteKey, { expiresIn: "1h" });
      res.status(200).json({ token });
    }
  });
});

//Dashboard
app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", userId: req.userId });
  console.log("userId :", req.userId);
});
// Register Form
app.post("/register", (req, res) => {
  const formData = req.body;
  const insertQuery = "INSERT INTO users SET ?";
  connection.query(insertQuery, formData, (err, result) => {
    if (err) {
      console.error("Error Inserting Data", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Data Inserted Successfully");
      res.status(200).json({ message: "User Registered Successfully" });
    }
  });
});

app.listen(port, () => {
  console.log("Server Is Running on PORT :", port);
});
