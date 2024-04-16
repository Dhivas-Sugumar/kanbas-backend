import * as quizDao from "./quizDao.js";

export default function QuizRoutes(app) {
    app.get("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const quizzes = await quizDao.findQuizzesByCourseId(cid);
        res.json(quizzes);
    });

    app.post("/api/courses/:cid/quizzes", async (req, res) => {
        const { cid } = req.params;
        const quizData = {
            ...req.body,
            course: cid
        };
        const newQuiz = await quizDao.createQuiz(quizData);
        res.json(newQuiz);
    });

    app.delete("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        await quizDao.deleteQuiz(qid);
        res.sendStatus(204);
    });

    app.put("/api/quizzes/:qid", async (req, res) => {
        const { qid } = req.params;
        await quizDao.updateQuiz(qid, req.body);
        res.sendStatus(204);
    });
}
