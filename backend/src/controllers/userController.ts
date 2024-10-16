import { User } from "@shared_types";
import { InsertOneResultWithoutId, decodeHex, encodeHex } from "../utils";
import { UserClient } from "../clients";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../settings";
import { InsertOneResult } from "mongodb";

export class UserController {
  constructor(private readonly client: UserClient) {}
  async getAll(): Promise<User[]> {
    const users = await this.client.getAll();
    return users.map((user) => {
      return { ...user, _id: encodeHex(user._id) };
    });
  }
  async getById(id: string): Promise<User | null> {
    const decodedId = decodeHex(id);
    if (!decodedId) return null;

    const user = await this.client.getById(decodedId);
    if (!user) return null;
    return { ...user, _id: encodeHex(user._id) };
  }
  async getByToken(token: string): Promise<User | null> {
    try {
      const sub = await UserController.verifyToken(token);

      if (sub) {
        const user = await this.getBySub(sub);
        if (user) return user;
      }
      return null;
    } catch {
      return null;
    }
  }
  async getByName(name: string): Promise<User | null> {
    const user = await this.client.getByName(name);
    if (!user) return null;
    return { ...user, _id: encodeHex(user._id) };
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.client.getByEmail(email);
    if (!user) return null;
    return { ...user, _id: encodeHex(user._id) };
  }

  async getBySub(userSub: string): Promise<User | null> {
    const user = await this.client.getBySub(userSub);
    if (!user) return null;
    return { ...user, _id: encodeHex(user._id) };
  }
  async create(user: Omit<User, "_id">): Promise<InsertOneResultWithoutId> {
    const createdUser: InsertOneResult = await this.client.create(user);
    return {
      ...createdUser,
      insertedId: encodeHex(createdUser.insertedId),
    };
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const decodedId = decodeHex(id);
    if (!decodedId) return null;

    const existingUser = await this.client.getById(decodedId);
    if (!existingUser) throw new Error("404");

    const updatedUser = await this.client.update(decodedId, {
      ...user,
      _id: decodedId,
    });
    if (!updatedUser) return null;

    return { ...updatedUser, _id: encodeHex(updatedUser._id) };
  }

  private static async verifyToken(token: string): Promise<string | null> {
    try {
      const { sub } = jwt.verify(token, JWT_KEY) as jwt.JwtPayload;
      return sub || null;
    } catch (err) {
      return null;
    }
  }
}
