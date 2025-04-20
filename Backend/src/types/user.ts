import { UserTypes } from "../utils/constants";

export interface IUser{
    email: string,
    password: string,
    userType: UserTypes,
} 