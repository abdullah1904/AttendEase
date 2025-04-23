import { Router } from "express";
import { adminStats } from "../controllers/stats.controller";
import { adminAuthorize } from "../middlewares/auth.middleware";

const statsRouter = Router();

statsRouter.get("/admin", adminAuthorize, adminStats);

export default statsRouter;