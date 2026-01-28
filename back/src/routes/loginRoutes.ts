import { Router } from "express";
import { LoginController } from "../controllers/LoginController";

export const loginRoutes = Router();
loginRoutes.post("/", LoginController.login);
