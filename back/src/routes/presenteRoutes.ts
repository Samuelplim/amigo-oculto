import { Router } from "express";
import { PresenteController } from "../controllers/PresenteController";

export const presenteRoutes = Router();

presenteRoutes.get("/participante/:id", PresenteController.getByParticipantId);
presenteRoutes.get("/:id", PresenteController.getById);
presenteRoutes.post("/", PresenteController.create);
presenteRoutes.put("/:id", PresenteController.update);
presenteRoutes.delete("/:id", PresenteController.delete);
