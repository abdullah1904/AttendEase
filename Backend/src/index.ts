import express from "express";
import appRouter from "./routes/app.route";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { logger } from "./utils/logger";
import { PORT } from "./utils/config";
import connectToDatabase from "./libs/database";
import errorMiddleware from "./middlewares/error.middleware";
import { HttpStatusCode } from "./utils/constants";

const {
    HTTP_OK
} = HttpStatusCode;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));

app.get('/',(req,res)=>{
    res.status(HTTP_OK.code).json({"message": HTTP_OK.message});
});

app.use("/api/v1", appRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
    await connectToDatabase();
    logger.info(`Server is running on http://localhost:${PORT}`);
});