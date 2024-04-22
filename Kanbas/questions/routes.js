import * as dao from "./dao.js";
import * as quizDao from "../quizzes/dao.js";

export default function QuestionRoutes(app) {
    const createQuestion = async (req, res) => {
        try {
            const {quizId} = req.params
            const question = req.body;
            const newQuestion = await dao.createQuestion({...question, quizId: quizId});

            const quiz = await quizDao.findQuizById(quizId);

            const updatedQuiz = await quizDao.updateQuiz(quizId, {...quiz, numberOfQuestions: quiz.numberOfQuestions + 1, points: quiz.points + question.points});

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

            const quiz = await quizDao.findQuizById(question.quizId);

            const sum = await sumPoints(question.quizId);

            await quizDao.updateQuiz(question.quizId, {...quiz, points: sum});

            res.json(updatedQuestion);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    const sumPoints = async (quizId) => {
        const questions = await dao.findQuestionsByQuizId(quizId);
        let sum = 0;
        questions.forEach(question => {
            sum += question.points;
        });
        return sum;
    }

    const deleteQuestion = async (req, res) => {
        try {
            const { questionId } = req.params;
            const question = await dao.findQuestionById(questionId);
            const quiz = await quizDao.findQuizById(question.quizId);
            await quizDao.updateQuiz(question.quizId, {...quiz, numberOfQuestions: quiz.numberOfQuestions - 1, points: quiz.points - question.points});
            await dao.deleteQuestion(questionId);
            res.sendStatus(204);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    const getAllQuestions = async (req, res) => {
        try {
            const questions = await dao.findAllQuestions();
            res.json(questions);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    app.get("/api/questions", getAllQuestions);
    app.post("/api/questions/:quizId", createQuestion);
    app.get("/api/questions/:quizId", findQuestionsByQuizId);
    app.put("/api/questions/:questionId", updateQuestion);
    app.delete("/api/questions/:questionId", deleteQuestion);

}