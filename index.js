const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Mongo Error:", err));

/* Schema */
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  status: String,
  time: {
    type: Date,
    default: Date.now
  }
});

const Location = mongoose.model("Location", locationSchema);

/* Test Route */
app.get("/", (req, res) => {
  res.send("Backend Running");
});

/* Save Location */
app.post("/send-location", async (req, res) => {
  try {
    const { latitude, longitude, status } = req.body;

    const newLocation = new Location({
      latitude,
      longitude,
      status
    });

    await newLocation.save();

    res.json({ message: "Location saved to MongoDB" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving location" });
  }
});

/* Get all locations (to view receiver side) */
app.get("/locations", async (req, res) => {
  const data = await Location.find().sort({ time: -1 });
  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
