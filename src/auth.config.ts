// src/auth.config.ts
import type { NextAuthOptions, Session, User } from 'next-auth'; // <-- Importación corregida
import type { JWT } from "next-auth/jwt"; // <-- Importación añadida
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';

export const authConfig = {
  providers: [
    Credentials({
      // Añadimos la sección 'credentials' como sugiere Copilot
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (passwordsMatch) {
          // Retornamos el usuario completo que espera PrismaAdapter
          return user; 
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // Añadimos tipos explícitos como sugiere Copilot
    jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthOptions; // <-- Usamos NextAuthOptions en lugar de NextAuthConfig