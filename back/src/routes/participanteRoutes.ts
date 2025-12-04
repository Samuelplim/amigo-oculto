import { Router } from "express";
import { ParticipanteController } from "../controllers/ParticipanteController";

export const participanteRoutes = Router();

participanteRoutes.get("/", ParticipanteController.getAll);
participanteRoutes.get("/:id", ParticipanteController.getById);
participanteRoutes.post("/", ParticipanteController.create);
participanteRoutes.put("/:id", ParticipanteController.update);
participanteRoutes.delete("/:id", ParticipanteController.delete);
