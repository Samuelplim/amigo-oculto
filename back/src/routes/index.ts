import { Router } from "express";
import { usuarioRoutes } from "./usuarioRoutes";
import { participanteRoutes } from "./participanteRoutes";
import { presenteRoutes } from "./presenteRoutes";
import { sorteioRoutes } from "./sorteioRoutes";
import { eventoRoutes } from "./eventoRoutes";
import { loginRoutes } from "./loginRoutes";

export const routes = Router();
routes.use("/api/usuarios", usuarioRoutes);
routes.use("/api/participantes", participanteRoutes);
routes.use("/api/presentes", presenteRoutes);
routes.use("/api/sorteios", sorteioRoutes);
routes.use("/api/eventos", eventoRoutes);
routes.use("/api/login", loginRoutes);
