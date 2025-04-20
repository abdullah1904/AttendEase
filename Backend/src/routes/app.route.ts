import { Router } from "express";
import authRouter from "./auth.route";
import teacherRouter from "./teacher.route";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/teacher", teacherRouter);

export default appRouter;