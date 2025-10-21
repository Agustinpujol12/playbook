// src/app/components/auth-components.tsx
"use client"; // <-- MUY IMPORTANTE: Declara este como un Componente de Cliente

import { signIn, signOut } from "next-auth/react"; // <-- Importamos desde 'next-auth/react'
import { Button } from "@/components/ui/button";

export function SignIn() {
  return (
    // Ya no usamos un <form>, sino un botón con un evento onClick
    <Button onClick={() => signIn("discord")}>
      Iniciar sesión con Discord
    </Button>
  );
}

export function SignOut() {
  return (
    <Button onClick={() => signOut()} variant="outline">
      Cerrar sesión
    </Button>
  );
}