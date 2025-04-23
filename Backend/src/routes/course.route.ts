import { Router } from "express";
import { createCourse, listCourses } from "../controllers/course.controller";

const courseRouter = Router();

courseRouter.post("/", createCourse);
courseRouter.get("/",listCourses);

export default courseRouter;