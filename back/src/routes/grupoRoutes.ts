import { Router } from 'express';
import { GrupoController } from '../controllers/GrupoController';

const router = Router();

router.get('/', GrupoController.getAll);
router.get('/:id', GrupoController.getById);
router.post('/', GrupoController.create);
router.put('/:id', GrupoController.update);
router.delete('/:id', GrupoController.delete);
router.post('/:id/participantes', GrupoController.addParticipante);
router.delete('/:id/participantes/:participanteId', GrupoController.removeParticipante);
router.post('/:id/sortear', GrupoController.realizarSorteio);
router.get('/:id/sorteio/:participanteId', GrupoController.getSorteioParticipante);


export default router;