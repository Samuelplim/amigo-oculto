import { Router } from "express";
import { EventoController } from "../controllers/EventoController";

export const eventoRoutes = Router();

eventoRoutes.get("/", EventoController.getAll);
eventoRoutes.get("/:id", EventoController.getById);
eventoRoutes.post("/", EventoController.create);
eventoRoutes.put("/:id", EventoController.update);
eventoRoutes.delete("/:id", EventoController.delete);
eventoRoutes.post("/:id/participantes", EventoController.addParticipante);
eventoRoutes.delete(
  "/:id/participantes/:participanteId",
  EventoController.removeParticipante
);
eventoRoutes.post("/:id/sortear", EventoController.realizarSorteio);
eventoRoutes.get(
  "/:id/sorteio/:participanteId",
  EventoController.getSorteioParticipante
);
