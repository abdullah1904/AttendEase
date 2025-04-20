import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value){
    throw new Error(`Please define ${key} environment variable inside .env.<development/production>.local.`);
  }
  return value;
};

export const PORT = process.env.PORT || "8000";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const DB_URI = getEnvVar("DB_URI");

export const ACCESS_TOKEN_SECRET = getEnvVar("ACCESS_TOKEN_SECRET");
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "15m";

export const REFRESH_TOKEN_SECRET = getEnvVar("REFRESH_TOKEN_SECRET");
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "7d";

export const MAIL_USER = getEnvVar("MAIL_USER");
export const MAIL_PASS = getEnvVar("MAIL_PASS");