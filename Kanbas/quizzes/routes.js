import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    app.get("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const quizzes = await dao.findQuizzesByCourseId(cid);
        res.json(quizzes);
    });

    app.post("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const quizData = {
            ...req.body,
            course: cid
        };
        const newQuiz = await dao.createQuiz(quizData);
        res.json(newQuiz);
    });

    app.delete("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        await dao.deleteQuiz(qid);
        res.sendStatus(204);
    });

    app.put("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        await dao.updateQuiz(qid, req.body);
        res.sendStatus(204);
    });

    app.get("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quiz = await dao.findQuizById(quizId);
        res.json(quiz);
    });

}
