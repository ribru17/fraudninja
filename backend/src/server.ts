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
    app.use("/users", createUserRouter(userClient));
    app.listen(PORT || 4000, () => {
      console.log(`Server running on port ${PORT}...`);
    });
  })
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Middlewares
app.use(express.json());
app.use(cors());
