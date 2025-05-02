import { Router } from "express";
import { teacherAuthorize } from "../middlewares/auth.middleware";
import { createAttendance, getAttendance } from "../controllers/attendance.controller";

const attendanceRouter = Router();

attendanceRouter.post("/",teacherAuthorize,createAttendance);
attendanceRouter.get("/:courseId", getAttendance);

export default attendanceRouter;