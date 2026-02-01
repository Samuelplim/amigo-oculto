import dotenv from "dotenv";
import * as process from "node:process";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT!,
  DB_CLIENT: process.env.DB_CLIENT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: Number(process.env.DB_PORT),
  JWT_SECRET: process.env.JWT_SECRET || "",
  FRONTEND_URL: process.env.FRONTEND_URL || "",
  DB_SCHEMA: process.env.DB_SCHEMA || "public",
};
