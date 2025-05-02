import { Router } from "express";
import authRouter from "./auth.route";
import teacherRouter from "./teacher.route";
import { adminAuthorize, authenticate } from "../middlewares/auth.middleware";
import studentRouter from "./student.route";
import statsRouter from "./stats.routes";
import courseRouter from "./course.route";
import attendanceRouter from "./attendance.route";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/teachers", authenticate, adminAuthorize, teacherRouter);
appRouter.use("/students", authenticate, studentRouter);
appRouter.use("/stats", authenticate, statsRouter);
appRouter.use("/courses", authenticate, courseRouter);
appRouter.use("/attendance", authenticate, attendanceRouter);

export default appRouter;