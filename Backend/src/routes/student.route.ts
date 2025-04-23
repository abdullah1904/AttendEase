import { Router } from "express";
import { createStudent, deleteStudent, getStudent, listStudents, updateStudent } from "../controllers/student.controller";
import { adminAuthorize } from "../middlewares/auth.middleware";

const studentRouter = Router();

studentRouter.post("/", adminAuthorize, createStudent);
studentRouter.get("/", listStudents);
studentRouter.get("/:id", getStudent);
studentRouter.put("/:id", adminAuthorize, updateStudent);
studentRouter.delete("/:id", adminAuthorize, deleteStudent);

export default studentRouter;