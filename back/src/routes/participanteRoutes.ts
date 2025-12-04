import { Router } from 'express';
import { ParticipanteController } from '../controllers/ParticipanteController';

const router = Router();

router.get('/', ParticipanteController.getAll);
router.get('/:id', ParticipanteController.getById);
router.post('/', ParticipanteController.create);
router.put('/:id', ParticipanteController.update);
router.delete('/:id', ParticipanteController.delete);

export default router;
