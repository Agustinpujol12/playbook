// src/auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

// Extendemos el tipo 'User' de NextAuth para incluir la propiedad 'role'
declare module "next-auth" {
  interface Session {
    user: {
      role: string; // <-- Aquí declaramos el rol
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string; // <-- Aquí declaramos el rol
  }
}

// Extendemos el tipo 'JWT' de NextAuth para incluir la propiedad 'role'
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string; // <-- Aquí declaramos el rol
  }
}