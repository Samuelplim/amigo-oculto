import { Router } from "express";
import { LoginController } from "../controllers/LoginController";
import { validateToken } from "../middlewares/authMiddleware";

export const loginRoutes = Router();
loginRoutes.post("/", validateToken, LoginController.login);
