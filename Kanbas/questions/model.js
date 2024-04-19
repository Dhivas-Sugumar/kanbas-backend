import mongoose from "mongoose";
import questionSchema from "./schema";
const model = mongoose.model("QuestionModel", questionSchema);
export default model;