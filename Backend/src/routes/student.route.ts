import { Router } from "express";
import { createStudent, deleteStudent, getStudent, listStudents, updateStudent } from "../controllers/student.controller";

const studentRouter = Router();

studentRouter.post("/", createStudent);
studentRouter.get("/", listStudents);
studentRouter.get("/:id", getStudent);
studentRouter.put("/:id", updateStudent);
studentRouter.delete("/:id", deleteStudent);

export default studentRouter;