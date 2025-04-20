import { Router } from "express";
import { listTeachers } from "../controllers/teacher.controller";
import { authorize } from "../middlewares/auth.middleware";

const teacherRouter = Router();

teacherRouter.get("/", authorize, listTeachers);

export default teacherRouter;