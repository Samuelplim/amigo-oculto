import { Request, Response } from 'express';
import { UserModel, User } from '../models/UserModel';

export class UserController {
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = req.params.id ? await UserModel.findById(req.params.id) : null;
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;
      
      if (!name || !email) {
        res.status(400).json({ error: 'Name and email are required' });
        return;
      }

      const newUser = await UserModel.create({ name, email });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;
      const updatedUser = req.params.id ? await UserModel.update(req.params.id, req.body) : null;
      
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const success = req.params.id ? await UserModel.delete(req.params.id) : false;
      
      if (!success) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
