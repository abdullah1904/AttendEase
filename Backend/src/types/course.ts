import {Schema} from "mongoose";

export interface ICourse{
    name: string,
    code: string,
    credits: number,
    department: number,
    session: string,
    section: string,
    instructor: Schema.Types.ObjectId,
    students: Schema.Types.ObjectId[],
}