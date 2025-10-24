// src/auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/prisma";
import { authConfig } from "./auth.config";

// ✅ Creamos la instancia de NextAuth normalmente
const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});

// ✅ Exportamos los métodos GET y POST para la API Route
export const { GET, POST } = handler;
