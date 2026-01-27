import express from "express";
import cors from "cors";
import { routes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

export { app };
