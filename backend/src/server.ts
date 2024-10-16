import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PORT } from "./settings";
import { initializeClients } from "./server/db";
import { createSessionRouter, createUserRouter } from "./routes";

dotenv.config();

const app = express();

initializeClients()
  .then(({ userClient }) => {
    // Register routes with the appropriate clients and controllers
    app.use("/session", createSessionRouter(userClient));
    app.use("/users", createUserRouter(userClient)); // Example for User routes
    app.listen(PORT || 4000, () => {
      console.log(`Server running on port ${PORT}...`);
    });
  })
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// // MongoDB connection and UserClient initialization
// const CONNECTION_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@fraudninja.eoeqf.mongodb.net/fraud_ninja_database?retryWrites=true&w=majority&appName=FraudNinja`;
// const client = new MongoClient(CONNECTION_URL);

// let db: Db;
// let userClient: UserClient;

// client
//   .connect()
//   .then(() => {
//     db = client.db();
//     userClient = new UserClient(db);
//     console.log("MongoDB connected and UserClient initialized");

//     app.listen(PORT || 4000, () => {
//       console.log(`Server running on port ${PORT}...`);
//     });
//   })
//   .catch((error) => console.log("Error connecting to MongoDB:", error));

// Middlewares
app.use(express.json());
app.use(cors());

// Define routes using session routes
// app.use("/session", sessionRoutes);
