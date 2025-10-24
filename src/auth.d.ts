import 'next-auth';
import { DefaultSession } from 'next-auth';

// Extendemos los tipos de 'next-auth'
declare module 'next-auth' {
  /**
   * Extiende el tipo `User` por defecto para añadir la propiedad `role`.
   */
  interface User {
    role: string;
  }

  /**
   * Extiende el tipo `Session` para que `session.user` incluya las propiedades
   * personalizadas `id` y `role` que añadimos en los callbacks.
   */
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user']; // Mantiene las propiedades por defecto (name, email, image)
  }
}

// Extendemos el tipo JWT para que el token también pueda llevar el rol.
declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
  }
}