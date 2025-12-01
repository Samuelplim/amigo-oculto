import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export class GrupoSorteioController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const grupos = await connection('grupos_sorteio').select('*');
      return res.json(grupos);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar grupos', error });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const grupo = await connection('grupos_sorteio')
        .where({ id })
        .first();
      
      if (!grupo) {
        return res.status(404).json({ message: 'Grupo não encontrado' });
      }
      
      // Buscar participantes do grupo
      const participantes = await connection('grupo_participantes')
        .where({ grupo_id: id })
        .select('*');
      
      // Buscar sorteios do grupo
      const sorteios = await connection('grupo_sorteios')
        .where({ grupo_id: id })
        .select('*');
      
      return res.json({
        ...grupo,
        participantes,
        sorteios
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar grupo', error });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome } = req.body;
      const id = uuidv4();
      
      await connection('grupos_sorteio').insert({
        id,
        nome
      });
      
      const novoGrupo = await connection('grupos_sorteio')
        .where({ id })
        .first();
      
      return res.status(201).json({
        ...novoGrupo,
        participantes: [],
        sorteios: []
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar grupo', error });
    }
  }

  static async addParticipante(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const participanteData = req.body;
      const participanteId = uuidv4();
      
      // Verificar se grupo existe
      const grupo = await connection('grupos_sorteio')
        .where({ id })
        .first();
      
      if (!grupo) {
        return res.status(404).json({ message: 'Grupo não encontrado' });
      }
      
      // Inserir participante no grupo
      await connection('grupo_participantes').insert({
        id: participanteId,
        grupo_id: id,
        ...participanteData
      });
      
      const participante = await connection('grupo_participantes')
        .where({ id: participanteId })
        .first();
      
      return res.status(201).json(participante);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao adicionar participante', error });
    }
  }

  static async updateParticipante(req: Request, res: Response): Promise<Response> {
    try {
      const { id, participanteId } = req.params;
      const participanteData = req.body;
      
      // Verificar se grupo existe
      const grupo = await connection('grupos_sorteio')
        .where({ id })
        .first();
      
      if (!grupo) {
        return res.status(404).json({ message: 'Grupo não encontrado' });
      }
      
      // Verificar se participante existe
      const participante = await connection('grupo_participantes')
        .where({ id: participanteId, grupo_id: id })
        .first();
      
      if (!participante) {
        return res.status(404).json({ message: 'Participante não encontrado' });
      }
      
      // Atualizar participante
      await connection('grupo_participantes')
        .where({ id: participanteId })
        .update(participanteData);
      
      const participanteAtualizado = await connection('grupo_participantes')
        .where({ id: participanteId })
        .first();
      
      return res.json(participanteAtualizado);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar participante', error });
    }
  }

  static async deleteParticipante(req: Request, res: Response): Promise<Response> {
    try {
      const { id, participanteId } = req.params;
      
      // Verificar se grupo existe
      const grupo = await connection('grupos_sorteio')
        .where({ id })
        .first();
      
      if (!grupo) {
        return res.status(404).json({ message: 'Grupo não encontrado' });
      }
      
      // Excluir participante
      const deleted = await connection('grupo_participantes')
        .where({ id: participanteId, grupo_id: id })
        .del();
      
      if (!deleted) {
        return res.status(404).json({ message: 'Participante não encontrado' });
      }
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao excluir participante', error });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const deleted = await connection('grupos_sorteio')
        .where({ id })
        .del();
      
      if (!deleted) {
        return res.status(404).json({ message: 'Grupo não encontrado' });
      }
      
      // Excluir também participantes e sorteios relacionados
      await connection('grupo_participantes')
        .where({ grupo_id: id })
        .del();
      
      await connection('grupo_sorteios')
        .where({ grupo_id: id })
        .del();
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao excluir grupo', error });
    }
  }

  static async sortear(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      // Verificar se grupo existe
      const grupo = await connection('grupos_sorteio')
        .where({ id })
        .first();
      
      if (!grupo) {
        return res.status(404).json({ message: 'Grupo não encontrado' });
      }
      
      // Buscar participantes do grupo
      const participantes = await connection('grupo_participantes')
        .where({ grupo_id: id })
        .select('*');
      
      if (participantes.length < 2) {
        return res.status(400).json({ message: 'Participantes insuficientes para sortear.' });
      }
      
      // Embaralhar participantes
      const embaralhado = [...participantes].sort(() => Math.random() - 0.5);
      
      // Limpar sorteios anteriores
      await connection('grupo_sorteios')
        .where({ grupo_id: id })
        .del();
      
      // Criar novos sorteios
      const sorteios = embaralhado.map((p, i) => ({
        id: uuidv4(),
        grupo_id: id,
        id_participante: p.id,
        id_participante_sorteado: embaralhado[(i + 1) % embaralhado.length]?.id
      }));
      
      // Inserir sorteios no banco
      for (const sorteio of sorteios) {
        await connection('grupo_sorteios').insert(sorteio);
      }
      
      return res.json(sorteios);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao realizar sorteio', error });
    }
  }
}