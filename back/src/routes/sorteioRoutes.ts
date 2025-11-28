import { Router } from 'express';
import { SorteioController } from '../controllers/SorteioController';

const router = Router();

router.get('/', SorteioController.getAll);
router.get('/:id_participante', SorteioController.getById);
router.post('/', SorteioController.create);
router.put('/:id_participante', SorteioController.update);
router.delete('/:id_participante', SorteioController.delete);

export default router;
