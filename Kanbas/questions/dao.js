import model from "./model.js";
export const createQuestion = (question) => {
    delete question._id;
    return model.create(question);
}
export const findAllQuestions = () => model.find();
export const findQuestionById = (question) => model.findById(question);
export const findQuestionsByQuizId = (quizId) => model.find({ quizId: quizId });
export const updateQuestion = (questionId, question) => model.updateOne({ _id: questionId }, { $set: question });
export const deleteQuestion = (questionId) => model.deleteOne({ _id: questionId })
