// src/app/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Esto evita múltiples instancias en desarrollo
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
