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

        // En un proyecto real, aquí buscarías el usuario en Prisma y verificarías la contraseña con bcrypt:
        // const user = await prisma.user.findUnique({ where: { username: credentials.username } });
        // const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);

        // Lógica de prueba fija para ti:
        if (credentials.username === 'amigo' && credentials.password === 'secreto123') {
          // Retornamos el objeto de usuario (¡Importante para la sesión!)
          return { id: 'user-1', name: 'Amigo Editor', email: 'amigo@example.com', role: 'EDITOR' };
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