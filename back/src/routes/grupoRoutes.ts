import { Router } from 'express';
import { GrupoSorteioController } from '../controllers/GrupoController';

const router = Router();

router.get('/', GrupoSorteioController.getAll);
router.get('/:id', GrupoSorteioController.getById);
router.post('/', GrupoSorteioController.create);
router.post('/:id/participantes', GrupoSorteioController.addParticipante);
router.put('/:id/participantes/:participanteId', GrupoSorteioController.updateParticipante);
router.delete('/:id/participantes/:participanteId', GrupoSorteioController.deleteParticipante);
router.post('/:id/sortear', GrupoSorteioController.sortear);
router.delete('/:id', GrupoSorteioController.delete);


export default router;