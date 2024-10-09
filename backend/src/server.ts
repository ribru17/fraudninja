import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB connection
const CONNECTION_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@fraudninja.eoeqf.mongodb.net/?retryWrites=true&w=majority&appName=FraudNinja`;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Default route
app.get("/", (req, res) => {
  res.send("Backend is up and running!");
});
