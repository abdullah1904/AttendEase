import Joi from "joi";
import { isValidObjectId } from "mongoose";
import { AttendanceStatus } from "./constants";

// Reusable name validation: allows letters, spaces, hyphens, and apostrophes only
const safeName = Joi.string()
  .pattern(/^[a-zA-Z\s'-]+$/)
  .min(3)
  .max(30)
  .required()
  .messages({
    'string.pattern.base': 'Name can only contain letters, spaces, hyphens, and apostrophes.',
  });

// Reusable phone validation: allows digits, optional "+" at the start, 10-15 chars
const phoneRegex = Joi.string()
  .pattern(/^\+?[0-9]{10,15}$/)
  .required()
  .messages({
    'string.pattern.base': 'Phone number must be valid (10-15 digits, optional +).',
  });

// Sign In Schema
export const signInSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string()
    .min(6)
    .max(128)
    .pattern(/^[\w!@#$%^&*()\-_=+{}[\]:;"'<>,.?/|\\]{6,128}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password contains invalid characters.',
    }),
}).strict();

// Sign Up Schema
export const signUpSchema = Joi.object({
  name: safeName,
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string()
    .min(6)
    .max(128)
    .pattern(/^[\w!@#$%^&*()\-_=+{}[\]:;"'<>,.?/|\\]{6,128}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password contains invalid characters.',
    }),
  phone: phoneRegex,
}).strict();

// Change Password Schema
export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string()
    .min(6)
    .max(128)
    .pattern(/^[\w!@#$%^&*()\-_=+{}[\]:;"'<>,.?/|\\]{6,128}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password contains invalid characters.',
    }),
  newPassword: Joi.string()
    .min(6)
    .max(128)
    .pattern(/^[\w!@#$%^&*()\-_=+{}[\]:;"'<>,.?/|\\]{6,128}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password contains invalid characters.',
    }),
}).strict();

// Create Teacher Schema
export const createTeacherSchema = Joi.object({
  name: safeName,
  email: Joi.string().email().trim().lowercase().required(),
  phone: phoneRegex,
  department: Joi.number().integer().min(1).max(24).required(),
}).strict();

// Update Teacher Schema
export const updateTeacherSchema = Joi.object({
  name: safeName,
  phone: phoneRegex,
  department: Joi.number().integer().min(1).max(24).required(),
}).strict();

// Create Student Schema
export const createStudentSchema = Joi.object({
  name: safeName,
  email: Joi.string().email().trim().lowercase().required(),
  phone: phoneRegex,
  department: Joi.number().integer().min(1).max(24).required(),
}).strict();

// Update Student Schema
export const updateStudentSchema = Joi.object({
  name: safeName,
  phone: phoneRegex,
  department: Joi.number().integer().min(1).max(24).required(),
}).strict();

// Create and Update Course Schema
export const createUpdateCourseSchema = Joi.object({
  name: safeName,
  code: Joi.string()
    .alphanum()
    .min(4)
    .max(10)
    .required()
    .regex(/^[A-Z]{2,4}[0-9]{2,4}$/)
    .messages({
      "string.pattern.base": "Course code must be like 'CS101' or 'MATH202'.",
    }),

  credits: Joi.number().min(1).max(6).required(),
  department: Joi.number().integer().min(1).max(24).required(),
  session: Joi.string()
    .trim()
    .required()
    .regex(/^\d{4}-\d{4}$/)
    .messages({
      "string.pattern.base": "Session must be in 'YYYY-YYYY' format.",
    }),
  section: Joi.string()
    .trim()
    .uppercase()
    .regex(/^[A-Z][0-9]$/)
    .required(),
  instructor: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "ObjectId validation")
    .messages({
      "any.invalid": "Instructor must be a valid id.",
    }),
  students: Joi.array()
    .items(
      Joi.string().custom((value, helpers) => {
        if (!isValidObjectId(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      }, "ObjectId validation")
    )
    .max(30)
    .messages({
      "any.invalid": "Each student id must be a valid id.",
      "array.max": "You can select up to 30 students only.",
    }),
}).strict();

export const createAttendanceSchema = Joi.object({
  course: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "ObjectId validation")
    .messages({
      "any.invalid": "Course must be a valid id.",
    }),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  students: Joi.array()
    .items(
      Joi.object({
        student: Joi.string()
          .required()
          .custom((value, helpers) => {
            if (!isValidObjectId(value)) {
              return helpers.error("any.invalid");
            }
            return value;
          }, "ObjectId validation")
          .messages({
            "any.invalid": "Student must be a valid id.",
          }),
        status: Joi.number()
          .min(1)
          .max(4)
          .required()
          .messages({
            "any.only": `Status must be one of the following: ${Object.values(AttendanceStatus).join(", ")}`,
          }),
      })
    )
    .max(30)
    .messages({
      "array.max": "You can select up to 30 students only.",
    }),
}).strict();