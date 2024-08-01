const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 3001; // Or any port you prefer

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail", // You can use any email service here
  auth: {
    user: "sharan1228s@gmail.com",
    pass: "your-app-password", // Use an app password instead of your regular password
  },
});

app.post("/send-email", (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: "sharan1228s@gmail.com",
    to:"sharan1228s@gmail.com",
    subject: "Login Successful",
    text: "You have successfully logged in!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
