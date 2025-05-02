import { model, Schema } from "mongoose";
import { IAttendance } from "../types/attendance";
import { AttendanceStatus } from "../utils/constants";

const AttendanceSchema = new Schema<IAttendance>({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    markedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    students: [
        {
            student: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            status: {
                type: Number,
                enum: Object.values(AttendanceStatus).filter(value => typeof value === 'number'),
                required: true,
            },
        },
    ],
}, { timestamps: true });

AttendanceSchema.index({ course: 1, date: 1 }, { unique: true });

const Attendance = model<IAttendance>("Attendance", AttendanceSchema);
export default Attendance;