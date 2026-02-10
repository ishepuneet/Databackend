const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// MONGO_URI='mongodb+srv://friday:5u2P16w7PotswdiX@viewlocation.6ac43du.mongodb.net/?appName=viewlocation'

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URI) // ✅ remove options
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

/* Schema & Model */
const locationSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  status: { type: String, required: true },
  time: { type: Date, default: Date.now },
});

const Location = mongoose.model("Location", locationSchema);

/* Routes */
app.get("/", (req, res) => res.send("Backend Running"));

app.post("/send-location", async (req, res) => {
  try {
    const { latitude, longitude, status } = req.body;
    if (latitude == null || longitude == null || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newLocation = new Location({ latitude, longitude, status });
    await newLocation.save();
    res.status(201).json({ message: "Location saved to MongoDB", location: newLocation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving location" });
  }
});

app.get("/locations", async (req, res) => {
  try {
    const data = await Location.find().sort({ time: -1 });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching locations" });
  }
});

/* Start Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
