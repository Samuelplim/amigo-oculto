import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./routes";

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Substitua pelo domínio correto do frontend
  credentials: true, // Permitir envio de cookies
}));

app.use(cookieParser());
app.use(express.json());
app.use(routes);
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

export { app };
