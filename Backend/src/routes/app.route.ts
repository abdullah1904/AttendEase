import { Router } from "express";
import authRouter from "./auth.route";
import teacherRouter from "./teacher.route";
import { authenticate } from "../middlewares/auth.middleware";
import studentRouter from "./student.route";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/teacher", authenticate, teacherRouter);
appRouter.use("/student", authenticate, studentRouter);

export default appRouter;