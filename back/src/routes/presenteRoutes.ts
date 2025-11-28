import { Router } from 'express';
import { PresenteController } from '../controllers/PresenteController';

const router = Router();

router.get('/', PresenteController.getAll);
router.get('/:id', PresenteController.getById);
router.post('/', PresenteController.create);
router.put('/:id', PresenteController.update);
router.delete('/:id', PresenteController.delete);

export default router;
