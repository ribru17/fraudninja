import { User } from "@shared_types";
import {
  Collection,
  Db,
  DeleteResult,
  InsertOneResult,
  ObjectId,
} from "mongodb";

export type UserDocument = Omit<User, "_id"> & {
  _id: ObjectId;
};

export class UserClient {
  private collection: Collection<UserDocument>;
  constructor(db: Db) {
    this.collection = db.collection("user");
  }

  async getAll(): Promise<UserDocument[]> {
    return this.collection.find().toArray();
  }

  async getById(_id: ObjectId): Promise<UserDocument | null> {
    return this.collection.findOne({ _id });
  }

  async getByName(name: string): Promise<UserDocument | null> {
    return this.collection.findOne({ name });
  }

  async getByEmail(email: string): Promise<UserDocument | null> {
    return this.collection.findOne({ email });
  }

  async getBySub(sub: string): Promise<UserDocument | null> {
    return this.collection.findOne({ sub });
  }

  async create(category: Omit<User, "_id">): Promise<InsertOneResult> {
    const newUser: UserDocument = {
      ...category,
      _id: new ObjectId(),
    };
    return this.collection.insertOne(newUser);
  }

  async update(
    _id: ObjectId,
    user: Partial<UserDocument>
  ): Promise<UserDocument | null> {
    const result: UserDocument | null = await this.collection.findOneAndUpdate(
      { _id },
      { $set: user },
      { returnDocument: "after" }
    );

    return result;
  }

  async delete(_id: ObjectId): Promise<DeleteResult> {
    return this.collection.deleteOne({ _id });
  }
}
