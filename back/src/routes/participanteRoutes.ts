import { Router } from "express";
import { ParticipanteController } from "../controllers/ParticipanteController";

export const participanteRoutes = Router();

participanteRoutes.get("/evento/:id", ParticipanteController.getByEventoId);
participanteRoutes.get("/:id", ParticipanteController.getById);
participanteRoutes.post("/", ParticipanteController.create);
participanteRoutes.put("/:id", ParticipanteController.update);
participanteRoutes.delete("/:id", ParticipanteController.delete);
