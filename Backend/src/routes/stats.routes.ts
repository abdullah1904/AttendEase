import { Router } from "express";
import { getStats } from "../controllers/stats.controller";
import { adminAuthorize } from "../middlewares/auth.middleware";

const statsRouter = Router();

statsRouter.get("/", getStats);

export default statsRouter;