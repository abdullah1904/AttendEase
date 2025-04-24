import { Router } from "express";
import { createCourse, deleteCourse, getCourse, listCourses, updateCourse } from "../controllers/course.controller";
import { adminAuthorize } from "../middlewares/auth.middleware";

const courseRouter = Router();

courseRouter.post("/", adminAuthorize, createCourse);
courseRouter.get("/", listCourses);
courseRouter.get("/:id", getCourse);
courseRouter.put("/:id", adminAuthorize, updateCourse);
courseRouter.delete("/:id", adminAuthorize, deleteCourse);

export default courseRouter;