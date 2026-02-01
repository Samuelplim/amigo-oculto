import express, { Errback } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./routes";
import { ENV } from "./config/constant";
import { AppError } from "./models/AppError";

const app = express();

app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(routes);
app.use(
  (
    error: Errback,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }
    if (error instanceof Error) {
      return response.status(500).json({
        status: "error",
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  },
);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

export { app };
