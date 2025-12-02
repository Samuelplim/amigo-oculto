import { PrismaClient } from '@prisma/client';

// Singleton pattern para garantir uma única instância do PrismaClient
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Função para desconectar do banco
export const disconnectDatabase = async () => {
  await prisma.$disconnect();
};
