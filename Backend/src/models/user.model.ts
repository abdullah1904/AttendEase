import { Schema, model } from "mongoose";
import { IUser } from "../types/user";
import { UserTypes } from "../utils/constants";

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        enum: Object.values(UserTypes).filter(value => typeof value === 'number'),
    }
});

const User = model<IUser>("User", UserSchema);
export default User;