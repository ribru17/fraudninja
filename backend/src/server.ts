import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PORT } from "./settings";
import { initializeClients } from "./server/db";
import {
  createExerciseRouter,
  createResourceRouter,
  createSessionRouter,
  createUserRouter,
} from "./routes";

dotenv.config();

const app = express();

initializeClients()
  .then(({ userClient, exerciseClient, resourceClient }) => {
    // Register routes with the appropriate clients and controllers
    app.use("/session", createSessionRouter(userClient));
    app.use("/users", createUserRouter(userClient)); // Example for User routes
    app.use("/exercises", createExerciseRouter(exerciseClient));
    app.use("/resources", createResourceRouter(resourceClient));
    app.listen(PORT || 4000, () => {
      console.log(`Server running on port ${PORT}...`);
    });
  })
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Middlewares
app.use(express.json());
app.use(cors());
