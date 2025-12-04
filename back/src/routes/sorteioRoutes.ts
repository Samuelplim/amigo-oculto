import { Router } from "express";

import { SorteioController } from "../controllers/SorteioController";
import { alocarGrupos } from "../Services/AlocacaoService";

export const sorteioRoutes = Router();

sorteioRoutes.get("/", SorteioController.getAll);
sorteioRoutes.get("/grupo/:grupoId", SorteioController.getByGrupo);
sorteioRoutes.get("/:id", SorteioController.getById);
sorteioRoutes.post("/", SorteioController.create);
sorteioRoutes.delete("/:id", SorteioController.delete);
sorteioRoutes.delete("/sorteado/:id_participante_sorteado", (req, res) => {
  const { id_participante_sorteado } = req.params;
  return res.status(501).json({
    message: "Implementar deleção por id_participante_sorteado no controller.",
  });
});
sorteioRoutes.post("/alocar", (req, res) => {
  const { participantes } = req.body;
  if (!Array.isArray(participantes) || participantes.length === 0) {
    return res
      .status(400)
      .json({ message: "Lista de participantes é obrigatória." });
  }
  const salas = alocarGrupos(participantes);
  return res.json(salas);
});
