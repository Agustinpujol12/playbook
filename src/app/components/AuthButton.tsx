// src/app/components/AuthButton.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

export function AuthButton() {
  const { data: session, status } = useSession();

  // Muestra un estado de carga mientras se verifica la sesión
  if (status === "loading") {
    return <Button disabled variant="outline" size="sm">Cargando...</Button>;
  }

  if (session) {
    // Si hay sesión: Muestra el nombre y el botón de "Cerrar sesión"
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground hidden sm:inline">
          {session.user?.name || session.user?.email}
        </span>
        <Button onClick={() => signOut({ callbackUrl: '/' })} variant="outline" size="sm">
          Cerrar sesión
        </Button>
      </div>
    );
  }

  // Si no hay sesión: Muestra el botón de "Iniciar Sesión"
  return (
    <Button asChild>
      <Link href="/login" className="flex items-center gap-2">
        <LogIn className="h-4 w-4" />
        Iniciar Sesión
      </Link>
    </Button>
  );
}