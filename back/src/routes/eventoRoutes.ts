import { Router } from "express";
import { EventoController } from "../controllers/EventoController";

export const eventoRoutes = Router();

eventoRoutes.get("/", EventoController.getAll);
eventoRoutes.get("/:id", EventoController.getById);
eventoRoutes.post("/", EventoController.create);
eventoRoutes.put("/:id", EventoController.update);
eventoRoutes.delete("/:id", EventoController.delete);
