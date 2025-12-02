import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Singleton pattern para garantir uma única instância do PrismaClient
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["query", "error", "warn"],
  } as any);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Função para desconectar do banco
export const disconnectDatabase = async () => {
  await prisma.$disconnect();
};
