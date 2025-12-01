import { Router } from 'express';

import { SorteioController } from '../controllers/SorteioController';
import { alocarGrupos } from '../Services/AlocacaoService';

const router = Router();


router.get('/', SorteioController.getAll);
router.get('/:id_participante', SorteioController.getById);
router.get('/rolando/all', (req, res) => SorteioController.getAll(req, res));
router.get('/rolando/:id_participante', (req, res) => SorteioController.getById(req, res));
router.post('/', SorteioController.create);
router.put('/:id_participante', SorteioController.update);
router.delete('/:id_participante', SorteioController.delete);
router.delete('/sorteado/:id_participante_sorteado', (req, res) => {
	const { id_participante_sorteado } = req.params;
	return res.status(501).json({ message: 'Implementar deleção por id_participante_sorteado no controller.' });
});
router.post('/alocar', (req, res) => {
	const { participantes } = req.body;
	if (!Array.isArray(participantes) || participantes.length === 0) {
		return res.status(400).json({ message: 'Lista de participantes é obrigatória.' });
	}
	const salas = alocarGrupos(participantes);
	return res.json(salas);
});

export default router;