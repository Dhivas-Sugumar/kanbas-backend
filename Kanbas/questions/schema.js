import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    points: { type: Number, required: true },
    question: { type: String, required: true },
    questionType: { type: String, enum: ["multipleChoice", "trueFalse", "multipleBlanks"], default: "multiple_choice" },
    correctAnswers: { type: [String], required: true },
    choices: { type: [String], default: [] },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true }, // Reference to the Quiz model
    quizOrder: { type: Number, required: true }},
    { collection: "questions" });

export default questionSchema;