import { NextFunction, Request, Response } from "express"
import User from "../models/user.model"
import { HttpStatusCode, UserTypes } from "../utils/constants"
import Course from "../models/course.model";

const {
    HTTP_OK,
} = HttpStatusCode;

const getStats = async (req:Request,res:Response, next:NextFunction)=>{
    try{
        const userType = req.user?.userType;
        const userId = req.user?._id;
        if(userType === UserTypes.ADMIN){
            const studentsCountPromise = User.find({userType: UserTypes.STUDENT}).countDocuments();
            const teachersCountPromise = User.find({userType: UserTypes.TEACHER}).countDocuments();
            const coursesCountPromise = Course.find({}).countDocuments()
            const [studentsCount, teachersCount, coursesCount] = await Promise.all([studentsCountPromise, teachersCountPromise, coursesCountPromise]);
            const stats = {
                studentsCount,
                teachersCount,
                coursesCount,
            }
            res.status(HTTP_OK.code).json({
                message: HTTP_OK.message,
                data: stats
            });
        }
        if(userType === UserTypes.TEACHER){
            const coursesCountPromise = Course.find({instructor: userId }).countDocuments()
            const studentsCountPromise = Course.distinct("students", { instructor: userId })
            const [coursesCount, studentsCount] = await Promise.all([coursesCountPromise, studentsCountPromise]);
            const stats = {
                studentsCount: studentsCount.length,
                coursesCount,
            }
            res.status(HTTP_OK.code).json({
                message: HTTP_OK.message,
                data: stats
            });
        }
    }
    catch(err){
        next(err)
    }
}

export {
    getStats,
}