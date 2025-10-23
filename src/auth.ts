// src/auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/prisma";
import { authConfig } from "./auth.config";

export const auth = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});

// Exportamos para App Router API route
export { auth as GET, auth as POST };
