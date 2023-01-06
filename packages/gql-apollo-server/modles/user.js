import mongoose from "mongoose";

const userSechma = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model("User", userSechma);

export { User };
