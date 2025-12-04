import express from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());

// Rotas
app.use(routes);
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

export default app;
