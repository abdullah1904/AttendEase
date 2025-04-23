import { NextFunction, Request, Response } from "express"
import User from "../models/user.model"
import { HttpStatusCode, UserTypes } from "../utils/constants"

const {
    HTTP_OK,
} = HttpStatusCode;

const adminStats = async (req:Request,res:Response, next:NextFunction)=>{
    try{
        const studentsCountPromise = User.find({userType: UserTypes.STUDENT}).countDocuments();
        const teachersCountPromise = User.find({userType: UserTypes.TEACHER}).countDocuments();
        const [studentsCount, teachersCount] = await Promise.all([studentsCountPromise, teachersCountPromise]);
        const stats = {
            studentsCount,
            teachersCount,
            coursesCount: 0,
        }
        res.status(HTTP_OK.code).json({
            message: HTTP_OK.message,
            data: stats
        });
    }
    catch(err){
        next(err)
    }
}

export {
    adminStats,
}