import express from "express";
import { ExerciseController } from "../controllers";
import { ExerciseClient } from "../clients/exerciseClient"; // Ensure the correct client is imported

export function createExerciseRouter(
  exerciseClient: ExerciseClient
): express.Router {
  const exerciseController = new ExerciseController(exerciseClient);
  const router = express.Router();

  router.get("/all", exerciseController.getAllExercises);
  router.get("/random", exerciseController.getRandomExercise);
  router.get("/", exerciseController.getRandomExercises);

  return router;
}
