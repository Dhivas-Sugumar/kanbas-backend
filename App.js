import express from 'express';
import session from "express-session";
import "dotenv/config";
import mongoose from "mongoose";
import Hello from "./Hello.js"
import Lab5 from "./Lab5.js";
import UserRoutes from "./Users/routes.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import cors from "cors";
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
 );
 app.use(express.json());
 const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

Hello(app)
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);
mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
app.listen(process.env.PORT || 4000);