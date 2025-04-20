import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../utils/config";
import { logger } from "../utils/logger";

const connectToDatabase = async () => {
    try{
        await mongoose.connect(DB_URI!, {dbName: "attendease"});
        logger.info(`Connected to ${NODE_ENV} database successfully.`);
    }
    catch (error) {
        logger.error("Error connecting to database:", error);
        process.exit(1);
    }
}

export default connectToDatabase;