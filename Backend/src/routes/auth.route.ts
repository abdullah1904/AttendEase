import { Router } from "express";
import { signUp, signIn, changePassword } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.patch('/change-password', authenticate, changePassword);

export default authRouter;