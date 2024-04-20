import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
    const createQuestion = async (req, res) => {
        try {
            const {quizId} = req.params
            const question = req.body;
            question = {...question, quizId}
            const newQuestion = await dao.createQuestion(question);
            console.log(newQuestion)
            res.json(newQuestion);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    const findQuestionsByQuizId = async (req, res) => {
        try {
            const { quizId } = req.params;
            const questions = await dao.findQuestionsByQuizId(quizId);
            res.json(questions);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    const updateQuestion = async (req, res) => {
        try {
            const { questionId } = req.params;
            const question = req.body;
            const updatedQuestion = await dao.updateQuestion(questionId, question);
            res.json(updatedQuestion);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    const deleteQuestion = async (req, res) => {
        try {
            const { questionId } = req.params;
            await dao.deleteQuestion(questionId);
            res.sendStatus(204);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    app.post("/api/questions/:quizId", createQuestion);
    app.get("/api/questions/:quizId", findQuestionsByQuizId);
    app.put("/api/questions/:questionId", updateQuestion);
    app.delete("/api/questions/:questionId", deleteQuestion);

}