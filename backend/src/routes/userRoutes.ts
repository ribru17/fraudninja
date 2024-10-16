import express from "express";
import { UserController } from "../controllers";
import { UserClient } from "../clients/userClient"; // Ensure the correct client is imported

export function createUserRouter(userClient: UserClient): express.Router {
  const userController = new UserController(userClient);
  const router = express.Router();

  //   router.get("/", userController.getAllUsers);
  //   router.get("/:id", userController.getUserById);

  return router;
}
