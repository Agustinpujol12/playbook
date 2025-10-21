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
        
        // 🛑 DEBUG: Mostrar los valores reales que se reciben en el servidor
        console.log("--- DEBUG AUTH ---");
        console.log("Credenciales recibidas:", credentials);
        console.log(`Intentando autenticar usuario: ${credentials?.username}`);
        console.log("--- FIN DEBUG ---");
        
        // Forzamos la conversión a string
        const username = credentials?.username as string | undefined;
        const password = credentials?.password as string | undefined;

        // 1. Lógica de verificación:
        if (username === 'mnz' && password === 'mnz') {
          // Si las credenciales son válidas, retornamos el objeto de usuario.
          return { 
            id: 'user-1', 
            name: 'Manuel Ortiz', 
            email: 'manuortizz2003@gmail.com',
            role: 'EDITOR' 
          } as User; 
        }

        // Si la autenticación falla, retorna null.
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