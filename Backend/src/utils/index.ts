import jwt from "jsonwebtoken";
import {
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY,
    MAIL_USER,
    MAIL_PASS
} from "./config";
import { createTransport } from "nodemailer";

const generateToken = (data: any, tokenType: 'ACCESS' | 'REFRESH') => {
    if (tokenType == 'ACCESS') {
        return jwt.sign(data, ACCESS_TOKEN_SECRET!, {
            expiresIn: ACCESS_TOKEN_EXPIRY,

        } as jwt.SignOptions);
    }
    if (tokenType == 'REFRESH') {
        return jwt.sign(data, ACCESS_TOKEN_SECRET!, {
            expiresIn: REFRESH_TOKEN_EXPIRY
        } as jwt.SignOptions);
    }
}

const sendMail = ({ subject, to, content }: { subject: string, to: string, content: string }) => {
    const transport = createTransport({
        service: "gmail",
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS,
        }
    });
    transport.sendMail({
        from: {
            name: "AttendEase",
            address: MAIL_USER
        },
        to,
        subject,
        html: content,
    })
}

export {
    generateToken,
    sendMail
}