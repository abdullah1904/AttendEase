import { Schema, model } from "mongoose";
import { IUser } from "../types/user";
import { UniversityDepartments, UserTypes } from "../utils/constants";

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    userType: {
        type: Number,
        enum: Object.values(UserTypes).filter(value => typeof value === 'number'),
        required: true
    },
    department: {
        type: Number,
        enum: Object.values(UniversityDepartments).filter(value => typeof value === 'number'),
        required: true
    }
});

const User = model<IUser>("User", UserSchema);
export default User;