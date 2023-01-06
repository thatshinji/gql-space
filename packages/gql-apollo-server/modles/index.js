import mongoose from "mongoose";
import { User } from "./user.js";

mongoose.connect("mongodb://localhost:27017/test");

const db = mongoose.connection;

db.on("error", () => {
  console.log("connection error");
});

db.once("open", () => {
  console.log("连接mongodb成功");
});

export { User };
