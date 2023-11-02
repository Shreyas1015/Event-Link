const { connection } = require("../config/dbConfig");
const jwt = require("jsonwebtoken");
const generateSecretKey = require("../utils/generateSecretKey");

const secretKey = process.env.DB_SECRET_KEY || generateSecretKey();
console.log("SecretKey :", secretKey);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Received Token:", token);

  if (!token) {
    console.log("Unauthorized: Token not provided");
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log("Forbidden: Invalid token");
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      } else {
        req.user = decoded;
        console.log("Decoded User :", decoded);
        connection.query(
          "SELECT u.uid, u.email, u.user_type, ap.admin_id, up.user_profile_id FROM users u LEFT JOIN admin_profile ap ON u.uid = ap.uid LEFT JOIN user_profile up ON u.uid = up.uid WHERE u.email = ? ; ",
          [req.user.email],
          (err, result) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .json({ message: "Error fetching user data" });
            } else {
              req.uid = result[0].uid;
              req.user_type = result[0].user_type;
              req.admin_id = result[0].admin_id;
              req.user_profile_id = result[0].user_profile_id;
              console.log("UID :", req.uid);
              console.log("USER_TYPE :", req.user_type);
              console.log("ADMIN ID :", req.admin_id);
              console.log("USER PROFILE ID  :", req.user_profile_id);
              next(); 
            }
          }
        );
      }
    });
  }
}

module.exports = authenticateToken;
