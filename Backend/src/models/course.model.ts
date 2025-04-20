import { model, Schema } from "mongoose";
import { ICourse } from "../types/course";
import { UniversityDepartments } from "../utils/constants";

const CourseSchema = new Schema<ICourse>({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        required: true,
    },
    department: {
        type: Number,
        enum: Object.values(UniversityDepartments).filter(value => typeof value === 'number'),
    },
    session: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    students: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        required: true,
    },
});

const Course = model<ICourse>("Course", CourseSchema);
export default Course;