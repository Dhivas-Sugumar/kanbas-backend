import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  app.get("/api/courses/:cid/modules", async (req, res) => {
      const { cid } = req.params;
      const modules = await dao.findModulesByCourseId(cid);
      res.json(modules);
  });

  app.post("/api/courses/:cid/modules", async (req, res) => {
      const { cid } = req.params;
      const moduleData = {
          ...req.body,
          course: cid
      };
      const newModule = await dao.createModule(moduleData);
      res.json(newModule);
  });

  app.delete("/api/modules/:mid", async (req, res) => {
      const { mid } = req.params;
      await dao.deleteModule(mid);
      res.sendStatus(204);
  });

  app.put("/api/modules/:mid", async (req, res) => {
      const { mid } = req.params;
      await dao.updateModule(mid, req.body);
      res.sendStatus(204);
  });
}
