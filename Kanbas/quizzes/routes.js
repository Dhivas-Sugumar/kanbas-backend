import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    app.get("/api/courses/:cid/quizzes", async (req, res) => {
        try{
            const { cid } = req.params;
        const quizzes = await dao.findQuizzesByCourseId(cid);
        res.json(quizzes);
        }
        catch(err){
            res.send(400).json({error: err.message});
        }
    });

    app.post("/api/courses/:cid/quizzes", async (req, res) => {
        try{
            const { cid } = req.params;
        const quizData = {
            ...req.body,
            course: cid
        };
        const newQuiz = await dao.createQuiz(quizData);
        res.json(newQuiz);
        }
        catch(err){
            res.send(400).json({error: err.message});
        }
    });

    app.delete("/api/quizzes/:qid", async (req, res) => {
        try{
            const { qid } = req.params;
        await dao.deleteQuiz(qid);
        res.sendStatus(204);
        }
        catch(err){
            res.send(400).json({error: err.message});
        }
    });

    app.put("/api/quizzes/:qid", async (req, res) => {
       try{
        const { qid } = req.params;
        await dao.updateQuiz(qid, req.body);
        res.sendStatus(204);
       }
       catch(err){
        res.send(400).json({error: err.message});
       }
    });

    app.get("/api/quizzes/:quizId", async (req, res) => {
        try{
            const { quizId } = req.params;
        const quiz = await dao.findQuizById(quizId);
        res.json(quiz);
        }
        catch(err){
            res.send(400).json({error: err.message});
        }
    });

}
