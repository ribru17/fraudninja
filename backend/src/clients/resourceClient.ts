import type { Resource } from "@shared_types";
import {
  type Collection,
  type Db,
  type DeleteResult,
  type InsertOneResult,
  ObjectId,
} from "mongodb";

export type ResourceDocument = Omit<Resource, "_id"> & {
  _id: ObjectId;
};

export class ResourceClient {
  private collection: Collection<ResourceDocument>;
  constructor(db: Db) {
    this.collection = db.collection("resource");
  }

  async getAll(): Promise<ResourceDocument[]> {
    return this.collection.find().toArray();
  }

  async getById(_id: ObjectId): Promise<ResourceDocument | null> {
    return this.collection.findOne({ _id });
  }

  async create(category: Omit<Resource, "_id">): Promise<InsertOneResult> {
    const newResource: ResourceDocument = {
      ...category,
      _id: new ObjectId(),
    };
    return this.collection.insertOne(newResource);
  }

  async update(
    _id: ObjectId,
    resource: Partial<ResourceDocument>
  ): Promise<ResourceDocument | null> {
    const result: ResourceDocument | null =
      await this.collection.findOneAndUpdate(
        { _id },
        { $set: resource },
        { returnDocument: "after" }
      );

    return result;
  }

  async delete(_id: ObjectId): Promise<DeleteResult> {
    return this.collection.deleteOne({ _id });
  }
}
