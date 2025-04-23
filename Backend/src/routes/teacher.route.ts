import { Router } from "express";
import { createTeacher, deleteTeacher, getTeacher, listTeachers, updateTeacher } from "../controllers/teacher.controller";
import { adminAuthorize } from "../middlewares/auth.middleware";

const teacherRouter = Router();

teacherRouter.post("/", createTeacher);
teacherRouter.get("/", listTeachers);
teacherRouter.get("/:id", getTeacher);
teacherRouter.put("/:id", updateTeacher);
teacherRouter.delete("/:id", deleteTeacher);

export default teacherRouter;