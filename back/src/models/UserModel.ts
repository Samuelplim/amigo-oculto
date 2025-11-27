export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

const users: User[] = [];

export class UserModel {
  static async findAll(): Promise<User[]> {
    return users;
  }

  static async findById(id: string): Promise<User | null> {
    return users.find(user => user.id === id) || null;
  }

  static async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      createdAt: new Date()
    };
    users.push(newUser);
    return newUser;
  }

  static async update(id: string, userData: Partial<User>): Promise<User | null> {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    const oldUser = users[userIndex];
    if (!oldUser) return null;

    const updatedUser: User = {
      id: oldUser.id,
      name: userData.name !== undefined ? userData.name : oldUser.name,
      email: userData.email !== undefined ? userData.email : oldUser.email,
      createdAt: oldUser.createdAt
    };
    users[userIndex] = updatedUser;
    return updatedUser;
  }

  static async delete(id: string): Promise<boolean> {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    users.splice(userIndex, 1);
    return true;
  }
}
