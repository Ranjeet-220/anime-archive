import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 4000,
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export function isDatabaseConnectionError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const code = "code" in error ? error.code : "errorCode" in error ? error.errorCode : undefined;
  return code === "P1001" || code === "P1002" || code === "P1017" || code === "P2024";
}
