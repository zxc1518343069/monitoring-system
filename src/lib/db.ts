// src/lib/db.ts
import { PrismaClient } from "@prisma/client";

// 在开发模式下，避免 Prisma Client 被重复实例化
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query", "error", "warn"], // 可选：调试时输出日志
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}