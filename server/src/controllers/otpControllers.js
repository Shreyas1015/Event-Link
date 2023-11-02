const asyncHand = require("express-async-handler");
const { connection } = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eventlink528@gmail.com",
    pass: "glkvqsejfhwekvqd",
  },
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: "eventlink528@gmail.com",
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for resetting the password is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
  console.log("OTP Sent to mail : ", email, "and the opt is : ", otp);
}

const forgetPass = asyncHand(async (req, res) => {
  const { email } = req.body;

  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  connection.query(checkEmailQuery, [email], async (err, userResult) => {
    if (err) {
      console.error("Error checking email: ", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (userResult.length === 0) {
      return res.status(400).json({ error: "Email not found" });
    }

    const otp = generateOTP();

    const insertOTPQuery =
      "INSERT INTO otps (email, otp, created_at) VALUES (?, ?, NOW())";
    connection.query(insertOTPQuery, [email, otp], async (err, result) => {
      if (err) {
        console.error("Error inserting OTP data: ", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      try {
        await sendOTPEmail(email, otp);
        res.json({ message: "OTP sent successfully" });
      } catch (error) {
        console.error("Error sending OTP email: ", error);
        res.status(500).json({ error: "Error sending OTP email" });
      }
    });
  });
});

const resetPass = asyncHand(async (req, res) => {
  const formData = req.body;

  console.log("Received reset password request.");
  console.log("formData:", formData);

  const verifyOTPQuery =
    "SELECT * FROM otps WHERE email = ? AND otp = ? AND created_at >= NOW() - INTERVAL 15 MINUTE";
  connection.query(
    verifyOTPQuery,
    [formData.email, formData.otp],
    async (err, otpResult) => {
      if (err) {
        console.error("Error verifying OTP: ", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      console.log("OTP verification result:", otpResult);

      if (otpResult.length === 0) {
        return res.status(400).json({ error: "Invalid OTP or OTP expired" });
      }

      try {
        const hashedPassword = await bcrypt.hash(formData.newPassword, 10);
        const updatePasswordQuery =
          "UPDATE users SET password = ? WHERE email = ?";
        connection.query(
          updatePasswordQuery,
          [hashedPassword, formData.email],
          (err, updateResult) => {
            if (err) {
              console.error("Error updating password: ", err);
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              res.json({ message: "Password reset successful" });
            }
          }
        );
      } catch (error) {
        console.error("Error hashing new password: ", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );
});

module.exports = {
  forgetPass,
  resetPass,
};
