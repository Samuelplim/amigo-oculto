import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

export const usuarioRoutes = Router();

usuarioRoutes.get("/", UsuarioController.getAll);
usuarioRoutes.get("/:id", UsuarioController.getById);
usuarioRoutes.post("/", UsuarioController.create);
usuarioRoutes.put("/:id", UsuarioController.update);
usuarioRoutes.delete("/:id", UsuarioController.delete);
