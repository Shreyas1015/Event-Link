const asyncHand = require("express-async-handler");
const { connection } = require("../models/db_connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTSecreteKey = require("./jwtToken");

// Login Form
const login = asyncHand((req, res) => {
  console.log("This is Called");
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
      const user_type = user.user_type;
      const token = jwt.sign({ userId }, JWTSecreteKey, { expiresIn: "10h" });
      res.status(200).json({ token, uid: userId, user_type });
    });
  } catch (error) {
    console.error("Error running the query : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Register Form
const signUp = asyncHand(async (req, res) => {
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
        "INSERT INTO users (email, password,user_type) VALUES (?, ?, 2)";
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

module.exports = {
  login,
  signUp,
};
