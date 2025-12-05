import { Router } from "express";

import { SorteioController } from "../controllers/SorteioController";

export const sorteioRoutes = Router();

sorteioRoutes.get(
  "/evento/:eventoId/participante/participanteId",
  SorteioController.getSorteioParticipante
);
sorteioRoutes.get("/evento/:eventoId", SorteioController.getByEventoId);
sorteioRoutes.post("/evento/:eventoId", SorteioController.realizarSorteio);
sorteioRoutes.get("/:id", SorteioController.getById);
sorteioRoutes.post("/", SorteioController.create);
sorteioRoutes.delete("/:id", SorteioController.delete);
