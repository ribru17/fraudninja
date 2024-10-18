import express from "express";
import { ExerciseController } from "../controllers";
import { ExerciseClient } from "../clients/exerciseClient"; // Ensure the correct client is imported

export function createMessageRouter(messageClient: ExerciseClient): express.Router {
  const userController = new ExerciseController(messageClient);
  const router = express.Router();

  //   router.get("/", userController.getAllUsers);
  //   router.get("/:id", userController.getUserById);

  return router;
}