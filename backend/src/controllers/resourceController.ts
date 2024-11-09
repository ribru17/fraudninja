import type { Resource } from "@shared_types";
import { decodeHex, encodeHex } from "../utils";
import type { ResourceClient } from "../clients";
import type { InsertOneResult } from "mongodb";
import type { Request, NextFunction, Response } from "express";

export class ResourceController {
  constructor(private readonly client: ResourceClient) {}

  getAll = async (
    _: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const resources = await this.client.getAll();
      if (!resources) {
        res.status(404).json({ error: "Resources not found" });
        return;
      }
      res.json(resources);
      return;
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const decodedId = decodeHex(id);
      if (!decodedId) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
      }

      const resource = await this.client.getById(decodedId);
      if (!resource) {
        res.status(404).json({ error: "Resource not found" });
        return;
      }

      res.json({ ...resource, _id: encodeHex(resource._id) });
    } catch (error) {
      next(error);
    }
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const resourceData = req.body;
      const imageFile = req.file;
      // Convert image buffer to base64 if it exists
      const imageBase64 = imageFile
        ? imageFile.buffer.toString("base64")
        : undefined;

      const newResource = {
        ...resourceData,
        image: imageBase64, // Store as base64 string
      };

      const createdResource: InsertOneResult = await this.client.create(
        newResource
      );

      res.status(201).json({
        ...createdResource,
        insertedId: encodeHex(createdResource.insertedId),
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const decodedId = decodeHex(id);
      if (!decodedId) {
        res.status(400).json({ error: "Invalid resource ID" });
        return;
      }

      const resourceUpdates: Partial<Resource> = req.body;
      const existingResource = await this.client.getById(decodedId);

      if (!existingResource) {
        res.status(404).json({ error: "Resource not found" });
        return;
      }

      const updatedResource = await this.client.update(decodedId, {
        ...resourceUpdates,
        _id: decodedId,
      });

      if (!updatedResource) {
        res.status(500).json({ error: "Failed to update resource" });
        return;
      }

      res.json({ ...updatedResource, _id: encodeHex(updatedResource._id) });
    } catch (error) {
      next(error);
    }
  };
}
