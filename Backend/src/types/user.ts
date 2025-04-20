import { UniversityDepartments, UserTypes } from "../utils/constants";

export interface IUser{
    name: string,
    email: string,
    phone: string,
    password: string,
    userType: UserTypes,
    department: UniversityDepartments,
} 