import { userSchema } from "@shared_types";
import { mapZodToMongoose } from "./utils";
import mongoose from "mongoose";

const userMongoSchema = mapZodToMongoose(userSchema);
const UserModel = mongoose.model("user_data", userMongoSchema);

export default UserModel;
