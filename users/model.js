import userSchema from "./schema.js";
import mongoose from "mongoose";

const model = mongoose.model("users", userSchema);

export default model;