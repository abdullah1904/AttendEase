export interface User{
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    role: 'ADMIN' | 'TEACHER' | 'STUDENT';
}