import express from "express";
import multer from "multer";
import { ResourceController } from "../controllers";
import type { ResourceClient } from "../clients/resourceClient";

const upload = multer();

export function createResourceRouter(
  resourceClient: ResourceClient
): express.Router {
  const resourceController = new ResourceController(resourceClient);
  const router = express.Router();

  router.get("/all", resourceController.getAll);
  router.post("/", upload.single("image"), resourceController.create);

  return router;
}
