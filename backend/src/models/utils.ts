import { z, ZodObject, ZodString, ZodNumber, ZodBoolean } from "zod";
import mongoose from "mongoose";

// Function to map Zod schema to Mongoose schema
export const mapZodToMongoose = (zodSchema: ZodObject<any>) => {
  const mongooseSchema: Record<string, any> = {};

  // Iterate over the Zod object keys
  for (const key in zodSchema.shape) {
    const field = zodSchema.shape[key];

    if (field instanceof ZodString) {
      mongooseSchema[key] = { type: String, required: true };
    }

    if (field instanceof ZodNumber) {
      mongooseSchema[key] = { type: Number, required: true };
    }

    if (field instanceof ZodBoolean) {
      mongooseSchema[key] = { type: Boolean, required: true };
    }

    // Extend this with more mappings as needed
  }

  return new mongoose.Schema(mongooseSchema);
};
