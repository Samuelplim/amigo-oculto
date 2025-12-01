import router from "./usuarioRoutes";
import { GrupoSorteioController } from '../controllers/GrupoSorteioController';
import { Router } from 'express';

const grupoRouter = Router();


router.get('/grupos', GrupoSorteioController.getAll);
router.get('/grupos/:id', GrupoSorteioController.getById);
router.post('/grupos', GrupoSorteioController.create);
router.post('/grupos/:id/participantes', GrupoSorteioController.addParticipante);
router.put('/grupos/:id/participantes/:participanteId', GrupoSorteioController.updateParticipante);
router.delete('/grupos/:id/participantes/:participanteId', GrupoSorteioController.deleteParticipante);
router.post('/grupos/:id/sortear', GrupoSorteioController.sortear);

export default router;