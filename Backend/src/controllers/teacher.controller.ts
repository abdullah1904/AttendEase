import { NextFunction, Request, Response } from "express";

const listTeachers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Simulate fetching teachers from a database
        const teachers = [
            { id: 1, name: "John Doe", subject: "Math" },
            { id: 2, name: "Jane Smith", subject: "Science" },
        ];
        res.status(200).json({ teachers });
    }
    catch (err) {
        next(err);
    }
}

export {
    listTeachers
}