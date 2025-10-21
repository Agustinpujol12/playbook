// src/auth.config.ts

import type { NextAuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials'; 

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credenciales',
      credentials: {
        username: { label: 'Usuario', type: 'text' },
        password: { label: 'Contraseña', type: 'password' }
      },
      async authorize(credentials) {
        if (credentials?.username === 'mnz' && credentials?.password === 'mnz') {
          // Retornamos el objeto de usuario con el rol para la sesión
          return { 
            id: 'user-1', 
            name: 'Manuel Ortiz', 
            email: 'manuortizz2003@gmail.com',
            role: 'EDITOR' 
          } as User; 
        }
        return null;
      },
    }),
  ],
  // ⚠️ CRÍTICO: Los callbacks de JWT son necesarios sin el adaptador de DB.
  callbacks: {
    async jwt({ token, user }) {
        if (user && (user as User).role) {
            token.role = (user as User).role;
            token.id = user.id;
        }
        return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) { 
        (session.user as any).role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
};