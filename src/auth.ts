// src/auth.ts

// NOTA: Borramos la importación del adaptador para usar sesiones basadas en cookies.
// import { PrismaAdapter } from '@next-auth/prisma-adapter'; 

import prisma from '@/app/lib/prisma';
import NextAuth, { getServerSession } from 'next-auth';
// ✅ Importación corregida con la extensión del archivo
import { authOptions } from './auth.config'; 
import { signIn as nextSignIn, signOut as nextSignOut } from 'next-auth/react';

// ❌ Quitamos el bloque 'options' que usaba el adaptador de Prisma.
// Ahora pasamos 'authOptions' directamente.

// Handler para las rutas API (Next.js route handler)
// Pasamos las authOptions directamente.
const { handlers } = NextAuth(authOptions); 
export { handlers };

// Función para obtener la sesión en el servidor (SSR)
// Pasamos las authOptions directamente.
export const auth = () => getServerSession(authOptions); 

// Funciones para login/logout en el cliente
export const signIn = nextSignIn;
export const signOut = nextSignOut;