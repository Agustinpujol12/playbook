// src/auth.ts
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/app/lib/prisma';
import NextAuth, { getServerSession } from 'next-auth';
import { authOptions } from './auth.config';
import { signIn as nextSignIn, signOut as nextSignOut } from 'next-auth/react';

const options = {
  adapter: PrismaAdapter(prisma),
  ...authOptions,
};

// Handler para las rutas API (Next.js route handler)
const { handlers } = NextAuth(options);
export { handlers };

// Función para obtener la sesión en el servidor (SSR)
export const auth = () => getServerSession(options);

// Funciones para login/logout en el cliente
export const signIn = nextSignIn;
export const signOut = nextSignOut;
