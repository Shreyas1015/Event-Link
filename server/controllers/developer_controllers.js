const asyncHand = require("express-async-handler");
const { connection } = require("../models/db_connection");

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
      // console.log("Data Fetched Successfully");
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
      console.log("Data Fetched Successfully");
      res.status(200).json({
        message: "Data fetched successfully",
        usersCount: result[0].Total_No_Of_Users,
      });
    }
  });
});

module.exports = {
  getAdminCount,
  getUsersCount,
};
