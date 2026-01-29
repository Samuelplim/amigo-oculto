import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./routes";
import { ENV } from "./config/constant";

const app = express();

app.use(cors({
  origin: ENV.FRONTEND_URL, 
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(routes);
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

export { app };
