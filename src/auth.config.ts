// src/auth.config.ts
import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials'; // ¡Nuevo import!

export const authOptions: NextAuthOptions = {
  providers: [
    // ✅ AGREGA EL PROVEEDOR DE CREDENCIALES
    Credentials({
      name: 'Credenciales',
      credentials: {
        username: { label: 'Usuario', type: 'text' },
        password: { label: 'Contraseña', type: 'password' }
      },
      async authorize(credentials) {
        // Lógica de verificación:

        // Por ahora, usamos la lógica de prueba con el usuario y contraseña "mnz"
        if (credentials.username === 'mnz' && credentials.password === 'mnz') {
          // Si las credenciales son válidas, retornamos el objeto de usuario.
          return { id: 'user-1', name: 'Usuario MNZ', email: 'mnz@example.com', role: 'EDITOR' };
        }

        // Si la autenticación falla, retorna null.
        return null;
      },
    }),
    // ❌ QUITA EL BLOQUE DE DISCORD COMPLETO
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user && user.role) {
        (session.user as any).role = user.role;
      }
      return session;
    },
  },
};